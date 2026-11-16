import { icon } from './icons';

const STATUS_ORDER = ['needs_input', 'blocked', 'review', 'running', 'idle', 'done'];
const STATUS_RANK = Object.fromEntries(STATUS_ORDER.map((status, index) => [status, index]));
const PRIORITY_RANK = { urgent: 0, high: 1, normal: 2, medium: 2, low: 3 };

const COPY = {
  title: ['任务中心', 'Task center'],
  scan: ['整理会话', 'Organize sessions'],
  plan: ['规划需求', 'Plan requirement'],
  refresh: ['刷新', 'Refresh'],
  count: ['{shown} / {total} 项任务', '{shown} / {total} tasks'],
  canvasCount: ['{n} 张画布', '{n} canvases'],
  filter: ['筛选状态', 'Filter by status'],
  filterAll: ['全部任务', 'All tasks'],
  filterAttention: ['待处理', 'Needs attention'],
  sort: ['排序', 'Sort'],
  sortSmart: ['智能排序 · 待处理优先', 'Smart · Actionable first'],
  sortUpdated: ['最近更新', 'Recently updated'],
  sortPriority: ['优先级', 'Priority'],
  sortTitle: ['标题', 'Title'],
  loading: ['正在读取任务…', 'Loading tasks…'],
  loadingDetail: ['正在准备任务详情…', 'Preparing task details…'],
  retry: ['重试', 'Retry'],
  dismiss: ['关闭提示', 'Dismiss message'],
  loadError: ['任务读取失败', 'Could not load tasks'],
  emptyTitle: ['还没有任务', 'No tasks yet'],
  emptyBody: ['整理现有会话，或输入一个需求来生成执行拓扑。', 'Organize existing sessions, or describe a requirement to build an execution topology.'],
  emptyFilter: ['当前筛选下没有任务', 'No tasks match this filter'],
  emptyFilterBody: ['换一个状态筛选，或创建一项新任务。', 'Try another status filter, or create a new task.'],
  noSelection: ['选择一项任务', 'Select a task'],
  noSelectionBody: ['在左侧选择任务，查看目标、待处理事项和交付物。', 'Choose a task on the left to inspect its goal, pending items, and deliverables.'],
  untitled: ['未命名任务', 'Untitled task'],
  noSummary: ['还没有任务摘要。', 'No task summary yet.'],
  goal: ['目标', 'Goal'],
  summary: ['摘要', 'Summary'],
  pending: ['待处理事项', 'Pending items'],
  acceptance: ['验收标准', 'Acceptance criteria'],
  deliverables: ['交付物', 'Deliverables'],
  nodeProgress: ['节点进度', 'Node progress'],
  nodeDoneCount: ['{done}/{total} 个节点已完成', '{done}/{total} nodes completed'],
  sessions: ['关联会话', 'Linked sessions'],
  canvases: ['关联画布', 'Linked canvases'],
  source: ['来源', 'Source'],
  events: ['最近动态', 'Recent activity'],
  none: ['暂无', 'None'],
  updated: ['更新于 {time}', 'Updated {time}'],
  itemCount: ['{n} 项', '{n} items'],
  open: ['进入现场', 'Open workspace'],
  continue: ['续做', 'Continue'],
  continueDone: ['已完成的任务无需续做', 'Completed tasks do not need continuation'],
  accept: ['通过验收', 'Accept'],
  reject: ['返修', 'Request changes'],
  createCanvas: ['生成画布', 'Create canvas'],
  delete: ['删除任务', 'Delete task'],
  editStatus: ['任务状态（自动更新）', 'Task status (auto)'],
  autoStatus: ['自动更新', 'Auto'],
  editPriority: ['优先级', 'Priority'],
  openSession: ['打开会话', 'Open session'],
  handle: ['处理', 'Handle'],
  moreEvents: ['仅显示最近 {shown} 条，共 {total} 条', 'Showing the latest {shown} of {total} events'],
  updatedTask: ['任务已更新', 'Task updated'],
  reviewedAccept: ['已通过验收', 'Task accepted'],
  reviewedReject: ['已退回返修', 'Changes requested'],
  canvasCreated: ['任务画布已创建', 'Task canvas created'],
  deleted: ['任务已删除', 'Task deleted'],
  deleteTitle: ['删除这项任务？', 'Delete this task?'],
  deleteBody: ['将删除「{name}」及其任务记录，关联会话和画布本身不会被删除。', 'Delete “{name}” and its task record. Linked sessions and canvases themselves will not be deleted.'],
  cancel: ['取消', 'Cancel'],
  close: ['关闭', 'Close'],
  confirmDelete: ['确认删除', 'Delete task'],
  actionMissing: ['当前环境未提供 {name} 操作', 'The {name} action is unavailable in this environment'],
  actionFailed: ['操作失败，请重试', 'The action failed. Please try again'],
  selected: ['已选择 {n} 项', '{n} selected'],
  selectAll: ['全选', 'Select all'],
  useAI: ['使用 AI 辅助分析', 'Use AI-assisted analysis'],
  scanTitle: ['从会话整理任务', 'Organize tasks from sessions'],
  scanIntro: ['选择要整理的会话。扫描后可以先检查草案，再决定哪些进入任务中心。', 'Choose sessions to organize. Review the drafts before adding them to the task center.'],
  sessionsLoading: ['正在读取会话列表…', 'Loading sessions…'],
  sessionsEmpty: ['没有可整理的会话', 'No sessions available'],
  sessionsEmptyBody: ['先开始一个会话，再回来整理任务。', 'Start a session first, then come back to organize it.'],
  sessionsError: ['会话列表读取失败', 'Could not load sessions'],
  reloadSessions: ['重新读取', 'Reload sessions'],
  scanRun: ['扫描并生成草案', 'Scan and create drafts'],
  scanning: ['正在分析会话并提炼任务…', 'Analyzing sessions and extracting tasks…'],
  scanError: ['会话整理失败', 'Could not organize sessions'],
  draftsTitle: ['选择任务草案', 'Choose task drafts'],
  draftsEmpty: ['没有发现可新增的任务', 'No new tasks found'],
  draftsEmptyBody: ['可以返回选择其它会话，或改用需求规划。', 'Go back to choose other sessions, or plan a requirement instead.'],
  back: ['返回', 'Back'],
  addTasks: ['添加 {n} 项任务', 'Add {n} tasks'],
  tasksAdded: ['已添加 {n} 项任务', 'Added {n} tasks'],
  noSessionSelection: ['请至少选择一个会话', 'Select at least one session'],
  scanLimit: ['一次最多整理 12 个会话，请减少选择', 'Select no more than 12 sessions at a time'],
  noDraftSelection: ['请至少选择一个草案', 'Select at least one draft'],
  planTitle: ['把需求拆成执行拓扑', 'Turn a requirement into an execution topology'],
  planIntro: ['描述目标、约束和期望交付物。生成后可以检查节点与依赖，再选择要落地的草案。', 'Describe the goal, constraints, and expected deliverables. Review nodes and dependencies before materializing the selected drafts.'],
  requirement: ['需求描述', 'Requirement'],
  requirementPlaceholder: ['例如：为插件增加任务模式，拆分界面、持久化和测试，并给出验收标准…', 'Example: Add a task mode to the plugin, split UI, persistence and tests, and define acceptance criteria…'],
  workspaceId: ['工作区', 'Workspace'],
  model: ['规划模型', 'Planning model'],
  modelDefault: ['跟随 DSH 默认模型', 'Use DSH default'],
  workspacePlaceholder: ['留空使用当前工作区', 'Leave blank to use the current workspace'],
  workspaceEmpty: ['暂无工作区，请先在 DSH 中添加', 'No workspaces. Add one in DSH first'],
  workspaceRequired: ['当前没有可用工作区，请先在 DSH 中添加后再创建会话', 'Add a workspace in DSH before creating sessions'],
  createWorkspace: ['新建工作区', 'Create workspace'],
  workspacePath: ['工作区绝对路径', 'Absolute workspace path'],
  workspacePathPlaceholder: ['例如：/Users/name/project', 'For example: /Users/name/project'],
  createWorkspaceConfirm: ['创建并选中', 'Create and select'],
  createWorkspaceCancel: ['取消新建', 'Cancel'],
  generatePlan: ['生成拓扑草案', 'Generate topology'],
  planning: ['正在分析需求并规划依赖…', 'Analyzing the requirement and planning dependencies…'],
  planError: ['需求规划失败', 'Could not plan the requirement'],
  requirementRequired: ['请先填写需求描述', 'Describe the requirement first'],
  planEmpty: ['没有生成可落地的节点', 'No materializable nodes were generated'],
  planEmptyBody: ['返回补充目标和交付物，然后重新生成。', 'Go back to add goals and deliverables, then generate again.'],
  planReview: ['检查拓扑与草案', 'Review topology and drafts'],
  startAfter: ['创建后立即开始执行', 'Start immediately after creation'],
  materialize: ['创建 {n} 项任务', 'Create {n} tasks'],
  materialized: ['任务拓扑已创建', 'Task topology created'],
  editRequirement: ['修改需求', 'Edit requirement'],
  node: ['节点 {n}', 'Node {n}'],
  dependencies: ['依赖：{name}', 'Depends on: {name}'],
  noDependencies: ['无前置依赖', 'No dependencies'],
  edges: ['依赖连接', 'Dependency edges'],
  noEdges: ['节点之间没有额外连接', 'No additional links between nodes'],
  sessionNode: ['会话', 'Session'],
  noteNode: ['便签', 'Note'],
  taskNode: ['任务', 'Task'],
  'status.needs_input': ['待输入', 'Needs input'],
  'status.blocked': ['受阻', 'Blocked'],
  'status.review': ['待验收', 'In review'],
  'status.running': ['进行中', 'Running'],
  'status.idle': ['待开始', 'Idle'],
  'status.done': ['已完成', 'Done'],
  'status.attention': ['待处理', 'Needs attention'],
  'review.pending': ['尚未提交验收', 'Not submitted for review'],
  'review.review': ['等待验收', 'Waiting for review'],
  'review.accepted': ['验收已通过', 'Accepted'],
  'review.rejected': ['已退回返修', 'Changes requested'],
  'priority.urgent': ['紧急', 'Urgent'],
  'priority.high': ['高优先级', 'High'],
  'priority.normal': ['普通', 'Normal'],
  'priority.medium': ['普通', 'Normal'],
  'priority.low': ['低优先级', 'Low'],
};

