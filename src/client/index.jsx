import React, { useEffect, useRef } from 'react';
import styles from './styles.css';
import { createBoard } from './board';
import { createSessionsAdapter } from './sessions';
import { createApprovalHub } from './approvals';

export const PANEL_ID = 'inspiration-workbench';
const LOCALE_NS = 'inspiration-workbench';
const ROW_ACTION_ID = 'inspiration-workbench-add';

const zh = {
  'panel.label': '灵感工作台',
  title: '灵感工作台',
  new: '新建会话卡',
  arrange: '排列',
  'attach.file': '附件',
  canvas: '画布',
  'canvas.title': '画布',
  'canvas.active': '当前画布：{name}',
  'canvas.current': '当前：{name}',
  'canvas.unsaved': '当前画布还没保存',
  'canvas.placeholder': '给这张画布起个名字',
  'canvas.save': '保存',
  'canvas.overwrite': '覆盖「{name}」',
  'canvas.meta': '{n} 张卡 · {time}',
  'canvas.none': '还没有保存过画布',
  'canvas.saved': '已保存画布「{name}」',
  'canvas.updated': '已更新画布「{name}」',
  'canvas.switched': '已切换到「{name}」',
  'canvas.deleted': '已删除画布「{name}」',
  'canvas.delete': '删除这张画布',
  'canvas.nameRequired': '先给画布起个名字',
  'canvas.broken': '这张画布读不出来',
  'card.more': '更多操作',
  'card.unpin': '取消固定',
  boardMode: '看板',
  'board.title': '看板分组',
  'board.byStatus': '按状态分栏',
  'board.byWorkspace': '按工作区分栏',
  'board.byActivity': '按最近活动分栏',
  'board.exit': '退出看板（恢复原位）',
  'board.applied': '已切换：{name}',
  'board.state.running': '进行中',
  'board.state.waiting': '等你处理',
  'board.state.unread': '有新结果',
  'board.state.idle': '空闲',
  'board.activity.fresh': '刚刚活动',
  'board.activity.hour': '1 小时内',
  'board.activity.stale': '更早',
  fit: '适应',
  'hint.pan': '拖动空白处平移',
  'hint.zoom': '缩放',
  'hint.zoomKey': '滚轮',
  'count.cards': '{n} 张卡',
  'count.running': '{n} 个运行中',
  'empty.title': '还没有卡片',
  'empty.sub': '在左侧会话列表里把鼠标放到一条会话上，点「＋」就能把它摊到这块画布上。',
  'empty.card': '这个会话还没有内容',
  'empty.loading': '正在打开会话…',
  untitled: '未命名会话',
  loadOlder: '加载更早',
  'attach.button': '添加图片或文件',
  'attach.remove': '移除附件',
  'attach.image': '图片',
  'attach.file': '文件',
  'attach.uploading': '附件还在上传，请稍候',
  'attach.failed': '附件添加失败',
  'attach.failedShort': '上传失败',
  'attach.unsupported': '当前版本不支持附件',
  'composer.steerHint': 'Enter 排队；Cmd/Ctrl+Enter 插话发送',
  'queue.steer': '插话发送',
  'queue.steerUnavailable': '仅运行中可插话发送',
  'queue.steerFailed': '插话发送失败，请重试。',
  'queue.count': '{n} 条排队消息',
  'queue.remove': '删除排队消息',
  'queue.removeFailed': '删除失败：这条消息可能已经开始发送。',
  'queue.attachment': '[附件]',
  'status.waitingApproval': '等待审批',
  'status.waitingAnswer': '等待回答',
  'status.queued': '排队 {n}',
  'state.running': '进行中',
  'state.idle': '空闲',
  stacked: '叠 {n}',
  detach: '从这一摞里抽出来',
  openNative: '在原生会话中打开',
  remove: '从工作台移除',
  'toast.stacked': '已叠成一摞 · 点哪张翻到哪张',
  'composer.idle': '继续对话…  ⏎ 发送',
  'composer.busy': '运行中… 可排队或停止',
  'composer.label': '给这张会话卡发消息',
  send: '发送',
  stop: '停止',
  'tool.running': '执行中',
  'tool.done': '完成',
  'tool.error': '失败',
  'error.open': '这个会话没能打开，可能已被归档。',
  'error.read': '读取会话时出错。',
  'error.send': '发送失败',
  'error.stop': '停止失败',
  'error.new': '新建会话失败',
  'row.add': '在工作台里打开',
  'tool.toggle': '展开/收起详情',
  'tool.args': '参数',
  'tool.output': '结果',
  'tool.errorOutput': '错误',
  'tool.waiting': '等待输出…',
  'tool.noOutput': '没有输出',
  'model.switch': '切换模型',
  'model.switchTitle': '选择模型',
  'model.loading': '读取模型目录…',
  'model.error': '模型切换失败',
  'model.empty': '没有可用模型',
  'model.switched': '已切换到 {name}',
  'board.collapseAll': '收起过程',
  'board.expandAll': '展开过程',
  'board.collapsedAll': '已收起所有过程行',
  'board.expandedAll': '已展开所有过程行',
  'todo.approval': '待审批 {n}',
  'todo.question': '待回答 {n}',
  'todo.queued': '排队 {n}',
  'todo.title': '点击定位到下一个需要你处理的卡片',
  'transcript.truncated': '更早的内容未加载（本卡保留最近 {n} 条）',
  'transcript.user': '我',
  'attach.retry': '重试',
  'pipe.linked': '流水线已指向「{name}」',
  'pipe.modeSendHint': '当前：完成后自动发送',
  'pipe.modeDraftHint': '当前：只填入草稿',
  'pipe.already': '已经连过「{name}」了',
  'pipe.multi': '→ {n} 个下游',
  'pipe.noted': '结果已追加到便签「{name}」',
  'pipe.noteTarget': '流水线 → 便签',
  'pipe.noteHint': '下游是便签：跑完把结果追加进去，不发送',
  'pipe.removeNote': '删除这条便签流水线',
  'pipe.port': '拖这条线到另一张卡，建立流水线',
  'pipe.created': '流水线已连到「{name}」',
  'pipe.needTarget': '拖到另一张卡（会话卡或便签）上才算连线',
  'pipe.remove': '删除这条流水线',
  'pipe.removed': '流水线已删除',
  'pipe.sendHint': '完成后自动把结果发过去',
  'pipe.draftHint': '只填进下游输入框，等人确认',
  'pipe.modeSend': '已切到：自动发送',
  'pipe.modeDraft': '已切到：只填草稿',
  'pipe.title': '流水线：完成后把结果送到下游卡',
  'pipe.to': '下游卡片',
  'pipe.send': '自动发送到下游',
  'pipe.draft': '只填入下游草稿',
  'pipe.off': '关闭流水线',
  'pipe.active': '→ {name}',
  'pipe.sent': '流水线：已发送到「{name}」',
  'pipe.drafted': '流水线：已填入「{name}」草稿',
  'pipe.none': '没有可以接的下游会话卡',
  'pipe.tooLong': '流水线链条过长，已停止',
  'pipe.failed': '流水线投递失败：{error}',
  'ref.title': '引用到另一张卡',
  'ref.to': '引用到…',
  'ref.inserted': '已插入到目标卡输入框',
  'ref.none': '没有其它卡片可以引用',
  'ref.noTarget': '这张卡的输入框当前不可用',
  'batch.title': '批量操作',
  'batch.selected': '已选 {n} 张',
  'batch.stack': '叠成一摞',
  'batch.align': '左对齐',
  'batch.distribute': '横向铺开',
  'batch.close': '关闭所选',
  'batch.clear': '取消选择',
  'batch.stacked': '已叠 {n} 张',
  'batch.aligned': '已对齐',
  'batch.distributed': '已铺开',
  'batch.closed': '已关闭 {n} 张',
  'arrange.title': '排列方式',
  'arrange.grid': '网格排列',
  'arrange.workspace': '按工作区排列',
  'arrange.activity': '按最近活动排列',
  'arrange.done': '已重新排列',
  'workspace.none': '无工作区',
  'a11y.canvas': '灵感工作台画布：方向键切换卡片，回车进入输入框',
  'a11y.body': '会话正文',
  'a11y.focused': '已聚焦：{name}',
  'shortcuts.title': '键盘快捷键',
  'shortcuts.move': '方向键：切换卡片 · Shift+方向键：移动卡片',
  'shortcuts.act': '回车进入输入框 · O 打开原生 · C 复制 · P 固定',
  'shortcuts.find': '/ 搜索 · T 轮次大纲 · [ ] 上一张 / 下一张',
  'shortcuts.leave': 'Esc 回到画布',
  'card.search': '在卡片内搜索',
  'card.outline': '轮次大纲',
  'search.placeholder': '在卡片内搜索…  ⏎ 下一个',
  'search.count': '{i}/{n}',
  'search.none': '无匹配',
  'outline.empty': '还没有已完成的轮次',
  'outline.turn': '第 {n} 轮',
  'outline.running': '进行中',
  'outline.notLoaded': '这一轮已不在当前加载范围内',
  'card.pin': '固定位置',
  'card.pinned': '已固定，排列时不会移动',
  'card.unpinned': '已取消固定',
  'card.copy': '复制为 Markdown',
  'card.copied': '已复制为 Markdown',
  'card.copyEmpty': '这张卡还没有内容',
  'card.copyFailed': '复制失败',
  'card.approvalCancelled': '卡片已移除，未处理的审批已取消',
  'note.add': '便签',
  'note.added': '已添加便签卡',
  'note.title': '便签',
  'note.placeholder': '随手记点什么…',
  'settings.chainWheel': '滚到卡片两端时带动画布',
  'settings.size.compact': '紧凑',
  'settings.size.normal': '标准',
  'settings.size.wide': '宽',
  'settings.export': '导出布局',
  'settings.import': '导入布局',
  'settings.reset': '重置',
  'settings.exported': '布局已导出',
  'settings.imported': '布局已导入',
  'settings.resetDone': '工作台已重置',
  'settings.exportFailed': '导出失败',
  'settings.importFailed': '导入失败',
  'settings.importInvalid': '这不是有效的布局文件',
  'sync.restored': '已从 Host 恢复布局',
  'sync.applied': '布局已在其它窗口更新，已同步',
  'unsupported.title': '这个版本暂时用不了灵感工作台',
  'unsupported.body': '当前 DSH 缺少插件依赖的会话服务。请升级到 0.2.1-rc.5 或更高版本。',
  'failure.taskStopped': '任务已停止',
  'failure.stopped': '已停止',
  'failure.turnError': '本轮运行失败',
  'failure.maxTokens': '已达到输出 token 上限',
  'failure.interrupted': 'DSH 进程在本轮完成前退出（例如被强制结束、崩溃或关闭超时），重新启动后本轮已中止。未完成的工具调用结果未知。',
  'model.effortTitle': '思考强度 · {name}',
  'model.effortRow': '思考强度',
  'model.effortCurrent': '当前 · {name}',
  'model.effortCount': '{n} 档强度',
  'model.effortDefault': '默认强度',
  'model.back': '返回模型',
  'question.title': '需要你确认',
  'answer.submit': '提交',
  'answer.custom': '或输入自定义答案',
  'answer.openNative': '去原生会话回答',
  'answer.submitted': '已提交回答',
  'answer.failed': '提交回答失败',
  'workspace.pick': '选择工作区',
  'workspace.untitled': '未命名工作区',
  'workspace.label': '工作区：',
  settings: '设置',
  'settings.inlineApprovals': '在卡片内处理审批（实验）',
  'settings.inlineApprovalsHint': '只在原生对话面板没打开时接管；其它情况一律交给原生处理。',
  'settings.approvalsOn': '已开启卡片内审批',
  'approval.escalation': '工具 {name} 请求越权执行',
  'approval.requested': '有操作在等待你的审批',
  'approval.platformLimit': '这一版的插件拿不到审批请求：审批只在原生会话页处理。建议把访问模式切到「工作区内修改」，让沙箱直接拒绝而不是等人审批。',
  'approval.reject': '拒绝',
  'approval.allowOnce': '允许一次',
  'approval.waiting': '等待审批',
  'approval.tool': '工具：{name}',
  'approval.unknown': '有操作在等待你的授权',
  'approval.openNative': '去原生会话处理',
  'code.copy': '复制',
  'code.copied': '已复制',
  'turn.meta': '本轮概况',
  'turn.toolCalls': '{n} 次工具调用',
  'turn.messages': '{n} 条消息',
  'turn.noMeta': '没有更多信息',
  'turn.worked': '已完成',
  'turn.failed': '处理失败',
  'turn.used': '用时 ',
  'turn.done': '已完成',
  'duration.seconds': '{n}秒',
  'duration.minutes': '{m}分',
  'duration.minutesSeconds': '{m}分{s}秒',
  'duration.hoursMinutes': '{h}小时{m}分',
  'step.joinTwo': '{first}并{second}',
  'step.sharedPrefix': '已',
  'step.more': '{title}等',
  'step.thinking': '已完成分析',
  'stepRunning.thinking': '正在分析请求',
  'step.joinMany': '，',
  'step.tools': '已调用工具',
  'step.read': '已读取文件',
  'step.readImage': '已读取图片',
  'step.write': '已写入文件',
  'step.search': '已搜索代码',
  'step.edit': '修改了文件',
  'step.commands': '执行了命令',
  'step.code': '运行了代码',
  'step.webSearch': '已搜索网页',
  'step.webFetch': '已访问网页',
  'step.subagents': '已协调子智能体',
  'step.plan': '更新了计划',
  'step.questions': '向用户提出了问题',
  'stepRunning.tools': '正在调用工具',
  'stepRunning.read': '正在读取文件',
  'stepRunning.readImage': '正在读取图片',
  'stepRunning.write': '正在写入文件',
  'stepRunning.search': '正在搜索代码',
  'stepRunning.edit': '正在编辑文件',
  'stepRunning.commands': '正在运行命令',
  'stepRunning.code': '正在运行代码',
  'stepRunning.webSearch': '正在搜索网页',
  'stepRunning.webFetch': '正在访问网页',
  'stepRunning.subagents': '正在协调子智能体',
  'stepRunning.plan': '正在更新计划',
  'stepRunning.questions': '等待你的操作',
};

