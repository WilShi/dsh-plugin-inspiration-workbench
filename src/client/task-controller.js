import { normalizeTask, sortTasks } from './task-model.js';
import {
  parseAIResponse,
  normalizeTopologyPlan,
  validateTopologyPlan,
  createLocalTaskDraft,
  createFallbackTopology,
  computeLayeredLayout,
  ensureTopologyDependencies,
} from './task-intelligence.js';
import { runTaskAnalysis, assistantTextFromView } from './task-ai.js';
import { pipelineFingerprint } from './pipeline-utils.js';

function hashText(value) {
  let hash = 2166136261;
  for (const char of String(value || '')) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function text(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function runtimeExecution(view) {
  return {
    running: Boolean(view?.running),
    waiting: view?.waiting || '',
    error: view?.error || view?.lastError || false,
    done: Boolean(view?.ready && !view?.running && (view?.items || []).some((item) => item.k === 'assistant' && String(item.text || '').trim())),
    activityAt: Date.now(),
  };
}

export function createTaskController({ adapter, taskStore, flow, t, toast, bridge }) {
  const liveRuntime = new Map();
  const runtimeSignatures = new Map();
  const runtimeSaveTimers = new Map();

  function rawTasks() {
    return taskStore.snapshot().tasks;
  }
  function listWorkspaces() {
    return adapter.listWorkspaces?.() || [];
  }
  function defaultWorkspaceId() {
    const workspaces = listWorkspaces();
    const currentTitle = bridge.getCards().find((card) => card.workspace)?.workspace;
    const current = workspaces.find((workspace) => workspace.title === currentTitle);
    return current?.id || workspaces[0]?.id || '';
  }
  function requireWorkspaceId() {
    const workspaceId = defaultWorkspaceId();
    if (!workspaceId) throw new Error('当前没有可用工作区，请先在 DSH 中添加工作区，再创建会话');
    return workspaceId;
  }
  function canvases() {
    return bridge.getCanvases() || [];
  }
  function taskById(id) {
    return rawTasks().find((task) => task.id === id);
  }
  function canvasNames(ids) {
    return asArray(ids).map((id) => canvases().find((canvas) => canvas.id === id)?.name).filter(Boolean);
  }
  function sessionRuntime(sessionId) {
    return liveRuntime.get(sessionId) || {};
  }
  function allRuntime(task) {
    return {
      ...(task.sessionStates || {}),
      ...Object.fromEntries((task.sessionIds || []).filter((id) => liveRuntime.has(id)).map((id) => [id, sessionRuntime(id)])),
    };
  }
  function executionFor(task) {
    const states = Object.values(allRuntime(task));
    if (states.some((state) => state.waiting)) return 'needs_input';
    if (states.some((state) => state.error)) return 'blocked';
    if (states.some((state) => state.running)) return 'running';
    const relatedEvents = [...flow.latestByEdge().values()].filter((event) => event.taskId === task.id || (task.canvasIds || []).includes(event.canvasId));
    if (relatedEvents.some((event) => event.status === 'failed')) return 'blocked';
    if (relatedEvents.some((event) => event.status === 'delivering')) return 'running';
    const expectedStates = (task.sessionIds || []).length;
    if (expectedStates && states.length === expectedStates && states.every((state) => state.done)) {
      const pendingNote = (task.plan?.nodes || []).some((node) => {
        if (node.kind !== 'note' || !node.cardId) return false;
        return (node.dependsOn || []).some((sourceId) => {
          const source = (task.plan.nodes || []).find((candidate) => candidate.id === sourceId && candidate.kind === 'session');
          if (!source?.sessionId) return false;
          const event = flow.latestByEdge().get(source.sessionId + '=>' + 'note:' + node.cardId);
          const sourceCard = bridge.getCards().find((card) => card.sessionId === source.sessionId);
          const latestText = [...(sourceCard?.view?.items || [])].reverse().find((item) => item.k === 'assistant' && String(item.text || '').trim())?.text || '';
          return event?.status !== 'delivered' || event.fingerprint !== pipelineFingerprint(latestText);
        });
      });
      if (pendingNote) return 'running';
      return 'done';
    }
    return task.executionStatus || 'idle';
  }
  function acceptanceFor(task) {
    if (task.acceptanceStatus) return task.acceptanceStatus;
    if (task.reviewStatus === 'accepted') return 'accepted';
    if (task.reviewStatus === 'rejected') return 'rejected';
    if (task.reviewStatus === 'review' || task.reviewStatus === 'pending') return 'review';
    return 'pending';
  }
  function projectNodes(task) {
    const runtime = allRuntime(task);
    const planNodes = Array.isArray(task.plan?.nodes) ? task.plan.nodes : [];
    if (!planNodes.length) {
      return (task.sessionIds || []).map((sessionId, index) => ({
        id: sessionId,
        kind: 'session',
        title: adapter.titleOf(sessionId) || '节点 ' + (index + 1),
        sessionId,
        status: runtimeExecution(runtime[sessionId] || {}).done ? 'done' : runtimeExecution(runtime[sessionId] || {}).running ? 'running' : runtimeExecution(runtime[sessionId] || {}).waiting ? 'needs_input' : runtimeExecution(runtime[sessionId] || {}).error ? 'blocked' : 'idle',
      }));
    }
    return planNodes.map((node, index) => {
      if (node.kind === 'note') {
        const targetId = node.cardId || node.id;
        const event = [...flow.latestByEdge().values()]
          .filter((item) => item.targetKind === 'note' && item.targetId === targetId)
          .sort((left, right) => right.at - left.at)[0];
        return {
          id: node.id,
          kind: 'note',
          title: node.title || '结果便签',
          cardId: node.cardId,
          status: event?.status === 'failed' ? 'blocked' : event?.status === 'delivering' ? 'running' : event?.status === 'delivered' ? 'done' : 'idle',
          activityAt: event?.at || 0,
        };
      }
      const sessionId = node.sessionId || task.sessionIds?.[index] || '';
      const state = runtime[sessionId] || {};
      return {
        id: node.id,
        kind: 'session',
        title: node.title || adapter.titleOf(sessionId) || '节点 ' + (index + 1),
        sessionId,
        dependsOn: node.dependsOn || [],
        status: state.waiting ? 'needs_input' : state.error ? 'blocked' : state.running ? 'running' : state.done ? 'done' : 'idle',
        activityAt: state.activityAt || 0,
      };
    });
  }

  function projectTask(task) {
    const executionStatus = executionFor(task);
    const acceptanceStatus = acceptanceFor(task);
    const normalized = normalizeTask({ ...task, executionStatus, acceptanceStatus });
    const events = flow.events().filter((event) =>
      event.taskId === task.id ||
      (task.canvasIds || []).includes(event.canvasId) ||
      (task.sessionIds || []).includes(event.sourceSessionId)
    );
    return {
      ...task,
      executionStatus,
      acceptanceStatus,
      ...(task.executionStatus !== executionStatus ? (() => {
        taskStore.updateTask(task.id, { executionStatus });
        return {};
      })() : {}),
      reviewStatus: acceptanceStatus,
      status: normalized.status,
      canvasNames: canvasNames(task.canvasIds),
      events,
      pending: asArray(task.pending),
      sessionIds: asArray(task.sessionIds),
      canvasIds: asArray(task.canvasIds),
      acceptanceCriteria: asArray(task.acceptanceCriteria),
      deliverables: asArray(task.deliverables),
      nodes: projectNodes(task),
    };
  }
  function snapshot() {
    for (const card of bridge.getCards()) {
      if (!card.sessionId) continue;
      try {
        card.view = adapter.read(card.sessionId);
        card.running = Boolean(card.view?.running);
      } catch {
        // Keep the last view when a session is temporarily unavailable.
      }
      noteSessionRuntime(card);
      if (!card.running) bridge.maybeDeliverCompleted?.(card);
    }
    return {
      tasks: sortTasks(rawTasks().map(projectTask)),
      canvases: canvases(),
    };
  }

  function noteSessionRuntime(card) {
    if (!card?.sessionId) return;
    const runtime = {
      running: Boolean(card.running),
      waiting: card.waiting || '',
      error: card.view?.lastError || ['error', 'failure'].includes((card.view?.items || []).at(-1)?.k) || false,
      done: Boolean(card.view?.ready && !card.running && !card.queued && (card.view?.items || []).some((item) => item.k === 'assistant' && String(item.text || '').trim())),
      activityAt: card.activityAt || Date.now(),
    };
    const signature = JSON.stringify(runtime);
    if (runtimeSignatures.get(card.sessionId) === signature) return;
    runtimeSignatures.set(card.sessionId, signature);
    liveRuntime.set(card.sessionId, runtime);
    clearTimeout(runtimeSaveTimers.get(card.sessionId));
    runtimeSaveTimers.set(card.sessionId, setTimeout(() => {
      const next = rawTasks().map((task) => {
        if (!(task.sessionIds || []).includes(card.sessionId)) return task;
        return { ...task, sessionStates: { ...(task.sessionStates || {}), [card.sessionId]: runtime } };
      });
      taskStore.setTasks(next);
      runtimeSaveTimers.delete(card.sessionId);
    }, 650));
  }

  function canvasIdsForSession(sessionId) {
    const ids = [];
    for (const canvas of canvases()) {
      const cards = Array.isArray(canvas.layout?.cards) ? canvas.layout.cards : [];
      if (cards.some((card) => card.sessionId === sessionId)) ids.push(canvas.id);
    }
    const current = bridge.getActiveCanvas();
    if (current && bridge.getCards().some((card) => card.sessionId === sessionId) && !ids.includes(current)) ids.push(current);
    return ids;
  }

  async function listSessions() {
    const recent = adapter.listRecentSessions?.(30) || [];
    const byId = new Map(recent.map((row) => [row.sessionId, row]));
    for (const card of bridge.getCards()) {
      if (!card.sessionId) continue;
      byId.set(card.sessionId, {
        sessionId: card.sessionId,
        title: card.title || adapter.titleOf(card.sessionId) || '未命名会话',
        activityAt: card.activityAt || Date.now(),
        workspace: card.workspace || adapter.workspaceOf?.(card.sessionId)?.title || '',
      });
    }
    return [...byId.values()].map((row) => ({
      ...row,
      id: row.sessionId,
      displayTitle: row.title,
      workspaceName: row.workspace,
      updatedAt: row.activityAt,
      canvasIds: canvasIdsForSession(row.sessionId),
    }));
  }

  async function inspectSessions(sessionIds) {
    const selected = [...new Set(sessionIds)].slice(0, 12);
    const sessions = await listSessions();
    const inspections = [];
    for (const sessionId of selected) {
      const meta = sessions.find((row) => row.sessionId === sessionId) || { sessionId, title: adapter.titleOf(sessionId) || '未命名会话' };
      const existing = bridge.getCards().find((card) => card.sessionId === sessionId);
      let view = existing?.view;
      let stop;
      if (!view) {
        stop = adapter.open(sessionId, () => {});
        try {
          if (adapter.waitForReady) await adapter.waitForReady(sessionId, { timeoutMs: 12000 });
          view = adapter.read(sessionId);
        } finally {
          stop?.();
        }
      }
      const items = (view?.items || []).filter((item) => item.text && ['user', 'assistant', 'error', 'failure'].includes(item.k)).slice(-12);
      const measuredRuntime = runtimeExecution(view);
      const runtime = existing ? { ...measuredRuntime, ...sessionRuntime(sessionId) } : measuredRuntime;
      liveRuntime.set(sessionId, runtime);
      inspections.push({
        ...meta,
        canvasIds: canvasIdsForSession(sessionId),
        runtime,
        lastAssistant: assistantTextFromView(view).slice(0, 3000),
        transcript: items.map((item) => ({ role: item.k, text: String(item.text).slice(0, 1600) })),
      });
    }
    return inspections;
  }

  function localTaskDrafts(inspections) {
    const groups = new Map();
    for (const inspection of inspections) {
      const canvasId = inspection.canvasIds?.[0] || '';
      const canvas = canvases().find((item) => item.id === canvasId);
      const key = canvasId || 'workspace:' + (inspection.workspace || '未分组');
      if (!groups.has(key)) groups.set(key, { key, canvas, sessions: [] });
      groups.get(key).sessions.push(inspection);
    }
    const now = Date.now();
    return [...groups.values()].map((group) => {
      const ids = group.sessions.map((item) => item.sessionId);
      const states = group.sessions.map((item) => item.runtime);
      const executionStatus = states.some((state) => state.waiting) ? 'needs_input'
        : states.some((state) => state.error) ? 'blocked'
          : states.some((state) => state.running) ? 'running'
            : states.every((state) => state.done) ? 'done' : 'idle';
      const title = group.canvas?.name || group.sessions[0].workspace || group.sessions[0].title || '会话任务';
      const pending = group.sessions.filter((item) => item.runtime.waiting || item.runtime.error)
        .map((item) => (item.runtime.error ? '执行失败：' : '等待处理：') + item.title);
      const canvasLayout = group.canvas?.layout?.cards || [];
      return {
        id: 'draft-' + hashText(group.key + ids.join(',')),
        title,
        goal: group.canvas?.goal || '',
        summary: group.sessions.find((item) => item.lastAssistant)?.lastAssistant?.slice(0, 500)
          || ids.length + ' 个关联会话，等待进一步整理。',
        executionStatus,
        acceptanceStatus: executionStatus === 'done' ? 'review' : 'pending',
        priority: pending.length ? 'high' : 'normal',
        sessionIds: ids,
        canvasIds: group.canvas ? [group.canvas.id] : [],
        pending,
        acceptanceCriteria: [],
        deliverables: group.sessions.filter((item) => item.lastAssistant).map((item) => ({
          id: 'message-' + item.sessionId,
          kind: 'message',
          title: item.title + ' 的最新回复',
          sessionId: item.sessionId,
        })),
        sessionStates: Object.fromEntries(group.sessions.map((item) => [item.sessionId, item.runtime])),
        plan: createLocalTaskDraft({ cards: canvasLayout, sessions: group.sessions, title }),
        source: 'scan',
        createdAt: now,
        updatedAt: now,
      };
    });
  }

  function aiTaskDrafts(parsed, inspections) {
    const candidates = asArray(parsed?.tasks).length ? parsed.tasks : [parsed];
    const selectedIds = new Set(inspections.map((item) => item.sessionId));
    const localBySession = new Map(inspections.map((item) => [item.sessionId, item]));
    const drafts = [];
    for (const raw of candidates) {
      if (!raw || typeof raw !== 'object') continue;
      const ids = asArray(raw.sessionIds || raw.sessions).map(String).filter((id) => selectedIds.has(id));
      if (!ids.length) continue;
      const related = ids.map((id) => localBySession.get(id));
      const canvasIds = [...new Set(related.flatMap((item) => item.canvasIds || []))];
      const runtime = localTaskDrafts(related)[0];
      drafts.push({
        ...runtime,
        id: 'draft-' + hashText((raw.title || 'task') + ids.join(',')),
        title: text(raw.title, runtime.title),
        goal: text(raw.goal || raw.objective),
        summary: text(raw.summary || raw.description, runtime.summary),
        pending: asArray(raw.pending || raw.todos).map(String),
        acceptanceCriteria: asArray(raw.acceptanceCriteria || raw.acceptance).map(String),
        priority: ['high', 'normal', 'low'].includes(raw.priority) ? raw.priority : runtime.priority,
        canvasIds,
        sessionIds: ids,
        source: 'scan-ai',
      });
    }
    return drafts;
  }

  async function listModels() {
    const catalog = await adapter.modelCatalog();
    const models = [];
    for (const group of catalog?.groups || []) {
      for (const model of group.models || []) {
        models.push({
          id: model.id,
          provider: model.provider || group.id,
          name: model.name || model.id,
          reasoningEffort: model.reasoning?.defaultEffort,
        });
      }
    }
    const firstSession = bridge.getCards().find((card) => card.sessionId)?.sessionId;
    const selected = firstSession ? adapter.selectionOf?.(firstSession) : null;
    const fallback = selected || models[0] || null;
    const defaultModel = fallback ? { model: fallback.model || fallback.id, provider: fallback.provider } : null;
    return { models, defaultModel };
  }

  async function scan({ sessionIds, useAI, model }) {
    const inspections = await inspectSessions(sessionIds);
    if (!inspections.length) return [];
    const local = localTaskDrafts(inspections);
    if (!useAI) return local;
    const prompt = [
      '你是任务整理助手。根据给定的真实 DSH 会话，归纳任务目标、当前进展和待办。',
      '只输出 JSON：{"tasks":[{"title":"...","goal":"...","summary":"...","sessionIds":["..."],"pending":["..."],"acceptanceCriteria":["..."],"priority":"high|normal|low"}]}。',
      '相同目标的会话应合并，不得创造会话中不存在的交付物，不得改写 sessionIds。状态由本地系统计算，不需要你判断。',
      '会话数据：' + JSON.stringify(inspections),
    ].join('\n');
    const workspaceId = adapter.listWorkspaces?.().find((workspace) => workspace.title === inspections[0].workspace)?.id || defaultWorkspaceId();
    const result = await runTaskAnalysis({ adapter, prompt, workspaceId });
    const parsed = parseAIResponse(result.text);
    const drafts = aiTaskDrafts(parsed, inspections);
    if (!drafts.length) {
      toast('AI 没有返回可关联的任务，已保留本地整理草案');
      return local;
    }
    return drafts;
  }

  async function plan({ requirement, workspaceId, useAI, model }) {
    const goal = String(requirement || '').trim();
    if (!goal) throw new Error('先写下你想完成的事情');
    if (!useAI) {
      const fallback = createFallbackTopology({ goal, title: goal.slice(0, 60) });
      fallback.workspaceId = workspaceId || defaultWorkspaceId();
      fallback.acceptanceCriteria = ['结果可验证，并汇总到结果便签'];
      return fallback;
    }
    const prompt = [
      '你是多 Agent 工作流规划助手。根据需求复杂度拆成 4-12 个可执行节点，不要凑数；只有职责独立、输入输出明确、可单独验收的工作才单独成节点。简单任务可以少于 4 个，复杂任务应尽量拆细。',
      '只输出 JSON：{"title":"...","goal":"...","acceptanceCriteria":["..."],"nodes":[{"id":"research","kind":"session","title":"...","prompt":"...","dependsOn":[]},{"id":"delivery","kind":"note","title":"结果汇总","note":"# 结果汇总","dependsOn":["research"]}]}。',
      'session 节点必须是真实可执行工作，覆盖实际需要的分析、设计、实现、验证和交付环节，不得重复或泛泛而谈。note 节点只能做最终或中间结果汇点，不能有下游。dependsOn 填上游节点 id，依赖必须真实，不要简单串成一条长链。每个 session 的 prompt 要包含目标、输入、期望输出和验收标准。',
      '用户需求：' + goal,
    ].join('\n');
    const parsePlan = (text) => {
      const parsed = parseAIResponse(text);
      const candidate = parsed.plan || parsed.topology || parsed;
      return { candidate, normalized: ensureTopologyDependencies(normalizeTopologyPlan(candidate)) };
    };
    let result = await runTaskAnalysis({ adapter, prompt, workspaceId: workspaceId || defaultWorkspaceId(), selection: model });
    let parsedPlan;
    try {
      parsedPlan = parsePlan(result.text);
    } catch {
      result = await runTaskAnalysis({
        adapter,
        prompt: prompt + '\n上一次输出无法解析为有效拓扑。请只返回合法 JSON，不要输出 Markdown、解释或多余文字。',
        workspaceId: workspaceId || defaultWorkspaceId(),
        selection: model,
      });
      parsedPlan = parsePlan(result.text);
    }
    const { candidate, normalized } = parsedPlan;
    const validation = validateTopologyPlan(normalized);
    if (!validation.valid) throw new Error(validation.errors.map((error) => error.message).join('；'));
    normalized.acceptanceCriteria = asArray(candidate.acceptanceCriteria || candidate.acceptance).map(String);
    normalized.workspaceId = workspaceId || defaultWorkspaceId();
    normalized.model = model ? { provider: model.provider, model: model.model || model.id, reasoningEffort: model.reasoningEffort } : undefined;
    const rawNodes = asArray(candidate.nodes);
    for (const node of normalized.nodes) {
      const raw = rawNodes.find((item) => (item.id || item.key) === node.id);
      node.mode = raw?.mode === 'draft' ? 'draft' : 'send';
    }
    return normalized;
  }

  function linkTaskCanvas(task, canvasId) {
    const canvas = canvases().find((item) => item.id === canvasId);
    if (canvas) canvas.taskId = task.id;
    bridge.storeCanvases();
    taskStore.updateTask(task.id, { canvasIds: [...new Set([...(task.canvasIds || []), canvasId])] });
  }

  async function openTask(task, sessionId) {
    const current = taskById(task.id) || task;
    let canvasId = current.canvasIds?.[0];
    if (!canvasId) {
      const created = await createCanvas(current);
      canvasId = created.canvasId;
    } else if (bridge.getActiveCanvas() !== canvasId) {
      await bridge.requestSwitchCanvas(canvasId);
    }
    bridge.setMode('canvas');
    if (sessionId) {
      const card = bridge.getCards().find((item) => item.sessionId === sessionId);
      if (card) {
        bridge.centerCard(card);
        bridge.flash(card);
      }
    }
    return canvasId;
  }

  async function createCanvas(task) {
    if (task.plan && !(task.sessionIds || []).length) return materializePlan(task.plan, { start: false, task });
    await bridge.requestNewBlankCanvas();
    for (const sessionId of task.sessionIds || []) {
      bridge.addSession({ sessionId, title: adapter.titleOf(sessionId) });
    }
    if (!bridge.saveCanvasAs(task.title || '任务画布')) throw new Error('画布保存失败');
    const canvasId = bridge.getActiveCanvas();
    linkTaskCanvas(task, canvasId);
    bridge.save();
    bridge.setMode('canvas');
    await bridge.fitView();
    return { taskId: task.id, canvasId };
  }

  async function materializePlan(value, options = {}) {
    const plan = ensureTopologyDependencies(normalizeTopologyPlan(value));
    plan.acceptanceCriteria = asArray(value?.acceptanceCriteria || value?.acceptance).map(String);
    plan.workspaceId = value?.workspaceId || '';
    const rawNodes = asArray(value?.nodes);
    for (const node of plan.nodes) {
      const raw = rawNodes.find((item) => (item.id || item.key) === node.id);
      node.mode = raw?.mode === 'draft' ? 'draft' : 'send';
    }
    const validation = validateTopologyPlan(plan);
    if (!validation.valid) throw new Error(validation.errors.map((error) => error.message).join('；'));
    const workspaceId = plan.workspaceId || requireWorkspaceId();
    await bridge.requestNewBlankCanvas();
    const layout = computeLayeredLayout(plan, { nodeWidth: 380, nodeHeight: 500, layerGap: 100, nodeGap: 32, originX: 40, originY: 40 });
    const positions = new Map(layout.nodes.map((node) => [node.id, node]));
    const cards = new Map();
    const createdSessionIds = [];
    try {
      for (const layer of layout.layers) {
        for (const nodeId of layer) {
          const node = plan.nodes.find((item) => item.id === nodeId);
          const position = positions.get(nodeId);
          if (node.kind === 'note') {
            const card = bridge.addNote({ title: node.title, note: node.note || '# 结果汇总', x: position.x, y: position.y, w: 380, h: 500 });
            node.cardId = card.id;
            cards.set(nodeId, card);
            continue;
          }
          const workspace = adapter.listWorkspaces?.().find((item) => item.id === plan.workspaceId || item.title === node.workspace);
          const sessionId = node.sessionId || await adapter.createSession({ workspaceId: workspace?.id || workspaceId, agentPreset: 'minimal' });
          if (plan.model && adapter.selectModel) {
            if (adapter.waitForReady) await adapter.waitForReady(sessionId, { timeoutMs: 15000 });
            await adapter.selectModel(sessionId, {
              provider: plan.model.provider,
              model: plan.model.model || plan.model.id,
              reasoningEffort: plan.model.reasoningEffort,
            });
          }
          const card = bridge.addSession({ sessionId, title: node.title, workspace: workspace?.title || node.workspace || '', x: position.x, y: position.y, w: 380, h: 500 });
          node.sessionId = sessionId;
          cards.set(nodeId, card);
          createdSessionIds.push(sessionId);
        }
      }
      for (const node of plan.nodes) {
        const targetCard = cards.get(node.id);
        for (const dependency of node.dependsOn) {
          const sourceCard = cards.get(dependency);
          if (!sourceCard || !targetCard) continue;
          const target = { kind: targetCard.kind === 'note' ? 'note' : 'session', id: targetCard.kind === 'note' ? targetCard.id : targetCard.sessionId, mode: node.mode === 'draft' ? 'draft' : 'send' };
          const existing = sourceCard.pipeline?.targets || [];
          bridge.setPipeTargets(sourceCard, [...existing, target]);
          bridge.recordFlow(sourceCard, target, 'waiting', { message: '拓扑已生成，等待上游完成' });
        }
      }
      for (const node of plan.nodes) {
        if (node.kind !== 'session') continue;
        const card = cards.get(node.id);
        card.composerDraft = node.prompt || plan.goal;
        bridge.renderFoot(card);
      }
      const task = options.task || {
        id: 'task-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
        title: plan.title,
        goal: plan.goal,
        source: 'plan',
        createdAt: Date.now(),
      };
      task.sessionIds = createdSessionIds;
      task.plan = plan;
      task.acceptanceCriteria = plan.acceptanceCriteria || task.acceptanceCriteria || [];
      task.executionStatus = options.start ? 'running' : 'idle';
      task.acceptanceStatus = task.acceptanceStatus || 'pending';
      task.pending = options.start ? [] : ['检查各节点草稿，确认后启动'];
      task.updatedAt = Date.now();
      if (!bridge.saveCanvasAs(plan.title || task.title)) throw new Error('画布保存失败');
      const canvasId = bridge.getActiveCanvas();
      task.canvasIds = [...new Set([...(task.canvasIds || []), canvasId])];
      linkTaskCanvas(task, canvasId);
      taskStore.addTasks([task]);
      bridge.save();
      bridge.schedulePipelines();
      bridge.setMode('canvas');
      await bridge.fitView();

      if (options.start) {
        for (const node of plan.nodes) {
          if (node.kind !== 'session' || node.dependsOn.length) continue;
          const card = cards.get(node.id);
          const prompt = node.prompt || plan.goal;
          card.composerDraft = '';
          bridge.renderFoot(card);
          await adapter.prompt(card.sessionId, prompt, 'queue');
        }
      }
      return { taskId: task.id, canvasId };
    } catch (error) {
      // Keep successfully created cards as a recoverable partial work scene.
      if (cards.size) {
        const partialName = (plan.title || '任务画布') + '（部分生成）';
        bridge.saveCanvasAs(partialName);
        bridge.save();
      }
      throw error;
    }
  }

  function continuationDraft(task) {
    return [
      '请继续这项任务，先理解已有上下文，不要重复已经完成的工作。',
      '任务目标：' + (task.goal || task.title || '未命名任务'),
      task.summary ? '当前进展：' + task.summary : '',
      task.pending?.length ? '未完成事项：\n- ' + task.pending.join('\n- ') : '请检查并补齐剩余事项。',
      task.acceptanceCriteria?.length ? '验收条件：\n- ' + task.acceptanceCriteria.join('\n- ') : '',
      task.deliverables?.length ? '已有交付物：\n- ' + task.deliverables.map((item) => item.title).join('\n- ') : '',
    ].filter(Boolean).join('\n\n');
  }

  async function continueTask(task) {
    const current = taskById(task.id) || task;
    await openTask(current);
    let sessionId = current.sessionIds?.[0];
    if (!sessionId) {
      sessionId = await adapter.createSession({ workspaceId: requireWorkspaceId() });
      bridge.addSession({ sessionId, title: current.title || '继续任务', focus: true });
      taskStore.updateTask(current.id, { sessionIds: [sessionId] });
    }
    const card = bridge.getCards().find((item) => item.sessionId === sessionId);
    if (!card) throw new Error('没有找到可续做的会话卡');
    card.composerDraft = continuationDraft(current);
    bridge.renderFoot(card);
    bridge.centerCard(card);
    bridge.flash(card);
    toast('已生成续做草稿，检查内容后发送');
  }

  return {
    snapshot,
    listModels,
    listWorkspaces,
    createWorkspace: ({ path }) => adapter.createWorkspace({ path }),
    listSessions,
    scan,
    plan,
    materializePlan,
    noteSessionRuntime,
    async addTasks(tasks) {
      const normalized = tasks.map((task) => ({ ...task, id: task.id || 'task-' + hashText(task.title + Date.now()), updatedAt: Date.now() }));
      taskStore.addTasks(normalized);
      for (const task of normalized) {
        for (const canvasId of task.canvasIds || []) linkTaskCanvas(task, canvasId);
      }
    },
    async updateTask(task, patch) { taskStore.updateTask(task.id, patch); },
    async deleteTask(task) {
      for (const canvas of canvases()) {
        if (canvas.taskId === task.id) delete canvas.taskId;
      }
      bridge.storeCanvases();
      taskStore.removeTask(task.id);
    },
    async openTask(task) { return openTask(task); },
    async openSession(task, sessionId) { return openTask(task, sessionId); },
    async continueTask(task) { return continueTask(task); },
    async reviewTask(task, accepted) {
      taskStore.updateTask(task.id, accepted ? {
        acceptanceStatus: 'accepted', executionStatus: 'done', pending: [],
      } : {
        acceptanceStatus: 'rejected', executionStatus: 'idle', pending: ['验收未通过，需要返工'],
      });
      toast(accepted ? '任务已验收完成' : '已退回任务，可继续生成返工草稿');
    },
    async createCanvas(task) { return createCanvas(task); },
    continuationDraft,
    dispose() {
      for (const timer of runtimeSaveTimers.values()) clearTimeout(timer);
      runtimeSaveTimers.clear();
    },
  };
}
