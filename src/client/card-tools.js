import { icon } from './icons';
import { formatDuration } from './render';

/**
 * In-card tools that build their own DOM: transcript copy, in-card search, the
 * turn outline, and cross-card quoting. They own their document-level listeners
 * and expose close/ dispose so the board can dismiss them.
 */
export function createCardTools(deps) {
  const { t, el, toast, ensureVisible, state } = deps;

  function transcriptMarkdown(card) {
    const view = card.view;
    if (!view) return '';
    const lines = ['## ' + (card.title || t('untitled')), ''];
    for (const item of view.items || []) {
      if (item.k === 'user') {
        lines.push('**' + t('transcript.user') + '**', '', item.text || '', '');
      } else if (item.k === 'assistant') {
        lines.push(item.text || '', '');
      } else if (item.k === 'turnProcess' && item.endTime != null) {
        const took = formatDuration(Math.max(0, item.endTime - (item.startTime || item.endTime)), t);
        lines.push('> ' + (item.failed ? t('turn.failed') : t('turn.worked')) + '，' + t('turn.used') + took, '');
      } else if (item.k === 'failure') {
        lines.push('> ' + (item.failure?.title ? t(item.failure.title) : t('failure.turnError')), '');
      }
    }
    return lines.join('\n').trim();
  }

  async function copyTranscript(card) {
    const text = transcriptMarkdown(card);
    if (!text) {
      toast(t('card.copyEmpty'));
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast(t('card.copied'));
    } catch {
      toast(t('card.copyFailed'));
    }
  }

  // ── in-card search ───────────────────────────────────────────────────
  function clearHighlights(root) {
    for (const mark of [...root.querySelectorAll('mark.iwb-hit')]) {
      const parent = mark.parentNode;
      if (!parent) continue;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    }
  }

  function highlight(root, term, hits) {
    const needle = term.toLowerCase();
    if (!needle) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest('.iwb-search')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const text = node.nodeValue;
      const lower = text.toLowerCase();
      let index = lower.indexOf(needle);
      if (index < 0) continue;
      const frag = document.createDocumentFragment();
      let cursor = 0;
      while (index >= 0) {
        if (index > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, index)));
        const mark = el('mark', 'iwb-hit');
        mark.textContent = text.slice(index, index + needle.length);
        frag.appendChild(mark);
        hits.push(mark);
        cursor = index + needle.length;
        index = lower.indexOf(needle, cursor);
      }
      if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
      node.parentNode.replaceChild(frag, node);
    }
  }

  function runSearch(card, term) {
    const body = card.el.querySelector('.iwb-body');
    const count = card.el.querySelector('.iwb-search-count');
    clearHighlights(body);
    card.searchHits = [];
    card.searchIndex = 0;
    if (!term) {
      if (count) count.textContent = '';
      return;
    }
    const hits = [];
    highlight(body, term, hits);
    card.searchHits = hits;
    if (count) {
      count.textContent = hits.length
        ? t('search.count').replace('{i}', '1').replace('{n}', String(hits.length))
        : t('search.none');
    }
    if (hits.length) {
      hits[0].classList.add('current');
      hits[0].scrollIntoView({ block: 'center' });
    }
  }

  function stepSearch(card, delta) {
    const hits = card.searchHits || [];
    if (!hits.length) return;
    hits[card.searchIndex]?.classList.remove('current');
    card.searchIndex = (card.searchIndex + delta + hits.length) % hits.length;
    const target = hits[card.searchIndex];
    target.classList.add('current');
    target.scrollIntoView({ block: 'center' });
    const count = card.el.querySelector('.iwb-search-count');
    if (count) count.textContent = t('search.count').replace('{i}', String(card.searchIndex + 1)).replace('{n}', String(hits.length));
  }

  /** Keyboard entry point: '/' always opens (never toggles) and focuses the field. */
  function openSearch(card) {
    const bar = card.el.querySelector('.iwb-search');
    if (!bar) return;
    bar.hidden = false;
    const input = bar.querySelector('.iwb-search-input');
    input.focus();
    input.select();
  }

  function toggleSearch(card) {
    const bar = card.el.querySelector('.iwb-search');
    if (!bar) return;
    const input = bar.querySelector('.iwb-search-input');
    if (!bar.hidden) {
      bar.hidden = true;
      clearHighlights(card.el.querySelector('.iwb-body'));
      card.searchHits = [];
      return;
    }
    bar.hidden = false;
    input.focus();
    input.select();
  }

  // ── turn outline ─────────────────────────────────────────────────────
  let outlinePop = null;
  let outlineCard = null;

  function closeOutline() {
    outlinePop?.remove();
    outlinePop = null;
    outlineCard = null;
  }

  function turnLabel(item, previousUser) {
    const took = item.endTime != null ? formatDuration(Math.max(0, item.endTime - (item.startTime || item.endTime)), t) : '';
    const state = item.endTime == null ? t('outline.running') : (item.failed ? t('turn.failed') : t('turn.worked'));
    const snippet = (previousUser?.text || '').replace(/\s+/g, ' ').trim().slice(0, 42);
    return {
      title: snippet || t('outline.turn').replace('{n}', String(item.turn)),
      meta: took ? state + ' · ' + took : state,
    };
  }

  function jumpToTurn(card, turn) {
    const body = card.el.querySelector('.iwb-body');
    const target = body.querySelector('.iwb-turncard[data-turn="' + turn + '"]');
    closeOutline();
    if (!target) {
      // A folded turn may sit outside the rendered slice: reload from the tail.
      toast(t('outline.notLoaded'));
      return;
    }
    target.scrollIntoView({ block: 'center' });
    target.classList.remove('iwb-flash');
    void target.offsetWidth;
    target.classList.add('iwb-flash');
    setTimeout(() => target.classList.remove('iwb-flash'), 1100);
  }

  function openOutline(card, anchorEl) {
    if (outlinePop && outlineCard === card) {
      closeOutline();
      return;
    }
    closeOutline();
    const view = card.view;
    if (!view) return;
    const pop = el('div', 'iwb-popover iwb-outline');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('card.outline'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('card.outline');
    pop.appendChild(head);

    let previousUser = null;
    const rows = [];
    for (const item of view.items || []) {
      if (item.k === 'user') {
        previousUser = item;
        continue;
      }
      if (item.k !== 'turnProcess') continue;
      rows.push({ item, label: turnLabel(item, previousUser) });
    }
    if (!rows.length) {
      const empty = el('div', 'iwb-popover-note');
      empty.textContent = t('outline.empty');
      pop.appendChild(empty);
    }
    for (const row of rows) {
      const button = el('button', 'iwb-outline-row');
      button.type = 'button';
      button.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>';
      button.querySelector('.iwb-model-name').textContent = row.label.title;
      button.querySelector('.iwb-model-desc').textContent = row.label.meta;
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        jumpToTurn(card, row.item.turn);
      });
      pop.appendChild(button);
    }

    const rect = anchorEl.getBoundingClientRect();
    pop.style.left = Math.round(rect.right - 240) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    outlinePop = pop;
    outlineCard = card;
    const measured = pop.getBoundingClientRect();
    if (measured.left < 8) pop.style.left = '8px';
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
  }

  let refPop = null;

  function closeRefPicker() {
    refPop?.remove();
    refPop = null;
  }

  function quoteText(text, title) {
    const collapsed = String(text || '').replace(/\r/g, '').trim();
    const clipped = collapsed.length > 600 ? collapsed.slice(0, 600).trimEnd() + ' …' : collapsed;
    const quoted = clipped
      .split('\n')
      .map((line) => '> ' + line)
      .join('\n');
    return '> 「' + title + '」\n' + quoted + '\n\n';
  }

  /** Insert a quoted block at the caret of the target card's composer/note. */
  function insertQuote(target, text, sourceTitle) {
    const field =
      target.kind === 'note'
        ? target.el.querySelector('.iwb-note-input')
        : target.el.querySelector('.iwb-foot textarea');
    if (!field) {
      toast(t('ref.noTarget'));
      return false;
    }
    const block = quoteText(text, sourceTitle);
    const start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? start;
    const before = field.value.slice(0, start);
    const after = field.value.slice(end);
    field.value = before + block + after;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.focus();
    const caret = (before + block).length;
    try {
      field.setSelectionRange(caret, caret);
    } catch {
      /* some fields reject selection while hidden */
    }
    ensureVisible(target);
    toast(t('ref.inserted'));
    return true;
  }

  function openRefPicker(anchor, source, text) {
    if (refPop) {
      closeRefPicker();
      return;
    }
    const targets = state.cards.filter((card) => card !== source);
    if (!targets.length) {
      toast(t('ref.none'));
      return;
    }
    const pop = el('div', 'iwb-popover iwb-ref');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('ref.title'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('ref.title');
    pop.appendChild(head);
    for (const target of targets) {
      const button = el('button', 'iwb-model-row');
      button.type = 'button';
      button.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>';
      button.querySelector('.iwb-model-name').textContent = target.title || t('untitled');
      button.querySelector('.iwb-model-desc').textContent =
        target.kind === 'note' ? t('note.title') : target.workspace || t('workspace.none');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        closeRefPicker();
        insertQuote(target, text, source.title || t('untitled'));
      });
      pop.appendChild(button);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left - 60) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    refPop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.left < 8) pop.style.left = '8px';
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
  }

  /** Hover-only message actions: quote this message into another card. */

  document.addEventListener('pointerdown', (event) => {
    if (!refPop) return;
    if (event.target?.closest?.('.iwb-ref')) return;
    closeRefPicker();
  }, true);

  document.addEventListener('pointerdown', (event) => {
    if (!outlinePop) return;
    if (event.target?.closest?.('.iwb-outline') || event.target?.closest?.('[data-act="outline"]')) return;
    closeOutline();
  }, true);

  function dispose() {
    closeRefPicker();
    closeOutline();
  }

  return {
    copyTranscript,
    transcriptMarkdown,
    openSearch,
    toggleSearch,
    runSearch,
    stepSearch,
    closeOutline,
    openOutline,
    closeRefPicker,
    openRefPicker,
    dispose,
  };
}
