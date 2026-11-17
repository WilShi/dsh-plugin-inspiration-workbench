#!/usr/bin/env node
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const url = process.argv[2] || process.env.IWB_URL;
if (!url) throw new Error('usage: node scripts/verify-task-mode.mjs "http://127.0.0.1:<port>/?token=<token>"');
const { chromium } = await import('playwright');
function findChromium() {
  for (const root of [join(homedir(), 'Library', 'Caches', 'ms-playwright'), join(homedir(), '.cache', 'ms-playwright')]) {
    if (!existsSync(root)) continue;
    const builds = readdirSync(root).filter((name) => /^chromium-\d+$/.test(name)).sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
    for (const build of builds) {
      for (const candidate of [
        join(root, build, 'chrome-mac-arm64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
        join(root, build, 'chrome-mac', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
        join(root, build, 'chrome-linux', 'chrome'),
        join(root, build, 'chrome-linux64', 'chrome'),
      ]) if (existsSync(candidate)) return candidate;
    }
  }
}
const outDir = join('var', 'task-mode');
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: findChromium(), headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const results = [];
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
page.on('console', (message) => {
  if (message.type() === 'error' && !/net::ERR_|Failed to load resource/.test(message.text())) errors.push(message.text());
});
function record(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  ' + detail : ''));
}
async function shot(name) {
  await page.screenshot({ path: join(outDir, name + '.png'), fullPage: true });
}
async function clickText(selector, text) {
  const node = page.locator(selector).filter({ hasText: text }).first();
  await node.click({ timeout: 12000 });
}
async function dismissOnboarding() {
  const onboarding = page.getByRole('button', { name: '稍后配置' });
  if (await onboarding.count()) {
    await onboarding.first().click().catch(() => {});
    await page.waitForTimeout(500);
  }
}

async function main() {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2200);
  await dismissOnboarding();
  await clickText('button', '灵感工作台');
  await page.waitForTimeout(1400);

  // The scenario runs only inside its dedicated DSH_HOME. Reset both browser
  // and Host state so a previous run cannot leak tasks, drafts or canvases.
  await page.evaluate(async () => {
    localStorage.clear();
    const json = (value) => JSON.stringify(value);
    await fetch('/api/inspiration-workbench/layout', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: json({ layout: { version: 1, cards: [] } }) });
    await fetch('/api/inspiration-workbench/canvases', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: json({ canvases: [], activeCanvas: null }) });
    await fetch('/api/inspiration-workbench/tasks', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: json({ tasks: [], flowEvents: [] }) });
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await dismissOnboarding();
  if (!(await page.locator('.iwb-root').count())) await clickText('button', '灵感工作台');
  await page.waitForTimeout(600);

  record('dual mode tabs render', await page.locator('.iwb-mode-tab').count() === 2);
  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(500);
  record('task mode replaces canvas', await page.locator('.iwb-task-view').isVisible() && !(await page.locator('.iwb-canvas').isVisible()));
  record('task empty state explains both entry points', (await page.locator('.iwb-task-view').innerText()).includes('整理现有会话') && (await page.locator('.iwb-task-view').innerText()).includes('需求'));
  await shot('01-task-empty');

  await clickText('.iwb-task-toolbar .iwb-btn', '规划需求');
  await page.waitForSelector('.iwb-task-dialog-plan', { timeout: 12000 });
  const workspaceSelect = page.locator('.iwb-task-workspace-select');
  record('workspace picker uses a native select', await workspaceSelect.evaluate((node) => node.tagName === 'SELECT'));
  if (await workspaceSelect.isDisabled()) {
    await clickText('.iwb-task-workspace-create', '新建工作区');
    await page.locator('.iwb-task-workspace-path').fill('/Users/wilson/Documents/Code');
    await clickText('.iwb-task-workspace-confirm', '创建并选中');
    await page.waitForFunction(() => !document.querySelector('.iwb-task-workspace-select').disabled, null, { timeout: 10000 });
  }
  record('workspace picker has an explicit default', (await workspaceSelect.inputValue()).length > 0, await workspaceSelect.inputValue());
  const ai = page.locator('.iwb-task-plan-form .iwb-task-check input').first();
  if (await ai.isChecked()) await ai.uncheck();
  await page.locator('.iwb-task-textarea').fill('实现任务画布并验证保存恢复');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '生成拓扑草案');
  await page.waitForSelector('.iwb-task-plan-node', { timeout: 15000 });
  record('fallback topology previews nodes', await page.locator('.iwb-task-plan-node').count() === 2);
  const start = page.locator('.iwb-task-plan-start input');
  if (await start.isChecked()) await start.uncheck();
  await shot('02-plan-preview');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '创建');
  await page.waitForTimeout(2200);
  record('materialize returns to live canvas', await page.locator('.iwb-canvas').isVisible());
  record('topology creates session and note cards', await page.locator('.iwb-card').count() === 2);
  record('session starts as draft not execution', (await page.locator('.iwb-foot textarea').first().inputValue()).includes('实现任务画布'));
  const assignedWorkspace = await page.evaluate(async () => {
    const response = await fetch('/api/inspiration-workbench/layout');
    const body = await response.json();
    return (body.layout?.cards || []).some((card) => card.sessionId && card.workspace);
  });
  record('created session belongs to selected workspace', assignedWorkspace);
  record('edge reports waiting state', await page.locator('.iwb-link[data-flow-status="waiting"]').count() === 1);
  const visibleCards = await page.locator('.iwb-card').evaluateAll((cards) => cards.every((card) => {
    const rect = card.getBoundingClientRect();
    return rect.left >= 0 && rect.top >= 0 && rect.right <= window.innerWidth && rect.bottom <= window.innerHeight;
  }));
  record('generated cards fit inside viewport', visibleCards);
  await shot('03-topology-canvas');

  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(600);
  record('task appears in intelligent task center', (await page.locator('.iwb-task-list').innerText()).includes('实现任务画布'));
  await page.locator('.iwb-task-list-select').first().click();
  await page.waitForTimeout(300);
  record('task detail shows actions and acceptance', (await page.locator('.iwb-task-detail').innerText()).includes('进入现场') && (await page.locator('.iwb-task-detail').innerText()).includes('验收'));
  await shot('04-task-detail');

  await clickText('.iwb-task-detail-actions .iwb-btn', '进入现场');
  await page.waitForTimeout(500);
  record('open task returns to work scene', await page.locator('.iwb-canvas').isVisible() && await page.locator('.iwb-card').count() === 2);
  record('empty pending reminder stays hidden after switching back to canvas', await page.locator('.iwb-todo').isHidden());

  await clickText('.iwb-toolbar .iwb-btn', '画布');
  await page.locator('.iwb-canvas-input').fill('E2E 任务画布');
  await clickText('.iwb-canvas-menu .iwb-btn', '保存');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: '新建空白画布' }).click();
  await page.waitForTimeout(500);
  record('new blank preserves saved work and clears view', await page.locator('.iwb-card').count() === 0);
  record('new blank also clears every pipeline path', await page.locator('.iwb-links path').count() === 0);
  await shot('03b-blank-no-links');
  await clickText('.iwb-toolbar .iwb-btn', '画布');
  await clickText('.iwb-canvas-pick', 'E2E 任务画布');
  await page.waitForTimeout(800);
  record('switching back restores full work scene', await page.locator('.iwb-card').count() === 2);
  record('restored composer keeps draft', (await page.locator('.iwb-foot textarea').first().inputValue()).includes('实现任务画布'));

  await page.locator('.iwb-card-note [data-act="close"]').first().click();
  await page.waitForTimeout(800);
  record('closing a note also removes its pipeline paths', await page.locator('.iwb-links path').count() === 0, String(await page.locator('.iwb-links path').count()));

  await clickText('.iwb-toolbar .iwb-btn', '便签');
  await page.waitForTimeout(350);
  await page.locator('.iwb-note-toggle-button').filter({ hasText: '源码' }).last().click();
  const noteInput = page.locator('.iwb-note-input').last();
  await noteInput.fill(Array.from({ length: 80 }, (_, index) => '第 ' + (index + 1) + ' 行滚动测试内容').join('\n'));
  await noteInput.evaluate((node) => { node.scrollTop = node.scrollHeight; });
  const beforeCardWheel = await page.locator('.iwb-world').evaluate((node) => node.style.transform);
  const noteRect = await noteInput.boundingBox();
  await page.mouse.move(noteRect.x + noteRect.width / 2, noteRect.y + noteRect.height / 2);
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(250);
  const afterCardWheel = await page.locator('.iwb-world').evaluate((node) => node.style.transform);
  record('wheel inside a card does not pan the canvas at its edge', beforeCardWheel === afterCardWheel, beforeCardWheel + ' → ' + afterCardWheel);
  const canvasRect = await page.locator('.iwb-canvas').boundingBox();
  await page.mouse.move(canvasRect.x + 18, canvasRect.y + 100);
  await page.mouse.wheel(0, 320);
  await page.waitForTimeout(250);
  const afterOuterWheel = await page.locator('.iwb-world').evaluate((node) => node.style.transform);
  record('wheel outside a card pans the canvas normally', afterCardWheel !== afterOuterWheel, afterCardWheel + ' → ' + afterOuterWheel);

  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(400);
  await page.locator('.iwb-task-list-select').first().click();
  await clickText('.iwb-task-detail-actions .iwb-btn', '续做');
  await page.waitForTimeout(600);
  record('continue generates reviewable draft', (await page.locator('.iwb-foot textarea').first().inputValue()).includes('请继续这项任务'));

  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(400);
  await clickText('.iwb-task-toolbar .iwb-btn', '整理会话');
  await page.waitForSelector('.iwb-task-session-item', { timeout: 15000 });
  const scanAI = page.locator('.iwb-task-dialog-options .iwb-task-check input').last();
  if (await scanAI.isChecked()) await scanAI.uncheck();
  await clickText('.iwb-task-dialog-footer .iwb-btn', '扫描并生成草案');
  await page.waitForSelector('.iwb-task-draft-item', { timeout: 15000 });
  record('session scan produces selectable drafts', await page.locator('.iwb-task-draft-item').count() > 0);
  await shot('05-scan-drafts');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '添加');
  await page.waitForTimeout(700);
  record('scan drafts enter task center', await page.locator('.iwb-task-list-item').count() >= 2);

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await dismissOnboarding();
  if (!(await page.locator('.iwb-root').count())) {
    await clickText('button', '灵感工作台');
  }
  await page.waitForTimeout(800);
  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(500);
  record('tasks survive full page reload', await page.locator('.iwb-task-list-item').count() >= 2);
  await shot('06-task-restored');

  await page.setViewportSize({ width: 1100, height: 760 });
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => {
    const root = document.querySelector('.iwb-task-view');
    return root ? root.scrollWidth > root.clientWidth + 2 : false;
  });
  record('task layout stays usable at narrower width', !overflow);
  await shot('07-task-narrow');

  await clickText('.iwb-mode-tab', '画布');
  await clickText('.iwb-toolbar .iwb-btn', '设置');
  await clickText('.iwb-settings .iwb-btn', '重置');
  await page.waitForTimeout(400);
  record('reset clears cards and pipeline links together', await page.locator('.iwb-card').count() === 0 && await page.locator('.iwb-links path').count() === 0);
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
}

try {
  await main();
} catch (error) {
  record('scenario aborted', false, String(error));
  await shot('99-failure');
} finally {
  await browser.close();
}
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