const en = {
  'panel.label': 'Inspiration workbench',
  title: 'Inspiration workbench',
  new: 'New conversation card',
  arrange: 'Arrange',
  'attach.file': 'Attachment',
  canvas: 'Canvas',
  'canvas.title': 'Canvas',
  'canvas.active': 'Current canvas: {name}',
  'canvas.current': 'Current: {name}',
  'canvas.unsaved': 'This canvas is not saved yet',
  'canvas.placeholder': 'Name this canvas',
  'canvas.save': 'Save',
  'canvas.overwrite': 'Overwrite “{name}”',
  'canvas.meta': '{n} cards · {time}',
  'canvas.none': 'No saved canvases yet',
  'canvas.saved': 'Saved canvas “{name}”',
  'canvas.updated': 'Updated canvas “{name}”',
  'canvas.switched': 'Switched to “{name}”',
  'canvas.deleted': 'Deleted canvas “{name}”',
  'canvas.delete': 'Delete this canvas',
  'canvas.nameRequired': 'Give the canvas a name first',
  'canvas.broken': 'That canvas could not be read',
  'card.more': 'More actions',
  'card.unpin': 'Unpin',
  boardMode: 'Board',
  'board.title': 'Group into columns',
  'board.byStatus': 'By status',
  'board.byWorkspace': 'By workspace',
  'board.byActivity': 'By recent activity',
  'board.exit': 'Exit board (restore positions)',
  'board.applied': 'Switched: {name}',
  'board.state.running': 'Running',
  'board.state.waiting': 'Needs you',
  'board.state.unread': 'New result',
  'board.state.idle': 'Idle',
  'board.activity.fresh': 'Just now',
  'board.activity.hour': 'Within an hour',
  'board.activity.stale': 'Older',
  fit: 'Fit',
  'hint.pan': 'Drag empty space to pan',
  'hint.zoom': 'zoom',
  'hint.zoomKey': 'wheel',
  'count.cards': '{n} cards',
  'count.running': '{n} running',
  'empty.title': 'No cards yet',
  'empty.sub': 'Hover a conversation in the sidebar list and press “+” to drop it onto this canvas.',
  'empty.card': 'This conversation has no content yet',
  'empty.loading': 'Opening conversation…',
  untitled: 'Untitled conversation',
  loadOlder: 'Load older',
  'attach.button': 'Add image or file',
  'attach.remove': 'Remove attachment',
  'attach.image': 'Image',
  'attach.file': 'File',
  'attach.uploading': 'Attachments are still uploading',
  'attach.failed': 'Could not add the attachment',
  'attach.failedShort': 'Upload failed',
  'attach.unsupported': 'Attachments are not supported on this build',
  'composer.steerHint': 'Enter queues; Cmd/Ctrl+Enter steers',
  'queue.steer': 'Steer',
  'queue.steerUnavailable': 'Steering needs a running turn',
  'queue.steerFailed': 'Could not steer; please retry.',
  'queue.count': '{n} queued message(s)',
  'queue.remove': 'Remove queued message',
  'queue.removeFailed': 'Could not remove: this message may already be sending.',
  'queue.attachment': '[attachment]',
  'status.waitingApproval': 'Waiting for approval',
  'status.waitingAnswer': 'Waiting for answer',
  'status.queued': '{n} queued',
  'state.running': 'Running',
  'state.idle': 'Idle',
  stacked: 'stack {n}',
  detach: 'Pull out of this stack',
  openNative: 'Open in the native conversation',
  remove: 'Remove from workbench',
  'toast.stacked': 'Stacked · click any card to bring it to the top',
  'composer.idle': 'Continue…  ⏎ to send',
  'composer.busy': 'Running… queue or stop',
  'composer.label': 'Message this conversation card',
  send: 'Send',
  stop: 'Stop',
  'tool.running': 'running',
  'tool.done': 'done',
  'tool.error': 'failed',
  'error.open': 'This conversation could not be opened; it may be archived.',
  'error.read': 'Reading this conversation failed.',
  'error.send': 'Send failed',
  'error.stop': 'Stop failed',
  'error.new': 'Could not create a conversation',
  'row.add': 'Open in the inspiration workbench',
  'tool.toggle': 'Expand or collapse details',
  'tool.args': 'Arguments',
  'tool.output': 'Result',
  'tool.errorOutput': 'Error',
  'tool.waiting': 'Waiting for output…',
  'tool.noOutput': 'No output',
  'model.switch': 'Switch model',
  'model.switchTitle': 'Choose a model',
  'model.loading': 'Loading model catalog…',
  'model.error': 'Could not switch the model',
  'model.empty': 'No models available',
  'model.switched': 'Switched to {name}',
  'board.collapseAll': 'Collapse work',
  'board.expandAll': 'Expand work',
  'board.collapsedAll': 'All work details collapsed',
  'board.expandedAll': 'All work details expanded',
  'todo.approval': '{n} awaiting approval',
  'todo.question': '{n} awaiting answer',
  'todo.queued': '{n} queued',
  'todo.title': 'Jump to the next card that needs you',
  'transcript.truncated': 'Older content is not loaded (this card keeps the latest {n} entries)',
  'transcript.user': 'Me',
  'attach.retry': 'Retry',
  'pipe.linked': 'Pipeline points at “{name}”',
  'pipe.modeSendHint': 'Currently: auto-send on completion',
  'pipe.modeDraftHint': 'Currently: draft only',
  'pipe.already': '“{name}” is already connected',
  'pipe.multi': '→ {n} downstream',
  'pipe.noted': 'Result appended to note “{name}”',
  'pipe.noteTarget': 'Pipeline → note',
  'pipe.noteHint': 'Note downstream: the result is appended, never sent',
  'pipe.removeNote': 'Remove this note pipeline',
  'pipe.port': 'Drag this line onto another card to wire a pipeline',
  'pipe.created': 'Pipeline wired to “{name}”',
  'pipe.needTarget': 'Drop it on another card (session or note) to connect',
  'pipe.remove': 'Remove this pipeline',
  'pipe.removed': 'Pipeline removed',
  'pipe.sendHint': 'Send the result downstream when the turn finishes',
  'pipe.draftHint': 'Only fill the downstream composer',
  'pipe.modeSend': 'Mode: auto-send',
  'pipe.modeDraft': 'Mode: draft only',
  'pipe.title': 'Pipeline: forward this card\'s result downstream',
  'pipe.to': 'Downstream card',
  'pipe.send': 'Auto-send downstream',
  'pipe.draft': 'Fill downstream draft only',
  'pipe.off': 'Turn pipeline off',
  'pipe.active': '→ {name}',
  'pipe.sent': 'Pipeline: sent to “{name}”',
  'pipe.drafted': 'Pipeline: filled “{name}” draft',
  'pipe.none': 'No downstream session card available',
  'pipe.tooLong': 'Pipeline chain is too long, stopped',
  'pipe.failed': 'Pipeline delivery failed: {error}',
  'ref.title': 'Quote into another card',
  'ref.to': 'Quote into…',
  'ref.inserted': 'Inserted into the target composer',
  'ref.none': 'No other card to quote into',
  'ref.noTarget': 'That card has no usable input right now',
  'batch.title': 'Batch actions',
  'batch.selected': '{n} selected',
  'batch.stack': 'Stack',
  'batch.align': 'Align',
  'batch.distribute': 'Spread',
  'batch.close': 'Close selected',
  'batch.clear': 'Clear selection',
  'batch.stacked': 'Stacked {n} cards',
  'batch.aligned': 'Aligned',
  'batch.distributed': 'Spread out',
  'batch.closed': 'Closed {n} cards',
  'arrange.title': 'Arrange by',
  'arrange.grid': 'Grid',
  'arrange.workspace': 'Workspace',
  'arrange.activity': 'Recent activity',
  'arrange.done': 'Rearranged',
  'workspace.none': 'No workspace',
  'a11y.canvas': 'Workbench canvas: arrow keys move between cards, Enter focuses the composer',
  'a11y.body': 'Conversation transcript',
  'a11y.focused': 'Focused: {name}',
  'shortcuts.title': 'Keyboard shortcuts',
  'shortcuts.move': 'Arrows switch cards · Shift+Arrows move the card',
  'shortcuts.act': 'Enter focuses the composer · O open native · C copy · P pin',
  'shortcuts.find': '/ search · T outline · [ ] previous / next card',
  'shortcuts.leave': 'Esc returns to the canvas',
  'card.search': 'Search this card',
  'card.outline': 'Turn outline',
  'search.placeholder': 'Search in this card…  ⏎ next',
  'search.count': '{i}/{n}',
  'search.none': 'No match',
  'outline.empty': 'No completed turns yet',
  'outline.turn': 'Turn {n}',
  'outline.running': 'Running',
  'outline.notLoaded': 'That turn is outside the loaded range',
  'card.pin': 'Pin position',
  'card.pinned': 'Pinned: arranging will not move it',
  'card.unpinned': 'Unpinned',
  'card.copy': 'Copy as Markdown',
  'card.copied': 'Copied as Markdown',
  'card.copyEmpty': 'This card has no content yet',
  'card.copyFailed': 'Copy failed',
  'card.approvalCancelled': 'Card removed; its pending approval was cancelled',
  'note.add': 'Note',
  'note.added': 'Note card added',
  'note.title': 'Note',
  'note.placeholder': 'Jot something down…',
  'settings.chainWheel': 'Pan the canvas when a card reaches its end',
  'settings.size.compact': 'Compact',
  'settings.size.normal': 'Standard',
  'settings.size.wide': 'Wide',
  'settings.export': 'Export layout',
  'settings.import': 'Import layout',
  'settings.reset': 'Reset',
  'settings.exported': 'Layout exported',
  'settings.imported': 'Layout imported',
  'settings.resetDone': 'Workbench reset',
  'settings.exportFailed': 'Export failed',
  'settings.importFailed': 'Import failed',
  'settings.importInvalid': 'That file is not a layout export',
  'sync.restored': 'Layout restored from the Host',
  'sync.applied': 'Layout updated from another window',
  'unsupported.title': 'The workbench cannot run on this build',
  'unsupported.body': 'This DSH build is missing the session services the plugin needs. Update to 0.2.1-rc.5 or newer.',
  'failure.taskStopped': 'Task stopped',
  'failure.stopped': 'Stopped',
  'failure.turnError': 'This turn failed',
  'failure.maxTokens': 'Output token limit reached',
  'failure.interrupted': 'The DSH process exited before this turn finished (for example, it was killed, crashed, or timed out while shutting down), so the turn was closed when DSH restarted. Unfinished tool calls have unknown outcomes.',
  'model.effortTitle': 'Thinking effort · {name}',
  'model.effortRow': 'Thinking effort',
  'model.effortCurrent': 'Current · {name}',
  'model.effortCount': '{n} levels',
  'model.effortDefault': 'Default effort',
  'model.back': 'Back to models',
  'question.title': 'Waiting for you',
  'answer.submit': 'Submit',
  'answer.custom': 'Or type a custom answer',
  'answer.openNative': 'Answer in the native conversation',
  'answer.submitted': 'Answer submitted',
  'answer.failed': 'Could not submit the answer',
  'workspace.pick': 'Choose a workspace',
  'workspace.untitled': 'Untitled workspace',
  'workspace.label': 'Workspace: ',
  settings: 'Settings',
  'settings.inlineApprovals': 'Handle approvals inside cards (experimental)',
  'settings.inlineApprovalsHint': 'Only takes over while the native conversation is closed; everything else stays with the native UI.',
  'settings.approvalsOn': 'Inline approvals enabled',
  'approval.escalation': 'Tool {name} requests privileged execution',
  'approval.requested': 'An action is waiting for your approval',
  'approval.platformLimit': 'This build does not deliver approval requests to plugins; approvals are handled on the native conversation page only. Prefer the “workspace write” access mode so the sandbox denies instead of waiting for a human.',
  'approval.reject': 'Reject',
  'approval.allowOnce': 'Allow once',
  'approval.waiting': 'Waiting for approval',
  'approval.tool': 'Tool: {name}',
  'approval.unknown': 'An action is waiting for your approval',
  'approval.openNative': 'Handle it in the native conversation',
  'code.copy': 'Copy',
  'code.copied': 'Copied',
  'turn.meta': 'Turn summary',
  'turn.toolCalls': '{n} tool calls',
  'turn.messages': '{n} messages',
  'turn.noMeta': 'No further detail',
  'turn.worked': 'Completed',
  'turn.failed': 'Failed',
  'turn.used': 'in ',
  'turn.done': 'Finished',
  'duration.seconds': '{n}s',
  'duration.minutes': '{m}m',
  'duration.minutesSeconds': '{m}m {s}s',
  'duration.hoursMinutes': '{h}h {m}m',
  'step.joinTwo': '{first} and {second}',
  'step.sharedPrefix': '',
  'step.more': '{title}, etc.',
  'step.thinking': 'Completed analysis',
  'stepRunning.thinking': 'Analyzing the request',
  'step.joinMany': ', ',
  'step.tools': 'Called tools',
  'step.read': 'Read files',
  'step.readImage': 'Read images',
  'step.write': 'Wrote files',
  'step.search': 'Searched code',
  'step.edit': 'Edited files',
  'step.commands': 'Ran commands',
  'step.code': 'Ran code',
  'step.webSearch': 'Searched the web',
  'step.webFetch': 'Fetched pages',
  'step.subagents': 'Coordinated subagents',
  'step.plan': 'Updated the plan',
  'step.questions': 'Asked you a question',
  'stepRunning.tools': 'Calling tools',
  'stepRunning.read': 'Reading files',
  'stepRunning.readImage': 'Reading images',
  'stepRunning.write': 'Writing files',
  'stepRunning.search': 'Searching code',
  'stepRunning.edit': 'Editing files',
  'stepRunning.commands': 'Running commands',
  'stepRunning.code': 'Running code',
  'stepRunning.webSearch': 'Searching the web',
  'stepRunning.webFetch': 'Fetching pages',
  'stepRunning.subagents': 'Coordinating subagents',
  'stepRunning.plan': 'Updating the plan',
  'stepRunning.questions': 'Waiting for you',
};

