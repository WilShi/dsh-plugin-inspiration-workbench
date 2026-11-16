#!/usr/bin/env node
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2];
if (!url) throw new Error('usage: node scripts/verify-model-nodes.mjs "http://127.0.0.1:<port>/?token=<token>"');
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
const outDir = join('var', 'model-nodes');
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: findChromium(), headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const results = [];
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
function record(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  ' + detail : ''));
}
async function clickText(selector, text) { await page.locator(selector).filter({ hasText: text }).first().click({ timeout: 18000 }); }
async function main() {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1800);
  await clickText('button', '灵感工作台');
  await page.waitForTimeout(1000);
  await page.evaluate(async () => {
    localStorage.clear();
    const put = (path, value) => fetch(path, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) });
    await put('/api/inspiration-workbench/layout', { layout: { version: 1, cards: [] } });
    await put('/api/inspiration-workbench/canvases', { canvases: [], activeCanvas: null });
    await put('/api/inspiration-workbench/tasks', { tasks: [], flowEvents: [] });
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1100);
  if (!(await page.locator('.iwb-root').count())) await clickText('button', '灵感工作台');
  await clickText('.iwb-mode-tab', '任务');
  await clickText('.iwb-task-toolbar .iwb-btn', '规划需求');
  await page.waitForSelector('.iwb-task-model-select', { timeout: 20000 });
  const modelSelect = page.locator('.iwb-task-model-select');
  record('planning model picker is a real select', await modelSelect.evaluate((node) => node.tagName === 'SELECT'));
  const optionCount = await modelSelect.locator('option').count();
  record('model catalog provides choices and a default', optionCount >= 2, optionCount + ' option(s)');
  const defaultText = await modelSelect.locator('option').first().textContent();
  record('default model option follows DSH default', defaultText.includes('默认'));
  if (optionCount > 1) {
    const options = await modelSelect.locator('option').allTextContents();
    const usableIndex = options.findIndex((text) => /Kimi|ark/i.test(text));
    await modelSelect.selectOption({ index: usableIndex > 0 ? usableIndex : Math.min(2, optionCount - 1) });
    record('user can choose another model', (await modelSelect.inputValue()).length > 0, await modelSelect.locator('option:checked').textContent());
  }
  await page.locator('.iwb-task-textarea').fill('只创建一个分析节点和一个结果便签，不执行工具。');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '生成拓扑草案');
  await page.waitForSelector('.iwb-task-plan-node', { timeout: 180000 });
  record('AI generates topology after model selection', await page.locator('.iwb-task-plan-node').count() >= 1);
  const start = page.locator('.iwb-task-plan-start input');
  if (await start.isChecked()) await start.uncheck();
  await page.screenshot({ path: join(outDir, 'model-plan.png'), fullPage: true });
  await clickText('.iwb-task-dialog-footer .iwb-btn', '创建');
  await page.waitForTimeout(1800);
  const composer = page.locator('.iwb-foot textarea').first();
  await composer.fill('只回复：节点已完成。不要调用工具。');
  await page.locator('.iwb-foot .iwb-send').first().click();
  await page.waitForFunction(() => {
    const note = document.querySelector('.iwb-note-input');
    return note && note.value.includes('节点已完成');
  }, null, { timeout: 180000 });
  await page.waitForTimeout(800);
  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(500);
  await page.locator('.iwb-task-list-select').first().click();
  const nodes = page.locator('.iwb-task-node-row');
  record('task detail shows node-level progress', await nodes.count() >= 1);
  record('completed nodes are visible in task detail', await page.locator('.iwb-task-node-status.is-done').count() >= 1);
  record('task detail shows completed count', (await page.locator('.iwb-task-nodes').innerText()).includes('2/2'));
  await page.screenshot({ path: join(outDir, 'task-nodes.png'), fullPage: true });
  await clickText('.iwb-task-toolbar .iwb-btn', '规划需求');
  await page.waitForSelector('.iwb-task-model-select', { timeout: 20000 });
  const failureOptions = await page.locator('.iwb-task-model-select option').allTextContents();
  const unavailableIndex = failureOptions.findIndex((text) => text.includes('deepseek-official'));
  if (unavailableIndex > 0) {
    await page.locator('.iwb-task-model-select').selectOption({ index: unavailableIndex });
    await page.locator('.iwb-task-textarea').fill('验证不可用模型的错误提示');
    await clickText('.iwb-task-dialog-footer .iwb-btn', '生成拓扑草案');
    await page.waitForSelector('.iwb-task-dialog-error:not([hidden])', { timeout: 180000 });
    const message = await page.locator('.iwb-task-dialog-error').innerText();
    record('unavailable model shows an actionable error', /404|failed|不可用/i.test(message), message.slice(0, 120));
    record('failed planning leaves the form usable', await page.locator('.iwb-task-dialog-footer .iwb-btn.primary').isEnabled());
    await page.locator('.iwb-task-dialog-head .iwb-btn').click();
  }
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
}
try { await main(); } catch (error) {
  record('model/node scenario aborted', false, String(error));
  await page.screenshot({ path: join(outDir, 'failure.png'), fullPage: true });
} finally { await browser.close(); }
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
