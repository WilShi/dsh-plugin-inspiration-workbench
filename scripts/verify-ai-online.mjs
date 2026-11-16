#!/usr/bin/env node
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const url = process.argv[2] || process.env.IWB_URL;
if (!url) throw new Error('usage: node scripts/verify-ai-online.mjs "http://127.0.0.1:<port>/?token=<token>"');
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
const outDir = join('var', 'ai-online');
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
async function clickText(selector, text) {
  await page.locator(selector).filter({ hasText: text }).first().click({ timeout: 15000 });
}
async function shot(name) { await page.screenshot({ path: join(outDir, name + '.png'), fullPage: true }); }
async function taskMode() {
  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(450);
}
async function main() {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2200);
  await clickText('button', '灵感工作台');
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    localStorage.clear();
    const put = (path, value) => fetch(path, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) });
    await put('/api/inspiration-workbench/layout', { layout: { version: 1, cards: [] } });
    await put('/api/inspiration-workbench/canvases', { canvases: [], activeCanvas: null });
    await put('/api/inspiration-workbench/tasks', { tasks: [], flowEvents: [] });
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1400);
  if (!(await page.locator('.iwb-root').count())) await clickText('button', '灵感工作台');

  await taskMode();
  await clickText('.iwb-task-toolbar .iwb-btn', '规划需求');
  await page.waitForSelector('.iwb-task-dialog-plan');
  const modelSelect = page.locator('.iwb-task-model-select');
  await page.waitForFunction(() => document.querySelectorAll('.iwb-task-model-select option').length > 1, null, { timeout: 20000 });
  const modelOptions = await modelSelect.locator('option').allTextContents();
  const usableIndex = modelOptions.findIndex((text) => /Kimi|ark/i.test(text));
  if (usableIndex > 0) await modelSelect.selectOption({ index: usableIndex });
  const useAI = page.locator('.iwb-task-plan-form .iwb-task-check input').first();
  if (!(await useAI.isChecked())) await useAI.check();
  await page.locator('.iwb-task-textarea').fill('创建一个简单的需求分析节点和结果汇总便签，只输出计划，不执行任何工具。');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '生成拓扑草案');
  await page.waitForSelector('.iwb-task-plan-node', { timeout: 180000 });
  const planCount = await page.locator('.iwb-task-plan-node').count();
  record('online AI generates a bounded topology', planCount >= 1 && planCount <= 6, planCount + ' node(s)');
  const start = page.locator('.iwb-task-plan-start input');
  if (await start.isChecked()) await start.uncheck();
  await shot('01-online-plan');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '创建');
  await page.waitForTimeout(2200);
  record('AI plan materializes without auto execution', await page.locator('.iwb-card').count() >= 1);
  const hasSessionNode = await page.evaluate(async () => {
    const response = await fetch('/api/inspiration-workbench/tasks');
    const body = await response.json();
    return (body.tasks || []).some((task) => (task.plan?.nodes || []).some((node) => node.kind === 'session'));
  });
  record('online AI topology includes a session node', hasSessionNode);

  await taskMode();
  await clickText('.iwb-task-toolbar .iwb-btn', '规划需求');
  await page.waitForSelector('.iwb-task-dialog-plan');
  const fallbackAI = page.locator('.iwb-task-plan-form .iwb-task-check input').first();
  if (await fallbackAI.isChecked()) await fallbackAI.uncheck();
  await page.locator('.iwb-task-textarea').fill('在线流水线测试');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '生成拓扑草案');
  await page.waitForSelector('.iwb-task-plan-node', { timeout: 15000 });
  const fallbackStart = page.locator('.iwb-task-plan-start input');
  if (await fallbackStart.isChecked()) await fallbackStart.uncheck();
  await clickText('.iwb-task-dialog-footer .iwb-btn', '创建');
  await page.waitForTimeout(1800);

  const modelCard = page.locator('.iwb-card').first();
  await modelCard.locator('.iwb-meta').click();
  await page.locator('.iwb-model-row').filter({ hasText: 'Kimi K3.1 Pro' }).first().click();
  const composer = page.locator('.iwb-foot textarea').first();
  await composer.fill('只回复这句话：在线流水线测试通过。不要调用任何工具，不要修改文件。');
  await page.locator('.iwb-foot .iwb-send').first().click();
  await page.waitForFunction(() => {
    const note = document.querySelector('.iwb-note-input');
    return note && note.value.includes('在线流水线测试通过');
  }, null, { timeout: 180000 });
  record('real model response reaches the downstream note', true);
  record('delivered edge uses the actual delivered state', await page.locator('.iwb-link-delivered').count() >= 1);
  await shot('02-online-pipeline');

  await taskMode();
  await clickText('.iwb-task-toolbar .iwb-btn', '整理会话');
  await page.waitForSelector('.iwb-task-session-item', { timeout: 15000 });
  const selectAll = page.locator('.iwb-task-dialog-options .iwb-task-select-all input').first();
  if (await selectAll.isChecked()) await selectAll.uncheck();
  await page.locator('.iwb-task-session-item input').first().check();
  const scanAI = page.locator('.iwb-task-dialog-options .iwb-task-check input').last();
  if (!(await scanAI.isChecked())) await scanAI.check();
  await clickText('.iwb-task-dialog-footer .iwb-btn', '扫描并生成草案');
  await page.waitForSelector('.iwb-task-draft-item', { timeout: 180000 });
  record('online AI organizes sessions into reviewable drafts', await page.locator('.iwb-task-draft-item').count() >= 1);
  await shot('03-online-scan');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '添加');
  await page.waitForTimeout(900);
  const sources = await page.evaluate(async () => {
    const response = await fetch('/api/inspiration-workbench/tasks');
    const body = await response.json();
    return (body.tasks || []).map((task) => task.source);
  });
  record('AI-organized task is persisted with an AI source', sources.includes('scan-ai'), sources.join(', '));
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
}

try {
  await main();
} catch (error) {
  record('online scenario aborted', false, String(error));
  await shot('99-failure');
} finally {
  await browser.close();
}
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
