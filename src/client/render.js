import { icon } from './icons';
import { STEP_ICONS, stepActivity } from './categories';

/**
 * Card-content renderers: transcript items (messages, turn rows, steps, tool
 * calls, approvals, questions, failures) plus their small action affordances.
 *
 * Everything that touches the board itself — re-rendering a card, opening a
 * picker, marking a card dirty — is injected, so these stay pure builders over
 * the `card`/`item` data they are given.
 */
export function formatDuration(ms, tr = (key) => key) {
  const total = Math.max(1, Math.round(ms / 1000));
  if (total < 60) return tr('duration.seconds').replace('{n}', String(total));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  if (minutes < 60) {
    return seconds
      ? tr('duration.minutesSeconds').replace('{m}', String(minutes)).replace('{s}', String(seconds))
      : tr('duration.minutes').replace('{m}', String(minutes));
  }
  const hours = Math.floor(minutes / 60);
  return tr('duration.hoursMinutes').replace('{h}', String(hours)).replace('{m}', String(minutes % 60));
}

export function createRenderers(deps) {
  const {
    t,
    el,
    appendMarkdownLite,
    markDirty,
    toast,
    adapter,
    expandedTurns,
    rerender,
    openRefPicker,
    ensureVisible,
    onOpenSession,
    renderFoot,
    settleApproval,
    canAnswerApproval,
  } = deps;

  function stepSummary(calls) {
    const running = calls.some((call) => call.state === 'running');
    const kinds = stepActivity(calls);
    const labels = kinds
      .slice(0, 3)
      .map((kind) => t((running ? 'stepRunning.' : 'step.') + kind))
      .filter(Boolean);
    if (!labels.length) return t(running ? 'stepRunning.thinking' : 'step.thinking');
    if (labels.length === 1) return labels[0];
    const continuation = (label) => label.charAt(0).toLowerCase() + label.slice(1);
    if (labels.length === 2) {
      const prefix = t('step.sharedPrefix');
      const second = labels[1];
      const trimmed = prefix && labels[0].startsWith(prefix) && second.startsWith(prefix) ? second.slice(prefix.length) : second;
      return t('step.joinTwo').replace('{first}', labels[0]).replace('{second}', continuation(trimmed));
    }
    const title = [labels[0], ...labels.slice(1).map(continuation)].join(t('step.joinMany'));
    return kinds.length > 3 ? t('step.more').replace('{title}', title) : title;
  }

  function toolIsOpen(card, item) {
    const key = 'call:' + (item.id || item.name + '#' + (item.arg || ''));
    if (card.toolOpen.has(key)) return card.toolOpen.get(key);
    return item.state === 'error';
  }

  function toolNode(card, item) {
    const open = toolIsOpen(card, item);
    const node = el('button', 'iwb-tool ' + (item.state || 'done') + (open ? ' open' : ''));
    node.type = 'button';
    node.innerHTML =
      '<span class="chev">' + icon(open ? 'chevronDown' : 'chevronRight', 11) + '</span>' +
      '<span class="n"></span><span class="a"></span><span class="s">' +
      (item.state === 'running' ? t('tool.running') : item.state === 'error' ? t('tool.error') : t('tool.done')) +
      '</span>';
    node.querySelector('.n').textContent = item.name;
    node.querySelector('.a').textContent = item.arg || '';
    node.title = t('tool.toggle');

    if (open) {
      const detail = el('div', 'iwb-tool-detail');
      if (item.argsText) {
        const label = el('div', 'iwb-tool-label');
        label.textContent = t('tool.args');
        const code = el('div', 'iwb-code');
        code.textContent = item.argsText;
        detail.append(label, code);
      }
      if (item.resultText) {
        const label = el('div', 'iwb-tool-label');
        label.textContent = item.state === 'error' ? t('tool.errorOutput') : t('tool.output');
        const code = el('div', 'iwb-code');
        code.textContent = item.resultText;
        detail.append(label, code);
      }
      if (!detail.childElementCount) {
        const empty = el('div', 'iwb-tool-label');
        empty.textContent = item.state === 'running' ? t('tool.waiting') : t('tool.noOutput');
        detail.appendChild(empty);
      }
      node.appendChild(detail);
    }

    node.addEventListener('click', (event) => {
      event.stopPropagation();
      const key = 'call:' + (item.id || item.name + '#' + (item.arg || ''));
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    });
    return node;
  }

  function stepRowNode(card, step) {
    const key = 'step:' + step.turn + ':' + step.step;
    const running = step.calls.some((call) => call.state === 'running');
    const failed = step.calls.some((call) => call.state === 'error');
    const open = card.toolOpen.has(key) ? card.toolOpen.get(key) : false;
    const activity = stepActivity(step.calls)[0] || 'thinking';
    const node = el(
      'div',
      'iwb-step' + (open ? ' open' : '') + (running ? ' running' : '') + (failed ? ' failed' : '')
    );
    node.setAttribute('role', 'button');
    node.tabIndex = 0;
    node.dataset.activity = activity;
    node.innerHTML =
      '<span class="lead"><span class="ico">' +
      (STEP_ICONS[activity] || STEP_ICONS.tools) +
      '</span><span class="chev">' +
      icon(open ? 'chevronUp' : 'chevronDown', 12) +
      '</span></span><span class="txt"></span>';
    node.querySelector('.txt').textContent = stepSummary(step.calls);
    node.title = t('tool.toggle');
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    });
    node.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    });
    if (open) {
      const detail = el('div', 'iwb-step-detail');
      for (const call of step.calls) detail.appendChild(toolNode(card, call));
      node.appendChild(detail);
    }
    return node;
  }

  /**
   * Turn header row, like the native conversation: it appears at the head of a
   * finished turn and carries only the outcome and duration. The individual step
   * lines stay inline in the transcript, each collapsed to one clickable line.
   */
  function turnNode(card, item) {
    if (item.endTime == null) return null;
    const boardKey = card.sessionId + ':' + item.turn;
    const key = 'turn:' + item.turn;
    const open = expandedTurns.has(boardKey)
      ? expandedTurns.get(boardKey)
      : card.toolOpen.has(key)
        ? card.toolOpen.get(key)
        : false;
    const took = formatDuration(Math.max(0, item.endTime - (item.startTime || item.endTime)), t);
    const summary = (item.failed ? t('turn.failed') : t('turn.worked')) + (took ? '，' + t('turn.used') + took : '');

    // Header row and its expanded detail are siblings inside the wrapper: the row
    // itself is a flex line, so appending the detail into it would lay the steps
    // out beside the text instead of underneath it.
    const wrapper = el('div', 'iwb-turncard' + (open ? ' open' : ''));
    wrapper.dataset.turn = String(item.turn);
    const node = el('div', 'iwb-turn' + (item.failed ? ' failed' : '') + (open ? ' open' : ''));
    node.innerHTML = '<span class="txt"></span><span class="chev">' + icon(open ? 'chevronDown' : 'chevronRight', 11) + '</span>';
    node.querySelector('.txt').textContent = summary;
    node.title = t('turn.meta');
    node.setAttribute('role', 'button');
    node.tabIndex = 0;
    const toggle = () => {
      expandedTurns.set(boardKey, !open);
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    };
    node.addEventListener('click', toggle);
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
    wrapper.appendChild(node);

    if (open) {
      const detail = el('div', 'iwb-turn-detail');
      for (const step of item.steps || []) detail.appendChild(stepRowNode(card, step));
      if (!detail.childElementCount) {
        const empty = el('div', 'iwb-turn-meta');
        empty.textContent = t('turn.noMeta');
        detail.appendChild(empty);
      }
      const stats = [];
      if (item.toolCalls) stats.push(t('turn.toolCalls').replace('{n}', String(item.toolCalls)));
      if (item.messages) stats.push(t('turn.messages').replace('{n}', String(item.messages)));
      if (stats.length) {
        const meta = el('div', 'iwb-turn-meta');
        meta.textContent = stats.join(' · ');
        detail.appendChild(meta);
      }
      wrapper.appendChild(detail);
    }
    return wrapper;
  }

  /**
   * Markdown rendering for assistant text. Block-level parser (fences, headings,
   * tables, quotes, lists, hr, paragraphs) plus an inline pass (code, bold,
   * italic, strike, links). Everything is built from DOM nodes and textContent,
   * so model output can never inject markup.
   */

  function answerDraft(card, pending) {
    if (!card.answers || card.answers.callId !== pending.callId) {
      card.answers = { callId: pending.callId, selections: {}, custom: {} };
    }
    return card.answers;
  }

  async function submitAnswer(card, pending, draft) {
    const answers = pending.items.map((item) => {
      const selected = draft.selections[item.id] || [];
      const custom = (draft.custom[item.id] || '').trim();
      const entry = { id: item.id, selected };
      if (custom) entry.custom = custom;
      return entry;
    });
    try {
      await adapter.answerQuestion(card.sessionId, pending.callId, answers);
      card.answers = undefined;
      toast(t('answer.submitted'));
      markDirty(card);
    } catch (error) {
      toast(error?.message || t('answer.failed'));
    }
  }

  function questionNode(card, pending) {
    const draft = answerDraft(card, pending);
    const node = el('div', 'iwb-question');
    const head = el('div', 'iwb-question-head');
    head.textContent = t('question.title');
    node.appendChild(head);

    for (const item of pending.items) {
      const block = el('div', 'iwb-question-item');
      if (item.header) {
        const header = el('div', 'iwb-question-header');
        header.textContent = item.header;
        block.appendChild(header);
      }
      const text = el('div', 'iwb-question-text');
      text.textContent = item.question || '';
      block.appendChild(text);

      const options = item.options || [];
      if (options.length) {
        const list = el('div', 'iwb-question-options');
        for (const option of options) {
          const selected = (draft.selections[item.id] || []).includes(option.label);
          const button = el('button', 'iwb-question-option' + (selected ? ' selected' : ''));
          button.type = 'button';
          button.textContent = option.label;
          if (option.description) button.title = option.description;
          button.addEventListener('click', (event) => {
            event.stopPropagation();
            const current = draft.selections[item.id] || [];
            if (item.multiSelect) {
              draft.selections[item.id] = current.includes(option.label)
                ? current.filter((value) => value !== option.label)
                : [...current, option.label];
            } else {
              draft.selections[item.id] = [option.label];
            }
            for (const sibling of list.querySelectorAll('.iwb-question-option')) {
              sibling.classList.toggle('selected', (draft.selections[item.id] || []).includes(sibling.textContent));
            }
            const single = pending.items.length === 1 && !item.multiSelect;
            if (single) void submitAnswer(card, pending, draft);
          });
          list.appendChild(button);
        }
        block.appendChild(list);
      }

      const custom = el('input', 'iwb-question-custom');
      custom.type = 'text';
      custom.placeholder = t('answer.custom');
      custom.value = draft.custom[item.id] || '';
      custom.addEventListener('input', () => {
        draft.custom[item.id] = custom.value;
      });
      custom.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.isComposing) {
          event.preventDefault();
          void submitAnswer(card, pending, draft);
        }
      });
      block.appendChild(custom);
      node.appendChild(block);
    }

    const actions = el('div', 'iwb-question-actions');
    const submit = el('button', 'iwb-btn primary');
    submit.type = 'button';
    submit.textContent = t('answer.submit');
    submit.addEventListener('click', (event) => {
      event.stopPropagation();
      void submitAnswer(card, pending, draft);
    });
    if (!answerable) {
      const note = el('div', 'iwb-approval-note');
      note.textContent = t('approval.platformLimit');
      node.appendChild(note);
    }
    const native = el('button', 'iwb-btn');
    native.type = 'button';
    native.textContent = t('answer.openNative');
    native.addEventListener('click', (event) => {
      event.stopPropagation();
      onOpenSession?.(card.sessionId);
    });
    actions.append(submit, native);
    node.appendChild(actions);
    return node;
  }

  function approvalNode(card, approvals) {
    const node = el('div', 'iwb-approval');
    const head = el('div', 'iwb-approval-head');
    head.textContent = t('approval.waiting');
    node.appendChild(head);
    for (const approval of approvals) {
      const row = el('div', 'iwb-approval-row');
      row.textContent = approval.toolName
        ? t('approval.tool').replace('{name}', approval.toolName)
        : t('approval.unknown');
      if (approval.reason) {
        const reason = el('div', 'iwb-approval-reason');
        reason.textContent = approval.reason;
        row.appendChild(reason);
      }
      node.appendChild(row);
    }
    const actions = el('div', 'iwb-question-actions');
    const answerable = approvals.some((approval) => canAnswerApproval?.(card.sessionId, approval.id));
    if (answerable) {
      const allow = el('button', 'iwb-btn primary');
      allow.type = 'button';
      allow.textContent = t('approval.allowOnce');
      allow.addEventListener('click', (event) => {
        event.stopPropagation();
        allow.disabled = true;
        for (const approval of approvals) settleApproval?.(card.sessionId, approval.id, 'allowed-once');
      });
      const reject = el('button', 'iwb-btn');
      reject.type = 'button';
      reject.textContent = t('approval.reject');
      reject.addEventListener('click', (event) => {
        event.stopPropagation();
        reject.disabled = true;
        for (const approval of approvals) settleApproval?.(card.sessionId, approval.id, 'rejected');
      });
      actions.append(allow, reject);
    }
    const native = el('button', 'iwb-btn');
    native.type = 'button';
    native.textContent = t('approval.openNative');
    native.addEventListener('click', (event) => {
      event.stopPropagation();
      onOpenSession?.(card.sessionId);
    });
    actions.appendChild(native);
    node.appendChild(actions);
    return node;
  }

  /**
   * Red turn-failure banner. Titles and details reuse the native copy
   * (`任务已停止` / `DSH 进程在本轮完成前退出…` / `本轮运行失败` / `已达到输出 token 上限`).
   */
  function failureNode(item) {
    const failure = item.failure || {};
    const node = el('div', 'iwb-fail');
    const head = el('div', 'iwb-fail-head');
    const dot = el('span', 'iwb-fail-dot');
    const title = el('span', 'iwb-fail-title');
    title.textContent = failure.title ? t(failure.title) : t('failure.turnError');
    head.append(dot, title);
    node.appendChild(head);
    const detail = failure.detail ? t(failure.detail) : failure.message || '';
    if (detail) {
      const body = el('div', 'iwb-fail-detail');
      body.textContent = detail;
      node.appendChild(body);
    }
    return node;
  }

  function messageActions(card, item) {
    const actions = el('div', 'iwb-msg-actions');
    const quote = el('button', 'iwb-msg-action');
    quote.type = 'button';
    quote.title = t('ref.to');
    quote.setAttribute('aria-label', t('ref.to'));
    quote.innerHTML = icon('quote', 12);
    quote.addEventListener('click', (event) => {
      event.stopPropagation();
      openRefPicker(event.currentTarget, card, item.text || '');
    });
    actions.appendChild(quote);
    return actions;
  }

  function itemNode(card, item) {
    if (item.k === 'user') {
      const node = el('div', 'iwb-msg user');
      if (item.text) {
        const text = el('div', 'iwb-msg-text');
        text.textContent = item.text;
        node.appendChild(text);
      }
      const attachments = item.attachments || [];
      if (attachments.length) {
        const list = el('div', 'iwb-msg-attach-list');
        for (const attachment of attachments) {
          const chip = el('span', 'iwb-msg-attach');
          chip.innerHTML = icon(attachment.kind === 'image' ? 'image' : 'note', 11);
          const label = el('span', 'iwb-msg-attach-name');
          label.textContent = attachment.name || t('attach.file');
          chip.appendChild(label);
          list.appendChild(chip);
        }
        node.appendChild(list);
      }
      node.appendChild(messageActions(card, item));
      return node;
    }
    if (item.k === 'assistant') {
      const node = el('div', 'iwb-msg assistant' + (item.live ? ' iwb-cursor' : ''));
      appendMarkdownLite(node, item.text || '');
      node.appendChild(messageActions(card, item));
      return node;
    }
    if (item.k === 'reasoning') {
      const node = el('div', 'iwb-reasoning');
      node.textContent = '思考：' + item.text.slice(0, 400);
      return node;
    }
    if (item.k === 'turnProcess') return turnNode(card, item);
    if (item.k === 'step') {
      // Desktop default (transcriptView: standard) keeps live process detail while
      // the turn runs and folds it into the turn header once the turn completes.
      const turnItem = (card.view?.items || []).find((entry) => entry.k === 'turnProcess' && entry.turn === item.turn);
      if (turnItem && turnItem.endTime != null) return null;
      return stepRowNode(card, item);
    }
    if (item.k === 'failure') return failureNode(item);
    if (item.k === 'tool') return toolNode(card, item);
    if (item.k === 'error') {
      const node = el('div', 'iwb-msg error');
      node.textContent = item.text;
      return node;
    }
    const node = el('div', 'iwb-msg notice');
    node.textContent = item.text;
    return node;
  }

  function attachmentChip(card, attachment) {
    const upload = adapter.uploadSnapshots?.()[attachment.id] || {};
    const status = upload.status || 'ready';
    const chip = el('div', 'iwb-attachment' + (status === 'error' ? ' error' : status === 'uploading' ? ' uploading' : ''));
    if (attachment.kind === 'image' && attachment.previewUrl) {
      const thumb = document.createElement('img');
      thumb.src = attachment.previewUrl;
      thumb.alt = attachment.name || t('attach.image');
      chip.appendChild(thumb);
    } else {
      const name = el('span', 'iwb-attachment-name');
      name.textContent = attachment.name || t('attach.file');
      chip.appendChild(name);
    }
    if (status === 'uploading') {
      const spinner = el('span', 'iwb-attachment-state');
      spinner.textContent = '…';
      chip.appendChild(spinner);
    }
    const remove = el('button', 'iwb-attachment-x');
    remove.type = 'button';
    remove.title = t('attach.remove');
    remove.setAttribute('aria-label', t('attach.remove'));
    remove.innerHTML = icon('close', 10);
    remove.addEventListener('click', (event) => {
      event.stopPropagation();
      card.attachments = (card.attachments || []).filter((item) => item.id !== attachment.id);
      adapter.releaseDrafts?.([attachment.id]);
      renderFoot(card);
    });
    chip.appendChild(remove);
    if (status === 'error') {
      chip.title = t('attach.failedShort');
      const retry = el('button', 'iwb-attachment-retry');
      retry.type = 'button';
      retry.textContent = t('attach.retry');
      retry.addEventListener('click', (event) => {
        event.stopPropagation();
        if (adapter.retryUpload?.(card.sessionId, attachment.id)) {
          renderFoot(card);
        }
      });
      chip.appendChild(retry);
    }
    return chip;
  }


  return {
    itemNode,
    turnNode,
    stepRowNode,
    toolNode,
    questionNode,
    approvalNode,
    failureNode,
    attachmentChip,
    stepSummary,
    formatDuration,
    toolIsOpen,
    answerDraft,
    submitAnswer,
    messageActions,
  };
}