function token(value) {
  return String(value ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
}

function text(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
}

function array(value) {
  return Array.isArray(value) ? value : [];
}

function timestamp(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const raw = text(value);
  if (!raw) return 0;
  if (Number.isFinite(Number(raw))) return Number(raw);
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function errorText(error) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  return '';
}

function itemText(item) {
  if (typeof item === 'string' || typeof item === 'number') return text(item);
  if (!item || typeof item !== 'object') return '';
  return text(item.title ?? item.text ?? item.label ?? item.message ?? item.summary ?? item.goal ?? item.name ?? item.path ?? item.url ?? item.kind ?? item.type);
}

function endpointId(endpoint) {
  if (endpoint && typeof endpoint === 'object') return text(endpoint.id ?? endpoint.nodeId ?? endpoint.taskId);
  return text(endpoint);
}

export function createTaskView({ host, t, el, getSnapshot, actions = {}, toast }) {
  const doc = host?.ownerDocument || document;
  const make = el || ((tag, className, html) => {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  });
  const localeTitle = typeof t === 'function' ? t('title') : '';
  const english = /inspiration|english/i.test(localeTitle) || /^en(?:-|$)/i.test(doc.documentElement?.lang || '');
  const copy = (key, variables = {}) => {
    const translationKey = 'task.' + key;
    let value = typeof t === 'function' ? t(translationKey) : '';
    if (!value || value === translationKey) value = (COPY[key] || [key, key])[english ? 1 : 0];
    return String(value).replace(/\{(\w+)\}/g, (match, name) => variables[name] == null ? match : String(variables[name]));
  };
  const notify = (message) => {
    if (!message || typeof toast !== 'function') return;
    try { toast(message); } catch { /* a toast must never interrupt an action */ }
  };

  const state = {
    tasks: [],
    canvases: [],
    selectedId: null,
    filter: 'all',
    sort: 'smart',
    loading: true,
    loaded: false,
    error: '',
  };
  const busy = new Set();
  const dialogBusy = new WeakMap();
  const dialogs = new Set();
  let disposed = false;
  let refreshVersion = 0;
  let dialogSequence = 0;

  const root = make('div', 'iwb-root iwb-task-view');
  root.setAttribute('aria-label', copy('title'));
  const toolbar = make('div', 'iwb-toolbar iwb-task-toolbar');
  const titles = make('div', 'iwb-titles');
  const titleNode = make('div', 'iwb-title');
  titleNode.textContent = copy('title');
  const countsNode = make('div', 'iwb-counts');
  titles.append(titleNode, countsNode);
  const toolbarActions = make('div', 'iwb-toolbar-actions');
  toolbar.append(titles, toolbarActions);
  root.appendChild(toolbar);

  function button(label, options = {}) {
    const node = make('button', 'iwb-btn' + (options.className ? ' ' + options.className : ''));
    node.type = 'button';
    if (options.icon) node.innerHTML = icon(options.icon, 13);
    const caption = make('span');
    caption.textContent = label;
    node.appendChild(caption);
    if (options.action) node.dataset.action = options.action;
    if (options.taskId != null) node.dataset.taskId = String(options.taskId);
    if (options.busyKey) node.dataset.busyKey = options.busyKey;
    if (options.busyScope) node.dataset.busyScope = options.busyScope;
    if (options.focusKey) node.dataset.focusKey = options.focusKey;
    if (options.async !== false) node.dataset.async = 'true';
    if (options.disabled) node.dataset.staticDisabled = 'true';
    if (options.title) node.title = options.title;
    if (options.label) node.setAttribute('aria-label', options.label);
    return node;
  }

  const scanButton = button(copy('scan'), { icon: 'list', busyScope: 'scan', action: 'scan', title: copy('scanTitle') });
  const planButton = button(copy('plan'), { icon: 'sparkle', className: 'primary', busyScope: 'plan', action: 'plan', title: copy('planTitle') });
  toolbarActions.append(scanButton, planButton);

  const controls = make('div', 'iwb-task-controls');
  const filterField = make('label', 'iwb-task-control');
  const filterLabel = make('span', 'iwb-task-control-label');
  filterLabel.textContent = copy('filter');
  const filterSelect = make('select', 'iwb-task-select-control');
  filterSelect.dataset.focusKey = 'filter';
  filterSelect.setAttribute('aria-label', copy('filter'));
  const filterOptions = [
    ['all', copy('filterAll')],
    ['attention', copy('filterAttention')],
    ...STATUS_ORDER.map((status) => [status, copy('status.' + status)]),
  ];
  for (const [value, label] of filterOptions) {
    const option = make('option');
    option.value = value;
    option.textContent = label;
    filterSelect.appendChild(option);
  }
  filterField.append(filterLabel, filterSelect);

  const sortField = make('label', 'iwb-task-control');
  const sortLabel = make('span', 'iwb-task-control-label');
  sortLabel.textContent = copy('sort');
  const sortSelect = make('select', 'iwb-task-select-control');
  sortSelect.dataset.focusKey = 'sort';
  sortSelect.setAttribute('aria-label', copy('sort'));
  for (const [value, key] of [['smart', 'sortSmart'], ['updated', 'sortUpdated'], ['priority', 'sortPriority'], ['title', 'sortTitle']]) {
    const option = make('option');
    option.value = value;
    option.textContent = copy(key);
    sortSelect.appendChild(option);
  }
  sortField.append(sortLabel, sortSelect);
  const refreshButton = button(copy('refresh'), { icon: 'arrange', async: false, action: 'refresh', className: 'iwb-task-refresh', focusKey: 'refresh' });
  controls.append(filterField, sortField, refreshButton);
  root.appendChild(controls);

  const alertNode = make('div', 'iwb-task-alert');
  alertNode.setAttribute('role', 'alert');
  const alertText = make('span', 'iwb-task-alert-text');
  const alertClose = button('', { icon: 'close', async: false, className: 'icon', label: copy('dismiss'), title: copy('dismiss') });
  alertNode.append(alertText, alertClose);
  alertNode.hidden = true;
  root.appendChild(alertNode);

  const layout = make('div', 'iwb-task-layout');
  const listPanel = make('section', 'iwb-task-list-panel');
  listPanel.setAttribute('aria-label', copy('filterAll'));
  const listHead = make('div', 'iwb-task-list-head');
  const listCount = make('span', 'iwb-task-list-count');
  listHead.appendChild(listCount);
  const listNode = make('div', 'iwb-task-list');
  listNode.setAttribute('role', 'list');
  listPanel.append(listHead, listNode);
  const detailNode = make('section', 'iwb-task-detail');
  detailNode.setAttribute('aria-label', copy('noSelection'));
  layout.append(listPanel, detailNode);
  root.appendChild(layout);

  function priorityOf(task) {
    const raw = task.priority && typeof task.priority === 'object' ? task.priority.value ?? task.priority.level : task.priority;
    if (typeof raw === 'number') return raw <= 0 ? 'urgent' : raw === 1 ? 'high' : raw >= 3 ? 'low' : 'normal';
    const value = token(raw);
    return Object.hasOwn(PRIORITY_RANK, value) ? value : 'normal';
  }

  function reviewOf(task) {
    const value = token(task.reviewStatus ?? task.acceptanceStatus ?? task.acceptance?.status);
    if (['review', 'in_review', 'awaiting_review'].includes(value)) return 'review';
    if (['accepted', 'approved', 'passed', 'not_required'].includes(value)) return 'accepted';
    if (['rejected', 'denied', 'changes_requested'].includes(value)) return 'rejected';
    return 'pending';
  }

  function statusOf(task) {
    const overall = token(task.status);
    if (Object.hasOwn(STATUS_RANK, overall)) return overall;
    const execution = token(task.executionStatus ?? task.execution?.status);
    const review = reviewOf(task);
    if (['needs_input', 'need_input', 'waiting_input', 'awaiting_input', 'question', 'approval'].includes(execution)) return 'needs_input';
    if (['blocked', 'failed', 'failure', 'error'].includes(execution)) return 'blocked';
    if (review === 'review' || overall === 'review') return 'review';
    if (['running', 'active', 'in_progress'].includes(execution)) return 'running';
    if (['done', 'complete', 'completed', 'succeeded'].includes(execution) || overall === 'done') {
      return review === 'accepted' ? 'done' : 'review';
    }
    return 'idle';
  }

  function viewOf(task, index) {
    const id = text(task?.id) || 'task-' + index;
    const pending = array(task?.pending);
    const canvasIds = array(task?.canvasIds).map(String);
    const canvasNames = array(task?.canvasNames).map(itemText).filter(Boolean);
    for (const canvasId of canvasIds) {
      const canvas = state.canvases.find((entry) => String(entry?.id ?? entry?.canvasId) === canvasId);
      const name = itemText(canvas);
      if (name && !canvasNames.includes(name)) canvasNames.push(name);
    }
    return {
      raw: task,
      index,
      id,
      title: text(task?.title) || copy('untitled'),
      goal: text(task?.goal),
      summary: text(task?.summary),
      status: statusOf(task || {}),
      reviewStatus: reviewOf(task || {}),
      priority: priorityOf(task || {}),
      pending,
      sessionIds: array(task?.sessionIds).map(String).filter(Boolean),
      canvasIds,
      canvasNames,
      acceptanceCriteria: array(task?.acceptanceCriteria),
      deliverables: array(task?.deliverables),
      updatedAt: timestamp(task?.updatedAt ?? task?.createdAt),
      source: task?.source,
      events: array(task?.events),
      nodes: array(task?.nodes),
    };
  }

  function needsAttention(task) {
    return task.pending.length > 0 || ['needs_input', 'blocked', 'review'].includes(task.status);
  }

  function visibleTasks() {
    const filtered = state.tasks.filter((task) => {
      if (state.filter === 'all') return true;
      if (state.filter === 'attention') return needsAttention(task);
      return task.status === state.filter;
    });
    return filtered.sort((left, right) => {
      if (state.sort === 'title') return left.title.localeCompare(right.title) || left.index - right.index;
      if (state.sort === 'updated') return right.updatedAt - left.updatedAt || left.index - right.index;
      if (state.sort === 'priority') {
        return (PRIORITY_RANK[left.priority] - PRIORITY_RANK[right.priority])
          || (Number(needsAttention(right)) - Number(needsAttention(left)))
          || (right.updatedAt - left.updatedAt)
          || (left.index - right.index);
      }
      return (Number(needsAttention(right)) - Number(needsAttention(left)))
        || (STATUS_RANK[left.status] - STATUS_RANK[right.status])
        || (PRIORITY_RANK[left.priority] - PRIORITY_RANK[right.priority])
        || (right.updatedAt - left.updatedAt)
        || (left.index - right.index);
    });
  }

  function selectedTask() {
    return state.tasks.find((task) => task.id === state.selectedId) || null;
  }

  function formatTime(value, full = false) {
    const time = timestamp(value);
    if (!time) return '—';
    try {
      return new Intl.DateTimeFormat(english ? 'en-US' : 'zh-CN', full
        ? { dateStyle: 'medium', timeStyle: 'short' }
        : { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(time));
    } catch {
      return new Date(time).toLocaleString();
    }
  }

  function statusBadge(task) {
    const badge = make('span', 'iwb-task-status is-' + task.status);
    badge.textContent = copy('status.' + task.status);
    return badge;
  }

  function priorityBadge(task) {
    const badge = make('span', 'iwb-task-priority is-' + task.priority);
    badge.textContent = copy('priority.' + task.priority);
    return badge;
  }

  function stateBlock(kind, title, body, action) {
    const block = make('div', 'iwb-task-state is-' + kind);
    block.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    if (kind === 'loading') {
      const spinner = make('span', 'iwb-task-spinner');
      spinner.setAttribute('aria-hidden', 'true');
      block.appendChild(spinner);
    }
    const heading = make('div', 'iwb-task-state-title');
    heading.textContent = title;
    block.appendChild(heading);
    if (body) {
      const description = make('div', 'iwb-task-state-body');
      description.textContent = body;
      block.appendChild(description);
    }
    if (action) block.appendChild(action);
    return block;
  }

  function renderAlert() {
    alertNode.hidden = !state.error;
    alertText.textContent = state.error;
  }

  function taskBusy(taskId) {
    const prefix = 'task:' + taskId + ':';
    return [...busy].some((key) => key.startsWith(prefix));
  }

  function scopeBusy(scope) {
    if (scope === 'scan') return [...busy].some((key) => key.startsWith('scan:') || key === 'sessions:list');
    if (scope === 'plan') return [...busy].some((key) => key.startsWith('plan:'));
    return false;
  }

  function syncBusy() {
    if (disposed) return;
    root.setAttribute('aria-busy', String(state.loading));
    const containers = [root, ...[...dialogs].map((entry) => entry.dialog)];
    for (const container of containers) {
      const localBusy = container === root ? null : (dialogBusy.get(container) || new Set());
      for (const control of container.querySelectorAll('button, input, select, textarea')) {
        const isAsync = control.dataset.async === 'true';
        let active = false;
        if (container !== root) active = localBusy.size > 0;
        else if (isAsync && control.dataset.taskId != null) active = taskBusy(control.dataset.taskId);
        else if (isAsync && control.dataset.busyScope) active = scopeBusy(control.dataset.busyScope);
        else if (isAsync && control.dataset.busyKey) active = busy.has(control.dataset.busyKey);
        if (control.dataset.action === 'refresh' && state.loading) active = true;
        control.disabled = control.dataset.staticDisabled === 'true' || active;
        control.classList.toggle('iwb-task-is-loading', Boolean(control.dataset.busyKey && busy.has(control.dataset.busyKey)));
      }
      if (container !== root) container.setAttribute('aria-busy', String(localBusy.size > 0));
    }
    for (const row of listNode.querySelectorAll('[data-task-row]')) {
      row.setAttribute('aria-busy', String(taskBusy(row.dataset.taskRow)));
    }
    const detail = detailNode.querySelector('.iwb-task-detail-inner');
    if (detail) detail.setAttribute('aria-busy', String(Boolean(state.selectedId && taskBusy(state.selectedId))));
  }

  function rememberFocus() {
    const active = doc.activeElement;
    return active && root.contains(active) ? active.dataset?.focusKey || '' : '';
  }

  function restoreFocus(focusKey) {
    if (!focusKey) return;
    const target = [...root.querySelectorAll('[data-focus-key]')].find((node) => node.dataset.focusKey === focusKey);
    if (target && !target.disabled) target.focus({ preventScroll: true });
  }

  function renderList(tasks) {
    listNode.replaceChildren();
    listCount.textContent = copy('count', { shown: tasks.length, total: state.tasks.length });
    if (state.loading) {
      listNode.appendChild(stateBlock('loading', copy('loading')));
      return;
    }
    if (!tasks.length) {
      const filtered = state.tasks.length > 0;
      const retry = !filtered && state.error ? button(copy('retry'), { async: false, action: 'retry' }) : null;
      if (retry) retry.addEventListener('click', () => { void refresh(); });
      listNode.appendChild(stateBlock(
        state.error && !filtered ? 'error' : 'empty',
        state.error && !filtered ? copy('loadError') : filtered ? copy('emptyFilter') : copy('emptyTitle'),
        state.error && !filtered ? state.error : filtered ? copy('emptyFilterBody') : copy('emptyBody'),
        retry
      ));
      return;
    }
    for (const task of tasks) {
      const row = make('article', 'iwb-task-list-item' + (task.id === state.selectedId ? ' is-selected' : ''));
      row.dataset.taskRow = task.id;
      row.setAttribute('role', 'listitem');
      const select = make('button', 'iwb-task-list-select');
      select.type = 'button';
      select.dataset.focusKey = 'list:' + task.id;
      select.setAttribute('aria-current', task.id === state.selectedId ? 'true' : 'false');
      const top = make('span', 'iwb-task-list-top');
      const heading = make('span', 'iwb-task-list-title');
      heading.textContent = task.title;
      top.append(heading, statusBadge(task));
      const summary = make('span', 'iwb-task-list-summary');
      summary.textContent = task.summary || task.goal || copy('noSummary');
      const meta = make('span', 'iwb-task-list-meta');
      const priority = priorityBadge(task);
      const time = make('span', 'iwb-task-list-time');
      time.textContent = formatTime(task.updatedAt);
      time.title = formatTime(task.updatedAt, true);
      meta.append(priority, time);
      if (task.pending.length) {
        const pending = make('span', 'iwb-task-pending-badge');
        pending.textContent = copy('itemCount', { n: task.pending.length });
        pending.title = copy('pending');
        meta.appendChild(pending);
      }
      select.append(top, summary, meta);
      select.addEventListener('click', () => {
        state.selectedId = task.id;
        render();
      });
      select.addEventListener('dblclick', (event) => {
        event.preventDefault();
        void runTaskAction(task, 'openTask');
      });
      row.appendChild(select);
      listNode.appendChild(row);
    }
  }

  function section(title, items, className) {
    const container = make('section', 'iwb-task-section' + (className ? ' ' + className : ''));
    const heading = make('h3', 'iwb-task-section-title');
    heading.textContent = title;
    container.appendChild(heading);
    if (!items.length) {
      const empty = make('div', 'iwb-task-inline-empty');
      empty.textContent = copy('none');
      container.appendChild(empty);
      return container;
    }
    const list = make('ul', 'iwb-task-fact-list');
    for (const item of items) {
      const row = make('li', 'iwb-task-fact');
      const marker = make('span', 'iwb-task-fact-marker');
      marker.setAttribute('aria-hidden', 'true');
      const content = make('div', 'iwb-task-fact-content');
      const label = make('div', 'iwb-task-fact-text');
      label.textContent = itemText(item) || copy('none');
      content.appendChild(label);
      const detail = item && typeof item === 'object' ? text(item.description ?? item.detail ?? item.reason) : '';
      if (detail && detail !== label.textContent) {
        const description = make('div', 'iwb-task-fact-detail');
        description.textContent = detail;
        content.appendChild(description);
      }
      row.append(marker, content);
      list.appendChild(row);
    }
    container.appendChild(list);
    return container;
  }

  function renderPending(task) {
    const container = section(copy('pending'), task.pending, 'iwb-task-pending-section');
    const rows = container.querySelectorAll('.iwb-task-fact');
    task.pending.forEach((pending, index) => {
      const sessionId = text(pending?.sessionId ?? pending?.session?.id);
      if (!sessionId || !rows[index]) return;
      const open = button(copy('handle'), {
        icon: 'open', taskId: task.id, className: 'iwb-task-small-action',
        title: copy('openSession') + ' · ' + sessionId,
      });
      open.addEventListener('click', () => { void runTaskAction(task, 'openSession', [sessionId]); });
      rows[index].appendChild(open);
    });
    return container;
  }

  function renderDetail(task) {
    detailNode.replaceChildren();
    if (state.loading) {
      detailNode.appendChild(stateBlock('loading', copy('loadingDetail')));
      return;
    }
    if (!task) {
      detailNode.appendChild(stateBlock('empty', copy('noSelection'), copy('noSelectionBody')));
      return;
    }
    detailNode.setAttribute('aria-label', task.title);
    const inner = make('div', 'iwb-task-detail-inner');
    inner.setAttribute('aria-busy', String(taskBusy(task.id)));
    const head = make('header', 'iwb-task-detail-head');
    const badges = make('div', 'iwb-task-detail-badges');
    badges.append(statusBadge(task), priorityBadge(task));
    const heading = make('h2', 'iwb-task-detail-title');
    heading.textContent = task.title;
    const time = make('div', 'iwb-task-detail-time');
    time.textContent = copy('updated', { time: formatTime(task.updatedAt) });
    time.title = formatTime(task.updatedAt, true);
    head.append(badges, heading, time);
    inner.appendChild(head);

    const actionBar = make('div', 'iwb-task-detail-actions');
    const open = button(copy('open'), { icon: 'open', className: 'primary', taskId: task.id, focusKey: 'open:' + task.id });
    open.addEventListener('click', () => { void runTaskAction(task, 'openTask'); });
    const resume = button(copy('continue'), {
      icon: 'flow', taskId: task.id, disabled: task.status === 'done',
      title: task.status === 'done' ? copy('continueDone') : copy('continue'), focusKey: 'continue:' + task.id,
    });
    resume.addEventListener('click', async () => {
      const outcome = await runTaskAction(task, 'continueTask');
      if (outcome.ok) notify(copy('updatedTask'));
    });
    actionBar.append(open, resume);
    if (task.status === 'review' || task.reviewStatus === 'review') {
      const reject = button(copy('reject'), { icon: 'close', taskId: task.id, focusKey: 'reject:' + task.id });
      reject.addEventListener('click', async () => {
        const outcome = await runTaskAction(task, 'reviewTask', [false]);
        if (outcome.ok) notify(copy('reviewedReject'));
      });
      const accept = button(copy('accept'), { icon: 'eye', className: 'iwb-task-accept', taskId: task.id, focusKey: 'accept:' + task.id });
      accept.addEventListener('click', async () => {
        const outcome = await runTaskAction(task, 'reviewTask', [true]);
        if (outcome.ok) notify(copy('reviewedAccept'));
      });
      actionBar.append(reject, accept);
    }
    const canvas = button(copy('createCanvas'), { icon: 'canvas', taskId: task.id, focusKey: 'canvas:' + task.id });
    canvas.addEventListener('click', async () => {
      const outcome = await runTaskAction(task, 'createCanvas');
      if (outcome.ok) notify(copy('canvasCreated'));
    });
    actionBar.appendChild(canvas);
    inner.appendChild(actionBar);

    const editors = make('div', 'iwb-task-editors');
    const statusField = make('label', 'iwb-task-editor');
    const statusText = make('span', 'iwb-task-editor-label');
    statusText.textContent = copy('editStatus');
    const statusSelect = make('span', 'iwb-task-auto-status');
    statusSelect.dataset.taskId = task.id;
    statusSelect.textContent = copy('status.' + task.status) + ' · ' + copy('autoStatus');
    statusSelect.setAttribute('aria-label', copy('status.' + task.status) + ' · ' + copy('autoStatus'));
    statusField.append(statusText, statusSelect);

    const priorityField = make('label', 'iwb-task-editor');
    const priorityText = make('span', 'iwb-task-editor-label');
    priorityText.textContent = copy('editPriority');
    const prioritySelect = make('select', 'iwb-task-select-control');
    prioritySelect.dataset.async = 'true';
    prioritySelect.dataset.taskId = task.id;
    prioritySelect.dataset.focusKey = 'priority:' + task.id;
    for (const priority of ['urgent', 'high', 'normal', 'low']) {
      const option = make('option');
      option.value = priority;
      option.textContent = copy('priority.' + priority);
      prioritySelect.appendChild(option);
    }
    prioritySelect.value = task.priority === 'medium' ? 'normal' : task.priority;
    prioritySelect.addEventListener('change', async () => {
      const next = prioritySelect.value;
      const outcome = await runTaskAction(task, 'updateTask', [{ priority: next }]);
      if (outcome.ok) notify(copy('updatedTask'));
      else prioritySelect.value = task.priority;
    });
    priorityField.append(priorityText, prioritySelect);
    const spacer = make('span', 'iwb-task-editor-spacer');
    const remove = button(copy('delete'), {
      icon: 'close', className: 'iwb-task-danger', taskId: task.id, focusKey: 'delete:' + task.id,
    });
    remove.addEventListener('click', () => { openDeleteDialog(task, remove); });
    editors.append(statusField, priorityField, spacer, remove);
    inner.appendChild(editors);

    if (task.goal) {
      const goal = make('section', 'iwb-task-goal');
      const label = make('h3', 'iwb-task-section-title');
      label.textContent = copy('goal');
      const content = make('p');
      content.textContent = task.goal;
      goal.append(label, content);
      inner.appendChild(goal);
    }
    const summary = make('section', 'iwb-task-summary');
    const summaryTitle = make('h3', 'iwb-task-section-title');
    summaryTitle.textContent = copy('summary');
    const summaryText = make('p');
    summaryText.textContent = task.summary || copy('noSummary');
    summary.append(summaryTitle, summaryText);
    inner.appendChild(summary);
    if (task.nodes?.length) {
      const nodes = make('section', 'iwb-task-section iwb-task-nodes');
      const title = make('h3', 'iwb-task-section-title');
      const doneCount = task.nodes.filter((node) => node.status === 'done').length;
      title.textContent = copy('nodeProgress') + ' · ' + copy('nodeDoneCount', { done: doneCount, total: task.nodes.length });
      const list = make('div', 'iwb-task-node-list');
      for (const node of task.nodes) {
        const row = make('div', 'iwb-task-node-row');
        const info = make('div', 'iwb-task-node-info');
        const name = make('span', 'iwb-task-node-title');
        name.textContent = node.title || node.id;
        const kind = make('span', 'iwb-task-node-kind');
        kind.textContent = node.kind === 'note' ? copy('noteNode') : copy('sessionNode');
        const status = make('span', 'iwb-task-node-status is-' + (node.status || 'idle'));
        status.textContent = copy('status.' + (node.status || 'idle'));
        info.append(name, kind);
        row.append(info, status);
        list.appendChild(row);
      }
      nodes.append(title, list);
      inner.appendChild(nodes);
    }
    if (task.pending.length) inner.appendChild(renderPending(task));
    inner.appendChild(section(copy('acceptance'), task.acceptanceCriteria));
    inner.appendChild(section(copy('deliverables'), task.deliverables, 'iwb-task-deliverables'));

    const links = make('div', 'iwb-task-links-grid');
    const sessionSection = make('section', 'iwb-task-section');
    const sessionTitle = make('h3', 'iwb-task-section-title');
    sessionTitle.textContent = copy('sessions');
    const sessionList = make('div', 'iwb-task-chip-list');
    if (!task.sessionIds.length) {
      const empty = make('span', 'iwb-task-inline-empty');
      empty.textContent = copy('none');
      sessionList.appendChild(empty);
    }
    for (const sessionId of task.sessionIds) {
      const chip = button(sessionId, {
        icon: 'open', className: 'iwb-task-chip', taskId: task.id,
        title: copy('openSession') + ' · ' + sessionId,
      });
      chip.addEventListener('click', () => { void runTaskAction(task, 'openSession', [sessionId]); });
      sessionList.appendChild(chip);
    }
    sessionSection.append(sessionTitle, sessionList);
    const canvasSection = make('section', 'iwb-task-section');
    const canvasTitle = make('h3', 'iwb-task-section-title');
    canvasTitle.textContent = copy('canvases');
    const canvasList = make('div', 'iwb-task-chip-list');
    if (!task.canvasNames.length) {
      const empty = make('span', 'iwb-task-inline-empty');
      empty.textContent = copy('none');
      canvasList.appendChild(empty);
    }
    for (const name of task.canvasNames) {
      const chip = make('span', 'iwb-task-chip is-static');
      chip.textContent = name;
      canvasList.appendChild(chip);
    }
    canvasSection.append(canvasTitle, canvasList);
    links.append(sessionSection, canvasSection);
    inner.appendChild(links);

    const sourceText = itemText(task.source);
    if (sourceText) {
      const source = make('div', 'iwb-task-source');
      const label = make('span');
      label.textContent = copy('source');
      const value = make('span');
      value.textContent = sourceText;
      source.append(label, value);
      inner.appendChild(source);
    }
    if (task.events.length) {
      const eventSection = make('section', 'iwb-task-section iwb-task-events');
      const eventTitle = make('h3', 'iwb-task-section-title');
      eventTitle.textContent = copy('events');
      const eventList = make('ol', 'iwb-task-event-list');
      const events = task.events.slice(-6).reverse();
      for (const event of events) {
        const row = make('li', 'iwb-task-event');
        const marker = make('span', 'iwb-task-event-marker');
        marker.setAttribute('aria-hidden', 'true');
        const body = make('div', 'iwb-task-event-body');
        const eventLabel = make('div', 'iwb-task-event-title');
        const stateLabel = text(event?.state ?? event?.status ?? event?.type ?? event?.action);
        eventLabel.textContent = itemText(event) || stateLabel || copy('updatedTask');
        const eventTime = make('time', 'iwb-task-event-time');
        const at = event?.timestamp ?? event?.at ?? event?.updatedAt ?? event?.createdAt;
        eventTime.textContent = formatTime(at);
        eventTime.title = formatTime(at, true);
        body.append(eventLabel, eventTime);
        row.append(marker, body);
        eventList.appendChild(row);
      }
      eventSection.append(eventTitle, eventList);
      if (task.events.length > events.length) {
        const note = make('div', 'iwb-task-event-note');
        note.textContent = copy('moreEvents', { shown: events.length, total: task.events.length });
        eventSection.appendChild(note);
      }
      inner.appendChild(eventSection);
    }
    detailNode.appendChild(inner);
  }

  function render() {
    if (disposed) return;
    const focusKey = rememberFocus();
    const tasks = visibleTasks();
    if (!tasks.some((task) => task.id === state.selectedId)) state.selectedId = tasks[0]?.id || null;
    countsNode.textContent = copy('count', { shown: tasks.length, total: state.tasks.length })
      + ' · ' + copy('canvasCount', { n: state.canvases.length });
    filterSelect.value = state.filter;
    sortSelect.value = state.sort;
    renderAlert();
    renderList(tasks);
    renderDetail(selectedTask());
    syncBusy();
    restoreFocus(focusKey);
  }

  function applySnapshot(snapshot) {
    const value = snapshot && typeof snapshot === 'object' ? snapshot : {};
    state.canvases = array(value.canvases);
    state.tasks = array(value.tasks).map((task, index) => viewOf(task || {}, index));
    state.loading = false;
    state.loaded = true;
    state.error = '';
    render();
    return snapshot;
  }

  function failSnapshot(error) {
    state.loading = false;
    state.loaded = true;
    state.error = errorText(error) || copy('loadError');
    render();
    return null;
  }

  function refresh() {
    if (disposed) return null;
    const version = ++refreshVersion;
    let snapshot;
    try {
      snapshot = typeof getSnapshot === 'function' ? getSnapshot() : {};
    } catch (error) {
      return failSnapshot(error);
    }
    if (snapshot && typeof snapshot.then === 'function') {
      state.loading = true;
      render();
      return Promise.resolve(snapshot)
        .then((value) => version === refreshVersion && !disposed ? applySnapshot(value) : null)
        .catch((error) => version === refreshVersion && !disposed ? failSnapshot(error) : null);
    }
    return applySnapshot(snapshot);
  }

  function requireAction(name) {
    const action = actions?.[name];
    if (typeof action !== 'function') throw new Error(copy('actionMissing', { name }));
    return action;
  }

  function clearError(dialog) {
    if (dialog) dialog.clearError();
    else {
      state.error = '';
      renderAlert();
    }
  }

  async function runBusy(key, operation, options = {}) {
    if (disposed || busy.has(key)) return { ok: false, cancelled: true };
    const dialog = options.dialog || null;
    busy.add(key);
    if (dialog) {
      const keys = dialogBusy.get(dialog.dialog) || new Set();
      keys.add(key);
      dialogBusy.set(dialog.dialog, keys);
    }
    clearError(dialog);
    syncBusy();
    try {
      const value = await Promise.resolve().then(operation);
      if (value && value.ok === false) throw new Error(errorText(value.error) || copy('actionFailed'));
      if (options.refresh && !disposed) await refresh();
      return { ok: true, value };
    } catch (error) {
      const message = errorText(error) || copy('actionFailed');
      if (!disposed) {
        if (dialog?.isOpen()) dialog.setError(message);
        else {
          state.error = message;
          renderAlert();
        }
        notify(message);
      }
      return { ok: false, error };
    } finally {
      busy.delete(key);
      if (dialog) {
        const keys = dialogBusy.get(dialog.dialog);
        keys?.delete(key);
      }
      syncBusy();
    }
  }

  function runTaskAction(task, name, args = [], dialog = null, refreshAction = true) {
    return runBusy('task:' + task.id + ':' + name, () => requireAction(name)(task.raw, ...args), {
      dialog,
      refresh: refreshAction,
    });
  }

  function openDialog(title, trigger, kind = '') {
    const previousFocus = trigger || doc.activeElement;
    const dialog = make('dialog', 'iwb-task-dialog' + (kind ? ' iwb-task-dialog-' + kind : ''));
    const titleId = 'iwb-task-dialog-title-' + (++dialogSequence);
    dialog.setAttribute('aria-labelledby', titleId);
    const head = make('header', 'iwb-task-dialog-head');
    const heading = make('h2', 'iwb-task-dialog-title');
    heading.id = titleId;
    heading.textContent = title;
    const closeButton = button('', { icon: 'close', async: false, className: 'icon', label: copy('close'), title: copy('close') });
    head.append(heading, closeButton);
    const body = make('div', 'iwb-task-dialog-body');
    const errorNode = make('div', 'iwb-task-dialog-error');
    errorNode.setAttribute('role', 'alert');
    errorNode.hidden = true;
    const footer = make('footer', 'iwb-task-dialog-footer');
    dialog.append(head, body, errorNode, footer);
    let cleaned = false;
    const entry = {
      dialog,
      body,
      footer,
      isOpen: () => !cleaned && dialog.isConnected,
      clearError() {
        errorNode.hidden = true;
        errorNode.textContent = '';
      },
      setError(message) {
        errorNode.textContent = message;
        errorNode.hidden = false;
      },
      close(force = false) {
        if (cleaned || (!force && (dialogBusy.get(dialog)?.size || 0) > 0)) return;
        if (dialog.open && typeof dialog.close === 'function') dialog.close();
        else cleanup();
      },
    };
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      dialogs.delete(entry);
      dialog.remove();
      if (!disposed && previousFocus?.isConnected && typeof previousFocus.focus === 'function') {
        previousFocus.focus({ preventScroll: true });
      }
    };
    closeButton.addEventListener('click', () => entry.close());
    dialog.addEventListener('close', cleanup);
    dialog.addEventListener('cancel', (event) => {
      if ((dialogBusy.get(dialog)?.size || 0) > 0) event.preventDefault();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) entry.close();
    });
    dialogs.add(entry);
    (doc.body || host).appendChild(dialog);
    try {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } catch {
      dialog.setAttribute('open', '');
    }
    const focusTarget = dialog.querySelector('[autofocus]') || dialog.querySelector('textarea, input, select, button');
    focusTarget?.focus({ preventScroll: true });
    return entry;
  }

  function dialogFooterButton(dialog, label, options, handler) {
    const node = button(label, options);
    node.addEventListener('click', handler);
    dialog.footer.appendChild(node);
    return node;
  }

  function normalizeSessions(value) {
    const rows = Array.isArray(value) ? value : array(value?.sessions ?? value?.items ?? value?.value);
    return rows.map((session, index) => ({
      raw: session,
      index,
      id: text(session?.id ?? session?.sessionId),
      title: text(session?.displayTitle ?? session?.title ?? session?.name) || text(session?.id ?? session?.sessionId) || 'Session ' + (index + 1),
      workspace: text(session?.workspaceName ?? session?.workspaceId) || text(session?.workspace?.title ?? session?.workspace),
      updatedAt: timestamp(session?.updatedAt ?? session?.activityAt ?? session?.lastActiveAt ?? session?.createdAt),
    })).filter((session) => session.id);
  }

  function draftRows(value, keys = ['drafts', 'tasks', 'items', 'value']) {
    if (Array.isArray(value)) return { items: value, key: null };
    for (const key of keys) {
      if (Array.isArray(value?.[key])) return { items: value[key], key };
    }
    return { items: [], key: null };
  }

  function openScanDialog(trigger) {
    const dialog = openDialog(copy('scanTitle'), trigger, 'scan');
    const model = { sessions: [], selectedSessions: new Set(), useAI: true, drafts: [], selectedDrafts: new Set(), phase: 'loading' };

    function staticDisabled(node, disabled) {
      if (disabled) node.dataset.staticDisabled = 'true';
      else delete node.dataset.staticDisabled;
      syncBusy();
    }

    function renderSessionRows() {
      dialog.body.replaceChildren();
      const intro = make('p', 'iwb-task-dialog-intro');
      intro.textContent = copy('scanIntro') + ' · ' + copy('selected', { n: model.selectedSessions.size });
      dialog.body.appendChild(intro);
      if (!model.sessions.length) {
        dialog.body.appendChild(stateBlock('empty', copy('sessionsEmpty'), copy('sessionsEmptyBody')));
        return;
      }
      const options = make('div', 'iwb-task-dialog-options');
      const allLabel = make('label', 'iwb-task-check iwb-task-select-all');
      const all = make('input');
      all.type = 'checkbox';
      all.checked = model.selectedSessions.size === model.sessions.length && model.sessions.length > 0;
      all.indeterminate = model.selectedSessions.size > 0 && model.selectedSessions.size < model.sessions.length;
      const allText = make('span');
      allText.textContent = copy('selectAll');
      allLabel.append(all, allText);
      all.addEventListener('change', () => {
        model.selectedSessions = all.checked ? new Set(model.sessions.map((session) => session.id)) : new Set();
        renderSessions();
        dialog.body.querySelector('.iwb-task-select-all input')?.focus({ preventScroll: true });
      });
      const aiLabel = make('label', 'iwb-task-check');
      const ai = make('input');
      ai.type = 'checkbox';
      ai.checked = model.useAI;
      const aiText = make('span');
      aiText.textContent = copy('useAI');
      aiLabel.append(ai, aiText);
      ai.addEventListener('change', () => { model.useAI = ai.checked; });
      options.append(allLabel, aiLabel);
      dialog.body.appendChild(options);
      const list = make('div', 'iwb-task-session-list');
      for (const session of model.sessions) {
        const label = make('label', 'iwb-task-session-item');
        const checkbox = make('input');
        checkbox.type = 'checkbox';
        checkbox.checked = model.selectedSessions.has(session.id);
        checkbox.setAttribute('aria-label', session.title);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) model.selectedSessions.add(session.id);
          else model.selectedSessions.delete(session.id);
          renderSessions();
          const index = model.sessions.findIndex((item) => item.id === session.id);
          dialog.body.querySelectorAll('.iwb-task-session-item input')[index]?.focus({ preventScroll: true });
        });
        const content = make('span', 'iwb-task-session-content');
        const title = make('span', 'iwb-task-session-title');
        title.textContent = session.title;
        const meta = make('span', 'iwb-task-session-meta');
        meta.textContent = [session.workspace, formatTime(session.updatedAt)].filter((value) => value && value !== '—').join(' · ') || session.id;
        content.append(title, meta);
        label.append(checkbox, content);
        list.appendChild(label);
      }
      dialog.body.appendChild(list);
    }

    function renderSessions() {
      model.phase = 'sessions';
      renderSessionRows();
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy('cancel'), { async: false }, () => dialog.close());
      dialogFooterButton(dialog, copy('reloadSessions'), { busyKey: 'sessions:list' }, () => { void loadSessions(); });
      const run = dialogFooterButton(dialog, copy('scanRun'), { className: 'primary', busyKey: 'scan:run' }, () => { void scan(); });
      staticDisabled(run, model.selectedSessions.size === 0);
    }

    function renderDrafts() {
      model.phase = 'drafts';
      dialog.body.replaceChildren();
      const intro = make('p', 'iwb-task-dialog-intro');
      intro.textContent = copy('draftsTitle') + ' · ' + copy('selected', { n: model.selectedDrafts.size });
      dialog.body.appendChild(intro);
      if (!model.drafts.length) {
        dialog.body.appendChild(stateBlock('empty', copy('draftsEmpty'), copy('draftsEmptyBody')));
      } else {
        const options = make('div', 'iwb-task-dialog-options');
        const allLabel = make('label', 'iwb-task-check iwb-task-select-all');
        const all = make('input');
        all.type = 'checkbox';
        all.checked = model.selectedDrafts.size === model.drafts.length;
        all.indeterminate = model.selectedDrafts.size > 0 && model.selectedDrafts.size < model.drafts.length;
        const allText = make('span');
        allText.textContent = copy('selectAll');
        allLabel.append(all, allText);
        all.addEventListener('change', () => {
          model.selectedDrafts = all.checked ? new Set(model.drafts.map((draft, index) => index)) : new Set();
          renderDrafts();
          dialog.body.querySelector('.iwb-task-select-all input')?.focus({ preventScroll: true });
        });
        options.appendChild(allLabel);
        dialog.body.appendChild(options);
        const list = make('div', 'iwb-task-draft-list');
        model.drafts.forEach((draft, index) => {
          const label = make('label', 'iwb-task-draft-item');
          const checkbox = make('input');
          checkbox.type = 'checkbox';
          checkbox.checked = model.selectedDrafts.has(index);
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) model.selectedDrafts.add(index);
            else model.selectedDrafts.delete(index);
            renderDrafts();
            dialog.body.querySelectorAll('.iwb-task-draft-item input')[index]?.focus({ preventScroll: true });
          });
          const content = make('span', 'iwb-task-draft-content');
          const top = make('span', 'iwb-task-draft-top');
          const title = make('span', 'iwb-task-draft-title');
          title.textContent = text(draft?.title) || copy('untitled');
          const priority = make('span', 'iwb-task-priority is-' + priorityOf(draft || {}));
          priority.textContent = copy('priority.' + priorityOf(draft || {}));
          top.append(title, priority);
          const summary = make('span', 'iwb-task-draft-summary');
          summary.textContent = text(draft?.summary ?? draft?.goal ?? draft?.description) || copy('noSummary');
          const meta = make('span', 'iwb-task-draft-meta');
          const facts = [];
          if (array(draft?.acceptanceCriteria).length) facts.push(copy('acceptance') + ' ' + array(draft.acceptanceCriteria).length);
          if (array(draft?.sessionIds).length) facts.push(copy('sessions') + ' ' + array(draft.sessionIds).length);
          meta.textContent = facts.join(' · ');
          content.append(top, summary, meta);
          label.append(checkbox, content);
          list.appendChild(label);
        });
        dialog.body.appendChild(list);
      }
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy('back'), { async: false }, () => renderSessions());
      dialogFooterButton(dialog, copy('cancel'), { async: false }, () => dialog.close());
      const add = dialogFooterButton(dialog, copy('addTasks', { n: model.selectedDrafts.size }), { className: 'primary', busyKey: 'scan:add' }, () => { void addTasks(); });
      staticDisabled(add, model.selectedDrafts.size === 0);
    }

    async function loadSessions() {
      model.phase = 'loading';
      dialog.body.replaceChildren(stateBlock('loading', copy('sessionsLoading')));
      dialog.footer.replaceChildren();
      const outcome = await runBusy('sessions:list', () => requireAction('listSessions')(), { dialog, refresh: false });
      if (!dialog.isOpen()) return;
      if (!outcome.ok) {
        dialog.body.replaceChildren(stateBlock('error', copy('sessionsError'), errorText(outcome.error) || copy('actionFailed')));
        dialogFooterButton(dialog, copy('cancel'), { async: false }, () => dialog.close());
        dialogFooterButton(dialog, copy('retry'), { className: 'primary', busyKey: 'sessions:list' }, () => { void loadSessions(); });
        return;
      }
      model.sessions = normalizeSessions(outcome.value);
      model.selectedSessions = new Set(model.sessions.slice(0, 12).map((session) => session.id));
      renderSessions();
      dialog.body.querySelector('.iwb-task-session-item input')?.focus({ preventScroll: true });
    }

    async function scan() {
      if (!model.selectedSessions.size) {
        dialog.setError(copy('noSessionSelection'));
        return;
      }
      if (model.selectedSessions.size > 12) {
        dialog.setError(copy('scanLimit'));
        return;
      }
      model.phase = 'scanning';
      dialog.body.replaceChildren(stateBlock('loading', copy('scanning')));
      dialog.footer.replaceChildren();
      const outcome = await runBusy('scan:run', () => requireAction('scan')({
        sessionIds: [...model.selectedSessions],
        useAI: model.useAI,
      }), { dialog, refresh: false });
      if (!dialog.isOpen()) return;
      if (!outcome.ok) {
        renderSessions();
        dialog.setError(errorText(outcome.error) || copy('scanError'));
        return;
      }
      model.drafts = draftRows(outcome.value, ['drafts', 'tasks', 'items', 'value']).items;
      model.selectedDrafts = new Set(model.drafts.map((draft, index) => index));
      renderDrafts();
      dialog.body.querySelector('.iwb-task-draft-item input')?.focus({ preventScroll: true });
    }

    async function addTasks() {
      const selected = model.drafts.filter((draft, index) => model.selectedDrafts.has(index));
      if (!selected.length) {
        dialog.setError(copy('noDraftSelection'));
        return;
      }
      const outcome = await runBusy('scan:add', () => requireAction('addTasks')(selected), { dialog, refresh: true });
      if (outcome.ok && dialog.isOpen()) {
        notify(copy('tasksAdded', { n: selected.length }));
        dialog.close(true);
      }
    }

    void loadSessions();
  }

  function planParts(plan) {
    return draftRows(plan, ['drafts', 'tasks', 'nodes']);
  }

  function openPlanDialog(trigger) {
    const dialog = openDialog(copy('planTitle'), trigger, 'plan');
    const availableWorkspaces = typeof actions?.listWorkspaces === 'function' ? actions.listWorkspaces() : [];
    const model = {
      requirement: '',
      workspaceId: text(host?.dataset?.workspaceId) || text(availableWorkspaces?.[0]?.id),
      workspaces: Array.isArray(availableWorkspaces) ? availableWorkspaces : [],
      creatingWorkspace: false,
      models: [],
      modelId: '',
      defaultModel: null,
      useAI: true,
      start: true,
      plan: null,
      drafts: [],
      draftKey: null,
      selectedDrafts: new Set(),
    };

    function renderForm() {
      dialog.body.replaceChildren();
      const intro = make('p', 'iwb-task-dialog-intro');
      intro.textContent = copy('planIntro');
      const form = make('form', 'iwb-task-plan-form');
      const requirementField = make('label', 'iwb-task-field');
      const requirementLabel = make('span', 'iwb-task-field-label');
      requirementLabel.textContent = copy('requirement');
      const requirement = make('textarea', 'iwb-task-textarea');
      requirement.id = 'iwb-task-requirement-' + dialogSequence;
      requirement.rows = 6;
      requirement.required = true;
      requirement.autofocus = true;
      requirement.placeholder = copy('requirementPlaceholder');
      requirement.value = model.requirement;
      requirement.addEventListener('input', () => { model.requirement = requirement.value; });
      requirementField.append(requirementLabel, requirement);
      const workspaceField = make('label', 'iwb-task-field');
      const workspaceLabel = make('span', 'iwb-task-field-label');
      workspaceLabel.textContent = copy('workspaceId');
      const workspace = make('select', 'iwb-task-select-control iwb-task-workspace-select');
      workspace.setAttribute('aria-label', copy('workspaceId'));
      for (const item of model.workspaces) {
        const option = make('option');
        option.value = text(item?.id);
        option.textContent = text(item?.title, '未命名工作区') + (item?.path ? ' · ' + item.path : '');
        workspace.appendChild(option);
      }
      if (!model.workspaces.length) {
        const option = make('option');
        option.value = '';
        option.textContent = copy('workspaceEmpty');
        workspace.appendChild(option);
        workspace.disabled = true;
      }
      workspace.value = model.workspaceId;
      workspace.addEventListener('change', () => { model.workspaceId = workspace.value; });
      workspaceField.append(workspaceLabel, workspace);
      if (!model.workspaces.length) {
        const workspaceHint = make('p', 'iwb-task-dialog-intro iwb-task-workspace-required');
        workspaceHint.textContent = copy('workspaceRequired');
        workspaceField.appendChild(workspaceHint);
        if (!model.creatingWorkspace) {
          const create = make('button', 'iwb-btn iwb-task-workspace-create');
          create.type = 'button';
          create.textContent = copy('createWorkspace');
          create.addEventListener('click', () => { model.creatingWorkspace = true; renderForm(); });
          workspaceField.appendChild(create);
        } else {
          const path = make('input', 'iwb-task-input iwb-task-workspace-path');
          path.placeholder = copy('workspacePathPlaceholder');
          path.setAttribute('aria-label', copy('workspacePath'));
          path.value = model.workspacePath || '';
          path.addEventListener('input', () => { model.workspacePath = path.value; });
          workspaceField.appendChild(path);
          const actions = make('div', 'iwb-task-dialog-options');
          const confirm = make('button', 'iwb-btn primary iwb-task-workspace-confirm');
          confirm.type = 'button';
          confirm.textContent = copy('createWorkspaceConfirm');
          confirm.addEventListener('click', async () => {
            const value = path.value.trim();
            if (!/^\/|^[A-Za-z]:[\\/]/.test(value)) {
              dialog.setError(copy('workspacePath'));
              return;
            }
            const outcome = await runBusy('workspace:create', () => requireAction('createWorkspace')({ path: value }), { dialog, refresh: false });
            if (outcome.ok) {
              model.workspaces = [outcome.value, ...model.workspaces.filter((item) => item.id !== outcome.value.id)];
              model.workspaceId = outcome.value.id;
              model.creatingWorkspace = false;
              renderForm();
            } else {
              dialog.setError(errorText(outcome.error) || copy('actionFailed'));
            }
          });
          const cancel = make('button', 'iwb-btn iwb-task-workspace-cancel');
          cancel.type = 'button';
          cancel.textContent = copy('createWorkspaceCancel');
          cancel.addEventListener('click', () => { model.creatingWorkspace = false; renderForm(); });
          actions.append(confirm, cancel);
          workspaceField.appendChild(actions);
          path.focus({ preventScroll: true });
        }
      }
      const modelField = make('label', 'iwb-task-field');
      const modelLabel = make('span', 'iwb-task-field-label');
      modelLabel.textContent = copy('model');
      const modelSelect = make('select', 'iwb-task-select-control iwb-task-model-select');
      modelSelect.setAttribute('aria-label', copy('model'));
      const defaultOption = make('option');
      defaultOption.value = '';
      defaultOption.textContent = model.defaultModel?.model ? copy('modelDefault') + '（' + model.defaultModel.model + '）' : copy('modelDefault');
      modelSelect.appendChild(defaultOption);
      for (const item of model.models) {
        const option = make('option');
        option.value = item.id;
        option.textContent = item.name + (item.provider ? ' · ' + item.provider : '');
        modelSelect.appendChild(option);
      }
      modelSelect.value = model.modelId;
      modelSelect.addEventListener('change', () => { model.modelId = modelSelect.value; });
      modelField.append(modelLabel, modelSelect);
      const aiLabel = make('label', 'iwb-task-check');
      const ai = make('input');
      ai.type = 'checkbox';
      ai.checked = model.useAI;
      const aiText = make('span');
      aiText.textContent = copy('useAI');
      aiLabel.append(ai, aiText);
      ai.addEventListener('change', () => { model.useAI = ai.checked; });
      form.append(requirementField, workspaceField, modelField, aiLabel);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        model.requirement = requirement.value;
        model.workspaceId = workspace.value;
        void generate();
      });
      dialog.body.append(intro, form);
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy('cancel'), { async: false }, () => dialog.close());
      const generateButton = dialogFooterButton(dialog, copy('generatePlan'), { className: 'primary', busyKey: 'plan:generate' }, () => {
        model.requirement = requirement.value;
        model.workspaceId = workspace.value;
        if (typeof form.requestSubmit === 'function') form.requestSubmit();
        else void generate();
      });
      generateButton.setAttribute('aria-controls', requirement.id);
      if (!model.workspaces.length) generateButton.dataset.staticDisabled = 'true';
      requirement.focus({ preventScroll: true });
    }

    function draftName(draft, index) {
      return text(draft?.title ?? draft?.name ?? draft?.goal) || copy('node', { n: index + 1 });
    }

    function dependenciesOf(draft) {
      return array(draft?.dependsOn ?? draft?.dependencies ?? draft?.needs).map(endpointId).filter(Boolean);
    }

    function renderEdges() {
      const edges = array(model.plan?.edges ?? model.plan?.links);
      const container = make('section', 'iwb-task-plan-edges');
      const title = make('h3', 'iwb-task-section-title');
      title.textContent = copy('edges');
      container.appendChild(title);
      if (!edges.length) {
        const empty = make('div', 'iwb-task-inline-empty');
        empty.textContent = copy('noEdges');
        container.appendChild(empty);
        return container;
      }
      const list = make('ul', 'iwb-task-plan-edge-list');
      for (const edge of edges) {
        const from = endpointId(edge?.from ?? edge?.source ?? edge?.sourceId ?? edge?.fromNodeId);
        const to = endpointId(edge?.to ?? edge?.target ?? edge?.targetId ?? edge?.toNodeId);
        const sourceIndex = model.drafts.findIndex((draft, index) => text(draft?.id ?? draft?.nodeId) === to || String(index) === to);
        const targetIndex = model.drafts.findIndex((draft, index) => text(draft?.id ?? draft?.nodeId) === from || String(index) === from);
        const row = make('li', 'iwb-task-plan-edge');
        const source = make('span');
        source.textContent = sourceIndex >= 0 ? draftName(model.drafts[sourceIndex], sourceIndex) : to || '—';
        const arrow = make('span', 'iwb-task-plan-arrow');
        arrow.textContent = '→';
        arrow.setAttribute('aria-hidden', 'true');
        const target = make('span');
        target.textContent = targetIndex >= 0 ? draftName(model.drafts[targetIndex], targetIndex) : from || '—';
        row.append(source, arrow, target);
        list.appendChild(row);
      }
      container.appendChild(list);
      return container;
    }

    function draftIdAt(index) {
      return text(model.drafts[index]?.id ?? model.drafts[index]?.nodeId) || String(index);
    }

    function setPlanDraftSelected(index, selected) {
      if (selected) {
        const visit = (current) => {
          if (model.selectedDrafts.has(current)) return;
          model.selectedDrafts.add(current);
          const dependencies = dependenciesOf(model.drafts[current]);
          model.drafts.forEach((draft, candidate) => {
            if (dependencies.includes(draftIdAt(candidate))) visit(candidate);
          });
        };
        visit(index);
      } else {
        const removed = new Set([index]);
        let changed = true;
        while (changed) {
          changed = false;
          const removedIds = new Set([...removed].map(draftIdAt));
          for (const candidate of model.selectedDrafts) {
            if (removed.has(candidate)) continue;
            if (dependenciesOf(model.drafts[candidate]).some((id) => removedIds.has(id))) {
              removed.add(candidate);
              changed = true;
            }
          }
        }
        for (const candidate of removed) model.selectedDrafts.delete(candidate);
      }
      renderPlan();
      dialog.body.querySelectorAll('.iwb-task-plan-node input')[index]?.focus({ preventScroll: true });
    }

    function renderPlan() {
      dialog.body.replaceChildren();
      const intro = make('p', 'iwb-task-dialog-intro');
      intro.textContent = copy('planReview') + ' · ' + copy('selected', { n: model.selectedDrafts.size });
      dialog.body.appendChild(intro);
      if (!model.drafts.length) {
        dialog.body.appendChild(stateBlock('empty', copy('planEmpty'), copy('planEmptyBody')));
      } else {
        const list = make('div', 'iwb-task-plan-nodes');
        model.drafts.forEach((draft, index) => {
          const card = make('article', 'iwb-task-plan-node');
          const select = make('label', 'iwb-task-plan-select');
          const checkbox = make('input');
          checkbox.type = 'checkbox';
          checkbox.checked = model.selectedDrafts.has(index);
          checkbox.setAttribute('aria-label', draftName(draft, index));
          checkbox.addEventListener('change', () => {
            setPlanDraftSelected(index, checkbox.checked);
          });
          const number = make('span', 'iwb-task-plan-number');
          number.textContent = String(index + 1).padStart(2, '0');
          const head = make('div', 'iwb-task-plan-node-head');
          const title = make('h3', 'iwb-task-plan-node-title');
          title.textContent = draftName(draft, index);
          const kindValue = token(draft?.kind ?? draft?.type);
          const kindKey = kindValue === 'session' ? 'sessionNode' : kindValue === 'note' ? 'noteNode' : 'taskNode';
          const kind = make('span', 'iwb-task-plan-kind is-' + kindValue);
          kind.textContent = copy(kindKey);
          head.append(title, kind);
          const summary = make('p', 'iwb-task-plan-node-summary');
          summary.textContent = text(draft?.goal ?? draft?.summary ?? draft?.prompt ?? draft?.note ?? draft?.description) || copy('noSummary');
          const dependencies = dependenciesOf(draft);
          const dependency = make('div', 'iwb-task-plan-dependency');
          dependency.textContent = dependencies.length ? copy('dependencies', { name: dependencies.join(', ') }) : copy('noDependencies');
          select.append(checkbox, number);
          card.append(select, head, summary, dependency);
          list.appendChild(card);
        });
        dialog.body.append(list, renderEdges());
      }
      const startLabel = make('label', 'iwb-task-check iwb-task-plan-start');
      const start = make('input');
      start.type = 'checkbox';
      start.checked = model.start;
      const startText = make('span');
      startText.textContent = copy('startAfter');
      startLabel.append(start, startText);
      start.addEventListener('change', () => { model.start = start.checked; });
      dialog.body.appendChild(startLabel);
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy('editRequirement'), { async: false }, () => renderForm());
      dialogFooterButton(dialog, copy('cancel'), { async: false }, () => dialog.close());
      const create = dialogFooterButton(dialog, copy('materialize', { n: model.selectedDrafts.size }), { className: 'primary', busyKey: 'plan:materialize' }, () => { void materialize(); });
      if (!model.selectedDrafts.size) create.dataset.staticDisabled = 'true';
      syncBusy();
    }

    function selectedPlan() {
      const chosen = model.drafts
        .map((draft, index) => ({ draft, index }))
        .filter(({ index }) => model.selectedDrafts.has(index));
      const selected = chosen.map(({ draft }) => draft);
      if (Array.isArray(model.plan)) return selected;
      if (!model.plan || !model.draftKey) return model.plan;
      const result = { ...model.plan, [model.draftKey]: selected };
      if (model.draftKey === 'nodes') {
        const ids = new Set(chosen.map(({ index }) => draftIdAt(index)));
        result.nodes = chosen.map(({ draft }) => ({
          ...draft,
          dependsOn: dependenciesOf(draft).filter((id) => ids.has(id)),
        }));
        if (Array.isArray(model.plan.edges)) {
          result.edges = model.plan.edges.filter((edge) => {
            const from = endpointId(edge?.from ?? edge?.source ?? edge?.sourceId ?? edge?.fromNodeId);
            const to = endpointId(edge?.to ?? edge?.target ?? edge?.targetId ?? edge?.toNodeId);
            return ids.has(from) && ids.has(to);
          });
        }
      }
      return result;
    }

    async function generate() {
      if (!model.requirement.trim()) {
        dialog.setError(copy('requirementRequired'));
        return;
      }
      dialog.body.replaceChildren(stateBlock('loading', copy('planning')));
      dialog.footer.replaceChildren();
      const outcome = await runBusy('plan:generate', () => requireAction('plan')({
        requirement: model.requirement.trim(),
        workspaceId: model.workspaceId.trim() || undefined,
        useAI: model.useAI,
        model: model.modelId ? model.models.find((item) => item.id === model.modelId) : undefined,
      }), { dialog, refresh: false });
      if (!dialog.isOpen()) return;
      if (!outcome.ok) {
        renderForm();
        dialog.setError(errorText(outcome.error) || copy('planError'));
        return;
      }
      model.plan = outcome.value;
      const parts = planParts(model.plan);
      model.drafts = parts.items;
      model.draftKey = parts.key;
      model.selectedDrafts = new Set(model.drafts.map((draft, index) => index));
      renderPlan();
    }

    async function materialize() {
      if (!model.selectedDrafts.size && model.drafts.length) {
        dialog.setError(copy('noDraftSelection'));
        return;
      }
      const plan = selectedPlan();
      const outcome = await runBusy('plan:materialize', () => requireAction('materializePlan')(plan, { start: model.start }), { dialog, refresh: true });
      if (outcome.ok && dialog.isOpen()) {
        notify(copy('materialized'));
        dialog.close(true);
      }
    }

    renderForm();
    void requireAction('listModels')().then((value) => {
      model.models = value?.models || [];
      model.defaultModel = value?.defaultModel || null;
      renderForm();
    }).catch((error) => {
      notify(errorText(error) || copy('actionFailed'));
    });
  }

  function openDeleteDialog(task, trigger) {
    const dialog = openDialog(copy('deleteTitle'), trigger, 'confirm');
    const message = make('p', 'iwb-task-confirm-message');
    message.textContent = copy('deleteBody', { name: task.title });
    dialog.body.appendChild(message);
    dialogFooterButton(dialog, copy('cancel'), { async: false }, () => dialog.close());
    dialogFooterButton(dialog, copy('confirmDelete'), { className: 'iwb-task-danger', busyKey: 'task:' + task.id + ':deleteTask' }, async () => {
      const outcome = await runTaskAction(task, 'deleteTask', [], dialog);
      if (outcome.ok && dialog.isOpen()) {
        if (state.selectedId === task.id) state.selectedId = null;
        notify(copy('deleted'));
        dialog.close(true);
      }
    });
  }

  filterSelect.addEventListener('change', () => {
    state.filter = filterSelect.value;
    render();
  });
  sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    render();
  });
  refreshButton.addEventListener('click', () => { void refresh(); });
  alertClose.addEventListener('click', () => {
    state.error = '';
    renderAlert();
    refreshButton.focus();
  });
  scanButton.addEventListener('click', () => openScanDialog(scanButton));
  planButton.addEventListener('click', () => openPlanDialog(planButton));
  listNode.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const buttons = [...listNode.querySelectorAll('.iwb-task-list-select')];
    if (!buttons.length) return;
    const current = buttons.indexOf(doc.activeElement);
    let next = current;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else if (event.key === 'ArrowDown') next = Math.min(buttons.length - 1, Math.max(0, current + 1));
    else next = Math.max(0, current < 0 ? 0 : current - 1);
    event.preventDefault();
    buttons[next]?.focus();
    buttons[next]?.click();
  });
  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || dialogs.size) return;
    if (state.error) {
      state.error = '';
      renderAlert();
      event.preventDefault();
      return;
    }
    const selected = [...listNode.querySelectorAll('.iwb-task-list-select')].find((node) => node.dataset.focusKey === 'list:' + state.selectedId);
    if (selected && doc.activeElement !== selected) {
      selected.focus();
      event.preventDefault();
    }
  });

  host?.appendChild(root);
  refresh();

  return {
    root,
    refresh,
    dispose() {
      if (disposed) return;
      disposed = true;
      refreshVersion += 1;
      for (const dialog of [...dialogs]) dialog.close(true);
      root.remove();
    },
  };
}
