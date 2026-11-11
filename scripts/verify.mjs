#!/usr/bin/env node
/**
 * Headless smoke checks for the Inspiration Workbench client plugin.
 *
 *   node scripts/verify.mjs --url "http://127.0.0.1:63676/?token=..."
 *
 * It drives a real DSH web instance with Playwright and asserts the parts that
 * are easy to break during refactors: panel mounting, card creation, note
 * editing, search, the turn outline, and "no page errors". Exit code is non-zero
 * when any check fails, so it can gate a change.
 */

import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CACHE_ROOTS = [
  join(homedir(), 'Library', 'Caches', 'ms-playwright'),
  join(homedir(), '.cache', 'ms-playwright'),
];

/** Use a cached Chromium build when the installed Playwright expects another one. */
function findChromium() {
  for (const root of CACHE_ROOTS) {
    if (!existsSync(root)) continue;
    const builds = readdirSync(root)
      .filter((name) => /^chromium-\d+$/.test(name))
      .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
    for (const build of builds) {
      const candidates = [
        join(root, build, 'chrome-mac-arm64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
        join(root, build, 'chrome-mac', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
        join(root, build, 'chrome-linux', 'chrome'),
        join(root, build, 'chrome-linux64', 'chrome'),
      ];
      for (const candidate of candidates) if (existsSync(candidate)) return candidate;
    }
  }
  return undefined;
}

function arg(name) {
  const index = process.argv.indexOf('--' + name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const url = arg('url') || process.env.IWB_URL;
if (!url) {
  console.error('usage: node scripts/verify.mjs --url "http://127.0.0.1:<port>/?token=<token>"');
  process.exit(2);
}

const { chromium } = await import('playwright');

const results = [];
function record(name, ok, detail, skipped = false) {
  results.push({ name, ok: skipped ? true : ok, detail: detail ?? '', skipped });
}

const browser = await chromium.launch({ executablePath: findChromium(), headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await context.newPage();

const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(String(error)));
page.on('console', (message) => {
  if (message.type() === 'error' && !/net::ERR_|Failed to load resource/.test(message.text())) {
    pageErrors.push(message.text());
  }
});

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);

  // The app may greet with a resume button after an interrupted run.
  const resume = page.getByRole('button', { name: '继续' });
  if (await resume.count()) {
    await resume.first().click().catch(() => {});
    await page.waitForTimeout(600);
  }

  const nav = page.getByRole('button', { name: '灵感工作台' });
  record('workbench entry in sidebar', (await nav.count()) > 0);
  if (await nav.count()) {
    await nav.first().click();
    await page.waitForTimeout(1800);
  }

  const mounted = await page.locator('.iwb-root').count();
  record('workbench panel mounts', mounted > 0);

  const toolbar = await page.evaluate(() => [...document.querySelectorAll('.iwb-toolbar .iwb-btn')].map((node) => node.textContent.trim()));
  record('toolbar renders', toolbar.length >= 4, toolbar.join(' | '));

  // Create a note card when the board is empty so the rest has something to act on.
  let cards = await page.locator('.iwb-card').count();
  if (cards === 0) {
    await page.evaluate(() => {
      const button = [...document.querySelectorAll('.iwb-btn')].find((node) => node.textContent.includes('便签'));
      button?.click();
    });
    await page.waitForTimeout(900);
    cards = await page.locator('.iwb-card').count();
  }
  record('cards can exist on the canvas', cards > 0, cards + ' card(s)');

  // Batch checks need at least two cards.
  if ((await page.locator('.iwb-card').count()) < 2) {
    await page.evaluate(() => {
      const button = [...document.querySelectorAll('.iwb-btn')].find((node) => node.textContent.includes('便签'));
      button?.click();
    });
    await page.waitForTimeout(800);
  }

  const noteCheck = await page.evaluate(() => {
    const area = document.querySelector('.iwb-note-input');
    if (!area) return { skipped: true };
    area.focus();
    area.value = 'verify-script';
    area.dispatchEvent(new Event('input', { bubbles: true }));
    return { skipped: false, value: area.value };
  });
  record('note card is editable', noteCheck.skipped || noteCheck.value === 'verify-script', noteCheck.skipped ? 'no note card' : '', noteCheck.skipped);

  // Transcript-driven checks need a session card with at least one turn; if the
  // board has none, add the first session from the sidebar.
  const hasTranscript = await page.evaluate(() => Boolean([...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'))));
  if (!hasTranscript) {
    // Sessions live under workspace rows, which start collapsed.
    let rows = page.locator('[data-row-key^="session:"]');
    for (let attempt = 0; attempt < 3 && (await rows.count()) === 0; attempt += 1) {
      await page.waitForTimeout(400);
      const collapsed = page.locator('[data-row-key^="workspace:"][aria-expanded="false"]');
      if (await collapsed.count()) {
        await collapsed.first().click({ force: true }).catch(() => {});
        await page.waitForTimeout(700);
      }
    }
    if ((await rows.count()) === 0) rows = page.locator('[role="treeitem"][data-row-key^="session:"]');
    const count = await rows.count();
    if (count > 0) {
      await rows.first().hover();
      await page.waitForTimeout(400);
      const actions = page.locator('.iwb-row-action');
      const actionCount = await actions.count();
      for (let index = 0; index < actionCount; index += 1) {
        if (await actions.nth(index).isVisible()) {
          await actions.nth(index).click({ force: true });
          break;
        }
      }
      await page.waitForTimeout(5000);
    }
  }

  const transcript = await page.evaluate(() => {
    const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'));
    if (!card) return { skipped: true };
    const turns = card.querySelectorAll('.iwb-turn').length;
    card.querySelector('.iwb-turn')?.click();
    return { skipped: false, turns };
  });
  record('turn rows render', transcript.skipped || transcript.turns > 0, transcript.skipped ? 'no transcript card' : transcript.turns + ' turn(s)', transcript.skipped);

  if (!transcript.skipped) {
    // Another window may apply a layout between our click and the read, which
    // rebuilds the card. Re-click until the row stays expanded.
    let opened = false;
    for (let attempt = 0; attempt < 6 && !opened; attempt += 1) {
      await page.evaluate(() => {
        const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'));
        if (card && !card.querySelector('.iwb-turncard.open')) card.querySelector('.iwb-turn')?.click();
      });
      await page.waitForTimeout(600);
      opened = await page.evaluate(() => Boolean(document.querySelector('.iwb-turncard.open')));
    }
    const expanded = await page.evaluate(() => ({
      steps: document.querySelectorAll('.iwb-card .iwb-step').length,
      icons: document.querySelectorAll('.iwb-step .ico svg').length,
      positionsAligned: (() => {
        const card = document.querySelector('.iwb-turncard.open');
        if (!card) return null;
        const header = card.querySelector('.iwb-turn').getBoundingClientRect();
        const detail = card.querySelector('.iwb-turn-detail').getBoundingClientRect();
        return Math.abs(header.left - detail.left) < 2 && detail.top >= header.bottom - 1;
      })(),
    }));
    record('expanded turn lists steps', typeof expanded.positionsAligned === 'boolean');
    record('expanded details align under the row', expanded.positionsAligned === true);
    record('step rows keep activity icons', expanded.steps === 0 || expanded.icons === expanded.steps, expanded.icons + '/' + expanded.steps);

    const search = await page.evaluate(async () => {
      const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'));
      card.querySelector('[data-act="search"]')?.click();
      const input = card.querySelector('.iwb-search-input');
      if (!input) return { error: 'no search input' };
      input.focus();
      input.value = '的';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 400));
      return {
        hits: card.querySelectorAll('mark.iwb-hit').length,
        count: card.querySelector('.iwb-search-count')?.textContent || '',
      };
    });
    record('in-card search highlights matches', !search.error && search.hits > 0, search.count || search.error || '');

    const outline = await page.evaluate(async () => {
      const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'));
      card.querySelector('[data-act="outline"]')?.click();
      await new Promise((resolve) => setTimeout(resolve, 400));
      const rows = document.querySelectorAll('.iwb-outline-row').length;
      document.querySelector('.iwb-outline-row')?.click();
      return { rows };
    });
    record('turn outline opens', outline.rows > 0, outline.rows + ' row(s)');
  }

  // ── keyboard accessibility (A12) ──────────────────────────────────────
  const a11y = await page.evaluate(async () => {
    const canvas = document.querySelector('.iwb-canvas');
    const cards = [...document.querySelectorAll('.iwb-card')];
    const snapshot = () => {
      const focused = document.querySelector('.iwb-card.iwb-focus');
      return {
        focused: focused ? cards.indexOf(focused) : -1,
        tabIndexes: cards.map((card) => card.tabIndex),
        left: focused?.style.left || '',
        top: focused?.style.top || '',
      };
    };
    canvas.focus();
    await new Promise((resolve) => setTimeout(resolve, 250));
    const afterCanvasFocus = snapshot();
    return {
      canvasRole: canvas.getAttribute('role'),
      canvasTabIndex: canvas.tabIndex,
      cardRoles: cards.map((card) => card.getAttribute('role')),
      toastLive: document.querySelector('.iwb-toast')?.getAttribute('aria-live'),
      afterCanvasFocus,
    };
  });
  record('canvas exposes list semantics', a11y.canvasRole === 'list' && a11y.canvasTabIndex === 0);
  record('cards are list items', a11y.cardRoles.every((role) => role === 'listitem'), a11y.cardRoles.join(','));
  record('canvas focus lands on a card', a11y.afterCanvasFocus.focused >= 0, 'index ' + a11y.afterCanvasFocus.focused);
  record('roving tabindex keeps one card tabbable', a11y.afterCanvasFocus.tabIndexes.filter((value) => value === 0).length === 1);
  record('toasts announce politely', a11y.toastLive === 'polite');

  const keyboard = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    const before = document.querySelector('.iwb-card.iwb-focus');
    return { index: before ? cards.indexOf(before) : -1, count: cards.length };
  });
  if (keyboard.count > 1) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(350);
    const afterRight = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.iwb-card')];
      const focused = document.querySelector('.iwb-card.iwb-focus');
      return { index: focused ? cards.indexOf(focused) : -1 };
    });
    record('arrow keys move card focus', afterRight.index !== keyboard.index, `${keyboard.index} → ${afterRight.index}`);

    const beforeNudge = await page.evaluate(() => {
      const focused = document.querySelector('.iwb-card.iwb-focus');
      return { left: focused?.style.left, top: focused?.style.top };
    });
    await page.keyboard.down('Shift');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.up('Shift');
    await page.waitForTimeout(400);
    const afterNudge = await page.evaluate(() => {
      const focused = document.querySelector('.iwb-card.iwb-focus');
      return { left: focused?.style.left, top: focused?.style.top };
    });
    record('shift+arrow moves the card', beforeNudge.top !== afterNudge.top, `${beforeNudge.top} → ${afterNudge.top}`);
  } else {
    record('arrow keys move card focus', true, 'needs 2+ cards', true);
    record('shift+arrow moves the card', true, 'needs 2+ cards', true);
  }

  const enter = await page.evaluate(async () => {
    const focused = document.querySelector('.iwb-card[aria-current="true"]') || document.querySelector('.iwb-card.iwb-focus');
    if (!focused) return { skipped: true };
    focused.focus();
    await new Promise((resolve) => setTimeout(resolve, 120));
    focused.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { skipped: false, tag: document.activeElement?.tagName || '' };
  });
  record('enter focuses an input', enter.skipped || enter.tag === 'TEXTAREA', enter.skipped ? 'no card' : enter.tag, enter.skipped);

  const escape = await page.evaluate(async () => {
    const focused = document.querySelector('.iwb-card[aria-current="true"]') || document.querySelector('.iwb-card.iwb-focus');
    if (!focused) return { skipped: true };
    document.activeElement?.blur();
    focused.focus();
    await new Promise((resolve) => setTimeout(resolve, 120));
    focused.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { skipped: false, active: document.activeElement?.getAttribute('class') || '' };
  });
  record('escape returns to the canvas', escape.skipped || escape.active.includes('iwb-canvas'), escape.skipped ? 'no card' : '', escape.skipped);

  // Card shortcuts: '/' opens search, 't' opens the turn outline.
  const slash = await page.evaluate(async () => {
    const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'));
    if (!card) return { skipped: true };
    card.focus();
    await new Promise((resolve) => setTimeout(resolve, 120));
    card.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    const bar = card.querySelector('.iwb-search');
    return { skipped: false, open: Boolean(bar && !bar.hidden) };
  });
  record("'/' opens in-card search", slash.skipped || slash.open, slash.skipped ? 'no transcript card' : '', slash.skipped);

  if (!slash.skipped) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
  }

  const outlineKey = await page.evaluate(async () => {
    const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-turn'));
    if (!card) return { skipped: true };
    card.focus();
    await new Promise((resolve) => setTimeout(resolve, 120));
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 't', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { skipped: false, rows: document.querySelectorAll('.iwb-outline-row').length };
  });
  record("'t' opens the turn outline", outlineKey.skipped || outlineKey.rows > 0, outlineKey.skipped ? 'no transcript card' : outlineKey.rows + ' row(s)', outlineKey.skipped);

  // ── batch selection (B5) + arrange strategies (B9) ────────────────────
  const batch = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    if (cards.length < 2) return { skipped: true };
    cards[0].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, metaKey: true, button: 0, pointerId: 1 }));
    cards[1].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, metaKey: true, button: 0, pointerId: 1 }));
    await new Promise((resolve) => setTimeout(resolve, 250));
    const bar = document.querySelector('.iwb-batch');
    return {
      skipped: false,
      selected: document.querySelectorAll('.iwb-card.iwb-selected').length,
      barVisible: Boolean(bar && !bar.hidden),
      actions: bar ? bar.querySelectorAll('.iwb-btn').length : 0,
    };
  });
  record('meta-click selects cards', batch.skipped || batch.selected === 2, batch.skipped ? 'needs 2 cards' : batch.selected + ' selected', batch.skipped);
  record('batch bar appears', batch.skipped || batch.barVisible, batch.skipped ? 'needs 2 cards' : batch.actions + ' action(s)', batch.skipped);

  if (!batch.skipped) {
    const stacked = await page.evaluate(async () => {
      const button = [...document.querySelectorAll('.iwb-batch .iwb-btn')].find((node) => node.textContent.includes('叠'));
      button?.click();
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { badges: [...document.querySelectorAll('.iwb-stack-badge')].filter((node) => !node.hidden).length };
    });
    record('batch stack works', stacked.badges > 0, stacked.badges + ' badge(s)');
  } else {
    record('batch stack works', true, 'needs 2 cards', true);
  }

  const arrange = await page.evaluate(async () => {
    const button = [...document.querySelectorAll('.iwb-toolbar .iwb-btn')].find((node) => node.textContent.includes('排列'));
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 250));
    const rows = document.querySelectorAll('.iwb-arrange .iwb-model-row').length;
    const pop = document.querySelector('.iwb-arrange');
    pop?.remove();
    return { rows };
  });
  record('arrange menu offers strategies', arrange.rows >= 3, arrange.rows + ' option(s)');

  // ── cross-card quote (C1) ─────────────────────────────────────────────
  const quote = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    const source = cards.find((card) => card.querySelector('.iwb-msg'));
    if (!source || cards.length < 2) return { skipped: true, reason: 'needs a transcript card and a second card' };
    const messages = [...source.querySelectorAll('.iwb-msg')];
    const button = messages[messages.length - 1]?.querySelector('.iwb-msg-action');
    if (!button) return { skipped: true, reason: 'no quote action' };
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const rows = [...document.querySelectorAll('.iwb-ref .iwb-model-row')];
    const targetCount = rows.length;
    rows[0]?.click();
    // Another window may push a layout right after we insert; poll briefly.
    let quoted = false;
    for (let attempt = 0; attempt < 8 && !quoted; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const fields = [...document.querySelectorAll('.iwb-note-input, .iwb-foot textarea')];
      quoted = fields.some((field) => field.value.includes('> 「'));
    }
    return { skipped: false, targetCount, quoted };
  });
  record('message quote picker lists other cards', quote.skipped || quote.targetCount > 0, quote.skipped ? quote.reason : quote.targetCount + ' target(s)', quote.skipped);
  record('quote lands in the target composer', quote.skipped || quote.quoted, quote.skipped ? quote.reason : '', quote.skipped);

  // ── pipeline (C7) ─────────────────────────────────────────────────────
  // The pipeline needs two session cards; create one through the picker when absent.
  if ((await page.evaluate(() => document.querySelectorAll('.iwb-card [data-act="pipe"]').length)) < 2) {
    await page.evaluate(() => {
      const button = [...document.querySelectorAll('.iwb-toolbar .iwb-btn')].find((node) => node.textContent.includes('新建会话卡'));
      button?.click();
    });
    await page.waitForTimeout(700);
    await page.evaluate(() => document.querySelectorAll('.iwb-workspaces .iwb-model-row')[0]?.click());
    await page.waitForTimeout(3000);
  }

  const pipeline = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')].filter((card) => card.querySelector('[data-act="pipe"]'));
    if (cards.length < 2) return { skipped: true, reason: 'needs 2 session cards' };
    const source = cards[cards.length - 1];
    source.querySelector('[data-act="pipe"]')?.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const rows = [...document.querySelectorAll('.iwb-pipe .iwb-model-row')];
    const targets = rows.length;
    rows[0]?.click();
    await new Promise((resolve) => setTimeout(resolve, 400));
    const badge = [...document.querySelectorAll('.iwb-pipe-badge')].find((node) => !node.hidden);
    return { skipped: false, targets, badge: badge ? badge.textContent : '', closed: !document.querySelector('.iwb-pipe') };
  });
  record('pipeline menu lists downstream cards', pipeline.skipped || pipeline.targets > 0, pipeline.skipped ? pipeline.reason : pipeline.targets + ' target(s)', pipeline.skipped);
  record('pipeline badge shows the target', pipeline.skipped || Boolean(pipeline.badge), pipeline.skipped ? pipeline.reason : pipeline.badge, pipeline.skipped);

  // ── kanban grouping (C4) ──────────────────────────────────────────────
  const kanban = await page.evaluate(async () => {
    const button = [...document.querySelectorAll('.iwb-toolbar .iwb-btn')].find((node) => node.textContent.includes('看板'));
    if (!button) return { skipped: true, reason: 'no board button' };
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const options = document.querySelectorAll('.iwb-kanban .iwb-model-row').length;
    document.querySelectorAll('.iwb-kanban .iwb-model-row')[0]?.click();
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { skipped: false, options, heads: document.querySelectorAll('.iwb-kanban-head').length };
  });
  record('kanban menu offers groupings', kanban.skipped || kanban.options >= 3, kanban.skipped ? kanban.reason : kanban.options + ' option(s)', kanban.skipped);
  record('kanban renders column headers', kanban.skipped || kanban.heads > 0, kanban.skipped ? kanban.reason : kanban.heads + ' column(s)', kanban.skipped);

  const kanbanExit = await page.evaluate(async () => {
    const button = [...document.querySelectorAll('.iwb-toolbar .iwb-btn')].find((node) => node.textContent.includes('看板'));
    if (!button) return { skipped: true };
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const rows = [...document.querySelectorAll('.iwb-kanban .iwb-model-row')];
    rows.find((row) => row.textContent.includes('退出'))?.click();
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { skipped: false, heads: document.querySelectorAll('.iwb-kanban-head').length };
  });
  record('kanban exit clears the columns', kanbanExit.skipped || kanbanExit.heads === 0, kanbanExit.skipped ? 'no board button' : kanbanExit.heads + ' left', kanbanExit.skipped);

  // ── leave the workbench and come back (unmount safety) ────────────────
  const beforeLeave = pageErrors.length;
  await page.getByRole('button', { name: '插件' }).first().click().catch(() => {});
  await page.waitForTimeout(1200);
  const left = await page.evaluate(() => ({
    blank: document.body.innerText.trim().length < 20,
    workbenchGone: !document.querySelector('.iwb-root'),
  }));
  record('leaving the workbench keeps the app alive', !left.blank && left.workbenchGone, left.blank ? 'page blank' : '');
  await page.getByRole('button', { name: '灵感工作台' }).first().click().catch(() => {});
  await page.waitForTimeout(1800);
  const returned = await page.evaluate(() => Boolean(document.querySelector('.iwb-root')));
  record('returning to the workbench remounts it', returned);
  record('unmount/remount raises no errors', pageErrors.length === beforeLeave, pageErrors.slice(beforeLeave, beforeLeave + 2).join(' / '));

  // Regressions found during real-app verification.
  const batchHide = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.iwb-card')];
    if (cards.length < 2) return { skipped: true };
    cards[0].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, metaKey: true, button: 0, pointerId: 21 }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    const bar = document.querySelector('.iwb-batch');
    const shown = Boolean(bar && !bar.hidden && getComputedStyle(bar).display !== 'none');
    [...(bar?.querySelectorAll('.iwb-btn') || [])].find((b) => b.textContent.includes('取消选择'))?.click();
    await new Promise((resolve) => setTimeout(resolve, 300));
    const hiddenAfter = bar?.hidden !== false && getComputedStyle(bar).display === 'none';
    return { skipped: false, shown, hiddenAfter };
  });
  record('batch bar hides after clearing', batchHide.skipped || (batchHide.shown && batchHide.hiddenAfter), batchHide.skipped ? 'needs 2 cards' : `${batchHide.shown}/${batchHide.hiddenAfter}`, batchHide.skipped);

  const quoteOpen = await page.evaluate(async () => {
    const card = [...document.querySelectorAll('.iwb-card')].find((node) => node.querySelector('.iwb-msg'));
    if (!card) return { skipped: true };
    const msg = [...card.querySelectorAll('.iwb-msg')].reverse().find((m) => m.querySelector('.iwb-msg-action'));
    msg?.querySelector('.iwb-msg-action')?.click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const open = Boolean(document.querySelector('.iwb-ref'));
    document.querySelectorAll('.iwb-ref').forEach((node) => node.remove());
    return { skipped: false, open };
  });
  record('quote picker opens from a message', quoteOpen.skipped || quoteOpen.open, quoteOpen.skipped ? 'needs a transcript card' : '', quoteOpen.skipped);

  record('no page errors', pageErrors.length === 0, pageErrors.slice(0, 3).join(' / '));
} catch (error) {
  record('run completed', false, String(error).slice(0, 200));
} finally {
  await browser.close();
}

const failed = results.filter((entry) => !entry.ok);
const width = Math.max(...results.map((entry) => entry.name.length));
for (const entry of results) {
  const mark = entry.skipped ? 'SKIP' : entry.ok ? 'PASS' : 'FAIL';
  console.log(`${mark}  ${entry.name.padEnd(width)}  ${entry.detail}`);
}
const skipped = results.filter((entry) => entry.skipped).length;
console.log(`\n${results.length - failed.length - skipped}/${results.length - skipped} checks passed, ${skipped} skipped`);
process.exit(failed.length ? 1 : 0);
