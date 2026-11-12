/**
 * Board engine: the free canvas, the cards on it, and the stacking model.
 *
 * Deliberately framework-free. It owns one DOM subtree under the plugin's own
 * container and talks to sessions only through the adapter, so a session update
 * can never re-create the composer or the textarea a user is typing into.
 */

import { fetchRemoteLayout, pushRemoteLayout, subscribeRemoteLayout, fetchCanvases, pushCanvases } from './persistence';

import { clamp, el } from './dom';
import { icon } from './icons';
import { STEP_ICONS, TOOL_CATEGORY, stepActivity } from './categories';
import { createMarkdown } from './markdown';
import { createRenderers } from './render';
import { createCardTools } from './card-tools';
import { createModelMenu, createArrangeMenu, createSettingsMenu, createWorkspaceMenu } from './popovers';

const STORAGE_KEY = 'dsh.inspiration-workbench.v1';
const CANVAS_KEY = 'dsh.inspiration-workbench.canvases.v1';
const DEFAULT_W = 380;
const DEFAULT_H = 500;
const GAP = 20;
const STACK_OFFSET = 14;

function formatElapsed(ms) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return seconds + 's';
  return Math.floor(seconds / 60) + 'm' + String(seconds % 60).padStart(2, '0') + 's';
}

export function createBoard({ host, adapter, approvals, t, onOpenSession }) {
  const { appendMarkdownLite } = createMarkdown({ t });
  const state = {
    zoom: 1,
    pan: { x: 24, y: 24 },
    cards: [],
    stacks: [],
    seq: 0,
    stackSeq: 0,
    settings: { inlineApprovals: false, chainWheel: true },
    selected: new Set(),
    zTop: 20,
    focusedId: null,
    savedView: false,
    board: { active: false, key: 'status', saved: new Map() },
    canvases: [],
    activeCanvas: null,
  };

  // Turn expansion survives a remote layout apply (which rebuilds card DOM):
  // the state lives on the board keyed by session + turn, not on the card object.
  const expandedTurns = new Map();
  const tools = createCardTools({ t, el, toast, ensureVisible, state });
  const {
    copyTranscript,
    openSearch,
    toggleSearch,
    runSearch,
    stepSearch,
    closeOutline,
    openOutline,
    closeRefPicker,
    openRefPicker,
  } = tools;
  const {
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
  } = createRenderers({
    t,
    el,
    appendMarkdownLite,
    markDirty,
    toast,
    adapter,
    expandedTurns,
    rerender: (card) => {
      if (card.view) renderBody(card, card.view);
    },
    openRefPicker: (anchor, source, text) => tools.openRefPicker(anchor, source, text),
    ensureVisible,
    onOpenSession,
    renderFoot,
    settleApproval: (sessionId, approvalId, outcome) => {
      approvals?.settleFor?.(sessionId, approvalId, outcome);
      for (const card of state.cards) markDirty(card);
    },
    canAnswerApproval: (sessionId, approvalId) => Boolean(approvals?.hasFor?.(sessionId, approvalId)),
  });
  const dirty = new Set();
  let frame = 0;
  let disposed = false;
  let restoreDone = false;

  // ── DOM skeleton ─────────────────────────────────────────────────────
  const root = el('div', 'iwb-root');
  const toolbar = el('div', 'iwb-toolbar');
  const titles = el('div', 'iwb-titles');
  const titleNode = el('div', 'iwb-title');
  titleNode.textContent = t('title');
  const countsNode = el('div', 'iwb-counts');
  titles.append(titleNode, countsNode);

  const hint = el('div', 'iwb-hint');
  hint.innerHTML =
    '<span>' + t('hint.pan') + '</span><span><kbd>⌘</kbd><kbd>' + t('hint.zoomKey') + '</kbd> ' + t('hint.zoom') + '</span>';
  if (t('hint.pan')) hint.hidden = false;

  const btnNew = el('button', 'iwb-btn primary', icon('plus', 13) + '<span>' + t('new') + '</span>');
  btnNew.type = 'button';
  const btnCanvas = el('button', 'iwb-btn', icon('canvas', 13) + '<span>' + t('canvas') + '</span>');
  btnCanvas.type = 'button';
  const btnArrange = el('button', 'iwb-btn', icon('arrange', 13) + '<span>' + t('arrange') + '</span>');
  btnArrange.type = 'button';
  const btnBoard = el('button', 'iwb-btn', icon('board', 13) + '<span>' + t('boardMode') + '</span>');
  btnBoard.type = 'button';
  const btnFit = el('button', 'iwb-btn', icon('fit', 13) + '<span>' + t('fit') + '</span>');
  btnFit.type = 'button';
  const todoBar = el('button', 'iwb-todo', '');
  todoBar.type = 'button';
  todoBar.hidden = true;
  const btnNote = el('button', 'iwb-btn', icon('note', 13) + '<span>' + t('note.add') + '</span>');
  btnNote.type = 'button';
  const btnCollapse = el('button', 'iwb-btn', '<span>' + t('board.collapseAll') + '</span>');
  btnCollapse.type = 'button';
  const btnSettings = el('button', 'iwb-btn', icon('sliders', 13) + '<span>' + t('settings') + '</span>');
  btnSettings.type = 'button';
  const actions = el('div', 'iwb-toolbar-actions');
  actions.append(todoBar, btnNew, btnNote, btnCanvas, btnArrange, btnBoard, btnFit, btnCollapse, btnSettings);
  toolbar.append(titles, hint, actions);

  const canvas = el('div', 'iwb-canvas');
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'list');
  canvas.setAttribute('aria-label', t('a11y.canvas'));
  const world = el('div', 'iwb-world');
  canvas.appendChild(world);
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const linkLayer = document.createElementNS(SVG_NS, 'svg');
  linkLayer.setAttribute('class', 'iwb-links');
  linkLayer.setAttribute('aria-hidden', 'true');
  world.appendChild(linkLayer);

  const emptyState = el(
    'div',
    'iwb-empty',
    '<div class="iwb-empty-title">' +
      t('empty.title') +
      '</div><div class="iwb-empty-sub">' +
      t('empty.sub') +
      '</div>'
  );
  emptyState.style.position = 'absolute';
  emptyState.style.inset = '0';
  emptyState.style.pointerEvents = 'none';
  canvas.appendChild(emptyState);

  const zoomBar = el('div', 'iwb-zoom');
  const zoomOut = el('button', null, icon('minus', 13));
  zoomOut.type = 'button';
  const zoomValue = el('div', 'iwb-zoom-value');
  zoomValue.textContent = '100%';
  const zoomIn = el('button', null, icon('plus', 13));
  zoomIn.type = 'button';
  const zoomFitBtn = el('button', null, icon('fit', 13));
  zoomFitBtn.type = 'button';
  zoomBar.append(zoomOut, zoomValue, zoomIn, zoomFitBtn);
  canvas.appendChild(zoomBar);

  const layer = el('div', 'iwb-layer');
  const modelMenu = createModelMenu({
    t,
    layer,
    adapter,
    markDirty,
    toast,
    onEscapeExtras: () => {
      tools.closeOutline();
      tools.closeRefPicker();
    },
  });
  const arrangeMenu = createArrangeMenu({ t, state, canvas, fitView, saveSoon, toast, defaultSize: { w: DEFAULT_W, h: DEFAULT_H }, gap: GAP, anchor: btnArrange, afterArrange: () => schedulePipelines() });
  const workspaceMenu = createWorkspaceMenu({
    t,
    adapter,
    toast,
    addSession: (options) => addSession(options),
    centerCard,
    anchor: btnNew,
  });
  const settingsMenu = createSettingsMenu({
    t,
    el,
    state,
    saveSoon,
    applySizePreset,
    exportLayout,
    importLayout,
    resetLayout: () => reset(),
    closeArrange: () => arrangeMenu.close(),
    closeWorkspace: () => workspaceMenu.close(),
    closeOverlays: () => {
      tools.closeRefPicker();
      tools.closeOutline();
    },
    approvals,
    toast,
    anchor: btnSettings,
  });
  const stopTitleWatch = adapter.watchTitles?.(() => {
    for (const card of state.cards) {
      if (card.kind === 'note') continue;
      const title = adapter.titleOf(card.sessionId);
      if (!title || title === card.title) continue;
      card.title = title;
      const node = card.el?.querySelector('.iwb-card-title');
      if (node) {
        node.textContent = title;
        node.title = title;
      }
    }
    updateTodoBar();
  });

  const stopUploadWatch = adapter.subscribeUploads?.(() => {
    for (const card of state.cards) {
      if (!card.attachments?.length) continue;
      renderFoot(card);
    }
  });

  const stopApprovalWatch = approvals?.subscribe?.(() => {
    for (const card of state.cards) markDirty(card);
  });

  // ── inline approvals ─────────────────────────────────────────────────
  const batchBar = el('div', 'iwb-batch');
  batchBar.hidden = true;
  batchBar.setAttribute('role', 'toolbar');
  batchBar.setAttribute('aria-label', t('batch.title'));
  const toastNode = el('div', 'iwb-toast');
  toastNode.setAttribute('role', 'status');
  toastNode.setAttribute('aria-live', 'polite');
  root.append(toolbar, canvas, layer, batchBar, toastNode);
  host.appendChild(root);

  // ── view ─────────────────────────────────────────────────────────────
  function applyView() {
    world.style.transform = 'translate(' + state.pan.x + 'px,' + state.pan.y + 'px) scale(' + state.zoom + ')';
    const grid = 24 * state.zoom;
    canvas.style.backgroundSize = grid + 'px ' + grid + 'px';
    canvas.style.backgroundPosition = state.pan.x + 'px ' + state.pan.y + 'px';
    zoomValue.textContent = Math.round(state.zoom * 100) + '%';
    saveSoon();
  }

  let anim = 0;
  function animateTo(zoom, pan) {
    cancelAnimationFrame(anim);
    const from = { zoom: state.zoom, pan: { ...state.pan } };
    const t0 = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    return new Promise((resolve) => {
      const tick = (now) => {
        const k = ease(clamp((now - t0) / 240, 0, 1));
        state.zoom = from.zoom + (zoom - from.zoom) * k;
        state.pan.x = from.pan.x + (pan.x - from.pan.x) * k;
        state.pan.y = from.pan.y + (pan.y - from.pan.y) * k;
        applyView();
        if (k < 1) anim = requestAnimationFrame(tick);
        else resolve();
      };
      anim = requestAnimationFrame(tick);
    });
  }

  function bounds() {
    if (!state.cards.length) return null;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const card of state.cards) {
      minX = Math.min(minX, card.x);
      minY = Math.min(minY, card.y);
      maxX = Math.max(maxX, card.x + card.w);
      maxY = Math.max(maxY, card.y + card.h);
    }
    return { minX, minY, maxX, maxY };
  }

  function fitView(animated = true) {
    const box = bounds();
    if (!box) return;
    const pad = 48;
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    const zoom = clamp(Math.min((vw - pad * 2) / (box.maxX - box.minX), (vh - pad * 2) / (box.maxY - box.minY)), 0.3, 1.1);
    const pan = {
      x: (vw - (box.maxX - box.minX) * zoom) / 2 - box.minX * zoom,
      y: (vh - (box.maxY - box.minY) * zoom) / 2 - box.minY * zoom,
    };
    if (!animated) {
      state.zoom = zoom;
      state.pan = pan;
      applyView();
      return;
    }
    return animateTo(zoom, pan);
  }

  function centerCard(card) {
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    const zoom = clamp(Math.max(state.zoom, 0.9), 0.6, 1.2);
    return animateTo(zoom, {
      x: (vw - card.w * zoom) / 2 - card.x * zoom,
      y: (vh - card.h * zoom) / 2 - card.y * zoom,
    });
  }

  // ── toast ────────────────────────────────────────────────────────────
  let toastTimer = 0;
  function toast(text) {
    toastNode.textContent = text;
    toastNode.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastNode.classList.remove('show'), 2400);
  }

  // ── stacks ───────────────────────────────────────────────────────────
  const byId = (id) => state.cards.find((c) => c.id === id);
  const stackOf = (card) => (card && card.stackId ? state.stacks.find((s) => s.id === card.stackId) : null);
  const stackCards = (stack) => stack.order.map(byId).filter(Boolean);
  const stackTop = (stack) => {
    const list = stackCards(stack);
    return list[list.length - 1];
  };

  function layoutStack(stack) {
    const cards = stackCards(stack);
    if (!cards.length) return;
    schedulePipelines();
    state.zTop += cards.length + 1;
    const base = state.zTop;
    const inStack = cards.length > 1;
    cards.forEach((card, index) => {
      card.x = stack.x + index * STACK_OFFSET;
      card.y = stack.y + index * STACK_OFFSET;
      card.el.style.left = card.x + 'px';
      card.el.style.top = card.y + 'px';
      card.el.style.zIndex = String(base + index);
      card.el.classList.toggle('iwb-in-stack', inStack);
      const badge = card.el.querySelector('.iwb-stack-badge');
      if (badge) {
        badge.hidden = !(inStack && index === cards.length - 1);
        badge.textContent = t('stacked').replace('{n}', String(cards.length));
      }
      const detach = card.el.querySelector('[data-act="detach"]');
      if (detach) detach.style.display = inStack ? '' : 'none';
    });
  }

  function createStack(card) {
    const stack = { id: 'st' + ++state.stackSeq, x: card.x, y: card.y, order: [card.id] };
    card.stackId = stack.id;
    state.stacks.push(stack);
    return stack;
  }

  function promoteInStack(card) {
    const stack = stackOf(card);
    if (!stack || stackTop(stack) === card) return;
    stack.order = stack.order.filter((id) => id !== card.id);
    stack.order.push(card.id);
    layoutStack(stack);
    saveSoon();
  }

  function ensureVisible(card) {
    const rect = canvas.getBoundingClientRect();
    const left = rect.left + state.pan.x + card.x * state.zoom;
    const top = rect.top + state.pan.y + card.y * state.zoom;
    const right = left + card.w * state.zoom;
    const bottom = top + card.h * state.zoom;
    const margin = 40;
    if (left < rect.left + margin || top < rect.top + margin || right > rect.right - margin || bottom > rect.bottom - margin) {
      void centerCard(card);
    }
  }

  function stackOnto(target, card) {
    if (!target || target === card) return;
    const stack = stackOf(target) || createStack(target);
    if (stackOf(card)) detachFromStack(card, true);
    if (stack.order.includes(card.id)) return;
    stack.order.push(card.id);
    card.stackId = stack.id;
    layoutStack(stack);
    ensureVisible(stackTop(stack) || card);
    toast(t('toast.stacked'));
    saveSoon();
  }

  function detachFromStack(card, silent) {
    const stack = stackOf(card);
    if (!stack) return;
    stack.order = stack.order.filter((id) => id !== card.id);
    card.stackId = null;
    card.x = stack.x + stack.order.length * STACK_OFFSET + 56;
    card.y = stack.y + 28;
    card.el.style.left = card.x + 'px';
    card.el.style.top = card.y + 'px';
    card.el.classList.remove('iwb-in-stack');
    const badge = card.el.querySelector('.iwb-stack-badge');
    if (badge) badge.hidden = true;
    const detach = card.el.querySelector('[data-act="detach"]');
    if (detach) detach.style.display = 'none';

    if (stack.order.length <= 1) {
      const last = stack.order.length ? byId(stack.order[0]) : null;
      if (last) {
        last.stackId = null;
        last.x = stack.x;
        last.y = stack.y;
        last.el.style.left = last.x + 'px';
        last.el.style.top = last.y + 'px';
        last.el.classList.remove('iwb-in-stack');
        const lastBadge = last.el.querySelector('.iwb-stack-badge');
        if (lastBadge) lastBadge.hidden = true;
        const lastDetach = last.el.querySelector('[data-act="detach"]');
        if (lastDetach) lastDetach.style.display = 'none';
      }
      state.stacks = state.stacks.filter((s) => s !== stack);
    } else {
      layoutStack(stack);
    }
    if (!silent) saveSoon();
  }

  function overlapRatio(a, b) {
    const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
    const y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    if (!x || !y) return 0;
    return (x * y) / (a.w * a.h);
  }

  function tryStack(card) {
    let best = null;
    let bestRatio = 0;
    for (const other of state.cards) {
      if (other === card) continue;
      const stack = stackOf(other);
      const target = stack ? stackCards(stack)[0] : other;
      if (!target || target === card) continue;
      const ratio = overlapRatio(card, target);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = target;
      }
    }
    if (best && bestRatio >= 0.42) stackOnto(best, card);
  }

  // ── cards ────────────────────────────────────────────────────────────
  function nextSlot() {
    const cols = 3;
    const hit = (a, b) =>
      !(
        a.x + a.w + GAP <= b.x ||
        b.x + b.w + GAP <= a.x ||
        a.y + a.h + GAP <= b.y ||
        b.y + b.h + GAP <= a.y
      );
    for (let i = 0; i < 400; i += 1) {
      const candidate = { x: (i % cols) * (DEFAULT_W + GAP), y: Math.floor(i / cols) * (DEFAULT_H + GAP), w: DEFAULT_W, h: DEFAULT_H };
      if (!state.cards.some((card) => hit(candidate, card))) return { x: candidate.x, y: candidate.y };
    }
    return { x: 0, y: (state.cards.length + 1) * (DEFAULT_H + GAP) };
  }

  function cardMarkup(card) {
    return (
      '<div class="iwb-progress"></div>' +
      '<header class="iwb-head">' +
      '<span class="iwb-dot" title="' + t('state.idle') + '"></span>' +
      '<span class="iwb-card-title"></span>' +
      '<span class="iwb-card-workspace" hidden></span>' +
      '<span class="iwb-status" hidden></span>' +
      '<span class="iwb-unread" hidden></span>' +
      '<button type="button" class="iwb-meta"></button>' +
      '<span class="iwb-elapsed"></span>' +
      '<span class="iwb-stack-badge" hidden></span>' +
      '<span class="iwb-pipe-badge" hidden></span>' +
      '<span class="iwb-actions">' +
      '<button type="button" data-act="outline" title="' + t('card.outline') + '" aria-label="' + t('card.outline') + '">' + icon('list') + '</button>' +
      '<button type="button" data-act="search" title="' + t('card.search') + '" aria-label="' + t('card.search') + '">' + icon('search') + '</button>' +
      '<button type="button" data-act="more" class="iwb-act-more" title="' + t('card.more') + '" aria-label="' + t('card.more') + '">' + icon('more') + '</button>' +
      '<button type="button" data-act="close" title="' + t('remove') + '" aria-label="' + t('remove') + '">' + icon('close') + '</button>' +
      '<span class="iwb-acts-more" hidden>' +
      '<button type="button" data-act="pin" title="' + t('card.pin') + '" aria-label="' + t('card.pin') + '">' + icon('pin') + '</button>' +
      '<button type="button" data-act="copy" title="' + t('card.copy') + '" aria-label="' + t('card.copy') + '">' + icon('copy') + '</button>' +
      '<button type="button" data-act="detach" title="' + t('detach') + '" aria-label="' + t('detach') + '" style="display:none">' + icon('layers') + '</button>' +
      '<button type="button" data-act="open" title="' + t('openNative') + '" aria-label="' + t('openNative') + '">' + icon('open') + '</button>' +
      '</span>' +
      '</span>' +
      '</header>' +
      '<div class="iwb-search" hidden><input class="iwb-search-input" type="text" /><span class="iwb-search-count"></span></div>' +
      '<div class="iwb-body"></div>' +
      '<div class="iwb-queue" hidden></div>' +
      '<div class="iwb-foot"></div>' +
      '<div class="iwb-resize"></div>'
    );
  }

  function noteBody(card) {
    const body = card.el.querySelector('.iwb-body');
    body.textContent = '';
    const wrap = el('div', 'iwb-note');
    const area = document.createElement('textarea');
    area.className = 'iwb-note-input';
    area.value = card.note || '';
    area.placeholder = t('note.placeholder');
    area.addEventListener('input', () => {
      card.note = area.value;
      saveSoon();
    });
    wrap.appendChild(area);
    body.appendChild(wrap);
  }

  function addNote({ id, note, title, x, y, w, h, focus }) {
    if (disposed) return null;
    const slot = nextSlot();
    const card = {
      id: id || 'n' + ++state.seq,
      kind: 'note',
      note: note || '',
      title: title || t('note.title'),
      x: typeof x === 'number' ? x : slot.x,
      y: typeof y === 'number' ? y : slot.y,
      w: typeof w === 'number' ? w : DEFAULT_W,
      h: typeof h === 'number' ? h : DEFAULT_H,
      stackId: null,
    };
    const node = el('article', 'iwb-card iwb-card-note', cardMarkup(card));
    node.tabIndex = -1;
    node.setAttribute('role', 'listitem');
    node.style.left = card.x + 'px';
    node.style.top = card.y + 'px';
    node.style.width = card.w + 'px';
    node.style.height = card.h + 'px';
    card.el = node;
    world.appendChild(node);
    node.querySelector('.iwb-card-title').textContent = card.title;
    node.querySelector('.iwb-meta')?.remove();
    node.querySelector('.iwb-elapsed')?.remove();
    node.querySelector('.iwb-foot')?.remove();
    // A note card has no transcript: search and outline make no sense there.
    node.querySelector('[data-act="search"]')?.remove();
    node.querySelector('[data-act="outline"]')?.remove();
    node.querySelector('[data-act="pipe"]')?.remove();
    node.querySelector('.iwb-pipe-badge')?.remove();

    node.querySelector('.iwb-search')?.remove();
    noteBody(card);
    bindCard(card);
    state.cards.push(card);
    updateCounts();
    updateEmptyState();
    saveSoon();
    if (focus) centerCard(card);
    return card;
  }

  function addSession({ sessionId, title, workspace, x, y, w, h, focus, pipeline }) {
    if (disposed) return null;
    const existing = state.cards.find((card) => card.sessionId === sessionId);
    if (existing) {
      if (existing.stackId) promoteInStack(existing);
      centerCard(existing);
      flash(existing);
      return existing;
    }
    const slot = nextSlot();
    const card = {
      id: 'c' + ++state.seq,
      sessionId,
      title: title || adapter.titleOf(sessionId) || t('untitled'),
      model: '',
      x: typeof x === 'number' ? x : slot.x,
      y: typeof y === 'number' ? y : slot.y,
      w: w || DEFAULT_W,
      h: h || DEFAULT_H,
      stackId: null,
      running: false,
      startedAt: 0,
      composerDraft: '',
      toolOpen: new Map(),
      view: null,
      pipeline: pipeline || null,
      pipeDepth: 0,
      pipedFingerprint: '',
    };

    const node = el('article', 'iwb-card', cardMarkup(card));
    node.tabIndex = -1;
    node.setAttribute('role', 'listitem');
    node.style.left = card.x + 'px';
    node.style.top = card.y + 'px';
    node.style.width = card.w + 'px';
    node.style.height = card.h + 'px';
    node.dataset.sessionId = sessionId;
    card.el = node;
    world.appendChild(node);
    node.appendChild(el('span', 'iwb-port'));
    node.querySelector('.iwb-card-title').textContent = card.title;
    const bodyRegion = node.querySelector('.iwb-body');
    bodyRegion.tabIndex = 0;
    bodyRegion.setAttribute('role', 'log');
    bodyRegion.setAttribute('aria-label', t('a11y.body'));

    bindCard(card);
    bindPort(card);
    for (const [boardKey, value] of expandedTurns) {
      if (!boardKey.startsWith(sessionId + ':')) continue;
      card.toolOpen.set('turn:' + boardKey.slice(sessionId.length + 1), value);
    }
    renderFoot(card);
    renderPipeBadge(card);
    schedulePipelines();
    state.cards.push(card);
    updateCounts();
    updateEmptyState();
    if (state.cards.length === 1 && !state.savedView) void fitView();
    else if (focus) centerCard(card);

    try {
      card.detach = adapter.open(sessionId, () => markDirty(card));
      // The approval waterfall is session-scoped: register a listener on this
      // session's own scope, and claim the request only while the switch is on
      // and the session actually sits on the board.
      card.detachApprovals = adapter.listenApprovals?.(sessionId, (id, request, next) => {
        if (!approvals?.enabled || !approvals.hasSession?.(id)) return next();
        return approvals.request(id, request);
      }) || (() => {});
      syncApprovalSessions();
    } catch {
      card.detach = () => {};
      renderBody(card, {
        ready: true,
        running: false,
        items: [{ k: 'error', text: t('error.open') }],
        hasMore: false,
        loadingOlder: false,
        model: '',
      });
    }
    return card;
  }

  function flash(card) {
    card.el.classList.remove('iwb-flash');
    void card.el.offsetWidth;
    card.el.classList.add('iwb-flash');
    setTimeout(() => card.el?.classList.remove('iwb-flash'), 1100);
  }

  function liveApprovalNode(card) {
    const entries = approvals?.list?.(card.sessionId) || [];
    if (!entries.length) return null;
    const node = el('div', 'iwb-approval-live');
    for (const entry of entries) {
      const head = el('div', 'iwb-approval-live-head');
      head.textContent = t('approval.waiting');
      const title = el('div', 'iwb-approval-live-title');
      title.textContent = entry.toolName
        ? t('approval.escalation').replace('{name}', entry.toolName)
        : t('approval.requested');
      node.append(head, title);
      if (entry.reason) {
        const reason = el('div', 'iwb-approval-live-reason');
        reason.textContent = entry.reason;
        node.appendChild(reason);
      }
      const actions = el('div', 'iwb-question-actions');
      const reject = el('button', 'iwb-btn');
      reject.type = 'button';
      reject.textContent = t('approval.reject');
      reject.addEventListener('click', (event) => {
        event.stopPropagation();
        approvals.settle(entry.id, approvals.OUTCOME_REJECT);
      });
      const allow = el('button', 'iwb-btn primary');
      allow.type = 'button';
      allow.textContent = t('approval.allowOnce');
      allow.addEventListener('click', (event) => {
        event.stopPropagation();
        approvals.settle(entry.id, approvals.OUTCOME_ALLOW);
      });
      actions.append(reject, allow);
      node.appendChild(actions);
    }
    return node;
  }

  /** Aggregate every card's pending approval / question / queue into one strip. */
  function updateTodoBar() {
    const totals = { approval: 0, question: 0, queued: 0 };
    for (const card of state.cards) {
      const pendingApproval = approvals?.list?.(card.sessionId)?.length || 0;
      totals.approval += pendingApproval;
      totals.question += card.view?.questions?.length || 0;
      totals.queued += card.queued || 0;
      card.pendingApproval = pendingApproval;
    }
    const parts = [];
    if (totals.approval) parts.push(t('todo.approval').replace('{n}', String(totals.approval)));
    if (totals.question) parts.push(t('todo.question').replace('{n}', String(totals.question)));
    if (totals.queued) parts.push(t('todo.queued').replace('{n}', String(totals.queued)));
    todoBar.hidden = parts.length === 0;
    todoBar.textContent = parts.join(' · ');
    todoBar.title = t('todo.title');
  }

  function focusNextPending() {
    const order = ['approval', 'question'];
    for (const kind of order) {
      const card = state.cards.find((entry) => (kind === 'approval' ? entry.pendingApproval : entry.view?.questions?.length));
      if (card) {
        centerCard(card);
        flash(card);
        return;
      }
    }
    const queued = state.cards.find((card) => card.queued);
    if (queued) {
      centerCard(queued);
      flash(queued);
    }
  }

  todoBar.addEventListener('click', (event) => {
    event.stopPropagation();
    focusNextPending();
  });

  function setAllTurns(open) {
    for (const card of state.cards) {
      const view = card.view;
      if (!view) continue;
      card.toolOpen.clear();
      if (open) {
        for (const item of view.items || []) {
          if (item.k === 'turnProcess' && item.endTime != null) card.toolOpen.set('turn:' + item.turn, true);
        }
      }
      card.signatureBust = (card.signatureBust || 0) + 1;
      markDirty(card);
    }
    toast(open ? t('board.expandedAll') : t('board.collapsedAll'));
  }

  let allOpen = false;
  btnCollapse.addEventListener('click', (event) => {
    event.stopPropagation();
    allOpen = !allOpen;
    btnCollapse.querySelector('span').textContent = allOpen ? t('board.collapseAll') : t('board.expandAll');
    setAllTurns(allOpen);
  });

  // ── keyboard navigation ──────────────────────────────────────────────
  function cardOrder() {
    return [...state.cards].sort((left, right) => left.y - right.y || left.x - right.x);
  }

  function focusCard(card, options) {
    if (!card?.el) return;
    for (const other of state.cards) {
      other.el.tabIndex = other === card ? 0 : -1;
      other.el.classList.toggle('iwb-focus', other === card);
      if (other === card) other.el.setAttribute('aria-current', 'true');
      else other.el.removeAttribute('aria-current');
    }
    state.focusedId = card.id;
    card.el.focus({ preventScroll: true });
    if (options?.reveal !== false) ensureVisible(card);
    if (options?.announce !== false) toast(t('a11y.focused').replace('{name}', card.title || t('untitled')));
  }

  /** Nearest card in a direction, measured from the focused card's centre. */
  function moveFocus(direction) {
    if (!state.cards.length) return;
    const current = state.cards.find((card) => card.id === state.focusedId);
    if (!current) {
      focusCard(cardOrder()[0]);
      return;
    }
    const cx = current.x + current.w / 2;
    const cy = current.y + current.h / 2;
    let best = null;
    let bestScore = Infinity;
    for (const card of state.cards) {
      if (card === current) continue;
      const dx = card.x + card.w / 2 - cx;
      const dy = card.y + card.h / 2 - cy;
      const forward =
        direction === 'left' ? dx < -1 : direction === 'right' ? dx > 1 : direction === 'up' ? dy < -1 : dy > 1;
      if (!forward) continue;
      const primary = direction === 'left' || direction === 'right' ? Math.abs(dx) : Math.abs(dy);
      const secondary = direction === 'left' || direction === 'right' ? Math.abs(dy) : Math.abs(dx);
      const score = primary + secondary * 2;
      if (score < bestScore) {
        bestScore = score;
        best = card;
      }
    }
    if (best) focusCard(best);
  }

  function nudgeCard(card, dx, dy) {
    const step = 24;
    card.x = Math.round((card.x + dx * step) / 8) * 8;
    card.y = Math.round((card.y + dy * step) / 8) * 8;
    card.el.style.left = card.x + 'px';
    card.el.style.top = card.y + 'px';
    saveSoon();
    ensureVisible(card);
  }

  // ── multi-select batch actions (B5) ─────────────────────────────────
  function selectedCards() {
    return state.cards.filter((card) => state.selected.has(card.id));
  }

  function renderBatchBar() {
    const picked = selectedCards();
    batchBar.textContent = '';
    batchBar.hidden = picked.length === 0;
    if (!picked.length) return;

    const label = el('span', 'iwb-batch-label');
    label.textContent = t('batch.selected').replace('{n}', String(picked.length));
    batchBar.appendChild(label);

    const actions = [
      { key: 'stack', label: t('batch.stack'), run: stackSelected },
      { key: 'align', label: t('batch.align'), run: alignSelected },
      { key: 'distribute', label: t('batch.distribute'), run: distributeSelected },
      { key: 'close', label: t('batch.close'), run: closeSelected, danger: true },
    ];
    for (const action of actions) {
      const button = el('button', 'iwb-btn' + (action.danger ? ' iwb-btn-danger' : ''));
      button.type = 'button';
      button.textContent = action.label;
      button.disabled = picked.length < 2 && action.key !== 'close';
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        action.run();
      });
      batchBar.appendChild(button);
    }
    const clear = el('button', 'iwb-btn');
    clear.type = 'button';
    clear.textContent = t('batch.clear');
    clear.addEventListener('click', (event) => {
      event.stopPropagation();
      clearSelection();
    });
    batchBar.appendChild(clear);
  }

  function setSelected(card, value) {
    if (value) state.selected.add(card.id);
    else state.selected.delete(card.id);
    card.el?.classList.toggle('iwb-selected', value);
    card.el?.setAttribute('aria-selected', value ? 'true' : 'false');
    renderBatchBar();
  }

  function toggleSelect(card) {
    setSelected(card, !state.selected.has(card.id));
  }

  function clearSelection() {
    for (const card of state.cards) {
      state.selected.delete(card.id);
      card.el?.classList.remove('iwb-selected');
      card.el?.removeAttribute('aria-selected');
    }
    renderBatchBar();
  }

  function selectAll() {
    for (const card of state.cards) setSelected(card, true);
  }

  function stackSelected() {
    const picked = selectedCards().filter((card) => !card.stackId);
    if (picked.length < 2) return;
    const first = picked[0];
    const model = { id: 'st' + ++state.stackSeq, x: first.x, y: first.y, order: picked.map((card) => card.id) };
    picked.forEach((card) => {
      card.stackId = model.id;
    });
    state.stacks.push(model);
    layoutStack(model);
    clearSelection();
    saveSoon();
    toast(t('batch.stacked').replace('{n}', String(picked.length)));
  }

  function alignSelected() {
    const picked = selectedCards().filter((card) => !card.stackId);
    if (picked.length < 2) return;
    const base = picked[0];
    for (const card of picked) {
      card.x = base.x;
      card.y = base.y;
      card.el.style.left = card.x + 'px';
      card.el.style.top = card.y + 'px';
    }
    clearSelection();
    saveSoon();
    toast(t('batch.aligned'));
  }

  function distributeSelected() {
    const picked = selectedCards().filter((card) => !card.stackId);
    if (picked.length < 2) return;
    const base = picked[0];
    const horizontal = picked.length > 1;
    picked.forEach((card, index) => {
      card.x = base.x + index * (card.w + GAP);
      card.y = base.y;
      card.el.style.left = card.x + 'px';
      card.el.style.top = card.y + 'px';
    });
    clearSelection();
    void fitView();
    saveSoon();
    toast(t('batch.distributed'));
  }

  function closeSelected() {
    const picked = selectedCards();
    if (!picked.length) return;
    for (const card of picked) removeCard(card);
    clearSelection();
    toast(t('batch.closed').replace('{n}', String(picked.length)));
  }

  // ── named canvases ───────────────────────────────────────────────────
  let canvasPop = null;

  function closeCanvasMenu() {
    canvasPop?.remove();
    canvasPop = null;
  }

  function loadLocalCanvases() {
    try {
      const raw = window.localStorage.getItem(CANVAS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.canvases)) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function syncCanvases() {
    state.canvases = Array.isArray(state.canvases) ? state.canvases : [];
    return state.canvases;
  }

  function storeCanvases() {
    const payload = { canvases: state.canvases, activeCanvas: state.activeCanvas };
    try {
      window.localStorage.setItem(CANVAS_KEY, JSON.stringify(payload));
    } catch {
      /* private mode: the Host copy still holds it */
    }
    void pushCanvases(payload.canvases, payload.activeCanvas);
    renderCanvasButton();
  }

  function renderCanvasButton() {
    const active = syncCanvases().find((canvas) => canvas.id === state.activeCanvas);
    // Keep the verb ("画布") first so the affordance never disappears, and append
    // the active canvas name for orientation.
    btnCanvas.querySelector('span').textContent = active ? t('canvas') + ' · ' + active.name : t('canvas');
    btnCanvas.title = active ? t('canvas.active').replace('{name}', active.name) : t('canvas.title');
    btnCanvas.classList.toggle('iwb-btn-active', Boolean(active));
  }

  /** Only canvases that actually carry a board are switchable. */
  function usableCanvases(list) {
    return (Array.isArray(list) ? list : []).filter(
      (canvas) => canvas && typeof canvas.id === 'string' && canvas.layout && Array.isArray(canvas.layout.cards)
    );
  }

  /** Merge Host and localStorage copies, preferring whichever knows the layout. */
  function mergeCanvases(remoteList, localList) {
    const byId = new Map();
    for (const canvas of usableCanvases(localList)) byId.set(canvas.id, canvas);
    for (const canvas of usableCanvases(remoteList)) {
      const existing = byId.get(canvas.id);
      if (!existing || (canvas.savedAt || 0) >= (existing.savedAt || 0)) byId.set(canvas.id, canvas);
    }
    return [...byId.values()].sort((left, right) => (left.savedAt || 0) - (right.savedAt || 0));
  }

  async function loadCanvases() {
    const remote = await fetchCanvases();
    const local = loadLocalCanvases();
    const remoteCanvases = remote?.canvases || [];
    const localCanvases = local?.canvases || [];
    const merged = mergeCanvases(remoteCanvases, localCanvases);
    state.canvases = merged;
    state.activeCanvas = remote?.activeCanvas || local?.activeCanvas || null;
    if (!merged.some((canvas) => canvas.id === state.activeCanvas)) state.activeCanvas = null;
    renderCanvasButton();
  }

  function canvasStamp() {
    return new Date().toLocaleString(undefined, { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  /** Save the current board as a brand new named canvas. */
  function saveCanvasAs(name) {
    const trimmed = String(name || '').trim();
    if (!trimmed) {
      toast(t('canvas.nameRequired'));
      return false;
    }
    state.canvases = syncCanvases().filter((canvas) => canvas.name !== trimmed);
    const canvas = {
      id: 'cv' + Date.now().toString(36),
      name: trimmed,
      savedAt: Date.now(),
      layout: layoutPayload(),
    };
    state.canvases = [...state.canvases, canvas];
    state.activeCanvas = canvas.id;
    storeCanvases();
    toast(t('canvas.saved').replace('{name}', trimmed));
    return true;
  }

  /** Overwrite the canvas the board is currently bound to. */
  function updateActiveCanvas() {
    const active = syncCanvases().find((canvas) => canvas.id === state.activeCanvas);
    if (!active) return false;
    active.layout = layoutPayload();
    active.savedAt = Date.now();
    storeCanvases();
    toast(t('canvas.updated').replace('{name}', active.name));
    return true;
  }

  function switchCanvas(id) {
    const target = syncCanvases().find((canvas) => canvas.id === id);
    if (!target) return;
    // Keep unsaved work: fold the current board back into its canvas first.
    if (state.activeCanvas && state.activeCanvas !== id) {
      const current = syncCanvases().find((canvas) => canvas.id === state.activeCanvas);
      if (current) {
        current.layout = layoutPayload();
        current.savedAt = Date.now();
      }
    }
    state.activeCanvas = id;
    storeCanvases();
    closeCanvasMenu();
    try {
      applyLayout(target.layout, { toast: t('canvas.switched').replace('{name}', target.name) });
      save();
      void fitView();
    } catch {
      toast(t('canvas.broken'));
    }
  }

  function deleteCanvas(id) {
    const target = syncCanvases().find((canvas) => canvas.id === id);
    state.canvases = syncCanvases().filter((canvas) => canvas.id !== id);
    if (state.activeCanvas === id) state.activeCanvas = null;
    storeCanvases();
    if (target) toast(t('canvas.deleted').replace('{name}', target.name));
  }

  function openCanvasMenu() {
    if (canvasPop) {
      closeCanvasMenu();
      return;
    }
    const pop = el('div', 'iwb-popover iwb-canvas-menu');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('canvas.title'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('canvas.title');
    pop.appendChild(head);

    const active = syncCanvases().find((canvas) => canvas.id === state.activeCanvas);
    const status = el('div', 'iwb-popover-note');
    status.textContent = active ? t('canvas.current').replace('{name}', active.name) : t('canvas.unsaved');
    pop.appendChild(status);

    const form = el('div', 'iwb-canvas-form');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'iwb-canvas-input';
    input.placeholder = t('canvas.placeholder');
    input.value = active ? active.name : '';
    const saveBtn = el('button', 'iwb-btn primary');
    saveBtn.type = 'button';
    saveBtn.textContent = t('canvas.save');
    saveBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (saveCanvasAs(input.value)) {
        closeCanvasMenu();
      }
    });
    input.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        event.preventDefault();
        if (saveCanvasAs(input.value)) closeCanvasMenu();
      }
    });
    form.append(input, saveBtn);
    pop.appendChild(form);

    if (active) {
      const overwrite = el('button', 'iwb-btn');
      overwrite.type = 'button';
      overwrite.textContent = t('canvas.overwrite').replace('{name}', active.name);
      overwrite.addEventListener('click', (event) => {
        event.stopPropagation();
        updateActiveCanvas();
        closeCanvasMenu();
      });
      pop.appendChild(overwrite);
    }

    const list = el('div', 'iwb-canvas-list');
    const canvases = syncCanvases();
    if (!canvases.length) {
      const empty = el('div', 'iwb-popover-note');
      empty.textContent = t('canvas.none');
      list.appendChild(empty);
    }
    for (const canvas of canvases) {
      const row = el('div', 'iwb-canvas-row' + (canvas.id === state.activeCanvas ? ' current' : ''));
      const pick = el('button', 'iwb-canvas-pick');
      pick.type = 'button';
      pick.innerHTML = '<span class="iwb-model-name"></span><span class="iwb-model-desc"></span>';
      pick.querySelector('.iwb-model-name').textContent = canvas.name;
      const cards = Array.isArray(canvas.layout?.cards)
        ? canvas.layout.cards.length
        : Number(canvas.layout?.cards) || 0;
      pick.querySelector('.iwb-model-desc').textContent = t('canvas.meta')
        .replace('{n}', String(cards))
        .replace('{time}', canvas.savedAt ? canvasStamp(canvas.savedAt) : '');
      pick.addEventListener('click', (event) => {
        event.stopPropagation();
        switchCanvas(canvas.id);
      });
      const remove = el('button', 'iwb-canvas-remove');
      remove.type = 'button';
      remove.title = t('canvas.delete');
      remove.setAttribute('aria-label', t('canvas.delete'));
      remove.textContent = '×';
      remove.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteCanvas(canvas.id);
        closeCanvasMenu();
      });
      row.append(pick, remove);
      list.appendChild(row);
    }
    pop.appendChild(list);

    const rect = btnCanvas.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left - 80, window.innerWidth - 300))) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    canvasPop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
    input.focus();
    input.select();
  }

  // ── kanban grouping (C4) ─────────────────────────────────────────────
  let kanbanPop = null;
  let kanbanTimer = 0;
  const kanbanHeads = [];

  function closeKanbanMenu() {
    kanbanPop?.remove();
    kanbanPop = null;
  }

  function clearKanbanHeads() {
    while (kanbanHeads.length) {
      const node = kanbanHeads.pop();
      node.remove();
    }
  }

  function cardStatusKey(card) {
    const pending = (card.view?.questions?.length || 0) + (card.view?.approvals?.length || 0);
    if (pending) return 'waiting';
    if (card.running) return 'running';
    if (card.unread) return 'unread';
    return 'idle';
  }

  function cardActivityKey(card) {
    const at = card.activityAt || 0;
    const age = Date.now() - at;
    if (!at) return 'stale';
    if (age < 5 * 60 * 1000) return 'fresh';
    if (age < 60 * 60 * 1000) return 'hour';
    return 'stale';
  }

  /** Group cards into ordered columns for the current key. */
  function kanbanGroups() {
    const key = state.board.key;
    const groups = new Map();
    const push = (id, card) => {
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(card);
    };
    for (const card of state.cards) {
      if (card.kind === 'note') {
        push('note', card);
        continue;
      }
      if (key === 'workspace') push(card.workspace || 'none', card);
      else if (key === 'activity') push(cardActivityKey(card), card);
      else push(cardStatusKey(card), card);
    }
    const order = {
      status: ['running', 'waiting', 'unread', 'idle', 'note'],
      workspace: null,
      activity: ['fresh', 'hour', 'stale', 'note'],
    }[key];
    let entries = [...groups.entries()];
    if (order) {
      entries.sort((left, right) => {
        const leftIndex = order.indexOf(left[0]);
        const rightIndex = order.indexOf(right[0]);
        return (leftIndex < 0 ? 99 : leftIndex) - (rightIndex < 0 ? 99 : rightIndex);
      });
    }
    return entries;
  }

  function kanbanLabel(id) {
    return (
      {
        running: t('board.state.running'),
        waiting: t('board.state.waiting'),
        unread: t('board.state.unread'),
        idle: t('board.state.idle'),
        fresh: t('board.activity.fresh'),
        hour: t('board.activity.hour'),
        stale: t('board.activity.stale'),
        note: t('note.title'),
        none: t('workspace.none'),
      }[id] || id
    );
  }

  function applyKanban() {
    if (!state.board.active) return;
    clearKanbanHeads();
    const groups = kanbanGroups();
    const columnWidth = DEFAULT_W + GAP;
    const headerGap = 46;
    groups.forEach(([id, cards], columnIndex) => {
      const head = el('div', 'iwb-kanban-head');
      head.innerHTML = '<span class="iwb-kanban-title"></span><span class="iwb-kanban-count"></span>';
      head.querySelector('.iwb-kanban-title').textContent = kanbanLabel(id);
      head.querySelector('.iwb-kanban-count').textContent = String(cards.length);
      head.style.left = columnIndex * columnWidth + 'px';
      head.style.top = -headerGap + 'px';
      world.appendChild(head);
      kanbanHeads.push(head);

      cards.forEach((card, rowIndex) => {
        card.x = columnIndex * columnWidth;
        card.y = rowIndex * (DEFAULT_H + GAP);
        card.el.style.left = card.x + 'px';
        card.el.style.top = card.y + 'px';
      });
    });
    saveSoon();
    void fitView();
    schedulePipelines();
  }

  function exitKanban() {
    state.board.active = false;
    clearKanbanHeads();
    for (const card of state.cards) {
      const saved = state.board.saved.get(card.id);
      if (!saved) continue;
      card.x = saved.x;
      card.y = saved.y;
      card.el.style.left = card.x + 'px';
      card.el.style.top = card.y + 'px';
    }
    state.board.saved.clear();
    saveSoon();
    void fitView();
    schedulePipelines();
    btnBoard.classList.remove('iwb-btn-active');
  }

  function enterKanban(key, label) {
    if (!state.board.active) {
      state.board.saved.clear();
      for (const card of state.cards) state.board.saved.set(card.id, { x: card.x, y: card.y });
    }
    state.board.active = true;
    state.board.key = key;
    btnBoard.classList.add('iwb-btn-active');
    applyKanban();
    toast(t('board.applied').replace('{name}', label || kanbanLabel(key)));
  }

  function openKanbanMenu() {
    if (kanbanPop) {
      closeKanbanMenu();
      return;
    }
    const pop = el('div', 'iwb-popover iwb-kanban');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('boardMode'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('board.title');
    pop.appendChild(head);
    const options = [
      { key: 'status', label: t('board.byStatus') },
      { key: 'workspace', label: t('board.byWorkspace') },
      { key: 'activity', label: t('board.byActivity') },
    ];
    for (const option of options) {
      const row = el('button', 'iwb-model-row' + (state.board.active && state.board.key === option.key ? ' current' : ''));
      row.type = 'button';
      row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      row.querySelector('.iwb-model-name').textContent = option.label;
      row.addEventListener('click', (event) => {
        event.stopPropagation();
        closeKanbanMenu();
        enterKanban(option.key, option.label);
      });
      pop.appendChild(row);
    }
    if (state.board.active) {
      const off = el('button', 'iwb-model-row');
      off.type = 'button';
      off.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      off.querySelector('.iwb-model-name').textContent = t('board.exit');
      off.addEventListener('click', (event) => {
        event.stopPropagation();
        closeKanbanMenu();
        exitKanban();
      });
      pop.appendChild(off);
    }
    const rect = btnBoard.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left - 60, window.innerWidth - 260))) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    kanbanPop = pop;
  }

  // ── pipeline (C7) ────────────────────────────────────────────────────
  let pipePop = null;

  function closePipeMenu() {
    pipePop?.remove();
    pipePop = null;
  }

  function sessionCardOf(sessionId) {
    return state.cards.find((card) => card.sessionId === sessionId) || null;
  }

  function portAnchor(card) {
    return { x: card.x + card.w, y: card.y + 30 };
  }

  function targetAnchor(card) {
    return { x: card.x, y: card.y + 30 };
  }

  function linkPath(from, to) {
    const dx = Math.max(40, Math.abs(to.x - from.x) * 0.45);
    return 'M ' + from.x + ' ' + from.y + ' C ' + (from.x + dx) + ' ' + from.y + ', ' + (to.x - dx) + ' ' + to.y + ', ' + to.x + ' ' + to.y;
  }

  /** Draw one curve per configured pipeline, plus a fat invisible hit area. */
  function renderPipelines() {
    while (linkLayer.firstChild) linkLayer.removeChild(linkLayer.firstChild);
    for (const card of state.cards) {
      const target = card.pipeline?.targetSessionId ? sessionCardOf(card.pipeline.targetSessionId) : null;
      if (!target || target === card) continue;
      const d = linkPath(portAnchor(card), targetAnchor(target));
      const hit = document.createElementNS(SVG_NS, 'path');
      hit.setAttribute('d', d);
      hit.setAttribute('class', 'iwb-link-hit');
      hit.addEventListener('pointerdown', (event) => {
        event.stopPropagation();
        openPipeMenu(card, event.currentTarget);
      });
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'iwb-link');
      if (card.pipeline.mode === 'draft') path.setAttribute('stroke-dasharray', '4 4');
      linkLayer.append(hit, path);
    }
  }

  let pipelineFrame = 0;
  function schedulePipelines() {
    if (pipelineFrame) return;
    pipelineFrame = requestAnimationFrame(() => {
      pipelineFrame = 0;
      renderPipelines();
    });
  }

  /** Drag from a card's port to another card to wire a pipeline. */
  function bindPort(card) {
    const port = card.el.querySelector('.iwb-port');
    if (!port) return;
    port.setAttribute('title', t('pipe.port'));
    port.setAttribute('aria-label', t('pipe.port'));
    port.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const canvasRect = canvas.getBoundingClientRect();
      const point = (clientX, clientY) => ({
        x: (clientX - canvasRect.left - state.pan.x) / state.zoom,
        y: (clientY - canvasRect.top - state.pan.y) / state.zoom,
      });
      const temp = document.createElementNS(SVG_NS, 'path');
      temp.setAttribute('class', 'iwb-link-temp');
      linkLayer.appendChild(temp);
      let hovered = null;
      const draw = (clientX, clientY) => {
        temp.setAttribute('d', linkPath(portAnchor(card), point(clientX, clientY)));
      };
      draw(event.clientX, event.clientY);
      port.setPointerCapture?.(event.pointerId);

      const onMove = (moveEvent) => {
        draw(moveEvent.clientX, moveEvent.clientY);
        const under = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
        const candidate = under?.closest?.('.iwb-card');
        const targetCard = candidate ? state.cards.find((entry) => entry.el === candidate) : null;
        if (hovered && hovered !== targetCard) hovered.el.classList.remove('iwb-link-target');
        hovered = targetCard && targetCard !== card && targetCard.sessionId ? targetCard : null;
        if (hovered) hovered.el.classList.add('iwb-link-target');
      };
      const finish = (upEvent) => {
        port.releasePointerCapture?.(event.pointerId);
        port.removeEventListener('pointermove', onMove);
        port.removeEventListener('pointerup', finish);
        port.removeEventListener('pointercancel', cancel);
        temp.remove();
        if (hovered) {
          hovered.el.classList.remove('iwb-link-target');
          card.pipeline = { targetSessionId: hovered.sessionId, mode: card.pipeline?.mode || 'send' };
          renderPipeBadge(card);
          schedulePipelines();
          saveSoon();
          toast(t('pipe.created').replace('{name}', hovered.title || t('untitled')));
        } else if (upEvent) {
          toast(t('pipe.needTarget'));
        }
        hovered = null;
      };
      const cancel = () => finish(null);
      port.addEventListener('pointermove', onMove);
      port.addEventListener('pointerup', finish);
      port.addEventListener('pointercancel', cancel);
    });
  }

  function renderPipeBadge(card) {
    const badge = card.el?.querySelector('.iwb-pipe-badge');
    if (!badge) return;
    const target = card.pipeline?.targetSessionId ? sessionCardOf(card.pipeline.targetSessionId) : null;
    badge.hidden = !target;
    if (target) {
      badge.textContent = t('pipe.active').replace('{name}', target.title || t('untitled'));
      badge.title = card.pipeline.mode === 'draft' ? t('pipe.draft') : t('pipe.send');
    }
  }

  /** Last assistant message is what a downstream card normally wants. */
  function lastAssistantText(card) {
    const items = card.view?.items || [];
    for (let index = items.length - 1; index >= 0; index -= 1) {
      const item = items[index];
      if (item.k === 'assistant' && item.text && item.text.trim()) return item.text.trim();
    }
    return '';
  }

  let morePop = null;

  function closeMoreMenu() {
    morePop?.remove();
    morePop = null;
  }

  /** Secondary header actions live in a ⋯ menu so the row never overflows. */
  function openMoreMenu(card, anchor) {
    if (morePop) {
      closeMoreMenu();
      return;
    }
    const pop = el('div', 'iwb-popover iwb-more');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('card.more'));
    const rows = [
      { act: 'pin', label: card.pinned ? t('card.unpin') : t('card.pin'), icon: 'pin' },
      { act: 'copy', label: t('card.copy'), icon: 'copy' },
      { act: 'open', label: t('openNative'), icon: 'open' },
    ];
    if (card.stackId) rows.push({ act: 'detach', label: t('detach'), icon: 'layers' });
    for (const row of rows) {
      const button = el('button', 'iwb-model-row');
      button.type = 'button';
      button.innerHTML = '<span class="iwb-more-ico">' + icon(row.icon, 13) + '</span><span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      button.querySelector('.iwb-model-name').textContent = row.label;
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        closeMoreMenu();
        card.el.querySelector('.iwb-acts-more [data-act="' + row.act + '"]')?.click();
      });
      pop.appendChild(button);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left - 120, window.innerWidth - 200))) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    morePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
  }

  async function deliverPipeline(card) {
    const pipeline = card.pipeline;
    if (!pipeline?.targetSessionId) return;
    const target = sessionCardOf(pipeline.targetSessionId);
    if (!target) return;
    const text = lastAssistantText(card);
    if (!text) return;
    const fingerprint = text.slice(0, 160);
    if (card.pipedFingerprint === fingerprint) return;
    const depth = (card.pipeDepth || 0) + 1;
    if (depth > 3) {
      toast(t('pipe.tooLong'));
      return;
    }
    card.pipedFingerprint = fingerprint;

    if (pipeline.mode === 'draft') {
      const field = target.el?.querySelector('.iwb-foot textarea');
      if (!field) return;
      field.value = field.value ? field.value.replace(/\s*$/, '\n\n') + text : text;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      ensureVisible(target);
      toast(t('pipe.drafted').replace('{name}', target.title || t('untitled')));
    } else {
      try {
        await adapter.prompt(target.sessionId, text, 'queue');
        toast(t('pipe.sent').replace('{name}', target.title || t('untitled')));
      } catch (error) {
        toast(t('pipe.failed').replace('{error}', error?.message || ''));
        return;
      }
    }
    target.pipeDepth = depth;
  }

  /** Click a pipeline curve: switch its delivery mode or remove it. */
  function openPipeMenu(card, anchor) {
    if (pipePop) {
      closePipeMenu();
      return;
    }
    const target = sessionCardOf(card.pipeline?.targetSessionId);
    if (!target) return;
    const pop = el('div', 'iwb-popover iwb-link-menu');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('pipe.title'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('pipe.title');
    const status = el('div', 'iwb-popover-note');
    status.textContent = t('pipe.linked').replace('{name}', target.title || t('untitled'));
    pop.append(head, status);

    const mode = card.pipeline.mode === 'draft' ? 'draft' : 'send';
    const modes = [
      { id: 'send', label: t('pipe.send'), hint: t('pipe.sendHint') },
      { id: 'draft', label: t('pipe.draft'), hint: t('pipe.draftHint') },
    ];
    for (const option of modes) {
      const row = el('button', 'iwb-model-row' + (mode === option.id ? ' current' : ''));
      row.type = 'button';
      row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>' + (mode === option.id ? '<span class="iwb-check">✓</span>' : '');
      row.querySelector('.iwb-model-name').textContent = option.label;
      row.querySelector('.iwb-model-desc').textContent = option.hint;
      row.addEventListener('click', (event) => {
        event.stopPropagation();
        card.pipeline = { ...card.pipeline, mode: option.id };
        renderPipeBadge(card);
        schedulePipelines();
        saveSoon();
        closePipeMenu();
        toast(option.id === 'draft' ? t('pipe.modeDraft') : t('pipe.modeSend'));
      });
      pop.appendChild(row);
    }

    const remove = el('button', 'iwb-model-row iwb-link-remove');
    remove.type = 'button';
    remove.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
    remove.querySelector('.iwb-model-name').textContent = t('pipe.remove');
    remove.addEventListener('click', (event) => {
      event.stopPropagation();
      card.pipeline = null;
      renderPipeBadge(card);
      schedulePipelines();
      saveSoon();
      closePipeMenu();
      toast(t('pipe.removed'));
    });
    pop.appendChild(remove);

    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left + rect.width / 2 - 110, window.innerWidth - 240))) + 'px';
    pop.style.top = Math.round(rect.top + rect.height + 8) + 'px';
    document.body.appendChild(pop);
    pipePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 8)) + 'px';
    }
  }

  function syncApprovalSessions() {
    approvals?.setOpenSessions?.(
      state.cards.filter((card) => card.kind !== 'note' && card.sessionId).map((card) => card.sessionId)
    );
  }

  /** Serialize the visible transcript into a shareable markdown snippet. */
  function removeCard(card) {
    if (card.stackId) detachFromStack(card, true);
    try {
      card.detach?.();
    } catch {
      /* ignore */
    }
    card.el.remove();
    try {
      card.detachApprovals?.();
    } catch {
      /* the session scope may already be gone */
    }
    state.cards = state.cards.filter((c) => c !== card);
    schedulePipelines();
    if (state.selected.delete(card.id)) renderBatchBar();
    if (state.focusedId === card.id) {
      state.focusedId = null;
      const next = cardOrder()[0];
      if (next) focusCard(next, { announce: false });
      else canvas.focus();
    }
    dirty.delete(card);
    const pendingApprovals = approvals?.list?.(card.sessionId) || [];
    for (const pending of pendingApprovals) {
      approvals.settle(pending.id, approvals.OUTCOME_CANCELLED);
    }
    if (pendingApprovals.length) toast(t('card.approvalCancelled'));
    syncApprovalSessions();
    updateCounts();
    updateEmptyState();
    saveSoon();
  }

  function markDirty(card) {
    if (disposed) return;
    dirty.add(card);
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const pending = [...dirty];
      dirty.clear();
      for (const item of pending) {
        if (!item.el?.isConnected) continue;
        renderCard(item);
      }
      updateCounts();
      updateTodoBar();
    });
  }

  function renderCard(card) {
    if (card.kind === 'note') return;
    let view;
    try {
      view = adapter.read(card.sessionId);
    } catch {
      view = { ready: true, running: false, items: [{ k: 'error', text: t('error.read') }], hasMore: false, loadingOlder: false, model: '' };
    }
    const wasRunning = card.running;
    if (view.running) card.activityAt = Date.now();
    else {
      const lastEnd = (view.items || []).reduce((latest, item) => (item.k === 'turnProcess' && item.endTime > latest ? item.endTime : latest), 0);
      if (lastEnd > (card.activityAt || 0)) card.activityAt = lastEnd;
    }
    card.running = Boolean(view.running);
    card.model = view.model || card.model;

    const pendingApproval = approvals?.list?.(card.sessionId)?.length || 0;
    const waiting = pendingApproval ? 'approval' : view.waiting || null;
    const queued = Number(view.queued) || 0;
    card.waiting = waiting;
    card.queued = queued;

    const dot = card.el.querySelector('.iwb-dot');
    dot.className =
      'iwb-dot' +
      (waiting
        ? ' waiting'
        : card.running
          ? ' running'
          : view.items.some((i) => i.k === 'error')
            ? ' error'
            : view.ready
              ? ' done'
              : '');
    dot.title = waiting ? t('status.waiting' + (waiting === 'approval' ? 'Approval' : 'Answer')) : card.running ? t('state.running') : t('state.idle');

    const statusNode = card.el.querySelector('.iwb-status');
    if (statusNode) {
      if (waiting) {
        statusNode.textContent = t(waiting === 'approval' ? 'status.waitingApproval' : 'status.waitingAnswer');
        statusNode.className = 'iwb-status warning';
        statusNode.hidden = false;
      } else if (queued > 0) {
        statusNode.textContent = t('status.queued').replace('{n}', String(queued));
        statusNode.className = 'iwb-status';
        statusNode.hidden = false;
      } else {
        statusNode.hidden = true;
      }
    }

    card.el.classList.toggle('iwb-running', card.running);
    // Title follows renames: the header is created once, so refresh it here.
    try {
      const title = adapter.titleOf(card.sessionId);
      if (title && title !== card.title) {
        card.title = title;
        const titleNode = card.el.querySelector('.iwb-card-title');
        if (titleNode) {
          titleNode.textContent = title;
          titleNode.title = title;
        }
        card.el.setAttribute('aria-label', title);
      }
    } catch {
      /* keep the previous title */
    }

    const meta = card.el.querySelector('.iwb-meta');
    if (meta) {
      meta.textContent = card.model || '';
      meta.title = card.model ? t('model.switch') : '';
      meta.disabled = !(adapter.hasModelPicker?.() ?? false);
    }
    const workspaceChip = card.el.querySelector('.iwb-card-workspace');
    if (workspaceChip) {
      if (!card.workspace) {
        const found = adapter.workspaceOf?.(card.sessionId);
        if (found) card.workspace = found.title || '';
      }
      // A blank session is titled after its workspace, so the chip would repeat
      // the header; only show it when it adds information.
      if (card.workspace && card.workspace.trim() !== String(card.title || '').trim()) {
        workspaceChip.textContent = card.workspace;
        workspaceChip.hidden = false;
        workspaceChip.title = t('workspace.label') + ' ' + card.workspace;
      } else {
        workspaceChip.hidden = true;
      }
    }
    card.el.querySelector('.iwb-elapsed').textContent = card.running && card.startedAt ? formatElapsed(Date.now() - card.startedAt) : '';
    if (card.running && !card.startedAt) card.startedAt = Date.now();
    if (!card.running) {
      card.startedAt = 0;
      card.el.querySelector('.iwb-elapsed').textContent = '';
    }

    // Unread: new assistant output while the reader is not looking at this card.
    const assistantCount = view.items.filter((item) => item.k === 'assistant').length;
    const lastSignature = card.assistantSignature || 0;
    if (assistantCount > lastSignature && !card.hovered && !card.active) {
      card.unread = true;
    }
    card.assistantSignature = assistantCount;
    const unreadDot = card.el.querySelector('.iwb-unread');
    if (unreadDot) unreadDot.hidden = !card.unread;

    renderBody(card, view);
    renderQueue(card, view);
    if (wasRunning !== card.running) {
      renderFoot(card);
      if (wasRunning && !card.running) void deliverPipeline(card);
      if (state.board.active && state.board.key === 'status') {
        clearTimeout(kanbanTimer);
        kanbanTimer = setTimeout(() => {
          if (state.board.active && state.board.key === 'status') applyKanban();
        }, 400);
      }
    }
  }

  /**
   * Queued messages waiting for the next turn, mirroring the native queue dock:
   * "{n} 条排队消息" plus each message with a delete action.
   */
  function renderQueue(card, view) {
    const box = card.el.querySelector('.iwb-queue');
    if (!box) return;
    const items = Array.isArray(view.queueItems) ? view.queueItems : [];
    box.textContent = '';
    if (!items.length) {
      box.hidden = true;
      return;
    }
    box.hidden = false;

    const head = el('div', 'iwb-queue-head');
    head.textContent = t('queue.count').replace('{n}', String(items.length));
    box.appendChild(head);

    for (const item of items) {
      const row = el('div', 'iwb-queue-row');
      const text = el('div', 'iwb-queue-text');
      text.textContent = item.text || (item.attachments ? t('queue.attachment') : '');
      text.title = item.text || '';
      const remove = el('button', 'iwb-queue-remove');
      remove.type = 'button';
      remove.title = t('queue.remove');
      remove.setAttribute('aria-label', t('queue.remove'));
      remove.innerHTML = icon('close', 11);
      remove.addEventListener('click', async (event) => {
        event.stopPropagation();
        remove.disabled = true;
        try {
          await adapter.removeQueued(card.sessionId, item.id);
          markDirty(card);
        } catch (error) {
          remove.disabled = false;
          toast(error?.message || t('queue.removeFailed'));
        }
      });
      const steer = el('button', 'iwb-queue-remove iwb-queue-steer');
      steer.type = 'button';
      steer.title = view.running ? t('queue.steer') : t('queue.steerUnavailable');
      steer.setAttribute('aria-label', t('queue.steer'));
      steer.innerHTML = icon('send', 11);
      steer.disabled = !view.running;
      steer.addEventListener('click', async (event) => {
        event.stopPropagation();
        steer.disabled = true;
        try {
          await adapter.steerQueued(card.sessionId, item.id);
          markDirty(card);
        } catch (error) {
          steer.disabled = false;
          toast(error?.message || t('queue.steerFailed'));
        }
      });
      row.append(text, steer, remove);
      box.appendChild(row);
    }
  }

  /**
   * Cheap identity for the transcript DOM. Re-rendering on every transport event
   * destroyed the text selection and, because the body is rebuilt, reset a card
   * scrolled into history back to the top.
   */
  function bodySignature(card, view) {
    const items = (view.items || []).map((item) => item.k + ':' + (item.turn ?? '') + ':' + ((item.text || '').length) + ':' + ((item.steps || []).length));
    return [
      items.join('|'),
      view.running ? 'r' : 'i',
      view.ready ? 'y' : 'n',
      (view.questions || []).length,
      (view.approvals || []).length,
      (view.queueItems || []).length,
      view.model || '',
      card.signatureBust || 0,
    ].join('#');
  }

  function renderBody(card, view) {
    card.view = view;
    const body = card.el.querySelector('.iwb-body');
    const signature = bodySignature(card, view);
    if (card.renderedSignature === signature && body.childElementCount) return;
    card.renderedSignature = signature;

    const scrollTop = body.scrollTop;
    const previousHeight = body.scrollHeight;
    const previousFirst = body.firstElementChild?.textContent?.slice(0, 48) || '';
    const nearBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 80;
    body.textContent = '';

    if (view.truncated) {
      const cut = el('div', 'iwb-truncated');
      cut.textContent = t('transcript.truncated').replace('{n}', '400');
      body.appendChild(cut);
    }
    if (view.hasMore) {
      const more = el('button', 'iwb-btn', t('loadOlder'));
      more.type = 'button';
      more.style.alignSelf = 'center';
      more.style.height = '24px';
      more.style.fontSize = '11px';
      if (view.loadingOlder) more.disabled = true;
      more.addEventListener('click', () => {
        adapter.loadOlder(card.sessionId).catch(() => {});
      });
      body.appendChild(more);
    }

    const pending = (view.questions?.length || 0) + (view.approvals?.length || 0);
    if (!view.items.length && !pending) {
      const hintNode = el('div', 'iwb-empty-sub');
      hintNode.textContent = view.ready ? t('empty.card') : t('empty.loading');
      hintNode.style.alignSelf = 'center';
      hintNode.style.marginTop = '12px';
      body.appendChild(hintNode);
      return;
    }

    for (const item of view.items) {
      const node = itemNode(card, item);
      if (node) body.appendChild(node);
    }
    for (const question of view.questions || []) body.appendChild(questionNode(card, question));
    if (view.approvals?.length) body.appendChild(approvalNode(card, view.approvals));
    const liveApproval = liveApprovalNode(card);
    if (liveApproval) body.appendChild(liveApproval);

    // Follow the tail only when the reader is already there. When older history
    // was prepended the content shifted down, so compensate by the height delta
    // instead of pinning the raw offset (which would scroll the reader forward).
    // Keep an active search highlighted across transcript updates.
    const searchBar = card.el.querySelector('.iwb-search');
    const searchTerm = searchBar && !searchBar.hidden ? searchBar.querySelector('input')?.value.trim() : '';
    if (searchTerm) {
      const hits = [];
      highlight(body, searchTerm, hits);
      card.searchHits = hits;
    }

    const currentFirst = body.firstElementChild?.textContent?.slice(0, 48) || '';
    if (nearBottom) body.scrollTop = body.scrollHeight;
    else if (previousFirst && currentFirst !== previousFirst) body.scrollTop = Math.max(0, scrollTop + (body.scrollHeight - previousHeight));
    else body.scrollTop = scrollTop;
  }

  /* ── transcript rows: turn → step → tool ──────────────────────── */
  function addFiles(card, fileList) {
    const files = [...(fileList || [])].filter(Boolean);
    if (!files.length) return;
    if (!(adapter.hasAttachments?.() ?? false)) {
      toast(t('attach.unsupported'));
      return;
    }
    try {
      const drafts = adapter.createDrafts(card.sessionId, files) || [];
      card.attachments = [...(card.attachments || []), ...drafts];
      renderFoot(card);
    } catch (error) {
      toast(error?.message || t('attach.failed'));
    }
  }

  function renderFoot(card) {
    const foot = card.el.querySelector('.iwb-foot');
    const active = document.activeElement;
    const hadFocus = Boolean(active && foot.contains(active) && active.tagName === 'TEXTAREA');
    const caret = hadFocus ? active.selectionStart : null;
    const caretEnd = hadFocus ? active.selectionEnd : null;
    const draft = card.composerDraft || '';
    const attachments = card.attachments || [];
    foot.textContent = '';

    const wrapper = el('div', 'iwb-composer-wrap');
    if (attachments.length) {
      const row = el('div', 'iwb-attachments');
      for (const attachment of attachments) row.appendChild(attachmentChip(card, attachment));
      wrapper.appendChild(row);
    }

    const composer = el('div', 'iwb-composer');
    const attach = el('button', 'iwb-attach');
    attach.type = 'button';
    attach.title = t('attach.button');
    attach.setAttribute('aria-label', t('attach.button'));
    attach.innerHTML = icon('clip', 14);
    attach.disabled = !(adapter.hasAttachments?.() ?? false);

    const textarea = el('textarea');
    textarea.rows = 1;
    textarea.value = draft;
    textarea.placeholder = card.running ? t('composer.busy') : t('composer.idle');
    textarea.setAttribute('aria-label', t('composer.label'));
    if (card.running) textarea.title = t('composer.steerHint');

    const ready = attachments.every((attachment) => (adapter.uploadSnapshots?.()[attachment.id]?.status || 'ready') === 'ready');
    const send = el(
      'button',
      'iwb-send' + (card.running ? ' stop' : (draft.trim() || attachments.length) && ready ? ' ready' : ''),
      icon(card.running ? 'stop' : 'send', 13)
    );
    send.type = 'button';
    send.setAttribute('aria-label', card.running ? t('stop') : t('send'));
    composer.append(attach, textarea, send);
    wrapper.appendChild(composer);
    foot.appendChild(wrapper);

    const picker = document.createElement('input');
    picker.type = 'file';
    picker.multiple = true;
    picker.hidden = true;
    picker.addEventListener('change', () => {
      addFiles(card, picker.files);
      picker.value = '';
    });
    wrapper.appendChild(picker);
    attach.addEventListener('click', (event) => {
      event.stopPropagation();
      picker.click();
    });

    const sync = () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 88) + 'px';
      const allReady = attachments.every((attachment) => (adapter.uploadSnapshots?.()[attachment.id]?.status || 'ready') === 'ready');
      const canSend = textarea.value.trim().length > 0 || attachments.length > 0;
      send.classList.toggle('ready', !card.running && canSend && allReady);
    };
    textarea.addEventListener('input', () => {
      card.composerDraft = textarea.value;
      sync();
    });
    textarea.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
      event.preventDefault();
      // Native composer policy: Enter queues, Cmd/Ctrl+Enter steers into the live turn.
      void submit(card, textarea, event.metaKey || event.ctrlKey ? 'steer' : 'queue');
    });
    textarea.addEventListener('paste', (event) => {
      const files = [...(event.clipboardData?.files || [])];
      if (!files.length) return;
      event.preventDefault();
      addFiles(card, files);
    });
    send.addEventListener('click', () => {
      if (card.running) void stop(card);
      else void submit(card, textarea, 'queue');
    });
    sync();
    if (hadFocus) {
      textarea.focus();
      if (caret !== null) {
        try {
          textarea.setSelectionRange(caret, caretEnd ?? caret);
        } catch {
          /* range restore is best effort */
        }
      }
    }
  }

  async function submit(card, textarea, mode) {
    const text = textarea.value.trim();
    const attachments = [...(card.attachments || [])];
    if (!text && !attachments.length) return;

    const uploads = adapter.uploadSnapshots?.() || {};
    const pendingUpload = attachments.find((attachment) => (uploads[attachment.id]?.status || 'ready') !== 'ready');
    if (pendingUpload) {
      toast(t('attach.uploading'));
      return;
    }

    card.composerDraft = '';
    textarea.value = '';
    textarea.style.height = 'auto';
    try {
      if (attachments.length) {
        await adapter.sendWithAttachments(card.sessionId, text, attachments.map((attachment) => attachment.id), mode);
        adapter.releaseDrafts?.(attachments.map((attachment) => attachment.id));
      } else {
        await adapter.prompt(card.sessionId, text, mode);
      }
      card.attachments = [];
      card.startedAt = Date.now();
      renderFoot(card);
    } catch (error) {
      card.composerDraft = text;
      card.attachments = attachments;
      renderFoot(card);
      toast(error?.message || t('error.send'));
      markDirty(card);
    }
  }

  async function stop(card) {
    try {
      await adapter.cancel(card.sessionId);
    } catch {
      toast(t('error.stop'));
    }
    markDirty(card);
  }

  function bindCard(card) {
    const node = card.el;

    node.setAttribute('aria-label', card.title || t('untitled'));
    node.addEventListener('focus', () => {
      for (const other of state.cards) {
        if (other === card) continue;
        other.el.tabIndex = -1;
        other.el.classList.remove('iwb-focus');
        other.el.removeAttribute('aria-current');
      }
      node.tabIndex = 0;
      node.classList.add('iwb-focus');
      node.setAttribute('aria-current', 'true');
      state.focusedId = card.id;
    });
    node.addEventListener('blur', () => {
      node.classList.remove('iwb-focus');
    });

    node.addEventListener('keydown', (event) => {
      const target = event.target;
      const typing = target instanceof HTMLElement && target.matches('input, textarea, [contenteditable="true"]');
      if (typing) {
        if (event.key === 'Escape') {
          event.preventDefault();
          target.blur();
          node.focus();
        }
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      const step = arrows[event.key];
      if (step) {
        event.preventDefault();
        if (event.shiftKey) nudgeCard(card, step[0], step[1]);
        else moveFocus(event.key.slice(5).toLowerCase());
        return;
      }
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (card.kind === 'note') node.querySelector('.iwb-note-input')?.focus();
          else node.querySelector('.iwb-foot textarea')?.focus();
          break;
        case 'Escape':
          event.preventDefault();
          skipCanvasAutofocus = true;
          canvas.focus();
          break;
        case 'o':
        case 'O':
          event.preventDefault();
          if (card.kind !== 'note') onOpenSession?.(card.sessionId);
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          node.querySelector('[data-act="pin"]')?.click();
          break;
        case 'c':
        case 'C':
          event.preventDefault();
          node.querySelector('[data-act="copy"]')?.click();
          break;
        case '/':
          event.preventDefault();
          openSearch(card);
          break;
        case 't':
        case 'T':
          event.preventDefault();
          node.querySelector('[data-act="outline"]')?.click();
          break;
        case ']':
          event.preventDefault();
          {
            const order = cardOrder();
            const index = order.indexOf(card);
            focusCard(order[(index + 1) % order.length]);
          }
          break;
        case '[':
          event.preventDefault();
          {
            const order = cardOrder();
            const index = order.indexOf(card);
            focusCard(order[(index - 1 + order.length) % order.length]);
          }
          break;
        default:
          break;
      }
    });
    node.addEventListener('pointerenter', () => {
      card.hovered = true;
      if (card.unread) {
        card.unread = false;
        const dot = card.el.querySelector('.iwb-unread');
        if (dot) dot.hidden = true;
        saveSoon();
      }
    });
    node.addEventListener('pointerleave', () => {
      card.hovered = false;
    });

    node.querySelector('[data-act="more"]')?.addEventListener('click', (event) => {
      event.stopPropagation();
      openMoreMenu(card, event.currentTarget);
    });
    node.querySelector('[data-act="pipe"]')?.addEventListener('click', (event) => {
      event.stopPropagation();
      openPipeMenu(card, event.currentTarget);
    });
    node.querySelector('[data-act="outline"]')?.addEventListener('click', (event) => {
      event.stopPropagation();
      openOutline(card, event.currentTarget);
    });
    node.querySelector('[data-act="search"]')?.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleSearch(card);
    });

    const searchBar = node.querySelector('.iwb-search');
    const searchInput = searchBar?.querySelector('.iwb-search-input');
    if (searchInput) {
      let timer = 0;
      searchInput.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => runSearch(card, searchInput.value.trim()), 120);
      });
      searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          stepSearch(card, event.shiftKey ? -1 : 1);
        } else if (event.key === 'Escape') {
          event.preventDefault();
          toggleSearch(card);
        }
        event.stopPropagation();
      });
      searchInput.placeholder = t('search.placeholder');
    }

    node.querySelector('[data-act="pin"]')?.addEventListener('click', (event) => {
      event.stopPropagation();
      card.pinned = !card.pinned;
      card.el.classList.toggle('iwb-pinned', card.pinned);
      saveSoon();
      toast(card.pinned ? t('card.pinned') : t('card.unpinned'));
    });
    node.querySelector('[data-act="copy"]')?.addEventListener('click', (event) => {
      event.stopPropagation();
      void copyTranscript(card);
    });

    node.addEventListener('dragover', (event) => {
      if (!event.dataTransfer?.types?.includes('Files')) return;
      event.preventDefault();
      node.classList.add('iwb-drop');
    });
    node.addEventListener('dragleave', (event) => {
      if (event.target !== node) return;
      node.classList.remove('iwb-drop');
    });
    node.addEventListener('drop', (event) => {
      const files = [...(event.dataTransfer?.files || [])];
      node.classList.remove('iwb-drop');
      if (!files.length) return;
      event.preventDefault();
      event.stopPropagation();
      addFiles(card, files);
    });

    node.addEventListener('pointerdown', (event) => {
      if (event.metaKey || event.ctrlKey) {
        event.preventDefault();
        toggleSelect(card);
        return;
      }
      if (card.stackId) promoteInStack(card);
      else {
        state.zTop += 1;
        node.style.zIndex = state.zTop;
      }
    });

    const head = node.querySelector('.iwb-head');
    head.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey) {
        event.preventDefault();
        if (event.shiftKey && state.selected.size) {
          const order = cardOrder();
          const anchorIndex = order.findIndex((entry) => state.selected.has(entry.id));
          const targetIndex = order.indexOf(card);
          const [from, to] = anchorIndex < 0 ? [targetIndex, targetIndex] : [Math.min(anchorIndex, targetIndex), Math.max(anchorIndex, targetIndex)];
          for (let index = from; index <= to; index += 1) setSelected(order[index], true);
        } else {
          toggleSelect(card);
        }
        return;
      }
      clearSelection();
      event.preventDefault();
      const stack = stackOf(card);
      if (stack && stackTop(stack) !== card) promoteInStack(card);
      const movingStack = stackOf(card);
      const base = movingStack ? { x: movingStack.x, y: movingStack.y } : { x: card.x, y: card.y };
      const startX = event.clientX;
      const startY = event.clientY;
      let moved = false;
      modelMenu.close();
      settingsMenu.close();
      workspaceMenu.close();
      node.classList.add('iwb-dragging');
      interactionActive = true;
      head.setPointerCapture(event.pointerId);

      const move = (moveEvent) => {
        const dx = (moveEvent.clientX - startX) / state.zoom;
        const dy = (moveEvent.clientY - startY) / state.zoom;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
        const nx = Math.round((base.x + dx) / 8) * 8;
        const ny = Math.round((base.y + dy) / 8) * 8;
        if (movingStack) {
          movingStack.x = nx;
          movingStack.y = ny;
          layoutStack(movingStack);
        } else {
          card.x = nx;
          card.y = ny;
          node.style.left = nx + 'px';
          node.style.top = ny + 'px';
        }
        schedulePipelines();
      };
      const up = () => {
        interactionActive = false;
        node.classList.remove('iwb-dragging');
        head.releasePointerCapture?.(event.pointerId);
        head.removeEventListener('pointermove', move);
        head.removeEventListener('pointerup', up);
        head.removeEventListener('pointercancel', up);
        if (moved && !card.stackId) tryStack(card);
        if (moved) saveSoon();
      };
      head.addEventListener('pointermove', move);
      head.addEventListener('pointerup', up);
      head.addEventListener('pointercancel', up);
    });

    head.addEventListener('dblclick', () => centerCard(card));

    const grip = node.querySelector('.iwb-resize');
    grip.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startW = card.w;
      const startH = card.h;
      grip.setPointerCapture(event.pointerId);
      node.classList.add('iwb-dragging');
      const move = (moveEvent) => {
        card.w = clamp(Math.round((startW + (moveEvent.clientX - startX) / state.zoom) / 8) * 8, 320, 760);
        card.h = clamp(Math.round((startH + (moveEvent.clientY - startY) / state.zoom) / 8) * 8, 320, 960);
        node.style.width = card.w + 'px';
        node.style.height = card.h + 'px';
      };
      const up = () => {
        node.classList.remove('iwb-dragging');
        grip.releasePointerCapture?.(event.pointerId);
        grip.removeEventListener('pointermove', move);
        grip.removeEventListener('pointerup', up);
        saveSoon();
      };
      grip.addEventListener('pointermove', move);
      grip.addEventListener('pointerup', up);
    });

    const metaButton = node.querySelector('.iwb-meta');
    metaButton?.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (metaButton.disabled) return;
      void modelMenu.open(card);
    });
    node.querySelector('[data-act="close"]')?.addEventListener('click', () => removeCard(card));
    node.querySelector('[data-act="detach"]').addEventListener('click', () => detachFromStack(card));
    node.querySelector('[data-act="open"]').addEventListener('click', () => onOpenSession?.(card.sessionId));
  }

  function updateCounts() {
    const running = state.cards.filter((c) => c.running).length;
    const parts = [t('count.cards').replace('{n}', String(state.cards.length))];
    if (running) parts.push(t('count.running').replace('{n}', String(running)));
    countsNode.textContent = parts.join(' · ');
  }

  function updateEmptyState() {
    emptyState.style.display = state.cards.length ? 'none' : 'flex';
  }

  // ── persistence ──────────────────────────────────────────────────────
  let saveTimer = 0;
  let suppressSave = false;
  function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 220);
  }

  function save() {
    if (disposed || suppressSave) return;
    try {
      const payload = layoutPayload();
      localUpdatedAt = payload.updatedAt;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      if (!applyingRemote) {
        void pushRemoteLayout(payload, clientId).then((result) => {
          if (result?.rev) remoteRev = result.rev;
        });
      }
    } catch {
      /* private mode or quota: the board still works for this session */
    }
  }

  function restore() {
    if (restoreDone) return;
    restoreDone = true;
    let saved = null;
    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
      saved = null;
    }
    if (saved?.settings && typeof saved.settings === 'object') {
      state.settings.inlineApprovals = Boolean(saved.settings.inlineApprovals);
    }
    approvals?.setEnabled?.(state.settings.inlineApprovals);
    if (!saved || !Array.isArray(saved.cards)) {
      syncApprovalSessions();
      void syncFromRemote().then(() => startRemoteSync());
      void loadCanvases();
      return false;
    }
    localUpdatedAt = Number(saved.updatedAt) || 0;
    state.savedView = typeof saved.zoom === 'number';
    if (typeof saved.zoom === 'number') state.zoom = clamp(saved.zoom, 0.3, 1.6);
    if (saved.pan && typeof saved.pan.x === 'number') state.pan = { x: saved.pan.x, y: saved.pan.y };
    if (saved.board && saved.board.active) {
      state.board.active = true;
      state.board.key = saved.board.key || 'status';
      btnBoard.classList.add('iwb-btn-active');
    }
    for (const card of saved.cards) {
      if (card?.kind === 'note') {
        const note = addNote({ ...card });
        if (note && card.pinned) {
          note.pinned = true;
          note.el?.classList.add('iwb-pinned');
        }
        continue;
      }
      if (!card?.sessionId) continue;
      addSession({
        sessionId: card.sessionId,
        title: card.title,
        workspace: card.workspace || '',
        x: card.x,
        y: card.y,
        w: card.w,
        h: card.h,
        pipeline: card.pipeline || null,
      });
    }
    for (const stack of saved.stacks || []) {
      const members = (stack.order || [])
        .map((sessionId) => state.cards.find((card) => card.sessionId === sessionId))
        .filter(Boolean);
      if (members.length < 2) continue;
      const model = { id: 'st' + ++state.stackSeq, x: stack.x, y: stack.y, order: members.map((card) => card.id) };
      members.forEach((card) => {
        card.stackId = model.id;
      });
      state.stacks.push(model);
    }
    state.stacks.forEach(layoutStack);
    applyView();
    updateCounts();
    updateEmptyState();
    syncApprovalSessions();
    updateTodoBar();
    schedulePipelines();
    // The Host copy wins when it is newer (other window, other device, or a
    // previous browser session whose site data was cleared). Drop the restore's
    // pending write first: it must not fence off the initial remote read.
    clearTimeout(saveTimer);
    saveTimer = 0;
    void syncFromRemote().then(() => startRemoteSync());
    void loadCanvases();
    return true;
  }

  function layoutPayload() {
    return {
      version: 1,
      updatedAt: Date.now(),
      zoom: state.zoom,
      board: { active: state.board.active, key: state.board.key },
      pan: state.pan,
      settings: { ...state.settings },
      cards: state.cards.map((card) => ({
        sessionId: card.sessionId,
        title: card.title,
        workspace: card.workspace || '',
        kind: card.kind || 'session',
        note: card.note || '',
        pinned: Boolean(card.pinned),
        pipeline: card.pipeline || null,
        x: card.x,
        y: card.y,
        w: card.w,
        h: card.h,
      })),
      stacks: state.stacks.map((stack) => ({
        x: stack.x,
        y: stack.y,
        order: stackCards(stack).map((card) => card.sessionId || card.id),
      })),
    };
  }

  function exportLayout() {
    try {
      const blob = new Blob([JSON.stringify(layoutPayload(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'inspiration-workbench-layout.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast(t('settings.exported'));
    } catch (error) {
      toast(error?.message || t('settings.exportFailed'));
    }
  }

  /** Replace the whole board with a saved layout document. */
  function applyLayout(saved, options) {
    if (!saved || !Array.isArray(saved.cards)) throw new Error(t('settings.importInvalid'));
    reset();
    if (typeof saved.zoom === 'number') state.zoom = clamp(saved.zoom, 0.3, 1.6);
    if (saved.pan) state.pan = { x: saved.pan.x || 0, y: saved.pan.y || 0 };
    if (saved.settings) state.settings = { ...state.settings, ...saved.settings };
    for (const card of saved.cards) {
      if (card.kind === 'note') {
        const note = addNote({ ...card });
        if (note && card.pinned) {
          note.pinned = true;
          note.el?.classList.add('iwb-pinned');
        }
      } else if (card.sessionId) {
        addSession({ ...card });
      }
    }
    applyView();
    updateCounts();
    updateEmptyState();
    syncApprovalSessions();
    updateTodoBar();
    if (options?.toast) toast(options.toast);
  }

  async function importLayout(file) {
    try {
      const text = await file.text();
      applyLayout(JSON.parse(text), { toast: t('settings.imported') });
    } catch (error) {
      toast(error?.message || t('settings.importFailed'));
    }
  }

  // ── Host-backed layout (persistence + multi-window sync) ──────────────
  let interactionActive = false;
  let remoteRev = 0;
  let localUpdatedAt = 0;
  let applyingRemote = false;
  let firstRemoteSync = true;
  // Own writes echo back over the event stream; the id lets us ignore them so a
  // drag is never undone by our own revision.
  const clientId = Math.random().toString(36).slice(2) + Date.now().toString(36);

  async function syncFromRemote(options) {
    const remote = await fetchRemoteLayout();
    if (!remote || !remote.layout) return false;
    remoteRev = remote.rev;
    if (remote.updatedAt <= localUpdatedAt) return false;
    if (interactionActive) return false; // never rebuild the board mid-drag
    if (saveTimer) return false; // local edits are still unsaved: don't clobber them
    applyingRemote = true;
    suppressSave = true;
    clearTimeout(saveTimer);
    try {
      applyLayout(remote.layout, options);
      localUpdatedAt = remote.updatedAt;
      // Cache the Host copy so the board still restores when the Host is away.
      try {
        const cached = { ...remote.layout, updatedAt: remote.updatedAt };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
      } catch {
        /* private mode: the Host copy is still authoritative */
      }
      const message = firstRemoteSync ? t('sync.restored') : t('sync.applied');
      firstRemoteSync = false;
      if (options?.toast !== false) toast(message);
    } catch {
      /* a corrupt remote document must not wipe the local board */
      return false;
    } finally {
      applyingRemote = false;
      suppressSave = false;
      clearTimeout(saveTimer);
    }
    return true;
  }

  function startRemoteSync() {
    const stop = subscribeRemoteLayout((rev, sourceId) => {
      if (rev === remoteRev) return;
      remoteRev = rev;
      if (sourceId && sourceId === clientId) return; // our own write
      void syncFromRemote();
    });
    if (stop) stopRemoteSync = stop;
  }
  let stopRemoteSync = null;

  function applySizePreset(preset) {
    for (const card of state.cards) {
      card.w = preset.w;
      card.h = preset.h;
      card.el.style.width = preset.w + 'px';
      card.el.style.height = preset.h + 'px';
    }
    state.stacks.forEach(layoutStack);
    saveSoon();
  }

  function reset() {
    state.cards.forEach((card) => {
      try {
        card.detach?.();
      } catch {
        /* ignore */
      }
      card.el.remove();
    });
    state.cards = [];
    state.stacks = [];
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    updateCounts();
    updateEmptyState();
  }

  // ── canvas interaction ───────────────────────────────────────────────
  let panning = false;
  let panStart = null;
  let panOrigin = null;

  let skipCanvasAutofocus = false;
  canvas.addEventListener('focus', () => {
    // Escape parks focus on the canvas; entering it any other way moves to a card.
    if (skipCanvasAutofocus) {
      skipCanvasAutofocus = false;
      return;
    }
    if (!state.cards.length) return;
    const current = state.cards.find((card) => card.id === state.focusedId);
    focusCard(current || cardOrder()[0], { announce: false });
  });

  canvas.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.iwb-card') || event.target.closest('.iwb-zoom')) return;
    if (event.button !== 0 && event.button !== 1) return;
    clearSelection();
    modelMenu.close();
    panning = true;
    panStart = { x: event.clientX, y: event.clientY };
    panOrigin = { ...state.pan };
    canvas.classList.add('panning');
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!panning) return;
    state.pan.x = panOrigin.x + (event.clientX - panStart.x);
    state.pan.y = panOrigin.y + (event.clientY - panStart.y);
    applyView();
  });
  const endPan = () => {
    panning = false;
    canvas.classList.remove('panning');
  };
  canvas.addEventListener('pointerup', endPan);
  canvas.addEventListener('pointercancel', endPan);

  canvas.addEventListener(
    'wheel',
    (event) => {
      const overCard = Boolean(event.target?.closest?.('.iwb-card'));
      if (overCard && !(event.ctrlKey || event.metaKey)) {
        // In-card scrolling belongs to the browser. Once the transcript is at the
        // edge the wheel chains back to the canvas, so paging never dead-ends.
        const body = event.target.closest('.iwb-body');
        if (body && state.settings.chainWheel) {
          const atTop = body.scrollTop <= 0;
          const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
          const scrollingUp = event.deltaY < 0;
          if (!(atTop && scrollingUp) && !(atBottom && !scrollingUp)) return;
        } else {
          return;
        }
      }
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        const delta = clamp(event.deltaY, -50, 50);
        zoomAt(event.clientX, event.clientY, state.zoom * Math.exp(-delta * 0.0016));
      } else {
        state.pan.x -= event.deltaX;
        state.pan.y -= event.deltaY;
        applyView();
      }
    },
    { passive: false }
  );

  function zoomAt(clientX, clientY, target) {
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const zoom = clamp(target, 0.3, 1.6);
    const ratio = zoom / state.zoom;
    state.pan.x = px - (px - state.pan.x) * ratio;
    state.pan.y = py - (py - state.pan.y) * ratio;
    state.zoom = zoom;
    applyView();
  }

  function zoomBy(delta) {
    const rect = canvas.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, state.zoom + delta);
  }

  btnFit.addEventListener('click', () => fitView());
  zoomFitBtn.addEventListener('click', () => fitView());
  zoomIn.addEventListener('click', () => zoomBy(0.12));
  zoomOut.addEventListener('click', () => zoomBy(-0.12));
  btnNote.addEventListener('click', (event) => {
    event.stopPropagation();
    const card = addNote({ focus: true });
    if (card) toast(t('note.added'));
  });

  btnNew.addEventListener('click', (event) => {
    event.stopPropagation();
    workspaceMenu.open();
  });


  btnCanvas.addEventListener('click', (event) => {
    event.stopPropagation();
    openCanvasMenu();
  });

  const onCanvasPointerDown = (event) => {
    if (!canvasPop) return;
    if (event.target?.closest?.('.iwb-canvas-menu') || event.target?.closest?.('.iwb-toolbar')) return;
    closeCanvasMenu();
  };
  document.addEventListener('pointerdown', onCanvasPointerDown, true);

  btnBoard.addEventListener('click', (event) => {
    event.stopPropagation();
    openKanbanMenu();
  });

  const onKanbanPointerDown = (event) => {
    if (!kanbanPop) return;
    if (event.target?.closest?.('.iwb-kanban') || event.target?.closest?.('.iwb-toolbar')) return;
    closeKanbanMenu();
  };
  document.addEventListener('pointerdown', onKanbanPointerDown, true);

  const onMorePointerDown = (event) => {
    if (!morePop) return;
    if (event.target?.closest?.('.iwb-more') || event.target?.closest?.('[data-act="more"]')) return;
    closeMoreMenu();
  };
  document.addEventListener('pointerdown', onMorePointerDown, true);

  const onPipePointerDown = (event) => {
    if (!pipePop) return;
    if (event.target?.closest?.('.iwb-pipe') || event.target?.closest?.('[data-act="pipe"]')) return;
    closePipeMenu();
  };
  document.addEventListener('pointerdown', onPipePointerDown, true);

  const onKey = (event) => {
    if (event.target instanceof HTMLElement && event.target.matches('input, textarea')) return;
    if (!root.isConnected) return;
    if ((event.metaKey || event.ctrlKey) && (event.key === 'a' || event.key === 'A')) {
      event.preventDefault();
      selectAll();
      return;
    }
    if (event.key === 'Escape') {
      clearSelection();
      closePipeMenu();
      closeMoreMenu();
      closeCanvasMenu();
      document.removeEventListener('pointerdown', onMorePointerDown, true);
      document.removeEventListener('pointerdown', onCanvasPointerDown, true);
      closeKanbanMenu();
    }
    if (event.key === '0') fitView();
    else if (event.key === '+' || event.key === '=') zoomBy(0.12);
    else if (event.key === '-') zoomBy(-0.12);
  };
  document.addEventListener('keydown', onKey);

  applyView();
  updateEmptyState();

  // Elapsed labels tick once a second while any card runs.
  let statusTick = 0;
  const ticker = setInterval(() => {
    for (const card of state.cards) {
      if (card.kind === 'note') continue;
      if (!card.running) continue;
      const label = card.el.querySelector('.iwb-elapsed');
      if (label) label.textContent = formatElapsed(Date.now() - card.startedAt);
    }
    // Waiting states (approval / question) and the prompt queue are not part of
    // the event window, so sample them on a slow beat instead of a stream.
    statusTick += 1;
    if (statusTick % 3 === 0) {
      // Sample only cards that can actually be waiting: running turns, pending
      // questions, or queued prompts. Idle cards are skipped to keep RPC volume low.
      const active = state.cards.filter(
        (card) => card.kind !== 'note' && (card.running || card.queued || card.view?.questions?.length)
      );
      if (active.length) void adapter.pollStates?.(active.map((card) => card.sessionId));
    }
  }, 1000);

  return {
    root,
    addSession,
    restore,
    reset,
    dispose() {
      disposed = true;
      // Unmount happens while the host is tearing the page down: a throw here
      // would surface as a blank page, so cleanup never propagates errors.
      try {
        clearInterval(ticker);
        clearTimeout(saveTimer);
        clearTimeout(toastTimer);
        settingsMenu.close();
        tools.dispose();
        stopApprovalWatch?.();
        stopUploadWatch?.();
        stopTitleWatch?.();
        stopRemoteSync?.();
        document.removeEventListener('keydown', onKey);
        closePipeMenu();
        closeKanbanMenu();
        clearKanbanHeads();
        document.removeEventListener('pointerdown', onPipePointerDown, true);
        document.removeEventListener('pointerdown', onKanbanPointerDown, true);
        modelMenu.dispose();
        arrangeMenu.dispose();
        settingsMenu.dispose();
        workspaceMenu.dispose();
        modelMenu.close();
        cancelAnimationFrame(frame);
        cancelAnimationFrame(anim);
        for (const card of state.cards) {
          try {
            card.detach?.();
          } catch {
            /* ignore */
          }
        }
        root.remove();
      } catch (error) {
        console.error('[inspiration-workbench] dispose failed', error);
      }
    },
  };
}
