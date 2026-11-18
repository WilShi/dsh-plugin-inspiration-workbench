#!/usr/bin/env node
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2];
if (!url) throw new Error('usage: node scripts/verify-multi-chain.mjs "http://127.0.0.1:<port>/?token=<token>"');
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
const browser = await chromium.launch({ executablePath: findChromium(), headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const results = [];
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
function record(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  ' + detail : ''));
}
async function clickText(selector, text) { await page.locator(selector).filter({ hasText: text }).first().click({ timeout: 15000 }); }
async function connect(from, to) {
  await from.hover();
  const port = from.locator('.iwb-port[data-side="right"]');
  const start = await port.boundingBox();
  const end = await to.boundingBox();
  const sx = start.x + start.width / 2;
  const sy = start.y + start.height / 2;
  const ex = end.x + end.width / 2;
  const ey = end.y + 80;
  await port.dispatchEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: sx, clientY: sy, button: 0 });
  for (let i = 1; i <= 8; i += 1) {
    await port.dispatchEvent('pointermove', { bubbles: true, pointerId: 1, clientX: sx + ((ex - sx) * i) / 8, clientY: sy + ((ey - sy) * i) / 8 });
    await page.waitForTimeout(40);
  }
  await port.dispatchEvent('pointerup', { bubbles: true, pointerId: 1, clientX: ex, clientY: ey });
  await page.waitForTimeout(350);
}
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
  for (let i = 0; i < 4; i += 1) {
    await clickText('.iwb-toolbar .iwb-btn.primary', '新建会话卡');
    await page.waitForSelector('.iwb-workspace-row', { timeout: 12000 });
    await page.locator('.iwb-workspace-row').first().click();
    await page.waitForTimeout(700);
  }
  await clickText('.iwb-toolbar .iwb-btn', '适应');
  await page.waitForTimeout(400);
  for (const card of await page.locator('.iwb-card').all()) {
    await card.locator('.iwb-meta').click();
    await page.locator('.iwb-model-row').filter({ hasText: 'Kimi K3.1 Pro' }).first().click();
  }
  await clickText('.iwb-toolbar .iwb-btn', '便签');
  await page.waitForTimeout(500);
  await clickText('.iwb-toolbar .iwb-btn', '适应');
  await page.waitForTimeout(400);
  const cards = page.locator('.iwb-card:not(.iwb-card-note)');
  const note = page.locator('.iwb-card-note');
  for (let i = 0; i < 3; i += 1) await connect(cards.nth(i), cards.nth(i + 1));
  await connect(cards.nth(3), note);
  record('four-session chain is connected', await page.locator('.iwb-link').count() === 4);
  await cards.nth(0).locator('.iwb-foot textarea').fill('只回复：阶段一完成。不要调用工具。');
  await cards.nth(0).locator('.iwb-foot .iwb-send').click();
  await page.waitForFunction(async () => {
    const body = await (await fetch('/api/inspiration-workbench/tasks')).json();
    return (body.flowEvents || []).filter((event) => event.targetKind === 'note' && event.status === 'delivered').length >= 1;
  }, null, { timeout: 300000 });
  const result = await page.evaluate(async () => {
    const layout = await (await fetch('/api/inspiration-workbench/layout')).json();
    return {
      note: layout.layout?.cards?.find((card) => card.kind === 'note')?.note || '',
      delivered: (await (await fetch('/api/inspiration-workbench/tasks')).json()).flowEvents?.filter((event) => event.targetKind === 'note' && event.status === 'delivered').length,
    };
  });
  record('all four stages reach the final note', result.delivered >= 1 && (result.note.match(/## 来自/g) || []).length >= 1, result.delivered + ' deliveries');
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
  await page.screenshot({ path: 'var/multi-chain-completed.png', fullPage: true });
}
try { await main(); } catch (error) {
  record('multi-chain scenario aborted', false, String(error));
  await page.screenshot({ path: 'var/multi-chain-failure.png', fullPage: true });
} finally { await browser.close(); }
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