const runtime = {
  ctx: undefined,
  adapter: undefined,
  translate: undefined,
  board: undefined,
  pending: [],
};

function t(key) {
  if (runtime.translate) {
    const value = runtime.translate(key);
    if (typeof value === 'string' && value && value !== key) return value;
  }
  return zh[key] || key;
}

function svgIcon(size) {
  const edge = typeof size === 'number' ? size : 16;
  return React.createElement(
    'svg',
    { width: edge, height: edge, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' },
    React.createElement('rect', { x: 3, y: 3, width: 8, height: 8, rx: 2 }),
    React.createElement('rect', { x: 13, y: 3, width: 8, height: 8, rx: 2 }),
    React.createElement('rect', { x: 3, y: 13, width: 8, height: 8, rx: 2 }),
    React.createElement('rect', { x: 13, y: 13, width: 8, height: 8, rx: 2 })
  );
}

function PanelIcon(props) {
  return svgIcon(props?.size ?? 16);
}

function queueOrAdd(sessionId, title) {
  if (!sessionId) return;
  if (runtime.board) runtime.board.addSession({ sessionId, title, focus: true });
  else runtime.pending.push({ sessionId, title });
  try {
    runtime.ctx?.get?.('layout')?.selectPanel?.(PANEL_ID);
  } catch {
    /* navigation is a convenience; the card is already queued */
  }
}

function RowAction(props) {
  const label = t('row.add');
  return React.createElement(
    'button',
    {
      type: 'button',
      className: 'iwb-row-action',
      title: label,
      'aria-label': label,
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        queueOrAdd(props?.sessionId, props?.displayTitle);
      },
    },
    React.createElement(
      'svg',
      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'aria-hidden': 'true' },
      React.createElement('path', { d: 'M12 5v14M5 12h14' })
    )
  );
}

