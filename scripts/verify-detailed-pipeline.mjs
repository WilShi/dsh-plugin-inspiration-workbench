#!/usr/bin/env node
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2];
if (!url) throw new Error('usage: node scripts/verify-detailed-pipeline.mjs "http://127.0.0.1:<port>/?token=<token>"');
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
const outDir = join('var', 'detailed-pipeline');
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
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    localStorage.clear();
    const put = (path, value) => fetch(path, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) });
    await put('/api/inspiration-workbench/layout', { layout: { version: 1, cards: [] } });
    await put('/api/inspiration-workbench/canvases', { canvases: [], activeCanvas: null });
    await put('/api/inspiration-workbench/tasks', { tasks: [], flowEvents: [] });
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  if (!(await page.locator('.iwb-root').count())) await clickText('button', '灵感工作台');
  await clickText('.iwb-mode-tab', '任务');
  await clickText('.iwb-task-toolbar .iwb-btn', '规划需求');
  await page.waitForSelector('.iwb-task-model-select', { timeout: 20000 });
  await page.waitForFunction(() => document.querySelectorAll('.iwb-task-model-select option').length > 1, null, { timeout: 20000 });
  const options = await page.locator('.iwb-task-model-select option').allTextContents();
  const usableIndex = options.findIndex((text) => /Kimi|ark/i.test(text));
  if (usableIndex > 0) await page.locator('.iwb-task-model-select').selectOption({ index: usableIndex });
  await page.locator('.iwb-task-textarea').fill('为复杂电商项目只拆 4 个阶段：需求、实现、测试、部署汇总，每个节点只输出一行简短结论，不执行任何工具。');
  await clickText('.iwb-task-dialog-footer .iwb-btn', '生成拓扑草案');
  await page.waitForSelector('.iwb-task-plan-node', { timeout: 180000 });
  const planCount = await page.locator('.iwb-task-plan-node').count();
  record('detailed plan has multiple executable nodes', planCount >= 4 && planCount <= 12, planCount + ' node(s)');
  await page.screenshot({ path: join(outDir, 'plan.png'), fullPage: true });
  const start = page.locator('.iwb-task-plan-start input');
  if (!(await start.isChecked())) await start.check();
  await clickText('.iwb-task-dialog-footer .iwb-btn', '创建');
  await page.waitForTimeout(2500);
  const plan = await page.evaluate(async () => {
    const response = await fetch('/api/inspiration-workbench/tasks');
    const body = await response.json();
    return body.tasks?.[0]?.plan || null;
  });
  const sessionNodes = plan?.nodes?.filter((node) => node.kind === 'session') || [];
  const integration = sessionNodes.find((node) => node.dependsOn?.length > 0);
  record('multi-node plan has an integration dependency', Boolean(integration), integration?.id || 'missing');
  await page.waitForFunction(async () => {
    const response = await fetch('/api/inspiration-workbench/tasks');
    const body = await response.json();
    return body.tasks?.[0]?.executionStatus === 'done';
  }, null, { timeout: 300000 });
  record('all session nodes finish automatically', true);
  const noteText = await page.locator('.iwb-note-preview').innerText();
  const template = plan?.nodes?.find((node) => node.kind === 'note')?.note || '';
  record('final result note receives integrated output', noteText.trim().length > template.length + 20, noteText.slice(0, 180));
  await clickText('.iwb-mode-tab', '任务');
  await page.locator('.iwb-task-list-select').first().click();
  await page.waitForFunction(() => document.querySelector('.iwb-task-auto-status')?.textContent.includes('待验收'), null, { timeout: 120000 });
  record('completed chain is ready for acceptance', true);
  await page.screenshot({ path: join(outDir, 'completed.png'), fullPage: true });
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
}
try { await main(); } catch (error) {
  record('detailed pipeline scenario aborted', false, String(error));
  await page.screenshot({ path: join(outDir, 'failure.png'), fullPage: true });
} finally { await browser.close(); }
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
