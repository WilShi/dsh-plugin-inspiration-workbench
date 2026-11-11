/**
 * Session adapter: turns the Client `sessions` service into the small surface the
 * board needs — one retained binding per card, a folded transcript, and the three
 * actions a card performs (send / stop / load older).
 *
 * Rendering is intentionally flat: the plugin owns no official Chat row renderer,
 * so it folds the session event window itself and degrades unknown events to a
 * notice instead of inventing content.
 */

const MAX_ITEMS = 400;

function textOfContent(content) {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === 'string') return block;
        if (!block || typeof block !== 'object') return '';
        if (block.type === 'text' || block.type === 'text-delta') return block.text || '';
        return '';
      })
      .join('');
  }
  if (typeof content === 'object') {
    if (typeof content.text === 'string') return content.text;
    if (content.message) return textOfContent(content.message.content);
  }
  return '';
}

/**
 * Non-text content blocks (images, files) carry the attachment itself. The
 * native bubble shows their names, so collect the displayable bits.
 */
function attachmentMeta(data) {
  const blocks =
    (Array.isArray(data?.message?.content) && data.message.content) ||
    (Array.isArray(data?.content) && data.content) ||
    [];
  const out = [];
  for (const block of blocks) {
    if (!block || typeof block !== 'object' || block.type === 'text') continue;
    const nested = block.attachment || block.file || block.meta || block.source || {};
    const path =
      (typeof block.path === 'string' && block.path) ||
      (typeof block.url === 'string' && block.url) ||
      (typeof nested.path === 'string' && nested.path) ||
      '';
    const label =
      block.name ||
      block.filename ||
      block.fileName ||
      block.title ||
      nested.name ||
      nested.filename ||
      nested.fileName ||
      (path ? String(path).split('/').pop().split('?')[0] : '') ||
      '';
    out.push({ name: String(label || '').slice(0, 80), kind: String(block.type || 'file') });
  }
  return out;
}

function messageText(data) {
  if (!data || typeof data !== 'object') return '';
  return (
    textOfContent(data.message?.content) ||
    textOfContent(data.content) ||
    textOfContent(data.text) ||
    textOfContent(data.message) ||
    ''
  );
}

function summarizeInput(input) {
  if (input == null) return '';
  if (typeof input === 'string') {
    // tool/call.arguments is a raw JSON string; summarise the payload, not the braces
    const trimmed = input.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return summarizeInput(JSON.parse(trimmed));
      } catch {
        return trimmed.slice(0, 90);
      }
    }
    return trimmed.slice(0, 90);
  }
  if (typeof input === 'object') {
    for (const key of ['path', 'file_path', 'command', 'query', 'pattern', 'url', 'name']) {
      const value = input[key];
      if (typeof value === 'string' && value) return value.slice(0, 90);
    }
    try {
      return JSON.stringify(input).slice(0, 90);
    } catch {
      return '';
    }
  }
  return String(input).slice(0, 90);
}

function toolNameOf(data) {
  if (!data || typeof data !== 'object') return 'tool';
  return (
    data.name ||
    data.toolName ||
    data.tool ||
    data.definition?.name ||
    data.call?.name ||
    'tool'
  );
}

function callIdOf(data) {
  if (!data || typeof data !== 'object') return '';
  return (
    data.callId ||
    data.toolCallId ||
    data.message?.toolCallId ||
    data.message?.source?.callId ||
    data.id ||
    data.call?.id ||
    ''
  );
}