function openInNative(sessionId) {
  try {
    runtime.ctx?.get?.('uiWorkspace')?.openSession?.(sessionId);
  } catch {
    /* ignore */
  }
  try {
    runtime.ctx?.get?.('layout')?.selectPanel?.('conversation');
  } catch {
    /* ignore */
  }
}

function UnsupportedPanel() {
  return React.createElement(
    'div',
    { className: 'iwb-unsupported' },
    React.createElement('div', { className: 'iwb-unsupported-title' }, t('unsupported.title')),
    React.createElement('div', { className: 'iwb-unsupported-body' }, runtime.adapterError || t('unsupported.body'))
  );
}

const approvalHub = createApprovalHub();

function WorkbenchPanel() {
  if (!runtime.adapter) return React.createElement(UnsupportedPanel);
  const hostRef = useRef(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const board = createBoard({
      host,
      adapter: runtime.adapter,
      approvals: approvalHub,
      t,
      onOpenSession: openInNative,
    });
    runtime.board = board;
    board.restore();
    while (runtime.pending.length) {
      const item = runtime.pending.shift();
      board.addSession(item);
    }
    return () => {
      if (runtime.board === board) runtime.board = undefined;
      // The panel unmounts while the host swaps pages; never let cleanup throw.
      try {
        board.dispose();
      } catch (error) {
        console.error('[inspiration-workbench] unmount cleanup failed', error);
      }
    };
  }, []);
  return React.createElement('div', { ref: hostRef, style: { height: '100%', minHeight: 0 } });
}

