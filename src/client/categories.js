import { icon } from './icons';

const STEP_ICONS = {
  thinking: icon('think', 14),
  read: icon('eye', 14),
  readImage: icon('eye', 14),
  webFetch: icon('eye', 14),
  search: icon('search', 14),
  edit: icon('pencil', 14),
  write: icon('pencil', 14),
  commands: icon('terminal', 14),
  code: icon('braces', 14),
  webSearch: icon('globe', 14),
  subagents: icon('users', 14),
  plan: icon('list', 14),
  questions: icon('help', 14),
  tools: icon('sparkle', 14),
};

const TOOL_CATEGORY = {
  bash: 'commands', pwsh: 'commands', shell: 'commands', terminal: 'commands', run_command: 'commands', execute: 'commands',
  run_code: 'code', ptc: 'code', execute_code: 'code',
  read: 'read', read_file: 'read', view: 'read',
  read_image: 'readImage', readImage: 'readImage',
  write: 'write', write_file: 'write', create: 'write',
  edit: 'edit', apply_patch: 'edit', multi_edit: 'edit', replace: 'edit',
  grep: 'search', glob: 'search', search: 'search', find: 'search',
  web_search: 'webSearch', webSearch: 'webSearch',
  web_fetch: 'webFetch', webFetch: 'webFetch',
  task: 'subagents', subagent: 'subagents', spawn_teammate: 'subagents',
  todo_write: 'plan', plan: 'plan',
  ask_user_question: 'questions',
};

/**
 * Native `processTitle`: rank the step's activity kinds, localize the top three
 * and join them exactly like the shipped chat (shared "已" prefix trimmed, "等"
 * appended past three kinds).
 */
function stepActivity(calls) {
  const kinds = [];
  for (const call of calls) {
    const kind = TOOL_CATEGORY[call.name] || 'tools';
    if (!kinds.includes(kind)) kinds.push(kind);
  }
  return kinds;
}

export { TOOL_CATEGORY, STEP_ICONS, stepActivity };