function tryJson(raw) {
  if (typeof raw !== 'string') return raw;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

function prettyJson(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value.slice(0, 4000);
  try {
    return JSON.stringify(value, null, 2).slice(0, 4000);
  } catch {
    return String(value).slice(0, 4000);
  }
}

function resultText(data) {
  const message = data?.message;
  const blocks = message?.content;
  const text = Array.isArray(blocks)
    ? blocks
        .map((block) => {
          if (!block || typeof block !== 'object') return '';
          if (block.type === 'text') return block.text || '';
          if (block.type === 'reasoning') return '';
          if (block.type === 'image') return '[image]';
          if (block.type === 'file') return '[file]';
          if (block.type === 'tool-call') return '';
          return '';
        })
        .join('')
    : typeof blocks === 'string'
      ? blocks
      : '';
  const fromError = data?.error ? (data.error.reason || data.error.message || data.error.code || '') : '';
  return (text || fromError || '').slice(0, 4000);
}

/**
 * Map a turn end reason onto the native failure banner. Copy keys mirror the
 * shipped `message.*` strings so a card reads exactly like the conversation.
 */
function failureOfTurnEnd(kind, reason) {
  switch (kind) {
    case 'interrupted':
      return { title: 'failure.taskStopped', detail: 'failure.interrupted' };
    case 'aborted': {
      const cause = reason?.reason?.kind || reason?.cause?.kind;
      if (cause === 'user') return { title: 'failure.stopped', detail: '' };
      return { title: 'failure.taskStopped', detail: 'failure.interrupted' };
    }
    case 'error': {
      const message = reason?.error?.message || reason?.error?.code || '';
      return { title: 'failure.turnError', detail: '', message };
    }
    case 'blocked':
      return { title: 'failure.turnError', detail: '' };
    case 'max-tokens':
      return { title: 'failure.maxTokens', detail: '' };
    default:
      return null;
  }
}

function noticeOfTurnEnd(reason) {
  const kind = typeof reason === 'string' ? reason : reason?.kind;
  if (!kind) return '';
  switch (kind) {
    case 'completed':
    case 'forked':
      return '';
    case 'aborted':
      return '本轮已中断';
    case 'interrupted':
      return '本轮被中断';
    case 'blocked':
      return '本轮被策略拦截';
    case 'max-tokens':
      return '本轮达到最大 token 数';
    case 'error': {
      const message = reason?.error?.message || reason?.error?.code || '';
      return message ? '本轮出错：' + message : '本轮出错';
    }
    default:
      return '本轮结束：' + kind;
  }
}

/** Fold one loaded event window into flat transcript items. */
function fold(entries) {
  const items = [];
  const tools = new Map();
  const turns = new Map();
  const steps = new Map();
  const approvals = new Map();
  let liveText = '';
  let liveReasoning = '';

  function holderTurn(turn) {
    return turns.get(turn) || turnItem(turn);
  }

  function turnItem(turn, time) {
    let item = turns.get(turn);
    if (!item) {
      item = { k: 'turnProcess', turn, steps: [], startTime: time, endTime: null, failed: false };
      turns.set(turn, item);
      items.push(item);
    }
    return item;
  };

  const push = (item) => {
    items.push(item);
    if (items.length > MAX_ITEMS * 2) items.splice(0, items.length - MAX_ITEMS * 2);
  };

  for (const entry of entries || []) {
    if (!entry || typeof entry !== 'object') continue;

    if (entry.type === 'transient') {
      const chunk = entry.event?.data?.chunk;
      if (!chunk) continue;
      if (chunk.type === 'text-delta' && chunk.text) liveText += chunk.text;
      else if (chunk.type === 'reasoning-delta' && chunk.text) liveReasoning += chunk.text;
      else if (chunk.type === 'text' && chunk.text) liveText += chunk.text;
      else if (chunk.type === 'reasoning' && chunk.text) liveReasoning += chunk.text;
      continue;
    }

    const event = entry.event;
    if (!event || typeof event !== 'object') continue;
    const data = event.data || {};

    // Any turn-bearing event opens the turn's process row *before* its content,
    // so the row lands at the head of the turn even when `turn/start` fell outside
    // the loaded window (paged history). Turns without tool calls render nothing.
    if (typeof data.turn === 'number') turnItem(data.turn, event.time);

    switch (event.type) {
      case 'user/message': {
        // The shipped Chat row renders only appended user messages; a replace
        // surface rewrites history and must not duplicate a bubble here.
        if (event.surfaceOp && event.surfaceOp !== 'append') break;
        // Injected context (runtime-context, system-prompt, tool-registry, …) is
        // hidden by the native conversation; rendering it shows raw XML blobs.
        const kind = data?.source?.kind;
        if (kind && kind !== 'user') break;
        const text = messageText(data);
        const attachments = attachmentMeta(data);
        if (text || attachments.length) push({ k: 'user', text, attachments });
        break;
      }
      case 'assistant/message': {
        const text = messageText(data);
        if (text) push({ k: 'assistant', text, turn: data.turn });
        break;
      }
      case 'turn/start': {
        turnItem(data.turn, event.time);
        break;
      }
      case 'turn/end': {
        const item = turns.get(data.turn);
        const reason = data.reason || {};
        const kind = typeof reason === 'string' ? reason : reason.kind;
        if (item) {
          item.endTime = event.time;
          // Native has exactly two copies here (worked / failed); an interrupted
          // turn still reads as worked, the interruption shows in the banner.
          item.failed = kind === 'error' || kind === 'blocked' || kind === 'max-tokens';
        }
        const failure = failureOfTurnEnd(kind, reason);
        if (failure) push({ k: 'failure', failure });
        break;
      }
      case 'tool/call': {
        const raw = data.arguments;
        const parsed = typeof raw === 'string' ? tryJson(raw) : raw;
        const call = {
          k: 'tool',
          id: callIdOf(data),
          name: toolNameOf(data),
          arg: summarizeInput(parsed ?? data.input ?? data.args),
          argsText: prettyJson(parsed),
          state: 'running',
        };
        if (call.id) tools.set(call.id, call);
        turnItem(data.turn, event.time);
        const stepKey = data.turn + ':' + data.step;
        let step = steps.get(stepKey);
        if (!step) {
          step = { k: 'step', turn: data.turn, step: data.step, calls: [] };
          steps.set(stepKey, step);
          push(step);
          holderTurn(data.turn).steps.push(step);
        }
        step.calls.push(call);
        holderTurn(data.turn).toolCalls = (holderTurn(data.turn).toolCalls || 0) + 1;
        break;
      }
      case 'approval/asked': {
        const id = data.id || data.callId || 'approval-' + items.length;
        approvals.set(id, {
          id,
          toolName: data.toolName || '',
          reason: data.displayReason || data.reason || '',
        });
        break;
      }
      case 'approval/decided': {
        if (data.id) approvals.delete(data.id);
        break;
      }
      case 'tool/result': {
        const id = callIdOf(data);
        const item = id ? tools.get(id) : undefined;
        const failed = Boolean(data.error) || data.message?.isError === true;
        if (item) {
          item.state = failed ? 'error' : 'done';
          item.resultText = resultText(data);
        }
        break;
      }
      case 'compaction/summary':
      case 'compaction/end': {
        push({ k: 'notice', text: '上下文已压缩' });
        break;
      }
      default:
        break;
    }
  }

  if (liveReasoning.trim()) push({ k: 'reasoning', text: liveReasoning.trim() });
  if (liveText.trim()) push({ k: 'assistant', text: liveText, live: true });

  // Event-order insertion is not enough: paged history and steering can leave the
  // process row at the tail of its turn. The native conversation renders
  // [user bubble] → [process row] → [reply], so anchor each row right after the
  // last user message that precedes its own turn's first content.
  for (let index = 0; index < items.length; index += 1) {
    const entry = items[index];
    if (entry.k !== 'turnProcess') continue;
    const first = items.findIndex((candidate) => candidate.k !== 'turnProcess' && candidate.turn === entry.turn);
    if (first < 0) continue;
    let anchor = first;
    for (let probe = first - 1; probe >= 0; probe -= 1) {
      if (items[probe].k === 'user') {
        anchor = probe + 1;
        break;
      }
    }
    if (anchor === index) continue;
    items.splice(index, 1);
    items.splice(index < anchor ? anchor - 1 : anchor, 0, entry);
    index = Math.max(0, (index < anchor ? anchor - 1 : anchor));
  }

  const truncated = items.length > MAX_ITEMS;
  return {
    items: truncated ? items.slice(-MAX_ITEMS) : items,
    truncated,
    approvals: [...approvals.values()],
  };
}

function pickModel(projection) {
  if (!projection || typeof projection !== 'object') return '';
  // ModelSelectionProjection = { lastUsed, next }
  const selection = projection.next || projection.lastUsed || projection;
  const value = selection?.model || selection?.modelId || selection?.id;
  return typeof value === 'string' ? value : '';
}

export function createSessionsAdapter(ctx) {
  const sessions = ctx.get('sessions');
  const entries = new Map(); // sessionId -> { reference, listeners:Set, unsubs:[], binding }

  function notify(sessionId) {
    const entry = entries.get(sessionId);
    if (!entry) return;
    for (const listener of entry.listeners) {
      try {
        listener();
      } catch {
        /* a broken card must not stop the others */
      }
    }
  }

  function attachApprovalListeners(sessionId, entry) {
    const scope = entry.binding?.ctx;
    const remote = scope?.remote;
    entry.approvalUnsubs = entry.approvalUnsubs || [];
    for (const dispose of entry.approvalUnsubs) {
      try {
        dispose?.();
      } catch {
        /* the previous scope may already be gone */
      }
    }
    entry.approvalUnsubs = [];
    if (!scope || typeof remote?.$on !== 'function' || typeof scope.effect !== 'function') return;
    for (const handler of entry.approvalHandlers || []) {
      try {
        const dispose = scope.effect(
          () =>
            remote.$on('approval/request', function onApprovalRequest(request, next) {
              return handler(sessionId, request, next);
            }),
          'inspiration-workbench: inline approval'
        );
        entry.approvalUnsubs.push(dispose);
      } catch {
        /* leave the session without inline approvals */
      }
    }
  }

  function attach(sessionId, entry) {
    const binding = entry.reference.binding;
    if (!binding || entry.binding === binding) return;
    entry.binding = binding;
    attachApprovalListeners(sessionId, entry);
    const onEvent = () => notify(sessionId);
    entry.unsubs.push(binding.eventSource.subscribe(onEvent));
    try {
      const questions = binding.session.projections?.faceOf('userQuestions');
      if (questions?.subscribe) entry.unsubs.push(questions.subscribe(onEvent));
      const inbox = binding.session.projections?.faceOf('inbox');
      if (inbox?.subscribe) entry.unsubs.push(inbox.subscribe(onEvent));
    } catch {
      /* older builds may not expose this projection */
    }
    if (binding.session && typeof binding.session.subscribe === 'function') {
      entry.unsubs.push(binding.session.subscribe(onEvent));
    }
    notify(sessionId);
  }

  function close(sessionId) {
    const entry = entries.get(sessionId);
    if (!entry) return;
    entries.delete(sessionId);
    for (const unsub of entry.unsubs) {
      try {
        unsub();
      } catch {
        /* ignore */
      }
    }
    try {
      entry.reference.release?.();
      entry.reference[Symbol.dispose]?.();
    } catch {
      /* ignore */
    }
  }

  function open(sessionId, onChange) {
    if (!sessions) {
      onChange();
      return () => {};
    }
    let entry = entries.get(sessionId);
    if (!entry) {
      let reference;
      try {
        reference = sessions.retain(sessionId, { source: 'inspirationWorkbench' });
      } catch {
        // Older builds type `source` as a closed union; the tag is only bookkeeping.
        reference = sessions.retain(sessionId, { source: 'gateway' });
      }
      entry = { reference, binding: null, listeners: new Set(), unsubs: [] };
      entries.set(sessionId, entry);
      if (reference.binding) attach(sessionId, entry);
      Promise.resolve(reference.ready)
        .then(() => attach(sessionId, entry))
        .catch(() => notify(sessionId));
    }
    entry.listeners.add(onChange);
    return () => {
      const current = entries.get(sessionId);
      if (!current) return;
      current.listeners.delete(onChange);
      if (current.listeners.size === 0) close(sessionId);
    };
  }

  /** Queued messages awaiting the next turn, read from the `inbox` projection. */
  function queueOf(binding) {
    try {
      const inbox = binding?.session?.projections?.faceOf('inbox')?.getSnapshot?.();
      return (inbox?.['next-turn'] || []).map((row) => ({
        id: row.id,
        text: (row.content || [])
          .filter((block) => block && block.type === 'text')
          .map((block) => block.text || '')
          .join(''),
        attachments: (row.content || []).filter((block) => block && block.type !== 'text').length,
        attachmentNames: (row.content || [])
          .filter((block) => block && block.type !== 'text')
          .map((block) => String(block.name || block.filename || block.title || '').slice(0, 60))
          .filter(Boolean),
      }));
    } catch {
      return [];
    }
  }

  function conversationService() {
    try {
      return ctx.get?.('conversation') ?? ctx.conversation;
    } catch {
      return undefined;
    }
  }

  function hasAttachments() {
    const service = conversationService();
    return Boolean(service?.createDrafts && service?.sendSession && service?.fileUploads);
  }

  /** Stage browser files on the native draft registry; uploads start immediately. */
  function createDrafts(sessionId, files) {
    const service = conversationService();
    if (!service?.createDrafts) throw new Error('当前版本不支持附件');
    return service.createDrafts(sessionId, files, true).map((draft) => ({
      id: draft.id,
      kind: draft.kind,
      name: draft.file?.name || '',
      size: draft.file?.size || 0,
      previewUrl: draft.previewUrl || '',
    }));
  }

  function uploadSnapshots() {
    try {
      return conversationService()?.fileUploads?.getSnapshot?.() || {};
    } catch {
      return {};
    }
  }

  function subscribeUploads(listener) {
    try {
      return conversationService()?.fileUploads?.subscribe?.(listener);
    } catch {
      return undefined;
    }
  }

  function releaseDrafts(ids) {
    if (!ids?.length) return;
    try {
      conversationService()?.releaseDraftAttachments?.(ids.map((id) => ({ id })));
    } catch {
      /* releasing is best effort */
    }
  }

  async function sendWithAttachments(sessionId, text, attachmentIds, mode) {
    const service = conversationService();
    const binding = bindingOf(sessionId);
    if (!service?.sendSession || !binding) throw new Error('当前版本不支持附件');
    await service.sendSession(binding.session, text, attachmentIds, mode || 'queue');
  }

  async function steerQueued(sessionId, itemId) {
    const session = bindingOf(sessionId)?.session;
    if (!session?.updateQueue) throw new Error('当前版本不支持插话');
    const result = await session.updateQueue(itemId, { kind: 'steer' });
    if (result && result.ok === false) throw new Error(result.error?.message || '插话失败');
    return true;
  }

  function retryUpload(sessionId, attachmentId) {
    const service = conversationService();
    if (!service?.retryFileUpload) return false;
    try {
      service.retryFileUpload(sessionId, attachmentId);
      return true;
    } catch {
      return false;
    }
  }

  async function removeQueued(sessionId, itemId) {
    const session = bindingOf(sessionId)?.session;
    if (!session?.updateQueue) throw new Error('当前版本不支持删除排队消息');
    const result = await session.updateQueue(itemId, { kind: 'remove' });
    if (result && result.ok === false) throw new Error(result.error?.message || '删除排队消息失败');
    return true;
  }

  /** Notify when the session list changes so titles can stay in sync with renames. */
  function watchTitles(listener) {
    const list = sessions?.list;
    if (!list?.subscribe) return undefined;
    try {
      return list.subscribe(listener);
    } catch {
      return undefined;
    }
  }

  function bindingOf(sessionId) {
    return entries.get(sessionId)?.binding;
  }

  function read(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) {
      return { ready: false, running: false, items: [], hasMore: false, loadingOlder: false, model: '', openState: 'loading' };
    }
    let snapshot = {};
    let window = { entries: [], hasMore: false };
    try {
      snapshot = binding.session.getSnapshot() || {};
      window = binding.eventSource.getSnapshot() || window;
    } catch {
      /* keep defaults while the transport settles */
    }
    let selection = null;
    try {
      const projection = binding.session.projections?.faceOf('modelSelection')?.getSnapshot();
      selection = projection?.next || projection?.lastUsed || null;
    } catch {
      selection = null;
    }
    if (!catalogCache && !catalogPending) void loadCatalog();
    const baseModel = selection ? catalogName(selection) || selection.model || '' : '';
    const effortName = selection ? catalogEffort(selection) : '';
    // The chip mirrors the native composer label: model name, then the effort.
    const model = baseModel + (effortName ? ' · ' + effortName : '');
    const folded = fold(window.entries);
    let questions = [];
    try {
      const projected = binding.session.projections?.faceOf('userQuestions')?.getSnapshot();
      questions = (projected?.active || []).map((entry) => ({
        callId: entry.callId,
        state: entry.state,
        items: entry.questions || [],
      }));
    } catch {
      questions = [];
    }
    const approvals = folded.approvals;
    const queueItems = queueOf(binding);
    return {
      ready: true,
      selection,
      running: Boolean(snapshot.running),
      questions,
      approvals,
      items: folded.items,
      truncated: Boolean(folded.truncated),
      hasMore: Boolean(snapshot.hasMore ?? window.hasMore),
      loadingOlder: Boolean(snapshot.loadingOlder),
      waiting: (liveState.get(sessionId)?.waiting) || (questions.length ? 'question' : null),
      queued: queueItems.length || liveState.get(sessionId)?.queued || 0,
      queueItems,
      openState: snapshot.openState || 'open',
      lastError: snapshot.lastAgentError || '',
      model,
    };
  }

  async function prompt(sessionId, text, mode) {
    const binding = bindingOf(sessionId);
    if (!binding) throw new Error('会话还在打开中，稍等一下再发');
    const result = await binding.session.prompt([{ type: 'text', text }], mode === 'steer' ? 'steer' : 'queue');
    if (result && result.ok === false) {
      throw new Error(result.error?.message || '发送失败');
    }
  }

  async function cancel(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) return;
    await binding.session.cancel();
  }

  async function answerQuestion(sessionId, callId, answers) {
    let remote;
    try {
      remote = ctx.remote?.userQuestions;
    } catch {
      remote = undefined;
    }
    if (!remote?.answer) throw new Error('当前版本没有提供提问回答');
    const result = await remote.answer(sessionId, callId, { answers });
    if (!result?.ok) throw new Error(result?.error?.message || '提交失败');
    return result.value;
  }

  async function loadOlder(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) return;
    await binding.session.loadOlder();
  }

  const remoteSession = () => {
    try {
      return ctx.remote?.session || ctx.get?.('remote')?.session;
    } catch {
      return undefined;
    }
  };

  let catalogCache = null;
  let catalogAt = 0;
  let catalogPromise = null;

  async function modelCatalog() {
    const stale = catalogCache && Date.now() - catalogAt > 60000;
    if (catalogCache && !stale) return catalogCache;
    if (stale) {
      catalogCache = null;
      catalogPromise = null;
    }
    if (!catalogPromise) {
      catalogPromise = (async () => {
        const remote = remoteSession();
        if (!remote?.modelCatalog) throw new Error('当前版本没有提供模型目录');
        const result = await remote.modelCatalog();
        if (!result?.ok) throw new Error(result?.error?.message || '读取模型目录失败');
        catalogCache = result.value;
        catalogAt = Date.now();
        return catalogCache;
      })().catch((error) => {
        catalogPromise = null;
        throw error;
      });
    }
    return catalogPromise;
  }

  function catalogEffort(selection) {
    if (!catalogCache || !selection) return selection?.reasoningEffort || '';
    for (const group of catalogCache.groups || []) {
      for (const model of group.models || []) {
        if (model.id !== selection.model) continue;
        const effortId = selection.reasoningEffort || model.reasoning?.defaultEffort;
        if (!effortId) return '';
        const effort = (model.reasoning?.efforts || []).find((entry) => entry.id === effortId);
        return effort?.name || effortId;
      }
    }
    return selection.reasoningEffort || '';
  }

  /**
   * Live per-session status, sampled from the same projection the native sidebar
   * reads: `pendingInput` (approval/question) and the prompt queue.
   */
  const liveState = new Map();

  async function pollStates(sessionIds) {
    const remote = remoteSession();
    if (!remote?.state || !Array.isArray(sessionIds) || !sessionIds.length) return;
    await Promise.all(
      sessionIds.map(async (sessionId) => {
        try {
          const result = await remote.state({ sessionId });
          if (!result?.ok) return;
          const value = result.value || {};
          const pending = Array.isArray(value.pendingInput) ? value.pendingInput : [];
          const waiting = pending.includes('approval')
            ? 'approval'
            : pending.includes('question')
              ? 'question'
              : pending.length
                ? 'other'
                : null;
          const queue = Array.isArray(value.queue) ? value.queue : [];
          const queued = queue.filter((item) => item?.placement === 'queued').length;
          const previous = liveState.get(sessionId);
          if (previous && previous.waiting === waiting && previous.queued === queued) return;
          liveState.set(sessionId, { waiting, queued });
          notify(sessionId);
        } catch {
          /* a transient RPC failure must not disturb the card */
        }
      })
    );
  }

  /**
   * Warm the catalog once per adapter so card labels resolve to the catalog name
   * (and its default thinking effort) on first paint instead of the raw wire id.
   */
  let catalogPending = false;
  async function loadCatalog() {
    if (catalogCache || catalogPending) return catalogCache;
    catalogPending = true;
    try {
      const catalog = await modelCatalog();
      if (catalog) for (const sessionId of entries.keys()) notify(sessionId);
      return catalog;
    } finally {
      catalogPending = false;
    }
  }

  function catalogName(selection) {
    if (!catalogCache || !selection) return '';
    for (const group of catalogCache.groups || []) {
      for (const model of group.models || []) {
        if (model.id === selection.model) return model.name || model.id;
      }
    }
    return '';
  }

  function selectionOf(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) return null;
    try {
      const projection = binding.session.projections?.faceOf('modelSelection')?.getSnapshot();
      return projection?.next || projection?.lastUsed || null;
    } catch {
      return null;
    }
  }

  async function selectModel(sessionId, selection) {
    const remote = remoteSession();
    if (!remote?.selectModel) throw new Error('当前版本没有提供模型切换');
    const request = { sessionId, provider: selection.provider, model: selection.model };
    if (selection.reasoningEffort !== undefined && selection.reasoningEffort !== null) {
      request.reasoningEffort = selection.reasoningEffort;
    }
    const result = await remote.selectModel(request);
    if (!result?.ok) throw new Error(result?.error?.message || '切换模型失败');
    return result.value?.selected || selection;
  }

  function titleOf(sessionId) {
    try {
      const rows = sessions?.list?.getSnapshot?.()?.byId;
      const row = rows && rows[sessionId];
      return row?.displayTitle || row?.title || '';
    } catch {
      return '';
    }
  }

  function workspacesService() {
    try {
      return ctx.get?.('workspaces') ?? ctx.workspaces;
    } catch {
      return undefined;
    }
  }

  /**
   * Workspaces the sidebar shows, in sidebar order. Empty when the build has no
   * Workspace controller, in which case the caller falls back to the default.
   */
  function listWorkspaces() {
    try {
      const snapshot = workspacesService()?.list?.getSnapshot?.() || {};
      return (snapshot.items || [])
        .map((item) => ({
          id: item.workspaceId,
          title: item.title || item.name || '',
          path: item.path || '',
          sessionIds: item.sessionIds || [],
        }))
        .filter((item) => Boolean(item.id));
    } catch {
      return [];
    }
  }

  /**
   * Register an `approval/request` waterfall listener on the *session* scope.
   *
   * The forwarded approval waterfall only reaches listeners mounted on the
   * session's own context (`ctx.sessions.scopeOf(this)` must resolve), so a
   * plugin-root listener never sees it. `retain()` gives us that context.
   */
  function listenApprovals(sessionId, handler) {
    const entry = entries.get(sessionId);
    if (!entry) return () => {};
    entry.approvalHandlers = entry.approvalHandlers || new Set();
    entry.approvalHandlers.add(handler);
    // The binding arrives asynchronously after retain(); register right away if
    // it is already there, otherwise `attach()` will flush it.
    if (entry.binding) attachApprovalListeners(sessionId, entry);
    return () => {
      entry.approvalHandlers.delete(handler);
      if (entry.binding) attachApprovalListeners(sessionId, entry);
    };
  }

  function workspaceOf(sessionId) {
    return listWorkspaces().find((workspace) => workspace.sessionIds.includes(sessionId)) || null;
  }

  async function createSession(options) {
    if (!sessions?.create) throw new Error('当前版本没有提供静默新建会话的接口');
    const request = {};
    const workspaceId = options && typeof options === 'object' ? options.workspaceId : undefined;
    if (workspaceId) request.workspaceId = workspaceId;
    return await sessions.create(request);
  }

  return {
    available: Boolean(sessions),
    hasModelPicker: () => Boolean(remoteSession()?.selectModel),
    modelCatalog,
    selectModel,
    selectionOf,
    answerQuestion,
    open,
    listenApprovals,
    read,
    prompt,
    cancel,
    loadOlder,
    titleOf,
    createSession,
    listWorkspaces,
    workspaceOf,
    pollStates,
    watchTitles,
    removeQueued,
    steerQueued,
    hasAttachments,
    createDrafts,
    uploadSnapshots,
    subscribeUploads,
    releaseDrafts,
    sendWithAttachments,
    retryUpload,
    dispose() {
      for (const sessionId of [...entries.keys()]) close(sessionId);
    },
  };
}