export const inject = ['slots', 'locale', 'sessions', 'layout', 'uiWorkspace', 'remote', 'remote.session', 'remote.userQuestions', 'workspaces', 'conversation'];

export async function apply(ctx) {
  runtime.ctx = ctx;

  let styleNode = document.querySelector('style[data-iwb="1"]');
  if (!styleNode) {
    styleNode = document.createElement('style');
    styleNode.dataset.iwb = '1';
    document.head.appendChild(styleNode);
  }
  styleNode.textContent = styles;

  const locale = ctx.get?.('locale') ?? ctx.locale;
  if (locale?.register) {
    ctx.effect(() => locale.register(LOCALE_NS, { zh, en }), 'inspiration-workbench: locale');
    const translate = locale.bind(LOCALE_NS);
    runtime.translate = (key) => translate(key);
  }

  try {
    runtime.adapter = createSessionsAdapter(ctx);
  } catch (error) {
    runtime.adapter = undefined;
    runtime.adapterError = error instanceof Error ? error.message : String(error);
  }

  ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: PANEL_ID }, WorkbenchPanel)), 'inspiration-workbench: panel');

  ctx.effect(
    () =>
      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          { name: 'sidebar.panellist', id: PANEL_ID, order: 30, label: () => runtime.translate?.('panel.label') ?? '灵感工作台' },
          PanelIcon
        )
      ),
    'inspiration-workbench: panel list'
  );

  ctx.effect(
    () =>
      ctx.slots.inject('sidebar.workspaces.session.row.action', () =>
        ctx.slots.register({ name: 'sidebar.workspaces.session.row.action', id: ROW_ACTION_ID, order: 50 }, RowAction)
      ),
    'inspiration-workbench: session row action'
  );

  // Inline approvals are registered per session on the session's own scope by
  // the board (see adapter.listenApprovals): the forwarded waterfall only
  // reaches listeners whose context owns the session.

  ctx.effect(
    () => () => {
      approvalHub.setEnabled(false);
      runtime.adapter?.dispose?.();
      runtime.adapter = undefined;
      runtime.ctx = undefined;
      styleNode?.remove();
    },
    'inspiration-workbench: teardown'
  );
}
