#!/usr/bin/env node
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2];
if (!url) throw new Error('usage: node scripts/verify-session-pipeline.mjs "http://127.0.0.1:<port>/?token=<token>"');
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
const outDir = join('var', 'session-pipeline');
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: findChromium(), headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
const results = [];
const record = (name, ok, detail = '') => {
  results.push({ name, ok: Boolean(ok), detail });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  ' + detail : ''));
};
const clickText = async (selector, text) => page.locator(selector).filter({ hasText: text }).first().click({ timeout: 15000 });
try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
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

  for (let index = 0; index < 2; index += 1) {
    await clickText('.iwb-toolbar .iwb-btn.primary', '新建会话卡');
    await page.waitForSelector('.iwb-workspace-row', { timeout: 12000 });
    await page.locator('.iwb-workspace-row').first().click();
    await page.waitForTimeout(800);
  }
  record('two real session cards created', await page.locator('.iwb-card').count() === 2);
  const source = page.locator('.iwb-card').nth(0);
  const target = page.locator('.iwb-card').nth(1);
  for (const card of [source, target]) {
    await card.locator('.iwb-meta').click();
    await page.locator('.iwb-model-row').filter({ hasText: 'Kimi K3.1 Pro' }).first().click();
  }
  await source.hover();
  await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    const port = cards[0].querySelector('.iwb-port[data-side="right"]');
    const target = cards[1];
    const pr = port.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const start = { x: pr.x + pr.width / 2, y: pr.y + pr.height / 2 };
    const end = { x: tr.x + tr.width / 2, y: tr.y + 80 };
    port.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: start.x, clientY: start.y, button: 0 }));
    for (let index = 1; index <= 8; index += 1) {
      port.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true,
        pointerId: 1,
        clientX: start.x + ((end.x - start.x) * index) / 8,
        clientY: start.y + ((end.y - start.y) * index) / 8,
      }));
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    port.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1, clientX: end.x, clientY: end.y }));
  });
  await page.waitForTimeout(700);
  await source.locator('.iwb-foot textarea').fill('只回复这句话：下游自动回复成功。不要调用任何工具。');
  await source.locator('.iwb-foot .iwb-send').click();
  await page.waitForFunction(() => {
    const first = document.querySelectorAll('.iwb-card')[0];
    return first && [...first.querySelectorAll('.iwb-msg.assistant')].some((node) => node.textContent.includes('下游自动回复成功'));
  }, null, { timeout: 180000 });
  record('upstream completes before edge creation', true);

  await source.hover();
  await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    const port = cards[0].querySelector('.iwb-port[data-side="right"]');
    const target = cards[1];
    const pr = port.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const start = { x: pr.x + pr.width / 2, y: pr.y + pr.height / 2 };
    const end = { x: tr.x + tr.width / 2, y: tr.y + 80 };
    port.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: start.x, clientY: start.y, button: 0 }));
    for (let index = 1; index <= 8; index += 1) {
      port.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true,
        pointerId: 1,
        clientX: start.x + ((end.x - start.x) * index) / 8,
        clientY: start.y + ((end.y - start.y) * index) / 8,
      }));
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    port.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1, clientX: end.x, clientY: end.y }));
  });
  await page.waitForTimeout(700);
  record('pipeline edge is created between sessions', await page.locator('.iwb-link').count() === 1);
  await page.waitForFunction(() => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    const second = cards[1];
    return second && [...second.querySelectorAll('.iwb-msg.user')].some((node) => node.textContent.includes('下游自动回复成功'));
  }, null, { timeout: 180000 });
  record('downstream receives upstream assistant output automatically', true);
  await page.waitForFunction(() => {
    const second = document.querySelectorAll('.iwb-card')[1];
    return second && [...second.querySelectorAll('.iwb-msg.assistant')].some((node) => node.textContent.trim().length > 0);
  }, null, { timeout: 180000 });
  await page.waitForFunction(() => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    return cards.length >= 2 && cards.every((card) => !card.classList.contains('iwb-running') && card.querySelector('.iwb-dot.done'));
  }, null, { timeout: 180000 });
  record('downstream starts and completes without another user send', true);
  await page.screenshot({ path: join(outDir, 'session-pipeline.png'), fullPage: true });

  await clickText('.iwb-mode-tab', '任务');
  await page.waitForTimeout(400);
  await clickText('.iwb-task-toolbar .iwb-btn', '整理会话');
  await page.waitForSelector('.iwb-task-session-item', { timeout: 15000 });
  await page.evaluate(() => {
    const all = document.querySelector('.iwb-task-dialog-options .iwb-task-select-all input');
    if (all) {
      all.checked = false;
      all.dispatchEvent(new Event('change', { bubbles: true }));
    }
    for (const input of [...document.querySelectorAll('.iwb-task-session-item input')].slice(0, 2)) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  const scanAI = page.locator('.iwb-task-dialog-options .iwb-task-check input').last();
  if (await scanAI.isChecked()) await scanAI.uncheck();
  await clickText('.iwb-task-dialog-footer .iwb-btn', '扫描并生成草案');
  await page.waitForSelector('.iwb-task-draft-item', { timeout: 15000 });
  await clickText('.iwb-task-dialog-footer .iwb-btn', '添加');
  await page.waitForTimeout(600);
  await page.locator('.iwb-task-list-select').first().click();
  const automaticStatus = await page.locator('.iwb-task-auto-status').innerText();
  record('completed nodes automatically move task to review', automaticStatus.includes('待验收'), automaticStatus);
  record('task status is not a manual dropdown', await page.locator('.iwb-task-editor').first().locator('select').count() === 0);
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
} catch (error) {
  record('session pipeline scenario aborted', false, String(error));
  await page.screenshot({ path: join(outDir, 'failure.png'), fullPage: true });
} finally {
  await browser.close();
}
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
