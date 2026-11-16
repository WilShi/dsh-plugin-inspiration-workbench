#!/usr/bin/env node
import { existsSync, readdirSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const url = process.argv[2];
if (!url) throw new Error('usage: node scripts/verify-file-cards.mjs "http://127.0.0.1:<port>/?token=<token>"');
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
const outDir = join('var', 'file-cards');
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: findChromium(), headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const results = [];
const errors = [];
page.on('pageerror', (error) => errors.push(String(error)));
page.on('console', (message) => {
  if (message.type() === 'error' && !/net::ERR_|Failed to load resource|Blocked script execution in 'about:srcdoc'/.test(message.text())) errors.push(message.text());
});
function record(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  ' + detail : ''));
}
async function shot(name) { await page.screenshot({ path: join(outDir, name + '.png'), fullPage: true }); }
async function clickText(selector, text) { await page.locator(selector).filter({ hasText: text }).first().click({ timeout: 15000 }); }
async function upload(file) {
  await page.locator('input[type="file"]').first().setInputFiles(file);
  await page.waitForTimeout(450);
}
async function closePreview() {
  await page.locator('.iwb-file-dialog-close').click();
  await page.waitForTimeout(180);
}
async function main() {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const onboarding = page.getByRole('button', { name: '稍后配置' });
  if (await onboarding.count()) await onboarding.first().click().catch(() => {});
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
  await page.waitForTimeout(1000);
  if (await onboarding.count()) await onboarding.first().click().catch(() => {});
  if (!(await page.locator('.iwb-root').count())) await clickText('button', '灵感工作台');

  await clickText('.iwb-toolbar .iwb-btn', '便签');
  await page.waitForTimeout(300);
  await clickText('.iwb-note-toggle-button', '源码');
  await page.locator('.iwb-note-input').fill(`# 项目计划

- **完成工作区选择**
- 支持 Markdown 预览
- [不安全链接](javascript:alert(1))

> 默认展示渲染效果`);
  await clickText('.iwb-note-toggle-button', '预览');
  record('note defaults to rendered Markdown', await page.locator('.iwb-note-preview .iwb-md-h1').textContent() === '项目计划');
  record('note renders emphasis and quote', await page.locator('.iwb-note-preview strong').count() >= 1 && await page.locator('.iwb-note-preview .iwb-md-quote').count() >= 1);
  record('note keeps source toggle accessible', await page.locator('.iwb-note-toggle-button').count() === 2);
  record('unsafe Markdown links are not rendered as executable links', await page.locator('.iwb-note-preview a[href^="javascript:"]').count() === 0);
  await shot('01-note-preview');

  await upload({ name: '说明.txt', mimeType: 'text/plain', buffer: Buffer.from('这是用于验证文件预览的文本内容。') });
  record('text file becomes a file card', (await page.locator('.iwb-file-name').last().textContent()).includes('说明.txt'));
  await page.locator('.iwb-file-open').last().click();
  await page.waitForSelector('.iwb-file-dialog');
  record('text preview opens in native dialog', (await page.locator('.iwb-file-preview-text').innerText()).includes('文本内容'));
  await shot('02-text-preview');
  await closePreview();

  await upload({ name: 'pixel.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64') });
  record('image file shows thumbnail', await page.locator('.iwb-file-thumb').last().isVisible());
  await page.locator('.iwb-file-open').last().click();
  await page.waitForSelector('.iwb-file-dialog');
  record('image preview opens with actual image', await page.locator('.iwb-file-preview-image').evaluate((image) => image.complete && image.naturalWidth > 0));
  await shot('03-image-preview');
  await closePreview();

  await upload('var/sample.docx');
  await page.locator('.iwb-file-open').last().click();
  await page.waitForSelector('.iwb-file-dialog');
  record('DOCX preview extracts readable text', (await page.locator('.iwb-file-preview-text').innerText()).includes('工作区预览测试'));
  await shot('04-docx-preview');
  await closePreview();

  await upload({ name: 'preview.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><html><body><h1>HTML 预览</h1><p>安全沙箱内容</p><script>window.__unsafe = true</script></body></html>') });
  await page.locator('.iwb-file-open').last().click();
  await page.waitForSelector('.iwb-file-dialog');
  record('HTML preview uses a sandboxed iframe', await page.locator('.iwb-file-preview-frame').evaluate((frame) => frame.getAttribute('sandbox') === '' && frame.srcdoc.includes('HTML 预览')));
  record('HTML preview does not execute scripts in the host page', await page.evaluate(() => window.__unsafe === undefined));
  await closePreview();

  await upload({ name: 'unknown.bin', mimeType: 'application/octet-stream', buffer: Buffer.from([1, 2, 3, 4]) });
  await page.locator('.iwb-file-open').last().click();
  await page.waitForSelector('.iwb-file-dialog');
  record('unsupported file explains download fallback', (await page.locator('.iwb-file-dialog-body').innerText()).includes('暂不支持'));
  const downloadPromise = page.waitForEvent('download');
  await page.locator('.iwb-file-dialog-foot a').click();
  const download = await downloadPromise;
  record('download action is available for unsupported file', download.suggestedFilename() === 'unknown.bin');
  await closePreview();

  await page.evaluate(() => {
    const file = new File(['<html><body>粘贴文件</body></html>'], 'pasted.html', { type: 'text/html' });
    const event = new Event('paste', { bubbles: true });
    Object.defineProperty(event, 'clipboardData', { value: { files: [file] } });
    document.querySelector('.iwb-canvas').dispatchEvent(event);
  });
  await page.waitForTimeout(400);
  record('pasting a file creates a file card', (await page.locator('.iwb-file-name').last().textContent()).includes('pasted.html'));

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  if (await onboarding.count()) await onboarding.first().click().catch(() => {});
  if (!(await page.locator('.iwb-root').count())) await clickText('button', '灵感工作台');
  const restoredFileCards = await page.locator('.iwb-file-card').count();
  record('file cards survive page reload', restoredFileCards === 6, restoredFileCards + ' card(s)');
  record('note preview survives page reload', await page.locator('.iwb-note-preview').isVisible());
  record('file names survive page reload', (await page.locator('.iwb-file-card .iwb-card-title').allTextContents()).includes('pasted.html'));
  await shot('05-file-cards-restored');

  const layout = await page.evaluate(() => ({
    toolbarOverflow: document.querySelector('.iwb-toolbar').scrollWidth > document.querySelector('.iwb-toolbar').clientWidth + 2,
    previewButtonCount: document.querySelectorAll('.iwb-file-preview-button').length,
    cardCount: document.querySelectorAll('.iwb-file-card').length,
  }));
  record('toolbar and card actions do not overflow', !layout.toolbarOverflow);
  record('every file card has a preview action', layout.previewButtonCount === layout.cardCount);
  record('no browser page errors', errors.length === 0, errors.slice(0, 3).join(' / '));
}
try {
  await main();
} catch (error) {
  record('file card scenario aborted', false, String(error));
  await shot('99-failure');
} finally {
  await browser.close();
}
const passed = results.filter((result) => result.ok).length;
console.log('\n' + passed + '/' + results.length + ' checks passed');
if (passed !== results.length) process.exitCode = 1;
