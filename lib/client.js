window.__ModuleLoader__.load({id:'dsh-plugin-inspiration-workbench',factory(require){var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  PANEL_ID: () => PANEL_ID,
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);

// src/client/styles.css
var styles_default = `/* Inspiration workbench \u2014 scoped to .iwb-root; colours come from the host theme
   tokens so light/dark and future token renames need no plugin change. */

.iwb-root {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family);
  overflow: hidden;
}

/* \u2500\u2500 toolbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-unsupported {
  height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 24px; text-align: center;
}
.iwb-unsupported-title { font-size: 14px; font-weight: 600; }
.iwb-unsupported-body { font-size: 12px; line-height: 19px; color: var(--dsw-alias-label-tertiary); max-width: 420px; }
.iwb-toolbar {
  flex: 0 0 auto;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-bottom: .5px solid var(--dsw-alias-border-l1);
}
.iwb-titles { display: flex; flex-direction: column; gap: 1px; margin-right: auto; min-width: 0; }
.iwb-title { font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.iwb-counts { font-size: 11.5px; color: var(--dsw-alias-label-tertiary); font-variant-numeric: tabular-nums; }

.iwb-btn {
  display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 10px;
  border-radius: var(--dsw-radius-sm); border: .5px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-layer-1); font-size: 12.5px; color: var(--dsw-alias-label-secondary);
  transition: background .12s, border-color .12s, color .12s; white-space: nowrap; cursor: pointer;
}
.iwb-btn:hover { background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-border-l3); color: var(--dsw-alias-label-primary); }
.iwb-btn.primary { background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground); border-color: transparent; font-weight: 500; }
.iwb-btn.primary:hover { opacity: .9; background: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground); }
.iwb-btn.icon { width: 30px; padding: 0; justify-content: center; }
.iwb-toolbar-actions { display: flex; gap: 6px; flex: 0 0 auto; }
.iwb-hint { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--dsw-alias-label-caption); margin-right: 4px; }
.iwb-hint kbd {
  font-family: var(--dsw-font-family); font-size: 10px; padding: 1px 4px; border-radius: 4px;
  border: .5px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-tertiary);
}
@media (max-width: 1500px) { .iwb-hint { display: none; } }

/* \u2500\u2500 canvas \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-canvas {
  position: relative; flex: 1; min-height: 0; overflow: hidden; cursor: grab; touch-action: none;
  background-color: var(--dsw-alias-bg-base);
  background-image: radial-gradient(circle, color-mix(in srgb, var(--dsw-alias-label-primary) 12%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
}
.iwb-canvas.panning { cursor: grabbing; }
.iwb-world { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-origin: 0 0; will-change: transform; }

.iwb-zoom {
  position: absolute; right: 14px; bottom: 14px; display: flex; align-items: center; gap: 2px;
  background: var(--dsw-alias-bg-layer-1); border: .5px solid var(--dsw-alias-border-l2);
  border-radius: 10px; box-shadow: var(--dsw-shadow-lv2); padding: 3px;
}
.iwb-zoom button {
  width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center;
  color: var(--dsw-alias-label-secondary); background: none; border: 0; cursor: pointer;
}
.iwb-zoom button:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-zoom-value {
  min-width: 46px; text-align: center; font-size: 11.5px; color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums;
}

/* \u2500\u2500 card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-card {
  position: absolute; display: flex; flex-direction: column; min-width: 0; min-height: 0;
  background: var(--dsw-alias-bg-layer-1); border: .5px solid var(--dsw-alias-border-l2);
  border-radius: var(--dsw-radius-lg); box-shadow: var(--dsw-shadow-lv2); overflow: hidden;
  transition: box-shadow .16s ease, border-color .16s ease;
}
.iwb-card.iwb-in-stack { border-color: var(--dsw-alias-border-l3); }
.iwb-card.iwb-dragging { box-shadow: var(--dsw-shadow-lv3); transition: none; }
.iwb-card.iwb-flash { animation: iwb-flash 1.05s cubic-bezier(.2,.8,.3,1); }
@keyframes iwb-flash {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-label-deep-diving) 55%, transparent), var(--dsw-shadow-lv3); }
  60% { box-shadow: 0 0 0 6px transparent, var(--dsw-shadow-lv3); }
  100% { box-shadow: var(--dsw-shadow-lv2); }
}

.iwb-progress { position: absolute; left: 0; top: 0; height: 2px; width: 100%; overflow: hidden; opacity: 0; }
.iwb-card.iwb-running .iwb-progress { opacity: 1; }
.iwb-progress::before {
  content: ""; position: absolute; top: 0; left: 0; height: 100%; width: 36%; border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--dsw-alias-label-deep-diving), transparent);
  opacity: .55; animation: iwb-sweep 1.9s cubic-bezier(.45,.05,.55,.95) infinite;
}
@keyframes iwb-sweep { 0% { transform: translateX(-110%); } 100% { transform: translateX(320%); } }

.iwb-head {
  flex: 0 0 auto; height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 8px 0 12px;
  border-bottom: .5px solid var(--dsw-alias-border-l1); cursor: grab; user-select: none;
}
.iwb-dragging .iwb-head { cursor: grabbing; }
.iwb-dot { width: 7px; height: 7px; border-radius: 50%; flex: 0 0 auto; background: var(--dsw-alias-state-idle-primary); position: relative; }
.iwb-dot.running { background: var(--dsw-alias-label-deep-diving); }
.iwb-dot.running::after {
  content: ""; position: absolute; inset: -3px; border-radius: 50%;
  border: 1.5px solid var(--dsw-alias-label-deep-diving); opacity: .35; animation: iwb-pulse 1.8s ease-out infinite;
}
.iwb-dot.done { background: var(--dsw-alias-state-success-primary); }
.iwb-dot.error { background: var(--dsw-alias-state-error-primary); }
@keyframes iwb-pulse { 0% { transform: scale(.8); opacity: .45; } 70% { transform: scale(1.7); opacity: 0; } 100% { opacity: 0; } }

.iwb-card-title {
  font-size: 13px; font-weight: 500; flex: 1; min-width: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.iwb-meta {
  font-size: 10.5px; color: var(--dsw-alias-label-tertiary); border: .5px solid var(--dsw-alias-border-l2);
  border-radius: 5px; padding: 0 4px; line-height: 15px; flex: 0 1 auto; max-width: 96px; min-width: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  background: none; font-family: inherit; cursor: pointer;
  transition: background .12s, border-color .12s, color .12s;
}
.iwb-meta:hover:not([disabled]) {
  background: var(--dsw-alias-interactive-bg-hover);
  border-color: var(--dsw-alias-border-l3);
  color: var(--dsw-alias-label-primary);
}
.iwb-meta[disabled] { cursor: default; }

/* \u2500\u2500 model picker \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-layer { position: fixed; inset: 0; pointer-events: none; z-index: 50; }
.iwb-popover {
  position: fixed; pointer-events: auto; min-width: 248px; max-width: 320px; max-height: 62vh;
  overflow-y: auto; padding: 6px; background: var(--dsw-alias-bg-layer-1);
  border: .5px solid var(--dsw-alias-border-l2); border-radius: var(--dsw-radius-md);
  box-shadow: var(--dsw-shadow-lv3);
}
.iwb-popover-head { font-size: 11px; color: var(--dsw-alias-label-tertiary); padding: 5px 8px 7px; }
.iwb-popover-note { font-size: 11.5px; color: var(--dsw-alias-label-tertiary); padding: 6px 8px 10px; }
.iwb-model-group { font-size: 10.5px; color: var(--dsw-alias-label-tertiary); padding: 7px 8px 3px; }
.iwb-workspaces { min-width: 240px; max-height: 320px; overflow-y: auto; }
.iwb-workspace-row { gap: 6px; }
.iwb-status {
  flex: 0 0 auto; font-size: 10.5px; line-height: 16px; padding: 0 5px; border-radius: 5px;
  color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-bg-layer-2);
  border: .5px solid var(--dsw-alias-border-l2); white-space: nowrap;
}
.iwb-status.warning {
  color: var(--dsw-alias-state-warn-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 10%, transparent);
}
.iwb-dot.waiting { background: var(--dsw-alias-state-warn-primary); box-shadow: none; }
.iwb-card-workspace {
  flex: 0 1 auto; max-width: 78px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 10.5px; line-height: 16px; padding: 0 5px; border-radius: 5px;
  color: var(--dsw-alias-label-tertiary); background: var(--dsw-alias-bg-layer-2);
  border: .5px solid var(--dsw-alias-border-l2);
}
.iwb-model-sub {
  flex: 0 0 auto; font-size: 10px; color: var(--dsw-alias-label-caption);
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 5px; padding: 0 4px; line-height: 15px;
}
.iwb-model-back {
  width: 100%; text-align: left; background: none; border: 0; cursor: pointer;
  font-family: inherit; font-size: 11.5px; color: var(--dsw-alias-label-tertiary);
  padding: 4px 8px 6px; border-radius: 7px;
}
.iwb-model-back:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-fail {
  display: flex; flex-direction: column; gap: 3px; padding: 6px 10px;
  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, transparent);
  border-radius: 9px; background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 6%, transparent);
}
.iwb-fail-head { display: flex; align-items: center; gap: 6px; }
.iwb-fail-dot {
  width: 6px; height: 6px; border-radius: 50%; flex: 0 0 auto;
  background: var(--dsw-alias-state-error-primary);
}
.iwb-fail-title { font-size: 12.5px; font-weight: 500; color: var(--dsw-alias-state-error-primary); }
.iwb-fail-detail { font-size: 11.5px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.iwb-model-row {
  display: flex; align-items: center; gap: 8px; width: 100%; text-align: left;
  background: none; border: 0; border-radius: 8px; padding: 6px 8px; cursor: pointer;
  color: var(--dsw-alias-label-primary); font-family: inherit; font-size: 12.5px;
}
.iwb-model-row:hover { background: var(--dsw-alias-interactive-bg-hover); }
.iwb-model-row.current { background: var(--dsw-alias-interactive-bg-active); }
.iwb-model-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.iwb-model-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iwb-model-desc { font-size: 10.5px; color: var(--dsw-alias-label-tertiary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iwb-check { flex: 0 0 auto; font-size: 11px; color: var(--dsw-alias-label-deep-diving); width: 12px; }
.iwb-elapsed { font-size: 10px; color: var(--dsw-alias-label-caption); font-variant-numeric: tabular-nums; flex: 0 0 auto; opacity: .85; }
.iwb-stack-badge {
  font-size: 10px; line-height: 15px; padding: 0 4px; flex: 0 0 auto; color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-bg-layer-2); border: .5px solid var(--dsw-alias-border-l2); border-radius: 5px;
}
.iwb-actions {
  display: flex; gap: 4px; flex: 0 0 auto; opacity: .92; transition: opacity .12s;
  margin-left: 1px; padding-left: 6px; border-left: .5px solid var(--dsw-alias-border-l1);
}
.iwb-card:hover .iwb-actions,
.iwb-card:focus-within .iwb-actions,
.iwb-card.iwb-focus .iwb-actions { opacity: 1; }
.iwb-acts-more { display: none; }
.iwb-act-more { opacity: .9; }
.iwb-more { min-width: 190px; }
.iwb-more .iwb-model-row { gap: 8px; }
.iwb-more-ico { display: inline-flex; color: var(--dsw-alias-label-tertiary); }
.iwb-actions button {
  width: 23px; height: 23px; border-radius: 6px; display: grid; place-items: center;
  color: var(--dsw-alias-label-secondary); background: none; border: 0; cursor: pointer;
}
.iwb-actions button:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-actions svg { width: 15px; height: 15px; }
.iwb-actions button:focus-visible { outline: 2px solid var(--dsw-alias-label-deep-diving); outline-offset: -1px; }

.iwb-body {
  flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 12px 12px 4px;
  display: flex; flex-direction: column; gap: 9px; scrollbar-gutter: stable;
  overscroll-behavior: contain;
  mask-image: linear-gradient(to bottom, #000 calc(100% - 11px), transparent);
}
.iwb-foot { flex: 0 0 auto; padding: 7px 8px 8px; border-top: .5px solid var(--dsw-alias-border-l1); }
/* Keep the handle inside its own corner: a 16px box overlapped the send button's
   hit area, so dragging the send corner resized the card instead of sending. */
.iwb-resize { position: absolute; right: 0; bottom: 0; width: 12px; height: 12px; cursor: nwse-resize; opacity: 0; }
.iwb-card:hover .iwb-resize { opacity: 1; }
.iwb-resize::after {
  content: ""; position: absolute; right: 2px; bottom: 2px; width: 6px; height: 6px;
  border-right: 1.5px solid var(--dsw-alias-border-l4); border-bottom: 1.5px solid var(--dsw-alias-border-l4);
  border-bottom-right-radius: 2px;
}

/* \u2500\u2500 transcript \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-msg { display: block; font-size: 13px; line-height: 21px; white-space: pre-wrap; word-break: break-word; }
.iwb-msg.user {
  align-self: flex-end; max-width: 90%; background: var(--dsw-specific-bubble);
  border-radius: var(--dsw-radius-xl); padding: 7px 12px;
}
.iwb-msg.assistant { color: var(--dsw-alias-label-primary); }
.iwb-msg.assistant.iwb-cursor::after {
  content: ""; display: inline-block; width: 2px; height: 13px; vertical-align: -2px; margin-left: 2px;
  background: var(--dsw-alias-label-deep-diving); animation: iwb-blink 1s steps(2) infinite;
}
@keyframes iwb-blink { 50% { opacity: 0; } }
.iwb-msg.notice { font-size: 11.5px; color: var(--dsw-alias-label-tertiary); }
.iwb-msg.error {
  font-size: 11.5px; color: var(--dsw-alias-state-error-primary);
  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 32%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);
  border-radius: 8px; padding: 6px 9px;
}
.iwb-md-p { white-space: pre-wrap; }
.iwb-md-h { font-weight: 600; margin: 10px 0 4px; line-height: 1.4; }
.iwb-md-h1 { font-size: 15px; }
.iwb-md-h2 { font-size: 14px; }
.iwb-md-h3, .iwb-md-h4, .iwb-md-h5, .iwb-md-h6 { font-size: 13px; }
.iwb-md-hr { height: 0; border-top: .5px solid var(--dsw-alias-border-l2); margin: 10px 0; }
.iwb-md-quote {
  margin: 6px 0; padding: 2px 0 2px 10px; border-left: 2px solid var(--dsw-alias-border-l3);
  color: var(--dsw-alias-label-secondary);
}
.iwb-md-list { margin: 4px 0; padding-left: 20px; display: flex; flex-direction: column; gap: 2px; }
.iwb-md-list.nested { margin: 2px 0; padding-left: 18px; }
.iwb-md-task {
  display: inline-grid; place-items: center; width: 13px; height: 13px; margin-right: 6px;
  border: 1px solid var(--dsw-alias-border-l3); border-radius: 3px; font-size: 10px;
  color: var(--dsw-alias-label-primary-foreground); vertical-align: -2px;
}
.iwb-md-task.checked { background: var(--dsw-alias-label-deep-diving); border-color: transparent; }
.iwb-md-table {
  border-collapse: collapse; margin: 8px 0; font-size: 12px; display: block; overflow-x: auto;
  max-width: 100%;
}
.iwb-md-table th, .iwb-md-table td {
  border: .5px solid var(--dsw-alias-border-l2); padding: 4px 8px; text-align: left; vertical-align: top;
}
.iwb-md-table th { background: var(--dsw-alias-bg-layer-2); font-weight: 500; }
.iwb-md-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11.5px;
  padding: 1px 4px; border-radius: 4px; background: var(--dsw-alias-markdown-code-block);
}
.iwb-md-link { color: var(--dsw-alias-label-deep-diving); text-decoration: none; }
.iwb-md-link:hover { text-decoration: underline; }
.iwb-codeblock {
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 10px; overflow: hidden;
  background: var(--dsw-alias-markdown-code-block); margin: 8px 0;
}
.iwb-codeblock-head {
  display: flex; align-items: center; gap: 8px; padding: 4px 8px;
  border-bottom: .5px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-markdown-code-block-banner);
}
.iwb-codeblock-lang { flex: 1; font-size: 10.5px; color: var(--dsw-alias-label-tertiary); }
.iwb-codeblock-copy {
  border: 0; background: none; padding: 1px 6px; border-radius: 5px; cursor: pointer;
  font-family: inherit; font-size: 10.5px; color: var(--dsw-alias-label-tertiary);
}
.iwb-codeblock-copy:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-codeblock-body {
  margin: 0; padding: 8px 10px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px; line-height: 17px; overflow-x: auto; white-space: pre;
}
.iwb-reasoning { display: flex; gap: 7px; font-size: 11.5px; color: var(--dsw-alias-label-tertiary); font-style: italic; line-height: 19px; }
.iwb-turncard {
  border-bottom: .5px solid var(--dsw-alias-border-l2);
  padding-bottom: 7px; margin: 3px 0 9px;
}
.iwb-turn {
  display: flex; align-items: center; gap: 8px; width: 100%; text-align: left;
  padding: 2px 0; font-family: inherit; font-size: 12.5px; line-height: 19px;
  color: var(--dsw-alias-label-tertiary); cursor: pointer; user-select: none;
}
.iwb-turn .txt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iwb-turn .chev { display: grid; place-items: center; flex: 0 0 auto; color: var(--dsw-alias-label-caption); }
.iwb-turn:hover .txt { color: var(--dsw-alias-label-secondary); }
.iwb-turn.failed .txt { color: var(--dsw-alias-state-error-primary); }
.iwb-turn-meta {
  flex: 1 0 100%; font-size: 11px; color: var(--dsw-alias-label-caption);
  padding: 4px 0 0 2px; cursor: default;
}
.iwb-step {
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
  width: 100%; text-align: left; padding: 2px 0;
  font-family: inherit; font-size: 12.5px; line-height: 19px;
  color: var(--dsw-alias-label-tertiary);
  background: none; border: 0; cursor: pointer;
}
.iwb-step .lead {
  position: relative; width: 16px; height: 16px; flex: 0 0 auto;
  display: inline-flex; align-items: center; justify-content: center;
}
.iwb-step .ico,
.iwb-step .chev {
  position: absolute; inset: 0; display: inline-flex; align-items: center; justify-content: center;
  transition: opacity .1s;
}
.iwb-step .chev { opacity: 0; }
.iwb-step:hover .ico { opacity: 0; }
.iwb-step:hover .chev { opacity: 1; }
.iwb-step.open .ico { opacity: 0; }
.iwb-step.open .chev { opacity: 1; }
.iwb-step .txt {
  flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.iwb-step:hover .txt { color: var(--dsw-alias-label-secondary); }
.iwb-step.running .txt { color: var(--dsw-alias-label-secondary); }
.iwb-step.failed .txt { color: var(--dsw-alias-state-error-primary); }
.iwb-step.failed .ico { color: var(--dsw-alias-state-error-primary); }
.iwb-step-detail,
.iwb-step { min-width: 0; max-width: 100%; }
.iwb-step-detail {
  flex: 1 0 100%; display: flex; flex-direction: column; gap: 5px;
  margin-top: 6px; padding-top: 6px; border-top: .5px solid var(--dsw-alias-border-l1);
  cursor: default;
}
.iwb-tool {
  display: flex; flex-wrap: wrap; align-items: center; gap: 7px; width: 100%; text-align: left;
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 9px;
  background: var(--dsw-alias-markdown-code-block); padding: 5px 8px;
  font-family: inherit; font-size: 11px; line-height: 16px;
  color: var(--dsw-alias-label-secondary); cursor: pointer;
}
.iwb-tool:hover { border-color: var(--dsw-alias-border-l3); }
.iwb-tool .chev { display: grid; place-items: center; flex: 0 0 auto; color: var(--dsw-alias-label-caption); }
.iwb-tool-detail {
  flex: 1 0 100%; display: flex; flex-direction: column; gap: 4px;
  margin-top: 5px; padding-top: 6px; border-top: .5px solid var(--dsw-alias-border-l1);
  cursor: default; min-width: 0;
}
.iwb-tool-label { font-size: 10px; color: var(--dsw-alias-label-tertiary); }
.iwb-tool-detail .iwb-code { max-height: 220px; overflow: auto; }
.iwb-tool .n { color: var(--dsw-alias-label-primary); font-weight: 500; flex: 0 0 auto; }
.iwb-tool .a { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--dsw-alias-label-tertiary); }
.iwb-tool .s { font-size: 10px; color: var(--dsw-alias-label-caption); flex: 0 0 auto; }
.iwb-tool.done .s { color: var(--dsw-alias-state-success-primary); }
.iwb-tool.running .s { color: var(--dsw-alias-label-deep-diving); }
.iwb-tool.error .s { color: var(--dsw-alias-state-error-primary); }
.iwb-inline-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.5px; padding: 1px 4px; border-radius: 4px;
  background: var(--dsw-alias-markdown-code-block);
}
.iwb-code {
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 10px; background: var(--dsw-alias-markdown-code-block);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px; line-height: 17px;
  padding: 8px 10px; overflow-x: auto; white-space: pre;
}
.iwb-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; text-align: center; padding: 18px; }
.iwb-empty-title { font-size: 13px; font-weight: 500; }
.iwb-empty-sub { font-size: 11.5px; line-height: 18px; color: var(--dsw-alias-label-tertiary); max-width: 240px; }

/* \u2500\u2500 kanban columns \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-kanban-head {
  position: absolute; display: flex; align-items: center; gap: 6px;
  padding: 5px 10px; border-radius: 8px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 88%, transparent);
  border: .5px solid var(--dsw-alias-border-l2);
  font-size: 11.5px; color: var(--dsw-alias-label-secondary);
  white-space: nowrap; pointer-events: none;
}
.iwb-kanban-count {
  font-size: 10px; padding: 0 5px; border-radius: 999px;
  background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-tertiary);
}
.iwb-kanban { min-width: 200px; }
.iwb-btn.iwb-btn-active {
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 14%, transparent);
}

/* \u2500\u2500 canvas menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-toolbar .iwb-btn > span { max-width: 130px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iwb-canvas-menu { min-width: 260px; max-width: 320px; }
.iwb-canvas-form { display: flex; gap: 6px; padding: 4px 2px 8px; }
.iwb-canvas-input {
  flex: 1; min-width: 0; height: 26px; padding: 0 8px; box-sizing: border-box;
  border-radius: 6px; border: .5px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary);
  font-family: inherit; font-size: 12px; outline: none;
}
.iwb-canvas-input:focus { border-color: var(--dsw-alias-label-deep-diving); }
.iwb-canvas-list { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; max-height: 260px; overflow-y: auto; }
.iwb-canvas-row { display: flex; align-items: center; gap: 2px; border-radius: 7px; }
.iwb-canvas-row.current { background: var(--dsw-alias-interactive-bg-hover); }
.iwb-canvas-pick {
  flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 1px;
  padding: 5px 7px; border: 0; border-radius: 7px; background: none; cursor: pointer; text-align: left;
  font-family: inherit;
}
.iwb-canvas-pick:hover { background: var(--dsw-alias-interactive-bg-hover); }
.iwb-canvas-pick .iwb-model-name { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iwb-canvas-remove {
  flex: 0 0 auto; width: 22px; height: 22px; border: 0; border-radius: 6px;
  background: none; color: var(--dsw-alias-label-tertiary); cursor: pointer; font-size: 14px; line-height: 1;
}
.iwb-canvas-remove:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-state-error-primary); }

/* \u2500\u2500 approval card note \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-approval-note {
  font-size: 10.5px; line-height: 15px; color: var(--dsw-alias-label-tertiary);
  padding: 2px 0 4px;
}

/* \u2500\u2500 attachments in the user bubble \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-msg-attach-list { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
.iwb-msg-attach {
  display: inline-flex; align-items: center; gap: 4px; max-width: 100%;
  padding: 2px 7px; border-radius: 6px; font-size: 10.5px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary);
  border: .5px solid var(--dsw-alias-border-l1);
}
.iwb-msg-attach-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* \u2500\u2500 pipeline edges \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-links {
  position: absolute; left: 0; top: 0; width: 1px; height: 1px;
  overflow: visible; pointer-events: none; z-index: 1;
}
.iwb-links path.iwb-link {
  fill: none; stroke: var(--dsw-alias-label-deep-diving); stroke-width: 1.5;
  stroke-linecap: round; opacity: .5; pointer-events: stroke; cursor: pointer;
  transition: opacity .15s ease, stroke-width .15s ease;
}
.iwb-links path.iwb-link:hover { opacity: .95; stroke-width: 2.2; }
.iwb-links path.iwb-link-hit { fill: none; stroke: transparent; stroke-width: 14; pointer-events: stroke; cursor: pointer; }
.iwb-links path.iwb-link-temp {
  fill: none; stroke: var(--dsw-alias-label-deep-diving); stroke-width: 1.8;
  stroke-dasharray: 3 5; stroke-linecap: round; opacity: .75;
  animation: iwb-flow 1s linear infinite;
}
.iwb-links path.iwb-link-arrow {
  fill: var(--dsw-alias-label-deep-diving); opacity: .45; pointer-events: none;
}
.iwb-links path.iwb-link.iwb-link-active {
  stroke-width: 2; opacity: .8;
  stroke-dasharray: 7 7; animation: iwb-flow 1.1s linear infinite;
}
@keyframes iwb-flow { to { stroke-dashoffset: -28; } }
/* Connection handles: a whisper by default, a crisp ring on card hover. */
.iwb-port {
  position: absolute; width: 10px; height: 10px; border-radius: 50%;
  border: 0; background: var(--dsw-alias-label-deep-diving);
  opacity: .38; transform: scale(.9); cursor: crosshair; z-index: 3;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, transparent);
  transition: opacity .18s ease, transform .18s cubic-bezier(.2, .8, .3, 1.2), box-shadow .18s ease, background .18s ease;
}
.iwb-card:hover .iwb-port,
.iwb-card.iwb-focus .iwb-port {
  width: 12px; height: 12px; opacity: .95; transform: scale(1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-label-deep-diving) 16%, transparent);
}
.iwb-port:hover {
  background: var(--dsw-alias-label-deep-diving);
  transform: scale(1.25);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--dsw-alias-label-deep-diving) 20%, transparent);
}
.iwb-port::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--dsw-alias-bg-layer-1) 65%, transparent);
}
.iwb-port[data-side="right"] { right: -5px; top: calc(50% - 5px); }
.iwb-port[data-side="left"] { left: -5px; top: calc(50% - 5px); }
.iwb-port[data-side="top"] { top: -5px; left: calc(50% - 5px); }
.iwb-port[data-side="bottom"] { bottom: -5px; left: calc(50% - 5px); }
.iwb-card:hover .iwb-port[data-side="right"] { right: -6px; top: calc(50% - 6px); }
.iwb-card:hover .iwb-port[data-side="left"] { left: -6px; top: calc(50% - 6px); }
.iwb-card:hover .iwb-port[data-side="top"] { top: -6px; left: calc(50% - 6px); }
.iwb-card:hover .iwb-port[data-side="bottom"] { bottom: -6px; left: calc(50% - 6px); }

.iwb-card.iwb-link-target {
  outline: 1.5px solid color-mix(in srgb, var(--dsw-alias-label-deep-diving) 60%, transparent);
  outline-offset: 4px;
  box-shadow: 0 0 0 8px color-mix(in srgb, var(--dsw-alias-label-deep-diving) 7%, transparent);
}
.iwb-card-note.iwb-link-target { outline-color: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 55%, transparent); }
.iwb-link-menu { min-width: 230px; }
.iwb-link-remove .iwb-model-name { color: var(--dsw-alias-state-error-primary); }

/* \u2500\u2500 pipeline \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-pipe-badge {
  flex: 0 0 auto; font-size: 10px; padding: 1px 5px; border-radius: 5px;
  color: var(--dsw-alias-label-tertiary);
  background: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 10%, transparent);
  max-width: 92px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.iwb-pipe-badge[hidden] { display: none; }
.iwb-pipe { min-width: 240px; max-height: 320px; overflow-y: auto; }

/* \u2500\u2500 message actions + cross-card quote \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-msg { position: relative; }
.iwb-msg-actions {
  position: absolute; top: 2px; right: 2px; display: flex; gap: 2px;
  opacity: 0; transition: opacity .12s; pointer-events: none;
}
.iwb-msg:hover .iwb-msg-actions, .iwb-msg:focus-within .iwb-msg-actions { opacity: 1; pointer-events: auto; }
.iwb-msg-action {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; padding: 0; border: 0; border-radius: 5px;
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-tertiary);
  cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.08);
}
.iwb-msg-action:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.iwb-ref { min-width: 220px; max-height: 280px; overflow-y: auto; }

/* \u2500\u2500 batch selection + arrange menu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-batch {
  position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%);
  display: flex; align-items: center; gap: 6px; padding: 7px 10px;
  background: var(--dsw-alias-bg-layer-1); border: .5px solid var(--dsw-alias-border-l3);
  border-radius: calc(var(--dsw-radius-xl) - 2px); box-shadow: var(--dsw-shadow-lv2);
  z-index: 40;
}
.iwb-batch[hidden] { display: none; }
.iwb-batch-label { font-size: 11.5px; color: var(--dsw-alias-label-secondary); margin-right: 2px; white-space: nowrap; }
.iwb-batch .iwb-btn { height: 24px; font-size: 11px; }
.iwb-btn-danger { color: var(--dsw-alias-state-error-primary); }
.iwb-card.iwb-selected {
  outline: 2px solid var(--dsw-alias-state-informational-primary, var(--dsw-alias-label-deep-diving));
  outline-offset: 3px;
}
.iwb-card.iwb-selected .iwb-head { border-bottom-color: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 55%, transparent); }
.iwb-arrange { min-width: 190px; }

/* \u2500\u2500 narrow cards: keep the header breathable \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-card { container-type: inline-size; }
@container (max-width: 430px) {
  .iwb-head { gap: 6px; padding-right: 6px; }
  .iwb-card-workspace { display: none; }
  .iwb-meta { max-width: 96px; }
  .iwb-pipe-badge { max-width: 68px; }
  .iwb-actions { gap: 3px; padding-left: 4px; }
}
@container (max-width: 355px) {
  .iwb-elapsed { display: none; }
  .iwb-meta { max-width: 78px; }
  .iwb-actions button { width: 21px; height: 21px; }
}

/* \u2500\u2500 keyboard focus \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-card { outline: none; }
.iwb-card.iwb-focus,
.iwb-card:focus-visible {
  outline: 2px solid var(--dsw-alias-label-deep-diving);
  outline-offset: 3px;
  border-radius: calc(var(--dsw-radius-xl) + 2px);
}
.iwb-card.iwb-focus .iwb-head { border-bottom-color: var(--dsw-alias-label-deep-diving); }
.iwb-body:focus-visible,
.iwb-canvas:focus-visible {
  outline: 2px solid var(--dsw-alias-label-deep-diving);
  outline-offset: -2px;
  border-radius: 10px;
}
.iwb-canvas:focus-visible { outline-offset: -3px; }
.iwb-shortcuts { padding: 6px 8px 2px; border-top: .5px solid var(--dsw-alias-border-l1); margin-top: 4px; }
.iwb-shortcuts-title { font-size: 11px; color: var(--dsw-alias-label-tertiary); margin-bottom: 3px; }
.iwb-shortcuts-row { font-size: 10.5px; line-height: 16px; color: var(--dsw-alias-label-caption); }

/* \u2500\u2500 search + outline \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-search {
  flex: 0 0 auto; display: flex; align-items: center; gap: 8px;
  margin: 0 12px 6px; padding: 5px 8px; border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2); border: .5px solid var(--dsw-alias-border-l2);
}
.iwb-search[hidden] { display: none; }
.iwb-search-input {
  flex: 1; min-width: 0; border: 0; outline: none; background: none;
  font-family: inherit; font-size: 12px; color: var(--dsw-alias-label-primary);
}
.iwb-search-input::placeholder { color: var(--dsw-alias-label-caption); }
.iwb-search-count { flex: 0 0 auto; font-size: 10.5px; color: var(--dsw-alias-label-tertiary); }
mark.iwb-hit {
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 32%, transparent);
  color: inherit; border-radius: 2px; padding: 0 1px;
}
mark.iwb-hit.current { outline: 1px solid var(--dsw-alias-state-warn-primary); }
.iwb-outline { min-width: 240px; max-height: 320px; overflow-y: auto; }
.iwb-outline-row {
  display: flex; align-items: center; gap: 8px; width: 100%; text-align: left;
  padding: 6px 8px; border: 0; border-radius: 7px; background: none; cursor: pointer;
  font-family: inherit;
}
.iwb-outline-row:hover { background: var(--dsw-alias-interactive-bg-hover); }
.iwb-outline-row .iwb-model-main { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.iwb-outline-row .iwb-model-name {
  font-size: 12px; color: var(--dsw-alias-label-primary);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.iwb-outline-row .iwb-model-desc { font-size: 10.5px; color: var(--dsw-alias-label-tertiary); }
.iwb-turncard.iwb-flash { animation: iwb-flash 1.1s ease-out; }

/* \u2500\u2500 new: todo bar / unread / pin / note / truncation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-todo {
  flex: 0 0 auto; height: 24px; padding: 0 9px; margin-right: 4px;
  border-radius: 6px; border: .5px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 12%, transparent);
  color: var(--dsw-alias-state-warn-primary); font-family: inherit; font-size: 11px;
  cursor: pointer; white-space: nowrap;
}
.iwb-todo:hover { background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 20%, transparent); }
.iwb-unread {
  flex: 0 0 auto; width: 6px; height: 6px; border-radius: 50%;
  background: var(--dsw-alias-label-deep-diving); margin-right: 2px;
}
.iwb-card.iwb-pinned .iwb-card-title::after {
  content: '\xB7'; margin-left: 5px; color: var(--dsw-alias-label-caption);
}
.iwb-truncated {
  align-self: center; font-size: 11px; color: var(--dsw-alias-label-caption);
  padding: 2px 0 6px;
}
.iwb-note { display: flex; flex: 1; min-height: 0; }
.iwb-note-input {
  flex: 1; width: 100%; resize: none; border: 0; outline: none; background: none;
  font-family: inherit; font-size: 12.5px; line-height: 20px;
  color: var(--dsw-alias-label-primary); padding: 0;
  overscroll-behavior: contain;
}
.iwb-note-input::placeholder { color: var(--dsw-alias-label-caption); }
.iwb-card-note { background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 6%, var(--dsw-alias-bg-layer-1)); }
.iwb-attachment-retry {
  border: 0; background: none; padding: 0 2px; cursor: pointer;
  color: var(--dsw-alias-state-error-primary); font-family: inherit; font-size: 10.5px;
}
.iwb-settings-actions { display: flex; gap: 6px; padding: 4px 6px 2px; flex-wrap: wrap; }
.iwb-settings-actions .iwb-btn { height: 22px; font-size: 11px; }

/* \u2500\u2500 attachments \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-composer-wrap { display: flex; flex-direction: column; gap: 6px; }
.iwb-attachments { display: flex; flex-wrap: wrap; gap: 6px; }
.iwb-attachments[hidden] { display: none; }
.iwb-attachment {
  position: relative; display: flex; align-items: center; gap: 4px; max-width: 150px;
  padding: 3px 6px; border-radius: 8px; background: var(--dsw-alias-bg-layer-2);
  border: .5px solid var(--dsw-alias-border-l2); font-size: 11px; color: var(--dsw-alias-label-secondary);
}
.iwb-attachment.uploading { opacity: .7; }
.iwb-attachment.error { border-color: var(--dsw-alias-state-error-primary); }
.iwb-attachment img { width: 26px; height: 26px; object-fit: cover; border-radius: 5px; }
.iwb-attachment-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.iwb-attachment-state { color: var(--dsw-alias-label-caption); }
.iwb-attachment-x {
  display: grid; place-items: center; width: 15px; height: 15px; padding: 0; border: 0;
  border-radius: 4px; background: none; color: var(--dsw-alias-label-caption); cursor: pointer;
}
.iwb-attachment-x:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-attach {
  flex: 0 0 auto; display: grid; place-items: center; width: 24px; height: 24px; padding: 0;
  border: 0; border-radius: 7px; background: none; color: var(--dsw-alias-label-tertiary); cursor: pointer;
}
.iwb-attach:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-attach:disabled { opacity: .4; cursor: default; }
.iwb-card.iwb-drop { outline: 1.5px dashed var(--dsw-alias-label-deep-diving); outline-offset: -6px; }

/* \u2500\u2500 queued messages \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-queue[hidden] { display: none; }
.iwb-queue {
  flex: 0 0 auto; display: flex; flex-direction: column; gap: 2px;
  margin: 0 12px 6px; padding: 6px 8px; border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2); border: .5px solid var(--dsw-alias-border-l2);
  max-height: 116px; overflow-y: auto;
}
.iwb-queue-head { font-size: 10.5px; color: var(--dsw-alias-label-tertiary); padding: 0 2px 2px; }
.iwb-queue-row { display: flex; align-items: flex-start; gap: 6px; }
.iwb-queue-text {
  flex: 1; min-width: 0; font-size: 11.5px; line-height: 17px; color: var(--dsw-alias-label-secondary);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.iwb-queue-remove {
  flex: 0 0 auto; display: grid; place-items: center; width: 18px; height: 18px; padding: 0;
  border: 0; border-radius: 5px; background: none; color: var(--dsw-alias-label-caption);
  cursor: pointer; opacity: .75;
}
.iwb-queue-remove:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); opacity: 1; }

/* \u2500\u2500 pending question / approval \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-question {
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 12px;
  background: var(--dsw-alias-bg-layer-2); padding: 10px; display: flex;
  flex-direction: column; gap: 8px;
}
.iwb-question-head { font-size: 11px; color: var(--dsw-alias-label-tertiary); }
.iwb-question-item { display: flex; flex-direction: column; gap: 6px; }
.iwb-question-header { font-size: 11px; color: var(--dsw-alias-label-tertiary); }
.iwb-question-text { font-size: 12.5px; line-height: 19px; color: var(--dsw-alias-label-primary); }
.iwb-question-options { display: flex; flex-direction: column; gap: 5px; }
.iwb-question-option {
  text-align: left; font-family: inherit; font-size: 12px; line-height: 17px;
  padding: 6px 10px; border-radius: 8px; cursor: pointer;
  border: .5px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-secondary);
}
.iwb-question-option:hover { border-color: var(--dsw-alias-border-l3); color: var(--dsw-alias-label-primary); }
.iwb-question-option.selected {
  border-color: var(--dsw-alias-label-deep-diving);
  background: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 10%, transparent);
  color: var(--dsw-alias-label-primary);
}
.iwb-question-custom {
  border: .5px solid var(--dsw-alias-border-l4); border-radius: 8px; padding: 6px 9px;
  font-family: inherit; font-size: 12px; background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary); outline: none;
}
.iwb-question-custom::placeholder { color: var(--dsw-alias-label-caption); }
.iwb-question-actions { display: flex; gap: 6px; }
.iwb-approval-live {
  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, transparent);
  border-radius: 11px; padding: 10px; display: flex; flex-direction: column; gap: 6px;
  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, transparent);
}
.iwb-approval-live-head { font-size: 11px; color: var(--dsw-alias-state-warn-primary); }
.iwb-approval-live-title { font-size: 12.5px; line-height: 19px; color: var(--dsw-alias-label-primary); }
.iwb-approval-live-reason { font-size: 11.5px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.iwb-settings { min-width: 220px; }
.iwb-settings-row { display: flex; align-items: center; gap: 8px; padding: 6px 8px; cursor: pointer; border-radius: 7px; }
.iwb-settings-row:hover { background: var(--dsw-alias-interactive-bg-hover); }
.iwb-settings-row input { accent-color: var(--dsw-alias-label-deep-diving); }
.iwb-settings-label { font-size: 12px; color: var(--dsw-alias-label-primary); }
.iwb-approval {
  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary) 40%, transparent);
  border-radius: 12px; background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, transparent);
  padding: 10px; display: flex; flex-direction: column; gap: 6px;
}
.iwb-approval-head { font-size: 12px; font-weight: 500; color: var(--dsw-alias-state-warn-primary); }
.iwb-approval-row { font-size: 12px; color: var(--dsw-alias-label-secondary); }
.iwb-approval-reason { font-size: 11px; color: var(--dsw-alias-label-tertiary); margin-top: 2px; }

/* \u2500\u2500 composer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-composer {
  display: flex; align-items: flex-end; gap: 5px; border: .5px solid var(--dsw-alias-border-l4);
  border-radius: 14px; padding: 5px 5px 5px 10px; background: var(--dsw-alias-bg-layer-1);
  transition: border-color .12s, box-shadow .12s;
}
.iwb-composer:focus-within { border-color: var(--dsw-alias-label-deep-diving); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-label-deep-diving) 12%, transparent); }
.iwb-composer textarea {
  flex: 1; min-width: 0; border: 0; background: none; resize: none; outline: none; padding: 3px 0;
  font: inherit; font-size: 13px; line-height: 20px; max-height: 88px; color: var(--dsw-alias-label-primary);
}
.iwb-composer textarea::placeholder { color: var(--dsw-alias-label-caption); }
.iwb-send {
  width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; flex: 0 0 auto;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-caption);
  border: 0; cursor: pointer; transition: background .12s, color .12s;
}
.iwb-send.ready { background: var(--dsw-alias-label-deep-diving); color: #fff; }
.iwb-send.stop { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-secondary); border: .5px solid var(--dsw-alias-border-l2); }

/* \u2500\u2500 sidebar row action \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-row-action {
  width: 22px; height: 22px; border-radius: 6px; display: grid; place-items: center;
  color: var(--dsw-alias-label-tertiary); background: none; border: 0; cursor: pointer;
}
.iwb-row-action:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }

/* \u2500\u2500 toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-toast {
  position: absolute; left: 50%; bottom: 26px; transform: translate(-50%, 10px);
  background: var(--dsw-alias-label-primary); color: var(--dsw-alias-bg-base);
  font-size: 12px; padding: 8px 14px; border-radius: 10px; box-shadow: var(--dsw-shadow-lv3);
  opacity: 0; pointer-events: none; transition: opacity .16s, transform .16s; max-width: 70%; text-align: center; z-index: 40;
}
.iwb-toast.show { opacity: 1; transform: translate(-50%, 0); }

.iwb-batch:not([hidden]) ~ .iwb-toast { bottom: 62px; }

/* \u2500\u2500 real pipeline delivery states \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-links path.iwb-link-delivered { stroke: var(--dsw-alias-state-success-primary); opacity: .82; }
.iwb-links path.iwb-link-failed { stroke: var(--dsw-alias-state-error-primary); opacity: .9; }
.iwb-links path.iwb-link-drafted { stroke: var(--dsw-alias-state-warn-primary); opacity: .85; }
.iwb-links path.iwb-link-delivering {
  stroke: var(--dsw-alias-label-deep-diving); opacity: .95;
  stroke-dasharray: 5 5; animation: iwb-flow-dash .7s linear infinite;
}
.iwb-links path.iwb-link-waiting { opacity: .46; }
@keyframes iwb-flow-dash { to { stroke-dashoffset: -10; } }
.iwb-btn-icon { width: 28px; padding-inline: 0; justify-content: center; flex: 0 0 auto; }

/* \u2500\u2500 accessible native confirmation dialog \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-confirm-dialog {
  width: min(440px, calc(100vw - 32px)); padding: 0; border: .5px solid var(--dsw-alias-border-l2);
  border-radius: 16px; background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary);
  box-shadow: var(--dsw-shadow-lv4);
}
.iwb-confirm-dialog::backdrop { background: rgba(15, 17, 21, .28); backdrop-filter: blur(2px); }
.iwb-confirm-form { padding: 22px; display: flex; flex-direction: column; gap: 14px; }
.iwb-confirm-form h2 { margin: 0; font-size: 18px; line-height: 26px; font-weight: 600; }
.iwb-confirm-form p { margin: 0; font-size: 13px; line-height: 21px; color: var(--dsw-alias-label-secondary); }
.iwb-confirm-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--dsw-alias-label-tertiary); }
.iwb-confirm-form input {
  height: 36px; padding: 0 10px; border: .5px solid var(--dsw-alias-border-l4); border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px;
}
.iwb-confirm-form input:focus { outline: 2px solid color-mix(in srgb, var(--dsw-alias-label-deep-diving) 28%, transparent); border-color: var(--dsw-alias-label-deep-diving); }
.iwb-confirm-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
.iwb-confirm-actions button {
  min-height: 32px; padding: 0 12px; border: .5px solid var(--dsw-alias-border-l2); border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); font: inherit; font-size: 12px; cursor: pointer;
}
.iwb-confirm-actions button:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.iwb-confirm-actions button.primary { background: var(--dsw-alias-label-deep-diving); color: #fff; border-color: transparent; }
.iwb-confirm-actions button:focus-visible { outline: 2px solid var(--dsw-alias-label-deep-diving); outline-offset: 2px; }

/* \u2500\u2500 dual view: canvas / task \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-titles { margin-right: 12px; }
.iwb-mode-switch {
  display: inline-flex; align-items: center; gap: 2px; margin-right: auto; padding: 2px;
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 9px; background: var(--dsw-alias-bg-layer-2);
}
.iwb-mode-tab {
  height: 24px; min-width: 46px; padding: 0 10px; border: 0; border-radius: 6px;
  background: transparent; color: var(--dsw-alias-label-tertiary); font: inherit; font-size: 11.5px; cursor: pointer;
}
.iwb-mode-tab:hover { color: var(--dsw-alias-label-primary); }
.iwb-mode-tab.active { background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); box-shadow: var(--dsw-shadow-lv1); }
.iwb-mode-tab:focus-visible { outline: 2px solid var(--dsw-alias-label-deep-diving); outline-offset: 1px; }
.iwb-canvas[hidden], .iwb-task-view[hidden], .iwb-toolbar [hidden] { display: none !important; }
@media (max-width: 760px) {
  .iwb-mode-tab { min-width: 38px; padding-inline: 7px; }
}



/* \u2500\u2500 Markdown notes and file cards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.iwb-note-toggle { display: flex; justify-content: flex-end; gap: 4px; margin-bottom: 8px; }
.iwb-note-toggle-button {
  min-height: 24px; padding: 0 8px; border: .5px solid var(--dsw-alias-border-l2); border-radius: 6px;
  background: transparent; color: var(--dsw-alias-label-tertiary); font: inherit; font-size: 10.5px; cursor: pointer;
}
.iwb-note-toggle-button.active { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.iwb-note-toggle-button:focus-visible { outline: 2px solid var(--dsw-alias-label-deep-diving); }
.iwb-note-preview { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; font-size: 12.5px; line-height: 1.7; }
.iwb-note-preview h1, .iwb-note-preview h2, .iwb-note-preview h3, .iwb-note-preview h4 { margin: 0 0 10px; line-height: 1.35; }
.iwb-note-preview h1 { font-size: 18px; }
.iwb-note-preview h2 { font-size: 16px; }
.iwb-note-preview h3 { font-size: 14px; }
.iwb-note-preview h4 { font-size: 12.5px; }
.iwb-note-preview p, .iwb-note-preview .iwb-md-p { margin: 0 0 10px; }
.iwb-note-preview ul, .iwb-note-preview ol { margin: 6px 0 12px 20px; padding: 0; }
.iwb-note-preview li { margin: 4px 0; }
.iwb-note-preview .iwb-codeblock { margin: 8px 0 12px; }
.iwb-note-preview .iwb-md-code { padding: 1px 4px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2); }
.iwb-note-preview .iwb-md-link { color: var(--dsw-alias-label-deep-diving); text-decoration: underline; }
.iwb-note-preview .iwb-md-quote { margin: 8px 0; padding-left: 10px; border-left: 2px solid var(--dsw-alias-border-l3); color: var(--dsw-alias-label-secondary); }
.iwb-note-input[hidden], .iwb-note-preview[hidden] { display: none !important; }
.iwb-file-body { height: 100%; display: flex; flex-direction: column; gap: 10px; align-items: stretch; }
.iwb-file-thumb { width: 100%; height: 220px; object-fit: contain; border-radius: 9px; background: var(--dsw-alias-bg-layer-2); }
.iwb-file-icon {
  height: 120px; display: grid; place-items: center; border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-tertiary);
  font-size: 22px; font-weight: 650; letter-spacing: .08em;
}
.iwb-file-name { font-size: 13px; font-weight: 600; line-height: 1.45; word-break: break-word; }
.iwb-file-meta { font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-tertiary); word-break: break-all; }
.iwb-file-open { align-self: flex-start; margin-top: auto; }
.iwb-file-preview-button { width: 22px; height: 22px; display: grid; place-items: center; }
.iwb-file-dialog {
  width: min(980px, calc(100vw - 40px)); height: min(780px, calc(100vh - 40px)); padding: 0;
  border: .5px solid var(--dsw-alias-border-l2); border-radius: 16px;
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary); box-shadow: var(--dsw-shadow-lv4);
}
.iwb-file-dialog::backdrop { background: rgba(15,17,21,.35); backdrop-filter: blur(3px); }
.iwb-file-dialog-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; padding: 18px 20px 12px; border-bottom: .5px solid var(--dsw-alias-border-l1); }
.iwb-file-dialog-head h2 { margin: 0 0 5px; font-size: 17px; line-height: 1.4; word-break: break-word; }
.iwb-file-dialog-head p { margin: 0; font-size: 11px; color: var(--dsw-alias-label-tertiary); }
.iwb-file-dialog-close { width: 28px; height: 28px; border: 0; border-radius: 7px; background: transparent; color: var(--dsw-alias-label-secondary); font-size: 22px; cursor: pointer; }
.iwb-file-dialog-close:hover { background: var(--dsw-alias-interactive-bg-hover); }
.iwb-file-dialog-body { height: calc(100% - 126px); overflow: auto; padding: 16px 20px; overscroll-behavior: contain; }
.iwb-file-preview-image { display: block; max-width: 100%; max-height: 100%; margin: auto; object-fit: contain; border-radius: 10px; }
.iwb-file-preview-frame { width: 100%; height: 100%; min-height: 520px; border: .5px solid var(--dsw-alias-border-l2); border-radius: 10px; background: white; }
.iwb-file-preview-text { margin: 0; white-space: pre-wrap; word-break: break-word; font: 12px/1.65 var(--dsw-font-mono, monospace); color: var(--dsw-alias-label-primary); }
.iwb-file-dialog-foot { display: flex; justify-content: flex-end; padding: 10px 20px 14px; border-top: .5px solid var(--dsw-alias-border-l1); }
.iwb-file-dialog-foot a { text-decoration: none; }

@media (prefers-reduced-motion: reduce) {
  .iwb-links path.iwb-link-delivering { animation: none; }
}
`;

// src/client/task-view.css
var task_view_default = '/* Task center \u2014 scoped to the workbench and its native top-layer dialogs. */\n\n.iwb-root.iwb-task-view {\n  min-width: 0;\n  min-height: 0;\n  background: var(--dsw-alias-bg-base);\n}\n\n.iwb-task-view .iwb-task-toolbar {\n  gap: 12px;\n}\n\n.iwb-task-toolbar .iwb-toolbar-actions {\n  gap: 6px;\n}\n\n.iwb-task-controls {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n  padding: 9px 14px;\n  border-bottom: .5px solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n}\n\n.iwb-task-control {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n}\n\n.iwb-task-control-label,\n.iwb-task-editor-label,\n.iwb-task-field-label {\n  flex: 0 0 auto;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 16px;\n}\n\n.iwb-task-select-control,\n.iwb-task-input,\n.iwb-task-textarea {\n  min-width: 0;\n  border: .5px solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-sm);\n  outline: none;\n  background: var(--dsw-alias-bg-layer-1);\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  font-size: 12px;\n  transition: border-color .12s, background .12s, box-shadow .12s;\n}\n\n.iwb-task-select-control {\n  height: 30px;\n  max-width: 210px;\n  padding: 0 27px 0 9px;\n  cursor: pointer;\n}\n\n.iwb-task-select-control:hover,\n.iwb-task-input:hover,\n.iwb-task-textarea:hover {\n  border-color: var(--dsw-alias-border-l3);\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.iwb-task-select-control:focus-visible,\n.iwb-task-input:focus-visible,\n.iwb-task-textarea:focus-visible {\n  border-color: var(--dsw-alias-label-deep-diving);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-label-deep-diving) 15%, transparent);\n}\n\n.iwb-task-refresh {\n  margin-left: auto;\n}\n\n.iwb-task-alert {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin: 10px 14px 0;\n  padding: 9px 10px 9px 12px;\n  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 32%, transparent);\n  border-radius: var(--dsw-radius-md);\n  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);\n  color: var(--dsw-alias-state-error-primary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.iwb-task-alert[hidden],\n.iwb-task-dialog-error[hidden] {\n  display: none;\n}\n\n.iwb-task-alert-text {\n  flex: 1;\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-alert .iwb-btn.icon {\n  flex: 0 0 auto;\n  width: 24px;\n  height: 24px;\n  margin: -3px -3px -3px 0;\n  border-color: transparent;\n  background: transparent;\n  color: inherit;\n}\n\n.iwb-task-layout {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(270px, 350px) minmax(0, 1fr);\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n\n.iwb-task-list-panel {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 0;\n  border-right: .5px solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-base);\n}\n\n.iwb-task-list-head {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  min-height: 36px;\n  padding: 0 13px;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10.5px;\n  font-variant-numeric: tabular-nums;\n}\n\n.iwb-task-list {\n  flex: 1;\n  min-height: 0;\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 0 8px 12px;\n  scrollbar-gutter: stable;\n}\n\n.iwb-task-list-item {\n  margin: 3px 0;\n  border-radius: var(--dsw-radius-md);\n}\n\n.iwb-task-list-select {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  width: 100%;\n  min-width: 0;\n  padding: 12px;\n  border: .5px solid var(--dsw-alias-border-l1);\n  border-radius: var(--dsw-radius-md);\n  outline: none;\n  background: var(--dsw-alias-bg-layer-1);\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: background .12s, border-color .12s, box-shadow .12s;\n}\n\n.iwb-task-list-select:hover {\n  border-color: var(--dsw-alias-border-l3);\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.iwb-task-list-item.is-selected .iwb-task-list-select {\n  border-color: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 55%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 6%, var(--dsw-alias-bg-layer-1));\n  box-shadow: inset 2px 0 0 var(--dsw-alias-label-deep-diving);\n}\n\n.iwb-task-list-select:focus-visible {\n  border-color: var(--dsw-alias-label-deep-diving);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-label-deep-diving) 16%, transparent);\n}\n\n.iwb-task-list-top {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  min-width: 0;\n}\n\n.iwb-task-list-title {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  color: var(--dsw-alias-label-primary);\n  font-size: 12.5px;\n  font-weight: 550;\n  line-height: 18px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.iwb-task-list-summary {\n  display: -webkit-box;\n  overflow: hidden;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11.5px;\n  line-height: 17px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-list-meta {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10px;\n  line-height: 15px;\n}\n\n.iwb-task-list-time {\n  margin-left: auto;\n  flex: 0 0 auto;\n  font-variant-numeric: tabular-nums;\n}\n\n.iwb-task-status,\n.iwb-task-priority,\n.iwb-task-pending-badge,\n.iwb-task-plan-kind {\n  display: inline-flex;\n  align-items: center;\n  flex: 0 0 auto;\n  min-height: 18px;\n  padding: 1px 6px;\n  border: .5px solid var(--dsw-alias-border-l2);\n  border-radius: 5px;\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 9.5px;\n  font-weight: 450;\n  line-height: 14px;\n  white-space: nowrap;\n}\n\n.iwb-task-status.is-needs_input,\n.iwb-task-status.is-blocked,\n.iwb-task-priority.is-urgent {\n  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 32%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.iwb-task-status.is-review,\n.iwb-task-priority.is-high,\n.iwb-task-pending-badge {\n  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 35%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 9%, transparent);\n  color: var(--dsw-alias-state-warn-primary);\n}\n\n.iwb-task-status.is-running {\n  border-color: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 35%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 8%, transparent);\n  color: var(--dsw-alias-label-deep-diving);\n}\n\n.iwb-task-status.is-done {\n  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 35%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 8%, transparent);\n  color: var(--dsw-alias-state-success-primary);\n}\n\n.iwb-task-detail {\n  min-width: 0;\n  min-height: 0;\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 24px;\n  background: var(--dsw-alias-bg-base);\n}\n\n.iwb-task-detail-inner {\n  width: 100%;\n  max-width: 900px;\n  margin: 0 auto;\n}\n\n.iwb-task-detail-head {\n  min-width: 0;\n  padding-bottom: 17px;\n}\n\n.iwb-task-detail-badges {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-bottom: 9px;\n}\n\n.iwb-task-detail-title {\n  margin: 0;\n  color: var(--dsw-alias-label-primary);\n  font-size: 21px;\n  font-weight: 600;\n  letter-spacing: -.025em;\n  line-height: 1.35;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-detail-time {\n  margin-top: 7px;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10.5px;\n  line-height: 16px;\n}\n\n.iwb-task-detail-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  padding: 13px 0;\n  border-top: .5px solid var(--dsw-alias-border-l1);\n  border-bottom: .5px solid var(--dsw-alias-border-l1);\n}\n\n.iwb-task-view .iwb-btn:disabled,\n.iwb-task-dialog .iwb-btn:disabled {\n  opacity: .45;\n  cursor: default;\n  pointer-events: none;\n}\n\n.iwb-task-view .iwb-btn:focus-visible,\n.iwb-task-dialog .iwb-btn:focus-visible {\n  outline: 2px solid var(--dsw-alias-label-deep-diving);\n  outline-offset: 2px;\n}\n\n.iwb-task-view .iwb-task-accept {\n  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 40%, transparent);\n  color: var(--dsw-alias-state-success-primary);\n}\n\n.iwb-task-view .iwb-task-danger,\n.iwb-task-dialog .iwb-task-danger {\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.iwb-task-dialog .iwb-task-danger:not(:disabled) {\n  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, var(--dsw-alias-bg-layer-1));\n}\n\n.iwb-task-editors {\n  display: flex;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding: 13px 0 4px;\n}\n\n.iwb-task-editor {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.iwb-task-editor .iwb-task-select-control {\n  min-width: 116px;\n}\n\n.iwb-task-editor-spacer {\n  flex: 1;\n}\n\n.iwb-task-goal,\n.iwb-task-summary {\n  padding: 18px 0 4px;\n}\n\n.iwb-task-goal p,\n.iwb-task-summary p {\n  margin: 0;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12.5px;\n  line-height: 1.75;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-goal p {\n  color: var(--dsw-alias-label-primary);\n}\n\n.iwb-task-section {\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: .5px solid var(--dsw-alias-border-l1);\n}\n\n.iwb-task-section-title {\n  margin: 0 0 10px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  font-weight: 550;\n  letter-spacing: .02em;\n  line-height: 16px;\n}\n\n.iwb-task-fact-list,\n.iwb-task-event-list,\n.iwb-task-plan-edge-list {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.iwb-task-fact {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  min-width: 0;\n  padding: 9px 10px;\n  border: .5px solid var(--dsw-alias-border-l1);\n  border-radius: var(--dsw-radius-sm);\n  background: var(--dsw-alias-bg-layer-1);\n}\n\n.iwb-task-fact-marker {\n  flex: 0 0 auto;\n  width: 6px;\n  height: 6px;\n  margin-top: 6px;\n  border-radius: 50%;\n  background: var(--dsw-alias-label-caption);\n}\n\n.iwb-task-pending-section .iwb-task-fact-marker {\n  background: var(--dsw-alias-state-warn-primary);\n}\n\n.iwb-task-deliverables .iwb-task-fact-marker {\n  background: var(--dsw-alias-state-success-primary);\n}\n\n.iwb-task-fact-content {\n  flex: 1;\n  min-width: 0;\n}\n\n.iwb-task-fact-text {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-fact-detail {\n  margin-top: 3px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 17px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-small-action {\n  flex: 0 0 auto;\n  height: 25px !important;\n  margin: -3px -3px -3px 0;\n  font-size: 11px !important;\n}\n\n.iwb-task-inline-empty {\n  color: var(--dsw-alias-label-caption);\n  font-size: 11.5px;\n  line-height: 18px;\n}\n\n.iwb-task-links-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 20px;\n}\n\n.iwb-task-chip-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.iwb-task-chip {\n  width: auto;\n  max-width: 100%;\n  height: 27px !important;\n  font-size: 10.5px !important;\n}\n\n.iwb-task-chip span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.iwb-task-chip.is-static {\n  display: inline-flex;\n  padding: 5px 8px;\n  border: .5px solid var(--dsw-alias-border-l1);\n  border-radius: var(--dsw-radius-sm);\n  background: var(--dsw-alias-bg-layer-1);\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 10.5px;\n  line-height: 15px;\n}\n\n.iwb-task-source {\n  display: flex;\n  gap: 8px;\n  margin-top: 20px;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10.5px;\n  line-height: 17px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-source span:first-child {\n  flex: 0 0 auto;\n}\n\n.iwb-task-event {\n  position: relative;\n  display: flex;\n  gap: 10px;\n  min-width: 0;\n}\n\n.iwb-task-event:not(:last-child)::before {\n  content: "";\n  position: absolute;\n  left: 3px;\n  top: 12px;\n  bottom: -9px;\n  width: 1px;\n  background: var(--dsw-alias-border-l1);\n}\n\n.iwb-task-event-marker {\n  position: relative;\n  z-index: 1;\n  flex: 0 0 auto;\n  width: 7px;\n  height: 7px;\n  margin-top: 5px;\n  border: 2px solid var(--dsw-alias-bg-base);\n  border-radius: 50%;\n  background: var(--dsw-alias-label-caption);\n  box-shadow: 0 0 0 1px var(--dsw-alias-border-l2);\n}\n\n.iwb-task-event-body {\n  flex: 1;\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  min-width: 0;\n}\n\n.iwb-task-event-title {\n  flex: 1;\n  min-width: 0;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 11.5px;\n  line-height: 17px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-event-time {\n  flex: 0 0 auto;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10px;\n  font-variant-numeric: tabular-nums;\n}\n\n.iwb-task-event-note {\n  margin-top: 10px;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10.5px;\n}\n\n.iwb-task-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  min-height: 210px;\n  padding: 24px 18px;\n  color: var(--dsw-alias-label-tertiary);\n  text-align: center;\n}\n\n.iwb-task-list .iwb-task-state {\n  min-height: 240px;\n  padding-inline: 12px;\n}\n\n.iwb-task-state-title {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12.5px;\n  font-weight: 500;\n  line-height: 19px;\n}\n\n.iwb-task-state.is-error .iwb-task-state-title {\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.iwb-task-state-body {\n  max-width: 340px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11.5px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-state .iwb-btn {\n  margin-top: 5px;\n}\n\n.iwb-task-spinner {\n  width: 18px;\n  height: 18px;\n  margin-bottom: 4px;\n  border: 1.5px solid var(--dsw-alias-border-l2);\n  border-top-color: var(--dsw-alias-label-deep-diving);\n  border-radius: 50%;\n  animation: iwb-task-spin .8s linear infinite;\n}\n\n@keyframes iwb-task-spin {\n  to { transform: rotate(360deg); }\n}\n\n/* Native dialogs live in the top layer, so their rules intentionally do not\n   depend on being descendants of .iwb-root. */\n.iwb-task-dialog {\n  width: min(760px, calc(100vw - 32px));\n  max-width: calc(100vw - 32px);\n  max-height: calc(100dvh - 48px);\n  margin: auto;\n  padding: 0;\n  overflow: hidden;\n  border: .5px solid var(--dsw-alias-border-l2);\n  border-radius: var(--dsw-radius-lg);\n  outline: none;\n  background: var(--dsw-alias-bg-layer-1);\n  box-shadow: var(--dsw-shadow-lv3);\n  color: var(--dsw-alias-label-primary);\n  font-family: var(--dsw-font-family);\n}\n\n.iwb-task-dialog[open] {\n  display: flex;\n  flex-direction: column;\n}\n\n.iwb-task-dialog::backdrop {\n  background: color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n}\n\n.iwb-task-dialog-plan {\n  width: min(960px, calc(100vw - 32px));\n}\n\n.iwb-task-dialog-confirm {\n  width: min(440px, calc(100vw - 32px));\n}\n\n.iwb-task-dialog-head {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  min-height: 54px;\n  padding: 0 12px 0 18px;\n  border-bottom: .5px solid var(--dsw-alias-border-l1);\n}\n\n.iwb-task-dialog-title {\n  flex: 1;\n  min-width: 0;\n  margin: 0;\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: -.01em;\n  line-height: 20px;\n}\n\n.iwb-task-dialog-head .iwb-btn.icon {\n  flex: 0 0 auto;\n  border-color: transparent;\n  background: transparent;\n}\n\n.iwb-task-dialog-body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow: auto;\n  overscroll-behavior: contain;\n  padding: 18px;\n}\n\n.iwb-task-dialog-intro {\n  margin: 0 0 15px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11.5px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-dialog-error {\n  flex: 0 0 auto;\n  margin: 0 18px 12px;\n  padding: 9px 11px;\n  border: .5px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, transparent);\n  border-radius: var(--dsw-radius-sm);\n  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);\n  color: var(--dsw-alias-state-error-primary);\n  font-size: 11.5px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-dialog-footer {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n  gap: 7px;\n  min-height: 54px;\n  padding: 10px 18px;\n  border-top: .5px solid var(--dsw-alias-border-l1);\n  background: var(--dsw-alias-bg-layer-1);\n}\n\n.iwb-task-dialog-footer:empty {\n  min-height: 12px;\n  padding-block: 6px;\n}\n\n.iwb-task-dialog-footer .iwb-btn {\n  font-family: inherit;\n}\n\n.iwb-task-dialog-options {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 10px 18px;\n  margin-bottom: 10px;\n}\n\n.iwb-task-check {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 11.5px;\n  line-height: 18px;\n  cursor: pointer;\n}\n\n.iwb-task-check input,\n.iwb-task-session-item > input,\n.iwb-task-draft-item > input,\n.iwb-task-plan-select input {\n  flex: 0 0 auto;\n  width: 14px;\n  height: 14px;\n  margin: 0;\n  accent-color: var(--dsw-alias-label-deep-diving);\n  cursor: pointer;\n}\n\n.iwb-task-check input:focus-visible,\n.iwb-task-session-item > input:focus-visible,\n.iwb-task-draft-item > input:focus-visible,\n.iwb-task-plan-select input:focus-visible {\n  outline: 2px solid var(--dsw-alias-label-deep-diving);\n  outline-offset: 2px;\n}\n\n.iwb-task-check:has(input:disabled),\n.iwb-task-session-item:has(input:disabled),\n.iwb-task-draft-item:has(input:disabled),\n.iwb-task-plan-select:has(input:disabled) {\n  opacity: .55;\n  cursor: default;\n}\n\n.iwb-task-select-all {\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.iwb-task-session-list,\n.iwb-task-draft-list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.iwb-task-session-item,\n.iwb-task-draft-item {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  min-width: 0;\n  padding: 10px 11px;\n  border: .5px solid var(--dsw-alias-border-l1);\n  border-radius: var(--dsw-radius-sm);\n  background: var(--dsw-alias-bg-base);\n  cursor: pointer;\n  transition: background .12s, border-color .12s;\n}\n\n.iwb-task-session-item:hover,\n.iwb-task-draft-item:hover {\n  border-color: var(--dsw-alias-border-l3);\n  background: var(--dsw-alias-bg-layer-2);\n}\n\n.iwb-task-session-item:has(input:checked),\n.iwb-task-draft-item:has(input:checked) {\n  border-color: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 34%, var(--dsw-alias-border-l1));\n  background: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 4%, var(--dsw-alias-bg-base));\n}\n\n.iwb-task-session-item > input,\n.iwb-task-draft-item > input {\n  margin-top: 2px;\n}\n\n.iwb-task-session-content,\n.iwb-task-draft-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n\n.iwb-task-session-title,\n.iwb-task-draft-title {\n  min-width: 0;\n  color: var(--dsw-alias-label-primary);\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-session-meta,\n.iwb-task-draft-meta {\n  min-height: 15px;\n  color: var(--dsw-alias-label-caption);\n  font-size: 10.5px;\n  line-height: 15px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-draft-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.iwb-task-draft-summary {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11.5px;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-plan-form {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.iwb-task-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n\n.iwb-task-input {\n  width: 100%;\n  height: 34px;\n  padding: 0 10px;\n  box-sizing: border-box;\n}\n\n.iwb-task-textarea {\n  width: 100%;\n  min-height: 128px;\n  max-height: 36vh;\n  padding: 10px;\n  box-sizing: border-box;\n  line-height: 1.65;\n  resize: vertical;\n}\n\n.iwb-task-input::placeholder,\n.iwb-task-textarea::placeholder {\n  color: var(--dsw-alias-label-caption);\n}\n\n.iwb-task-plan-nodes {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 9px;\n}\n\n.iwb-task-plan-node {\n  position: relative;\n  min-width: 0;\n  padding: 13px 13px 12px 49px;\n  border: .5px solid var(--dsw-alias-border-l1);\n  border-radius: var(--dsw-radius-md);\n  background: var(--dsw-alias-bg-base);\n}\n\n.iwb-task-plan-node:has(input:checked) {\n  border-color: color-mix(in srgb, var(--dsw-alias-label-deep-diving) 34%, var(--dsw-alias-border-l1));\n}\n\n.iwb-task-plan-select {\n  position: absolute;\n  left: 12px;\n  top: 14px;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  cursor: pointer;\n}\n\n.iwb-task-plan-number {\n  color: var(--dsw-alias-label-caption);\n  font-size: 9.5px;\n  font-variant-numeric: tabular-nums;\n  line-height: 14px;\n}\n\n.iwb-task-plan-node-head {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  min-width: 0;\n}\n\n.iwb-task-plan-node-title {\n  flex: 1;\n  min-width: 0;\n  margin: 0;\n  color: var(--dsw-alias-label-primary);\n  font-size: 12px;\n  font-weight: 550;\n  line-height: 18px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-plan-kind.is-session {\n  color: var(--dsw-alias-label-deep-diving);\n}\n\n.iwb-task-plan-kind.is-note {\n  color: var(--dsw-alias-state-warn-primary);\n}\n\n.iwb-task-plan-node-summary {\n  display: -webkit-box;\n  margin: 7px 0;\n  overflow: hidden;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 17px;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-plan-dependency {\n  color: var(--dsw-alias-label-caption);\n  font-size: 10px;\n  line-height: 15px;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-plan-edges {\n  margin-top: 16px;\n  padding-top: 14px;\n  border-top: .5px solid var(--dsw-alias-border-l1);\n}\n\n.iwb-task-plan-edge-list {\n  gap: 5px;\n}\n\n.iwb-task-plan-edge {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n  align-items: center;\n  gap: 9px;\n  padding: 6px 9px;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-base);\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 10.5px;\n  line-height: 16px;\n}\n\n.iwb-task-plan-edge span:first-child {\n  text-align: right;\n}\n\n.iwb-task-plan-edge span:first-child,\n.iwb-task-plan-edge span:last-child {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.iwb-task-plan-arrow {\n  color: var(--dsw-alias-label-deep-diving);\n}\n\n.iwb-task-plan-start {\n  margin-top: 16px;\n}\n\n.iwb-task-confirm-message {\n  margin: 0;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 1.75;\n  overflow-wrap: anywhere;\n}\n\n.iwb-task-is-loading span {\n  opacity: .72;\n}\n\n@media (max-width: 900px) {\n  .iwb-task-layout {\n    grid-template-columns: minmax(250px, 300px) minmax(0, 1fr);\n  }\n\n  .iwb-task-detail {\n    padding: 19px;\n  }\n\n  .iwb-task-links-grid {\n    grid-template-columns: minmax(0, 1fr);\n    gap: 0;\n  }\n}\n\n@media (max-width: 700px) {\n  .iwb-task-controls {\n    gap: 7px;\n    padding-inline: 10px;\n  }\n\n  .iwb-task-control-label {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    overflow: hidden;\n    clip: rect(0 0 0 0);\n    clip-path: inset(50%);\n    white-space: nowrap;\n  }\n\n  .iwb-task-select-control {\n    max-width: 170px;\n  }\n\n  .iwb-task-layout {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .iwb-task-list-panel {\n    flex: 0 0 245px;\n    max-height: 42%;\n    min-height: 165px;\n    border-right: 0;\n    border-bottom: .5px solid var(--dsw-alias-border-l1);\n  }\n\n  .iwb-task-list {\n    scrollbar-gutter: auto;\n  }\n\n  .iwb-task-list-head {\n    min-height: 29px;\n  }\n\n  .iwb-task-detail {\n    flex: 1;\n    padding: 17px 15px;\n  }\n\n  .iwb-task-detail-title {\n    font-size: 18px;\n  }\n\n  .iwb-task-plan-nodes {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n\n@media (max-width: 480px) {\n  .iwb-task-toolbar {\n    padding-inline: 10px;\n  }\n\n  .iwb-task-toolbar .iwb-btn {\n    width: 30px;\n    padding: 0;\n    justify-content: center;\n  }\n\n  .iwb-task-toolbar .iwb-btn span {\n    display: none;\n  }\n\n  .iwb-task-controls {\n    overflow-x: auto;\n  }\n\n  .iwb-task-select-control {\n    max-width: 142px;\n    padding-left: 7px;\n    font-size: 11px;\n  }\n\n  .iwb-task-refresh {\n    width: 30px;\n    padding: 0;\n    justify-content: center;\n  }\n\n  .iwb-task-refresh span {\n    display: none;\n  }\n\n  .iwb-task-detail-actions .iwb-btn {\n    flex: 1 1 auto;\n    justify-content: center;\n  }\n\n  .iwb-task-editor-spacer {\n    display: none;\n  }\n\n  .iwb-task-editors .iwb-task-danger {\n    margin-left: auto;\n  }\n\n  .iwb-task-dialog,\n  .iwb-task-dialog-plan,\n  .iwb-task-dialog-confirm {\n    width: calc(100vw - 16px);\n    max-width: calc(100vw - 16px);\n    max-height: calc(100dvh - 16px);\n  }\n\n  .iwb-task-dialog-head {\n    min-height: 50px;\n    padding-left: 14px;\n  }\n\n  .iwb-task-dialog-body {\n    padding: 14px;\n  }\n\n  .iwb-task-dialog-error {\n    margin-inline: 14px;\n  }\n\n  .iwb-task-dialog-footer {\n    padding-inline: 14px;\n  }\n\n  .iwb-task-dialog-footer .iwb-btn.primary {\n    flex: 1 1 auto;\n    justify-content: center;\n  }\n\n  .iwb-task-event-body {\n    flex-direction: column;\n    gap: 1px;\n  }\n}\n\n\n\n/* Node-level progress in task details */\n.iwb-task-nodes { margin-top: 18px; }\n.iwb-task-node-list { display: flex; flex-direction: column; gap: 6px; }\n.iwb-task-node-row {\n  display: flex; align-items: center; justify-content: space-between; gap: 12px;\n  padding: 8px 10px; border: .5px solid var(--dsw-alias-border-l1); border-radius: var(--dsw-radius-sm);\n  background: var(--dsw-alias-bg-layer-1);\n}\n.iwb-task-node-info { min-width: 0; display: flex; align-items: center; gap: 8px; }\n.iwb-task-node-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; font-weight: 500; }\n.iwb-task-node-kind { flex: 0 0 auto; color: var(--dsw-alias-label-caption); font-size: 10px; }\n.iwb-task-node-status { flex: 0 0 auto; font-size: 10.5px; white-space: nowrap; }\n.iwb-task-node-status.is-done { color: var(--dsw-alias-state-success-primary); }\n.iwb-task-node-status.is-running { color: var(--dsw-alias-label-deep-diving); }\n.iwb-task-node-status.is-blocked, .iwb-task-node-status.is-needs_input { color: var(--dsw-alias-state-error-primary); }\n.iwb-task-node-status.is-idle { color: var(--dsw-alias-label-tertiary); }\n\n@media (prefers-reduced-motion: reduce) {\n  .iwb-task-view *,\n  .iwb-task-dialog * {\n    scroll-behavior: auto !important;\n    transition-duration: .01ms !important;\n  }\n\n  .iwb-task-spinner {\n    animation-duration: 1.8s;\n  }\n}\n';

// src/client/persistence.js
var BASE = "/api/inspiration-workbench";
async function request(path, init) {
  const response = await fetch(BASE + path, { credentials: "same-origin", ...init });
  if (!response.ok) throw new Error("layout " + response.status);
  return response;
}
async function fetchRemoteLayout() {
  try {
    const response = await request("/layout", { method: "GET" });
    const body = await response.json();
    if (!body || typeof body !== "object" || !body.layout) return null;
    return { rev: Number(body.rev) || 0, updatedAt: Number(body.updatedAt) || 0, layout: body.layout };
  } catch {
    return null;
  }
}
async function pushRemoteLayout(layout, clientId) {
  try {
    const response = await request("/layout", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ layout, clientId })
    });
    const body = await response.json().catch(() => ({}));
    return { rev: Number(body?.rev) || 0, updatedAt: Number(body?.updatedAt) || 0 };
  } catch {
    return null;
  }
}
function subscribeRemoteLayout(listener) {
  if (typeof EventSource === "undefined") return () => {
  };
  let source;
  try {
    source = new EventSource(BASE + "/events", { withCredentials: true });
  } catch {
    return () => {
    };
  }
  const onMessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload && typeof payload.rev === "number") {
        listener(payload.rev, typeof payload.clientId === "string" ? payload.clientId : "");
      }
    } catch {
    }
  };
  source.addEventListener("message", onMessage);
  return () => {
    source.removeEventListener("message", onMessage);
    source.close();
  };
}
async function fetchCanvases() {
  try {
    const response = await request("/canvases", { method: "GET" });
    const body = await response.json();
    return {
      canvases: Array.isArray(body?.canvases) ? body.canvases : [],
      activeCanvas: typeof body?.activeCanvas === "string" ? body.activeCanvas : null
    };
  } catch {
    return null;
  }
}
async function pushCanvases(canvases, activeCanvas) {
  try {
    const response = await request("/canvases", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ canvases, activeCanvas })
    });
    return await response.json().catch(() => ({}));
  } catch {
    return null;
  }
}
async function fetchTaskState() {
  try {
    const response = await request("/tasks", { method: "GET" });
    const body = await response.json();
    if (!body || !Array.isArray(body.tasks) || !Array.isArray(body.flowEvents)) return null;
    return {
      rev: Number(body.rev) || 0,
      updatedAt: Number(body.updatedAt) || 0,
      tasks: body.tasks,
      flowEvents: body.flowEvents
    };
  } catch {
    return null;
  }
}
async function pushTaskState(tasks, flowEvents, clientId) {
  try {
    const response = await request("/tasks", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tasks, flowEvents, clientId })
    });
    const body = await response.json().catch(() => ({}));
    return { rev: Number(body?.rev) || 0, updatedAt: Number(body?.updatedAt) || 0 };
  } catch {
    return null;
  }
}

// src/client/dom.js
var clamp = (v, min, max) => Math.min(max, Math.max(min, v));
function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

// src/client/icons.js
var ICONS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  flow: '<path d="M4 7h9l-2-2"/><path d="M13 7l-2 2"/><circle cx="18" cy="7" r="2.4"/><path d="M4 17h9l-2-2"/><path d="M13 17l-2 2"/><circle cx="18" cy="17" r="2.4"/>',
  more: '<circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/>',
  canvas: '<rect x="3" y="7" width="14" height="14" rx="2"/><path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>',
  quote: '<path d="M7 7h5v5a4 4 0 0 1-4 4H7"/><path d="M15 7h5v5a4 4 0 0 1-4 4h-1"/>',
  board: '<rect x="3" y="4" width="5.5" height="16" rx="1.4"/><rect x="9.5" y="4" width="5.5" height="11" rx="1.4"/><rect x="16" y="4" width="5" height="7" rx="1.4"/>',
  arrange: '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  fit: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  open: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  send: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  stop: '<rect x="7" y="7" width="10" height="10" rx="2"/>',
  minus: '<path d="M5 12h14"/>',
  pin: '<path d="M9 4h6l-1 6 3 3H7l3-3-1-6z"/><path d="M12 13v7"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  note: '<path d="M5 4h14v11l-5 5H5z"/><path d="M14 20v-5h5"/>',
  clip: '<path d="M21.4 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  chevronRight: '<path d="M9 6l6 6-6 6"/>',
  chevronUp: '<path d="M6 15l6-6 6 6"/>',
  think: '<path d="M12 3v3M12 18v3M4.2 7.2l2.1 2.1M17.7 14.7l2.1 2.1M3 12h3M18 12h3M4.2 16.8l2.1-2.1M17.7 9.3l2.1-2.1"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  pencil: '<path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9l3 3-3 3M13 15h4"/>',
  braces: '<path d="M9 4H8a2 2 0 0 0-2 2v4l-2 2 2 2v4a2 2 0 0 0 2 2h1"/><path d="M15 4h1a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2h-1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M16 6.2a3.2 3.2 0 0 1 0 6M18 19a5.5 5.5 0 0 0-3-4.9"/>',
  list: '<path d="M4 6h2M4 12h2M4 18h2M9 6h11M9 12h11M9 18h11"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.2a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.2 1-1.2 1.8v.3"/><path d="M12 17.4h0"/>',
  sparkle: '<path d="M12 3l1.8 4.9L18.7 9.7 13.8 11.5 12 16.4 10.2 11.5 5.3 9.7l4.9-1.8L12 3z"/><path d="M18.5 15.5l.9 2.2 2.1.8-2.1.8-.9 2.2-.9-2.2-2.1-.8 2.1-.8.9-2.2z"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>'
};
function icon(name, size = 14) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
}

// src/client/categories.js
var STEP_ICONS = {
  thinking: icon("think", 14),
  read: icon("eye", 14),
  readImage: icon("eye", 14),
  webFetch: icon("eye", 14),
  search: icon("search", 14),
  edit: icon("pencil", 14),
  write: icon("pencil", 14),
  commands: icon("terminal", 14),
  code: icon("braces", 14),
  webSearch: icon("globe", 14),
  subagents: icon("users", 14),
  plan: icon("list", 14),
  questions: icon("help", 14),
  tools: icon("sparkle", 14)
};
var TOOL_CATEGORY = {
  bash: "commands",
  pwsh: "commands",
  shell: "commands",
  terminal: "commands",
  run_command: "commands",
  execute: "commands",
  run_code: "code",
  ptc: "code",
  execute_code: "code",
  read: "read",
  read_file: "read",
  view: "read",
  read_image: "readImage",
  readImage: "readImage",
  write: "write",
  write_file: "write",
  create: "write",
  edit: "edit",
  apply_patch: "edit",
  multi_edit: "edit",
  replace: "edit",
  grep: "search",
  glob: "search",
  search: "search",
  find: "search",
  web_search: "webSearch",
  webSearch: "webSearch",
  web_fetch: "webFetch",
  webFetch: "webFetch",
  task: "subagents",
  subagent: "subagents",
  spawn_teammate: "subagents",
  todo_write: "plan",
  plan: "plan",
  ask_user_question: "questions"
};
function stepActivity(calls) {
  const kinds = [];
  for (const call of calls) {
    const kind = TOOL_CATEGORY[call.name] || "tools";
    if (!kinds.includes(kind)) kinds.push(kind);
  }
  return kinds;
}

// src/client/markdown.js
function createMarkdown({ t: t2 }) {
  function splitRow(line) {
    return line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((cell) => cell.trim());
  }
  function safeHref(url) {
    const value = String(url || "").trim();
    if (/^(https?:|mailto:)/i.test(value)) return value;
    return "";
  }
  function appendInline(parent, text4) {
    const pattern = /(`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]*\]\([^)\s]+\))/g;
    let last = 0;
    let match;
    while (match = pattern.exec(text4)) {
      if (match.index > last) parent.appendChild(document.createTextNode(text4.slice(last, match.index)));
      const token3 = match[0];
      if (token3.startsWith("`")) {
        const code = el("code", "iwb-md-code");
        code.textContent = token3.slice(1, -1);
        parent.appendChild(code);
      } else if (token3.startsWith("**") || token3.startsWith("__")) {
        const strong = document.createElement("strong");
        appendInline(strong, token3.slice(2, -2));
        parent.appendChild(strong);
      } else if (token3.startsWith("~~")) {
        const strike = document.createElement("s");
        appendInline(strike, token3.slice(2, -2));
        parent.appendChild(strike);
      } else if (token3.startsWith("[")) {
        const split = token3.match(/^\[([^\]]*)\]\(([^)\s]+)\)$/);
        const href = split ? safeHref(split[2]) : "";
        if (href) {
          const link = document.createElement("a");
          link.className = "iwb-md-link";
          link.href = href;
          link.target = "_blank";
          link.rel = "noreferrer noopener";
          link.textContent = split[1] || href;
          parent.appendChild(link);
        } else {
          parent.appendChild(document.createTextNode(split ? split[1] : token3));
        }
      } else {
        const em = document.createElement("em");
        appendInline(em, token3.slice(1, -1));
        parent.appendChild(em);
      }
      last = pattern.lastIndex;
    }
    if (last < text4.length) parent.appendChild(document.createTextNode(text4.slice(last)));
  }
  function appendParagraph(parent, text4) {
    const node = el("div", "iwb-md-p");
    const lines = text4.split("\n");
    lines.forEach((line, index) => {
      if (index > 0) node.appendChild(document.createElement("br"));
      appendInline(node, line);
    });
    parent.appendChild(node);
  }
  function appendCodeBlock(parent, lang, code) {
    const wrapper = el("div", "iwb-codeblock");
    const head = el("div", "iwb-codeblock-head");
    const label = el("span", "iwb-codeblock-lang");
    label.textContent = lang || "text";
    const copy = el("button", "iwb-codeblock-copy");
    copy.type = "button";
    copy.textContent = t2("code.copy");
    copy.addEventListener("click", (event) => {
      event.stopPropagation();
      const write = navigator.clipboard?.writeText?.(code);
      if (write && typeof write.then === "function") {
        write.then(() => {
          copy.textContent = t2("code.copied");
          setTimeout(() => {
            copy.textContent = t2("code.copy");
          }, 1400);
        }).catch(() => {
        });
      }
    });
    head.append(label, copy);
    const body = el("pre", "iwb-codeblock-body");
    body.textContent = code;
    wrapper.append(head, body);
    parent.appendChild(wrapper);
  }
  function appendTable(parent, header, rows) {
    const table = el("table", "iwb-md-table");
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    for (const cell of header) {
      const th = document.createElement("th");
      appendInline(th, cell);
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    for (const row of rows) {
      const tr = document.createElement("tr");
      for (let index = 0; index < header.length; index += 1) {
        const td = document.createElement("td");
        appendInline(td, row[index] || "");
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    parent.appendChild(table);
  }
  function listItemNode(entry) {
    const li = document.createElement("li");
    if (entry.task !== null) {
      const box = el("span", "iwb-md-task" + (entry.task ? " checked" : ""));
      box.textContent = entry.task ? "\u2713" : "";
      li.appendChild(box);
    }
    appendInline(li, entry.text);
    return li;
  }
  function appendList(parent, block) {
    const base = Math.min(...block.items.map((entry) => entry.indent));
    const list = document.createElement(block.ordered ? "ol" : "ul");
    list.className = "iwb-md-list";
    let nested = null;
    for (const entry of block.items) {
      if (entry.indent > base + 1) {
        if (!nested) {
          nested = document.createElement("ul");
          nested.className = "iwb-md-list nested";
          list.appendChild(nested);
        }
        nested.appendChild(listItemNode(entry));
      } else {
        nested = null;
        list.appendChild(listItemNode(entry));
      }
    }
    parent.appendChild(list);
  }
  function appendMarkdownLite(parent, text4) {
    const lines = String(text4 || "").split(/\r?\n/);
    let index = 0;
    while (index < lines.length) {
      const line = lines[index];
      const fence = line.match(/^\s*```\s*(.*)$/);
      if (fence) {
        const lang = (fence[1] || "").trim();
        const body = [];
        index += 1;
        while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
          body.push(lines[index]);
          index += 1;
        }
        index += 1;
        appendCodeBlock(parent, lang, body.join("\n"));
        continue;
      }
      if (!line.trim()) {
        index += 1;
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        const node = el("div", "iwb-md-h iwb-md-h" + heading[1].length);
        appendInline(node, heading[2]);
        parent.appendChild(node);
        index += 1;
        continue;
      }
      if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
        parent.appendChild(el("div", "iwb-md-hr"));
        index += 1;
        continue;
      }
      if (line.includes("|") && index + 1 < lines.length && /^\s*\|?[\s:|-]*-[\s:|-]*\|[\s:|-]*$/.test(lines[index + 1]) && lines[index + 1].includes("-")) {
        const header = splitRow(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
          rows.push(splitRow(lines[index]));
          index += 1;
        }
        appendTable(parent, header, rows);
        continue;
      }
      if (/^\s*>\s?/.test(line)) {
        const quote = [];
        while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
          quote.push(lines[index].replace(/^\s*>\s?/, ""));
          index += 1;
        }
        const node = el("blockquote", "iwb-md-quote");
        appendMarkdownLite(node, quote.join("\n"));
        parent.appendChild(node);
        continue;
      }
      if (/^\s*([-*+]|\d+[.)])\s+/.test(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const items = [];
        while (index < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[index])) {
          const raw = lines[index];
          const indent = (raw.match(/^\s*/) || [""])[0].length;
          let content = raw.replace(/^\s*([-*+]|\d+[.)])\s+/, "");
          const task = content.match(/^\[([ xX])\]\s+(.*)$/);
          items.push({
            indent,
            ordered,
            task: task ? task[1].toLowerCase() === "x" : null,
            text: task ? task[2] : content
          });
          index += 1;
        }
        appendList(parent, { items, ordered });
        continue;
      }
      const paragraph = [];
      while (index < lines.length && lines[index].trim() && !/^\s*(```|#{1,6}\s|>|([-*+]|\d+[.)])\s)/.test(lines[index]) && !/^\s*([-*_])\1{2,}\s*$/.test(lines[index])) {
        paragraph.push(lines[index]);
        index += 1;
      }
      if (!paragraph.length) {
        paragraph.push(lines[index] || "");
        index += 1;
      }
      appendParagraph(parent, paragraph.join("\n"));
    }
  }
  return { appendMarkdownLite };
}

// src/client/render.js
function formatDuration(ms, tr = (key) => key) {
  const total = Math.max(1, Math.round(ms / 1e3));
  if (total < 60) return tr("duration.seconds").replace("{n}", String(total));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  if (minutes < 60) {
    return seconds ? tr("duration.minutesSeconds").replace("{m}", String(minutes)).replace("{s}", String(seconds)) : tr("duration.minutes").replace("{m}", String(minutes));
  }
  const hours = Math.floor(minutes / 60);
  return tr("duration.hoursMinutes").replace("{h}", String(hours)).replace("{m}", String(minutes % 60));
}
function createRenderers(deps) {
  const {
    t: t2,
    el: el2,
    appendMarkdownLite,
    markDirty,
    toast,
    adapter,
    expandedTurns,
    rerender,
    openRefPicker,
    ensureVisible,
    onOpenSession,
    renderFoot,
    settleApproval,
    canAnswerApproval
  } = deps;
  function stepSummary(calls) {
    const running = calls.some((call) => call.state === "running");
    const kinds = stepActivity(calls);
    const labels = kinds.slice(0, 3).map((kind) => t2((running ? "stepRunning." : "step.") + kind)).filter(Boolean);
    if (!labels.length) return t2(running ? "stepRunning.thinking" : "step.thinking");
    if (labels.length === 1) return labels[0];
    const continuation = (label) => label.charAt(0).toLowerCase() + label.slice(1);
    if (labels.length === 2) {
      const prefix = t2("step.sharedPrefix");
      const second = labels[1];
      const trimmed = prefix && labels[0].startsWith(prefix) && second.startsWith(prefix) ? second.slice(prefix.length) : second;
      return t2("step.joinTwo").replace("{first}", labels[0]).replace("{second}", continuation(trimmed));
    }
    const title = [labels[0], ...labels.slice(1).map(continuation)].join(t2("step.joinMany"));
    return kinds.length > 3 ? t2("step.more").replace("{title}", title) : title;
  }
  function toolIsOpen(card, item) {
    const key = "call:" + (item.id || item.name + "#" + (item.arg || ""));
    if (card.toolOpen.has(key)) return card.toolOpen.get(key);
    return item.state === "error";
  }
  function toolNode(card, item) {
    const open = toolIsOpen(card, item);
    const node = el2("button", "iwb-tool " + (item.state || "done") + (open ? " open" : ""));
    node.type = "button";
    node.innerHTML = '<span class="chev">' + icon(open ? "chevronDown" : "chevronRight", 11) + '</span><span class="n"></span><span class="a"></span><span class="s">' + (item.state === "running" ? t2("tool.running") : item.state === "error" ? t2("tool.error") : t2("tool.done")) + "</span>";
    node.querySelector(".n").textContent = item.name;
    node.querySelector(".a").textContent = item.arg || "";
    node.title = t2("tool.toggle");
    if (open) {
      const detail = el2("div", "iwb-tool-detail");
      if (item.argsText) {
        const label = el2("div", "iwb-tool-label");
        label.textContent = t2("tool.args");
        const code = el2("div", "iwb-code");
        code.textContent = item.argsText;
        detail.append(label, code);
      }
      if (item.resultText) {
        const label = el2("div", "iwb-tool-label");
        label.textContent = item.state === "error" ? t2("tool.errorOutput") : t2("tool.output");
        const code = el2("div", "iwb-code");
        code.textContent = item.resultText;
        detail.append(label, code);
      }
      if (!detail.childElementCount) {
        const empty = el2("div", "iwb-tool-label");
        empty.textContent = item.state === "running" ? t2("tool.waiting") : t2("tool.noOutput");
        detail.appendChild(empty);
      }
      node.appendChild(detail);
    }
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      const key = "call:" + (item.id || item.name + "#" + (item.arg || ""));
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    });
    return node;
  }
  function stepRowNode(card, step) {
    const key = "step:" + step.turn + ":" + step.step;
    const running = step.calls.some((call) => call.state === "running");
    const failed = step.calls.some((call) => call.state === "error");
    const open = card.toolOpen.has(key) ? card.toolOpen.get(key) : false;
    const activity = stepActivity(step.calls)[0] || "thinking";
    const node = el2(
      "div",
      "iwb-step" + (open ? " open" : "") + (running ? " running" : "") + (failed ? " failed" : "")
    );
    node.setAttribute("role", "button");
    node.tabIndex = 0;
    node.dataset.activity = activity;
    node.innerHTML = '<span class="lead"><span class="ico">' + (STEP_ICONS[activity] || STEP_ICONS.tools) + '</span><span class="chev">' + icon(open ? "chevronUp" : "chevronDown", 12) + '</span></span><span class="txt"></span>';
    node.querySelector(".txt").textContent = stepSummary(step.calls);
    node.title = t2("tool.toggle");
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    });
    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    });
    if (open) {
      const detail = el2("div", "iwb-step-detail");
      for (const call of step.calls) detail.appendChild(toolNode(card, call));
      node.appendChild(detail);
    }
    return node;
  }
  function turnNode(card, item) {
    if (item.endTime == null) return null;
    const boardKey = card.sessionId + ":" + item.turn;
    const key = "turn:" + item.turn;
    const open = expandedTurns.has(boardKey) ? expandedTurns.get(boardKey) : card.toolOpen.has(key) ? card.toolOpen.get(key) : false;
    const took = formatDuration(Math.max(0, item.endTime - (item.startTime || item.endTime)), t2);
    const summary = (item.failed ? t2("turn.failed") : t2("turn.worked")) + (took ? "\uFF0C" + t2("turn.used") + took : "");
    const wrapper = el2("div", "iwb-turncard" + (open ? " open" : ""));
    wrapper.dataset.turn = String(item.turn);
    const node = el2("div", "iwb-turn" + (item.failed ? " failed" : "") + (open ? " open" : ""));
    node.innerHTML = '<span class="txt"></span><span class="chev">' + icon(open ? "chevronDown" : "chevronRight", 11) + "</span>";
    node.querySelector(".txt").textContent = summary;
    node.title = t2("turn.meta");
    node.setAttribute("role", "button");
    node.tabIndex = 0;
    const toggle = () => {
      expandedTurns.set(boardKey, !open);
      card.toolOpen.set(key, !open);
      card.signatureBust = (card.signatureBust || 0) + 1;
      rerender(card);
    };
    node.addEventListener("click", toggle);
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
    wrapper.appendChild(node);
    if (open) {
      const detail = el2("div", "iwb-turn-detail");
      for (const step of item.steps || []) detail.appendChild(stepRowNode(card, step));
      if (!detail.childElementCount) {
        const empty = el2("div", "iwb-turn-meta");
        empty.textContent = t2("turn.noMeta");
        detail.appendChild(empty);
      }
      const stats = [];
      if (item.toolCalls) stats.push(t2("turn.toolCalls").replace("{n}", String(item.toolCalls)));
      if (item.messages) stats.push(t2("turn.messages").replace("{n}", String(item.messages)));
      if (stats.length) {
        const meta = el2("div", "iwb-turn-meta");
        meta.textContent = stats.join(" \xB7 ");
        detail.appendChild(meta);
      }
      wrapper.appendChild(detail);
    }
    return wrapper;
  }
  function answerDraft(card, pending) {
    if (!card.answers || card.answers.callId !== pending.callId) {
      card.answers = { callId: pending.callId, selections: {}, custom: {} };
    }
    return card.answers;
  }
  async function submitAnswer(card, pending, draft) {
    const answers = pending.items.map((item) => {
      const selected = draft.selections[item.id] || [];
      const custom = (draft.custom[item.id] || "").trim();
      const entry = { id: item.id, selected };
      if (custom) entry.custom = custom;
      return entry;
    });
    try {
      await adapter.answerQuestion(card.sessionId, pending.callId, answers);
      card.answers = void 0;
      toast(t2("answer.submitted"));
      markDirty(card);
    } catch (error) {
      toast(error?.message || t2("answer.failed"));
    }
  }
  function questionNode(card, pending) {
    const answerable = pending?.answerable !== false;
    const draft = answerDraft(card, pending);
    const node = el2("div", "iwb-question");
    const head = el2("div", "iwb-question-head");
    head.textContent = t2("question.title");
    node.appendChild(head);
    for (const item of pending.items) {
      const block = el2("div", "iwb-question-item");
      if (item.header) {
        const header = el2("div", "iwb-question-header");
        header.textContent = item.header;
        block.appendChild(header);
      }
      const text4 = el2("div", "iwb-question-text");
      text4.textContent = item.question || "";
      block.appendChild(text4);
      const options = item.options || [];
      if (options.length) {
        const list = el2("div", "iwb-question-options");
        for (const option of options) {
          const selected = (draft.selections[item.id] || []).includes(option.label);
          const button = el2("button", "iwb-question-option" + (selected ? " selected" : ""));
          button.type = "button";
          button.textContent = option.label;
          if (option.description) button.title = option.description;
          button.addEventListener("click", (event) => {
            event.stopPropagation();
            const current = draft.selections[item.id] || [];
            if (item.multiSelect) {
              draft.selections[item.id] = current.includes(option.label) ? current.filter((value) => value !== option.label) : [...current, option.label];
            } else {
              draft.selections[item.id] = [option.label];
            }
            for (const sibling of list.querySelectorAll(".iwb-question-option")) {
              sibling.classList.toggle("selected", (draft.selections[item.id] || []).includes(sibling.textContent));
            }
            const single = pending.items.length === 1 && !item.multiSelect;
            if (single) void submitAnswer(card, pending, draft);
          });
          list.appendChild(button);
        }
        block.appendChild(list);
      }
      const custom = el2("input", "iwb-question-custom");
      custom.type = "text";
      custom.placeholder = t2("answer.custom");
      custom.value = draft.custom[item.id] || "";
      custom.addEventListener("input", () => {
        draft.custom[item.id] = custom.value;
      });
      custom.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.isComposing) {
          event.preventDefault();
          void submitAnswer(card, pending, draft);
        }
      });
      block.appendChild(custom);
      node.appendChild(block);
    }
    const actions = el2("div", "iwb-question-actions");
    const submit = el2("button", "iwb-btn primary");
    submit.type = "button";
    submit.textContent = t2("answer.submit");
    submit.addEventListener("click", (event) => {
      event.stopPropagation();
      void submitAnswer(card, pending, draft);
    });
    if (!answerable) {
      const note = el2("div", "iwb-approval-note");
      note.textContent = t2("approval.platformLimit");
      node.appendChild(note);
    }
    const native = el2("button", "iwb-btn");
    native.type = "button";
    native.textContent = t2("answer.openNative");
    native.addEventListener("click", (event) => {
      event.stopPropagation();
      onOpenSession?.(card.sessionId);
    });
    actions.append(submit, native);
    node.appendChild(actions);
    return node;
  }
  function approvalNode(card, approvals) {
    const node = el2("div", "iwb-approval");
    const head = el2("div", "iwb-approval-head");
    head.textContent = t2("approval.waiting");
    node.appendChild(head);
    for (const approval of approvals) {
      const row = el2("div", "iwb-approval-row");
      row.textContent = approval.toolName ? t2("approval.tool").replace("{name}", approval.toolName) : t2("approval.unknown");
      if (approval.reason) {
        const reason = el2("div", "iwb-approval-reason");
        reason.textContent = approval.reason;
        row.appendChild(reason);
      }
      node.appendChild(row);
    }
    const actions = el2("div", "iwb-question-actions");
    const answerable = approvals.some((approval) => canAnswerApproval?.(card.sessionId, approval.id));
    if (answerable) {
      const allow = el2("button", "iwb-btn primary");
      allow.type = "button";
      allow.textContent = t2("approval.allowOnce");
      allow.addEventListener("click", (event) => {
        event.stopPropagation();
        allow.disabled = true;
        for (const approval of approvals) settleApproval?.(card.sessionId, approval.id, "allowed-once");
      });
      const reject = el2("button", "iwb-btn");
      reject.type = "button";
      reject.textContent = t2("approval.reject");
      reject.addEventListener("click", (event) => {
        event.stopPropagation();
        reject.disabled = true;
        for (const approval of approvals) settleApproval?.(card.sessionId, approval.id, "rejected");
      });
      actions.append(allow, reject);
    }
    const native = el2("button", "iwb-btn");
    native.type = "button";
    native.textContent = t2("approval.openNative");
    native.addEventListener("click", (event) => {
      event.stopPropagation();
      onOpenSession?.(card.sessionId);
    });
    actions.appendChild(native);
    node.appendChild(actions);
    return node;
  }
  function failureNode(item) {
    const failure = item.failure || {};
    const node = el2("div", "iwb-fail");
    const head = el2("div", "iwb-fail-head");
    const dot = el2("span", "iwb-fail-dot");
    const title = el2("span", "iwb-fail-title");
    title.textContent = failure.title ? t2(failure.title) : t2("failure.turnError");
    head.append(dot, title);
    node.appendChild(head);
    const detail = failure.detail ? t2(failure.detail) : failure.message || "";
    if (detail) {
      const body = el2("div", "iwb-fail-detail");
      body.textContent = detail;
      node.appendChild(body);
    }
    return node;
  }
  function messageActions(card, item) {
    const actions = el2("div", "iwb-msg-actions");
    const quote = el2("button", "iwb-msg-action");
    quote.type = "button";
    quote.title = t2("ref.to");
    quote.setAttribute("aria-label", t2("ref.to"));
    quote.innerHTML = icon("quote", 12);
    quote.addEventListener("click", (event) => {
      event.stopPropagation();
      openRefPicker(event.currentTarget, card, item.text || "");
    });
    actions.appendChild(quote);
    return actions;
  }
  function itemNode(card, item) {
    if (item.k === "user") {
      const node2 = el2("div", "iwb-msg user");
      if (item.text) {
        const text4 = el2("div", "iwb-msg-text");
        text4.textContent = item.text;
        node2.appendChild(text4);
      }
      const attachments = item.attachments || [];
      if (attachments.length) {
        const list = el2("div", "iwb-msg-attach-list");
        for (const attachment of attachments) {
          const chip = el2("span", "iwb-msg-attach");
          chip.innerHTML = icon(attachment.kind === "image" ? "image" : "note", 11);
          const label = el2("span", "iwb-msg-attach-name");
          label.textContent = attachment.name || t2("attach.file");
          chip.appendChild(label);
          list.appendChild(chip);
        }
        node2.appendChild(list);
      }
      node2.appendChild(messageActions(card, item));
      return node2;
    }
    if (item.k === "assistant") {
      const node2 = el2("div", "iwb-msg assistant" + (item.live ? " iwb-cursor" : ""));
      appendMarkdownLite(node2, item.text || "");
      node2.appendChild(messageActions(card, item));
      return node2;
    }
    if (item.k === "reasoning") {
      const node2 = el2("div", "iwb-reasoning");
      node2.textContent = "\u601D\u8003\uFF1A" + item.text.slice(0, 400);
      return node2;
    }
    if (item.k === "turnProcess") return turnNode(card, item);
    if (item.k === "step") {
      const turnItem = (card.view?.items || []).find((entry) => entry.k === "turnProcess" && entry.turn === item.turn);
      if (turnItem && turnItem.endTime != null) return null;
      return stepRowNode(card, item);
    }
    if (item.k === "failure") return failureNode(item);
    if (item.k === "tool") return toolNode(card, item);
    if (item.k === "error") {
      const node2 = el2("div", "iwb-msg error");
      node2.textContent = item.text;
      return node2;
    }
    const node = el2("div", "iwb-msg notice");
    node.textContent = item.text;
    return node;
  }
  function attachmentChip(card, attachment) {
    const upload = adapter.uploadSnapshots?.()[attachment.id] || {};
    const status = upload.status || "ready";
    const chip = el2("div", "iwb-attachment" + (status === "error" ? " error" : status === "uploading" ? " uploading" : ""));
    if (attachment.kind === "image" && attachment.previewUrl) {
      const thumb = document.createElement("img");
      thumb.src = attachment.previewUrl;
      thumb.alt = attachment.name || t2("attach.image");
      chip.appendChild(thumb);
    } else {
      const name = el2("span", "iwb-attachment-name");
      name.textContent = attachment.name || t2("attach.file");
      chip.appendChild(name);
    }
    if (status === "uploading") {
      const spinner = el2("span", "iwb-attachment-state");
      spinner.textContent = "\u2026";
      chip.appendChild(spinner);
    }
    const remove = el2("button", "iwb-attachment-x");
    remove.type = "button";
    remove.title = t2("attach.remove");
    remove.setAttribute("aria-label", t2("attach.remove"));
    remove.innerHTML = icon("close", 10);
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      card.attachments = (card.attachments || []).filter((item) => item.id !== attachment.id);
      adapter.releaseDrafts?.([attachment.id]);
      renderFoot(card);
    });
    chip.appendChild(remove);
    if (status === "error") {
      chip.title = t2("attach.failedShort");
      const retry = el2("button", "iwb-attachment-retry");
      retry.type = "button";
      retry.textContent = t2("attach.retry");
      retry.addEventListener("click", (event) => {
        event.stopPropagation();
        if (adapter.retryUpload?.(card.sessionId, attachment.id)) {
          renderFoot(card);
        }
      });
      chip.appendChild(retry);
    }
    return chip;
  }
  return {
    itemNode,
    turnNode,
    stepRowNode,
    toolNode,
    questionNode,
    approvalNode,
    failureNode,
    attachmentChip,
    stepSummary,
    formatDuration,
    toolIsOpen,
    answerDraft,
    submitAnswer,
    messageActions
  };
}

// src/client/card-tools.js
function createCardTools(deps) {
  const { t: t2, el: el2, toast, ensureVisible, state } = deps;
  function transcriptMarkdown(card) {
    const view = card.view;
    if (!view) return "";
    const lines = ["## " + (card.title || t2("untitled")), ""];
    for (const item of view.items || []) {
      if (item.k === "user") {
        lines.push("**" + t2("transcript.user") + "**", "", item.text || "", "");
      } else if (item.k === "assistant") {
        lines.push(item.text || "", "");
      } else if (item.k === "turnProcess" && item.endTime != null) {
        const took = formatDuration(Math.max(0, item.endTime - (item.startTime || item.endTime)), t2);
        lines.push("> " + (item.failed ? t2("turn.failed") : t2("turn.worked")) + "\uFF0C" + t2("turn.used") + took, "");
      } else if (item.k === "failure") {
        lines.push("> " + (item.failure?.title ? t2(item.failure.title) : t2("failure.turnError")), "");
      }
    }
    return lines.join("\n").trim();
  }
  async function copyTranscript(card) {
    const text4 = transcriptMarkdown(card);
    if (!text4) {
      toast(t2("card.copyEmpty"));
      return;
    }
    try {
      await navigator.clipboard.writeText(text4);
      toast(t2("card.copied"));
    } catch {
      toast(t2("card.copyFailed"));
    }
  }
  function clearHighlights(root) {
    for (const mark of [...root.querySelectorAll("mark.iwb-hit")]) {
      const parent = mark.parentNode;
      if (!parent) continue;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    }
  }
  function highlight(root, term, hits) {
    const needle = term.toLowerCase();
    if (!needle) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest(".iwb-search")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const text4 = node.nodeValue;
      const lower = text4.toLowerCase();
      let index = lower.indexOf(needle);
      if (index < 0) continue;
      const frag = document.createDocumentFragment();
      let cursor = 0;
      while (index >= 0) {
        if (index > cursor) frag.appendChild(document.createTextNode(text4.slice(cursor, index)));
        const mark = el2("mark", "iwb-hit");
        mark.textContent = text4.slice(index, index + needle.length);
        frag.appendChild(mark);
        hits.push(mark);
        cursor = index + needle.length;
        index = lower.indexOf(needle, cursor);
      }
      if (cursor < text4.length) frag.appendChild(document.createTextNode(text4.slice(cursor)));
      node.parentNode.replaceChild(frag, node);
    }
  }
  function runSearch(card, term) {
    const body = card.el.querySelector(".iwb-body");
    const count = card.el.querySelector(".iwb-search-count");
    clearHighlights(body);
    card.searchHits = [];
    card.searchIndex = 0;
    if (!term) {
      if (count) count.textContent = "";
      return;
    }
    const hits = [];
    highlight(body, term, hits);
    card.searchHits = hits;
    if (count) {
      count.textContent = hits.length ? t2("search.count").replace("{i}", "1").replace("{n}", String(hits.length)) : t2("search.none");
    }
    if (hits.length) {
      hits[0].classList.add("current");
      hits[0].scrollIntoView({ block: "center" });
    }
  }
  function stepSearch(card, delta) {
    const hits = card.searchHits || [];
    if (!hits.length) return;
    hits[card.searchIndex]?.classList.remove("current");
    card.searchIndex = (card.searchIndex + delta + hits.length) % hits.length;
    const target = hits[card.searchIndex];
    target.classList.add("current");
    target.scrollIntoView({ block: "center" });
    const count = card.el.querySelector(".iwb-search-count");
    if (count) count.textContent = t2("search.count").replace("{i}", String(card.searchIndex + 1)).replace("{n}", String(hits.length));
  }
  function openSearch(card) {
    const bar = card.el.querySelector(".iwb-search");
    if (!bar) return;
    bar.hidden = false;
    const input = bar.querySelector(".iwb-search-input");
    input.focus();
    input.select();
  }
  function toggleSearch(card) {
    const bar = card.el.querySelector(".iwb-search");
    if (!bar) return;
    const input = bar.querySelector(".iwb-search-input");
    if (!bar.hidden) {
      bar.hidden = true;
      clearHighlights(card.el.querySelector(".iwb-body"));
      card.searchHits = [];
      return;
    }
    bar.hidden = false;
    input.focus();
    input.select();
  }
  let outlinePop = null;
  let outlineCard = null;
  function closeOutline() {
    outlinePop?.remove();
    outlinePop = null;
    outlineCard = null;
  }
  function turnLabel(item, previousUser) {
    const took = item.endTime != null ? formatDuration(Math.max(0, item.endTime - (item.startTime || item.endTime)), t2) : "";
    const state2 = item.endTime == null ? t2("outline.running") : item.failed ? t2("turn.failed") : t2("turn.worked");
    const snippet = (previousUser?.text || "").replace(/\s+/g, " ").trim().slice(0, 42);
    return {
      title: snippet || t2("outline.turn").replace("{n}", String(item.turn)),
      meta: took ? state2 + " \xB7 " + took : state2
    };
  }
  function jumpToTurn(card, turn) {
    const body = card.el.querySelector(".iwb-body");
    const target = body.querySelector('.iwb-turncard[data-turn="' + turn + '"]');
    closeOutline();
    if (!target) {
      toast(t2("outline.notLoaded"));
      return;
    }
    target.scrollIntoView({ block: "center" });
    target.classList.remove("iwb-flash");
    void target.offsetWidth;
    target.classList.add("iwb-flash");
    setTimeout(() => target.classList.remove("iwb-flash"), 1100);
  }
  function openOutline(card, anchorEl) {
    if (outlinePop && outlineCard === card) {
      closeOutline();
      return;
    }
    closeOutline();
    const view = card.view;
    if (!view) return;
    const pop = el2("div", "iwb-popover iwb-outline");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("card.outline"));
    const head = el2("div", "iwb-popover-head");
    head.textContent = t2("card.outline");
    pop.appendChild(head);
    let previousUser = null;
    const rows = [];
    for (const item of view.items || []) {
      if (item.k === "user") {
        previousUser = item;
        continue;
      }
      if (item.k !== "turnProcess") continue;
      rows.push({ item, label: turnLabel(item, previousUser) });
    }
    if (!rows.length) {
      const empty = el2("div", "iwb-popover-note");
      empty.textContent = t2("outline.empty");
      pop.appendChild(empty);
    }
    for (const row of rows) {
      const button = el2("button", "iwb-outline-row");
      button.type = "button";
      button.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>';
      button.querySelector(".iwb-model-name").textContent = row.label.title;
      button.querySelector(".iwb-model-desc").textContent = row.label.meta;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        jumpToTurn(card, row.item.turn);
      });
      pop.appendChild(button);
    }
    const rect = anchorEl.getBoundingClientRect();
    pop.style.left = Math.round(rect.right - 240) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    outlinePop = pop;
    outlineCard = card;
    const measured = pop.getBoundingClientRect();
    if (measured.left < 8) pop.style.left = "8px";
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
  }
  let refPop = null;
  function closeRefPicker() {
    refPop?.remove();
    refPop = null;
  }
  function quoteText(text4, title) {
    const collapsed = String(text4 || "").replace(/\r/g, "").trim();
    const clipped = collapsed.length > 600 ? collapsed.slice(0, 600).trimEnd() + " \u2026" : collapsed;
    const quoted = clipped.split("\n").map((line) => "> " + line).join("\n");
    return "> \u300C" + title + "\u300D\n" + quoted + "\n\n";
  }
  function insertQuote(target, text4, sourceTitle) {
    const field = target.kind === "note" ? target.el.querySelector(".iwb-note-input") : target.el.querySelector(".iwb-foot textarea");
    if (!field) {
      toast(t2("ref.noTarget"));
      return false;
    }
    const block = quoteText(text4, sourceTitle);
    const start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? start;
    const before = field.value.slice(0, start);
    const after = field.value.slice(end);
    field.value = before + block + after;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.focus();
    const caret = (before + block).length;
    try {
      field.setSelectionRange(caret, caret);
    } catch {
    }
    ensureVisible(target);
    toast(t2("ref.inserted"));
    return true;
  }
  function openRefPicker(anchor, source, text4) {
    if (refPop) {
      closeRefPicker();
      return;
    }
    const targets = state.cards.filter((card) => card !== source);
    if (!targets.length) {
      toast(t2("ref.none"));
      return;
    }
    const pop = el2("div", "iwb-popover iwb-ref");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("ref.title"));
    const head = el2("div", "iwb-popover-head");
    head.textContent = t2("ref.title");
    pop.appendChild(head);
    for (const target of targets) {
      const button = el2("button", "iwb-model-row");
      button.type = "button";
      button.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>';
      button.querySelector(".iwb-model-name").textContent = target.title || t2("untitled");
      button.querySelector(".iwb-model-desc").textContent = target.kind === "note" ? t2("note.title") : target.workspace || t2("workspace.none");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        closeRefPicker();
        insertQuote(target, text4, source.title || t2("untitled"));
      });
      pop.appendChild(button);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left - 60) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    refPop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.left < 8) pop.style.left = "8px";
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
  }
  document.addEventListener("pointerdown", (event) => {
    if (!refPop) return;
    if (event.target?.closest?.(".iwb-ref")) return;
    closeRefPicker();
  }, true);
  document.addEventListener("pointerdown", (event) => {
    if (!outlinePop) return;
    if (event.target?.closest?.(".iwb-outline") || event.target?.closest?.('[data-act="outline"]')) return;
    closeOutline();
  }, true);
  function dispose() {
    closeRefPicker();
    closeOutline();
  }
  return {
    copyTranscript,
    transcriptMarkdown,
    openSearch,
    toggleSearch,
    runSearch,
    stepSearch,
    highlight,
    closeOutline,
    openOutline,
    closeRefPicker,
    openRefPicker,
    dispose
  };
}

// src/client/popovers.js
function createModelMenu(deps) {
  const { t: t2, layer, adapter, markDirty, toast, onEscapeExtras } = deps;
  const el2 = el;
  let popover = null;
  let popoverCard = null;
  function closeModelMenu() {
    if (popover) {
      popover.remove();
      popover = null;
    }
    popoverCard = null;
  }
  async function openModelMenu(card) {
    const anchor = card.el.querySelector(".iwb-meta");
    if (!anchor) return;
    if (popoverCard === card && popover) {
      closeModelMenu();
      return;
    }
    closeModelMenu();
    popoverCard = card;
    const pop = el2("div", "iwb-popover");
    const head = el2("div", "iwb-popover-head");
    head.textContent = t2("model.switchTitle");
    const list = el2("div", "iwb-popover-body");
    const loading = el2("div", "iwb-popover-note");
    loading.textContent = t2("model.loading");
    list.appendChild(loading);
    pop.append(head, list);
    layer.appendChild(pop);
    popover = pop;
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left, window.innerWidth - 320))) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    let catalog;
    try {
      catalog = await adapter.modelCatalog();
    } catch (error) {
      if (popover !== pop) return;
      list.textContent = "";
      const note = el2("div", "iwb-popover-note");
      note.textContent = error?.message || t2("model.error");
      list.appendChild(note);
      return;
    }
    if (popover !== pop) return;
    list.textContent = "";
    const current = card.view?.selection || null;
    const effortName = (model, id) => (model.reasoning?.efforts || []).find((entry) => entry.id === id)?.name || id;
    const commit = async (provider, model, effort) => {
      const selection = { provider, model: model.id };
      const resolved = effort !== void 0 ? effort : model.reasoning?.defaultEffort;
      if (resolved !== void 0 && resolved !== null && resolved !== "") selection.reasoningEffort = resolved;
      closeModelMenu();
      try {
        await adapter.selectModel(card.sessionId, selection);
        card.model = (model.name || model.id) + (selection.reasoningEffort ? " \xB7 " + effortName(model, selection.reasoningEffort) : "");
        markDirty(card);
        toast(t2("model.switched").replace("{name}", card.model));
      } catch (error) {
        toast(error?.message || t2("model.error"));
      }
    };
    const renderModels = () => {
      head.textContent = t2("model.switchTitle");
      list.textContent = "";
      for (const group of catalog.groups || []) {
        const groupLabel = el2("div", "iwb-model-group");
        groupLabel.textContent = group.name || group.id;
        list.appendChild(groupLabel);
        for (const model of group.models || []) {
          const selected = Boolean(current && current.provider === group.id && current.model === model.id);
          const row = el2("button", "iwb-model-row" + (selected ? " current" : ""));
          row.type = "button";
          row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span>' + (model.description ? '<span class="iwb-model-desc"></span>' : "") + "</span>" + (selected && model.reasoning?.efforts?.length ? '<span class="iwb-model-sub">' + t2("model.effortCurrent").replace("{name}", effortName(model, current.reasoningEffort || model.reasoning.defaultEffort)) + "</span>" : model.reasoning?.efforts?.length ? '<span class="iwb-model-sub">' + t2("model.effortCount").replace("{n}", String(model.reasoning.efforts.length)) + "</span>" : "") + (selected ? '<span class="iwb-check">\u2713</span>' : '<span class="iwb-check"></span>');
          row.querySelector(".iwb-model-name").textContent = model.name || model.id;
          if (model.description) row.querySelector(".iwb-model-desc").textContent = model.description;
          row.addEventListener("click", (event) => {
            event.stopPropagation();
            if (model.reasoning?.efforts?.length) renderEfforts(group, model);
            else void commit(group.id, model);
          });
          list.appendChild(row);
        }
      }
      const currentGroup = (catalog.groups || []).find((group) => group.id === current?.provider);
      const currentModel = (currentGroup?.models || []).find((model) => model.id === current?.model);
      if (current && currentModel?.reasoning?.efforts?.length) {
        const row = el2("button", "iwb-model-row iwb-effort-entry");
        row.type = "button";
        row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name">' + t2("model.effortRow") + '</span><span class="iwb-model-desc"></span></span><span class="iwb-model-sub"></span><span class="iwb-chev">\u203A</span>';
        row.querySelector(".iwb-model-desc").textContent = currentModel.name || currentModel.id;
        row.querySelector(".iwb-model-sub").textContent = effortName(currentModel, current.reasoningEffort || currentModel.reasoning.defaultEffort);
        row.addEventListener("click", (event) => {
          event.stopPropagation();
          renderEfforts(currentGroup, currentModel);
        });
        list.appendChild(row);
      }
      if (!list.childElementCount) {
        const note = el2("div", "iwb-popover-note");
        note.textContent = t2("model.empty");
        list.appendChild(note);
      }
    };
    const renderEfforts = (group, model) => {
      head.textContent = t2("model.effortTitle").replace("{name}", model.name || model.id);
      list.textContent = "";
      const back = el2("button", "iwb-model-back");
      back.type = "button";
      back.textContent = "\u2039 " + t2("model.back");
      back.addEventListener("click", (event) => {
        event.stopPropagation();
        renderModels();
      });
      list.appendChild(back);
      const efforts = model.reasoning?.efforts || [];
      const rows = [];
      const fallback = model.reasoning?.defaultEffort;
      if (fallback) rows.push({ id: fallback, name: t2("model.effortDefault"), description: "" });
      for (const effort of efforts) {
        if (rows.some((entry) => entry.id === effort.id)) continue;
        rows.push(effort);
      }
      for (const effort of rows) {
        const activeEffort = current?.reasoningEffort || model.reasoning?.defaultEffort;
        const selected = Boolean(current && current.provider === group.id && current.model === model.id && activeEffort === effort.id);
        const row = el2("button", "iwb-model-row" + (selected ? " current" : ""));
        row.type = "button";
        row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span>' + (effort.description ? '<span class="iwb-model-desc"></span>' : "") + "</span>" + (selected ? '<span class="iwb-check">\u2713</span>' : '<span class="iwb-check"></span>');
        row.querySelector(".iwb-model-name").textContent = effort.name || effort.id;
        if (effort.description) row.querySelector(".iwb-model-desc").textContent = effort.description;
        row.addEventListener("click", (event) => {
          event.stopPropagation();
          void commit(group.id, model, effort.id);
        });
        list.appendChild(row);
      }
    };
    renderModels();
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
    if (measured.right > window.innerWidth - 8) {
      pop.style.left = Math.max(8, Math.round(window.innerWidth - measured.width - 8)) + "px";
    }
  }
  const onDocumentPointerDown = (event) => {
    if (!popover) return;
    if (event.target?.closest?.(".iwb-popover") || event.target?.closest?.(".iwb-meta")) return;
    closeModelMenu();
  };
  const onDocumentKeyDown = (event) => {
    if (event.key !== "Escape") return;
    closeModelMenu();
    onEscapeExtras?.();
  };
  document.addEventListener("pointerdown", onDocumentPointerDown, true);
  document.addEventListener("keydown", onDocumentKeyDown);
  function dispose() {
    closeModelMenu();
    document.removeEventListener("pointerdown", onDocumentPointerDown, true);
    document.removeEventListener("keydown", onDocumentKeyDown);
  }
  return { open: openModelMenu, close: closeModelMenu, dispose, isOpen: () => Boolean(popover) };
}
function createArrangeMenu(deps) {
  const {
    t: t2,
    state,
    canvas,
    fitView,
    saveSoon,
    toast,
    defaultSize,
    gap,
    anchor,
    afterArrange
  } = deps;
  const el2 = el;
  const DEFAULT_W2 = defaultSize.w;
  const DEFAULT_H2 = defaultSize.h;
  const GAP2 = gap;
  let arrangePop = null;
  function closeArrange() {
    arrangePop?.remove();
    arrangePop = null;
  }
  function arrangeGrid(cards) {
    const cols = Math.max(1, Math.min(3, Math.floor(canvas.clientWidth / state.zoom / (DEFAULT_W2 + GAP2))));
    cards.forEach((card, index) => {
      card.x = index % cols * (DEFAULT_W2 + GAP2);
      card.y = Math.floor(index / cols) * (DEFAULT_H2 + GAP2);
    });
  }
  function arrangeByWorkspace(cards) {
    const groups = /* @__PURE__ */ new Map();
    for (const card of cards) {
      const key = card.kind === "note" ? t2("note.title") : card.workspace || t2("workspace.none");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(card);
    }
    let row = 0;
    for (const [, members] of groups) {
      members.forEach((card, index) => {
        card.x = index * (DEFAULT_W2 + GAP2);
        card.y = row * (DEFAULT_H2 + GAP2);
      });
      row += 1;
    }
  }
  function arrangeByActivity(cards) {
    const sorted = [...cards].sort((left, right) => (right.activityAt || 0) - (left.activityAt || 0));
    const cols = Math.max(1, Math.min(3, Math.floor(canvas.clientWidth / state.zoom / (DEFAULT_W2 + GAP2))));
    sorted.forEach((card, index) => {
      card.x = index % cols * (DEFAULT_W2 + GAP2);
      card.y = Math.floor(index / cols) * (DEFAULT_H2 + GAP2);
    });
  }
  function arrangeBy(strategy) {
    closeArrange();
    const movable = state.cards.filter((card) => !card.stackId && !card.pinned);
    if (!movable.length) return;
    if (strategy === "workspace") arrangeByWorkspace(movable);
    else if (strategy === "activity") arrangeByActivity(movable);
    else arrangeGrid(movable);
    for (const card of movable) {
      card.el.style.left = card.x + "px";
      card.el.style.top = card.y + "px";
    }
    saveSoon();
    void fitView();
    afterArrange?.();
    toast(t2("arrange.done"));
  }
  function openArrangeMenu() {
    if (arrangePop) {
      closeArrange();
      return;
    }
    const pop = el2("div", "iwb-popover iwb-arrange");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("arrange.title"));
    const head = el2("div", "iwb-popover-head");
    head.textContent = t2("arrange.title");
    pop.appendChild(head);
    const options = [
      { id: "grid", label: t2("arrange.grid") },
      { id: "workspace", label: t2("arrange.workspace") },
      { id: "activity", label: t2("arrange.activity") }
    ];
    for (const option of options) {
      const button = el2("button", "iwb-model-row");
      button.type = "button";
      button.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      button.querySelector(".iwb-model-name").textContent = option.label;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        arrangeBy(option.id);
      });
      pop.appendChild(button);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    arrangePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.right > window.innerWidth - 8) pop.style.left = Math.max(8, window.innerWidth - measured.width - 8) + "px";
  }
  anchor.addEventListener("click", (event) => {
    event.stopPropagation();
    openArrangeMenu();
  });
  const onArrangePointerDown = (event) => {
    if (!arrangePop) return;
    if (event.target?.closest?.(".iwb-arrange") || event.target?.closest?.(".iwb-toolbar")) return;
    closeArrange();
  };
  document.addEventListener("pointerdown", onArrangePointerDown, true);
  function disposeArrange() {
    closeArrange();
    document.removeEventListener("pointerdown", onArrangePointerDown, true);
  }
  return { open: openArrangeMenu, close: closeArrange, dispose: disposeArrange };
}
function createWorkspaceMenu(deps) {
  const { t: t2, adapter, toast, addSession, centerCard, anchor } = deps;
  const el2 = el;
  let workspacePop = null;
  function closeWorkspacePicker() {
    workspacePop?.remove();
    workspacePop = null;
  }
  async function createCardIn(workspace) {
    closeWorkspacePicker();
    try {
      const sessionId = await adapter.createSession({ workspaceId: workspace?.id });
      const card = addSession({
        sessionId,
        title: adapter.titleOf(sessionId) || t2("untitled"),
        workspace: workspace?.title || ""
      });
      if (card) centerCard(card);
    } catch (error) {
      toast(error?.message || t2("error.new"));
    }
  }
  function openWorkspacePicker() {
    if (workspacePop) {
      closeWorkspacePicker();
      return;
    }
    const workspaces = adapter.listWorkspaces?.() || [];
    if (!workspaces.length) {
      toast("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u5DE5\u4F5C\u533A\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u6DFB\u52A0\u5DE5\u4F5C\u533A\uFF0C\u518D\u521B\u5EFA\u4F1A\u8BDD");
      return;
    }
    const pop = el2("div", "iwb-popover iwb-workspaces");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("workspace.pick"));
    const head = el2("div", "iwb-popover-head");
    head.textContent = t2("workspace.pick");
    pop.appendChild(head);
    for (const workspace of workspaces) {
      const row = el2("button", "iwb-model-row iwb-workspace-row");
      row.type = "button";
      row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>';
      row.querySelector(".iwb-model-name").textContent = workspace.title || t2("workspace.untitled");
      const desc = row.querySelector(".iwb-model-desc");
      if (workspace.path) desc.textContent = workspace.path;
      else desc.remove();
      row.addEventListener("click", (event) => {
        event.stopPropagation();
        void createCardIn(workspace);
      });
      pop.appendChild(row);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    workspacePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.right > window.innerWidth - 8) {
      pop.style.left = Math.max(8, Math.round(window.innerWidth - measured.width - 8)) + "px";
    }
    if (measured.top + measured.height > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
  }
  const onWorkspacePointerDown = (event) => {
    if (!workspacePop) return;
    if (event.target?.closest?.(".iwb-workspaces") || event.target?.closest?.(".iwb-toolbar")) return;
    closeWorkspacePicker();
  };
  document.addEventListener("pointerdown", onWorkspacePointerDown, true);
  function disposeWorkspace() {
    closeWorkspacePicker();
    document.removeEventListener("pointerdown", onWorkspacePointerDown, true);
  }
  return { open: openWorkspacePicker, close: closeWorkspacePicker, dispose: disposeWorkspace };
}
function createSettingsMenu(deps) {
  const {
    t: t2,
    el: el2,
    state,
    saveSoon,
    applySizePreset,
    exportLayout,
    importLayout,
    resetLayout,
    closeArrange,
    closeWorkspace,
    closeOverlays,
    approvals,
    toast,
    anchor
  } = deps;
  let settingsPop = null;
  function closeSettings() {
    settingsPop?.remove();
    settingsPop = null;
  }
  function toggleInlineApprovals(value) {
    state.settings.inlineApprovals = Boolean(value);
    approvals?.setEnabled?.(state.settings.inlineApprovals);
    saveSoon();
    if (state.settings.inlineApprovals) toast(t2("settings.approvalsOn"));
  }
  function openSettings() {
    if (settingsPop) {
      closeArrange();
      closeOverlays();
      closeWorkspace();
      closeSettings();
      return;
    }
    const pop = el2("div", "iwb-popover iwb-settings");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("settings"));
    const head = el2("div", "iwb-popover-head");
    head.textContent = t2("settings");
    const row = document.createElement("label");
    row.className = "iwb-settings-row";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = Boolean(state.settings.inlineApprovals);
    box.addEventListener("change", () => toggleInlineApprovals(box.checked));
    const label = el2("span", "iwb-settings-label");
    label.textContent = t2("settings.inlineApprovals");
    row.append(box, label);
    const hintNode = el2("div", "iwb-popover-note");
    hintNode.textContent = t2("settings.inlineApprovalsHint");
    const wheelRow = document.createElement("label");
    wheelRow.className = "iwb-settings-row";
    const wheelBox = document.createElement("input");
    wheelBox.type = "checkbox";
    wheelBox.checked = state.settings.chainWheel !== false;
    wheelBox.addEventListener("change", () => {
      state.settings.chainWheel = wheelBox.checked;
      saveSoon();
    });
    const wheelLabel = el2("span", "iwb-settings-label");
    wheelLabel.textContent = t2("settings.chainWheel");
    wheelRow.append(wheelBox, wheelLabel);
    const sizeRow = el2("div", "iwb-settings-actions");
    const sizes = [
      { id: "compact", w: 340, h: 380 },
      { id: "normal", w: 420, h: 520 },
      { id: "wide", w: 560, h: 600 }
    ];
    for (const preset of sizes) {
      const btn = el2("button", "iwb-btn");
      btn.type = "button";
      btn.textContent = t2("settings.size." + preset.id);
      btn.addEventListener("click", () => {
        applySizePreset(preset);
        closeSettings();
      });
      sizeRow.appendChild(btn);
    }
    const fileRow = el2("div", "iwb-settings-actions");
    const exportBtn = el2("button", "iwb-btn");
    exportBtn.type = "button";
    exportBtn.textContent = t2("settings.export");
    exportBtn.addEventListener("click", () => {
      exportLayout();
      closeSettings();
    });
    const importBtn = el2("button", "iwb-btn");
    importBtn.type = "button";
    importBtn.textContent = t2("settings.import");
    const importInput = document.createElement("input");
    importInput.type = "file";
    importInput.accept = "application/json";
    importInput.hidden = true;
    importInput.addEventListener("change", () => {
      const file = importInput.files?.[0];
      if (!file) return;
      void importLayout(file);
      closeSettings();
    });
    importBtn.addEventListener("click", () => importInput.click());
    const resetBtn = el2("button", "iwb-btn");
    resetBtn.type = "button";
    resetBtn.textContent = t2("settings.reset");
    resetBtn.addEventListener("click", () => {
      resetLayout();
      closeSettings();
      toast(t2("settings.resetDone"));
    });
    fileRow.append(exportBtn, importBtn, resetBtn);
    const shortcuts = el2("div", "iwb-shortcuts");
    const shortcutsTitle = el2("div", "iwb-shortcuts-title");
    shortcutsTitle.textContent = t2("shortcuts.title");
    shortcuts.appendChild(shortcutsTitle);
    for (const key of ["shortcuts.move", "shortcuts.act", "shortcuts.find", "shortcuts.leave"]) {
      const line = el2("div", "iwb-shortcuts-row");
      line.textContent = t2(key);
      shortcuts.appendChild(line);
    }
    pop.append(head, row, hintNode, wheelRow, sizeRow, fileRow, shortcuts, importInput);
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    settingsPop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.right > window.innerWidth - 8) {
      pop.style.left = Math.max(8, Math.round(window.innerWidth - measured.width - 8)) + "px";
    }
    if (measured.top + measured.height > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
  }
  anchor.addEventListener("click", (event) => {
    event.stopPropagation();
    openSettings();
  });
  const onSettingsPointerDown = (event) => {
    if (!settingsPop) return;
    if (event.target?.closest?.(".iwb-settings") || event.target?.closest?.(".iwb-toolbar")) return;
    closeSettings();
  };
  document.addEventListener("pointerdown", onSettingsPointerDown, true);
  function disposeSettings() {
    closeSettings();
    document.removeEventListener("pointerdown", onSettingsPointerDown, true);
  }
  return { open: openSettings, close: closeSettings, dispose: disposeSettings };
}

// src/client/flow-recorder.js
function createFlowRecorder({ initialEvents, onChange, now = () => Date.now(), limit = 500 }) {
  let events = (Array.isArray(initialEvents) ? initialEvents : []).filter((event) => event && typeof event === "object").slice(-limit);
  let sequence = events.length;
  function notify() {
    onChange?.(events.slice());
  }
  function record(input) {
    const sourceSessionId = String(input?.sourceSessionId || "");
    const targetId = String(input?.targetId || "");
    if (!sourceSessionId || !targetId) return null;
    const targetKind = input?.targetKind === "note" ? "note" : "session";
    const event = {
      id: String(input?.id || "flow-" + now().toString(36) + "-" + (++sequence).toString(36)),
      at: Number(input?.at) || now(),
      canvasId: String(input?.canvasId || ""),
      taskId: String(input?.taskId || ""),
      sourceSessionId,
      targetId,
      targetKind,
      edgeKey: String(input?.edgeKey || sourceSessionId + "=>" + targetKind + ":" + targetId),
      status: String(input?.status || "waiting"),
      mode: input?.mode === "draft" ? "draft" : "send",
      message: String(input?.message || "").slice(0, 500),
      fingerprint: String(input?.fingerprint || "").slice(0, 180)
    };
    events = [...events, event].slice(-limit);
    notify();
    return event;
  }
  return {
    record,
    events: () => events.slice(),
    latestByEdge() {
      const latest = /* @__PURE__ */ new Map();
      for (const event of events) {
        const previous = latest.get(event.edgeKey);
        if (!previous || event.at >= previous.at) latest.set(event.edgeKey, event);
      }
      return latest;
    },
    forCanvas(canvasId) {
      if (!canvasId) return [];
      return events.filter((event) => event.canvasId === canvasId);
    },
    replace(next) {
      events = (Array.isArray(next) ? next : []).filter((event) => event && typeof event === "object").slice(-limit);
      sequence = events.length;
    },
    clear() {
      events = [];
      notify();
    }
  };
}

// src/client/task-store.js
var TASK_STORAGE_KEY = "dsh.inspiration-workbench.tasks.v1";
function createTaskStore(options = {}) {
  const clientId = options.clientId || Math.random().toString(36).slice(2) + Date.now().toString(36);
  const storage = options.storage || (typeof window !== "undefined" ? window.localStorage : null);
  const fetchRemote = options.fetchRemote || fetchTaskState;
  const pushRemote = options.pushRemote || pushTaskState;
  const subscribe = options.subscribe || subscribeRemoteLayout;
  const listeners = /* @__PURE__ */ new Set();
  let tasks = [];
  let flowEvents = [];
  let updatedAt = 0;
  let rev = 0;
  let saveTimer = 0;
  let disposed = false;
  let stopSync = null;
  function snapshot() {
    return { tasks: tasks.slice(), flowEvents: flowEvents.slice(), updatedAt, rev };
  }
  function notify() {
    const value = snapshot();
    for (const listener of listeners) listener(value);
  }
  function readLocal() {
    try {
      const parsed = JSON.parse(storage?.getItem(TASK_STORAGE_KEY) || "null");
      if (!parsed || typeof parsed !== "object") return null;
      return {
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
        flowEvents: Array.isArray(parsed.flowEvents) ? parsed.flowEvents : [],
        updatedAt: Number(parsed.updatedAt) || 0
      };
    } catch {
      return null;
    }
  }
  function writeLocal() {
    try {
      storage?.setItem(TASK_STORAGE_KEY, JSON.stringify({ tasks, flowEvents, updatedAt }));
    } catch {
    }
  }
  function adopt(value) {
    tasks = Array.isArray(value?.tasks) ? value.tasks : [];
    flowEvents = Array.isArray(value?.flowEvents) ? value.flowEvents : [];
    updatedAt = Number(value?.updatedAt) || 0;
    rev = Number(value?.rev) || rev;
    writeLocal();
    notify();
  }
  async function load() {
    const local = readLocal();
    if (local) adopt(local);
    const remote = await fetchRemote();
    if (remote && Number(remote.updatedAt) >= updatedAt) adopt(remote);
    if (!stopSync) {
      stopSync = subscribe((nextRev, sourceId) => {
        if (disposed || nextRev === rev || sourceId && sourceId === clientId || saveTimer) return;
        rev = nextRev;
        void fetchRemote().then((remoteState) => {
          if (remoteState && Number(remoteState.updatedAt) > updatedAt && !saveTimer) adopt(remoteState);
        });
      });
    }
    return snapshot();
  }
  function saveSoon() {
    if (disposed) return;
    updatedAt = Date.now();
    writeLocal();
    notify();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      saveTimer = 0;
      const result = await pushRemote(tasks, flowEvents, clientId);
      if (result?.rev) rev = result.rev;
      if (result?.updatedAt) updatedAt = result.updatedAt;
    }, 220);
  }
  return {
    snapshot,
    load,
    saveSoon,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setTasks(next) {
      tasks = Array.isArray(next) ? next : [];
      saveSoon();
    },
    addTasks(next) {
      const additions = Array.isArray(next) ? next : [];
      if (!additions.length) return;
      const byId = new Map(tasks.map((task) => [task.id, task]));
      for (const task of additions) byId.set(task.id, { ...byId.get(task.id), ...task });
      tasks = [...byId.values()];
      saveSoon();
    },
    updateTask(id, patch) {
      tasks = tasks.map((task) => task.id === id ? { ...task, ...patch, id, updatedAt: Date.now() } : task);
      saveSoon();
    },
    removeTask(id) {
      tasks = tasks.filter((task) => task.id !== id);
      saveSoon();
    },
    setFlowEvents(next) {
      flowEvents = Array.isArray(next) ? next.slice(-500) : [];
      saveSoon();
    },
    async flush() {
      clearTimeout(saveTimer);
      saveTimer = 0;
      return await pushRemote(tasks, flowEvents, clientId);
    },
    dispose() {
      disposed = true;
      clearTimeout(saveTimer);
      stopSync?.();
      stopSync = null;
      listeners.clear();
    }
  };
}

// src/client/task-model.js
var EXECUTION_STATUSES = Object.freeze([
  "idle",
  "running",
  "needs_input",
  "blocked",
  "done"
]);
var ACCEPTANCE_STATUSES = Object.freeze([
  "pending",
  "review",
  "accepted",
  "rejected"
]);
var TASK_STATUSES = Object.freeze([
  "needs_input",
  "blocked",
  "review",
  "running",
  "idle",
  "done"
]);
var STATUS_RANK = Object.freeze({
  needs_input: 0,
  blocked: 1,
  review: 2,
  running: 3,
  idle: 4,
  done: 5
});
var EXECUTION_ALIASES = Object.freeze({
  idle: "idle",
  pending: "idle",
  queued: "idle",
  waiting: "idle",
  cancelled: "idle",
  canceled: "idle",
  running: "running",
  active: "running",
  in_progress: "running",
  needs_input: "needs_input",
  need_input: "needs_input",
  waiting_input: "needs_input",
  awaiting_input: "needs_input",
  question: "needs_input",
  approval: "needs_input",
  blocked: "blocked",
  failed: "blocked",
  failure: "blocked",
  error: "blocked",
  done: "done",
  complete: "done",
  completed: "done",
  succeeded: "done"
});
var ACCEPTANCE_ALIASES = Object.freeze({
  pending: "pending",
  none: "pending",
  not_submitted: "pending",
  review: "review",
  in_review: "review",
  awaiting_review: "review",
  accepted: "accepted",
  accept: "accepted",
  approved: "accepted",
  passed: "accepted",
  not_required: "accepted",
  rejected: "rejected",
  denied: "rejected",
  changes_requested: "rejected"
});
function object(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function text(value) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}
function token(value) {
  return text(value).toLowerCase().replace(/[\s-]+/g, "_");
}
function executionStatus(value) {
  return EXECUTION_ALIASES[token(value)] || "idle";
}
function acceptanceStatus(value) {
  return ACCEPTANCE_ALIASES[token(value)] || "pending";
}
function statusesOf(value) {
  const task = object(value);
  const execution = object(task.execution);
  const acceptance = object(task.acceptance);
  const executionValue = task.executionStatus ?? execution.status;
  const acceptanceValue = task.acceptanceStatus ?? acceptance.status;
  const overall = token(task.status);
  let normalizedExecution;
  if (executionValue != null) {
    normalizedExecution = executionStatus(executionValue);
  } else if (overall === "review" || overall === "done") {
    normalizedExecution = "done";
  } else {
    normalizedExecution = executionStatus(overall);
  }
  let normalizedAcceptance;
  if (acceptanceValue != null) {
    normalizedAcceptance = acceptanceStatus(acceptanceValue);
  } else if (overall === "review") {
    normalizedAcceptance = "review";
  } else if (overall === "done") {
    normalizedAcceptance = "accepted";
  } else {
    normalizedAcceptance = "pending";
  }
  return {
    executionStatus: normalizedExecution,
    acceptanceStatus: normalizedAcceptance
  };
}
function deriveTaskStatus(task) {
  const { executionStatus: execution, acceptanceStatus: acceptance } = statusesOf(task);
  if (execution === "needs_input") return "needs_input";
  if (execution === "blocked") return "blocked";
  if (acceptance === "review") return "review";
  if (execution === "running") return "running";
  if (execution === "done" && acceptance === "accepted") return "done";
  if (execution === "done" && acceptance !== "rejected") return "review";
  return "idle";
}
function normalizeTask(value) {
  const task = object(value);
  const statuses = statusesOf(task);
  return {
    ...task,
    id: text(task.id),
    title: text(task.title),
    description: text(task.description),
    ...statuses,
    status: deriveTaskStatus(statuses)
  };
}
function compareText(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}
function numericOrder(task) {
  const value = Number(task.order);
  return task.order !== "" && task.order != null && Number.isFinite(value) ? value : 0;
}
function sortTasks(value) {
  if (!Array.isArray(value)) return [];
  return value.map((task, index) => ({ task: normalizeTask(task), index })).sort((left, right) => {
    const a = left.task;
    const b = right.task;
    return STATUS_RANK[a.status] - STATUS_RANK[b.status] || numericOrder(a) - numericOrder(b) || compareText(a.id, b.id) || compareText(a.title, b.title) || left.index - right.index;
  }).map(({ task }) => task);
}

// src/client/task-intelligence.js
var MAX_NODES = 12;
var DEFAULT_TITLE = "\u4EFB\u52A1\u8BA1\u5212";
function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function cleanText(value, fallback = "") {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "bigint") return String(value);
  return fallback;
}
function unique(values) {
  return [...new Set(values)];
}
function shortTitle(value, fallback) {
  const firstLine = cleanText(value).split(/\r?\n/, 1)[0];
  if (!firstLine) return fallback;
  return [...firstLine].slice(0, 60).join("");
}
function scanJson(source) {
  for (let start = 0; start < source.length; start += 1) {
    if (source[start] !== "{" && source[start] !== "[") continue;
    const stack = [];
    let quoted = false;
    let escaped = false;
    for (let cursor = start; cursor < source.length; cursor += 1) {
      const char = source[cursor];
      if (quoted) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === '"') quoted = false;
        continue;
      }
      if (char === '"') {
        quoted = true;
        continue;
      }
      if (char === "{" || char === "[") {
        stack.push(char === "{" ? "}" : "]");
        continue;
      }
      if (char !== "}" && char !== "]") continue;
      if (stack.pop() !== char) break;
      if (stack.length) continue;
      const candidate = source.slice(start, cursor + 1);
      try {
        return { found: true, value: JSON.parse(candidate) };
      } catch {
        break;
      }
    }
  }
  return { found: false, value: void 0 };
}
function parseAIResponse(response) {
  if (typeof response !== "string") {
    throw new TypeError("AI response must be a string");
  }
  const source = response.replace(/^\uFEFF/, "").trim();
  if (!source) throw new SyntaxError("AI response is empty");
  try {
    return JSON.parse(source);
  } catch {
  }
  const ticks = String.fromCharCode(96).repeat(3);
  const fence = new RegExp(ticks + "([^\r\n]*)\r?\n?([sS]*?)" + ticks, "g");
  for (let match = fence.exec(source); match; match = fence.exec(source)) {
    const info = match[1].trim();
    const block = /^(?:json)?$/i.test(info) ? match[2] : match[1] + "\n" + match[2];
    try {
      return JSON.parse(block.trim());
    } catch {
      const scanned2 = scanJson(block);
      if (scanned2.found) return scanned2.value;
    }
  }
  const scanned = scanJson(source);
  if (scanned.found) return scanned.value;
  throw new SyntaxError("AI response does not contain valid JSON");
}
function rawDependencies(node) {
  const value = node.dependsOn ?? node.dependencies ?? node.deps ?? [];
  const list = Array.isArray(value) ? value : [value];
  return unique(list.map((dependency) => {
    if (isRecord(dependency)) return cleanText(dependency.id ?? dependency.nodeId);
    return cleanText(dependency);
  }).filter(Boolean));
}
function rawEdges(plan) {
  if (!Array.isArray(plan.edges)) return [];
  return plan.edges.map((edge) => {
    const value = isRecord(edge) ? edge : {};
    return {
      from: cleanText(value.from ?? value.source ?? value.sourceId),
      to: cleanText(value.to ?? value.target ?? value.targetId)
    };
  });
}
function normalizeTopologyPlan(value) {
  let input = typeof value === "string" ? parseAIResponse(value) : value;
  if (isRecord(input) && !Array.isArray(input.nodes)) {
    if (isRecord(input.plan)) input = input.plan;
    else if (isRecord(input.topology)) input = input.topology;
  }
  if (!isRecord(input) || !Array.isArray(input.nodes)) {
    throw new TypeError("Topology plan must be an object with a nodes array");
  }
  const nodes = input.nodes.map((value2, index) => {
    const raw = isRecord(value2) ? value2 : {};
    const id = cleanText(raw.id ?? raw.key);
    const kind = cleanText(raw.kind ?? raw.type, "session").toLowerCase();
    const node = {
      id,
      kind,
      title: cleanText(raw.title ?? raw.name) || (kind === "note" ? "\u4FBF\u7B7E " : "\u4F1A\u8BDD ") + (index + 1),
      dependsOn: rawDependencies(raw)
    };
    if (kind === "note") {
      node.note = cleanText(raw.note ?? raw.content);
    } else {
      node.prompt = cleanText(raw.prompt ?? raw.instruction ?? raw.task);
    }
    const sessionId = cleanText(raw.sessionId);
    const workspace = cleanText(raw.workspace);
    if (sessionId) node.sessionId = sessionId;
    if (workspace) node.workspace = workspace;
    return node;
  });
  const explicitEdges = rawEdges(input);
  for (const edge of explicitEdges) {
    const source = nodes.find((node) => node.id === edge.from);
    if (source && edge.to) source.dependsOn = unique([...source.dependsOn, edge.to]);
  }
  const edgeMap = /* @__PURE__ */ new Map();
  const addEdge = (from, to) => {
    const key = from + "\0" + to;
    if (!edgeMap.has(key)) edgeMap.set(key, { from, to });
  };
  for (const node of nodes) {
    for (const dependency of node.dependsOn) addEdge(node.id, dependency);
  }
  for (const edge of explicitEdges) addEdge(edge.from, edge.to);
  return {
    title: cleanText(input.title ?? input.name) || DEFAULT_TITLE,
    goal: cleanText(input.goal ?? input.objective ?? input.brief),
    nodes,
    edges: [...edgeMap.values()]
  };
}
function ensureTopologyDependencies(value) {
  const plan = normalizeTopologyPlan(value);
  const sessions = plan.nodes.filter((node) => node.kind === "session");
  if (sessions.length < 2 || sessions.some((node) => node.dependsOn.length > 0)) return plan;
  const notes = plan.nodes.filter((node) => node.kind === "note");
  const preferredId = notes.flatMap((node) => node.dependsOn).find((id) => sessions.some((node) => node.id === id));
  const sink = preferredId ? sessions.find((node) => node.id === preferredId) : sessions.at(-1);
  const others = sessions.filter((node) => node !== sink);
  sink.dependsOn = others.map((node) => node.id);
  for (const note of notes) {
    if (!note.dependsOn.length) note.dependsOn = [sink.id];
  }
  return plan;
}
function validateTopologyPlan(value) {
  let plan;
  try {
    plan = normalizeTopologyPlan(value);
  } catch (error) {
    return {
      valid: false,
      errors: [{ code: "INVALID_PLAN", message: error.message || "\u62D3\u6251\u8BA1\u5212\u683C\u5F0F\u65E0\u6548" }]
    };
  }
  const errors = [];
  const add = (code, message, details = {}) => errors.push({ code, message, ...details });
  if (plan.nodes.length < 1 || plan.nodes.length > MAX_NODES) {
    add("NODE_COUNT", "\u62D3\u6251\u8BA1\u5212\u5FC5\u987B\u5305\u542B 1-12 \u4E2A\u8282\u70B9", { count: plan.nodes.length });
  }
  const counts = /* @__PURE__ */ new Map();
  for (const node of plan.nodes) counts.set(node.id, (counts.get(node.id) || 0) + 1);
  const byId = /* @__PURE__ */ new Map();
  for (const node of plan.nodes) {
    if (!node.id) add("INVALID_NODE_ID", "\u6BCF\u4E2A\u8282\u70B9\u90FD\u5FC5\u987B\u6709\u975E\u7A7A id");
    else if (counts.get(node.id) > 1) add("DUPLICATE_NODE_ID", "\u8282\u70B9 id \u4E0D\u80FD\u91CD\u590D\uFF1A" + node.id, { nodeId: node.id });
    if (!byId.has(node.id)) byId.set(node.id, node);
    if (node.kind !== "session" && node.kind !== "note") {
      add("INVALID_NODE_KIND", "\u8282\u70B9\u7C7B\u578B\u5FC5\u987B\u662F session \u6216 note", { nodeId: node.id, kind: node.kind });
    }
  }
  if (!plan.nodes.some((node) => node.kind === "session")) {
    add("NO_SESSION", "\u62D3\u6251\u8BA1\u5212\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u4F1A\u8BDD\u8282\u70B9");
  }
  for (const node of plan.nodes) {
    for (const dependency of node.dependsOn) {
      if (dependency === node.id) {
        add("SELF_DEPENDENCY", "\u8282\u70B9\u4E0D\u80FD\u4F9D\u8D56\u81EA\u8EAB\uFF1A" + node.id, { nodeId: node.id });
      }
      if (!byId.has(dependency)) {
        add("UNKNOWN_DEPENDENCY", "\u4F9D\u8D56\u8282\u70B9\u4E0D\u5B58\u5728\uFF1A" + dependency, { nodeId: node.id, dependencyId: dependency });
      }
    }
  }
  for (const edge of plan.edges) {
    const source = byId.get(edge.from);
    if (!source) {
      add("UNKNOWN_EDGE_SOURCE", "\u8FDE\u7EBF\u4E0A\u6E38\u8282\u70B9\u4E0D\u5B58\u5728\uFF1A" + edge.from, { nodeId: edge.from });
      if (!byId.has(edge.to)) {
        add("UNKNOWN_DEPENDENCY", "\u4F9D\u8D56\u8282\u70B9\u4E0D\u5B58\u5728\uFF1A" + edge.to, { nodeId: edge.from, dependencyId: edge.to });
      }
    }
    const dependency = byId.get(edge.to);
    if (dependency?.kind === "note") {
      add("NOTE_NOT_SINK", "\u4FBF\u7B7E\u53EA\u80FD\u4F5C\u4E3A\u6C47\u70B9\uFF0C\u4E0D\u80FD\u6709\u4E0B\u6E38\u8282\u70B9\uFF1A" + dependency.id, { nodeId: dependency.id });
    }
  }
  const ids = plan.nodes.filter((node) => node.id && counts.get(node.id) === 1).map((node) => node.id);
  const idSet = new Set(ids);
  const indegree = new Map(ids.map((id) => [id, 0]));
  const downstream = new Map(ids.map((id) => [id, []]));
  for (const node of plan.nodes) {
    if (!idSet.has(node.id)) continue;
    for (const dependency of node.dependsOn) {
      if (!idSet.has(dependency)) continue;
      indegree.set(node.id, indegree.get(node.id) + 1);
      downstream.get(dependency).push(node.id);
    }
  }
  const queue = ids.filter((id) => indegree.get(id) === 0);
  let visited = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const id = queue[cursor];
    visited += 1;
    for (const target of downstream.get(id)) {
      indegree.set(target, indegree.get(target) - 1);
      if (indegree.get(target) === 0) queue.push(target);
    }
  }
  if (visited < ids.length) add("CYCLE", "\u62D3\u6251\u4F9D\u8D56\u4E0D\u80FD\u6210\u73AF");
  return { valid: errors.length === 0, errors };
}
var TopologyPlanError = class extends Error {
  constructor(errors) {
    super("Invalid topology plan: " + errors.map((error) => error.code).join(", "));
    this.name = "TopologyPlanError";
    this.errors = errors;
  }
};
function validPlan(value) {
  const plan = normalizeTopologyPlan(value);
  const validation = validateTopologyPlan(plan);
  if (!validation.valid) throw new TopologyPlanError(validation.errors);
  return plan;
}
var LAYOUT_DEFAULTS = {
  direction: "horizontal",
  originX: 40,
  originY: 40,
  nodeWidth: 320,
  nodeHeight: 200,
  layerGap: 80,
  nodeGap: 24
};
function layoutOptions(options) {
  if (!isRecord(options)) throw new TypeError("Layout options must be an object");
  const result = { ...LAYOUT_DEFAULTS, ...options };
  if (result.direction !== "horizontal" && result.direction !== "vertical") {
    throw new RangeError("Layout direction must be horizontal or vertical");
  }
  for (const key of ["originX", "originY", "nodeWidth", "nodeHeight", "layerGap", "nodeGap"]) {
    if (typeof result[key] !== "number" || !Number.isFinite(result[key]) || result[key] < 0) {
      throw new RangeError(key + " must be a finite non-negative number");
    }
  }
  if (!result.nodeWidth || !result.nodeHeight) {
    throw new RangeError("Node width and height must be greater than zero");
  }
  return result;
}
function computeLayeredLayout(value, options = {}) {
  const plan = validPlan(value);
  const config = layoutOptions(options);
  const nodes = plan.nodes;
  const indexOf = new Map(nodes.map((node, index) => [node.id, index]));
  const layerOf = new Map(nodes.map((node) => [node.id, 0]));
  const indegree = new Map(nodes.map((node) => [node.id, node.dependsOn.length]));
  const downstream = new Map(nodes.map((node) => [node.id, []]));
  for (const node of nodes) {
    for (const dependency of node.dependsOn) downstream.get(dependency).push(node.id);
  }
  const queue = nodes.filter((node) => indegree.get(node.id) === 0).map((node) => node.id);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const id = queue[cursor];
    for (const target of downstream.get(id)) {
      layerOf.set(target, Math.max(layerOf.get(target), layerOf.get(id) + 1));
      indegree.set(target, indegree.get(target) - 1);
      if (indegree.get(target) === 0) queue.push(target);
    }
  }
  const layers = [];
  for (const id of queue) {
    const layer = layerOf.get(id);
    if (!layers[layer]) layers[layer] = [];
    layers[layer].push(id);
  }
  for (const layer of layers) {
    layer.sort((left, right) => indexOf.get(left) - indexOf.get(right));
  }
  const positions = [];
  layers.forEach((ids, layer) => {
    ids.forEach((id, column) => {
      const horizontal2 = config.direction === "horizontal";
      positions.push({
        id,
        layer,
        column,
        x: config.originX + (horizontal2 ? layer * (config.nodeWidth + config.layerGap) : column * (config.nodeWidth + config.nodeGap)),
        y: config.originY + (horizontal2 ? column * (config.nodeHeight + config.nodeGap) : layer * (config.nodeHeight + config.layerGap)),
        w: config.nodeWidth,
        h: config.nodeHeight
      });
    });
  });
  const layerCount = layers.length;
  const largestLayer = Math.max(...layers.map((layer) => layer.length));
  const horizontal = config.direction === "horizontal";
  return {
    direction: config.direction,
    layers,
    nodes: positions,
    width: config.originX * 2 + (horizontal ? layerCount * config.nodeWidth + (layerCount - 1) * config.layerGap : largestLayer * config.nodeWidth + (largestLayer - 1) * config.nodeGap),
    height: config.originY * 2 + (horizontal ? largestLayer * config.nodeHeight + (largestLayer - 1) * config.nodeGap : layerCount * config.nodeHeight + (layerCount - 1) * config.layerGap)
  };
}
function sessionCandidate(value) {
  const raw = typeof value === "string" ? { sessionId: value } : value;
  if (!isRecord(raw) || raw.kind === "note" || raw.type === "note") return null;
  const sessionId = cleanText(raw.sessionId ?? raw.id);
  if (!sessionId) return null;
  return {
    key: sessionId,
    sessionId,
    title: cleanText(raw.title ?? raw.name),
    workspace: cleanText(raw.workspace),
    prompt: cleanText(raw.prompt ?? raw.instruction ?? raw.composerDraft ?? raw.draft),
    pipeline: raw.pipeline
  };
}
function noteCandidate(value, index) {
  if (!isRecord(value) || value.kind !== "note" && value.type !== "note") return null;
  return {
    key: cleanText(value.id ?? value.noteId, "anonymous-note-" + (index + 1)),
    title: cleanText(value.title ?? value.name),
    note: cleanText(value.note ?? value.content)
  };
}
function pipelineTargets(pipeline) {
  if (!isRecord(pipeline)) return [];
  if (Array.isArray(pipeline.targets)) return pipeline.targets.filter(isRecord);
  if (pipeline.targetSessionId) {
    return [{ kind: "session", id: pipeline.targetSessionId, targetSessionId: pipeline.targetSessionId }];
  }
  return [];
}
function createLocalTaskDraft(value = {}) {
  const options = Array.isArray(value) ? { cards: value } : isRecord(value) ? value : {};
  const cards = Array.isArray(options.cards) ? options.cards : [];
  const sessions = Array.isArray(options.sessions) ? options.sessions : [];
  const goal = cleanText(options.goal ?? options.objective ?? options.brief);
  const title = cleanText(options.title) || shortTitle(goal, "\u753B\u5E03\u4EFB\u52A1\u8349\u6848");
  const sessionMap = /* @__PURE__ */ new Map();
  for (const raw of [...cards, ...sessions]) {
    const candidate = sessionCandidate(raw);
    if (candidate && !sessionMap.has(candidate.key)) sessionMap.set(candidate.key, candidate);
  }
  const noteMap = /* @__PURE__ */ new Map();
  cards.forEach((raw, index) => {
    const candidate = noteCandidate(raw, index);
    if (candidate && !noteMap.has(candidate.key)) noteMap.set(candidate.key, candidate);
  });
  const sessionCandidates = [...sessionMap.values()];
  if (!sessionCandidates.length) {
    return createFallbackTopology({ title, goal, sessions });
  }
  const selectedSessions = sessionCandidates.slice(0, MAX_NODES);
  const selectedNotes = [...noteMap.values()].slice(0, MAX_NODES - selectedSessions.length);
  const nodes = [];
  const sessionIds = /* @__PURE__ */ new Map();
  const noteIds = /* @__PURE__ */ new Map();
  selectedSessions.forEach((candidate, index) => {
    const id = "session-" + (index + 1);
    sessionIds.set(candidate.key, id);
    const nodeTitle = candidate.title || "\u4F1A\u8BDD " + (index + 1);
    const node = {
      id,
      kind: "session",
      title: nodeTitle,
      prompt: goal || candidate.prompt || "\u56F4\u7ED5\u300C" + nodeTitle + "\u300D\u7EE7\u7EED\u5DE5\u4F5C\uFF0C\u7ED9\u51FA\u7ED3\u8BBA\u3001\u4F9D\u636E\u548C\u4E0B\u4E00\u6B65\u3002",
      dependsOn: [],
      sessionId: candidate.sessionId
    };
    if (candidate.workspace) node.workspace = candidate.workspace;
    nodes.push(node);
  });
  selectedNotes.forEach((candidate, index) => {
    const id = "note-" + (index + 1);
    noteIds.set(candidate.key, id);
    nodes.push({
      id,
      kind: "note",
      title: candidate.title || "\u4FBF\u7B7E " + (index + 1),
      note: candidate.note,
      dependsOn: []
    });
  });
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  selectedSessions.forEach((candidate, index) => {
    const from = "session-" + (index + 1);
    for (const target of pipelineTargets(candidate.pipeline)) {
      const targetKey = cleanText(target.id ?? target.targetSessionId ?? target.targetNoteId);
      const to = target.kind === "note" ? noteIds.get(targetKey) : sessionIds.get(targetKey) || noteIds.get(targetKey);
      if (to) nodeById.get(to).dependsOn.push(from);
    }
  });
  const draft = normalizeTopologyPlan({ title, goal, nodes });
  if (validateTopologyPlan(draft).valid) return draft;
  nodes.forEach((node) => {
    node.dependsOn = [];
  });
  const sessionNodes = nodes.filter((node) => node.kind === "session");
  const noteNodes = nodes.filter((node) => node.kind === "note");
  for (let index = 1; index < sessionNodes.length; index += 1) {
    sessionNodes[index].dependsOn = [sessionNodes[index - 1].id];
  }
  for (const note of noteNodes) note.dependsOn = [sessionNodes[sessionNodes.length - 1].id];
  return normalizeTopologyPlan({ title, goal, nodes });
}
function createFallbackTopology(value = {}) {
  const options = typeof value === "string" ? { goal: value } : isRecord(value) ? value : {};
  const goal = cleanText(options.goal ?? options.objective ?? options.brief);
  const sessions = Array.isArray(options.sessions) ? options.sessions : [];
  const cards = Array.isArray(options.cards) ? options.cards : [];
  const existing = [...sessions, ...cards].map(sessionCandidate).find(Boolean);
  const sessionTitle = cleanText(options.sessionTitle) || existing?.title || "\u6267\u884C\u4EFB\u52A1";
  const session = {
    id: "session-1",
    kind: "session",
    title: sessionTitle,
    prompt: goal || existing?.prompt || "\u660E\u786E\u76EE\u6807\u4E0E\u7EA6\u675F\uFF0C\u6267\u884C\u4EFB\u52A1\uFF0C\u5E76\u6C47\u62A5\u53EF\u9A8C\u8BC1\u7684\u7ED3\u679C\u3002",
    dependsOn: []
  };
  if (existing?.sessionId) session.sessionId = existing.sessionId;
  if (existing?.workspace) session.workspace = existing.workspace;
  return normalizeTopologyPlan({
    title: cleanText(options.title) || shortTitle(goal, "\u57FA\u7840\u4EFB\u52A1"),
    goal,
    nodes: [
      session,
      {
        id: "note-1",
        kind: "note",
        title: cleanText(options.noteTitle) || "\u7ED3\u679C\u6C47\u603B",
        note: cleanText(options.note) || "# \u7ED3\u679C\u6C47\u603B",
        dependsOn: ["session-1"]
      }
    ]
  });
}

// src/client/task-ai.js
function assistantTextFromView(view) {
  const items = Array.isArray(view?.items) ? view.items : [];
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index];
    if (item?.k === "assistant" && typeof item.text === "string" && item.text.trim()) {
      return item.text.trim();
    }
  }
  return "";
}
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function runTaskAnalysis({
  adapter,
  prompt,
  workspaceId,
  timeoutMs = 12e4,
  selection,
  signal,
  pollMs = 450,
  title = "\u7075\u611F\u5DE5\u4F5C\u53F0 \xB7 \u4EFB\u52A1\u89C4\u5212"
}) {
  if (!adapter?.createSession || !adapter?.prompt) {
    throw new Error("\u5F53\u524D\u73AF\u5883\u6CA1\u6709\u63D0\u4F9B\u53EF\u7528\u7684 AI \u4F1A\u8BDD\u63A5\u53E3");
  }
  if (!String(prompt || "").trim()) throw new Error("\u89C4\u5212\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
  const sessionId = await adapter.createSession({ workspaceId, title, agentPreset: "minimal" });
  const stop = adapter.open(sessionId, () => {
  });
  let timedOut = false;
  const startedAt = Date.now();
  let sawRunning = false;
  const abort = async () => {
    try {
      await adapter.cancel(sessionId);
    } catch {
    }
  };
  signal?.addEventListener?.("abort", abort, { once: true });
  try {
    if (adapter.waitForReady) await adapter.waitForReady(sessionId, { timeoutMs: 15e3 });
    if (selection && adapter.selectModel) {
      await adapter.selectModel(sessionId, {
        provider: selection.provider,
        model: selection.model || selection.id,
        reasoningEffort: selection.reasoningEffort
      });
    }
    await adapter.prompt(sessionId, prompt, "queue");
    while (Date.now() - startedAt < timeoutMs) {
      if (signal?.aborted) throw new Error("\u5DF2\u53D6\u6D88\u672C\u6B21\u89C4\u5212");
      const view = adapter.read(sessionId);
      sawRunning = sawRunning || Boolean(view?.running);
      if (view?.lastError) throw new Error(String(view.lastError));
      const text4 = assistantTextFromView(view);
      if (text4 && !view?.running && (sawRunning || Date.now() - startedAt > 1800)) {
        return { sessionId, text: text4, title };
      }
      await sleep(pollMs);
    }
    timedOut = true;
    await abort();
    const error = new Error("\u672C\u6B21\u89C4\u5212\u8D85\u65F6\uFF0C\u5DF2\u505C\u6B62\u7B49\u5F85\uFF1B\u53EF\u5728\u539F\u751F\u4F1A\u8BDD\u4E2D\u67E5\u770B\u6216\u91CD\u8BD5");
    error.sessionId = sessionId;
    throw error;
  } catch (error) {
    if (!error.sessionId) error.sessionId = sessionId;
    if (!timedOut && signal?.aborted) await abort();
    throw error;
  } finally {
    signal?.removeEventListener?.("abort", abort);
    stop?.();
  }
}

// src/client/pipeline-utils.js
function pipelineFingerprint(text4) {
  const source = String(text4 || "");
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

// src/client/task-controller.js
function hashText(value) {
  let hash = 2166136261;
  for (const char of String(value || "")) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}
function asArray(value) {
  return Array.isArray(value) ? value : [];
}
function text2(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
function runtimeExecution(view) {
  return {
    running: Boolean(view?.running),
    waiting: view?.waiting || "",
    error: view?.error || view?.lastError || false,
    done: Boolean(view?.ready && !view?.running && (view?.items || []).some((item) => item.k === "assistant" && String(item.text || "").trim())),
    activityAt: Date.now()
  };
}
function createTaskController({ adapter, taskStore, flow, t: t2, toast, bridge }) {
  const liveRuntime = /* @__PURE__ */ new Map();
  const runtimeSignatures = /* @__PURE__ */ new Map();
  const runtimeSaveTimers = /* @__PURE__ */ new Map();
  function rawTasks() {
    return taskStore.snapshot().tasks;
  }
  function listWorkspaces() {
    return adapter.listWorkspaces?.() || [];
  }
  function defaultWorkspaceId() {
    const workspaces = listWorkspaces();
    const currentTitle = bridge.getCards().find((card) => card.workspace)?.workspace;
    const current = workspaces.find((workspace) => workspace.title === currentTitle);
    return current?.id || workspaces[0]?.id || "";
  }
  function requireWorkspaceId() {
    const workspaceId = defaultWorkspaceId();
    if (!workspaceId) throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u5DE5\u4F5C\u533A\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u6DFB\u52A0\u5DE5\u4F5C\u533A\uFF0C\u518D\u521B\u5EFA\u4F1A\u8BDD");
    return workspaceId;
  }
  function canvases() {
    return bridge.getCanvases() || [];
  }
  function taskById(id) {
    return rawTasks().find((task) => task.id === id);
  }
  function canvasNames(ids) {
    return asArray(ids).map((id) => canvases().find((canvas) => canvas.id === id)?.name).filter(Boolean);
  }
  function sessionRuntime(sessionId) {
    return liveRuntime.get(sessionId) || {};
  }
  function allRuntime(task) {
    return {
      ...task.sessionStates || {},
      ...Object.fromEntries((task.sessionIds || []).filter((id) => liveRuntime.has(id)).map((id) => [id, sessionRuntime(id)]))
    };
  }
  function executionFor(task) {
    const states = Object.values(allRuntime(task));
    if (states.some((state) => state.waiting)) return "needs_input";
    if (states.some((state) => state.error)) return "blocked";
    if (states.some((state) => state.running)) return "running";
    const relatedEvents = [...flow.latestByEdge().values()].filter((event) => event.taskId === task.id || (task.canvasIds || []).includes(event.canvasId));
    if (relatedEvents.some((event) => event.status === "failed")) return "blocked";
    if (relatedEvents.some((event) => event.status === "delivering")) return "running";
    const expectedStates = (task.sessionIds || []).length;
    if (expectedStates && states.length === expectedStates && states.every((state) => state.done)) {
      const pendingNote = (task.plan?.nodes || []).some((node) => {
        if (node.kind !== "note" || !node.cardId) return false;
        return (node.dependsOn || []).some((sourceId) => {
          const source = (task.plan.nodes || []).find((candidate) => candidate.id === sourceId && candidate.kind === "session");
          if (!source?.sessionId) return false;
          const event = flow.latestByEdge().get(source.sessionId + "=>note:" + node.cardId);
          const sourceCard = bridge.getCards().find((card) => card.sessionId === source.sessionId);
          const latestText = [...sourceCard?.view?.items || []].reverse().find((item) => item.k === "assistant" && String(item.text || "").trim())?.text || "";
          return event?.status !== "delivered" || event.fingerprint !== pipelineFingerprint(latestText);
        });
      });
      if (pendingNote) return "running";
      return "done";
    }
    return task.executionStatus || "idle";
  }
  function acceptanceFor(task) {
    if (task.acceptanceStatus) return task.acceptanceStatus;
    if (task.reviewStatus === "accepted") return "accepted";
    if (task.reviewStatus === "rejected") return "rejected";
    if (task.reviewStatus === "review" || task.reviewStatus === "pending") return "review";
    return "pending";
  }
  function projectNodes(task) {
    const runtime2 = allRuntime(task);
    const planNodes = Array.isArray(task.plan?.nodes) ? task.plan.nodes : [];
    if (!planNodes.length) {
      return (task.sessionIds || []).map((sessionId, index) => ({
        id: sessionId,
        kind: "session",
        title: adapter.titleOf(sessionId) || "\u8282\u70B9 " + (index + 1),
        sessionId,
        status: runtimeExecution(runtime2[sessionId] || {}).done ? "done" : runtimeExecution(runtime2[sessionId] || {}).running ? "running" : runtimeExecution(runtime2[sessionId] || {}).waiting ? "needs_input" : runtimeExecution(runtime2[sessionId] || {}).error ? "blocked" : "idle"
      }));
    }
    return planNodes.map((node, index) => {
      if (node.kind === "note") {
        const targetId = node.cardId || node.id;
        const event = [...flow.latestByEdge().values()].filter((item) => item.targetKind === "note" && item.targetId === targetId).sort((left, right) => right.at - left.at)[0];
        return {
          id: node.id,
          kind: "note",
          title: node.title || "\u7ED3\u679C\u4FBF\u7B7E",
          cardId: node.cardId,
          status: event?.status === "failed" ? "blocked" : event?.status === "delivering" ? "running" : event?.status === "delivered" ? "done" : "idle",
          activityAt: event?.at || 0
        };
      }
      const sessionId = node.sessionId || task.sessionIds?.[index] || "";
      const state = runtime2[sessionId] || {};
      return {
        id: node.id,
        kind: "session",
        title: node.title || adapter.titleOf(sessionId) || "\u8282\u70B9 " + (index + 1),
        sessionId,
        dependsOn: node.dependsOn || [],
        status: state.waiting ? "needs_input" : state.error ? "blocked" : state.running ? "running" : state.done ? "done" : "idle",
        activityAt: state.activityAt || 0
      };
    });
  }
  function projectTask(task) {
    const executionStatus2 = executionFor(task);
    const acceptanceStatus2 = acceptanceFor(task);
    const normalized = normalizeTask({ ...task, executionStatus: executionStatus2, acceptanceStatus: acceptanceStatus2 });
    const events = flow.events().filter(
      (event) => event.taskId === task.id || (task.canvasIds || []).includes(event.canvasId) || (task.sessionIds || []).includes(event.sourceSessionId)
    );
    return {
      ...task,
      executionStatus: executionStatus2,
      acceptanceStatus: acceptanceStatus2,
      ...task.executionStatus !== executionStatus2 ? (() => {
        taskStore.updateTask(task.id, { executionStatus: executionStatus2 });
        return {};
      })() : {},
      reviewStatus: acceptanceStatus2,
      status: normalized.status,
      canvasNames: canvasNames(task.canvasIds),
      events,
      pending: asArray(task.pending),
      sessionIds: asArray(task.sessionIds),
      canvasIds: asArray(task.canvasIds),
      acceptanceCriteria: asArray(task.acceptanceCriteria),
      deliverables: asArray(task.deliverables),
      nodes: projectNodes(task)
    };
  }
  function snapshot() {
    for (const card of bridge.getCards()) {
      if (!card.sessionId) continue;
      try {
        card.view = adapter.read(card.sessionId);
        card.running = Boolean(card.view?.running);
      } catch {
      }
      noteSessionRuntime(card);
      if (!card.running) bridge.maybeDeliverCompleted?.(card);
    }
    return {
      tasks: sortTasks(rawTasks().map(projectTask)),
      canvases: canvases()
    };
  }
  function noteSessionRuntime(card) {
    if (!card?.sessionId) return;
    const runtime2 = {
      running: Boolean(card.running),
      waiting: card.waiting || "",
      error: card.view?.lastError || ["error", "failure"].includes((card.view?.items || []).at(-1)?.k) || false,
      done: Boolean(card.view?.ready && !card.running && !card.queued && (card.view?.items || []).some((item) => item.k === "assistant" && String(item.text || "").trim())),
      activityAt: card.activityAt || Date.now()
    };
    const signature = JSON.stringify(runtime2);
    if (runtimeSignatures.get(card.sessionId) === signature) return;
    runtimeSignatures.set(card.sessionId, signature);
    liveRuntime.set(card.sessionId, runtime2);
    clearTimeout(runtimeSaveTimers.get(card.sessionId));
    runtimeSaveTimers.set(card.sessionId, setTimeout(() => {
      const next = rawTasks().map((task) => {
        if (!(task.sessionIds || []).includes(card.sessionId)) return task;
        return { ...task, sessionStates: { ...task.sessionStates || {}, [card.sessionId]: runtime2 } };
      });
      taskStore.setTasks(next);
      runtimeSaveTimers.delete(card.sessionId);
    }, 650));
  }
  function canvasIdsForSession(sessionId) {
    const ids = [];
    for (const canvas of canvases()) {
      const cards = Array.isArray(canvas.layout?.cards) ? canvas.layout.cards : [];
      if (cards.some((card) => card.sessionId === sessionId)) ids.push(canvas.id);
    }
    const current = bridge.getActiveCanvas();
    if (current && bridge.getCards().some((card) => card.sessionId === sessionId) && !ids.includes(current)) ids.push(current);
    return ids;
  }
  async function listSessions() {
    const recent = adapter.listRecentSessions?.(30) || [];
    const byId = new Map(recent.map((row) => [row.sessionId, row]));
    for (const card of bridge.getCards()) {
      if (!card.sessionId) continue;
      byId.set(card.sessionId, {
        sessionId: card.sessionId,
        title: card.title || adapter.titleOf(card.sessionId) || "\u672A\u547D\u540D\u4F1A\u8BDD",
        activityAt: card.activityAt || Date.now(),
        workspace: card.workspace || adapter.workspaceOf?.(card.sessionId)?.title || ""
      });
    }
    return [...byId.values()].map((row) => ({
      ...row,
      id: row.sessionId,
      displayTitle: row.title,
      workspaceName: row.workspace,
      updatedAt: row.activityAt,
      canvasIds: canvasIdsForSession(row.sessionId)
    }));
  }
  async function inspectSessions(sessionIds) {
    const selected = [...new Set(sessionIds)].slice(0, 12);
    const sessions = await listSessions();
    const inspections = [];
    for (const sessionId of selected) {
      const meta = sessions.find((row) => row.sessionId === sessionId) || { sessionId, title: adapter.titleOf(sessionId) || "\u672A\u547D\u540D\u4F1A\u8BDD" };
      const existing = bridge.getCards().find((card) => card.sessionId === sessionId);
      let view = existing?.view;
      let stop;
      if (!view) {
        stop = adapter.open(sessionId, () => {
        });
        try {
          if (adapter.waitForReady) await adapter.waitForReady(sessionId, { timeoutMs: 12e3 });
          view = adapter.read(sessionId);
        } finally {
          stop?.();
        }
      }
      const items = (view?.items || []).filter((item) => item.text && ["user", "assistant", "error", "failure"].includes(item.k)).slice(-12);
      const measuredRuntime = runtimeExecution(view);
      const runtime2 = existing ? { ...measuredRuntime, ...sessionRuntime(sessionId) } : measuredRuntime;
      liveRuntime.set(sessionId, runtime2);
      inspections.push({
        ...meta,
        canvasIds: canvasIdsForSession(sessionId),
        runtime: runtime2,
        lastAssistant: assistantTextFromView(view).slice(0, 3e3),
        transcript: items.map((item) => ({ role: item.k, text: String(item.text).slice(0, 1600) }))
      });
    }
    return inspections;
  }
  function localTaskDrafts(inspections) {
    const groups = /* @__PURE__ */ new Map();
    for (const inspection of inspections) {
      const canvasId = inspection.canvasIds?.[0] || "";
      const canvas = canvases().find((item) => item.id === canvasId);
      const key = canvasId || "workspace:" + (inspection.workspace || "\u672A\u5206\u7EC4");
      if (!groups.has(key)) groups.set(key, { key, canvas, sessions: [] });
      groups.get(key).sessions.push(inspection);
    }
    const now = Date.now();
    return [...groups.values()].map((group) => {
      const ids = group.sessions.map((item) => item.sessionId);
      const states = group.sessions.map((item) => item.runtime);
      const executionStatus2 = states.some((state) => state.waiting) ? "needs_input" : states.some((state) => state.error) ? "blocked" : states.some((state) => state.running) ? "running" : states.every((state) => state.done) ? "done" : "idle";
      const title = group.canvas?.name || group.sessions[0].workspace || group.sessions[0].title || "\u4F1A\u8BDD\u4EFB\u52A1";
      const pending = group.sessions.filter((item) => item.runtime.waiting || item.runtime.error).map((item) => (item.runtime.error ? "\u6267\u884C\u5931\u8D25\uFF1A" : "\u7B49\u5F85\u5904\u7406\uFF1A") + item.title);
      const canvasLayout = group.canvas?.layout?.cards || [];
      return {
        id: "draft-" + hashText(group.key + ids.join(",")),
        title,
        goal: group.canvas?.goal || "",
        summary: group.sessions.find((item) => item.lastAssistant)?.lastAssistant?.slice(0, 500) || ids.length + " \u4E2A\u5173\u8054\u4F1A\u8BDD\uFF0C\u7B49\u5F85\u8FDB\u4E00\u6B65\u6574\u7406\u3002",
        executionStatus: executionStatus2,
        acceptanceStatus: executionStatus2 === "done" ? "review" : "pending",
        priority: pending.length ? "high" : "normal",
        sessionIds: ids,
        canvasIds: group.canvas ? [group.canvas.id] : [],
        pending,
        acceptanceCriteria: [],
        deliverables: group.sessions.filter((item) => item.lastAssistant).map((item) => ({
          id: "message-" + item.sessionId,
          kind: "message",
          title: item.title + " \u7684\u6700\u65B0\u56DE\u590D",
          sessionId: item.sessionId
        })),
        sessionStates: Object.fromEntries(group.sessions.map((item) => [item.sessionId, item.runtime])),
        plan: createLocalTaskDraft({ cards: canvasLayout, sessions: group.sessions, title }),
        source: "scan",
        createdAt: now,
        updatedAt: now
      };
    });
  }
  function aiTaskDrafts(parsed, inspections) {
    const candidates = asArray(parsed?.tasks).length ? parsed.tasks : [parsed];
    const selectedIds = new Set(inspections.map((item) => item.sessionId));
    const localBySession = new Map(inspections.map((item) => [item.sessionId, item]));
    const drafts = [];
    for (const raw of candidates) {
      if (!raw || typeof raw !== "object") continue;
      const ids = asArray(raw.sessionIds || raw.sessions).map(String).filter((id) => selectedIds.has(id));
      if (!ids.length) continue;
      const related = ids.map((id) => localBySession.get(id));
      const canvasIds = [...new Set(related.flatMap((item) => item.canvasIds || []))];
      const runtime2 = localTaskDrafts(related)[0];
      drafts.push({
        ...runtime2,
        id: "draft-" + hashText((raw.title || "task") + ids.join(",")),
        title: text2(raw.title, runtime2.title),
        goal: text2(raw.goal || raw.objective),
        summary: text2(raw.summary || raw.description, runtime2.summary),
        pending: asArray(raw.pending || raw.todos).map(String),
        acceptanceCriteria: asArray(raw.acceptanceCriteria || raw.acceptance).map(String),
        priority: ["high", "normal", "low"].includes(raw.priority) ? raw.priority : runtime2.priority,
        canvasIds,
        sessionIds: ids,
        source: "scan-ai"
      });
    }
    return drafts;
  }
  async function listModels() {
    const catalog = await adapter.modelCatalog();
    const models = [];
    for (const group of catalog?.groups || []) {
      for (const model of group.models || []) {
        models.push({
          id: model.id,
          provider: model.provider || group.id,
          name: model.name || model.id,
          reasoningEffort: model.reasoning?.defaultEffort
        });
      }
    }
    const firstSession = bridge.getCards().find((card) => card.sessionId)?.sessionId;
    const selected = firstSession ? adapter.selectionOf?.(firstSession) : null;
    const fallback = selected || models[0] || null;
    const defaultModel = fallback ? { model: fallback.model || fallback.id, provider: fallback.provider } : null;
    return { models, defaultModel };
  }
  async function scan({ sessionIds, useAI, model }) {
    const inspections = await inspectSessions(sessionIds);
    if (!inspections.length) return [];
    const local = localTaskDrafts(inspections);
    if (!useAI) return local;
    const prompt = [
      "\u4F60\u662F\u4EFB\u52A1\u6574\u7406\u52A9\u624B\u3002\u6839\u636E\u7ED9\u5B9A\u7684\u771F\u5B9E DSH \u4F1A\u8BDD\uFF0C\u5F52\u7EB3\u4EFB\u52A1\u76EE\u6807\u3001\u5F53\u524D\u8FDB\u5C55\u548C\u5F85\u529E\u3002",
      '\u53EA\u8F93\u51FA JSON\uFF1A{"tasks":[{"title":"...","goal":"...","summary":"...","sessionIds":["..."],"pending":["..."],"acceptanceCriteria":["..."],"priority":"high|normal|low"}]}\u3002',
      "\u76F8\u540C\u76EE\u6807\u7684\u4F1A\u8BDD\u5E94\u5408\u5E76\uFF0C\u4E0D\u5F97\u521B\u9020\u4F1A\u8BDD\u4E2D\u4E0D\u5B58\u5728\u7684\u4EA4\u4ED8\u7269\uFF0C\u4E0D\u5F97\u6539\u5199 sessionIds\u3002\u72B6\u6001\u7531\u672C\u5730\u7CFB\u7EDF\u8BA1\u7B97\uFF0C\u4E0D\u9700\u8981\u4F60\u5224\u65AD\u3002",
      "\u4F1A\u8BDD\u6570\u636E\uFF1A" + JSON.stringify(inspections)
    ].join("\n");
    const workspaceId = adapter.listWorkspaces?.().find((workspace) => workspace.title === inspections[0].workspace)?.id || defaultWorkspaceId();
    const result = await runTaskAnalysis({ adapter, prompt, workspaceId });
    const parsed = parseAIResponse(result.text);
    const drafts = aiTaskDrafts(parsed, inspections);
    if (!drafts.length) {
      toast("AI \u6CA1\u6709\u8FD4\u56DE\u53EF\u5173\u8054\u7684\u4EFB\u52A1\uFF0C\u5DF2\u4FDD\u7559\u672C\u5730\u6574\u7406\u8349\u6848");
      return local;
    }
    return drafts;
  }
  async function plan({ requirement, workspaceId, useAI, model }) {
    const goal = String(requirement || "").trim();
    if (!goal) throw new Error("\u5148\u5199\u4E0B\u4F60\u60F3\u5B8C\u6210\u7684\u4E8B\u60C5");
    if (!useAI) {
      const fallback = createFallbackTopology({ goal, title: goal.slice(0, 60) });
      fallback.workspaceId = workspaceId || defaultWorkspaceId();
      fallback.acceptanceCriteria = ["\u7ED3\u679C\u53EF\u9A8C\u8BC1\uFF0C\u5E76\u6C47\u603B\u5230\u7ED3\u679C\u4FBF\u7B7E"];
      return fallback;
    }
    const prompt = [
      "\u4F60\u662F\u591A Agent \u5DE5\u4F5C\u6D41\u89C4\u5212\u52A9\u624B\u3002\u6839\u636E\u9700\u6C42\u590D\u6742\u5EA6\u62C6\u6210 4-12 \u4E2A\u53EF\u6267\u884C\u8282\u70B9\uFF0C\u4E0D\u8981\u51D1\u6570\uFF1B\u53EA\u6709\u804C\u8D23\u72EC\u7ACB\u3001\u8F93\u5165\u8F93\u51FA\u660E\u786E\u3001\u53EF\u5355\u72EC\u9A8C\u6536\u7684\u5DE5\u4F5C\u624D\u5355\u72EC\u6210\u8282\u70B9\u3002\u7B80\u5355\u4EFB\u52A1\u53EF\u4EE5\u5C11\u4E8E 4 \u4E2A\uFF0C\u590D\u6742\u4EFB\u52A1\u5E94\u5C3D\u91CF\u62C6\u7EC6\u3002",
      '\u53EA\u8F93\u51FA JSON\uFF1A{"title":"...","goal":"...","acceptanceCriteria":["..."],"nodes":[{"id":"research","kind":"session","title":"...","prompt":"...","dependsOn":[]},{"id":"delivery","kind":"note","title":"\u7ED3\u679C\u6C47\u603B","note":"# \u7ED3\u679C\u6C47\u603B","dependsOn":["research"]}]}\u3002',
      "session \u8282\u70B9\u5FC5\u987B\u662F\u771F\u5B9E\u53EF\u6267\u884C\u5DE5\u4F5C\uFF0C\u8986\u76D6\u5B9E\u9645\u9700\u8981\u7684\u5206\u6790\u3001\u8BBE\u8BA1\u3001\u5B9E\u73B0\u3001\u9A8C\u8BC1\u548C\u4EA4\u4ED8\u73AF\u8282\uFF0C\u4E0D\u5F97\u91CD\u590D\u6216\u6CDB\u6CDB\u800C\u8C08\u3002note \u8282\u70B9\u53EA\u80FD\u505A\u6700\u7EC8\u6216\u4E2D\u95F4\u7ED3\u679C\u6C47\u70B9\uFF0C\u4E0D\u80FD\u6709\u4E0B\u6E38\u3002dependsOn \u586B\u4E0A\u6E38\u8282\u70B9 id\uFF0C\u4F9D\u8D56\u5FC5\u987B\u771F\u5B9E\uFF0C\u4E0D\u8981\u7B80\u5355\u4E32\u6210\u4E00\u6761\u957F\u94FE\u3002\u6BCF\u4E2A session \u7684 prompt \u8981\u5305\u542B\u76EE\u6807\u3001\u8F93\u5165\u3001\u671F\u671B\u8F93\u51FA\u548C\u9A8C\u6536\u6807\u51C6\u3002",
      "\u7528\u6237\u9700\u6C42\uFF1A" + goal
    ].join("\n");
    const parsePlan = (text4) => {
      const parsed = parseAIResponse(text4);
      const candidate2 = parsed.plan || parsed.topology || parsed;
      return { candidate: candidate2, normalized: ensureTopologyDependencies(normalizeTopologyPlan(candidate2)) };
    };
    let result = await runTaskAnalysis({ adapter, prompt, workspaceId: workspaceId || defaultWorkspaceId(), selection: model });
    let parsedPlan;
    try {
      parsedPlan = parsePlan(result.text);
    } catch {
      result = await runTaskAnalysis({
        adapter,
        prompt: prompt + "\n\u4E0A\u4E00\u6B21\u8F93\u51FA\u65E0\u6CD5\u89E3\u6790\u4E3A\u6709\u6548\u62D3\u6251\u3002\u8BF7\u53EA\u8FD4\u56DE\u5408\u6CD5 JSON\uFF0C\u4E0D\u8981\u8F93\u51FA Markdown\u3001\u89E3\u91CA\u6216\u591A\u4F59\u6587\u5B57\u3002",
        workspaceId: workspaceId || defaultWorkspaceId(),
        selection: model
      });
      parsedPlan = parsePlan(result.text);
    }
    const { candidate, normalized } = parsedPlan;
    const validation = validateTopologyPlan(normalized);
    if (!validation.valid) throw new Error(validation.errors.map((error) => error.message).join("\uFF1B"));
    normalized.acceptanceCriteria = asArray(candidate.acceptanceCriteria || candidate.acceptance).map(String);
    normalized.workspaceId = workspaceId || defaultWorkspaceId();
    normalized.model = model ? { provider: model.provider, model: model.model || model.id, reasoningEffort: model.reasoningEffort } : void 0;
    const rawNodes = asArray(candidate.nodes);
    for (const node of normalized.nodes) {
      const raw = rawNodes.find((item) => (item.id || item.key) === node.id);
      node.mode = raw?.mode === "draft" ? "draft" : "send";
    }
    return normalized;
  }
  function linkTaskCanvas(task, canvasId) {
    const canvas = canvases().find((item) => item.id === canvasId);
    if (canvas) canvas.taskId = task.id;
    bridge.storeCanvases();
    taskStore.updateTask(task.id, { canvasIds: [.../* @__PURE__ */ new Set([...task.canvasIds || [], canvasId])] });
  }
  async function openTask(task, sessionId) {
    const current = taskById(task.id) || task;
    let canvasId = current.canvasIds?.[0];
    if (!canvasId) {
      const created = await createCanvas(current);
      canvasId = created.canvasId;
    } else if (bridge.getActiveCanvas() !== canvasId) {
      await bridge.requestSwitchCanvas(canvasId);
    }
    bridge.setMode("canvas");
    if (sessionId) {
      const card = bridge.getCards().find((item) => item.sessionId === sessionId);
      if (card) {
        bridge.centerCard(card);
        bridge.flash(card);
      }
    }
    return canvasId;
  }
  async function createCanvas(task) {
    if (task.plan && !(task.sessionIds || []).length) return materializePlan(task.plan, { start: false, task });
    await bridge.requestNewBlankCanvas();
    for (const sessionId of task.sessionIds || []) {
      bridge.addSession({ sessionId, title: adapter.titleOf(sessionId) });
    }
    if (!bridge.saveCanvasAs(task.title || "\u4EFB\u52A1\u753B\u5E03")) throw new Error("\u753B\u5E03\u4FDD\u5B58\u5931\u8D25");
    const canvasId = bridge.getActiveCanvas();
    linkTaskCanvas(task, canvasId);
    bridge.save();
    bridge.setMode("canvas");
    await bridge.fitView();
    return { taskId: task.id, canvasId };
  }
  async function materializePlan(value, options = {}) {
    const plan2 = ensureTopologyDependencies(normalizeTopologyPlan(value));
    plan2.acceptanceCriteria = asArray(value?.acceptanceCriteria || value?.acceptance).map(String);
    plan2.workspaceId = value?.workspaceId || "";
    const rawNodes = asArray(value?.nodes);
    for (const node of plan2.nodes) {
      const raw = rawNodes.find((item) => (item.id || item.key) === node.id);
      node.mode = raw?.mode === "draft" ? "draft" : "send";
    }
    const validation = validateTopologyPlan(plan2);
    if (!validation.valid) throw new Error(validation.errors.map((error) => error.message).join("\uFF1B"));
    const workspaceId = plan2.workspaceId || requireWorkspaceId();
    await bridge.requestNewBlankCanvas();
    const layout = computeLayeredLayout(plan2, { nodeWidth: 380, nodeHeight: 500, layerGap: 100, nodeGap: 32, originX: 40, originY: 40 });
    const positions = new Map(layout.nodes.map((node) => [node.id, node]));
    const cards = /* @__PURE__ */ new Map();
    const createdSessionIds = [];
    try {
      for (const layer of layout.layers) {
        for (const nodeId of layer) {
          const node = plan2.nodes.find((item) => item.id === nodeId);
          const position = positions.get(nodeId);
          if (node.kind === "note") {
            const card2 = bridge.addNote({ title: node.title, note: node.note || "# \u7ED3\u679C\u6C47\u603B", x: position.x, y: position.y, w: 380, h: 500 });
            node.cardId = card2.id;
            cards.set(nodeId, card2);
            continue;
          }
          const workspace = adapter.listWorkspaces?.().find((item) => item.id === plan2.workspaceId || item.title === node.workspace);
          const sessionId = node.sessionId || await adapter.createSession({ workspaceId: workspace?.id || workspaceId, agentPreset: "minimal" });
          if (plan2.model && adapter.selectModel) {
            if (adapter.waitForReady) await adapter.waitForReady(sessionId, { timeoutMs: 15e3 });
            await adapter.selectModel(sessionId, {
              provider: plan2.model.provider,
              model: plan2.model.model || plan2.model.id,
              reasoningEffort: plan2.model.reasoningEffort
            });
          }
          const card = bridge.addSession({ sessionId, title: node.title, workspace: workspace?.title || node.workspace || "", x: position.x, y: position.y, w: 380, h: 500, autoTask: true });
          node.sessionId = sessionId;
          cards.set(nodeId, card);
          createdSessionIds.push(sessionId);
        }
      }
      for (const node of plan2.nodes) {
        const targetCard = cards.get(node.id);
        for (const dependency of node.dependsOn) {
          const sourceCard = cards.get(dependency);
          if (!sourceCard || !targetCard) continue;
          const target = { kind: targetCard.kind === "note" ? "note" : "session", id: targetCard.kind === "note" ? targetCard.id : targetCard.sessionId, mode: node.mode === "draft" ? "draft" : "send" };
          const existing = sourceCard.pipeline?.targets || [];
          bridge.setPipeTargets(sourceCard, [...existing, target]);
          bridge.recordFlow(sourceCard, target, "waiting", { message: "\u62D3\u6251\u5DF2\u751F\u6210\uFF0C\u7B49\u5F85\u4E0A\u6E38\u5B8C\u6210" });
        }
      }
      for (const node of plan2.nodes) {
        if (node.kind !== "session") continue;
        const card = cards.get(node.id);
        card.composerDraft = node.prompt || plan2.goal;
        bridge.renderFoot(card);
      }
      const task = options.task || {
        id: "task-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
        title: plan2.title,
        goal: plan2.goal,
        source: "plan",
        createdAt: Date.now()
      };
      task.sessionIds = createdSessionIds;
      task.plan = plan2;
      task.acceptanceCriteria = plan2.acceptanceCriteria || task.acceptanceCriteria || [];
      task.executionStatus = options.start ? "running" : "idle";
      task.acceptanceStatus = task.acceptanceStatus || "pending";
      task.pending = options.start ? [] : ["\u68C0\u67E5\u5404\u8282\u70B9\u8349\u7A3F\uFF0C\u786E\u8BA4\u540E\u542F\u52A8"];
      task.updatedAt = Date.now();
      if (!bridge.saveCanvasAs(plan2.title || task.title)) throw new Error("\u753B\u5E03\u4FDD\u5B58\u5931\u8D25");
      const canvasId = bridge.getActiveCanvas();
      task.canvasIds = [.../* @__PURE__ */ new Set([...task.canvasIds || [], canvasId])];
      linkTaskCanvas(task, canvasId);
      taskStore.addTasks([task]);
      bridge.save();
      bridge.schedulePipelines();
      bridge.setMode("canvas");
      await bridge.fitView();
      if (options.start) {
        for (const node of plan2.nodes) {
          if (node.kind !== "session" || node.dependsOn.length) continue;
          const card = cards.get(node.id);
          const prompt = node.prompt || plan2.goal;
          card.composerDraft = "";
          bridge.renderFoot(card);
          await adapter.prompt(card.sessionId, prompt, "queue");
        }
      }
      return { taskId: task.id, canvasId };
    } catch (error) {
      if (cards.size) {
        const partialName = (plan2.title || "\u4EFB\u52A1\u753B\u5E03") + "\uFF08\u90E8\u5206\u751F\u6210\uFF09";
        bridge.saveCanvasAs(partialName);
        bridge.save();
      }
      throw error;
    }
  }
  function continuationDraft(task) {
    return [
      "\u8BF7\u7EE7\u7EED\u8FD9\u9879\u4EFB\u52A1\uFF0C\u5148\u7406\u89E3\u5DF2\u6709\u4E0A\u4E0B\u6587\uFF0C\u4E0D\u8981\u91CD\u590D\u5DF2\u7ECF\u5B8C\u6210\u7684\u5DE5\u4F5C\u3002",
      "\u4EFB\u52A1\u76EE\u6807\uFF1A" + (task.goal || task.title || "\u672A\u547D\u540D\u4EFB\u52A1"),
      task.summary ? "\u5F53\u524D\u8FDB\u5C55\uFF1A" + task.summary : "",
      task.pending?.length ? "\u672A\u5B8C\u6210\u4E8B\u9879\uFF1A\n- " + task.pending.join("\n- ") : "\u8BF7\u68C0\u67E5\u5E76\u8865\u9F50\u5269\u4F59\u4E8B\u9879\u3002",
      task.acceptanceCriteria?.length ? "\u9A8C\u6536\u6761\u4EF6\uFF1A\n- " + task.acceptanceCriteria.join("\n- ") : "",
      task.deliverables?.length ? "\u5DF2\u6709\u4EA4\u4ED8\u7269\uFF1A\n- " + task.deliverables.map((item) => item.title).join("\n- ") : ""
    ].filter(Boolean).join("\n\n");
  }
  async function continueTask(task) {
    const current = taskById(task.id) || task;
    await openTask(current);
    let sessionId = current.sessionIds?.[0];
    if (!sessionId) {
      sessionId = await adapter.createSession({ workspaceId: requireWorkspaceId() });
      bridge.addSession({ sessionId, title: current.title || "\u7EE7\u7EED\u4EFB\u52A1", focus: true });
      taskStore.updateTask(current.id, { sessionIds: [sessionId] });
    }
    const card = bridge.getCards().find((item) => item.sessionId === sessionId);
    if (!card) throw new Error("\u6CA1\u6709\u627E\u5230\u53EF\u7EED\u505A\u7684\u4F1A\u8BDD\u5361");
    card.composerDraft = continuationDraft(current);
    bridge.renderFoot(card);
    bridge.centerCard(card);
    bridge.flash(card);
    toast("\u5DF2\u751F\u6210\u7EED\u505A\u8349\u7A3F\uFF0C\u68C0\u67E5\u5185\u5BB9\u540E\u53D1\u9001");
  }
  return {
    snapshot,
    listModels,
    listWorkspaces,
    createWorkspace: ({ path }) => adapter.createWorkspace({ path }),
    listSessions,
    scan,
    plan,
    materializePlan,
    noteSessionRuntime,
    async addTasks(tasks) {
      const normalized = tasks.map((task) => ({ ...task, id: task.id || "task-" + hashText(task.title + Date.now()), updatedAt: Date.now() }));
      taskStore.addTasks(normalized);
      for (const task of normalized) {
        for (const canvasId of task.canvasIds || []) linkTaskCanvas(task, canvasId);
      }
    },
    async updateTask(task, patch) {
      taskStore.updateTask(task.id, patch);
    },
    async deleteTask(task) {
      for (const canvas of canvases()) {
        if (canvas.taskId === task.id) delete canvas.taskId;
      }
      bridge.storeCanvases();
      taskStore.removeTask(task.id);
    },
    async openTask(task) {
      return openTask(task);
    },
    async openSession(task, sessionId) {
      return openTask(task, sessionId);
    },
    async continueTask(task) {
      return continueTask(task);
    },
    async reviewTask(task, accepted) {
      taskStore.updateTask(task.id, accepted ? {
        acceptanceStatus: "accepted",
        executionStatus: "done",
        pending: []
      } : {
        acceptanceStatus: "rejected",
        executionStatus: "idle",
        pending: ["\u9A8C\u6536\u672A\u901A\u8FC7\uFF0C\u9700\u8981\u8FD4\u5DE5"]
      });
      toast(accepted ? "\u4EFB\u52A1\u5DF2\u9A8C\u6536\u5B8C\u6210" : "\u5DF2\u9000\u56DE\u4EFB\u52A1\uFF0C\u53EF\u7EE7\u7EED\u751F\u6210\u8FD4\u5DE5\u8349\u7A3F");
    },
    async createCanvas(task) {
      return createCanvas(task);
    },
    continuationDraft,
    dispose() {
      for (const timer of runtimeSaveTimers.values()) clearTimeout(timer);
      runtimeSaveTimers.clear();
    }
  };
}

// src/client/task-view.js
var STATUS_ORDER = ["needs_input", "blocked", "review", "running", "idle", "done"];
var STATUS_RANK2 = Object.fromEntries(STATUS_ORDER.map((status, index) => [status, index]));
var PRIORITY_RANK = { urgent: 0, high: 1, normal: 2, medium: 2, low: 3 };
var COPY = {
  title: ["\u4EFB\u52A1\u4E2D\u5FC3", "Task center"],
  scan: ["\u6574\u7406\u4F1A\u8BDD", "Organize sessions"],
  plan: ["\u89C4\u5212\u9700\u6C42", "Plan requirement"],
  refresh: ["\u5237\u65B0", "Refresh"],
  count: ["{shown} / {total} \u9879\u4EFB\u52A1", "{shown} / {total} tasks"],
  canvasCount: ["{n} \u5F20\u753B\u5E03", "{n} canvases"],
  filter: ["\u7B5B\u9009\u72B6\u6001", "Filter by status"],
  filterAll: ["\u5168\u90E8\u4EFB\u52A1", "All tasks"],
  filterAttention: ["\u5F85\u5904\u7406", "Needs attention"],
  sort: ["\u6392\u5E8F", "Sort"],
  sortSmart: ["\u667A\u80FD\u6392\u5E8F \xB7 \u5F85\u5904\u7406\u4F18\u5148", "Smart \xB7 Actionable first"],
  sortUpdated: ["\u6700\u8FD1\u66F4\u65B0", "Recently updated"],
  sortPriority: ["\u4F18\u5148\u7EA7", "Priority"],
  sortTitle: ["\u6807\u9898", "Title"],
  loading: ["\u6B63\u5728\u8BFB\u53D6\u4EFB\u52A1\u2026", "Loading tasks\u2026"],
  loadingDetail: ["\u6B63\u5728\u51C6\u5907\u4EFB\u52A1\u8BE6\u60C5\u2026", "Preparing task details\u2026"],
  retry: ["\u91CD\u8BD5", "Retry"],
  dismiss: ["\u5173\u95ED\u63D0\u793A", "Dismiss message"],
  loadError: ["\u4EFB\u52A1\u8BFB\u53D6\u5931\u8D25", "Could not load tasks"],
  emptyTitle: ["\u8FD8\u6CA1\u6709\u4EFB\u52A1", "No tasks yet"],
  emptyBody: ["\u6574\u7406\u73B0\u6709\u4F1A\u8BDD\uFF0C\u6216\u8F93\u5165\u4E00\u4E2A\u9700\u6C42\u6765\u751F\u6210\u6267\u884C\u62D3\u6251\u3002", "Organize existing sessions, or describe a requirement to build an execution topology."],
  emptyFilter: ["\u5F53\u524D\u7B5B\u9009\u4E0B\u6CA1\u6709\u4EFB\u52A1", "No tasks match this filter"],
  emptyFilterBody: ["\u6362\u4E00\u4E2A\u72B6\u6001\u7B5B\u9009\uFF0C\u6216\u521B\u5EFA\u4E00\u9879\u65B0\u4EFB\u52A1\u3002", "Try another status filter, or create a new task."],
  noSelection: ["\u9009\u62E9\u4E00\u9879\u4EFB\u52A1", "Select a task"],
  noSelectionBody: ["\u5728\u5DE6\u4FA7\u9009\u62E9\u4EFB\u52A1\uFF0C\u67E5\u770B\u76EE\u6807\u3001\u5F85\u5904\u7406\u4E8B\u9879\u548C\u4EA4\u4ED8\u7269\u3002", "Choose a task on the left to inspect its goal, pending items, and deliverables."],
  untitled: ["\u672A\u547D\u540D\u4EFB\u52A1", "Untitled task"],
  noSummary: ["\u8FD8\u6CA1\u6709\u4EFB\u52A1\u6458\u8981\u3002", "No task summary yet."],
  goal: ["\u76EE\u6807", "Goal"],
  summary: ["\u6458\u8981", "Summary"],
  pending: ["\u5F85\u5904\u7406\u4E8B\u9879", "Pending items"],
  acceptance: ["\u9A8C\u6536\u6807\u51C6", "Acceptance criteria"],
  deliverables: ["\u4EA4\u4ED8\u7269", "Deliverables"],
  nodeProgress: ["\u8282\u70B9\u8FDB\u5EA6", "Node progress"],
  nodeDoneCount: ["{done}/{total} \u4E2A\u8282\u70B9\u5DF2\u5B8C\u6210", "{done}/{total} nodes completed"],
  sessions: ["\u5173\u8054\u4F1A\u8BDD", "Linked sessions"],
  canvases: ["\u5173\u8054\u753B\u5E03", "Linked canvases"],
  source: ["\u6765\u6E90", "Source"],
  events: ["\u6700\u8FD1\u52A8\u6001", "Recent activity"],
  none: ["\u6682\u65E0", "None"],
  updated: ["\u66F4\u65B0\u4E8E {time}", "Updated {time}"],
  itemCount: ["{n} \u9879", "{n} items"],
  open: ["\u8FDB\u5165\u73B0\u573A", "Open workspace"],
  continue: ["\u7EED\u505A", "Continue"],
  continueDone: ["\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\u65E0\u9700\u7EED\u505A", "Completed tasks do not need continuation"],
  accept: ["\u901A\u8FC7\u9A8C\u6536", "Accept"],
  reject: ["\u8FD4\u4FEE", "Request changes"],
  createCanvas: ["\u751F\u6210\u753B\u5E03", "Create canvas"],
  delete: ["\u5220\u9664\u4EFB\u52A1", "Delete task"],
  editStatus: ["\u4EFB\u52A1\u72B6\u6001\uFF08\u81EA\u52A8\u66F4\u65B0\uFF09", "Task status (auto)"],
  autoStatus: ["\u81EA\u52A8\u66F4\u65B0", "Auto"],
  editPriority: ["\u4F18\u5148\u7EA7", "Priority"],
  openSession: ["\u6253\u5F00\u4F1A\u8BDD", "Open session"],
  handle: ["\u5904\u7406", "Handle"],
  moreEvents: ["\u4EC5\u663E\u793A\u6700\u8FD1 {shown} \u6761\uFF0C\u5171 {total} \u6761", "Showing the latest {shown} of {total} events"],
  updatedTask: ["\u4EFB\u52A1\u5DF2\u66F4\u65B0", "Task updated"],
  reviewedAccept: ["\u5DF2\u901A\u8FC7\u9A8C\u6536", "Task accepted"],
  reviewedReject: ["\u5DF2\u9000\u56DE\u8FD4\u4FEE", "Changes requested"],
  canvasCreated: ["\u4EFB\u52A1\u753B\u5E03\u5DF2\u521B\u5EFA", "Task canvas created"],
  deleted: ["\u4EFB\u52A1\u5DF2\u5220\u9664", "Task deleted"],
  deleteTitle: ["\u5220\u9664\u8FD9\u9879\u4EFB\u52A1\uFF1F", "Delete this task?"],
  deleteBody: ["\u5C06\u5220\u9664\u300C{name}\u300D\u53CA\u5176\u4EFB\u52A1\u8BB0\u5F55\uFF0C\u5173\u8054\u4F1A\u8BDD\u548C\u753B\u5E03\u672C\u8EAB\u4E0D\u4F1A\u88AB\u5220\u9664\u3002", "Delete \u201C{name}\u201D and its task record. Linked sessions and canvases themselves will not be deleted."],
  cancel: ["\u53D6\u6D88", "Cancel"],
  close: ["\u5173\u95ED", "Close"],
  confirmDelete: ["\u786E\u8BA4\u5220\u9664", "Delete task"],
  actionMissing: ["\u5F53\u524D\u73AF\u5883\u672A\u63D0\u4F9B {name} \u64CD\u4F5C", "The {name} action is unavailable in this environment"],
  actionFailed: ["\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5", "The action failed. Please try again"],
  selected: ["\u5DF2\u9009\u62E9 {n} \u9879", "{n} selected"],
  selectAll: ["\u5168\u9009", "Select all"],
  useAI: ["\u4F7F\u7528 AI \u8F85\u52A9\u5206\u6790", "Use AI-assisted analysis"],
  scanTitle: ["\u4ECE\u4F1A\u8BDD\u6574\u7406\u4EFB\u52A1", "Organize tasks from sessions"],
  scanIntro: ["\u9009\u62E9\u8981\u6574\u7406\u7684\u4F1A\u8BDD\u3002\u626B\u63CF\u540E\u53EF\u4EE5\u5148\u68C0\u67E5\u8349\u6848\uFF0C\u518D\u51B3\u5B9A\u54EA\u4E9B\u8FDB\u5165\u4EFB\u52A1\u4E2D\u5FC3\u3002", "Choose sessions to organize. Review the drafts before adding them to the task center."],
  sessionsLoading: ["\u6B63\u5728\u8BFB\u53D6\u4F1A\u8BDD\u5217\u8868\u2026", "Loading sessions\u2026"],
  sessionsEmpty: ["\u6CA1\u6709\u53EF\u6574\u7406\u7684\u4F1A\u8BDD", "No sessions available"],
  sessionsEmptyBody: ["\u5148\u5F00\u59CB\u4E00\u4E2A\u4F1A\u8BDD\uFF0C\u518D\u56DE\u6765\u6574\u7406\u4EFB\u52A1\u3002", "Start a session first, then come back to organize it."],
  sessionsError: ["\u4F1A\u8BDD\u5217\u8868\u8BFB\u53D6\u5931\u8D25", "Could not load sessions"],
  reloadSessions: ["\u91CD\u65B0\u8BFB\u53D6", "Reload sessions"],
  scanRun: ["\u626B\u63CF\u5E76\u751F\u6210\u8349\u6848", "Scan and create drafts"],
  scanning: ["\u6B63\u5728\u5206\u6790\u4F1A\u8BDD\u5E76\u63D0\u70BC\u4EFB\u52A1\u2026", "Analyzing sessions and extracting tasks\u2026"],
  scanError: ["\u4F1A\u8BDD\u6574\u7406\u5931\u8D25", "Could not organize sessions"],
  draftsTitle: ["\u9009\u62E9\u4EFB\u52A1\u8349\u6848", "Choose task drafts"],
  draftsEmpty: ["\u6CA1\u6709\u53D1\u73B0\u53EF\u65B0\u589E\u7684\u4EFB\u52A1", "No new tasks found"],
  draftsEmptyBody: ["\u53EF\u4EE5\u8FD4\u56DE\u9009\u62E9\u5176\u5B83\u4F1A\u8BDD\uFF0C\u6216\u6539\u7528\u9700\u6C42\u89C4\u5212\u3002", "Go back to choose other sessions, or plan a requirement instead."],
  back: ["\u8FD4\u56DE", "Back"],
  addTasks: ["\u6DFB\u52A0 {n} \u9879\u4EFB\u52A1", "Add {n} tasks"],
  tasksAdded: ["\u5DF2\u6DFB\u52A0 {n} \u9879\u4EFB\u52A1", "Added {n} tasks"],
  noSessionSelection: ["\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u4F1A\u8BDD", "Select at least one session"],
  scanLimit: ["\u4E00\u6B21\u6700\u591A\u6574\u7406 12 \u4E2A\u4F1A\u8BDD\uFF0C\u8BF7\u51CF\u5C11\u9009\u62E9", "Select no more than 12 sessions at a time"],
  noDraftSelection: ["\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u8349\u6848", "Select at least one draft"],
  planTitle: ["\u628A\u9700\u6C42\u62C6\u6210\u6267\u884C\u62D3\u6251", "Turn a requirement into an execution topology"],
  planIntro: ["\u63CF\u8FF0\u76EE\u6807\u3001\u7EA6\u675F\u548C\u671F\u671B\u4EA4\u4ED8\u7269\u3002\u751F\u6210\u540E\u53EF\u4EE5\u68C0\u67E5\u8282\u70B9\u4E0E\u4F9D\u8D56\uFF0C\u518D\u9009\u62E9\u8981\u843D\u5730\u7684\u8349\u6848\u3002", "Describe the goal, constraints, and expected deliverables. Review nodes and dependencies before materializing the selected drafts."],
  requirement: ["\u9700\u6C42\u63CF\u8FF0", "Requirement"],
  requirementPlaceholder: ["\u4F8B\u5982\uFF1A\u4E3A\u63D2\u4EF6\u589E\u52A0\u4EFB\u52A1\u6A21\u5F0F\uFF0C\u62C6\u5206\u754C\u9762\u3001\u6301\u4E45\u5316\u548C\u6D4B\u8BD5\uFF0C\u5E76\u7ED9\u51FA\u9A8C\u6536\u6807\u51C6\u2026", "Example: Add a task mode to the plugin, split UI, persistence and tests, and define acceptance criteria\u2026"],
  workspaceId: ["\u5DE5\u4F5C\u533A", "Workspace"],
  model: ["\u89C4\u5212\u6A21\u578B", "Planning model"],
  modelDefault: ["\u8DDF\u968F DSH \u9ED8\u8BA4\u6A21\u578B", "Use DSH default"],
  workspacePlaceholder: ["\u7559\u7A7A\u4F7F\u7528\u5F53\u524D\u5DE5\u4F5C\u533A", "Leave blank to use the current workspace"],
  workspaceEmpty: ["\u6682\u65E0\u5DE5\u4F5C\u533A\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u6DFB\u52A0", "No workspaces. Add one in DSH first"],
  workspaceRequired: ["\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u5DE5\u4F5C\u533A\uFF0C\u8BF7\u5148\u5728 DSH \u4E2D\u6DFB\u52A0\u540E\u518D\u521B\u5EFA\u4F1A\u8BDD", "Add a workspace in DSH before creating sessions"],
  createWorkspace: ["\u65B0\u5EFA\u5DE5\u4F5C\u533A", "Create workspace"],
  workspacePath: ["\u5DE5\u4F5C\u533A\u7EDD\u5BF9\u8DEF\u5F84", "Absolute workspace path"],
  workspacePathPlaceholder: ["\u4F8B\u5982\uFF1A/Users/name/project", "For example: /Users/name/project"],
  createWorkspaceConfirm: ["\u521B\u5EFA\u5E76\u9009\u4E2D", "Create and select"],
  createWorkspaceCancel: ["\u53D6\u6D88\u65B0\u5EFA", "Cancel"],
  generatePlan: ["\u751F\u6210\u62D3\u6251\u8349\u6848", "Generate topology"],
  planning: ["\u6B63\u5728\u5206\u6790\u9700\u6C42\u5E76\u89C4\u5212\u4F9D\u8D56\u2026", "Analyzing the requirement and planning dependencies\u2026"],
  planError: ["\u9700\u6C42\u89C4\u5212\u5931\u8D25", "Could not plan the requirement"],
  requirementRequired: ["\u8BF7\u5148\u586B\u5199\u9700\u6C42\u63CF\u8FF0", "Describe the requirement first"],
  planEmpty: ["\u6CA1\u6709\u751F\u6210\u53EF\u843D\u5730\u7684\u8282\u70B9", "No materializable nodes were generated"],
  planEmptyBody: ["\u8FD4\u56DE\u8865\u5145\u76EE\u6807\u548C\u4EA4\u4ED8\u7269\uFF0C\u7136\u540E\u91CD\u65B0\u751F\u6210\u3002", "Go back to add goals and deliverables, then generate again."],
  planReview: ["\u68C0\u67E5\u62D3\u6251\u4E0E\u8349\u6848", "Review topology and drafts"],
  startAfter: ["\u521B\u5EFA\u540E\u7ACB\u5373\u5F00\u59CB\u6267\u884C", "Start immediately after creation"],
  materialize: ["\u521B\u5EFA {n} \u9879\u4EFB\u52A1", "Create {n} tasks"],
  materialized: ["\u4EFB\u52A1\u62D3\u6251\u5DF2\u521B\u5EFA", "Task topology created"],
  editRequirement: ["\u4FEE\u6539\u9700\u6C42", "Edit requirement"],
  node: ["\u8282\u70B9 {n}", "Node {n}"],
  dependencies: ["\u4F9D\u8D56\uFF1A{name}", "Depends on: {name}"],
  noDependencies: ["\u65E0\u524D\u7F6E\u4F9D\u8D56", "No dependencies"],
  edges: ["\u4F9D\u8D56\u8FDE\u63A5", "Dependency edges"],
  noEdges: ["\u8282\u70B9\u4E4B\u95F4\u6CA1\u6709\u989D\u5916\u8FDE\u63A5", "No additional links between nodes"],
  sessionNode: ["\u4F1A\u8BDD", "Session"],
  noteNode: ["\u4FBF\u7B7E", "Note"],
  taskNode: ["\u4EFB\u52A1", "Task"],
  "status.needs_input": ["\u5F85\u8F93\u5165", "Needs input"],
  "status.blocked": ["\u53D7\u963B", "Blocked"],
  "status.review": ["\u5F85\u9A8C\u6536", "In review"],
  "status.running": ["\u8FDB\u884C\u4E2D", "Running"],
  "status.idle": ["\u5F85\u5F00\u59CB", "Idle"],
  "status.done": ["\u5DF2\u5B8C\u6210", "Done"],
  "status.attention": ["\u5F85\u5904\u7406", "Needs attention"],
  "review.pending": ["\u5C1A\u672A\u63D0\u4EA4\u9A8C\u6536", "Not submitted for review"],
  "review.review": ["\u7B49\u5F85\u9A8C\u6536", "Waiting for review"],
  "review.accepted": ["\u9A8C\u6536\u5DF2\u901A\u8FC7", "Accepted"],
  "review.rejected": ["\u5DF2\u9000\u56DE\u8FD4\u4FEE", "Changes requested"],
  "priority.urgent": ["\u7D27\u6025", "Urgent"],
  "priority.high": ["\u9AD8\u4F18\u5148\u7EA7", "High"],
  "priority.normal": ["\u666E\u901A", "Normal"],
  "priority.medium": ["\u666E\u901A", "Normal"],
  "priority.low": ["\u4F4E\u4F18\u5148\u7EA7", "Low"]
};
function token2(value) {
  return String(value ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
}
function text3(value) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}
function array(value) {
  return Array.isArray(value) ? value : [];
}
function timestamp(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const raw = text3(value);
  if (!raw) return 0;
  if (Number.isFinite(Number(raw))) return Number(raw);
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}
function errorText(error) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return "";
}
function itemText(item) {
  if (typeof item === "string" || typeof item === "number") return text3(item);
  if (!item || typeof item !== "object") return "";
  return text3(item.title ?? item.text ?? item.label ?? item.message ?? item.summary ?? item.goal ?? item.name ?? item.path ?? item.url ?? item.kind ?? item.type);
}
function endpointId(endpoint) {
  if (endpoint && typeof endpoint === "object") return text3(endpoint.id ?? endpoint.nodeId ?? endpoint.taskId);
  return text3(endpoint);
}
function createTaskView({ host, t: t2, el: el2, getSnapshot, actions = {}, toast }) {
  const doc = host?.ownerDocument || document;
  const make = el2 || ((tag, className, html) => {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  });
  const localeTitle = typeof t2 === "function" ? t2("title") : "";
  const english = /inspiration|english/i.test(localeTitle) || /^en(?:-|$)/i.test(doc.documentElement?.lang || "");
  const copy = (key, variables = {}) => {
    const translationKey = "task." + key;
    let value = typeof t2 === "function" ? t2(translationKey) : "";
    if (!value || value === translationKey) value = (COPY[key] || [key, key])[english ? 1 : 0];
    return String(value).replace(/\{(\w+)\}/g, (match, name) => variables[name] == null ? match : String(variables[name]));
  };
  const notify = (message) => {
    if (!message || typeof toast !== "function") return;
    try {
      toast(message);
    } catch {
    }
  };
  const state = {
    tasks: [],
    canvases: [],
    selectedId: null,
    filter: "all",
    sort: "smart",
    loading: true,
    loaded: false,
    error: ""
  };
  const busy = /* @__PURE__ */ new Set();
  const dialogBusy = /* @__PURE__ */ new WeakMap();
  const dialogs = /* @__PURE__ */ new Set();
  let disposed = false;
  let refreshVersion = 0;
  let dialogSequence = 0;
  const root = make("div", "iwb-root iwb-task-view");
  root.setAttribute("aria-label", copy("title"));
  const toolbar = make("div", "iwb-toolbar iwb-task-toolbar");
  const titles = make("div", "iwb-titles");
  const titleNode = make("div", "iwb-title");
  titleNode.textContent = copy("title");
  const countsNode = make("div", "iwb-counts");
  titles.append(titleNode, countsNode);
  const toolbarActions = make("div", "iwb-toolbar-actions");
  toolbar.append(titles, toolbarActions);
  root.appendChild(toolbar);
  function button(label, options = {}) {
    const node = make("button", "iwb-btn" + (options.className ? " " + options.className : ""));
    node.type = "button";
    if (options.icon) node.innerHTML = icon(options.icon, 13);
    const caption = make("span");
    caption.textContent = label;
    node.appendChild(caption);
    if (options.action) node.dataset.action = options.action;
    if (options.taskId != null) node.dataset.taskId = String(options.taskId);
    if (options.busyKey) node.dataset.busyKey = options.busyKey;
    if (options.busyScope) node.dataset.busyScope = options.busyScope;
    if (options.focusKey) node.dataset.focusKey = options.focusKey;
    if (options.async !== false) node.dataset.async = "true";
    if (options.disabled) node.dataset.staticDisabled = "true";
    if (options.title) node.title = options.title;
    if (options.label) node.setAttribute("aria-label", options.label);
    return node;
  }
  const scanButton = button(copy("scan"), { icon: "list", busyScope: "scan", action: "scan", title: copy("scanTitle") });
  const planButton = button(copy("plan"), { icon: "sparkle", className: "primary", busyScope: "plan", action: "plan", title: copy("planTitle") });
  toolbarActions.append(scanButton, planButton);
  const controls = make("div", "iwb-task-controls");
  const filterField = make("label", "iwb-task-control");
  const filterLabel = make("span", "iwb-task-control-label");
  filterLabel.textContent = copy("filter");
  const filterSelect = make("select", "iwb-task-select-control");
  filterSelect.dataset.focusKey = "filter";
  filterSelect.setAttribute("aria-label", copy("filter"));
  const filterOptions = [
    ["all", copy("filterAll")],
    ["attention", copy("filterAttention")],
    ...STATUS_ORDER.map((status) => [status, copy("status." + status)])
  ];
  for (const [value, label] of filterOptions) {
    const option = make("option");
    option.value = value;
    option.textContent = label;
    filterSelect.appendChild(option);
  }
  filterField.append(filterLabel, filterSelect);
  const sortField = make("label", "iwb-task-control");
  const sortLabel = make("span", "iwb-task-control-label");
  sortLabel.textContent = copy("sort");
  const sortSelect = make("select", "iwb-task-select-control");
  sortSelect.dataset.focusKey = "sort";
  sortSelect.setAttribute("aria-label", copy("sort"));
  for (const [value, key] of [["smart", "sortSmart"], ["updated", "sortUpdated"], ["priority", "sortPriority"], ["title", "sortTitle"]]) {
    const option = make("option");
    option.value = value;
    option.textContent = copy(key);
    sortSelect.appendChild(option);
  }
  sortField.append(sortLabel, sortSelect);
  const refreshButton = button(copy("refresh"), { icon: "arrange", async: false, action: "refresh", className: "iwb-task-refresh", focusKey: "refresh" });
  controls.append(filterField, sortField, refreshButton);
  root.appendChild(controls);
  const alertNode = make("div", "iwb-task-alert");
  alertNode.setAttribute("role", "alert");
  const alertText = make("span", "iwb-task-alert-text");
  const alertClose = button("", { icon: "close", async: false, className: "icon", label: copy("dismiss"), title: copy("dismiss") });
  alertNode.append(alertText, alertClose);
  alertNode.hidden = true;
  root.appendChild(alertNode);
  const layout = make("div", "iwb-task-layout");
  const listPanel = make("section", "iwb-task-list-panel");
  listPanel.setAttribute("aria-label", copy("filterAll"));
  const listHead = make("div", "iwb-task-list-head");
  const listCount = make("span", "iwb-task-list-count");
  listHead.appendChild(listCount);
  const listNode = make("div", "iwb-task-list");
  listNode.setAttribute("role", "list");
  listPanel.append(listHead, listNode);
  const detailNode = make("section", "iwb-task-detail");
  detailNode.setAttribute("aria-label", copy("noSelection"));
  layout.append(listPanel, detailNode);
  root.appendChild(layout);
  function priorityOf(task) {
    const raw = task.priority && typeof task.priority === "object" ? task.priority.value ?? task.priority.level : task.priority;
    if (typeof raw === "number") return raw <= 0 ? "urgent" : raw === 1 ? "high" : raw >= 3 ? "low" : "normal";
    const value = token2(raw);
    return Object.hasOwn(PRIORITY_RANK, value) ? value : "normal";
  }
  function reviewOf(task) {
    const value = token2(task.reviewStatus ?? task.acceptanceStatus ?? task.acceptance?.status);
    if (["review", "in_review", "awaiting_review"].includes(value)) return "review";
    if (["accepted", "approved", "passed", "not_required"].includes(value)) return "accepted";
    if (["rejected", "denied", "changes_requested"].includes(value)) return "rejected";
    return "pending";
  }
  function statusOf(task) {
    const overall = token2(task.status);
    if (Object.hasOwn(STATUS_RANK2, overall)) return overall;
    const execution = token2(task.executionStatus ?? task.execution?.status);
    const review = reviewOf(task);
    if (["needs_input", "need_input", "waiting_input", "awaiting_input", "question", "approval"].includes(execution)) return "needs_input";
    if (["blocked", "failed", "failure", "error"].includes(execution)) return "blocked";
    if (review === "review" || overall === "review") return "review";
    if (["running", "active", "in_progress"].includes(execution)) return "running";
    if (["done", "complete", "completed", "succeeded"].includes(execution) || overall === "done") {
      return review === "accepted" ? "done" : "review";
    }
    return "idle";
  }
  function viewOf(task, index) {
    const id = text3(task?.id) || "task-" + index;
    const pending = array(task?.pending);
    const canvasIds = array(task?.canvasIds).map(String);
    const canvasNames = array(task?.canvasNames).map(itemText).filter(Boolean);
    for (const canvasId of canvasIds) {
      const canvas = state.canvases.find((entry) => String(entry?.id ?? entry?.canvasId) === canvasId);
      const name = itemText(canvas);
      if (name && !canvasNames.includes(name)) canvasNames.push(name);
    }
    return {
      raw: task,
      index,
      id,
      title: text3(task?.title) || copy("untitled"),
      goal: text3(task?.goal),
      summary: text3(task?.summary),
      status: statusOf(task || {}),
      reviewStatus: reviewOf(task || {}),
      priority: priorityOf(task || {}),
      pending,
      sessionIds: array(task?.sessionIds).map(String).filter(Boolean),
      canvasIds,
      canvasNames,
      acceptanceCriteria: array(task?.acceptanceCriteria),
      deliverables: array(task?.deliverables),
      updatedAt: timestamp(task?.updatedAt ?? task?.createdAt),
      source: task?.source,
      events: array(task?.events),
      nodes: array(task?.nodes)
    };
  }
  function needsAttention(task) {
    return task.pending.length > 0 || ["needs_input", "blocked", "review"].includes(task.status);
  }
  function visibleTasks() {
    const filtered = state.tasks.filter((task) => {
      if (state.filter === "all") return true;
      if (state.filter === "attention") return needsAttention(task);
      return task.status === state.filter;
    });
    return filtered.sort((left, right) => {
      if (state.sort === "title") return left.title.localeCompare(right.title) || left.index - right.index;
      if (state.sort === "updated") return right.updatedAt - left.updatedAt || left.index - right.index;
      if (state.sort === "priority") {
        return PRIORITY_RANK[left.priority] - PRIORITY_RANK[right.priority] || Number(needsAttention(right)) - Number(needsAttention(left)) || right.updatedAt - left.updatedAt || left.index - right.index;
      }
      return Number(needsAttention(right)) - Number(needsAttention(left)) || STATUS_RANK2[left.status] - STATUS_RANK2[right.status] || PRIORITY_RANK[left.priority] - PRIORITY_RANK[right.priority] || right.updatedAt - left.updatedAt || left.index - right.index;
    });
  }
  function selectedTask() {
    return state.tasks.find((task) => task.id === state.selectedId) || null;
  }
  function formatTime(value, full = false) {
    const time = timestamp(value);
    if (!time) return "\u2014";
    try {
      return new Intl.DateTimeFormat(english ? "en-US" : "zh-CN", full ? { dateStyle: "medium", timeStyle: "short" } : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(time));
    } catch {
      return new Date(time).toLocaleString();
    }
  }
  function statusBadge(task) {
    const badge = make("span", "iwb-task-status is-" + task.status);
    badge.textContent = copy("status." + task.status);
    return badge;
  }
  function priorityBadge(task) {
    const badge = make("span", "iwb-task-priority is-" + task.priority);
    badge.textContent = copy("priority." + task.priority);
    return badge;
  }
  function stateBlock(kind, title, body, action) {
    const block = make("div", "iwb-task-state is-" + kind);
    block.setAttribute("role", kind === "error" ? "alert" : "status");
    if (kind === "loading") {
      const spinner = make("span", "iwb-task-spinner");
      spinner.setAttribute("aria-hidden", "true");
      block.appendChild(spinner);
    }
    const heading = make("div", "iwb-task-state-title");
    heading.textContent = title;
    block.appendChild(heading);
    if (body) {
      const description = make("div", "iwb-task-state-body");
      description.textContent = body;
      block.appendChild(description);
    }
    if (action) block.appendChild(action);
    return block;
  }
  function renderAlert() {
    alertNode.hidden = !state.error;
    alertText.textContent = state.error;
  }
  function taskBusy(taskId) {
    const prefix = "task:" + taskId + ":";
    return [...busy].some((key) => key.startsWith(prefix));
  }
  function scopeBusy(scope) {
    if (scope === "scan") return [...busy].some((key) => key.startsWith("scan:") || key === "sessions:list");
    if (scope === "plan") return [...busy].some((key) => key.startsWith("plan:"));
    return false;
  }
  function syncBusy() {
    if (disposed) return;
    root.setAttribute("aria-busy", String(state.loading));
    const containers = [root, ...[...dialogs].map((entry) => entry.dialog)];
    for (const container of containers) {
      const localBusy = container === root ? null : dialogBusy.get(container) || /* @__PURE__ */ new Set();
      for (const control of container.querySelectorAll("button, input, select, textarea")) {
        const isAsync = control.dataset.async === "true";
        let active = false;
        if (container !== root) active = localBusy.size > 0;
        else if (isAsync && control.dataset.taskId != null) active = taskBusy(control.dataset.taskId);
        else if (isAsync && control.dataset.busyScope) active = scopeBusy(control.dataset.busyScope);
        else if (isAsync && control.dataset.busyKey) active = busy.has(control.dataset.busyKey);
        if (control.dataset.action === "refresh" && state.loading) active = true;
        control.disabled = control.dataset.staticDisabled === "true" || active;
        control.classList.toggle("iwb-task-is-loading", Boolean(control.dataset.busyKey && busy.has(control.dataset.busyKey)));
      }
      if (container !== root) container.setAttribute("aria-busy", String(localBusy.size > 0));
    }
    for (const row of listNode.querySelectorAll("[data-task-row]")) {
      row.setAttribute("aria-busy", String(taskBusy(row.dataset.taskRow)));
    }
    const detail = detailNode.querySelector(".iwb-task-detail-inner");
    if (detail) detail.setAttribute("aria-busy", String(Boolean(state.selectedId && taskBusy(state.selectedId))));
  }
  function rememberFocus() {
    const active = doc.activeElement;
    return active && root.contains(active) ? active.dataset?.focusKey || "" : "";
  }
  function restoreFocus(focusKey) {
    if (!focusKey) return;
    const target = [...root.querySelectorAll("[data-focus-key]")].find((node) => node.dataset.focusKey === focusKey);
    if (target && !target.disabled) target.focus({ preventScroll: true });
  }
  function renderList(tasks) {
    listNode.replaceChildren();
    listCount.textContent = copy("count", { shown: tasks.length, total: state.tasks.length });
    if (state.loading) {
      listNode.appendChild(stateBlock("loading", copy("loading")));
      return;
    }
    if (!tasks.length) {
      const filtered = state.tasks.length > 0;
      const retry = !filtered && state.error ? button(copy("retry"), { async: false, action: "retry" }) : null;
      if (retry) retry.addEventListener("click", () => {
        void refresh();
      });
      listNode.appendChild(stateBlock(
        state.error && !filtered ? "error" : "empty",
        state.error && !filtered ? copy("loadError") : filtered ? copy("emptyFilter") : copy("emptyTitle"),
        state.error && !filtered ? state.error : filtered ? copy("emptyFilterBody") : copy("emptyBody"),
        retry
      ));
      return;
    }
    for (const task of tasks) {
      const row = make("article", "iwb-task-list-item" + (task.id === state.selectedId ? " is-selected" : ""));
      row.dataset.taskRow = task.id;
      row.setAttribute("role", "listitem");
      const select = make("button", "iwb-task-list-select");
      select.type = "button";
      select.dataset.focusKey = "list:" + task.id;
      select.setAttribute("aria-current", task.id === state.selectedId ? "true" : "false");
      const top = make("span", "iwb-task-list-top");
      const heading = make("span", "iwb-task-list-title");
      heading.textContent = task.title;
      top.append(heading, statusBadge(task));
      const summary = make("span", "iwb-task-list-summary");
      summary.textContent = task.summary || task.goal || copy("noSummary");
      const meta = make("span", "iwb-task-list-meta");
      const priority = priorityBadge(task);
      const time = make("span", "iwb-task-list-time");
      time.textContent = formatTime(task.updatedAt);
      time.title = formatTime(task.updatedAt, true);
      meta.append(priority, time);
      if (task.pending.length) {
        const pending = make("span", "iwb-task-pending-badge");
        pending.textContent = copy("itemCount", { n: task.pending.length });
        pending.title = copy("pending");
        meta.appendChild(pending);
      }
      select.append(top, summary, meta);
      select.addEventListener("click", () => {
        state.selectedId = task.id;
        render();
      });
      select.addEventListener("dblclick", (event) => {
        event.preventDefault();
        void runTaskAction(task, "openTask");
      });
      row.appendChild(select);
      listNode.appendChild(row);
    }
  }
  function section(title, items, className) {
    const container = make("section", "iwb-task-section" + (className ? " " + className : ""));
    const heading = make("h3", "iwb-task-section-title");
    heading.textContent = title;
    container.appendChild(heading);
    if (!items.length) {
      const empty = make("div", "iwb-task-inline-empty");
      empty.textContent = copy("none");
      container.appendChild(empty);
      return container;
    }
    const list = make("ul", "iwb-task-fact-list");
    for (const item of items) {
      const row = make("li", "iwb-task-fact");
      const marker = make("span", "iwb-task-fact-marker");
      marker.setAttribute("aria-hidden", "true");
      const content = make("div", "iwb-task-fact-content");
      const label = make("div", "iwb-task-fact-text");
      label.textContent = itemText(item) || copy("none");
      content.appendChild(label);
      const detail = item && typeof item === "object" ? text3(item.description ?? item.detail ?? item.reason) : "";
      if (detail && detail !== label.textContent) {
        const description = make("div", "iwb-task-fact-detail");
        description.textContent = detail;
        content.appendChild(description);
      }
      row.append(marker, content);
      list.appendChild(row);
    }
    container.appendChild(list);
    return container;
  }
  function renderPending(task) {
    const container = section(copy("pending"), task.pending, "iwb-task-pending-section");
    const rows = container.querySelectorAll(".iwb-task-fact");
    task.pending.forEach((pending, index) => {
      const sessionId = text3(pending?.sessionId ?? pending?.session?.id);
      if (!sessionId || !rows[index]) return;
      const open = button(copy("handle"), {
        icon: "open",
        taskId: task.id,
        className: "iwb-task-small-action",
        title: copy("openSession") + " \xB7 " + sessionId
      });
      open.addEventListener("click", () => {
        void runTaskAction(task, "openSession", [sessionId]);
      });
      rows[index].appendChild(open);
    });
    return container;
  }
  function renderDetail(task) {
    detailNode.replaceChildren();
    if (state.loading) {
      detailNode.appendChild(stateBlock("loading", copy("loadingDetail")));
      return;
    }
    if (!task) {
      detailNode.appendChild(stateBlock("empty", copy("noSelection"), copy("noSelectionBody")));
      return;
    }
    detailNode.setAttribute("aria-label", task.title);
    const inner = make("div", "iwb-task-detail-inner");
    inner.setAttribute("aria-busy", String(taskBusy(task.id)));
    const head = make("header", "iwb-task-detail-head");
    const badges = make("div", "iwb-task-detail-badges");
    badges.append(statusBadge(task), priorityBadge(task));
    const heading = make("h2", "iwb-task-detail-title");
    heading.textContent = task.title;
    const time = make("div", "iwb-task-detail-time");
    time.textContent = copy("updated", { time: formatTime(task.updatedAt) });
    time.title = formatTime(task.updatedAt, true);
    head.append(badges, heading, time);
    inner.appendChild(head);
    const actionBar = make("div", "iwb-task-detail-actions");
    const open = button(copy("open"), { icon: "open", className: "primary", taskId: task.id, focusKey: "open:" + task.id });
    open.addEventListener("click", () => {
      void runTaskAction(task, "openTask");
    });
    const resume = button(copy("continue"), {
      icon: "flow",
      taskId: task.id,
      disabled: task.status === "done",
      title: task.status === "done" ? copy("continueDone") : copy("continue"),
      focusKey: "continue:" + task.id
    });
    resume.addEventListener("click", async () => {
      const outcome = await runTaskAction(task, "continueTask");
      if (outcome.ok) notify(copy("updatedTask"));
    });
    actionBar.append(open, resume);
    if (task.status === "review" || task.reviewStatus === "review") {
      const reject = button(copy("reject"), { icon: "close", taskId: task.id, focusKey: "reject:" + task.id });
      reject.addEventListener("click", async () => {
        const outcome = await runTaskAction(task, "reviewTask", [false]);
        if (outcome.ok) notify(copy("reviewedReject"));
      });
      const accept = button(copy("accept"), { icon: "eye", className: "iwb-task-accept", taskId: task.id, focusKey: "accept:" + task.id });
      accept.addEventListener("click", async () => {
        const outcome = await runTaskAction(task, "reviewTask", [true]);
        if (outcome.ok) notify(copy("reviewedAccept"));
      });
      actionBar.append(reject, accept);
    }
    const canvas = button(copy("createCanvas"), { icon: "canvas", taskId: task.id, focusKey: "canvas:" + task.id });
    canvas.addEventListener("click", async () => {
      const outcome = await runTaskAction(task, "createCanvas");
      if (outcome.ok) notify(copy("canvasCreated"));
    });
    actionBar.appendChild(canvas);
    inner.appendChild(actionBar);
    const editors = make("div", "iwb-task-editors");
    const statusField = make("label", "iwb-task-editor");
    const statusText = make("span", "iwb-task-editor-label");
    statusText.textContent = copy("editStatus");
    const statusSelect = make("span", "iwb-task-auto-status");
    statusSelect.dataset.taskId = task.id;
    statusSelect.textContent = copy("status." + task.status) + " \xB7 " + copy("autoStatus");
    statusSelect.setAttribute("aria-label", copy("status." + task.status) + " \xB7 " + copy("autoStatus"));
    statusField.append(statusText, statusSelect);
    const priorityField = make("label", "iwb-task-editor");
    const priorityText = make("span", "iwb-task-editor-label");
    priorityText.textContent = copy("editPriority");
    const prioritySelect = make("select", "iwb-task-select-control");
    prioritySelect.dataset.async = "true";
    prioritySelect.dataset.taskId = task.id;
    prioritySelect.dataset.focusKey = "priority:" + task.id;
    for (const priority of ["urgent", "high", "normal", "low"]) {
      const option = make("option");
      option.value = priority;
      option.textContent = copy("priority." + priority);
      prioritySelect.appendChild(option);
    }
    prioritySelect.value = task.priority === "medium" ? "normal" : task.priority;
    prioritySelect.addEventListener("change", async () => {
      const next = prioritySelect.value;
      const outcome = await runTaskAction(task, "updateTask", [{ priority: next }]);
      if (outcome.ok) notify(copy("updatedTask"));
      else prioritySelect.value = task.priority;
    });
    priorityField.append(priorityText, prioritySelect);
    const spacer = make("span", "iwb-task-editor-spacer");
    const remove = button(copy("delete"), {
      icon: "close",
      className: "iwb-task-danger",
      taskId: task.id,
      focusKey: "delete:" + task.id
    });
    remove.addEventListener("click", () => {
      openDeleteDialog(task, remove);
    });
    editors.append(statusField, priorityField, spacer, remove);
    inner.appendChild(editors);
    if (task.goal) {
      const goal = make("section", "iwb-task-goal");
      const label = make("h3", "iwb-task-section-title");
      label.textContent = copy("goal");
      const content = make("p");
      content.textContent = task.goal;
      goal.append(label, content);
      inner.appendChild(goal);
    }
    const summary = make("section", "iwb-task-summary");
    const summaryTitle = make("h3", "iwb-task-section-title");
    summaryTitle.textContent = copy("summary");
    const summaryText = make("p");
    summaryText.textContent = task.summary || copy("noSummary");
    summary.append(summaryTitle, summaryText);
    inner.appendChild(summary);
    if (task.nodes?.length) {
      const nodes = make("section", "iwb-task-section iwb-task-nodes");
      const title = make("h3", "iwb-task-section-title");
      const doneCount = task.nodes.filter((node) => node.status === "done").length;
      title.textContent = copy("nodeProgress") + " \xB7 " + copy("nodeDoneCount", { done: doneCount, total: task.nodes.length });
      const list = make("div", "iwb-task-node-list");
      for (const node of task.nodes) {
        const row = make("div", "iwb-task-node-row");
        const info = make("div", "iwb-task-node-info");
        const name = make("span", "iwb-task-node-title");
        name.textContent = node.title || node.id;
        const kind = make("span", "iwb-task-node-kind");
        kind.textContent = node.kind === "note" ? copy("noteNode") : copy("sessionNode");
        const status = make("span", "iwb-task-node-status is-" + (node.status || "idle"));
        status.textContent = copy("status." + (node.status || "idle"));
        info.append(name, kind);
        row.append(info, status);
        list.appendChild(row);
      }
      nodes.append(title, list);
      inner.appendChild(nodes);
    }
    if (task.pending.length) inner.appendChild(renderPending(task));
    inner.appendChild(section(copy("acceptance"), task.acceptanceCriteria));
    inner.appendChild(section(copy("deliverables"), task.deliverables, "iwb-task-deliverables"));
    const links = make("div", "iwb-task-links-grid");
    const sessionSection = make("section", "iwb-task-section");
    const sessionTitle = make("h3", "iwb-task-section-title");
    sessionTitle.textContent = copy("sessions");
    const sessionList = make("div", "iwb-task-chip-list");
    if (!task.sessionIds.length) {
      const empty = make("span", "iwb-task-inline-empty");
      empty.textContent = copy("none");
      sessionList.appendChild(empty);
    }
    for (const sessionId of task.sessionIds) {
      const chip = button(sessionId, {
        icon: "open",
        className: "iwb-task-chip",
        taskId: task.id,
        title: copy("openSession") + " \xB7 " + sessionId
      });
      chip.addEventListener("click", () => {
        void runTaskAction(task, "openSession", [sessionId]);
      });
      sessionList.appendChild(chip);
    }
    sessionSection.append(sessionTitle, sessionList);
    const canvasSection = make("section", "iwb-task-section");
    const canvasTitle = make("h3", "iwb-task-section-title");
    canvasTitle.textContent = copy("canvases");
    const canvasList = make("div", "iwb-task-chip-list");
    if (!task.canvasNames.length) {
      const empty = make("span", "iwb-task-inline-empty");
      empty.textContent = copy("none");
      canvasList.appendChild(empty);
    }
    for (const name of task.canvasNames) {
      const chip = make("span", "iwb-task-chip is-static");
      chip.textContent = name;
      canvasList.appendChild(chip);
    }
    canvasSection.append(canvasTitle, canvasList);
    links.append(sessionSection, canvasSection);
    inner.appendChild(links);
    const sourceText = itemText(task.source);
    if (sourceText) {
      const source = make("div", "iwb-task-source");
      const label = make("span");
      label.textContent = copy("source");
      const value = make("span");
      value.textContent = sourceText;
      source.append(label, value);
      inner.appendChild(source);
    }
    if (task.events.length) {
      const eventSection = make("section", "iwb-task-section iwb-task-events");
      const eventTitle = make("h3", "iwb-task-section-title");
      eventTitle.textContent = copy("events");
      const eventList = make("ol", "iwb-task-event-list");
      const events = task.events.slice(-6).reverse();
      for (const event of events) {
        const row = make("li", "iwb-task-event");
        const marker = make("span", "iwb-task-event-marker");
        marker.setAttribute("aria-hidden", "true");
        const body = make("div", "iwb-task-event-body");
        const eventLabel = make("div", "iwb-task-event-title");
        const stateLabel = text3(event?.state ?? event?.status ?? event?.type ?? event?.action);
        eventLabel.textContent = itemText(event) || stateLabel || copy("updatedTask");
        const eventTime = make("time", "iwb-task-event-time");
        const at = event?.timestamp ?? event?.at ?? event?.updatedAt ?? event?.createdAt;
        eventTime.textContent = formatTime(at);
        eventTime.title = formatTime(at, true);
        body.append(eventLabel, eventTime);
        row.append(marker, body);
        eventList.appendChild(row);
      }
      eventSection.append(eventTitle, eventList);
      if (task.events.length > events.length) {
        const note = make("div", "iwb-task-event-note");
        note.textContent = copy("moreEvents", { shown: events.length, total: task.events.length });
        eventSection.appendChild(note);
      }
      inner.appendChild(eventSection);
    }
    detailNode.appendChild(inner);
  }
  function render() {
    if (disposed) return;
    const focusKey = rememberFocus();
    const tasks = visibleTasks();
    if (!tasks.some((task) => task.id === state.selectedId)) state.selectedId = tasks[0]?.id || null;
    countsNode.textContent = copy("count", { shown: tasks.length, total: state.tasks.length }) + " \xB7 " + copy("canvasCount", { n: state.canvases.length });
    filterSelect.value = state.filter;
    sortSelect.value = state.sort;
    renderAlert();
    renderList(tasks);
    renderDetail(selectedTask());
    syncBusy();
    restoreFocus(focusKey);
  }
  function applySnapshot(snapshot) {
    const value = snapshot && typeof snapshot === "object" ? snapshot : {};
    state.canvases = array(value.canvases);
    state.tasks = array(value.tasks).map((task, index) => viewOf(task || {}, index));
    state.loading = false;
    state.loaded = true;
    state.error = "";
    render();
    return snapshot;
  }
  function failSnapshot(error) {
    state.loading = false;
    state.loaded = true;
    state.error = errorText(error) || copy("loadError");
    render();
    return null;
  }
  function refresh() {
    if (disposed) return null;
    const version = ++refreshVersion;
    let snapshot;
    try {
      snapshot = typeof getSnapshot === "function" ? getSnapshot() : {};
    } catch (error) {
      return failSnapshot(error);
    }
    if (snapshot && typeof snapshot.then === "function") {
      state.loading = true;
      render();
      return Promise.resolve(snapshot).then((value) => version === refreshVersion && !disposed ? applySnapshot(value) : null).catch((error) => version === refreshVersion && !disposed ? failSnapshot(error) : null);
    }
    return applySnapshot(snapshot);
  }
  function requireAction(name) {
    const action = actions?.[name];
    if (typeof action !== "function") throw new Error(copy("actionMissing", { name }));
    return action;
  }
  function clearError(dialog) {
    if (dialog) dialog.clearError();
    else {
      state.error = "";
      renderAlert();
    }
  }
  async function runBusy(key, operation, options = {}) {
    if (disposed || busy.has(key)) return { ok: false, cancelled: true };
    const dialog = options.dialog || null;
    busy.add(key);
    if (dialog) {
      const keys = dialogBusy.get(dialog.dialog) || /* @__PURE__ */ new Set();
      keys.add(key);
      dialogBusy.set(dialog.dialog, keys);
    }
    clearError(dialog);
    syncBusy();
    try {
      const value = await Promise.resolve().then(operation);
      if (value && value.ok === false) throw new Error(errorText(value.error) || copy("actionFailed"));
      if (options.refresh && !disposed) await refresh();
      return { ok: true, value };
    } catch (error) {
      const message = errorText(error) || copy("actionFailed");
      if (!disposed) {
        if (dialog?.isOpen()) dialog.setError(message);
        else {
          state.error = message;
          renderAlert();
        }
        notify(message);
      }
      return { ok: false, error };
    } finally {
      busy.delete(key);
      if (dialog) {
        const keys = dialogBusy.get(dialog.dialog);
        keys?.delete(key);
      }
      syncBusy();
    }
  }
  function runTaskAction(task, name, args = [], dialog = null, refreshAction = true) {
    return runBusy("task:" + task.id + ":" + name, () => requireAction(name)(task.raw, ...args), {
      dialog,
      refresh: refreshAction
    });
  }
  function openDialog(title, trigger, kind = "") {
    const previousFocus = trigger || doc.activeElement;
    const dialog = make("dialog", "iwb-task-dialog" + (kind ? " iwb-task-dialog-" + kind : ""));
    const titleId = "iwb-task-dialog-title-" + ++dialogSequence;
    dialog.setAttribute("aria-labelledby", titleId);
    const head = make("header", "iwb-task-dialog-head");
    const heading = make("h2", "iwb-task-dialog-title");
    heading.id = titleId;
    heading.textContent = title;
    const closeButton = button("", { icon: "close", async: false, className: "icon", label: copy("close"), title: copy("close") });
    head.append(heading, closeButton);
    const body = make("div", "iwb-task-dialog-body");
    const errorNode = make("div", "iwb-task-dialog-error");
    errorNode.setAttribute("role", "alert");
    errorNode.hidden = true;
    const footer = make("footer", "iwb-task-dialog-footer");
    dialog.append(head, body, errorNode, footer);
    let cleaned = false;
    const entry = {
      dialog,
      body,
      footer,
      isOpen: () => !cleaned && dialog.isConnected,
      clearError() {
        errorNode.hidden = true;
        errorNode.textContent = "";
      },
      setError(message) {
        errorNode.textContent = message;
        errorNode.hidden = false;
      },
      close(force = false) {
        if (cleaned || !force && (dialogBusy.get(dialog)?.size || 0) > 0) return;
        if (dialog.open && typeof dialog.close === "function") dialog.close();
        else cleanup();
      }
    };
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      dialogs.delete(entry);
      dialog.remove();
      if (!disposed && previousFocus?.isConnected && typeof previousFocus.focus === "function") {
        previousFocus.focus({ preventScroll: true });
      }
    };
    closeButton.addEventListener("click", () => entry.close());
    dialog.addEventListener("close", cleanup);
    dialog.addEventListener("cancel", (event) => {
      if ((dialogBusy.get(dialog)?.size || 0) > 0) event.preventDefault();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) entry.close();
    });
    dialogs.add(entry);
    (doc.body || host).appendChild(dialog);
    try {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    } catch {
      dialog.setAttribute("open", "");
    }
    const focusTarget = dialog.querySelector("[autofocus]") || dialog.querySelector("textarea, input, select, button");
    focusTarget?.focus({ preventScroll: true });
    return entry;
  }
  function dialogFooterButton(dialog, label, options, handler) {
    const node = button(label, options);
    node.addEventListener("click", handler);
    dialog.footer.appendChild(node);
    return node;
  }
  function normalizeSessions(value) {
    const rows = Array.isArray(value) ? value : array(value?.sessions ?? value?.items ?? value?.value);
    return rows.map((session, index) => ({
      raw: session,
      index,
      id: text3(session?.id ?? session?.sessionId),
      title: text3(session?.displayTitle ?? session?.title ?? session?.name) || text3(session?.id ?? session?.sessionId) || "Session " + (index + 1),
      workspace: text3(session?.workspaceName ?? session?.workspaceId) || text3(session?.workspace?.title ?? session?.workspace),
      updatedAt: timestamp(session?.updatedAt ?? session?.activityAt ?? session?.lastActiveAt ?? session?.createdAt)
    })).filter((session) => session.id);
  }
  function draftRows(value, keys = ["drafts", "tasks", "items", "value"]) {
    if (Array.isArray(value)) return { items: value, key: null };
    for (const key of keys) {
      if (Array.isArray(value?.[key])) return { items: value[key], key };
    }
    return { items: [], key: null };
  }
  function openScanDialog(trigger) {
    const dialog = openDialog(copy("scanTitle"), trigger, "scan");
    const model = { sessions: [], selectedSessions: /* @__PURE__ */ new Set(), useAI: true, drafts: [], selectedDrafts: /* @__PURE__ */ new Set(), phase: "loading" };
    function staticDisabled(node, disabled) {
      if (disabled) node.dataset.staticDisabled = "true";
      else delete node.dataset.staticDisabled;
      syncBusy();
    }
    function renderSessionRows() {
      dialog.body.replaceChildren();
      const intro = make("p", "iwb-task-dialog-intro");
      intro.textContent = copy("scanIntro") + " \xB7 " + copy("selected", { n: model.selectedSessions.size });
      dialog.body.appendChild(intro);
      if (!model.sessions.length) {
        dialog.body.appendChild(stateBlock("empty", copy("sessionsEmpty"), copy("sessionsEmptyBody")));
        return;
      }
      const options = make("div", "iwb-task-dialog-options");
      const allLabel = make("label", "iwb-task-check iwb-task-select-all");
      const all = make("input");
      all.type = "checkbox";
      all.checked = model.selectedSessions.size === model.sessions.length && model.sessions.length > 0;
      all.indeterminate = model.selectedSessions.size > 0 && model.selectedSessions.size < model.sessions.length;
      const allText = make("span");
      allText.textContent = copy("selectAll");
      allLabel.append(all, allText);
      all.addEventListener("change", () => {
        model.selectedSessions = all.checked ? new Set(model.sessions.map((session) => session.id)) : /* @__PURE__ */ new Set();
        renderSessions();
        dialog.body.querySelector(".iwb-task-select-all input")?.focus({ preventScroll: true });
      });
      const aiLabel = make("label", "iwb-task-check");
      const ai = make("input");
      ai.type = "checkbox";
      ai.checked = model.useAI;
      const aiText = make("span");
      aiText.textContent = copy("useAI");
      aiLabel.append(ai, aiText);
      ai.addEventListener("change", () => {
        model.useAI = ai.checked;
      });
      options.append(allLabel, aiLabel);
      dialog.body.appendChild(options);
      const list = make("div", "iwb-task-session-list");
      for (const session of model.sessions) {
        const label = make("label", "iwb-task-session-item");
        const checkbox = make("input");
        checkbox.type = "checkbox";
        checkbox.checked = model.selectedSessions.has(session.id);
        checkbox.setAttribute("aria-label", session.title);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) model.selectedSessions.add(session.id);
          else model.selectedSessions.delete(session.id);
          renderSessions();
          const index = model.sessions.findIndex((item) => item.id === session.id);
          dialog.body.querySelectorAll(".iwb-task-session-item input")[index]?.focus({ preventScroll: true });
        });
        const content = make("span", "iwb-task-session-content");
        const title = make("span", "iwb-task-session-title");
        title.textContent = session.title;
        const meta = make("span", "iwb-task-session-meta");
        meta.textContent = [session.workspace, formatTime(session.updatedAt)].filter((value) => value && value !== "\u2014").join(" \xB7 ") || session.id;
        content.append(title, meta);
        label.append(checkbox, content);
        list.appendChild(label);
      }
      dialog.body.appendChild(list);
    }
    function renderSessions() {
      model.phase = "sessions";
      renderSessionRows();
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy("cancel"), { async: false }, () => dialog.close());
      dialogFooterButton(dialog, copy("reloadSessions"), { busyKey: "sessions:list" }, () => {
        void loadSessions();
      });
      const run = dialogFooterButton(dialog, copy("scanRun"), { className: "primary", busyKey: "scan:run" }, () => {
        void scan();
      });
      staticDisabled(run, model.selectedSessions.size === 0);
    }
    function renderDrafts() {
      model.phase = "drafts";
      dialog.body.replaceChildren();
      const intro = make("p", "iwb-task-dialog-intro");
      intro.textContent = copy("draftsTitle") + " \xB7 " + copy("selected", { n: model.selectedDrafts.size });
      dialog.body.appendChild(intro);
      if (!model.drafts.length) {
        dialog.body.appendChild(stateBlock("empty", copy("draftsEmpty"), copy("draftsEmptyBody")));
      } else {
        const options = make("div", "iwb-task-dialog-options");
        const allLabel = make("label", "iwb-task-check iwb-task-select-all");
        const all = make("input");
        all.type = "checkbox";
        all.checked = model.selectedDrafts.size === model.drafts.length;
        all.indeterminate = model.selectedDrafts.size > 0 && model.selectedDrafts.size < model.drafts.length;
        const allText = make("span");
        allText.textContent = copy("selectAll");
        allLabel.append(all, allText);
        all.addEventListener("change", () => {
          model.selectedDrafts = all.checked ? new Set(model.drafts.map((draft, index) => index)) : /* @__PURE__ */ new Set();
          renderDrafts();
          dialog.body.querySelector(".iwb-task-select-all input")?.focus({ preventScroll: true });
        });
        options.appendChild(allLabel);
        dialog.body.appendChild(options);
        const list = make("div", "iwb-task-draft-list");
        model.drafts.forEach((draft, index) => {
          const label = make("label", "iwb-task-draft-item");
          const checkbox = make("input");
          checkbox.type = "checkbox";
          checkbox.checked = model.selectedDrafts.has(index);
          checkbox.addEventListener("change", () => {
            if (checkbox.checked) model.selectedDrafts.add(index);
            else model.selectedDrafts.delete(index);
            renderDrafts();
            dialog.body.querySelectorAll(".iwb-task-draft-item input")[index]?.focus({ preventScroll: true });
          });
          const content = make("span", "iwb-task-draft-content");
          const top = make("span", "iwb-task-draft-top");
          const title = make("span", "iwb-task-draft-title");
          title.textContent = text3(draft?.title) || copy("untitled");
          const priority = make("span", "iwb-task-priority is-" + priorityOf(draft || {}));
          priority.textContent = copy("priority." + priorityOf(draft || {}));
          top.append(title, priority);
          const summary = make("span", "iwb-task-draft-summary");
          summary.textContent = text3(draft?.summary ?? draft?.goal ?? draft?.description) || copy("noSummary");
          const meta = make("span", "iwb-task-draft-meta");
          const facts = [];
          if (array(draft?.acceptanceCriteria).length) facts.push(copy("acceptance") + " " + array(draft.acceptanceCriteria).length);
          if (array(draft?.sessionIds).length) facts.push(copy("sessions") + " " + array(draft.sessionIds).length);
          meta.textContent = facts.join(" \xB7 ");
          content.append(top, summary, meta);
          label.append(checkbox, content);
          list.appendChild(label);
        });
        dialog.body.appendChild(list);
      }
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy("back"), { async: false }, () => renderSessions());
      dialogFooterButton(dialog, copy("cancel"), { async: false }, () => dialog.close());
      const add = dialogFooterButton(dialog, copy("addTasks", { n: model.selectedDrafts.size }), { className: "primary", busyKey: "scan:add" }, () => {
        void addTasks();
      });
      staticDisabled(add, model.selectedDrafts.size === 0);
    }
    async function loadSessions() {
      model.phase = "loading";
      dialog.body.replaceChildren(stateBlock("loading", copy("sessionsLoading")));
      dialog.footer.replaceChildren();
      const outcome = await runBusy("sessions:list", () => requireAction("listSessions")(), { dialog, refresh: false });
      if (!dialog.isOpen()) return;
      if (!outcome.ok) {
        dialog.body.replaceChildren(stateBlock("error", copy("sessionsError"), errorText(outcome.error) || copy("actionFailed")));
        dialogFooterButton(dialog, copy("cancel"), { async: false }, () => dialog.close());
        dialogFooterButton(dialog, copy("retry"), { className: "primary", busyKey: "sessions:list" }, () => {
          void loadSessions();
        });
        return;
      }
      model.sessions = normalizeSessions(outcome.value);
      model.selectedSessions = new Set(model.sessions.slice(0, 12).map((session) => session.id));
      renderSessions();
      dialog.body.querySelector(".iwb-task-session-item input")?.focus({ preventScroll: true });
    }
    async function scan() {
      if (!model.selectedSessions.size) {
        dialog.setError(copy("noSessionSelection"));
        return;
      }
      if (model.selectedSessions.size > 12) {
        dialog.setError(copy("scanLimit"));
        return;
      }
      model.phase = "scanning";
      dialog.body.replaceChildren(stateBlock("loading", copy("scanning")));
      dialog.footer.replaceChildren();
      const outcome = await runBusy("scan:run", () => requireAction("scan")({
        sessionIds: [...model.selectedSessions],
        useAI: model.useAI
      }), { dialog, refresh: false });
      if (!dialog.isOpen()) return;
      if (!outcome.ok) {
        renderSessions();
        dialog.setError(errorText(outcome.error) || copy("scanError"));
        return;
      }
      model.drafts = draftRows(outcome.value, ["drafts", "tasks", "items", "value"]).items;
      model.selectedDrafts = new Set(model.drafts.map((draft, index) => index));
      renderDrafts();
      dialog.body.querySelector(".iwb-task-draft-item input")?.focus({ preventScroll: true });
    }
    async function addTasks() {
      const selected = model.drafts.filter((draft, index) => model.selectedDrafts.has(index));
      if (!selected.length) {
        dialog.setError(copy("noDraftSelection"));
        return;
      }
      const outcome = await runBusy("scan:add", () => requireAction("addTasks")(selected), { dialog, refresh: true });
      if (outcome.ok && dialog.isOpen()) {
        notify(copy("tasksAdded", { n: selected.length }));
        dialog.close(true);
      }
    }
    void loadSessions();
  }
  function planParts(plan) {
    return draftRows(plan, ["drafts", "tasks", "nodes"]);
  }
  function openPlanDialog(trigger) {
    const dialog = openDialog(copy("planTitle"), trigger, "plan");
    const availableWorkspaces = typeof actions?.listWorkspaces === "function" ? actions.listWorkspaces() : [];
    const model = {
      requirement: "",
      workspaceId: text3(host?.dataset?.workspaceId) || text3(availableWorkspaces?.[0]?.id),
      workspaces: Array.isArray(availableWorkspaces) ? availableWorkspaces : [],
      creatingWorkspace: false,
      models: [],
      modelId: "",
      defaultModel: null,
      useAI: true,
      start: true,
      plan: null,
      drafts: [],
      draftKey: null,
      selectedDrafts: /* @__PURE__ */ new Set()
    };
    function renderForm() {
      dialog.body.replaceChildren();
      const intro = make("p", "iwb-task-dialog-intro");
      intro.textContent = copy("planIntro");
      const form = make("form", "iwb-task-plan-form");
      const requirementField = make("label", "iwb-task-field");
      const requirementLabel = make("span", "iwb-task-field-label");
      requirementLabel.textContent = copy("requirement");
      const requirement = make("textarea", "iwb-task-textarea");
      requirement.id = "iwb-task-requirement-" + dialogSequence;
      requirement.rows = 6;
      requirement.required = true;
      requirement.autofocus = true;
      requirement.placeholder = copy("requirementPlaceholder");
      requirement.value = model.requirement;
      requirement.addEventListener("input", () => {
        model.requirement = requirement.value;
      });
      requirementField.append(requirementLabel, requirement);
      const workspaceField = make("label", "iwb-task-field");
      const workspaceLabel = make("span", "iwb-task-field-label");
      workspaceLabel.textContent = copy("workspaceId");
      const workspace = make("select", "iwb-task-select-control iwb-task-workspace-select");
      workspace.setAttribute("aria-label", copy("workspaceId"));
      for (const item of model.workspaces) {
        const option = make("option");
        option.value = text3(item?.id);
        option.textContent = text3(item?.title, "\u672A\u547D\u540D\u5DE5\u4F5C\u533A") + (item?.path ? " \xB7 " + item.path : "");
        workspace.appendChild(option);
      }
      if (!model.workspaces.length) {
        const option = make("option");
        option.value = "";
        option.textContent = copy("workspaceEmpty");
        workspace.appendChild(option);
        workspace.disabled = true;
      }
      workspace.value = model.workspaceId;
      workspace.addEventListener("change", () => {
        model.workspaceId = workspace.value;
      });
      workspaceField.append(workspaceLabel, workspace);
      if (!model.workspaces.length) {
        const workspaceHint = make("p", "iwb-task-dialog-intro iwb-task-workspace-required");
        workspaceHint.textContent = copy("workspaceRequired");
        workspaceField.appendChild(workspaceHint);
        if (!model.creatingWorkspace) {
          const create = make("button", "iwb-btn iwb-task-workspace-create");
          create.type = "button";
          create.textContent = copy("createWorkspace");
          create.addEventListener("click", () => {
            model.creatingWorkspace = true;
            renderForm();
          });
          workspaceField.appendChild(create);
        } else {
          const path = make("input", "iwb-task-input iwb-task-workspace-path");
          path.placeholder = copy("workspacePathPlaceholder");
          path.setAttribute("aria-label", copy("workspacePath"));
          path.value = model.workspacePath || "";
          path.addEventListener("input", () => {
            model.workspacePath = path.value;
          });
          workspaceField.appendChild(path);
          const actions2 = make("div", "iwb-task-dialog-options");
          const confirm = make("button", "iwb-btn primary iwb-task-workspace-confirm");
          confirm.type = "button";
          confirm.textContent = copy("createWorkspaceConfirm");
          confirm.addEventListener("click", async () => {
            const value = path.value.trim();
            if (!/^\/|^[A-Za-z]:[\\/]/.test(value)) {
              dialog.setError(copy("workspacePath"));
              return;
            }
            const outcome = await runBusy("workspace:create", () => requireAction("createWorkspace")({ path: value }), { dialog, refresh: false });
            if (outcome.ok) {
              model.workspaces = [outcome.value, ...model.workspaces.filter((item) => item.id !== outcome.value.id)];
              model.workspaceId = outcome.value.id;
              model.creatingWorkspace = false;
              renderForm();
            } else {
              dialog.setError(errorText(outcome.error) || copy("actionFailed"));
            }
          });
          const cancel = make("button", "iwb-btn iwb-task-workspace-cancel");
          cancel.type = "button";
          cancel.textContent = copy("createWorkspaceCancel");
          cancel.addEventListener("click", () => {
            model.creatingWorkspace = false;
            renderForm();
          });
          actions2.append(confirm, cancel);
          workspaceField.appendChild(actions2);
          path.focus({ preventScroll: true });
        }
      }
      const modelField = make("label", "iwb-task-field");
      const modelLabel = make("span", "iwb-task-field-label");
      modelLabel.textContent = copy("model");
      const modelSelect = make("select", "iwb-task-select-control iwb-task-model-select");
      modelSelect.setAttribute("aria-label", copy("model"));
      const defaultOption = make("option");
      defaultOption.value = "";
      defaultOption.textContent = model.defaultModel?.model ? copy("modelDefault") + "\uFF08" + model.defaultModel.model + "\uFF09" : copy("modelDefault");
      modelSelect.appendChild(defaultOption);
      for (const item of model.models) {
        const option = make("option");
        option.value = item.id;
        option.textContent = item.name + (item.provider ? " \xB7 " + item.provider : "");
        modelSelect.appendChild(option);
      }
      modelSelect.value = model.modelId;
      modelSelect.addEventListener("change", () => {
        model.modelId = modelSelect.value;
      });
      modelField.append(modelLabel, modelSelect);
      const aiLabel = make("label", "iwb-task-check");
      const ai = make("input");
      ai.type = "checkbox";
      ai.checked = model.useAI;
      const aiText = make("span");
      aiText.textContent = copy("useAI");
      aiLabel.append(ai, aiText);
      ai.addEventListener("change", () => {
        model.useAI = ai.checked;
      });
      form.append(requirementField, workspaceField, modelField, aiLabel);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        model.requirement = requirement.value;
        model.workspaceId = workspace.value;
        void generate();
      });
      dialog.body.append(intro, form);
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy("cancel"), { async: false }, () => dialog.close());
      const generateButton = dialogFooterButton(dialog, copy("generatePlan"), { className: "primary", busyKey: "plan:generate" }, () => {
        model.requirement = requirement.value;
        model.workspaceId = workspace.value;
        if (typeof form.requestSubmit === "function") form.requestSubmit();
        else void generate();
      });
      generateButton.setAttribute("aria-controls", requirement.id);
      if (!model.workspaces.length) generateButton.dataset.staticDisabled = "true";
      requirement.focus({ preventScroll: true });
    }
    function draftName(draft, index) {
      return text3(draft?.title ?? draft?.name ?? draft?.goal) || copy("node", { n: index + 1 });
    }
    function dependenciesOf(draft) {
      return array(draft?.dependsOn ?? draft?.dependencies ?? draft?.needs).map(endpointId).filter(Boolean);
    }
    function renderEdges() {
      const edges = array(model.plan?.edges ?? model.plan?.links);
      const container = make("section", "iwb-task-plan-edges");
      const title = make("h3", "iwb-task-section-title");
      title.textContent = copy("edges");
      container.appendChild(title);
      if (!edges.length) {
        const empty = make("div", "iwb-task-inline-empty");
        empty.textContent = copy("noEdges");
        container.appendChild(empty);
        return container;
      }
      const list = make("ul", "iwb-task-plan-edge-list");
      for (const edge of edges) {
        const from = endpointId(edge?.from ?? edge?.source ?? edge?.sourceId ?? edge?.fromNodeId);
        const to = endpointId(edge?.to ?? edge?.target ?? edge?.targetId ?? edge?.toNodeId);
        const sourceIndex = model.drafts.findIndex((draft, index) => text3(draft?.id ?? draft?.nodeId) === to || String(index) === to);
        const targetIndex = model.drafts.findIndex((draft, index) => text3(draft?.id ?? draft?.nodeId) === from || String(index) === from);
        const row = make("li", "iwb-task-plan-edge");
        const source = make("span");
        source.textContent = sourceIndex >= 0 ? draftName(model.drafts[sourceIndex], sourceIndex) : to || "\u2014";
        const arrow = make("span", "iwb-task-plan-arrow");
        arrow.textContent = "\u2192";
        arrow.setAttribute("aria-hidden", "true");
        const target = make("span");
        target.textContent = targetIndex >= 0 ? draftName(model.drafts[targetIndex], targetIndex) : from || "\u2014";
        row.append(source, arrow, target);
        list.appendChild(row);
      }
      container.appendChild(list);
      return container;
    }
    function draftIdAt(index) {
      return text3(model.drafts[index]?.id ?? model.drafts[index]?.nodeId) || String(index);
    }
    function setPlanDraftSelected(index, selected) {
      if (selected) {
        const visit = (current) => {
          if (model.selectedDrafts.has(current)) return;
          model.selectedDrafts.add(current);
          const dependencies = dependenciesOf(model.drafts[current]);
          model.drafts.forEach((draft, candidate) => {
            if (dependencies.includes(draftIdAt(candidate))) visit(candidate);
          });
        };
        visit(index);
      } else {
        const removed = /* @__PURE__ */ new Set([index]);
        let changed = true;
        while (changed) {
          changed = false;
          const removedIds = new Set([...removed].map(draftIdAt));
          for (const candidate of model.selectedDrafts) {
            if (removed.has(candidate)) continue;
            if (dependenciesOf(model.drafts[candidate]).some((id) => removedIds.has(id))) {
              removed.add(candidate);
              changed = true;
            }
          }
        }
        for (const candidate of removed) model.selectedDrafts.delete(candidate);
      }
      renderPlan();
      dialog.body.querySelectorAll(".iwb-task-plan-node input")[index]?.focus({ preventScroll: true });
    }
    function renderPlan() {
      dialog.body.replaceChildren();
      const intro = make("p", "iwb-task-dialog-intro");
      intro.textContent = copy("planReview") + " \xB7 " + copy("selected", { n: model.selectedDrafts.size });
      dialog.body.appendChild(intro);
      if (!model.drafts.length) {
        dialog.body.appendChild(stateBlock("empty", copy("planEmpty"), copy("planEmptyBody")));
      } else {
        const list = make("div", "iwb-task-plan-nodes");
        model.drafts.forEach((draft, index) => {
          const card = make("article", "iwb-task-plan-node");
          const select = make("label", "iwb-task-plan-select");
          const checkbox = make("input");
          checkbox.type = "checkbox";
          checkbox.checked = model.selectedDrafts.has(index);
          checkbox.setAttribute("aria-label", draftName(draft, index));
          checkbox.addEventListener("change", () => {
            setPlanDraftSelected(index, checkbox.checked);
          });
          const number = make("span", "iwb-task-plan-number");
          number.textContent = String(index + 1).padStart(2, "0");
          const head = make("div", "iwb-task-plan-node-head");
          const title = make("h3", "iwb-task-plan-node-title");
          title.textContent = draftName(draft, index);
          const kindValue = token2(draft?.kind ?? draft?.type);
          const kindKey = kindValue === "session" ? "sessionNode" : kindValue === "note" ? "noteNode" : "taskNode";
          const kind = make("span", "iwb-task-plan-kind is-" + kindValue);
          kind.textContent = copy(kindKey);
          head.append(title, kind);
          const summary = make("p", "iwb-task-plan-node-summary");
          summary.textContent = text3(draft?.goal ?? draft?.summary ?? draft?.prompt ?? draft?.note ?? draft?.description) || copy("noSummary");
          const dependencies = dependenciesOf(draft);
          const dependency = make("div", "iwb-task-plan-dependency");
          dependency.textContent = dependencies.length ? copy("dependencies", { name: dependencies.join(", ") }) : copy("noDependencies");
          select.append(checkbox, number);
          card.append(select, head, summary, dependency);
          list.appendChild(card);
        });
        dialog.body.append(list, renderEdges());
      }
      const startLabel = make("label", "iwb-task-check iwb-task-plan-start");
      const start = make("input");
      start.type = "checkbox";
      start.checked = model.start;
      const startText = make("span");
      startText.textContent = copy("startAfter");
      startLabel.append(start, startText);
      start.addEventListener("change", () => {
        model.start = start.checked;
      });
      dialog.body.appendChild(startLabel);
      dialog.footer.replaceChildren();
      dialogFooterButton(dialog, copy("editRequirement"), { async: false }, () => renderForm());
      dialogFooterButton(dialog, copy("cancel"), { async: false }, () => dialog.close());
      const create = dialogFooterButton(dialog, copy("materialize", { n: model.selectedDrafts.size }), { className: "primary", busyKey: "plan:materialize" }, () => {
        void materialize();
      });
      if (!model.selectedDrafts.size) create.dataset.staticDisabled = "true";
      syncBusy();
    }
    function selectedPlan() {
      const chosen = model.drafts.map((draft, index) => ({ draft, index })).filter(({ index }) => model.selectedDrafts.has(index));
      const selected = chosen.map(({ draft }) => draft);
      if (Array.isArray(model.plan)) return selected;
      if (!model.plan || !model.draftKey) return model.plan;
      const result = { ...model.plan, [model.draftKey]: selected };
      if (model.draftKey === "nodes") {
        const ids = new Set(chosen.map(({ index }) => draftIdAt(index)));
        result.nodes = chosen.map(({ draft }) => ({
          ...draft,
          dependsOn: dependenciesOf(draft).filter((id) => ids.has(id))
        }));
        if (Array.isArray(model.plan.edges)) {
          result.edges = model.plan.edges.filter((edge) => {
            const from = endpointId(edge?.from ?? edge?.source ?? edge?.sourceId ?? edge?.fromNodeId);
            const to = endpointId(edge?.to ?? edge?.target ?? edge?.targetId ?? edge?.toNodeId);
            return ids.has(from) && ids.has(to);
          });
        }
      }
      return result;
    }
    async function generate() {
      if (!model.requirement.trim()) {
        dialog.setError(copy("requirementRequired"));
        return;
      }
      dialog.body.replaceChildren(stateBlock("loading", copy("planning")));
      dialog.footer.replaceChildren();
      const outcome = await runBusy("plan:generate", () => requireAction("plan")({
        requirement: model.requirement.trim(),
        workspaceId: model.workspaceId.trim() || void 0,
        useAI: model.useAI,
        model: model.modelId ? model.models.find((item) => item.id === model.modelId) : void 0
      }), { dialog, refresh: false });
      if (!dialog.isOpen()) return;
      if (!outcome.ok) {
        renderForm();
        dialog.setError(errorText(outcome.error) || copy("planError"));
        return;
      }
      model.plan = outcome.value;
      const parts = planParts(model.plan);
      model.drafts = parts.items;
      model.draftKey = parts.key;
      model.selectedDrafts = new Set(model.drafts.map((draft, index) => index));
      renderPlan();
    }
    async function materialize() {
      if (!model.selectedDrafts.size && model.drafts.length) {
        dialog.setError(copy("noDraftSelection"));
        return;
      }
      const plan = selectedPlan();
      const outcome = await runBusy("plan:materialize", () => requireAction("materializePlan")(plan, { start: model.start }), { dialog, refresh: true });
      if (outcome.ok && dialog.isOpen()) {
        notify(copy("materialized"));
        dialog.close(true);
      }
    }
    renderForm();
    void requireAction("listModels")().then((value) => {
      model.models = value?.models || [];
      model.defaultModel = value?.defaultModel || null;
      renderForm();
    }).catch((error) => {
      notify(errorText(error) || copy("actionFailed"));
    });
  }
  function openDeleteDialog(task, trigger) {
    const dialog = openDialog(copy("deleteTitle"), trigger, "confirm");
    const message = make("p", "iwb-task-confirm-message");
    message.textContent = copy("deleteBody", { name: task.title });
    dialog.body.appendChild(message);
    dialogFooterButton(dialog, copy("cancel"), { async: false }, () => dialog.close());
    dialogFooterButton(dialog, copy("confirmDelete"), { className: "iwb-task-danger", busyKey: "task:" + task.id + ":deleteTask" }, async () => {
      const outcome = await runTaskAction(task, "deleteTask", [], dialog);
      if (outcome.ok && dialog.isOpen()) {
        if (state.selectedId === task.id) state.selectedId = null;
        notify(copy("deleted"));
        dialog.close(true);
      }
    });
  }
  filterSelect.addEventListener("change", () => {
    state.filter = filterSelect.value;
    render();
  });
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    render();
  });
  refreshButton.addEventListener("click", () => {
    void refresh();
  });
  alertClose.addEventListener("click", () => {
    state.error = "";
    renderAlert();
    refreshButton.focus();
  });
  scanButton.addEventListener("click", () => openScanDialog(scanButton));
  planButton.addEventListener("click", () => openPlanDialog(planButton));
  listNode.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const buttons = [...listNode.querySelectorAll(".iwb-task-list-select")];
    if (!buttons.length) return;
    const current = buttons.indexOf(doc.activeElement);
    let next = current;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else if (event.key === "ArrowDown") next = Math.min(buttons.length - 1, Math.max(0, current + 1));
    else next = Math.max(0, current < 0 ? 0 : current - 1);
    event.preventDefault();
    buttons[next]?.focus();
    buttons[next]?.click();
  });
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || dialogs.size) return;
    if (state.error) {
      state.error = "";
      renderAlert();
      event.preventDefault();
      return;
    }
    const selected = [...listNode.querySelectorAll(".iwb-task-list-select")].find((node) => node.dataset.focusKey === "list:" + state.selectedId);
    if (selected && doc.activeElement !== selected) {
      selected.focus();
      event.preventDefault();
    }
  });
  host?.appendChild(root);
  refresh();
  return {
    root,
    refresh,
    dispose() {
      if (disposed) return;
      disposed = true;
      refreshVersion += 1;
      for (const dialog of [...dialogs]) dialog.close(true);
      root.remove();
    }
  };
}

// src/client/file-store.js
var DB_NAME = "inspiration-workbench-files";
var STORE_NAME = "files";
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request2 = indexedDB.open(DB_NAME, 1);
    request2.onupgradeneeded = () => {
      const db = request2.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
    request2.onsuccess = () => resolve(request2.result);
    request2.onerror = () => reject(request2.error);
  });
}
function createFileStore() {
  const memory = /* @__PURE__ */ new Map();
  let databasePromise = null;
  const database = () => {
    if (typeof indexedDB === "undefined") return null;
    databasePromise ||= openDatabase().catch(() => null);
    return databasePromise;
  };
  return {
    async put(file) {
      const id = file.id || "file-" + crypto.randomUUID();
      const record = {
        id,
        name: file.name || "\u672A\u547D\u540D\u6587\u4EF6",
        type: file.type || "application/octet-stream",
        size: Number(file.size) || 0,
        lastModified: Number(file.lastModified) || Date.now(),
        blob: file.blob || file
      };
      memory.set(id, record);
      const db = await database();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, "readwrite");
          transaction.objectStore(STORE_NAME).put(record);
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
        });
      }
      return id;
    },
    async get(id) {
      const db = await database();
      if (db) {
        const stored = await new Promise((resolve, reject) => {
          const request2 = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(id);
          request2.onsuccess = () => resolve(request2.result || null);
          request2.onerror = () => reject(request2.error);
        });
        if (stored) return stored;
      }
      return memory.get(id) || null;
    },
    async remove(id) {
      memory.delete(id);
      const db = await database();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, "readwrite");
          transaction.objectStore(STORE_NAME).delete(id);
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
        });
      }
    }
  };
}

// src/client/docx-text.js
function findEndOfCentralDirectory(view) {
  const start = Math.max(0, view.byteLength - 65557);
  for (let index = view.byteLength - 22; index >= start; index -= 1) {
    if (view.getUint32(index, true) === 101010256) return index;
  }
  return -1;
}
async function inflate(data) {
  if (typeof DecompressionStream === "undefined") throw new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 DOCX \u89E3\u538B");
  const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return await new Response(stream).arrayBuffer();
}
async function readZipEntry(buffer, entryName) {
  const view = new DataView(buffer);
  const decoder = new TextDecoder();
  const end = findEndOfCentralDirectory(view);
  if (end < 0) throw new Error("\u4E0D\u662F\u6709\u6548\u7684 DOCX \u6587\u4EF6");
  const count = view.getUint16(end + 10, true);
  let cursor = view.getUint32(end + 16, true);
  for (let index = 0; index < count; index += 1) {
    if (view.getUint32(cursor, true) !== 33639248) break;
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = decoder.decode(new Uint8Array(buffer, cursor + 46, nameLength));
    if (name === entryName) {
      if (view.getUint32(localOffset, true) !== 67324752) throw new Error("DOCX \u672C\u5730\u6587\u4EF6\u5934\u635F\u574F");
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const offset = localOffset + 30 + localNameLength + localExtraLength;
      const bytes = buffer.slice(offset, offset + compressedSize);
      if (method === 0) return bytes;
      if (method === 8) return await inflate(bytes);
      throw new Error("DOCX \u4F7F\u7528\u4E86\u6682\u4E0D\u652F\u6301\u7684\u538B\u7F29\u65B9\u5F0F");
    }
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error("DOCX \u4E2D\u627E\u4E0D\u5230 document.xml");
}
function xmlText(xml) {
  return xml.replace(/<\/w:(p|tr)\b[^>]*>/g, "\n").replace(/<\/w:tc\b[^>]*>/g, "	").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}
async function extractDocxText(buffer) {
  const bytes = await readZipEntry(buffer, "word/document.xml");
  const xml = new TextDecoder().decode(bytes);
  return xmlText(xml).slice(0, 24e4);
}
async function extractPptxText(buffer) {
  const decoder = new TextDecoder();
  const slides = [];
  const view = new DataView(buffer);
  const end = findEndOfCentralDirectory(view);
  if (end < 0) throw new Error("\u4E0D\u662F\u6709\u6548\u7684 PPTX \u6587\u4EF6");
  const count = view.getUint16(end + 10, true);
  let cursor = view.getUint32(end + 16, true);
  const names = [];
  for (let index = 0; index < count; index += 1) {
    if (view.getUint32(cursor, true) !== 33639248) break;
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const name = decoder.decode(new Uint8Array(buffer, cursor + 46, nameLength));
    if (/^ppt\/slides\/slide\d+\.xml$/.test(name)) names.push(name);
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  names.sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  for (const name of names.slice(0, 30)) {
    const xml = decoder.decode(await readZipEntry(buffer, name));
    slides.push("## " + name + "\n" + xmlText(xml));
  }
  return slides.join("\n\n").slice(0, 24e4);
}

// src/client/file-preview.js
function fileKind(file) {
  const type = String(file?.type || "").toLowerCase();
  const name = String(file?.name || "").toLowerCase();
  if (type.startsWith("image/") || /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/.test(name)) return "image";
  if (type === "application/pdf" || /\.pdf$/.test(name)) return "pdf";
  if (/\.(docx)$/.test(name)) return "docx";
  if (/\.(pptx)$/.test(name)) return "pptx";
  if (/\.(html?|xhtml)$/.test(name) || type === "text/html") return "html";
  if (type.startsWith("text/") || /\.(txt|md|markdown|json|jsonl|csv|tsv|xml|ya?ml|log|js|mjs|cjs|ts|tsx|jsx|css|scss|less|py|java|go|rs|sql|sh|bash|zsh|env|ini|toml|vue|svelte)$/.test(name)) return "text";
  return "other";
}
function formatBytes(value) {
  const size = Number(value) || 0;
  if (size < 1024) return size + " B";
  if (size < 1024 * 1024) return (size / 1024).toFixed(size < 10240 ? 1 : 0) + " KB";
  return (size / 1024 / 1024).toFixed(1) + " MB";
}
async function buildFilePreview(file) {
  const kind = fileKind(file);
  if (kind === "image" || kind === "pdf") return { kind, url: URL.createObjectURL(file.blob || file) };
  if (kind === "docx") return { kind, text: await extractDocxText(await (file.blob || file).arrayBuffer()) };
  if (kind === "pptx") return { kind, text: await extractPptxText(await (file.blob || file).arrayBuffer()) };
  if (kind === "html" || kind === "text") {
    const buffer = await (file.blob || file).slice(0, 1024 * 1024).text();
    return { kind, text: buffer };
  }
  return { kind: "other", text: "\u6682\u4E0D\u652F\u6301\u6B64\u683C\u5F0F\u7684\u76F4\u63A5\u9884\u89C8\uFF0C\u53EF\u4E0B\u8F7D\u540E\u67E5\u770B\u3002" };
}
function openFilePreview(file, options = {}) {
  const dialog = document.createElement("dialog");
  dialog.className = "iwb-file-dialog";
  dialog.setAttribute("aria-label", file.name || "\u6587\u4EF6\u9884\u89C8");
  document.body.appendChild(dialog);
  const close = () => dialog.close();
  dialog.innerHTML = '<div class="iwb-file-dialog-head"><div><h2></h2><p></p></div><button type="button" class="iwb-file-dialog-close" aria-label="\u5173\u95ED\u9884\u89C8">\xD7</button></div><div class="iwb-file-dialog-body"></div><div class="iwb-file-dialog-foot"><a class="iwb-btn" download>\u4E0B\u8F7D\u6587\u4EF6</a></div>';
  dialog.querySelector("h2").textContent = file.name || "\u6587\u4EF6\u9884\u89C8";
  dialog.querySelector("p").textContent = formatBytes(file.size) + " \xB7 " + (file.type || "\u6587\u4EF6");
  dialog.querySelector(".iwb-file-dialog-close").addEventListener("click", close);
  const download = dialog.querySelector("a");
  download.download = file.name || "download";
  const body = dialog.querySelector(".iwb-file-dialog-body");
  body.textContent = "\u6B63\u5728\u8BFB\u53D6\u9884\u89C8\u2026";
  let url = "";
  dialog.addEventListener("close", () => {
    if (url) URL.revokeObjectURL(url);
    dialog.remove();
    options.onClose?.();
  });
  void buildFilePreview(file).then((preview) => {
    body.textContent = "";
    if (preview.url) {
      url = preview.url;
      download.href = url;
      if (preview.kind === "image") {
        const image = document.createElement("img");
        image.className = "iwb-file-preview-image";
        image.alt = file.name || "\u56FE\u7247\u9884\u89C8";
        image.src = url;
        body.appendChild(image);
      } else {
        const frame = document.createElement("iframe");
        frame.className = "iwb-file-preview-frame";
        frame.sandbox = "";
        frame.src = url;
        body.appendChild(frame);
      }
      return;
    }
    if (preview.kind === "html") {
      const frame = document.createElement("iframe");
      frame.className = "iwb-file-preview-frame";
      frame.sandbox = "";
      frame.srcdoc = preview.text;
      body.appendChild(frame);
      download.href = URL.createObjectURL(file.blob || file);
      url = download.href;
      return;
    }
    const pre = document.createElement("pre");
    pre.className = "iwb-file-preview-text";
    pre.textContent = preview.text || "\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u672C\u5185\u5BB9\u3002";
    body.appendChild(pre);
    if (preview.kind !== "other") {
      download.href = URL.createObjectURL(file.blob || file);
      url = download.href;
    } else {
      download.href = URL.createObjectURL(file.blob || file);
      url = download.href;
    }
  }).catch((error) => {
    body.textContent = error?.message || "\u9884\u89C8\u5931\u8D25\uFF0C\u8BF7\u4E0B\u8F7D\u540E\u67E5\u770B\u3002";
    download.href = URL.createObjectURL(file.blob || file);
    url = download.href;
  });
  dialog.showModal();
  return dialog;
}

// src/client/board.js
var STORAGE_KEY = "dsh.inspiration-workbench.v1";
var CANVAS_KEY = "dsh.inspiration-workbench.canvases.v1";
var DEFAULT_W = 380;
var DEFAULT_H = 500;
var GAP = 20;
var STACK_OFFSET = 14;
function formatElapsed(ms) {
  const seconds = Math.round(ms / 1e3);
  if (seconds < 60) return seconds + "s";
  return Math.floor(seconds / 60) + "m" + String(seconds % 60).padStart(2, "0") + "s";
}
function createBoard({ host, adapter, approvals, t: t2, onOpenSession }) {
  const { appendMarkdownLite } = createMarkdown({ t: t2 });
  const state = {
    zoom: 1,
    pan: { x: 24, y: 24 },
    cards: [],
    stacks: [],
    seq: 0,
    stackSeq: 0,
    settings: { inlineApprovals: false, chainWheel: false },
    selected: /* @__PURE__ */ new Set(),
    zTop: 20,
    focusedId: null,
    savedView: false,
    board: { active: false, key: "status", saved: /* @__PURE__ */ new Map() },
    canvases: [],
    activeCanvas: null,
    mode: "canvas"
  };
  const taskStore = createTaskStore();
  const fileStore = createFileStore();
  const flow = createFlowRecorder({
    onChange: (events) => taskStore.setFlowEvents(events)
  });
  const taskLoadPromise = taskStore.load().then((saved) => {
    flow.replace(saved.flowEvents);
    schedulePipelines();
    return saved;
  }).catch(() => null);
  const expandedTurns = /* @__PURE__ */ new Map();
  const tools = createCardTools({ t: t2, el, toast, ensureVisible, state });
  const {
    copyTranscript,
    openSearch,
    toggleSearch,
    runSearch,
    stepSearch,
    highlight,
    closeOutline,
    openOutline,
    closeRefPicker,
    openRefPicker
  } = tools;
  const {
    itemNode,
    turnNode,
    stepRowNode,
    toolNode,
    questionNode,
    approvalNode,
    failureNode,
    attachmentChip,
    stepSummary,
    formatDuration: formatDuration2,
    toolIsOpen,
    answerDraft,
    submitAnswer
  } = createRenderers({
    t: t2,
    el,
    appendMarkdownLite,
    markDirty,
    toast,
    adapter,
    expandedTurns,
    rerender: (card) => {
      if (card.view) renderBody(card, card.view);
    },
    openRefPicker: (anchor, source, text4) => tools.openRefPicker(anchor, source, text4),
    ensureVisible,
    onOpenSession,
    renderFoot,
    settleApproval: (sessionId, approvalId, outcome) => {
      approvals?.settleFor?.(sessionId, approvalId, outcome);
      for (const card of state.cards) markDirty(card);
    },
    canAnswerApproval: (sessionId, approvalId) => Boolean(approvals?.hasFor?.(sessionId, approvalId))
  });
  const dirty = /* @__PURE__ */ new Set();
  let frame = 0;
  let disposed = false;
  let restoreDone = false;
  const root = el("div", "iwb-root");
  const toolbar = el("div", "iwb-toolbar");
  const titles = el("div", "iwb-titles");
  const titleNode = el("div", "iwb-title");
  titleNode.textContent = t2("title");
  const countsNode = el("div", "iwb-counts");
  titles.append(titleNode, countsNode);
  const hint = el("div", "iwb-hint");
  hint.innerHTML = "<span>" + t2("hint.pan") + "</span><span><kbd>\u2318</kbd><kbd>" + t2("hint.zoomKey") + "</kbd> " + t2("hint.zoom") + "</span>";
  if (t2("hint.pan")) hint.hidden = false;
  const btnNew = el("button", "iwb-btn primary", icon("plus", 13) + "<span>" + t2("new") + "</span>");
  btnNew.type = "button";
  const btnCanvas = el("button", "iwb-btn", icon("canvas", 13) + "<span>" + t2("canvas") + "</span>");
  btnCanvas.type = "button";
  const btnBlank = el("button", "iwb-btn iwb-btn-icon", icon("plus", 13));
  btnBlank.type = "button";
  btnBlank.title = "\u65B0\u5EFA\u7A7A\u767D\u753B\u5E03\uFF08\u81EA\u52A8\u4FDD\u5B58\u5F53\u524D\u753B\u5E03\uFF09";
  btnBlank.setAttribute("aria-label", "\u65B0\u5EFA\u7A7A\u767D\u753B\u5E03");
  const btnFile = el("button", "iwb-btn", icon("clip", 13) + "<span>\u6587\u4EF6</span>");
  btnFile.type = "button";
  btnFile.title = "\u6DFB\u52A0\u56FE\u7247\u6216\u6587\u4EF6\u5230\u753B\u5E03";
  const btnArrange = el("button", "iwb-btn", icon("arrange", 13) + "<span>" + t2("arrange") + "</span>");
  btnArrange.type = "button";
  const btnBoard = el("button", "iwb-btn", icon("board", 13) + "<span>" + t2("boardMode") + "</span>");
  btnBoard.type = "button";
  const btnFit = el("button", "iwb-btn", icon("fit", 13) + "<span>" + t2("fit") + "</span>");
  btnFit.type = "button";
  const todoBar = el("button", "iwb-todo", "");
  todoBar.type = "button";
  todoBar.hidden = true;
  const btnNote = el("button", "iwb-btn", icon("note", 13) + "<span>" + t2("note.add") + "</span>");
  btnNote.type = "button";
  const btnCollapse = el("button", "iwb-btn", "<span>" + t2("board.collapseAll") + "</span>");
  btnCollapse.type = "button";
  const btnSettings = el("button", "iwb-btn", icon("sliders", 13) + "<span>" + t2("settings") + "</span>");
  btnSettings.type = "button";
  const actions = el("div", "iwb-toolbar-actions");
  actions.append(todoBar, btnNew, btnNote, btnFile, btnCanvas, btnBlank, btnArrange, btnBoard, btnFit, btnCollapse, btnSettings);
  const modeSwitch = el("div", "iwb-mode-switch");
  modeSwitch.setAttribute("role", "tablist");
  modeSwitch.setAttribute("aria-label", "\u5DE5\u4F5C\u89C6\u56FE");
  const btnCanvasMode = el("button", "iwb-mode-tab active", "<span>\u753B\u5E03</span>");
  btnCanvasMode.type = "button";
  btnCanvasMode.setAttribute("role", "tab");
  btnCanvasMode.setAttribute("aria-selected", "true");
  const btnTaskMode = el("button", "iwb-mode-tab", "<span>\u4EFB\u52A1</span>");
  btnTaskMode.type = "button";
  btnTaskMode.setAttribute("role", "tab");
  btnTaskMode.setAttribute("aria-selected", "false");
  modeSwitch.append(btnCanvasMode, btnTaskMode);
  toolbar.append(titles, modeSwitch, hint, actions);
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.hidden = true;
  fileInput.accept = "image/*,.pdf,.docx,.pptx,.txt,.md,.markdown,.json,.jsonl,.csv,.log,.html,.css,.js,.ts,.tsx,.jsx,.py,.java,.go,.rs,.sql,.sh,.yaml,.yml";
  fileInput.addEventListener("change", async () => {
    for (const file of [...fileInput.files]) await addFileCard(file);
    fileInput.value = "";
  });
  document.body.appendChild(fileInput);
  btnFile.addEventListener("click", () => fileInput.click());
  const canvas = el("div", "iwb-canvas");
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "list");
  canvas.setAttribute("aria-label", t2("a11y.canvas"));
  const world = el("div", "iwb-world");
  canvas.appendChild(world);
  const SVG_NS = "http://www.w3.org/2000/svg";
  const linkLayer = document.createElementNS(SVG_NS, "svg");
  linkLayer.setAttribute("class", "iwb-links");
  linkLayer.setAttribute("aria-hidden", "true");
  world.appendChild(linkLayer);
  const emptyState = el(
    "div",
    "iwb-empty",
    '<div class="iwb-empty-title">' + t2("empty.title") + '</div><div class="iwb-empty-sub">' + t2("empty.sub") + "</div>"
  );
  emptyState.style.position = "absolute";
  emptyState.style.inset = "0";
  emptyState.style.pointerEvents = "none";
  canvas.appendChild(emptyState);
  const zoomBar = el("div", "iwb-zoom");
  const zoomOut = el("button", null, icon("minus", 13));
  zoomOut.type = "button";
  const zoomValue = el("div", "iwb-zoom-value");
  zoomValue.textContent = "100%";
  const zoomIn = el("button", null, icon("plus", 13));
  zoomIn.type = "button";
  const zoomFitBtn = el("button", null, icon("fit", 13));
  zoomFitBtn.type = "button";
  zoomBar.append(zoomOut, zoomValue, zoomIn, zoomFitBtn);
  canvas.appendChild(zoomBar);
  const layer = el("div", "iwb-layer");
  const modelMenu = createModelMenu({
    t: t2,
    layer,
    adapter,
    markDirty,
    toast,
    onEscapeExtras: () => {
      tools.closeOutline();
      tools.closeRefPicker();
    }
  });
  const arrangeMenu = createArrangeMenu({ t: t2, state, canvas, fitView, saveSoon, toast, defaultSize: { w: DEFAULT_W, h: DEFAULT_H }, gap: GAP, anchor: btnArrange, afterArrange: () => schedulePipelines() });
  const workspaceMenu = createWorkspaceMenu({
    t: t2,
    adapter,
    toast,
    addSession: (options) => addSession(options),
    centerCard,
    anchor: btnNew
  });
  const settingsMenu = createSettingsMenu({
    t: t2,
    el,
    state,
    saveSoon,
    applySizePreset,
    exportLayout,
    importLayout,
    resetLayout: () => reset(),
    closeArrange: () => arrangeMenu.close(),
    closeWorkspace: () => workspaceMenu.close(),
    closeOverlays: () => {
      tools.closeRefPicker();
      tools.closeOutline();
    },
    approvals,
    toast,
    anchor: btnSettings
  });
  const stopTitleWatch = adapter.watchTitles?.(() => {
    for (const card of state.cards) {
      if (card.kind === "note") continue;
      const title = adapter.titleOf(card.sessionId);
      if (!title || title === card.title) continue;
      card.title = title;
      const node = card.el?.querySelector(".iwb-card-title");
      if (node) {
        node.textContent = title;
        node.title = title;
      }
    }
    updateTodoBar();
  });
  const stopUploadWatch = adapter.subscribeUploads?.(() => {
    for (const card of state.cards) {
      if (!card.attachments?.length) continue;
      renderFoot(card);
    }
  });
  const stopApprovalWatch = approvals?.subscribe?.(() => {
    for (const card of state.cards) markDirty(card);
  });
  const batchBar = el("div", "iwb-batch");
  batchBar.hidden = true;
  batchBar.setAttribute("role", "toolbar");
  batchBar.setAttribute("aria-label", t2("batch.title"));
  const toastNode = el("div", "iwb-toast");
  toastNode.setAttribute("role", "status");
  toastNode.setAttribute("aria-live", "polite");
  root.append(toolbar, canvas, layer, batchBar, toastNode);
  host.appendChild(root);
  function applyView() {
    world.style.transform = "translate(" + state.pan.x + "px," + state.pan.y + "px) scale(" + state.zoom + ")";
    const grid = 24 * state.zoom;
    canvas.style.backgroundSize = grid + "px " + grid + "px";
    canvas.style.backgroundPosition = state.pan.x + "px " + state.pan.y + "px";
    zoomValue.textContent = Math.round(state.zoom * 100) + "%";
    saveSoon();
  }
  let anim = 0;
  function animateTo(zoom, pan) {
    cancelAnimationFrame(anim);
    const from = { zoom: state.zoom, pan: { ...state.pan } };
    const t0 = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    return new Promise((resolve) => {
      const tick = (now) => {
        const k = ease(clamp((now - t0) / 240, 0, 1));
        state.zoom = from.zoom + (zoom - from.zoom) * k;
        state.pan.x = from.pan.x + (pan.x - from.pan.x) * k;
        state.pan.y = from.pan.y + (pan.y - from.pan.y) * k;
        applyView();
        if (k < 1) anim = requestAnimationFrame(tick);
        else resolve();
      };
      anim = requestAnimationFrame(tick);
    });
  }
  function bounds() {
    if (!state.cards.length) return null;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const card of state.cards) {
      minX = Math.min(minX, card.x);
      minY = Math.min(minY, card.y);
      maxX = Math.max(maxX, card.x + card.w);
      maxY = Math.max(maxY, card.y + card.h);
    }
    return { minX, minY, maxX, maxY };
  }
  function fitView(animated = true) {
    const box = bounds();
    if (!box) return;
    const pad = 48;
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    const zoom = clamp(Math.min((vw - pad * 2) / (box.maxX - box.minX), (vh - pad * 2) / (box.maxY - box.minY)), 0.3, 1.1);
    const pan = {
      x: (vw - (box.maxX - box.minX) * zoom) / 2 - box.minX * zoom,
      y: (vh - (box.maxY - box.minY) * zoom) / 2 - box.minY * zoom
    };
    if (!animated) {
      state.zoom = zoom;
      state.pan = pan;
      applyView();
      return;
    }
    return animateTo(zoom, pan);
  }
  function centerCard(card) {
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    const zoom = clamp(Math.max(state.zoom, 0.9), 0.6, 1.2);
    return animateTo(zoom, {
      x: (vw - card.w * zoom) / 2 - card.x * zoom,
      y: (vh - card.h * zoom) / 2 - card.y * zoom
    });
  }
  let toastTimer = 0;
  function toast(text4) {
    toastNode.textContent = text4;
    toastNode.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastNode.classList.remove("show"), 2400);
  }
  const byId = (id) => state.cards.find((c) => c.id === id);
  const stackOf = (card) => card && card.stackId ? state.stacks.find((s) => s.id === card.stackId) : null;
  const stackCards = (stack) => stack.order.map(byId).filter(Boolean);
  const stackTop = (stack) => {
    const list = stackCards(stack);
    return list[list.length - 1];
  };
  function layoutStack(stack) {
    const cards = stackCards(stack);
    if (!cards.length) return;
    schedulePipelines();
    state.zTop += cards.length + 1;
    const base = state.zTop;
    const inStack = cards.length > 1;
    cards.forEach((card, index) => {
      card.x = stack.x + index * STACK_OFFSET;
      card.y = stack.y + index * STACK_OFFSET;
      card.el.style.left = card.x + "px";
      card.el.style.top = card.y + "px";
      card.el.style.zIndex = String(base + index);
      card.el.classList.toggle("iwb-in-stack", inStack);
      const badge = card.el.querySelector(".iwb-stack-badge");
      if (badge) {
        badge.hidden = !(inStack && index === cards.length - 1);
        badge.textContent = t2("stacked").replace("{n}", String(cards.length));
      }
      const detach = card.el.querySelector('[data-act="detach"]');
      if (detach) detach.style.display = inStack ? "" : "none";
    });
  }
  function createStack(card) {
    const stack = { id: "st" + ++state.stackSeq, x: card.x, y: card.y, order: [card.id] };
    card.stackId = stack.id;
    state.stacks.push(stack);
    return stack;
  }
  function promoteInStack(card) {
    const stack = stackOf(card);
    if (!stack || stackTop(stack) === card) return;
    stack.order = stack.order.filter((id) => id !== card.id);
    stack.order.push(card.id);
    layoutStack(stack);
    saveSoon();
  }
  function ensureVisible(card) {
    const rect = canvas.getBoundingClientRect();
    const left = rect.left + state.pan.x + card.x * state.zoom;
    const top = rect.top + state.pan.y + card.y * state.zoom;
    const right = left + card.w * state.zoom;
    const bottom = top + card.h * state.zoom;
    const margin = 40;
    if (left < rect.left + margin || top < rect.top + margin || right > rect.right - margin || bottom > rect.bottom - margin) {
      void centerCard(card);
    }
  }
  function stackOnto(target, card) {
    if (!target || target === card) return;
    const stack = stackOf(target) || createStack(target);
    if (stackOf(card)) detachFromStack(card, true);
    if (stack.order.includes(card.id)) return;
    stack.order.push(card.id);
    card.stackId = stack.id;
    layoutStack(stack);
    ensureVisible(stackTop(stack) || card);
    toast(t2("toast.stacked"));
    saveSoon();
  }
  function detachFromStack(card, silent) {
    const stack = stackOf(card);
    if (!stack) return;
    stack.order = stack.order.filter((id) => id !== card.id);
    card.stackId = null;
    card.x = stack.x + stack.order.length * STACK_OFFSET + 56;
    card.y = stack.y + 28;
    card.el.style.left = card.x + "px";
    card.el.style.top = card.y + "px";
    card.el.classList.remove("iwb-in-stack");
    const badge = card.el.querySelector(".iwb-stack-badge");
    if (badge) badge.hidden = true;
    const detach = card.el.querySelector('[data-act="detach"]');
    if (detach) detach.style.display = "none";
    if (stack.order.length <= 1) {
      const last = stack.order.length ? byId(stack.order[0]) : null;
      if (last) {
        last.stackId = null;
        last.x = stack.x;
        last.y = stack.y;
        last.el.style.left = last.x + "px";
        last.el.style.top = last.y + "px";
        last.el.classList.remove("iwb-in-stack");
        const lastBadge = last.el.querySelector(".iwb-stack-badge");
        if (lastBadge) lastBadge.hidden = true;
        const lastDetach = last.el.querySelector('[data-act="detach"]');
        if (lastDetach) lastDetach.style.display = "none";
      }
      state.stacks = state.stacks.filter((s) => s !== stack);
    } else {
      layoutStack(stack);
    }
    if (!silent) saveSoon();
  }
  function overlapRatio(a, b) {
    const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
    const y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    if (!x || !y) return 0;
    return x * y / (a.w * a.h);
  }
  function tryStack(card) {
    let best = null;
    let bestRatio = 0;
    for (const other of state.cards) {
      if (other === card) continue;
      const stack = stackOf(other);
      const target = stack ? stackCards(stack)[0] : other;
      if (!target || target === card) continue;
      const ratio = overlapRatio(card, target);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = target;
      }
    }
    if (best && bestRatio >= 0.42) stackOnto(best, card);
  }
  function nextSlot() {
    const cols = 3;
    const hit = (a, b) => !(a.x + a.w + GAP <= b.x || b.x + b.w + GAP <= a.x || a.y + a.h + GAP <= b.y || b.y + b.h + GAP <= a.y);
    for (let i = 0; i < 400; i += 1) {
      const candidate = { x: i % cols * (DEFAULT_W + GAP), y: Math.floor(i / cols) * (DEFAULT_H + GAP), w: DEFAULT_W, h: DEFAULT_H };
      if (!state.cards.some((card) => hit(candidate, card))) return { x: candidate.x, y: candidate.y };
    }
    return { x: 0, y: (state.cards.length + 1) * (DEFAULT_H + GAP) };
  }
  function cardMarkup(card) {
    return '<div class="iwb-progress"></div><header class="iwb-head"><span class="iwb-dot" title="' + t2("state.idle") + '"></span><span class="iwb-card-title"></span><span class="iwb-card-workspace" hidden></span><span class="iwb-status" hidden></span><span class="iwb-unread" hidden></span><button type="button" class="iwb-meta"></button><span class="iwb-elapsed"></span><span class="iwb-stack-badge" hidden></span><span class="iwb-pipe-badge" hidden></span><span class="iwb-actions"><button type="button" data-act="outline" title="' + t2("card.outline") + '" aria-label="' + t2("card.outline") + '">' + icon("list") + '</button><button type="button" data-act="search" title="' + t2("card.search") + '" aria-label="' + t2("card.search") + '">' + icon("search") + '</button><button type="button" data-act="more" class="iwb-act-more" title="' + t2("card.more") + '" aria-label="' + t2("card.more") + '">' + icon("more") + '</button><button type="button" data-act="close" title="' + t2("remove") + '" aria-label="' + t2("remove") + '">' + icon("close") + '</button><span class="iwb-acts-more" hidden><button type="button" data-act="pin" title="' + t2("card.pin") + '" aria-label="' + t2("card.pin") + '">' + icon("pin") + '</button><button type="button" data-act="copy" title="' + t2("card.copy") + '" aria-label="' + t2("card.copy") + '">' + icon("copy") + '</button><button type="button" data-act="detach" title="' + t2("detach") + '" aria-label="' + t2("detach") + '" style="display:none">' + icon("layers") + '</button><button type="button" data-act="open" title="' + t2("openNative") + '" aria-label="' + t2("openNative") + '">' + icon("open") + '</button></span></span></header><div class="iwb-search" hidden><input class="iwb-search-input" type="text" /><span class="iwb-search-count"></span></div><div class="iwb-body"></div><div class="iwb-queue" hidden></div><div class="iwb-foot"></div><div class="iwb-resize"></div>';
  }
  function noteBody(card) {
    const body = card.el.querySelector(".iwb-body");
    body.textContent = "";
    card.viewMode = card.viewMode || "preview";
    const toggle = el("div", "iwb-note-toggle");
    const previewButton = el("button", "iwb-note-toggle-button", "\u9884\u89C8");
    previewButton.type = "button";
    previewButton.title = "\u67E5\u770B Markdown \u6E32\u67D3\u6548\u679C";
    const sourceButton = el("button", "iwb-note-toggle-button", "\u6E90\u7801");
    sourceButton.type = "button";
    sourceButton.title = "\u67E5\u770B Markdown \u6E90\u7801";
    toggle.append(previewButton, sourceButton);
    body.appendChild(toggle);
    const preview = el("div", "iwb-note-preview");
    body.appendChild(preview);
    const area = document.createElement("textarea");
    area.className = "iwb-note-input";
    area.value = card.note || "";
    area.placeholder = t2("note.placeholder");
    body.appendChild(area);
    const sync = () => {
      preview.hidden = card.viewMode === "source";
      area.hidden = card.viewMode !== "source";
      previewButton.classList.toggle("active", card.viewMode === "preview");
      sourceButton.classList.toggle("active", card.viewMode === "source");
      previewButton.setAttribute("aria-pressed", String(card.viewMode === "preview"));
      sourceButton.setAttribute("aria-pressed", String(card.viewMode === "source"));
      if (card.viewMode === "preview") {
        preview.textContent = "";
        appendMarkdownLite(preview, card.note || "");
      }
    };
    previewButton.addEventListener("click", () => {
      card.viewMode = "preview";
      sync();
      saveSoon();
    });
    sourceButton.addEventListener("click", () => {
      card.viewMode = "source";
      sync();
      saveSoon();
    });
    area.addEventListener("input", () => {
      card.note = area.value;
      sync();
      saveSoon();
    });
    sync();
  }
  function fileCardBody(card) {
    const body = card.el.querySelector(".iwb-body");
    body.textContent = "";
    const wrap = el("div", "iwb-file-body");
    const kind = fileKind({ name: card.title, type: card.type });
    if (kind === "image") {
      const image = el("img", "iwb-file-thumb");
      image.alt = card.title || "\u56FE\u7247\u6587\u4EF6";
      wrap.appendChild(image);
      fileStore.get(card.fileId).then((record) => {
        if (record?.blob) image.src = URL.createObjectURL(record.blob);
      });
    } else {
      const iconNode = el("div", "iwb-file-icon", fileKindIcon(kind));
      wrap.appendChild(iconNode);
    }
    const name = el("div", "iwb-file-name");
    name.textContent = card.title || "\u672A\u547D\u540D\u6587\u4EF6";
    const meta = el("div", "iwb-file-meta");
    meta.textContent = (card.type || kind.toUpperCase()) + " \xB7 " + formatBytes(card.size);
    const open = el("button", "iwb-btn primary iwb-file-open", icon("eye", 13) + "<span>\u9884\u89C8</span>");
    open.type = "button";
    open.addEventListener("click", (event) => {
      event.stopPropagation();
      void openStoredFile(card);
    });
    wrap.append(name, meta, open);
    body.appendChild(wrap);
  }
  function fileKindIcon(kind) {
    return { image: "IMG", pdf: "PDF", docx: "DOC", pptx: "PPT", html: "HTML", text: "TXT", other: "FILE" }[kind] || "FILE";
  }
  async function openStoredFile(card) {
    const record = await fileStore.get(card.fileId);
    if (!record) {
      toast("\u6587\u4EF6\u5185\u5BB9\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u65B0\u6DFB\u52A0");
      return;
    }
    openFilePreview({ ...record, name: card.title, type: card.type, size: card.size });
  }
  async function addFileCard(fileOrMeta) {
    const fileId = fileOrMeta.fileId || await fileStore.put(fileOrMeta);
    const kind = fileKind(fileOrMeta);
    const card = {
      id: "f" + ++state.seq,
      kind: "file",
      fileId,
      title: fileOrMeta.name || fileOrMeta.title || "\u672A\u547D\u540D\u6587\u4EF6",
      type: fileOrMeta.type || kind,
      size: Number(fileOrMeta.size) || 0,
      x: typeof fileOrMeta.x === "number" ? fileOrMeta.x : nextSlot().x,
      y: typeof fileOrMeta.y === "number" ? fileOrMeta.y : nextSlot().y,
      w: fileOrMeta.w || DEFAULT_W,
      h: fileOrMeta.h || DEFAULT_H,
      stackId: null,
      running: false,
      composerDraft: "",
      pipeline: null
    };
    const node = el("article", "iwb-card iwb-file-card", cardMarkup(card));
    node.tabIndex = -1;
    node.setAttribute("role", "listitem");
    node.style.left = card.x + "px";
    node.style.top = card.y + "px";
    node.style.width = card.w + "px";
    node.style.height = card.h + "px";
    card.el = node;
    world.appendChild(node);
    node.querySelector(".iwb-card-title").textContent = card.title;
    for (const selector of [".iwb-meta", ".iwb-elapsed", ".iwb-foot", ".iwb-pipe-badge", '[data-act="search"]', '[data-act="outline"]', '[data-act="pipe"]']) {
      node.querySelector(selector)?.remove();
    }
    const previewButton = el("button", "iwb-file-preview-button", icon("eye", 13));
    previewButton.type = "button";
    previewButton.title = "\u9884\u89C8\u6587\u4EF6";
    previewButton.setAttribute("aria-label", "\u9884\u89C8\u6587\u4EF6");
    previewButton.addEventListener("click", (event) => {
      event.stopPropagation();
      void openStoredFile(card);
    });
    node.querySelector(".iwb-actions").insertBefore(previewButton, node.querySelector('[data-act="close"]'));
    bindCard(card);
    fileCardBody(card);
    state.cards.push(card);
    updateCounts();
    updateEmptyState();
    saveSoon();
    if (fileOrMeta.focus !== false) centerCard(card);
    return card;
  }
  function addNote({ id, note, title, x, y, w, h, focus, viewMode }) {
    if (disposed) return null;
    const slot = nextSlot();
    const card = {
      id: id || "n" + ++state.seq,
      kind: "note",
      note: note || "",
      viewMode: viewMode || "preview",
      title: title || t2("note.title"),
      x: typeof x === "number" ? x : slot.x,
      y: typeof y === "number" ? y : slot.y,
      w: typeof w === "number" ? w : DEFAULT_W,
      h: typeof h === "number" ? h : DEFAULT_H,
      stackId: null
    };
    const node = el("article", "iwb-card iwb-card-note", cardMarkup(card));
    node.tabIndex = -1;
    node.setAttribute("role", "listitem");
    node.style.left = card.x + "px";
    node.style.top = card.y + "px";
    node.style.width = card.w + "px";
    node.style.height = card.h + "px";
    card.el = node;
    world.appendChild(node);
    node.querySelector(".iwb-card-title").textContent = card.title;
    node.querySelector(".iwb-meta")?.remove();
    node.querySelector(".iwb-elapsed")?.remove();
    node.querySelector(".iwb-foot")?.remove();
    node.querySelector('[data-act="search"]')?.remove();
    node.querySelector('[data-act="outline"]')?.remove();
    node.querySelector('[data-act="pipe"]')?.remove();
    node.querySelector(".iwb-pipe-badge")?.remove();
    node.querySelector(".iwb-search")?.remove();
    noteBody(card);
    bindCard(card);
    state.cards.push(card);
    updateCounts();
    updateEmptyState();
    saveSoon();
    if (focus) centerCard(card);
    return card;
  }
  function addSession({ sessionId, title, workspace, x, y, w, h, focus, pipeline, composerDraft, autoTask }) {
    if (disposed) return null;
    const existing = state.cards.find((card2) => card2.sessionId === sessionId);
    if (existing) {
      if (existing.stackId) promoteInStack(existing);
      centerCard(existing);
      flash(existing);
      return existing;
    }
    const slot = nextSlot();
    const card = {
      id: "c" + ++state.seq,
      sessionId,
      title: title || adapter.titleOf(sessionId) || t2("untitled"),
      model: "",
      x: typeof x === "number" ? x : slot.x,
      y: typeof y === "number" ? y : slot.y,
      w: w || DEFAULT_W,
      h: h || DEFAULT_H,
      stackId: null,
      kind: "session",
      autoTask: Boolean(autoTask),
      running: false,
      startedAt: 0,
      composerDraft: composerDraft || "",
      toolOpen: /* @__PURE__ */ new Map(),
      view: null,
      pipeline: pipeline || null,
      pipeDepth: 0,
      pipedFingerprint: ""
    };
    const node = el("article", "iwb-card", cardMarkup(card));
    node.tabIndex = -1;
    node.setAttribute("role", "listitem");
    node.style.left = card.x + "px";
    node.style.top = card.y + "px";
    node.style.width = card.w + "px";
    node.style.height = card.h + "px";
    node.dataset.sessionId = sessionId;
    card.el = node;
    world.appendChild(node);
    for (const side of ["top", "right", "bottom", "left"]) {
      const port = el("span", "iwb-port");
      port.dataset.side = side;
      node.appendChild(port);
    }
    node.querySelector(".iwb-card-title").textContent = card.title;
    const bodyRegion = node.querySelector(".iwb-body");
    bodyRegion.tabIndex = 0;
    bodyRegion.setAttribute("role", "log");
    bodyRegion.setAttribute("aria-label", t2("a11y.body"));
    bindCard(card);
    bindPort(card);
    for (const [boardKey, value] of expandedTurns) {
      if (!boardKey.startsWith(sessionId + ":")) continue;
      card.toolOpen.set("turn:" + boardKey.slice(sessionId.length + 1), value);
    }
    renderFoot(card);
    renderPipeBadge(card);
    schedulePipelines();
    state.cards.push(card);
    updateCounts();
    updateEmptyState();
    if (state.cards.length === 1 && !state.savedView) void fitView();
    else if (focus) centerCard(card);
    try {
      card.detach = adapter.open(sessionId, () => markDirty(card));
      card.detachApprovals = adapter.listenApprovals?.(sessionId, (id, request2, next) => {
        if (!approvals?.enabled || !approvals.hasSession?.(id)) return next();
        return approvals.request(id, request2);
      }) || (() => {
      });
      syncApprovalSessions();
    } catch {
      card.detach = () => {
      };
      renderBody(card, {
        ready: true,
        running: false,
        items: [{ k: "error", text: t2("error.open") }],
        hasMore: false,
        loadingOlder: false,
        model: ""
      });
    }
    return card;
  }
  function flash(card) {
    card.el.classList.remove("iwb-flash");
    void card.el.offsetWidth;
    card.el.classList.add("iwb-flash");
    setTimeout(() => card.el?.classList.remove("iwb-flash"), 1100);
  }
  function liveApprovalNode(card) {
    const entries = approvals?.list?.(card.sessionId) || [];
    if (!entries.length) return null;
    const node = el("div", "iwb-approval-live");
    for (const entry of entries) {
      const head = el("div", "iwb-approval-live-head");
      head.textContent = t2("approval.waiting");
      const title = el("div", "iwb-approval-live-title");
      title.textContent = entry.toolName ? t2("approval.escalation").replace("{name}", entry.toolName) : t2("approval.requested");
      node.append(head, title);
      if (entry.reason) {
        const reason = el("div", "iwb-approval-live-reason");
        reason.textContent = entry.reason;
        node.appendChild(reason);
      }
      const actions2 = el("div", "iwb-question-actions");
      const reject = el("button", "iwb-btn");
      reject.type = "button";
      reject.textContent = t2("approval.reject");
      reject.addEventListener("click", (event) => {
        event.stopPropagation();
        approvals.settle(entry.id, approvals.OUTCOME_REJECT);
      });
      const allow = el("button", "iwb-btn primary");
      allow.type = "button";
      allow.textContent = t2("approval.allowOnce");
      allow.addEventListener("click", (event) => {
        event.stopPropagation();
        approvals.settle(entry.id, approvals.OUTCOME_ALLOW);
      });
      actions2.append(reject, allow);
      node.appendChild(actions2);
    }
    return node;
  }
  function updateTodoBar() {
    const totals = { approval: 0, question: 0, queued: 0 };
    for (const card of state.cards) {
      const pendingApproval = approvals?.list?.(card.sessionId)?.length || 0;
      totals.approval += pendingApproval;
      totals.question += card.view?.questions?.length || 0;
      totals.queued += card.queued || 0;
      card.pendingApproval = pendingApproval;
    }
    const parts = [];
    if (totals.approval) parts.push(t2("todo.approval").replace("{n}", String(totals.approval)));
    if (totals.question) parts.push(t2("todo.question").replace("{n}", String(totals.question)));
    if (totals.queued) parts.push(t2("todo.queued").replace("{n}", String(totals.queued)));
    todoBar.hidden = parts.length === 0;
    todoBar.textContent = parts.join(" \xB7 ");
    todoBar.title = t2("todo.title");
  }
  function focusNextPending() {
    const order = ["approval", "question"];
    for (const kind of order) {
      const card = state.cards.find((entry) => kind === "approval" ? entry.pendingApproval : entry.view?.questions?.length);
      if (card) {
        centerCard(card);
        flash(card);
        return;
      }
    }
    const queued = state.cards.find((card) => card.queued);
    if (queued) {
      centerCard(queued);
      flash(queued);
    }
  }
  todoBar.addEventListener("click", (event) => {
    event.stopPropagation();
    focusNextPending();
  });
  function setAllTurns(open) {
    for (const card of state.cards) {
      const view = card.view;
      if (!view) continue;
      card.toolOpen.clear();
      if (open) {
        for (const item of view.items || []) {
          if (item.k === "turnProcess" && item.endTime != null) card.toolOpen.set("turn:" + item.turn, true);
        }
      }
      card.signatureBust = (card.signatureBust || 0) + 1;
      markDirty(card);
    }
    toast(open ? t2("board.expandedAll") : t2("board.collapsedAll"));
  }
  let allOpen = false;
  btnCollapse.addEventListener("click", (event) => {
    event.stopPropagation();
    allOpen = !allOpen;
    btnCollapse.querySelector("span").textContent = allOpen ? t2("board.collapseAll") : t2("board.expandAll");
    setAllTurns(allOpen);
  });
  function cardOrder() {
    return [...state.cards].sort((left, right) => left.y - right.y || left.x - right.x);
  }
  function focusCard(card, options) {
    if (!card?.el) return;
    for (const other of state.cards) {
      other.el.tabIndex = other === card ? 0 : -1;
      other.el.classList.toggle("iwb-focus", other === card);
      if (other === card) other.el.setAttribute("aria-current", "true");
      else other.el.removeAttribute("aria-current");
    }
    state.focusedId = card.id;
    card.el.focus({ preventScroll: true });
    if (options?.reveal !== false) ensureVisible(card);
    if (options?.announce !== false) toast(t2("a11y.focused").replace("{name}", card.title || t2("untitled")));
  }
  function moveFocus(direction) {
    if (!state.cards.length) return;
    const current = state.cards.find((card) => card.id === state.focusedId);
    if (!current) {
      focusCard(cardOrder()[0]);
      return;
    }
    const cx = current.x + current.w / 2;
    const cy = current.y + current.h / 2;
    let best = null;
    let bestScore = Infinity;
    for (const card of state.cards) {
      if (card === current) continue;
      const dx = card.x + card.w / 2 - cx;
      const dy = card.y + card.h / 2 - cy;
      const forward = direction === "left" ? dx < -1 : direction === "right" ? dx > 1 : direction === "up" ? dy < -1 : dy > 1;
      if (!forward) continue;
      const primary = direction === "left" || direction === "right" ? Math.abs(dx) : Math.abs(dy);
      const secondary = direction === "left" || direction === "right" ? Math.abs(dy) : Math.abs(dx);
      const score = primary + secondary * 2;
      if (score < bestScore) {
        bestScore = score;
        best = card;
      }
    }
    if (best) focusCard(best);
  }
  function nudgeCard(card, dx, dy) {
    const step = 24;
    card.x = Math.round((card.x + dx * step) / 8) * 8;
    card.y = Math.round((card.y + dy * step) / 8) * 8;
    card.el.style.left = card.x + "px";
    card.el.style.top = card.y + "px";
    saveSoon();
    ensureVisible(card);
  }
  function selectedCards() {
    return state.cards.filter((card) => state.selected.has(card.id));
  }
  function renderBatchBar() {
    const picked = selectedCards();
    batchBar.textContent = "";
    batchBar.hidden = picked.length === 0;
    if (!picked.length) return;
    const label = el("span", "iwb-batch-label");
    label.textContent = t2("batch.selected").replace("{n}", String(picked.length));
    batchBar.appendChild(label);
    const actions2 = [
      { key: "stack", label: t2("batch.stack"), run: stackSelected },
      { key: "align", label: t2("batch.align"), run: alignSelected },
      { key: "distribute", label: t2("batch.distribute"), run: distributeSelected },
      { key: "close", label: t2("batch.close"), run: closeSelected, danger: true }
    ];
    for (const action of actions2) {
      const button = el("button", "iwb-btn" + (action.danger ? " iwb-btn-danger" : ""));
      button.type = "button";
      button.textContent = action.label;
      button.disabled = picked.length < 2 && action.key !== "close";
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        action.run();
      });
      batchBar.appendChild(button);
    }
    const clear = el("button", "iwb-btn");
    clear.type = "button";
    clear.textContent = t2("batch.clear");
    clear.addEventListener("click", (event) => {
      event.stopPropagation();
      clearSelection();
    });
    batchBar.appendChild(clear);
  }
  function setSelected(card, value) {
    if (value) state.selected.add(card.id);
    else state.selected.delete(card.id);
    card.el?.classList.toggle("iwb-selected", value);
    card.el?.setAttribute("aria-selected", value ? "true" : "false");
    renderBatchBar();
  }
  function toggleSelect(card) {
    setSelected(card, !state.selected.has(card.id));
  }
  function clearSelection() {
    for (const card of state.cards) {
      state.selected.delete(card.id);
      card.el?.classList.remove("iwb-selected");
      card.el?.removeAttribute("aria-selected");
    }
    renderBatchBar();
  }
  function selectAll() {
    for (const card of state.cards) setSelected(card, true);
  }
  function stackSelected() {
    const picked = selectedCards().filter((card) => !card.stackId);
    if (picked.length < 2) return;
    const first = picked[0];
    const model = { id: "st" + ++state.stackSeq, x: first.x, y: first.y, order: picked.map((card) => card.id) };
    picked.forEach((card) => {
      card.stackId = model.id;
    });
    state.stacks.push(model);
    layoutStack(model);
    clearSelection();
    saveSoon();
    toast(t2("batch.stacked").replace("{n}", String(picked.length)));
  }
  function alignSelected() {
    const picked = selectedCards().filter((card) => !card.stackId);
    if (picked.length < 2) return;
    const base = picked[0];
    for (const card of picked) {
      card.x = base.x;
      card.y = base.y;
      card.el.style.left = card.x + "px";
      card.el.style.top = card.y + "px";
    }
    clearSelection();
    saveSoon();
    toast(t2("batch.aligned"));
  }
  function distributeSelected() {
    const picked = selectedCards().filter((card) => !card.stackId);
    if (picked.length < 2) return;
    const base = picked[0];
    const horizontal = picked.length > 1;
    picked.forEach((card, index) => {
      card.x = base.x + index * (card.w + GAP);
      card.y = base.y;
      card.el.style.left = card.x + "px";
      card.el.style.top = card.y + "px";
    });
    clearSelection();
    void fitView();
    saveSoon();
    toast(t2("batch.distributed"));
  }
  function closeSelected() {
    const picked = selectedCards();
    if (!picked.length) return;
    for (const card of picked) removeCard(card);
    clearSelection();
    toast(t2("batch.closed").replace("{n}", String(picked.length)));
  }
  let canvasPop = null;
  let taskView = null;
  let taskController = null;
  let canvasSaveTimer = 0;
  let switchingCanvas = false;
  function syncActiveCanvas() {
    clearTimeout(canvasSaveTimer);
    canvasSaveTimer = 0;
    if (switchingCanvas || !state.activeCanvas) return false;
    const active = syncCanvases().find((canvas2) => canvas2.id === state.activeCanvas);
    if (!active) return false;
    active.layout = layoutPayload();
    active.savedAt = Date.now();
    storeCanvases();
    return true;
  }
  function scheduleActiveCanvasSave() {
    if (switchingCanvas || !state.activeCanvas) return;
    clearTimeout(canvasSaveTimer);
    canvasSaveTimer = setTimeout(syncActiveCanvas, 450);
  }
  function closeCanvasMenu() {
    canvasPop?.remove();
    canvasPop = null;
  }
  function loadLocalCanvases() {
    try {
      const raw = window.localStorage.getItem(CANVAS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.canvases)) return null;
      return parsed;
    } catch {
      return null;
    }
  }
  function syncCanvases() {
    state.canvases = Array.isArray(state.canvases) ? state.canvases : [];
    return state.canvases;
  }
  function storeCanvases() {
    const payload = { canvases: state.canvases, activeCanvas: state.activeCanvas };
    try {
      window.localStorage.setItem(CANVAS_KEY, JSON.stringify(payload));
    } catch {
    }
    void pushCanvases(payload.canvases, payload.activeCanvas);
    renderCanvasButton();
  }
  function renderCanvasButton() {
    const active = syncCanvases().find((canvas2) => canvas2.id === state.activeCanvas);
    btnCanvas.querySelector("span").textContent = active ? t2("canvas") + " \xB7 " + active.name : t2("canvas");
    btnCanvas.title = active ? t2("canvas.active").replace("{name}", active.name) : t2("canvas.title");
    btnCanvas.classList.toggle("iwb-btn-active", Boolean(active));
    if (state.mode === "task") taskView?.refresh();
  }
  function usableCanvases(list) {
    return (Array.isArray(list) ? list : []).filter(
      (canvas2) => canvas2 && typeof canvas2.id === "string" && canvas2.layout && Array.isArray(canvas2.layout.cards)
    );
  }
  function mergeCanvases(remoteList, localList) {
    const byId2 = /* @__PURE__ */ new Map();
    for (const canvas2 of usableCanvases(localList)) byId2.set(canvas2.id, canvas2);
    for (const canvas2 of usableCanvases(remoteList)) {
      const existing = byId2.get(canvas2.id);
      if (!existing || (canvas2.savedAt || 0) >= (existing.savedAt || 0)) byId2.set(canvas2.id, canvas2);
    }
    return [...byId2.values()].sort((left, right) => (left.savedAt || 0) - (right.savedAt || 0));
  }
  async function loadCanvases() {
    const remote = await fetchCanvases();
    const local = loadLocalCanvases();
    const remoteCanvases = remote?.canvases || [];
    const localCanvases = local?.canvases || [];
    const merged = mergeCanvases(remoteCanvases, localCanvases);
    state.canvases = merged;
    state.activeCanvas = remote?.activeCanvas || local?.activeCanvas || null;
    if (!merged.some((canvas2) => canvas2.id === state.activeCanvas)) state.activeCanvas = null;
    if (!state.cards.length && state.activeCanvas) {
      const active = merged.find((canvas2) => canvas2.id === state.activeCanvas);
      if (active?.layout?.cards?.length && Number(active.savedAt || active.layout.updatedAt || 0) >= localUpdatedAt) {
        suppressSave = true;
        try {
          await applyLayout(active.layout, { restore: true });
        } finally {
          suppressSave = false;
        }
      }
    }
    renderCanvasButton();
  }
  function canvasStamp() {
    return (/* @__PURE__ */ new Date()).toLocaleString(void 0, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  function saveCanvasAs(name) {
    const trimmed = String(name || "").trim();
    if (!trimmed) {
      toast(t2("canvas.nameRequired"));
      return false;
    }
    state.canvases = syncCanvases().filter((canvas3) => canvas3.name !== trimmed);
    const canvas2 = {
      id: "cv" + Date.now().toString(36),
      name: trimmed,
      savedAt: Date.now(),
      layout: layoutPayload()
    };
    state.canvases = [...state.canvases, canvas2];
    state.activeCanvas = canvas2.id;
    storeCanvases();
    toast(t2("canvas.saved").replace("{name}", trimmed));
    return true;
  }
  function updateActiveCanvas() {
    const active = syncCanvases().find((canvas2) => canvas2.id === state.activeCanvas);
    if (!active) return false;
    active.layout = layoutPayload();
    active.savedAt = Date.now();
    storeCanvases();
    toast(t2("canvas.updated").replace("{name}", active.name));
    return true;
  }
  function switchCanvas(id) {
    const target = syncCanvases().find((canvas2) => canvas2.id === id);
    if (!target || switchingCanvas) return;
    if (state.activeCanvas && state.activeCanvas !== id) syncActiveCanvas();
    switchingCanvas = true;
    state.activeCanvas = id;
    storeCanvases();
    closeCanvasMenu();
    try {
      applyLayout(target.layout, { toast: t2("canvas.switched").replace("{name}", target.name) });
      save();
      void fitView();
    } catch {
      toast(t2("canvas.broken"));
    } finally {
      switchingCanvas = false;
    }
  }
  function createBlankCanvas() {
    if (state.activeCanvas) syncActiveCanvas();
    switchingCanvas = true;
    try {
      state.activeCanvas = null;
      reset();
      state.zoom = 1;
      state.pan = { x: 24, y: 24 };
      applyView();
      storeCanvases();
      save();
      toast("\u5DF2\u65B0\u5EFA\u7A7A\u767D\u753B\u5E03\uFF0C\u539F\u753B\u5E03\u4ECD\u4FDD\u7559\u5728\u753B\u5E03\u5217\u8868\u4E2D");
    } finally {
      switchingCanvas = false;
    }
  }
  function confirmUnsavedCanvas() {
    return new Promise((resolve) => {
      const dialog = document.createElement("dialog");
      dialog.className = "iwb-confirm-dialog";
      dialog.setAttribute("aria-labelledby", "iwb-unsaved-title");
      dialog.innerHTML = `
        <form method="dialog" class="iwb-confirm-form">
          <h2 id="iwb-unsaved-title">\u4FDD\u5B58\u5F53\u524D\u753B\u5E03\uFF1F</h2>
          <p>\u5F53\u524D\u753B\u5E03\u8FD8\u6CA1\u6709\u547D\u540D\u3002\u7EE7\u7EED\u540E\u4F1A\u6E05\u7A7A\u5F53\u524D\u89C6\u56FE\uFF0C\u4F46\u4E0D\u4F1A\u505C\u6B62\u6216\u5220\u9664\u4EFB\u4F55 DSH \u4F1A\u8BDD\u3002</p>
          <label>\u753B\u5E03\u540D\u79F0<input name="canvasName" maxlength="60" value="\u672A\u547D\u540D\u753B\u5E03" autocomplete="off"></label>
          <div class="iwb-confirm-actions">
            <button type="button" data-choice="cancel">\u53D6\u6D88</button>
            <button type="button" data-choice="discard">\u4E0D\u4FDD\u5B58\uFF0C\u7EE7\u7EED</button>
            <button type="button" class="primary" data-choice="save">\u4FDD\u5B58\u5E76\u7EE7\u7EED</button>
          </div>
        </form>`;
      document.body.appendChild(dialog);
      const finish = (choice) => {
        const name = dialog.querySelector("input").value.trim();
        if (choice === "save" && !name) {
          dialog.querySelector("input").focus();
          return;
        }
        dialog.remove();
        resolve({ choice, name });
      };
      dialog.querySelector('[data-choice="cancel"]').addEventListener("click", () => finish("cancel"));
      dialog.querySelector('[data-choice="discard"]').addEventListener("click", () => finish("discard"));
      dialog.querySelector('[data-choice="save"]').addEventListener("click", () => finish("save"));
      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        finish("cancel");
      });
      dialog.showModal();
      const input = dialog.querySelector("input");
      input.focus();
      input.select();
    });
  }
  async function requestNewBlankCanvas() {
    if (state.activeCanvas || !state.cards.length) {
      createBlankCanvas();
      return true;
    }
    const result = await confirmUnsavedCanvas();
    if (result.choice === "cancel") return false;
    if (result.choice === "save" && !saveCanvasAs(result.name)) return false;
    createBlankCanvas();
    return true;
  }
  async function requestSwitchCanvas(id) {
    if (!state.activeCanvas && state.cards.length) {
      const result = await confirmUnsavedCanvas();
      if (result.choice === "cancel") return false;
      if (result.choice === "save" && !saveCanvasAs(result.name)) return false;
    }
    switchCanvas(id);
    return true;
  }
  function deleteCanvas(id) {
    const target = syncCanvases().find((canvas2) => canvas2.id === id);
    state.canvases = syncCanvases().filter((canvas2) => canvas2.id !== id);
    if (state.activeCanvas === id) state.activeCanvas = null;
    storeCanvases();
    if (target) toast(t2("canvas.deleted").replace("{name}", target.name));
  }
  function openCanvasMenu() {
    if (canvasPop) {
      closeCanvasMenu();
      return;
    }
    const pop = el("div", "iwb-popover iwb-canvas-menu");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("canvas.title"));
    const head = el("div", "iwb-popover-head");
    head.textContent = t2("canvas.title");
    pop.appendChild(head);
    const active = syncCanvases().find((canvas2) => canvas2.id === state.activeCanvas);
    const status = el("div", "iwb-popover-note");
    status.textContent = active ? t2("canvas.current").replace("{name}", active.name) : t2("canvas.unsaved");
    pop.appendChild(status);
    const form = el("div", "iwb-canvas-form");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "iwb-canvas-input";
    input.placeholder = t2("canvas.placeholder");
    input.value = active ? active.name : "";
    const saveBtn = el("button", "iwb-btn primary");
    saveBtn.type = "button";
    saveBtn.textContent = t2("canvas.save");
    saveBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (saveCanvasAs(input.value)) {
        closeCanvasMenu();
      }
    });
    input.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Enter") {
        event.preventDefault();
        if (saveCanvasAs(input.value)) closeCanvasMenu();
      }
    });
    form.append(input, saveBtn);
    pop.appendChild(form);
    if (active) {
      const overwrite = el("button", "iwb-btn");
      overwrite.type = "button";
      overwrite.textContent = t2("canvas.overwrite").replace("{name}", active.name);
      overwrite.addEventListener("click", (event) => {
        event.stopPropagation();
        updateActiveCanvas();
        closeCanvasMenu();
      });
      pop.appendChild(overwrite);
    }
    const list = el("div", "iwb-canvas-list");
    const canvases = syncCanvases();
    if (!canvases.length) {
      const empty = el("div", "iwb-popover-note");
      empty.textContent = t2("canvas.none");
      list.appendChild(empty);
    }
    for (const canvas2 of canvases) {
      const row = el("div", "iwb-canvas-row" + (canvas2.id === state.activeCanvas ? " current" : ""));
      const pick = el("button", "iwb-canvas-pick");
      pick.type = "button";
      pick.innerHTML = '<span class="iwb-model-name"></span><span class="iwb-model-desc"></span>';
      pick.querySelector(".iwb-model-name").textContent = canvas2.name;
      const cards = Array.isArray(canvas2.layout?.cards) ? canvas2.layout.cards.length : Number(canvas2.layout?.cards) || 0;
      pick.querySelector(".iwb-model-desc").textContent = t2("canvas.meta").replace("{n}", String(cards)).replace("{time}", canvas2.savedAt ? canvasStamp(canvas2.savedAt) : "");
      pick.addEventListener("click", (event) => {
        event.stopPropagation();
        void requestSwitchCanvas(canvas2.id);
      });
      const remove = el("button", "iwb-canvas-remove");
      remove.type = "button";
      remove.title = t2("canvas.delete");
      remove.setAttribute("aria-label", t2("canvas.delete"));
      remove.textContent = "\xD7";
      remove.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteCanvas(canvas2.id);
        closeCanvasMenu();
      });
      row.append(pick, remove);
      list.appendChild(row);
    }
    pop.appendChild(list);
    const rect = btnCanvas.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left - 80, window.innerWidth - 300))) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    canvasPop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
    input.focus();
    input.select();
  }
  let kanbanPop = null;
  let kanbanTimer = 0;
  const kanbanHeads = [];
  function closeKanbanMenu() {
    kanbanPop?.remove();
    kanbanPop = null;
  }
  function clearKanbanHeads() {
    while (kanbanHeads.length) {
      const node = kanbanHeads.pop();
      node.remove();
    }
  }
  function cardStatusKey(card) {
    const pending = (card.view?.questions?.length || 0) + (card.view?.approvals?.length || 0);
    if (pending) return "waiting";
    if (card.running) return "running";
    if (card.unread) return "unread";
    return "idle";
  }
  function cardActivityKey(card) {
    const at = card.activityAt || 0;
    const age = Date.now() - at;
    if (!at) return "stale";
    if (age < 5 * 60 * 1e3) return "fresh";
    if (age < 60 * 60 * 1e3) return "hour";
    return "stale";
  }
  function kanbanGroups() {
    const key = state.board.key;
    const groups = /* @__PURE__ */ new Map();
    const push = (id, card) => {
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(card);
    };
    for (const card of state.cards) {
      if (card.kind === "note") {
        push("note", card);
        continue;
      }
      if (key === "workspace") push(card.workspace || "none", card);
      else if (key === "activity") push(cardActivityKey(card), card);
      else push(cardStatusKey(card), card);
    }
    const order = {
      status: ["running", "waiting", "unread", "idle", "note"],
      workspace: null,
      activity: ["fresh", "hour", "stale", "note"]
    }[key];
    let entries = [...groups.entries()];
    if (order) {
      entries.sort((left, right) => {
        const leftIndex = order.indexOf(left[0]);
        const rightIndex = order.indexOf(right[0]);
        return (leftIndex < 0 ? 99 : leftIndex) - (rightIndex < 0 ? 99 : rightIndex);
      });
    }
    return entries;
  }
  function kanbanLabel(id) {
    return {
      running: t2("board.state.running"),
      waiting: t2("board.state.waiting"),
      unread: t2("board.state.unread"),
      idle: t2("board.state.idle"),
      fresh: t2("board.activity.fresh"),
      hour: t2("board.activity.hour"),
      stale: t2("board.activity.stale"),
      note: t2("note.title"),
      none: t2("workspace.none")
    }[id] || id;
  }
  function applyKanban() {
    if (!state.board.active) return;
    clearKanbanHeads();
    const groups = kanbanGroups();
    const columnWidth = DEFAULT_W + GAP;
    const headerGap = 46;
    groups.forEach(([id, cards], columnIndex) => {
      const head = el("div", "iwb-kanban-head");
      head.innerHTML = '<span class="iwb-kanban-title"></span><span class="iwb-kanban-count"></span>';
      head.querySelector(".iwb-kanban-title").textContent = kanbanLabel(id);
      head.querySelector(".iwb-kanban-count").textContent = String(cards.length);
      head.style.left = columnIndex * columnWidth + "px";
      head.style.top = -headerGap + "px";
      world.appendChild(head);
      kanbanHeads.push(head);
      cards.forEach((card, rowIndex) => {
        card.x = columnIndex * columnWidth;
        card.y = rowIndex * (DEFAULT_H + GAP);
        card.el.style.left = card.x + "px";
        card.el.style.top = card.y + "px";
      });
    });
    saveSoon();
    void fitView();
    schedulePipelines();
  }
  function exitKanban() {
    state.board.active = false;
    clearKanbanHeads();
    for (const card of state.cards) {
      const saved = state.board.saved.get(card.id);
      if (!saved) continue;
      card.x = saved.x;
      card.y = saved.y;
      card.el.style.left = card.x + "px";
      card.el.style.top = card.y + "px";
    }
    state.board.saved.clear();
    saveSoon();
    void fitView();
    schedulePipelines();
    btnBoard.classList.remove("iwb-btn-active");
  }
  function enterKanban(key, label) {
    if (!state.board.active) {
      state.board.saved.clear();
      for (const card of state.cards) state.board.saved.set(card.id, { x: card.x, y: card.y });
    }
    state.board.active = true;
    state.board.key = key;
    btnBoard.classList.add("iwb-btn-active");
    applyKanban();
    toast(t2("board.applied").replace("{name}", label || kanbanLabel(key)));
  }
  function openKanbanMenu() {
    if (kanbanPop) {
      closeKanbanMenu();
      return;
    }
    const pop = el("div", "iwb-popover iwb-kanban");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("boardMode"));
    const head = el("div", "iwb-popover-head");
    head.textContent = t2("board.title");
    pop.appendChild(head);
    const options = [
      { key: "status", label: t2("board.byStatus") },
      { key: "workspace", label: t2("board.byWorkspace") },
      { key: "activity", label: t2("board.byActivity") }
    ];
    for (const option of options) {
      const row = el("button", "iwb-model-row" + (state.board.active && state.board.key === option.key ? " current" : ""));
      row.type = "button";
      row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      row.querySelector(".iwb-model-name").textContent = option.label;
      row.addEventListener("click", (event) => {
        event.stopPropagation();
        closeKanbanMenu();
        enterKanban(option.key, option.label);
      });
      pop.appendChild(row);
    }
    if (state.board.active) {
      const off = el("button", "iwb-model-row");
      off.type = "button";
      off.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      off.querySelector(".iwb-model-name").textContent = t2("board.exit");
      off.addEventListener("click", (event) => {
        event.stopPropagation();
        closeKanbanMenu();
        exitKanban();
      });
      pop.appendChild(off);
    }
    const rect = btnBoard.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left - 60, window.innerWidth - 260))) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    kanbanPop = pop;
  }
  let pipePop = null;
  function closePipeMenu() {
    pipePop?.remove();
    pipePop = null;
  }
  function sessionCardOf(sessionId) {
    return state.cards.find((card) => card.sessionId === sessionId) || null;
  }
  function pipeTargets(card) {
    const pipeline = card.pipeline;
    if (!pipeline) return [];
    if (Array.isArray(pipeline.targets)) {
      return pipeline.targets.filter((target) => target && (target.id || target.targetSessionId));
    }
    if (pipeline.targetSessionId) {
      return [{ kind: "session", id: pipeline.targetSessionId, mode: pipeline.mode === "draft" ? "draft" : "send" }];
    }
    return [];
  }
  function setPipeTargets(card, targets) {
    card.pipeline = targets.length ? { targets } : null;
  }
  function cardOfPipeTarget(target) {
    if (!target) return null;
    if (target.kind === "note") return state.cards.find((entry) => entry.kind === "note" && entry.id === target.id) || null;
    return sessionCardOf(target.id);
  }
  function pipeTargetLabel(target) {
    const targetCard = cardOfPipeTarget(target);
    if (targetCard) return targetCard.title || t2("untitled");
    return target?.id || "";
  }
  function recordFlow(card, target, status, extra) {
    const active = syncCanvases().find((canvas2) => canvas2.id === state.activeCanvas);
    const event = flow.record({
      sourceSessionId: card.sessionId,
      targetId: target.id,
      targetKind: target.kind === "note" ? "note" : "session",
      canvasId: state.activeCanvas || "",
      taskId: active?.taskId || "",
      status,
      mode: target.mode === "draft" ? "draft" : "send",
      ...extra
    });
    schedulePipelines();
    return event;
  }
  function addPipeTarget(card, targetCard, fromSide) {
    const kind = targetCard.kind === "note" ? "note" : "session";
    const id = kind === "note" ? targetCard.id : targetCard.sessionId;
    if (!id || targetCard === card) return false;
    const targets = pipeTargets(card).filter((target2) => !(target2.kind === kind && target2.id === id));
    const expanded = targets.length !== pipeTargets(card).length;
    const target = { kind, id, mode: "send", from: fromSide || "right" };
    targets.push(target);
    setPipeTargets(card, targets);
    if (!expanded) recordFlow(card, target, "waiting", { message: "\u8FDE\u7EBF\u5DF2\u521B\u5EFA\uFF0C\u7B49\u5F85\u4E0A\u6E38\u5B8C\u6210" });
    return !expanded;
  }
  const EDGE_NORMAL = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    top: { x: 0, y: -1 },
    bottom: { x: 0, y: 1 }
  };
  function edgeAnchor(card, side) {
    if (side === "left") return { x: card.x, y: card.y + card.h / 2 };
    if (side === "top") return { x: card.x + card.w / 2, y: card.y };
    if (side === "bottom") return { x: card.x + card.w / 2, y: card.y + card.h };
    return { x: card.x + card.w, y: card.y + card.h / 2 };
  }
  function sideFacing(fromPoint, target) {
    const dx = target.x + target.w / 2 - fromPoint.x;
    const dy = target.y + target.h / 2 - fromPoint.y;
    if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? "left" : "right";
    return dy > 0 ? "top" : "bottom";
  }
  function arrowPath(point, side) {
    const normal = EDGE_NORMAL[side] || EDGE_NORMAL.left;
    const perp = { x: -normal.y, y: normal.x };
    const tip = { x: point.x - normal.x * 1, y: point.y - normal.y * 1 };
    const base = { x: point.x + normal.x * 7, y: point.y + normal.y * 7 };
    const left = { x: base.x + perp.x * 3.2, y: base.y + perp.y * 3.2 };
    const right = { x: base.x - perp.x * 3.2, y: base.y - perp.y * 3.2 };
    return "M " + tip.x + " " + tip.y + " L " + left.x + " " + left.y + " L " + right.x + " " + right.y + " Z";
  }
  function linkPath(from, to, fromSide, toSide) {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const bend = Math.max(36, Math.min(140, distance * 0.42));
    const fromNormal = EDGE_NORMAL[fromSide] || EDGE_NORMAL.right;
    const toNormal = EDGE_NORMAL[toSide] || EDGE_NORMAL.left;
    const c1 = { x: from.x + fromNormal.x * bend, y: from.y + fromNormal.y * bend };
    const c2 = { x: to.x + toNormal.x * bend, y: to.y + toNormal.y * bend };
    return "M " + from.x + " " + from.y + " C " + c1.x + " " + c1.y + ", " + c2.x + " " + c2.y + ", " + to.x + " " + to.y;
  }
  function renderPipelines() {
    while (linkLayer.firstChild) linkLayer.removeChild(linkLayer.firstChild);
    for (const card of state.cards) {
      for (const target of pipeTargets(card)) {
        const targetCard = cardOfPipeTarget(target);
        if (!targetCard || targetCard === card) continue;
        const fromSide = target.from || "right";
        const fromPoint = edgeAnchor(card, fromSide);
        const toSide = sideFacing(fromPoint, targetCard);
        const d = linkPath(fromPoint, edgeAnchor(targetCard, toSide), fromSide, toSide);
        const hit = document.createElementNS(SVG_NS, "path");
        hit.setAttribute("d", d);
        hit.setAttribute("class", "iwb-link-hit");
        hit.addEventListener("pointerdown", (event) => {
          event.stopPropagation();
          openPipeMenu(card, target, event.currentTarget);
        });
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        const edgeKey = card.sessionId + "=>" + (target.kind === "note" ? "note" : "session") + ":" + target.id;
        const latest = flow.latestByEdge().get(edgeKey);
        const flowStatus = latest?.status || "waiting";
        path.setAttribute("class", "iwb-link iwb-link-" + flowStatus + (card.running ? " iwb-link-active" : ""));
        path.setAttribute("data-flow-status", flowStatus);
        path.setAttribute("data-edge-key", edgeKey);
        if (latest?.message) {
          const title = document.createElementNS(SVG_NS, "title");
          title.textContent = latest.message + (latest.at ? " \xB7 " + new Date(latest.at).toLocaleString() : "");
          path.appendChild(title);
        }
        if (target.mode === "draft") path.setAttribute("stroke-dasharray", "4 4");
        const arrow = document.createElementNS(SVG_NS, "path");
        arrow.setAttribute("d", arrowPath(edgeAnchor(targetCard, toSide), toSide));
        arrow.setAttribute("class", "iwb-link-arrow");
        linkLayer.append(hit, path, arrow);
      }
    }
  }
  let pipelineFrame = 0;
  function schedulePipelines() {
    if (pipelineFrame) return;
    pipelineFrame = requestAnimationFrame(() => {
      pipelineFrame = 0;
      renderPipelines();
    });
  }
  function bindPort(card) {
    const ports = [...card.el.querySelectorAll(".iwb-port")];
    for (const port of ports) bindOnePort(card, port);
  }
  function bindOnePort(card, port) {
    port.setAttribute("title", t2("pipe.port"));
    port.setAttribute("aria-label", t2("pipe.port"));
    port.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const canvasRect = canvas.getBoundingClientRect();
      const point = (clientX, clientY) => ({
        x: (clientX - canvasRect.left - state.pan.x) / state.zoom,
        y: (clientY - canvasRect.top - state.pan.y) / state.zoom
      });
      const fromSide = port.dataset.side || "right";
      const fromPoint = edgeAnchor(card, fromSide);
      const temp = document.createElementNS(SVG_NS, "path");
      temp.setAttribute("class", "iwb-link-temp");
      linkLayer.appendChild(temp);
      let hovered = null;
      const draw = (clientX, clientY) => {
        const to = point(clientX, clientY);
        temp.setAttribute("d", linkPath(fromPoint, to, fromSide, sideFacing(fromPoint, { x: to.x, y: to.y, w: 0, h: 0 })));
      };
      draw(event.clientX, event.clientY);
      try {
        port.setPointerCapture?.(event.pointerId);
      } catch {
      }
      const onMove = (moveEvent) => {
        draw(moveEvent.clientX, moveEvent.clientY);
        const under = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
        const candidate = under?.closest?.(".iwb-card");
        const targetCard = candidate ? state.cards.find((entry) => entry.el === candidate) : null;
        const usable = targetCard && targetCard !== card && (targetCard.sessionId || targetCard.kind === "note" && targetCard.id);
        if (hovered && hovered !== targetCard) hovered.el.classList.remove("iwb-link-target");
        hovered = usable ? targetCard : null;
        if (hovered) hovered.el.classList.add("iwb-link-target");
      };
      const finish = (upEvent) => {
        try {
          port.releasePointerCapture?.(event.pointerId);
        } catch {
        }
        port.removeEventListener("pointermove", onMove);
        port.removeEventListener("pointerup", finish);
        port.removeEventListener("pointercancel", cancel);
        temp.remove();
        if (hovered) {
          hovered.el.classList.remove("iwb-link-target");
          const created = addPipeTarget(card, hovered, fromSide);
          renderPipeBadge(card);
          schedulePipelines();
          saveSoon();
          toast(
            created ? t2("pipe.created").replace("{name}", hovered.title || t2("untitled")) : t2("pipe.already").replace("{name}", hovered.title || t2("untitled"))
          );
        } else if (upEvent) {
          toast(t2("pipe.needTarget"));
        }
        hovered = null;
      };
      const cancel = () => finish(null);
      port.addEventListener("pointermove", onMove);
      port.addEventListener("pointerup", finish);
      port.addEventListener("pointercancel", cancel);
    });
  }
  function renderPipeBadge(card) {
    const badge = card.el?.querySelector(".iwb-pipe-badge");
    if (!badge) return;
    const targets = pipeTargets(card).filter((target) => cardOfPipeTarget(target));
    badge.hidden = !targets.length;
    if (!targets.length) return;
    if (targets.length === 1) {
      badge.textContent = t2("pipe.active").replace("{name}", pipeTargetLabel(targets[0]));
      badge.title = targets[0].mode === "draft" ? t2("pipe.draft") : t2("pipe.send");
      return;
    }
    badge.textContent = t2("pipe.multi").replace("{n}", String(targets.length));
    badge.title = targets.map((target) => pipeTargetLabel(target)).join(" \xB7 ");
  }
  function lastAssistantText(card) {
    const items = card.view?.items || [];
    for (let index = items.length - 1; index >= 0; index -= 1) {
      const item = items[index];
      if (item.k === "assistant" && item.text && item.text.trim()) return item.text.trim();
    }
    return "";
  }
  let morePop = null;
  function closeMoreMenu() {
    morePop?.remove();
    morePop = null;
  }
  function openMoreMenu(card, anchor) {
    if (morePop) {
      closeMoreMenu();
      return;
    }
    const pop = el("div", "iwb-popover iwb-more");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("card.more"));
    const rows = [
      { act: "pin", label: card.pinned ? t2("card.unpin") : t2("card.pin"), icon: "pin" },
      { act: "copy", label: t2("card.copy"), icon: "copy" },
      { act: "open", label: t2("openNative"), icon: "open" }
    ];
    if (card.stackId) rows.push({ act: "detach", label: t2("detach"), icon: "layers" });
    for (const row of rows) {
      const button = el("button", "iwb-model-row");
      button.type = "button";
      button.innerHTML = '<span class="iwb-more-ico">' + icon(row.icon, 13) + '</span><span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      button.querySelector(".iwb-model-name").textContent = row.label;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        closeMoreMenu();
        card.el.querySelector('.iwb-acts-more [data-act="' + row.act + '"]')?.click();
      });
      pop.appendChild(button);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left - 120, window.innerWidth - 200))) + "px";
    pop.style.top = Math.round(rect.bottom + 6) + "px";
    document.body.appendChild(pop);
    morePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + "px";
    }
  }
  function alreadyDelivered(card, target, fingerprint) {
    const edgeKey = card.sessionId + "=>" + (target.kind === "note" ? "note" : "session") + ":" + target.id;
    const latest = flow.latestByEdge().get(edgeKey);
    return latest?.fingerprint === fingerprint && (latest.status === "delivered" || latest.status === "drafted");
  }
  function maybeDeliverCompleted(card) {
    if (card.running || card.kind === "note") return;
    const text4 = lastAssistantText(card);
    if (!text4) return;
    const fingerprint = pipelineFingerprint(text4);
    if (card.catchUpFingerprint === fingerprint || card.deliveringFingerprint === fingerprint) return;
    if (Number(card.retryAfter || 0) > Date.now()) return;
    const pending = pipeTargets(card).some((target) => (card.pipedFingerprints || {})[target.kind + ":" + target.id] !== fingerprint && !alreadyDelivered(card, target, fingerprint));
    if (!pending) return;
    card.catchUpFingerprint = fingerprint;
    setTimeout(() => {
      if (!disposed && !card.running) void deliverPipeline(card);
    }, 0);
  }
  async function deliverPipeline(card) {
    const targets = pipeTargets(card);
    if (!targets.length) return;
    const text4 = lastAssistantText(card);
    if (!text4) return;
    const fingerprint = pipelineFingerprint(text4);
    if (card.deliveringFingerprint === fingerprint) return;
    card.deliveringFingerprint = fingerprint;
    card.pipedFingerprints = card.pipedFingerprints || {};
    const depth = (card.pipeDepth || 0) + 1;
    if (depth > 16) {
      toast(t2("pipe.tooLong"));
      return;
    }
    let hadFailure = false;
    try {
      for (const target of targets) {
        const key = target.kind + ":" + target.id;
        if (card.pipedFingerprints[key] === fingerprint || alreadyDelivered(card, target, fingerprint)) {
          card.pipedFingerprints[key] = fingerprint;
          continue;
        }
        const targetCard = cardOfPipeTarget(target);
        if (target.kind === "note") {
          if (!targetCard) continue;
          const area = targetCard.el?.querySelector(".iwb-note-input");
          if (!area) continue;
          const block = t2("pipe.noteBlock").replace("{title}", card.title || t2("untitled")).replace("{time}", canvasStamp()).replace("{text}", text4);
          const replace = target.write === "replace";
          area.value = replace ? block : area.value.trim() ? area.value.replace(/\s*$/, "\n\n") + block : block;
          area.dispatchEvent(new Event("input", { bubbles: true }));
          targetCard.pipeDepth = depth;
          card.pipedFingerprints[key] = fingerprint;
          recordFlow(card, target, "delivered", { fingerprint, message: "\u7ED3\u679C\u5DF2\u5199\u5165\u4FBF\u7B7E" });
          ensureVisible(targetCard);
          toast(t2(replace ? "pipe.notedReplaced" : "pipe.noted").replace("{name}", targetCard.title || t2("untitled")));
          continue;
        }
        if (target.mode === "draft") {
          const field = targetCard?.el?.querySelector(".iwb-foot textarea");
          if (!field) continue;
          field.value = field.value ? field.value.replace(/\s*$/, "\n\n") + text4 : text4;
          field.dispatchEvent(new Event("input", { bubbles: true }));
          ensureVisible(targetCard);
          targetCard.pipeDepth = depth;
          card.pipedFingerprints[key] = fingerprint;
          recordFlow(card, target, "drafted", { fingerprint, message: "\u5DF2\u751F\u6210\u8349\u7A3F\uFF0C\u7B49\u5F85\u7528\u6237\u53D1\u9001" });
          toast(t2("pipe.drafted").replace("{name}", pipeTargetLabel(target)));
          continue;
        }
        try {
          recordFlow(card, target, "delivering", { fingerprint, message: "\u6B63\u5728\u6295\u9012\u5230\u76EE\u6807\u4F1A\u8BDD" });
          if (adapter.waitForReady) await adapter.waitForReady(target.id, { timeoutMs: 15e3 });
          await adapter.prompt(target.id, text4, "queue");
          card.pipedFingerprints[key] = fingerprint;
          if (targetCard) targetCard.pipeDepth = depth;
          recordFlow(card, target, "delivered", { fingerprint, message: "\u5DF2\u53D1\u9001\u5230\u76EE\u6807\u4F1A\u8BDD" });
          toast(t2("pipe.sent").replace("{name}", pipeTargetLabel(target)));
        } catch (error) {
          hadFailure = true;
          recordFlow(card, target, "failed", { fingerprint, message: error?.message || "\u6295\u9012\u5931\u8D25" });
          toast(t2("pipe.failed").replace("{error}", error?.message || ""));
        }
      }
    } finally {
      if (card.deliveringFingerprint === fingerprint) card.deliveringFingerprint = null;
      if (hadFailure) {
        card.catchUpFingerprint = null;
        card.retryAfter = Date.now() + 5e3;
      } else {
        card.retryAfter = 0;
      }
    }
  }
  function openPipeMenu(card, target, anchor) {
    if (pipePop) {
      closePipeMenu();
      return;
    }
    if (!target) return;
    const targetCard = cardOfPipeTarget(target);
    const label = pipeTargetLabel(target);
    const isNote = target.kind === "note";
    const pop = el("div", "iwb-popover iwb-link-menu");
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", t2("pipe.title"));
    const head = el("div", "iwb-popover-head");
    head.textContent = isNote ? t2("pipe.noteTarget") : t2("pipe.title");
    const status = el("div", "iwb-popover-note");
    status.textContent = t2("pipe.linked").replace("{name}", label);
    pop.append(head, status);
    if (!isNote) {
      const mode = target.mode === "draft" ? "draft" : "send";
      const modes = [
        { id: "send", label: t2("pipe.send"), hint: t2("pipe.sendHint") },
        { id: "draft", label: t2("pipe.draft"), hint: t2("pipe.draftHint") }
      ];
      for (const option of modes) {
        const row = el("button", "iwb-model-row" + (mode === option.id ? " current" : ""));
        row.type = "button";
        row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>' + (mode === option.id ? '<span class="iwb-check">\u2713</span>' : "");
        row.querySelector(".iwb-model-name").textContent = option.label;
        row.querySelector(".iwb-model-desc").textContent = option.hint;
        row.addEventListener("click", (event) => {
          event.stopPropagation();
          const targets = pipeTargets(card).map(
            (entry) => entry.kind === target.kind && entry.id === target.id ? { ...entry, mode: option.id } : entry
          );
          setPipeTargets(card, targets);
          renderPipeBadge(card);
          schedulePipelines();
          saveSoon();
          closePipeMenu();
          toast(option.id === "draft" ? t2("pipe.modeDraft") : t2("pipe.modeSend"));
        });
        pop.appendChild(row);
      }
    } else {
      const write = target.write === "replace" ? "replace" : "append";
      const writes = [
        { id: "append", label: t2("pipe.noteAppend"), hint: t2("pipe.noteAppendHint") },
        { id: "replace", label: t2("pipe.noteReplace"), hint: t2("pipe.noteReplaceHint") }
      ];
      for (const option of writes) {
        const row = el("button", "iwb-model-row" + (write === option.id ? " current" : ""));
        row.type = "button";
        row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>' + (write === option.id ? '<span class="iwb-check">\u2713</span>' : "");
        row.querySelector(".iwb-model-name").textContent = option.label;
        row.querySelector(".iwb-model-desc").textContent = option.hint;
        row.addEventListener("click", (event) => {
          event.stopPropagation();
          const targets = pipeTargets(card).map(
            (entry) => entry.kind === target.kind && entry.id === target.id ? { ...entry, write: option.id } : entry
          );
          setPipeTargets(card, targets);
          renderPipeBadge(card);
          schedulePipelines();
          saveSoon();
          closePipeMenu();
          toast(option.id === "replace" ? t2("pipe.modeReplace") : t2("pipe.modeAppend"));
        });
        pop.appendChild(row);
      }
    }
    const remove = el("button", "iwb-model-row iwb-link-remove");
    remove.type = "button";
    remove.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
    remove.querySelector(".iwb-model-name").textContent = isNote ? t2("pipe.removeNote") : t2("pipe.remove");
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      setPipeTargets(
        card,
        pipeTargets(card).filter((entry) => !(entry.kind === target.kind && entry.id === target.id))
      );
      renderPipeBadge(card);
      schedulePipelines();
      saveSoon();
      closePipeMenu();
      toast(t2("pipe.removed"));
      if (targetCard) ensureVisible(targetCard);
    });
    pop.appendChild(remove);
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left + rect.width / 2 - 110, window.innerWidth - 240))) + "px";
    pop.style.top = Math.round(rect.top + rect.height + 8) + "px";
    document.body.appendChild(pop);
    pipePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 8)) + "px";
    }
  }
  function syncApprovalSessions() {
    approvals?.setOpenSessions?.(
      state.cards.filter((card) => card.kind !== "note" && card.sessionId).map((card) => card.sessionId)
    );
  }
  function removeCard(card) {
    if (card.stackId) detachFromStack(card, true);
    try {
      card.detach?.();
    } catch {
    }
    if (card.kind === "file") void fileStore.remove(card.fileId);
    card.el.remove();
    try {
      card.detachApprovals?.();
    } catch {
    }
    state.cards = state.cards.filter((c) => c !== card);
    const goneId = card.kind === "note" ? card.id : card.sessionId;
    const goneKind = card.kind === "note" ? "note" : "session";
    for (const other of state.cards) {
      const targets = pipeTargets(other);
      const kept = targets.filter((target) => !(target.kind === goneKind && target.id === goneId));
      if (kept.length !== targets.length) {
        setPipeTargets(other, kept);
        renderPipeBadge(other);
      }
    }
    renderPipelines();
    if (state.selected.delete(card.id)) renderBatchBar();
    if (state.focusedId === card.id) {
      state.focusedId = null;
      const next = cardOrder()[0];
      if (next) focusCard(next, { announce: false });
      else canvas.focus();
    }
    dirty.delete(card);
    const pendingApprovals = approvals?.list?.(card.sessionId) || [];
    for (const pending of pendingApprovals) {
      approvals.settle(pending.id, approvals.OUTCOME_CANCELLED);
    }
    if (pendingApprovals.length) toast(t2("card.approvalCancelled"));
    syncApprovalSessions();
    updateCounts();
    updateEmptyState();
    saveSoon();
  }
  function markDirty(card) {
    hydratePending = false;
    if (disposed) return;
    dirty.add(card);
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const pending = [...dirty];
      dirty.clear();
      for (const item of pending) {
        if (!item.el?.isConnected) continue;
        renderCard(item);
      }
      updateCounts();
      updateTodoBar();
    });
  }
  async function autoAnswerQuestions(card) {
    if (!card.autoTask || card.autoAnswering || !adapter.answerQuestion) return;
    const questions = card.view?.questions || [];
    if (!questions.length) return;
    card.autoAnswering = true;
    try {
      for (const question of questions) {
        const answers = (question.items || []).map((item) => ({
          id: item.id,
          selected: item.options?.[0]?.label ? [item.options[0].label] : [],
          custom: "\u6309\u5F53\u524D\u76EE\u6807\u7EE7\u7EED\uFF0C\u76F4\u63A5\u8F93\u51FA\u672C\u8282\u70B9\u7ED3\u8BBA\uFF0C\u4E0D\u6267\u884C\u7834\u574F\u6027\u64CD\u4F5C\u3002"
        }));
        await adapter.answerQuestion(card.sessionId, question.callId, answers);
      }
    } catch {
    } finally {
      card.autoAnswering = false;
    }
  }
  function renderCard(card) {
    if (card.kind === "note" || card.kind === "file") return;
    let view;
    try {
      view = adapter.read(card.sessionId);
    } catch {
      view = { ready: true, running: false, items: [{ k: "error", text: t2("error.read") }], hasMore: false, loadingOlder: false, model: "" };
    }
    const wasRunning = card.running;
    if (view.running) card.activityAt = Date.now();
    else {
      const lastEnd = (view.items || []).reduce((latest, item) => item.k === "turnProcess" && item.endTime > latest ? item.endTime : latest, 0);
      if (lastEnd > (card.activityAt || 0)) card.activityAt = lastEnd;
    }
    card.running = Boolean(view.running);
    card.model = view.model || card.model;
    const pendingApproval = approvals?.list?.(card.sessionId)?.length || 0;
    const waiting = pendingApproval ? "approval" : view.waiting || null;
    const queued = Number(view.queued) || 0;
    card.waiting = waiting;
    card.queued = queued;
    const dot = card.el.querySelector(".iwb-dot");
    dot.className = "iwb-dot" + (waiting ? " waiting" : card.running ? " running" : view.items.some((i) => i.k === "error") ? " error" : view.ready ? " done" : "");
    dot.title = waiting ? t2("status.waiting" + (waiting === "approval" ? "Approval" : "Answer")) : card.running ? t2("state.running") : t2("state.idle");
    const statusNode = card.el.querySelector(".iwb-status");
    if (statusNode) {
      if (waiting) {
        statusNode.textContent = t2(waiting === "approval" ? "status.waitingApproval" : "status.waitingAnswer");
        statusNode.className = "iwb-status warning";
        statusNode.hidden = false;
      } else if (queued > 0) {
        statusNode.textContent = t2("status.queued").replace("{n}", String(queued));
        statusNode.className = "iwb-status";
        statusNode.hidden = false;
      } else {
        statusNode.hidden = true;
      }
    }
    card.el.classList.toggle("iwb-running", card.running);
    try {
      const title = adapter.titleOf(card.sessionId);
      if (title && title !== card.title) {
        card.title = title;
        const titleNode2 = card.el.querySelector(".iwb-card-title");
        if (titleNode2) {
          titleNode2.textContent = title;
          titleNode2.title = title;
        }
        card.el.setAttribute("aria-label", title);
      }
    } catch {
    }
    const meta = card.el.querySelector(".iwb-meta");
    if (meta) {
      meta.textContent = card.model || "";
      meta.title = card.model ? t2("model.switch") : "";
      meta.disabled = !(adapter.hasModelPicker?.() ?? false);
    }
    const workspaceChip = card.el.querySelector(".iwb-card-workspace");
    if (workspaceChip) {
      if (!card.workspace) {
        const found = adapter.workspaceOf?.(card.sessionId);
        if (found) card.workspace = found.title || "";
      }
      if (card.workspace && card.workspace.trim() !== String(card.title || "").trim()) {
        workspaceChip.textContent = card.workspace;
        workspaceChip.hidden = false;
        workspaceChip.title = t2("workspace.label") + " " + card.workspace;
      } else {
        workspaceChip.hidden = true;
      }
    }
    card.el.querySelector(".iwb-elapsed").textContent = card.running && card.startedAt ? formatElapsed(Date.now() - card.startedAt) : "";
    if (card.running && !card.startedAt) card.startedAt = Date.now();
    if (!card.running) {
      card.startedAt = 0;
      card.el.querySelector(".iwb-elapsed").textContent = "";
    }
    const assistantCount = view.items.filter((item) => item.k === "assistant").length;
    const lastSignature = card.assistantSignature || 0;
    if (assistantCount > lastSignature && !card.hovered && !card.active) {
      card.unread = true;
    }
    card.assistantSignature = assistantCount;
    const unreadDot = card.el.querySelector(".iwb-unread");
    if (unreadDot) unreadDot.hidden = !card.unread;
    renderBody(card, view);
    renderQueue(card, view);
    if (!card.running) maybeDeliverCompleted(card);
    if (card.waiting === "question") void autoAnswerQuestions(card);
    taskController?.noteSessionRuntime(card);
    if (wasRunning !== card.running) {
      renderFoot(card);
      if (wasRunning && !card.running) void deliverPipeline(card);
      if (state.board.active && state.board.key === "status") {
        clearTimeout(kanbanTimer);
        kanbanTimer = setTimeout(() => {
          if (state.board.active && state.board.key === "status") applyKanban();
        }, 400);
      }
    }
  }
  function renderQueue(card, view) {
    const box = card.el.querySelector(".iwb-queue");
    if (!box) return;
    const items = Array.isArray(view.queueItems) ? view.queueItems : [];
    box.textContent = "";
    if (!items.length) {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    const head = el("div", "iwb-queue-head");
    head.textContent = t2("queue.count").replace("{n}", String(items.length));
    box.appendChild(head);
    for (const item of items) {
      const row = el("div", "iwb-queue-row");
      const text4 = el("div", "iwb-queue-text");
      text4.textContent = item.text || (item.attachments ? t2("queue.attachment") : "");
      text4.title = item.text || "";
      const remove = el("button", "iwb-queue-remove");
      remove.type = "button";
      remove.title = t2("queue.remove");
      remove.setAttribute("aria-label", t2("queue.remove"));
      remove.innerHTML = icon("close", 11);
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        remove.disabled = true;
        try {
          await adapter.removeQueued(card.sessionId, item.id);
          markDirty(card);
        } catch (error) {
          remove.disabled = false;
          toast(error?.message || t2("queue.removeFailed"));
        }
      });
      const steer = el("button", "iwb-queue-remove iwb-queue-steer");
      steer.type = "button";
      steer.title = view.running ? t2("queue.steer") : t2("queue.steerUnavailable");
      steer.setAttribute("aria-label", t2("queue.steer"));
      steer.innerHTML = icon("send", 11);
      steer.disabled = !view.running;
      steer.addEventListener("click", async (event) => {
        event.stopPropagation();
        steer.disabled = true;
        try {
          await adapter.steerQueued(card.sessionId, item.id);
          markDirty(card);
        } catch (error) {
          steer.disabled = false;
          toast(error?.message || t2("queue.steerFailed"));
        }
      });
      row.append(text4, steer, remove);
      box.appendChild(row);
    }
  }
  function bodySignature(card, view) {
    const items = (view.items || []).map((item) => item.k + ":" + (item.turn ?? "") + ":" + (item.text || "").length + ":" + (item.steps || []).length);
    return [
      items.join("|"),
      view.running ? "r" : "i",
      view.ready ? "y" : "n",
      (view.questions || []).length,
      (view.approvals || []).length,
      (view.queueItems || []).length,
      view.model || "",
      card.signatureBust || 0
    ].join("#");
  }
  function renderBody(card, view) {
    card.view = view;
    const body = card.el.querySelector(".iwb-body");
    const signature = bodySignature(card, view);
    if (card.renderedSignature === signature && body.childElementCount) return;
    card.renderedSignature = signature;
    const scrollTop = body.scrollTop;
    const previousHeight = body.scrollHeight;
    const previousFirst = body.firstElementChild?.textContent?.slice(0, 48) || "";
    const nearBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 80;
    body.textContent = "";
    if (view.truncated) {
      const cut = el("div", "iwb-truncated");
      cut.textContent = t2("transcript.truncated").replace("{n}", "400");
      body.appendChild(cut);
    }
    if (view.hasMore) {
      const more = el("button", "iwb-btn", t2("loadOlder"));
      more.type = "button";
      more.style.alignSelf = "center";
      more.style.height = "24px";
      more.style.fontSize = "11px";
      if (view.loadingOlder) more.disabled = true;
      more.addEventListener("click", () => {
        adapter.loadOlder(card.sessionId).catch(() => {
        });
      });
      body.appendChild(more);
    }
    const pending = (view.questions?.length || 0) + (view.approvals?.length || 0);
    if (!view.items.length && !pending) {
      const hintNode = el("div", "iwb-empty-sub");
      hintNode.textContent = view.ready ? t2("empty.card") : t2("empty.loading");
      hintNode.style.alignSelf = "center";
      hintNode.style.marginTop = "12px";
      body.appendChild(hintNode);
      return;
    }
    for (const item of view.items) {
      const node = itemNode(card, item);
      if (node) body.appendChild(node);
    }
    for (const question of view.questions || []) body.appendChild(questionNode(card, question));
    if (view.approvals?.length) body.appendChild(approvalNode(card, view.approvals));
    const liveApproval = liveApprovalNode(card);
    if (liveApproval) body.appendChild(liveApproval);
    const searchBar = card.el.querySelector(".iwb-search");
    const searchTerm = searchBar && !searchBar.hidden ? searchBar.querySelector("input")?.value.trim() : "";
    if (searchTerm) {
      const hits = [];
      highlight(body, searchTerm, hits);
      card.searchHits = hits;
    }
    const currentFirst = body.firstElementChild?.textContent?.slice(0, 48) || "";
    if (nearBottom) body.scrollTop = body.scrollHeight;
    else if (previousFirst && currentFirst !== previousFirst) body.scrollTop = Math.max(0, scrollTop + (body.scrollHeight - previousHeight));
    else body.scrollTop = scrollTop;
  }
  function addFiles(card, fileList) {
    const files = [...fileList || []].filter(Boolean);
    if (!files.length) return;
    if (!(adapter.hasAttachments?.() ?? false)) {
      toast(t2("attach.unsupported"));
      return;
    }
    try {
      const drafts = adapter.createDrafts(card.sessionId, files) || [];
      card.attachments = [...card.attachments || [], ...drafts];
      renderFoot(card);
    } catch (error) {
      toast(error?.message || t2("attach.failed"));
    }
  }
  function renderFoot(card) {
    const foot = card.el.querySelector(".iwb-foot");
    const active = document.activeElement;
    const hadFocus = Boolean(active && foot.contains(active) && active.tagName === "TEXTAREA");
    const caret = hadFocus ? active.selectionStart : null;
    const caretEnd = hadFocus ? active.selectionEnd : null;
    const draft = card.composerDraft || "";
    const attachments = card.attachments || [];
    foot.textContent = "";
    const wrapper = el("div", "iwb-composer-wrap");
    if (attachments.length) {
      const row = el("div", "iwb-attachments");
      for (const attachment of attachments) row.appendChild(attachmentChip(card, attachment));
      wrapper.appendChild(row);
    }
    const composer = el("div", "iwb-composer");
    const attach = el("button", "iwb-attach");
    attach.type = "button";
    attach.title = t2("attach.button");
    attach.setAttribute("aria-label", t2("attach.button"));
    attach.innerHTML = icon("clip", 14);
    attach.disabled = !(adapter.hasAttachments?.() ?? false);
    const textarea = el("textarea");
    textarea.rows = 1;
    textarea.value = draft;
    textarea.placeholder = card.running ? t2("composer.busy") : t2("composer.idle");
    textarea.setAttribute("aria-label", t2("composer.label"));
    if (card.running) textarea.title = t2("composer.steerHint");
    const ready = attachments.every((attachment) => (adapter.uploadSnapshots?.()[attachment.id]?.status || "ready") === "ready");
    const send = el(
      "button",
      "iwb-send" + (card.running ? " stop" : (draft.trim() || attachments.length) && ready ? " ready" : ""),
      icon(card.running ? "stop" : "send", 13)
    );
    send.type = "button";
    send.setAttribute("aria-label", card.running ? t2("stop") : t2("send"));
    composer.append(attach, textarea, send);
    wrapper.appendChild(composer);
    foot.appendChild(wrapper);
    const picker = document.createElement("input");
    picker.type = "file";
    picker.multiple = true;
    picker.hidden = true;
    picker.addEventListener("change", () => {
      addFiles(card, picker.files);
      picker.value = "";
    });
    wrapper.appendChild(picker);
    attach.addEventListener("click", (event) => {
      event.stopPropagation();
      picker.click();
    });
    const sync = () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 88) + "px";
      const allReady = attachments.every((attachment) => (adapter.uploadSnapshots?.()[attachment.id]?.status || "ready") === "ready");
      const canSend = textarea.value.trim().length > 0 || attachments.length > 0;
      send.classList.toggle("ready", !card.running && canSend && allReady);
    };
    textarea.addEventListener("input", () => {
      card.composerDraft = textarea.value;
      sync();
    });
    textarea.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
      event.preventDefault();
      void submit(card, textarea, event.metaKey || event.ctrlKey ? "steer" : "queue");
    });
    textarea.addEventListener("paste", (event) => {
      const files = [...event.clipboardData?.files || []];
      if (!files.length) return;
      event.preventDefault();
      addFiles(card, files);
    });
    send.addEventListener("click", () => {
      if (card.running) void stop(card);
      else void submit(card, textarea, "queue");
    });
    sync();
    if (hadFocus) {
      textarea.focus();
      if (caret !== null) {
        try {
          textarea.setSelectionRange(caret, caretEnd ?? caret);
        } catch {
        }
      }
    }
  }
  async function submit(card, textarea, mode) {
    const text4 = textarea.value.trim();
    const attachments = [...card.attachments || []];
    if (!text4 && !attachments.length) return;
    const uploads = adapter.uploadSnapshots?.() || {};
    const pendingUpload = attachments.find((attachment) => (uploads[attachment.id]?.status || "ready") !== "ready");
    if (pendingUpload) {
      toast(t2("attach.uploading"));
      return;
    }
    card.composerDraft = "";
    textarea.value = "";
    textarea.style.height = "auto";
    try {
      if (attachments.length) {
        await adapter.sendWithAttachments(card.sessionId, text4, attachments.map((attachment) => attachment.id), mode);
        adapter.releaseDrafts?.(attachments.map((attachment) => attachment.id));
      } else {
        await adapter.prompt(card.sessionId, text4, mode);
      }
      card.attachments = [];
      card.startedAt = Date.now();
      renderFoot(card);
    } catch (error) {
      card.composerDraft = text4;
      card.attachments = attachments;
      renderFoot(card);
      toast(error?.message || t2("error.send"));
      markDirty(card);
    }
  }
  async function stop(card) {
    try {
      await adapter.cancel(card.sessionId);
    } catch {
      toast(t2("error.stop"));
    }
    markDirty(card);
  }
  function bindCard(card) {
    const node = card.el;
    node.setAttribute("aria-label", card.title || t2("untitled"));
    node.addEventListener("focus", () => {
      for (const other of state.cards) {
        if (other === card) continue;
        other.el.tabIndex = -1;
        other.el.classList.remove("iwb-focus");
        other.el.removeAttribute("aria-current");
      }
      node.tabIndex = 0;
      node.classList.add("iwb-focus");
      node.setAttribute("aria-current", "true");
      state.focusedId = card.id;
    });
    node.addEventListener("blur", () => {
      node.classList.remove("iwb-focus");
    });
    node.addEventListener("keydown", (event) => {
      const target = event.target;
      const typing = target instanceof HTMLElement && target.matches('input, textarea, [contenteditable="true"]');
      if (typing) {
        if (event.key === "Escape") {
          event.preventDefault();
          target.blur();
          node.focus();
        }
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      const step = arrows[event.key];
      if (step) {
        event.preventDefault();
        if (event.shiftKey) nudgeCard(card, step[0], step[1]);
        else moveFocus(event.key.slice(5).toLowerCase());
        return;
      }
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (card.kind === "note") {
            if (card.viewMode !== "source") {
              card.viewMode = "source";
              noteBody(card);
              saveSoon();
            }
            node.querySelector(".iwb-note-input")?.focus();
          } else node.querySelector(".iwb-foot textarea")?.focus();
          break;
        case "Escape":
          event.preventDefault();
          skipCanvasAutofocus = true;
          canvas.focus();
          break;
        case "o":
        case "O":
          event.preventDefault();
          if (card.kind !== "note") onOpenSession?.(card.sessionId);
          break;
        case "p":
        case "P":
          event.preventDefault();
          node.querySelector('[data-act="pin"]')?.click();
          break;
        case "c":
        case "C":
          event.preventDefault();
          node.querySelector('[data-act="copy"]')?.click();
          break;
        case "/":
          event.preventDefault();
          openSearch(card);
          break;
        case "t":
        case "T":
          event.preventDefault();
          node.querySelector('[data-act="outline"]')?.click();
          break;
        case "]":
          event.preventDefault();
          {
            const order = cardOrder();
            const index = order.indexOf(card);
            focusCard(order[(index + 1) % order.length]);
          }
          break;
        case "[":
          event.preventDefault();
          {
            const order = cardOrder();
            const index = order.indexOf(card);
            focusCard(order[(index - 1 + order.length) % order.length]);
          }
          break;
        default:
          break;
      }
    });
    node.addEventListener("pointerenter", () => {
      card.hovered = true;
      if (card.unread) {
        card.unread = false;
        const dot = card.el.querySelector(".iwb-unread");
        if (dot) dot.hidden = true;
        saveSoon();
      }
    });
    node.addEventListener("pointerleave", () => {
      card.hovered = false;
    });
    node.querySelector('[data-act="more"]')?.addEventListener("click", (event) => {
      event.stopPropagation();
      openMoreMenu(card, event.currentTarget);
    });
    node.querySelector('[data-act="pipe"]')?.addEventListener("click", (event) => {
      event.stopPropagation();
      openPipeMenu(card, event.currentTarget);
    });
    node.querySelector('[data-act="outline"]')?.addEventListener("click", (event) => {
      event.stopPropagation();
      openOutline(card, event.currentTarget);
    });
    node.querySelector('[data-act="search"]')?.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSearch(card);
    });
    const searchBar = node.querySelector(".iwb-search");
    const searchInput = searchBar?.querySelector(".iwb-search-input");
    if (searchInput) {
      let timer = 0;
      searchInput.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => runSearch(card, searchInput.value.trim()), 120);
      });
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          stepSearch(card, event.shiftKey ? -1 : 1);
        } else if (event.key === "Escape") {
          event.preventDefault();
          toggleSearch(card);
        }
        event.stopPropagation();
      });
      searchInput.placeholder = t2("search.placeholder");
    }
    node.querySelector('[data-act="pin"]')?.addEventListener("click", (event) => {
      event.stopPropagation();
      card.pinned = !card.pinned;
      card.el.classList.toggle("iwb-pinned", card.pinned);
      saveSoon();
      toast(card.pinned ? t2("card.pinned") : t2("card.unpinned"));
    });
    node.querySelector('[data-act="copy"]')?.addEventListener("click", (event) => {
      event.stopPropagation();
      void copyTranscript(card);
    });
    node.addEventListener("dragover", (event) => {
      if (!event.dataTransfer?.types?.includes("Files")) return;
      event.preventDefault();
      node.classList.add("iwb-drop");
    });
    node.addEventListener("dragleave", (event) => {
      if (event.target !== node) return;
      node.classList.remove("iwb-drop");
    });
    node.addEventListener("drop", (event) => {
      const files = [...event.dataTransfer?.files || []];
      node.classList.remove("iwb-drop");
      if (!files.length) return;
      event.preventDefault();
      event.stopPropagation();
      addFiles(card, files);
    });
    node.addEventListener("pointerdown", (event) => {
      if (event.metaKey || event.ctrlKey) {
        event.preventDefault();
        toggleSelect(card);
        return;
      }
      if (card.stackId) promoteInStack(card);
      else {
        state.zTop += 1;
        node.style.zIndex = state.zTop;
      }
    });
    const head = node.querySelector(".iwb-head");
    head.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey) {
        event.preventDefault();
        if (event.shiftKey && state.selected.size) {
          const order = cardOrder();
          const anchorIndex = order.findIndex((entry) => state.selected.has(entry.id));
          const targetIndex = order.indexOf(card);
          const [from, to] = anchorIndex < 0 ? [targetIndex, targetIndex] : [Math.min(anchorIndex, targetIndex), Math.max(anchorIndex, targetIndex)];
          for (let index = from; index <= to; index += 1) setSelected(order[index], true);
        } else {
          toggleSelect(card);
        }
        return;
      }
      clearSelection();
      event.preventDefault();
      const stack = stackOf(card);
      if (stack && stackTop(stack) !== card) promoteInStack(card);
      const movingStack = stackOf(card);
      const base = movingStack ? { x: movingStack.x, y: movingStack.y } : { x: card.x, y: card.y };
      const startX = event.clientX;
      const startY = event.clientY;
      let moved = false;
      modelMenu.close();
      settingsMenu.close();
      workspaceMenu.close();
      node.classList.add("iwb-dragging");
      interactionActive = true;
      head.setPointerCapture(event.pointerId);
      const move = (moveEvent) => {
        const dx = (moveEvent.clientX - startX) / state.zoom;
        const dy = (moveEvent.clientY - startY) / state.zoom;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
        const nx = Math.round((base.x + dx) / 8) * 8;
        const ny = Math.round((base.y + dy) / 8) * 8;
        if (movingStack) {
          movingStack.x = nx;
          movingStack.y = ny;
          layoutStack(movingStack);
        } else {
          card.x = nx;
          card.y = ny;
          node.style.left = nx + "px";
          node.style.top = ny + "px";
        }
        schedulePipelines();
      };
      const up = () => {
        interactionActive = false;
        node.classList.remove("iwb-dragging");
        head.releasePointerCapture?.(event.pointerId);
        head.removeEventListener("pointermove", move);
        head.removeEventListener("pointerup", up);
        head.removeEventListener("pointercancel", up);
        if (moved && !card.stackId) tryStack(card);
        if (moved) saveSoon();
      };
      head.addEventListener("pointermove", move);
      head.addEventListener("pointerup", up);
      head.addEventListener("pointercancel", up);
    });
    head.addEventListener("dblclick", (event) => {
      if (event.target.closest("button, input, textarea, a")) return;
      event.preventDefault();
      event.stopPropagation();
      if (card.kind === "note") {
        card.viewMode = card.viewMode === "source" ? "preview" : "source";
        noteBody(card);
        saveSoon();
      } else if (card.kind === "file") {
        void openStoredFile(card);
      } else {
        onOpenSession?.(card.sessionId);
      }
    });
    const grip = node.querySelector(".iwb-resize");
    grip.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startW = card.w;
      const startH = card.h;
      grip.setPointerCapture(event.pointerId);
      node.classList.add("iwb-dragging");
      const move = (moveEvent) => {
        card.w = clamp(Math.round((startW + (moveEvent.clientX - startX) / state.zoom) / 8) * 8, 320, 760);
        card.h = clamp(Math.round((startH + (moveEvent.clientY - startY) / state.zoom) / 8) * 8, 320, 960);
        node.style.width = card.w + "px";
        node.style.height = card.h + "px";
      };
      const up = () => {
        node.classList.remove("iwb-dragging");
        grip.releasePointerCapture?.(event.pointerId);
        grip.removeEventListener("pointermove", move);
        grip.removeEventListener("pointerup", up);
        saveSoon();
      };
      grip.addEventListener("pointermove", move);
      grip.addEventListener("pointerup", up);
    });
    const metaButton = node.querySelector(".iwb-meta");
    metaButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (metaButton.disabled) return;
      void modelMenu.open(card);
    });
    node.querySelector('[data-act="close"]')?.addEventListener("click", () => removeCard(card));
    node.querySelector('[data-act="detach"]').addEventListener("click", () => detachFromStack(card));
    node.querySelector('[data-act="open"]').addEventListener("click", () => onOpenSession?.(card.sessionId));
  }
  function updateCounts() {
    if (state.mode === "task") {
      const tasks = taskController?.snapshot().tasks || [];
      const actionable = tasks.filter((task) => ["needs_input", "blocked", "review"].includes(task.status)).length;
      countsNode.textContent = tasks.length + " \u9879\u4EFB\u52A1" + (actionable ? " \xB7 " + actionable + " \u9879\u5F85\u5904\u7406" : "");
      return;
    }
    const running = state.cards.filter((c) => c.running).length;
    const parts = [t2("count.cards").replace("{n}", String(state.cards.length))];
    if (running) parts.push(t2("count.running").replace("{n}", String(running)));
    countsNode.textContent = parts.join(" \xB7 ");
    updateTodoBar();
  }
  function updateEmptyState() {
    emptyState.style.display = state.cards.length ? "none" : "flex";
  }
  let saveTimer = 0;
  let suppressSave = false;
  function saveSoon() {
    localUpdatedAt = Date.now();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 220);
  }
  function save() {
    if (disposed || suppressSave) return;
    if (hydratePending) return;
    try {
      const payload = layoutPayload();
      localUpdatedAt = payload.updatedAt;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      scheduleActiveCanvasSave();
      if (!applyingRemote) {
        void pushRemoteLayout(payload, clientId).then((result) => {
          if (result?.rev) remoteRev = result.rev;
        });
      }
    } catch {
    }
  }
  async function restore() {
    if (restoreDone) return;
    restoreDone = true;
    let saved = null;
    try {
      saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      saved = null;
    }
    if (saved?.settings && typeof saved.settings === "object") {
      state.settings.inlineApprovals = Boolean(saved.settings.inlineApprovals);
    }
    approvals?.setEnabled?.(state.settings.inlineApprovals);
    if (!saved || !Array.isArray(saved.cards)) {
      hydratePending = true;
      syncApprovalSessions();
      void (async () => {
        const applied = await syncFromRemote();
        await loadCanvases();
        hydratePending = false;
        if (!applied && !saveTimer && state.cards.length) {
          save();
        }
        startRemoteSync();
      })();
      return false;
    }
    localUpdatedAt = Number(saved.updatedAt) || 0;
    state.savedView = typeof saved.zoom === "number";
    if (typeof saved.zoom === "number") state.zoom = clamp(saved.zoom, 0.3, 1.6);
    if (saved.pan && typeof saved.pan.x === "number") state.pan = { x: saved.pan.x, y: saved.pan.y };
    if (saved.board && saved.board.active) {
      state.board.active = true;
      state.board.key = saved.board.key || "status";
      btnBoard.classList.add("iwb-btn-active");
    }
    for (const card of saved.cards) {
      if (card?.kind === "note") {
        const note = addNote({ ...card });
        if (note && card.pinned) {
          note.pinned = true;
          note.el?.classList.add("iwb-pinned");
        }
        continue;
      }
      if (card?.kind === "file") {
        await addFileCard({ ...card, focus: false });
        continue;
      }
      if (!card?.sessionId) continue;
      addSession({
        sessionId: card.sessionId,
        title: card.title,
        workspace: card.workspace || "",
        x: card.x,
        y: card.y,
        w: card.w,
        h: card.h,
        pipeline: pipeTargets(card).length ? { targets: pipeTargets(card) } : null
      });
    }
    for (const stack of saved.stacks || []) {
      const members = (stack.order || []).map((sessionId) => state.cards.find((card) => card.sessionId === sessionId)).filter(Boolean);
      if (members.length < 2) continue;
      const model = { id: "st" + ++state.stackSeq, x: stack.x, y: stack.y, order: members.map((card) => card.id) };
      members.forEach((card) => {
        card.stackId = model.id;
      });
      state.stacks.push(model);
    }
    state.stacks.forEach(layoutStack);
    applyView();
    updateCounts();
    updateEmptyState();
    syncApprovalSessions();
    updateTodoBar();
    schedulePipelines();
    clearTimeout(saveTimer);
    saveTimer = 0;
    void syncFromRemote().then(() => startRemoteSync());
    void loadCanvases();
    return true;
  }
  function layoutPayload() {
    return {
      version: 1,
      updatedAt: Date.now(),
      zoom: state.zoom,
      board: { active: state.board.active, key: state.board.key },
      pan: state.pan,
      settings: { ...state.settings },
      cards: state.cards.map((card) => ({
        id: card.kind === "note" ? card.id : void 0,
        sessionId: card.sessionId,
        title: card.title,
        workspace: card.workspace || "",
        kind: card.kind || "session",
        note: card.note || "",
        viewMode: card.viewMode || "preview",
        fileId: card.fileId || "",
        type: card.type || "",
        size: Number(card.size) || 0,
        composerDraft: card.composerDraft || "",
        pinned: Boolean(card.pinned),
        pipeline: pipeTargets(card).length ? { targets: pipeTargets(card) } : null,
        x: card.x,
        y: card.y,
        w: card.w,
        h: card.h
      })),
      stacks: state.stacks.map((stack) => ({
        x: stack.x,
        y: stack.y,
        order: stackCards(stack).map((card) => card.sessionId || card.id)
      }))
    };
  }
  function exportLayout() {
    try {
      const blob = new Blob([JSON.stringify(layoutPayload(), null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "inspiration-workbench-layout.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
      toast(t2("settings.exported"));
    } catch (error) {
      toast(error?.message || t2("settings.exportFailed"));
    }
  }
  async function applyLayout(saved, options) {
    if (!saved || !Array.isArray(saved.cards)) throw new Error(t2("settings.importInvalid"));
    reset();
    if (typeof saved.zoom === "number") state.zoom = clamp(saved.zoom, 0.3, 1.6);
    if (saved.pan) state.pan = { x: saved.pan.x || 0, y: saved.pan.y || 0 };
    if (saved.settings) state.settings = { ...state.settings, ...saved.settings };
    for (const card of saved.cards) {
      if (card.kind === "note") {
        const note = addNote({ ...card });
        if (note && card.pinned) {
          note.pinned = true;
          note.el?.classList.add("iwb-pinned");
        }
      } else if (card?.kind === "file") {
        await addFileCard({ ...card, focus: false });
      } else if (card.sessionId) {
        addSession({ ...card });
      }
    }
    applyView();
    updateCounts();
    updateEmptyState();
    syncApprovalSessions();
    updateTodoBar();
    if (options?.toast) toast(options.toast);
  }
  async function importLayout(file) {
    try {
      const text4 = await file.text();
      applyLayout(JSON.parse(text4), { toast: t2("settings.imported") });
    } catch (error) {
      toast(error?.message || t2("settings.importFailed"));
    }
  }
  let interactionActive = false;
  let remoteRev = 0;
  let localUpdatedAt = 0;
  let hydratePending = false;
  let applyingRemote = false;
  let firstRemoteSync = true;
  const clientId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  async function syncFromRemote(options) {
    const remote = await fetchRemoteLayout();
    if (!remote || !remote.layout) return false;
    remoteRev = remote.rev;
    if (remote.updatedAt <= localUpdatedAt) return false;
    if (interactionActive) return false;
    if (saveTimer) return false;
    applyingRemote = true;
    suppressSave = true;
    clearTimeout(saveTimer);
    try {
      applyLayout(remote.layout, options);
      localUpdatedAt = remote.updatedAt;
      try {
        const cached = { ...remote.layout, updatedAt: remote.updatedAt };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
      } catch {
      }
      const message = firstRemoteSync ? t2("sync.restored") : t2("sync.applied");
      firstRemoteSync = false;
      if (options?.toast !== false) toast(message);
    } catch {
      return false;
    } finally {
      applyingRemote = false;
      suppressSave = false;
      clearTimeout(saveTimer);
    }
    return true;
  }
  function startRemoteSync() {
    const stop2 = subscribeRemoteLayout((rev, sourceId) => {
      if (rev === remoteRev) return;
      remoteRev = rev;
      if (sourceId && sourceId === clientId) return;
      void syncFromRemote();
    });
    if (stop2) stopRemoteSync = stop2;
  }
  let stopRemoteSync = null;
  function applySizePreset(preset) {
    for (const card of state.cards) {
      card.w = preset.w;
      card.h = preset.h;
      card.el.style.width = preset.w + "px";
      card.el.style.height = preset.h + "px";
    }
    state.stacks.forEach(layoutStack);
    saveSoon();
  }
  function reset() {
    state.cards.forEach((card) => {
      try {
        card.detach?.();
      } catch {
      }
      card.el.remove();
    });
    state.cards = [];
    state.stacks = [];
    if (pipelineFrame) cancelAnimationFrame(pipelineFrame);
    pipelineFrame = 0;
    renderPipelines();
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
    }
    updateCounts();
    updateEmptyState();
  }
  let panning = false;
  let panStart = null;
  let panOrigin = null;
  let skipCanvasAutofocus = false;
  canvas.addEventListener("focus", () => {
    if (skipCanvasAutofocus) {
      skipCanvasAutofocus = false;
      return;
    }
    if (!state.cards.length) return;
    const current = state.cards.find((card) => card.id === state.focusedId);
    focusCard(current || cardOrder()[0], { announce: false });
  });
  canvas.addEventListener("paste", (event) => {
    if (event.target.closest("textarea")) return;
    const files = [...event.clipboardData?.files || []];
    if (!files.length) return;
    event.preventDefault();
    for (const file of files) void addFileCard(file);
  });
  canvas.addEventListener("dragover", (event) => {
    if (event.dataTransfer?.types?.includes("Files")) event.preventDefault();
  });
  canvas.addEventListener("drop", (event) => {
    const files = [...event.dataTransfer?.files || []];
    if (!files.length) return;
    event.preventDefault();
    for (const file of files) void addFileCard(file);
  });
  canvas.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".iwb-card") || event.target.closest(".iwb-zoom")) return;
    if (event.button !== 0 && event.button !== 1) return;
    clearSelection();
    modelMenu.close();
    panning = true;
    panStart = { x: event.clientX, y: event.clientY };
    panOrigin = { ...state.pan };
    canvas.classList.add("panning");
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!panning) return;
    state.pan.x = panOrigin.x + (event.clientX - panStart.x);
    state.pan.y = panOrigin.y + (event.clientY - panStart.y);
    applyView();
  });
  const endPan = () => {
    panning = false;
    canvas.classList.remove("panning");
  };
  canvas.addEventListener("pointerup", endPan);
  canvas.addEventListener("pointercancel", endPan);
  canvas.addEventListener(
    "wheel",
    (event) => {
      const overCard = Boolean(event.target?.closest?.(".iwb-card"));
      if (overCard && !(event.ctrlKey || event.metaKey)) {
        const body = event.target.closest(".iwb-body");
        if (body && state.settings.chainWheel) {
          const atTop = body.scrollTop <= 0;
          const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
          const scrollingUp = event.deltaY < 0;
          if (!(atTop && scrollingUp) && !(atBottom && !scrollingUp)) {
            event.stopPropagation();
            return;
          }
        } else {
          event.stopPropagation();
          return;
        }
      }
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        const delta = clamp(event.deltaY, -50, 50);
        zoomAt(event.clientX, event.clientY, state.zoom * Math.exp(-delta * 16e-4));
      } else {
        state.pan.x -= event.deltaX;
        state.pan.y -= event.deltaY;
        applyView();
      }
    },
    { passive: false }
  );
  function zoomAt(clientX, clientY, target) {
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const zoom = clamp(target, 0.3, 1.6);
    const ratio = zoom / state.zoom;
    state.pan.x = px - (px - state.pan.x) * ratio;
    state.pan.y = py - (py - state.pan.y) * ratio;
    state.zoom = zoom;
    applyView();
  }
  function zoomBy(delta) {
    const rect = canvas.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, state.zoom + delta);
  }
  btnFit.addEventListener("click", () => fitView());
  zoomFitBtn.addEventListener("click", () => fitView());
  zoomIn.addEventListener("click", () => zoomBy(0.12));
  zoomOut.addEventListener("click", () => zoomBy(-0.12));
  btnNote.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = addNote({ focus: true });
    if (card) toast(t2("note.added"));
  });
  btnNew.addEventListener("click", (event) => {
    event.stopPropagation();
    workspaceMenu.open();
  });
  btnCanvas.addEventListener("click", (event) => {
    event.stopPropagation();
    openCanvasMenu();
  });
  btnBlank.addEventListener("click", (event) => {
    event.stopPropagation();
    void requestNewBlankCanvas();
  });
  const onCanvasPointerDown = (event) => {
    if (!canvasPop) return;
    if (event.target?.closest?.(".iwb-canvas-menu") || event.target?.closest?.(".iwb-toolbar")) return;
    closeCanvasMenu();
  };
  document.addEventListener("pointerdown", onCanvasPointerDown, true);
  btnBoard.addEventListener("click", (event) => {
    event.stopPropagation();
    openKanbanMenu();
  });
  const onKanbanPointerDown = (event) => {
    if (!kanbanPop) return;
    if (event.target?.closest?.(".iwb-kanban") || event.target?.closest?.(".iwb-toolbar")) return;
    closeKanbanMenu();
  };
  document.addEventListener("pointerdown", onKanbanPointerDown, true);
  const onMorePointerDown = (event) => {
    if (!morePop) return;
    if (event.target?.closest?.(".iwb-more") || event.target?.closest?.('[data-act="more"]')) return;
    closeMoreMenu();
  };
  document.addEventListener("pointerdown", onMorePointerDown, true);
  const onPipePointerDown = (event) => {
    if (!pipePop) return;
    if (event.target?.closest?.(".iwb-pipe") || event.target?.closest?.('[data-act="pipe"]')) return;
    closePipeMenu();
  };
  document.addEventListener("pointerdown", onPipePointerDown, true);
  const onKey = (event) => {
    if (event.target instanceof HTMLElement && event.target.matches("input, textarea")) return;
    if (!root.isConnected) return;
    if ((event.metaKey || event.ctrlKey) && (event.key === "a" || event.key === "A")) {
      event.preventDefault();
      selectAll();
      return;
    }
    if (event.key === "Escape") {
      clearSelection();
      closePipeMenu();
      closeMoreMenu();
      closeCanvasMenu();
      document.removeEventListener("pointerdown", onMorePointerDown, true);
      document.removeEventListener("pointerdown", onCanvasPointerDown, true);
      closeKanbanMenu();
    }
    if (event.key === "0") fitView();
    else if (event.key === "+" || event.key === "=") zoomBy(0.12);
    else if (event.key === "-") zoomBy(-0.12);
  };
  window.addEventListener("pagehide", save);
  document.addEventListener("keydown", onKey);
  function setMode(mode) {
    state.mode = mode === "task" ? "task" : "canvas";
    const isTask = state.mode === "task";
    canvas.hidden = isTask;
    if (taskView) taskView.root.hidden = !isTask;
    for (const control of [btnNew, btnNote, btnCanvas, btnBlank, btnArrange, btnBoard, btnFit, btnCollapse, hint, todoBar]) {
      control.hidden = isTask;
    }
    btnCanvasMode.classList.toggle("active", !isTask);
    btnTaskMode.classList.toggle("active", isTask);
    btnCanvasMode.setAttribute("aria-selected", String(!isTask));
    btnTaskMode.setAttribute("aria-selected", String(isTask));
    if (isTask) taskView?.refresh();
    updateCounts();
  }
  taskController = createTaskController({
    adapter,
    taskStore,
    flow,
    t: t2,
    toast,
    bridge: {
      getCards: () => state.cards,
      getCanvases: syncCanvases,
      getActiveCanvas: () => state.activeCanvas,
      requestNewBlankCanvas,
      requestSwitchCanvas,
      saveCanvasAs,
      storeCanvases,
      addSession,
      addNote,
      setPipeTargets,
      renderFoot,
      fitView,
      centerCard,
      flash,
      switchCanvas,
      setMode,
      save,
      schedulePipelines,
      maybeDeliverCompleted,
      recordFlow
    }
  });
  taskView = createTaskView({
    host: root,
    t: t2,
    el,
    getSnapshot: () => taskController.snapshot(),
    actions: taskController,
    toast
  });
  taskStore.subscribe(() => {
    if (state.mode === "task") taskView.refresh();
  });
  taskLoadPromise.then(() => {
    if (state.mode === "task") taskView.refresh();
  });
  btnCanvasMode.addEventListener("click", () => setMode("canvas"));
  btnTaskMode.addEventListener("click", () => setMode("task"));
  setMode("canvas");
  applyView();
  updateEmptyState();
  let statusTick = 0;
  const ticker = setInterval(() => {
    for (const card of state.cards) {
      if (card.kind === "note") continue;
      if (!card.running) continue;
      const label = card.el.querySelector(".iwb-elapsed");
      if (label) label.textContent = formatElapsed(Date.now() - card.startedAt);
    }
    statusTick += 1;
    if (statusTick % 3 === 0) {
      const active = state.cards.filter(
        (card) => card.kind !== "note" && (card.running || card.queued || card.view?.questions?.length)
      );
      if (active.length) {
        void Promise.resolve(adapter.pollStates?.(active.map((card) => card.sessionId))).then(() => {
          for (const card of active) markDirty(card);
        }).catch(() => {
        });
      }
    }
  }, 1e3);
  return {
    root,
    addSession,
    restore,
    reset,
    setMode,
    getTaskSnapshot: () => taskController?.snapshot(),
    dispose() {
      save();
      disposed = true;
      try {
        clearInterval(ticker);
        clearTimeout(saveTimer);
        clearTimeout(canvasSaveTimer);
        clearTimeout(toastTimer);
        taskStore.dispose();
        taskController?.dispose();
        taskView?.dispose();
        settingsMenu.close();
        tools.dispose();
        stopApprovalWatch?.();
        stopUploadWatch?.();
        stopTitleWatch?.();
        stopRemoteSync?.();
        window.removeEventListener("pagehide", save);
        document.removeEventListener("keydown", onKey);
        closePipeMenu();
        closeKanbanMenu();
        clearKanbanHeads();
        document.removeEventListener("pointerdown", onPipePointerDown, true);
        document.removeEventListener("pointerdown", onKanbanPointerDown, true);
        modelMenu.dispose();
        arrangeMenu.dispose();
        settingsMenu.dispose();
        workspaceMenu.dispose();
        modelMenu.close();
        cancelAnimationFrame(frame);
        cancelAnimationFrame(anim);
        for (const card of state.cards) {
          try {
            card.detach?.();
          } catch {
          }
        }
        root.remove();
      } catch (error) {
        console.error("[inspiration-workbench] dispose failed", error);
      }
    }
  };
}

// src/client/sessions.js
var MAX_ITEMS = 400;
function textOfContent(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((block) => {
      if (typeof block === "string") return block;
      if (!block || typeof block !== "object") return "";
      if (block.type === "text" || block.type === "text-delta") return block.text || "";
      return "";
    }).join("");
  }
  if (typeof content === "object") {
    if (typeof content.text === "string") return content.text;
    if (content.message) return textOfContent(content.message.content);
  }
  return "";
}
function attachmentMeta(data) {
  const blocks = Array.isArray(data?.message?.content) && data.message.content || Array.isArray(data?.content) && data.content || [];
  const out = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object" || block.type === "text") continue;
    const nested = block.attachment || block.file || block.meta || block.source || {};
    const path = typeof block.path === "string" && block.path || typeof block.url === "string" && block.url || typeof nested.path === "string" && nested.path || "";
    const label = block.name || block.filename || block.fileName || block.title || nested.name || nested.filename || nested.fileName || (path ? String(path).split("/").pop().split("?")[0] : "") || "";
    out.push({ name: String(label || "").slice(0, 80), kind: String(block.type || "file") });
  }
  return out;
}
function messageText(data) {
  if (!data || typeof data !== "object") return "";
  return textOfContent(data.message?.content) || textOfContent(data.content) || textOfContent(data.text) || textOfContent(data.message) || "";
}
function summarizeInput(input) {
  if (input == null) return "";
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return summarizeInput(JSON.parse(trimmed));
      } catch {
        return trimmed.slice(0, 90);
      }
    }
    return trimmed.slice(0, 90);
  }
  if (typeof input === "object") {
    for (const key of ["path", "file_path", "command", "query", "pattern", "url", "name"]) {
      const value = input[key];
      if (typeof value === "string" && value) return value.slice(0, 90);
    }
    try {
      return JSON.stringify(input).slice(0, 90);
    } catch {
      return "";
    }
  }
  return String(input).slice(0, 90);
}
function toolNameOf(data) {
  if (!data || typeof data !== "object") return "tool";
  return data.name || data.toolName || data.tool || data.definition?.name || data.call?.name || "tool";
}
function callIdOf(data) {
  if (!data || typeof data !== "object") return "";
  return data.callId || data.toolCallId || data.message?.toolCallId || data.message?.source?.callId || data.id || data.call?.id || "";
}
function tryJson(raw) {
  if (typeof raw !== "string") return raw;
  const trimmed = raw.trim();
  if (!trimmed) return void 0;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}
function prettyJson(value) {
  if (value == null) return "";
  if (typeof value === "string") return value.slice(0, 4e3);
  try {
    return JSON.stringify(value, null, 2).slice(0, 4e3);
  } catch {
    return String(value).slice(0, 4e3);
  }
}
function resultText(data) {
  const message = data?.message;
  const blocks = message?.content;
  const text4 = Array.isArray(blocks) ? blocks.map((block) => {
    if (!block || typeof block !== "object") return "";
    if (block.type === "text") return block.text || "";
    if (block.type === "reasoning") return "";
    if (block.type === "image") return "[image]";
    if (block.type === "file") return "[file]";
    if (block.type === "tool-call") return "";
    return "";
  }).join("") : typeof blocks === "string" ? blocks : "";
  const fromError = data?.error ? data.error.reason || data.error.message || data.error.code || "" : "";
  return (text4 || fromError || "").slice(0, 4e3);
}
function failureOfTurnEnd(kind, reason) {
  switch (kind) {
    case "interrupted":
      return { title: "failure.taskStopped", detail: "failure.interrupted" };
    case "aborted": {
      const cause = reason?.reason?.kind || reason?.cause?.kind;
      if (cause === "user") return { title: "failure.stopped", detail: "" };
      return { title: "failure.taskStopped", detail: "failure.interrupted" };
    }
    case "error": {
      const message = reason?.error?.message || reason?.error?.code || "";
      return { title: "failure.turnError", detail: "", message };
    }
    case "blocked":
      return { title: "failure.turnError", detail: "" };
    case "max-tokens":
      return { title: "failure.maxTokens", detail: "" };
    default:
      return null;
  }
}
function fold(entries) {
  const items = [];
  const tools = /* @__PURE__ */ new Map();
  const turns = /* @__PURE__ */ new Map();
  const steps = /* @__PURE__ */ new Map();
  const approvals = /* @__PURE__ */ new Map();
  let liveText = "";
  let liveReasoning = "";
  function holderTurn(turn) {
    return turns.get(turn) || turnItem(turn);
  }
  function turnItem(turn, time) {
    let item = turns.get(turn);
    if (!item) {
      item = { k: "turnProcess", turn, steps: [], startTime: time, endTime: null, failed: false };
      turns.set(turn, item);
      items.push(item);
    }
    return item;
  }
  ;
  const push = (item) => {
    items.push(item);
    if (items.length > MAX_ITEMS * 2) items.splice(0, items.length - MAX_ITEMS * 2);
  };
  for (const entry of entries || []) {
    if (!entry || typeof entry !== "object") continue;
    if (entry.type === "transient") {
      const chunk = entry.event?.data?.chunk;
      if (!chunk) continue;
      if (chunk.type === "text-delta" && chunk.text) liveText += chunk.text;
      else if (chunk.type === "reasoning-delta" && chunk.text) liveReasoning += chunk.text;
      else if (chunk.type === "text" && chunk.text) liveText += chunk.text;
      else if (chunk.type === "reasoning" && chunk.text) liveReasoning += chunk.text;
      continue;
    }
    const event = entry.event;
    if (!event || typeof event !== "object") continue;
    const data = event.data || {};
    if (typeof data.turn === "number") turnItem(data.turn, event.time);
    switch (event.type) {
      case "user/message": {
        if (event.surfaceOp && event.surfaceOp !== "append") break;
        const kind = data?.source?.kind;
        if (kind && kind !== "user") break;
        const text4 = messageText(data);
        const attachments = attachmentMeta(data);
        if (text4 || attachments.length) push({ k: "user", text: text4, attachments });
        break;
      }
      case "assistant/message": {
        const text4 = messageText(data);
        if (text4) push({ k: "assistant", text: text4, turn: data.turn });
        break;
      }
      case "turn/start": {
        turnItem(data.turn, event.time);
        break;
      }
      case "turn/end": {
        const item = turns.get(data.turn);
        const reason = data.reason || {};
        const kind = typeof reason === "string" ? reason : reason.kind;
        if (item) {
          item.endTime = event.time;
          item.failed = kind === "error" || kind === "blocked" || kind === "max-tokens";
        }
        const failure = failureOfTurnEnd(kind, reason);
        if (failure) push({ k: "failure", failure });
        break;
      }
      case "tool/call": {
        const raw = data.arguments;
        const parsed = typeof raw === "string" ? tryJson(raw) : raw;
        const call = {
          k: "tool",
          id: callIdOf(data),
          name: toolNameOf(data),
          arg: summarizeInput(parsed ?? data.input ?? data.args),
          argsText: prettyJson(parsed),
          state: "running"
        };
        if (call.id) tools.set(call.id, call);
        turnItem(data.turn, event.time);
        const stepKey = data.turn + ":" + data.step;
        let step = steps.get(stepKey);
        if (!step) {
          step = { k: "step", turn: data.turn, step: data.step, calls: [] };
          steps.set(stepKey, step);
          push(step);
          holderTurn(data.turn).steps.push(step);
        }
        step.calls.push(call);
        holderTurn(data.turn).toolCalls = (holderTurn(data.turn).toolCalls || 0) + 1;
        break;
      }
      case "approval/asked": {
        const id = data.id || data.callId || "approval-" + items.length;
        approvals.set(id, {
          id,
          toolName: data.toolName || "",
          reason: data.displayReason || data.reason || ""
        });
        break;
      }
      case "approval/decided": {
        if (data.id) approvals.delete(data.id);
        break;
      }
      case "tool/result": {
        const id = callIdOf(data);
        const item = id ? tools.get(id) : void 0;
        const failed = Boolean(data.error) || data.message?.isError === true;
        if (item) {
          item.state = failed ? "error" : "done";
          item.resultText = resultText(data);
        }
        break;
      }
      case "compaction/summary":
      case "compaction/end": {
        push({ k: "notice", text: "\u4E0A\u4E0B\u6587\u5DF2\u538B\u7F29" });
        break;
      }
      default:
        break;
    }
  }
  if (liveReasoning.trim()) push({ k: "reasoning", text: liveReasoning.trim() });
  if (liveText.trim()) push({ k: "assistant", text: liveText, live: true });
  const placed = /* @__PURE__ */ new Set();
  for (let index = 0; index < items.length; index += 1) {
    const entry = items[index];
    if (entry.k !== "turnProcess" || placed.has(entry)) continue;
    placed.add(entry);
    const first = items.findIndex((candidate) => candidate.k !== "turnProcess" && candidate.turn === entry.turn);
    if (first < 0) continue;
    let anchor = first;
    for (let probe = first - 1; probe >= 0; probe -= 1) {
      if (items[probe].k === "user") {
        anchor = probe + 1;
        break;
      }
    }
    if (anchor === index) continue;
    items.splice(index, 1);
    const insertAt = index < anchor ? anchor - 1 : anchor;
    items.splice(insertAt, 0, entry);
    index = Math.max(index, insertAt);
  }
  const truncated = items.length > MAX_ITEMS;
  return {
    items: truncated ? items.slice(-MAX_ITEMS) : items,
    truncated,
    approvals: [...approvals.values()]
  };
}
function createSessionsAdapter(ctx) {
  const sessions = ctx.get("sessions");
  const entries = /* @__PURE__ */ new Map();
  function notify(sessionId) {
    const entry = entries.get(sessionId);
    if (!entry) return;
    for (const listener of entry.listeners) {
      try {
        listener();
      } catch {
      }
    }
  }
  function attachApprovalListeners(sessionId, entry) {
    const scope = entry.binding?.ctx;
    const remote = scope?.remote;
    entry.approvalUnsubs = entry.approvalUnsubs || [];
    for (const dispose of entry.approvalUnsubs) {
      try {
        dispose?.();
      } catch {
      }
    }
    entry.approvalUnsubs = [];
    if (!scope || typeof remote?.$on !== "function" || typeof scope.effect !== "function") return;
    for (const handler of entry.approvalHandlers || []) {
      try {
        const dispose = scope.effect(
          () => remote.$on("approval/request", function onApprovalRequest(request2, next) {
            return handler(sessionId, request2, next);
          }),
          "inspiration-workbench: inline approval"
        );
        entry.approvalUnsubs.push(dispose);
      } catch {
      }
    }
  }
  function attach(sessionId, entry) {
    const binding = entry.reference.binding;
    if (!binding || entry.binding === binding) return;
    entry.binding = binding;
    attachApprovalListeners(sessionId, entry);
    const onEvent = () => notify(sessionId);
    entry.unsubs.push(binding.eventSource.subscribe(onEvent));
    try {
      const questions = binding.session.projections?.faceOf("userQuestions");
      if (questions?.subscribe) entry.unsubs.push(questions.subscribe(onEvent));
      const inbox = binding.session.projections?.faceOf("inbox");
      if (inbox?.subscribe) entry.unsubs.push(inbox.subscribe(onEvent));
    } catch {
    }
    if (binding.session && typeof binding.session.subscribe === "function") {
      entry.unsubs.push(binding.session.subscribe(onEvent));
    }
    notify(sessionId);
  }
  function close(sessionId) {
    const entry = entries.get(sessionId);
    if (!entry) return;
    entries.delete(sessionId);
    for (const unsub of entry.unsubs) {
      try {
        unsub();
      } catch {
      }
    }
    try {
      entry.reference.release?.();
      entry.reference[Symbol.dispose]?.();
    } catch {
    }
  }
  function retainCompatible(sessionId) {
    if (typeof sessions?.retain === "function") {
      return sessions.retain(sessionId, { source: "inspirationWorkbench" });
    }
    if (typeof sessions?.binding === "function") {
      const wrap = (binding) => ({ binding, ready: Promise.resolve(binding), release: () => {
      } });
      const existing = sessions.binding(sessionId);
      if (existing) return wrap(existing);
      sessions.open?.(sessionId);
      const opened = sessions.binding(sessionId);
      if (opened) return wrap(opened);
    }
    throw new Error("\u5F53\u524D DSH \u7248\u672C\u4E0D\u652F\u6301\u4F1A\u8BDD\u7ED1\u5B9A\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u8FD9\u6761\u4F1A\u8BDD");
  }
  function open(sessionId, onChange) {
    if (!sessions) {
      onChange();
      return () => {
      };
    }
    let entry = entries.get(sessionId);
    if (!entry) {
      let reference = retainCompatible(sessionId);
      entry = { reference, binding: null, listeners: /* @__PURE__ */ new Set(), unsubs: [] };
      entries.set(sessionId, entry);
      if (reference.binding) attach(sessionId, entry);
      Promise.resolve(reference.ready).then(() => attach(sessionId, entry)).catch(() => notify(sessionId));
    }
    entry.listeners.add(onChange);
    return () => {
      const current = entries.get(sessionId);
      if (!current) return;
      current.listeners.delete(onChange);
      if (current.listeners.size === 0) close(sessionId);
    };
  }
  function queueOf(binding) {
    try {
      const inbox = binding?.session?.projections?.faceOf("inbox")?.getSnapshot?.();
      return (inbox?.["next-turn"] || []).map((row) => ({
        id: row.id,
        text: (row.content || []).filter((block) => block && block.type === "text").map((block) => block.text || "").join(""),
        attachments: (row.content || []).filter((block) => block && block.type !== "text").length,
        attachmentNames: (row.content || []).filter((block) => block && block.type !== "text").map((block) => String(block.name || block.filename || block.title || "").slice(0, 60)).filter(Boolean)
      }));
    } catch {
      return [];
    }
  }
  function conversationService() {
    try {
      return ctx.get?.("conversation") ?? ctx.conversation;
    } catch {
      return void 0;
    }
  }
  function hasAttachments() {
    const service = conversationService();
    return Boolean(service?.createDrafts && service?.sendSession && service?.fileUploads);
  }
  function createDrafts(sessionId, files) {
    const service = conversationService();
    if (!service?.createDrafts) throw new Error("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u9644\u4EF6");
    return service.createDrafts(sessionId, files, true).map((draft) => ({
      id: draft.id,
      kind: draft.kind,
      name: draft.file?.name || "",
      size: draft.file?.size || 0,
      previewUrl: draft.previewUrl || ""
    }));
  }
  function uploadSnapshots() {
    try {
      return conversationService()?.fileUploads?.getSnapshot?.() || {};
    } catch {
      return {};
    }
  }
  function subscribeUploads(listener) {
    try {
      return conversationService()?.fileUploads?.subscribe?.(listener);
    } catch {
      return void 0;
    }
  }
  function releaseDrafts(ids) {
    if (!ids?.length) return;
    try {
      conversationService()?.releaseDraftAttachments?.(ids.map((id) => ({ id })));
    } catch {
    }
  }
  async function sendWithAttachments(sessionId, text4, attachmentIds, mode) {
    const service = conversationService();
    const binding = bindingOf(sessionId);
    if (!service?.sendSession || !binding) throw new Error("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u9644\u4EF6");
    await service.sendSession(binding.session, text4, attachmentIds, mode || "queue");
  }
  async function steerQueued(sessionId, itemId) {
    const session = bindingOf(sessionId)?.session;
    if (!session?.updateQueue) throw new Error("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u63D2\u8BDD");
    const result = await session.updateQueue(itemId, { kind: "steer" });
    if (result && result.ok === false) throw new Error(result.error?.message || "\u63D2\u8BDD\u5931\u8D25");
    return true;
  }
  function retryUpload(sessionId, attachmentId) {
    const service = conversationService();
    if (!service?.retryFileUpload) return false;
    try {
      service.retryFileUpload(sessionId, attachmentId);
      return true;
    } catch {
      return false;
    }
  }
  async function removeQueued(sessionId, itemId) {
    const session = bindingOf(sessionId)?.session;
    if (!session?.updateQueue) throw new Error("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5220\u9664\u6392\u961F\u6D88\u606F");
    const result = await session.updateQueue(itemId, { kind: "remove" });
    if (result && result.ok === false) throw new Error(result.error?.message || "\u5220\u9664\u6392\u961F\u6D88\u606F\u5931\u8D25");
    return true;
  }
  function watchTitles(listener) {
    const list = sessions?.list;
    if (!list?.subscribe) return void 0;
    try {
      return list.subscribe(listener);
    } catch {
      return void 0;
    }
  }
  function bindingOf(sessionId) {
    return entries.get(sessionId)?.binding;
  }
  function read(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) {
      return { ready: false, running: false, items: [], hasMore: false, loadingOlder: false, model: "", openState: "loading" };
    }
    let snapshot = {};
    let window2 = { entries: [], hasMore: false };
    try {
      snapshot = binding.session.getSnapshot() || {};
      window2 = binding.eventSource.getSnapshot() || window2;
    } catch {
    }
    let selection = null;
    try {
      const projection = binding.session.projections?.faceOf("modelSelection")?.getSnapshot();
      selection = projection?.next || projection?.lastUsed || null;
    } catch {
      selection = null;
    }
    if (!catalogCache && !catalogPending) void loadCatalog();
    const baseModel = selection ? catalogName(selection) || selection.model || "" : "";
    const effortName = selection ? catalogEffort(selection) : "";
    const model = baseModel + (effortName ? " \xB7 " + effortName : "");
    const folded = fold(window2.entries);
    let questions = [];
    try {
      const projected = binding.session.projections?.faceOf("userQuestions")?.getSnapshot();
      questions = (projected?.active || []).map((entry) => ({
        callId: entry.callId,
        state: entry.state,
        items: entry.questions || []
      }));
    } catch {
      questions = [];
    }
    const approvals = folded.approvals;
    const queueItems = queueOf(binding);
    return {
      ready: true,
      selection,
      running: (() => {
        const latestTurn = folded.items.filter((item) => item.k === "turnProcess").at(-1);
        return latestTurn ? latestTurn.endTime == null : Boolean(snapshot.running);
      })(),
      questions,
      approvals,
      items: folded.items,
      truncated: Boolean(folded.truncated),
      hasMore: Boolean(snapshot.hasMore ?? window2.hasMore),
      loadingOlder: Boolean(snapshot.loadingOlder),
      waiting: liveState.get(sessionId)?.waiting || (questions.length ? "question" : null),
      queued: queueItems.length || liveState.get(sessionId)?.queued || 0,
      queueItems,
      openState: snapshot.openState || "open",
      lastError: snapshot.lastAgentError || "",
      model
    };
  }
  async function prompt(sessionId, text4, mode) {
    const binding = bindingOf(sessionId);
    if (!binding) throw new Error("\u4F1A\u8BDD\u8FD8\u5728\u6253\u5F00\u4E2D\uFF0C\u7A0D\u7B49\u4E00\u4E0B\u518D\u53D1");
    const result = await binding.session.prompt([{ type: "text", text: text4 }], mode === "steer" ? "steer" : "queue");
    if (result && result.ok === false) {
      throw new Error(result.error?.message || "\u53D1\u9001\u5931\u8D25");
    }
  }
  async function cancel(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) return;
    await binding.session.cancel();
  }
  async function answerQuestion(sessionId, callId, answers) {
    let remote;
    try {
      remote = ctx.remote?.userQuestions;
    } catch {
      remote = void 0;
    }
    if (!remote?.answer) throw new Error("\u5F53\u524D\u7248\u672C\u6CA1\u6709\u63D0\u4F9B\u63D0\u95EE\u56DE\u7B54");
    const result = await remote.answer(sessionId, callId, { answers });
    if (!result?.ok) throw new Error(result?.error?.message || "\u63D0\u4EA4\u5931\u8D25");
    return result.value;
  }
  async function loadOlder(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) return;
    await binding.session.loadOlder();
  }
  const remoteSession = () => {
    try {
      return ctx.get?.("remote")?.session;
    } catch {
      return void 0;
    }
  };
  let catalogCache = null;
  let catalogAt = 0;
  let catalogPromise = null;
  async function modelCatalog() {
    if (!remoteSession()?.modelCatalog) {
      catalogCache = { groups: [] };
      catalogAt = Date.now();
      return catalogCache;
    }
    const stale = catalogCache && Date.now() - catalogAt > 6e4;
    if (catalogCache && !stale) return catalogCache;
    if (stale) {
      catalogCache = null;
      catalogPromise = null;
    }
    if (!catalogPromise) {
      catalogPromise = (async () => {
        const remote = remoteSession();
        if (!remote?.modelCatalog) throw new Error("\u5F53\u524D\u7248\u672C\u6CA1\u6709\u63D0\u4F9B\u6A21\u578B\u76EE\u5F55");
        const result = await remote.modelCatalog();
        if (!result?.ok) throw new Error(result?.error?.message || "\u8BFB\u53D6\u6A21\u578B\u76EE\u5F55\u5931\u8D25");
        catalogCache = result.value;
        catalogAt = Date.now();
        return catalogCache;
      })().catch((error) => {
        catalogPromise = null;
        throw error;
      });
    }
    return catalogPromise;
  }
  function catalogEffort(selection) {
    if (!catalogCache || !selection) return selection?.reasoningEffort || "";
    for (const group of catalogCache.groups || []) {
      for (const model of group.models || []) {
        if (model.id !== selection.model) continue;
        const effortId = selection.reasoningEffort || model.reasoning?.defaultEffort;
        if (!effortId) return "";
        const effort = (model.reasoning?.efforts || []).find((entry) => entry.id === effortId);
        return effort?.name || effortId;
      }
    }
    return selection.reasoningEffort || "";
  }
  const liveState = /* @__PURE__ */ new Map();
  async function pollStates(sessionIds) {
    const remote = remoteSession();
    if (!remote?.state || !Array.isArray(sessionIds) || !sessionIds.length) return;
    await Promise.all(
      sessionIds.map(async (sessionId) => {
        try {
          const result = await remote.state({ sessionId });
          if (!result?.ok) return;
          const value = result.value || {};
          const pending = Array.isArray(value.pendingInput) ? value.pendingInput : [];
          const waiting = pending.includes("approval") ? "approval" : pending.includes("question") ? "question" : pending.length ? "other" : null;
          const queue = Array.isArray(value.queue) ? value.queue : [];
          const queued = queue.filter((item) => item?.placement === "queued").length;
          const previous = liveState.get(sessionId);
          if (previous && previous.waiting === waiting && previous.queued === queued) return;
          liveState.set(sessionId, { waiting, queued });
          notify(sessionId);
        } catch {
        }
      })
    );
  }
  let catalogPending = false;
  async function loadCatalog() {
    if (catalogCache || catalogPending) return catalogCache;
    catalogPending = true;
    try {
      const catalog = await modelCatalog();
      if (catalog) for (const sessionId of entries.keys()) notify(sessionId);
      return catalog;
    } finally {
      catalogPending = false;
    }
  }
  function catalogName(selection) {
    if (!catalogCache || !selection) return "";
    for (const group of catalogCache.groups || []) {
      for (const model of group.models || []) {
        if (model.id === selection.model) return model.name || model.id;
      }
    }
    return "";
  }
  function selectionOf(sessionId) {
    const binding = bindingOf(sessionId);
    if (!binding) return null;
    try {
      const projection = binding.session.projections?.faceOf("modelSelection")?.getSnapshot();
      return projection?.next || projection?.lastUsed || null;
    } catch {
      return null;
    }
  }
  function modelSelection(sessionId) {
    return selectionOf(sessionId);
  }
  async function selectModel(sessionId, selection) {
    const remote = remoteSession();
    if (!remote?.selectModel) throw new Error("\u5F53\u524D\u7248\u672C\u6CA1\u6709\u63D0\u4F9B\u6A21\u578B\u5207\u6362");
    const request2 = { sessionId, provider: selection.provider, model: selection.model };
    if (selection.reasoningEffort !== void 0 && selection.reasoningEffort !== null) {
      request2.reasoningEffort = selection.reasoningEffort;
    }
    const result = await remote.selectModel(request2);
    if (!result?.ok) throw new Error(result?.error?.message || "\u5207\u6362\u6A21\u578B\u5931\u8D25");
    return result.value?.selected || selection;
  }
  function titleOf(sessionId) {
    try {
      const rows = sessions?.list?.getSnapshot?.()?.byId;
      const row = rows && rows[sessionId];
      return row?.displayTitle || row?.title || "";
    } catch {
      return "";
    }
  }
  function workspacesService() {
    try {
      return ctx.get?.("workspaces") ?? ctx.workspaces;
    } catch {
      return void 0;
    }
  }
  function listWorkspaces() {
    try {
      const snapshot = workspacesService()?.list?.getSnapshot?.() || {};
      return (snapshot.items || []).map((item) => ({
        id: item.workspaceId,
        title: item.title || item.name || "",
        path: item.path || "",
        sessionIds: item.sessionIds || []
      })).filter((item) => Boolean(item.id));
    } catch {
      return [];
    }
  }
  function listenApprovals(sessionId, handler) {
    const entry = entries.get(sessionId);
    if (!entry) return () => {
    };
    entry.approvalHandlers = entry.approvalHandlers || /* @__PURE__ */ new Set();
    entry.approvalHandlers.add(handler);
    if (entry.binding) attachApprovalListeners(sessionId, entry);
    return () => {
      entry.approvalHandlers.delete(handler);
      if (entry.binding) attachApprovalListeners(sessionId, entry);
    };
  }
  function workspaceOf(sessionId) {
    return listWorkspaces().find((workspace) => workspace.sessionIds.includes(sessionId)) || null;
  }
  async function createWorkspace({ path }) {
    const service = workspacesService();
    if (!service?.create) throw new Error("\u5F53\u524D\u7248\u672C\u6CA1\u6709\u63D0\u4F9B\u5DE5\u4F5C\u533A\u521B\u5EFA\u63A5\u53E3");
    const result = await service.create({ path });
    const workspace = result?.value?.workspace || result?.workspace || result?.value || result;
    const id = workspace?.workspaceId || workspace?.id;
    if (!id) throw new Error("\u5DE5\u4F5C\u533A\u521B\u5EFA\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84\u662F\u5426\u6709\u6548");
    return {
      id: String(id),
      title: workspace.title || path.split("/").filter(Boolean).pop() || path,
      path: workspace.path || path,
      sessionIds: workspace.sessionIds || []
    };
  }
  async function createSession(options) {
    if (!sessions?.create) throw new Error("\u5F53\u524D\u7248\u672C\u6CA1\u6709\u63D0\u4F9B\u9759\u9ED8\u65B0\u5EFA\u4F1A\u8BDD\u7684\u63A5\u53E3");
    const request2 = {};
    const workspaceId = options && typeof options === "object" ? options.workspaceId : void 0;
    if (workspaceId) request2.workspaceId = workspaceId;
    if (options?.agentPreset) request2.agentPreset = options.agentPreset;
    try {
      return await sessions.create(request2);
    } catch (error) {
      if (!options?.agentPreset) throw error;
      delete request2.agentPreset;
      return await sessions.create(request2);
    }
  }
  async function waitForReady(sessionId, options) {
    const timeoutMs = Number(options?.timeoutMs) || 15e3;
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
      if (bindingOf(sessionId)) return true;
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    throw new Error("\u4F1A\u8BDD\u6253\u5F00\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
  }
  function listRecentSessions(limit) {
    try {
      const rows = sessions?.list?.getSnapshot?.()?.byId || {};
      const cap = Math.max(1, Math.min(100, Number(limit) || 30));
      return Object.values(rows).map((row) => {
        const sessionId = row.sessionId || row.id || row.key || "";
        const activityAt = Number(row.lastActivityAt || row.activityAt || row.updatedAt || row.createdAt) || 0;
        return {
          sessionId: String(sessionId),
          title: row.displayTitle || row.title || "\u672A\u547D\u540D\u4F1A\u8BDD",
          activityAt,
          archived: Boolean(row.archived || row.archivedAt || row.deletedAt),
          workspace: workspaceOf(String(sessionId))?.title || ""
        };
      }).filter((row) => row.sessionId && !row.archived).sort((left, right) => right.activityAt - left.activityAt).slice(0, cap);
    } catch {
      return [];
    }
  }
  return {
    available: Boolean(sessions),
    hasModelPicker: () => Boolean(remoteSession()?.selectModel),
    modelCatalog,
    selectModel,
    modelSelection,
    selectionOf,
    answerQuestion,
    open,
    listenApprovals,
    read,
    prompt,
    cancel,
    loadOlder,
    titleOf,
    createSession,
    createWorkspace,
    waitForReady,
    listRecentSessions,
    listWorkspaces,
    workspaceOf,
    pollStates,
    watchTitles,
    removeQueued,
    steerQueued,
    hasAttachments,
    createDrafts,
    uploadSnapshots,
    subscribeUploads,
    releaseDrafts,
    sendWithAttachments,
    retryUpload,
    dispose() {
      for (const sessionId of [...entries.keys()]) close(sessionId);
    }
  };
}

// src/client/approvals.js
var OUTCOME_ALLOW = "allowed-once";
var OUTCOME_REJECT = "rejected";
var OUTCOME_CANCELLED = "cancelled";
function createApprovalHub() {
  const pending = /* @__PURE__ */ new Map();
  const listeners = /* @__PURE__ */ new Set();
  const openSessions = /* @__PURE__ */ new Set();
  let enabled = false;
  let nextId = 0;
  const notify = () => {
    for (const listener of listeners) {
      try {
        listener();
      } catch {
      }
    }
  };
  function settle(id, outcome) {
    const entry = pending.get(id);
    if (!entry) return false;
    pending.delete(id);
    notify();
    try {
      entry.resolve(outcome);
    } catch {
    }
    return true;
  }
  function request2(sessionId, raw) {
    nextId += 1;
    const id = raw?.callId ? String(raw.callId) : "approval-" + nextId;
    return new Promise((resolve) => {
      const entry = {
        id,
        sessionId,
        toolName: raw?.toolName || "",
        reason: raw?.displayReason || raw?.reason || "",
        resolve
      };
      pending.set(id, entry);
      notify();
      const signal = raw?.signal;
      if (signal && typeof signal.addEventListener === "function") {
        signal.addEventListener("abort", () => settle(id, OUTCOME_CANCELLED), { once: true });
      }
    });
  }
  return {
    OUTCOME_ALLOW,
    OUTCOME_REJECT,
    get enabled() {
      return enabled;
    },
    setEnabled(value) {
      enabled = Boolean(value);
      if (!enabled) {
        for (const id of [...pending.keys()]) settle(id, OUTCOME_CANCELLED);
      }
      notify();
    },
    setOpenSessions(ids) {
      openSessions.clear();
      for (const id of ids || []) openSessions.add(id);
    },
    hasSession(id) {
      return openSessions.has(id);
    },
    list(sessionId) {
      return [...pending.values()].filter((entry) => entry.sessionId === sessionId);
    },
    size() {
      return pending.size;
    },
    settle,
    /**
     * Settle the request that matches a session event's approval id. Event ids
     * and waterfall callIds are usually identical; when they are not, a single
     * pending request for that session is still unambiguous.
     */
    settleFor(sessionId, approvalId, outcome) {
      if (approvalId && pending.has(String(approvalId))) return settle(String(approvalId), outcome);
      const candidates = [...pending.values()].filter((entry) => entry.sessionId === sessionId);
      if (candidates.length === 1) return settle(candidates[0].id, outcome);
      return false;
    },
    hasFor(sessionId, approvalId) {
      if (approvalId && pending.has(String(approvalId))) return true;
      return [...pending.values()].some((entry) => entry.sessionId === sessionId);
    },
    request: request2,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

// src/client/index.jsx
var PANEL_ID = "inspiration-workbench";
var LOCALE_NS = "inspiration-workbench";
var ROW_ACTION_ID = "inspiration-workbench-add";
var zh = {
  "panel.label": "\u7075\u611F\u5DE5\u4F5C\u53F0",
  title: "\u7075\u611F\u5DE5\u4F5C\u53F0",
  new: "\u65B0\u5EFA\u4F1A\u8BDD\u5361",
  arrange: "\u6392\u5217",
  canvas: "\u753B\u5E03",
  "canvas.title": "\u753B\u5E03",
  "canvas.active": "\u5F53\u524D\u753B\u5E03\uFF1A{name}",
  "canvas.current": "\u5F53\u524D\uFF1A{name}",
  "canvas.unsaved": "\u5F53\u524D\u753B\u5E03\u8FD8\u6CA1\u4FDD\u5B58",
  "canvas.placeholder": "\u7ED9\u8FD9\u5F20\u753B\u5E03\u8D77\u4E2A\u540D\u5B57",
  "canvas.save": "\u4FDD\u5B58",
  "canvas.overwrite": "\u8986\u76D6\u300C{name}\u300D",
  "canvas.meta": "{n} \u5F20\u5361 \xB7 {time}",
  "canvas.none": "\u8FD8\u6CA1\u6709\u4FDD\u5B58\u8FC7\u753B\u5E03",
  "canvas.saved": "\u5DF2\u4FDD\u5B58\u753B\u5E03\u300C{name}\u300D",
  "canvas.updated": "\u5DF2\u66F4\u65B0\u753B\u5E03\u300C{name}\u300D",
  "canvas.switched": "\u5DF2\u5207\u6362\u5230\u300C{name}\u300D",
  "canvas.deleted": "\u5DF2\u5220\u9664\u753B\u5E03\u300C{name}\u300D",
  "canvas.delete": "\u5220\u9664\u8FD9\u5F20\u753B\u5E03",
  "canvas.nameRequired": "\u5148\u7ED9\u753B\u5E03\u8D77\u4E2A\u540D\u5B57",
  "canvas.broken": "\u8FD9\u5F20\u753B\u5E03\u8BFB\u4E0D\u51FA\u6765",
  "card.more": "\u66F4\u591A\u64CD\u4F5C",
  "card.unpin": "\u53D6\u6D88\u56FA\u5B9A",
  boardMode: "\u770B\u677F",
  "board.title": "\u770B\u677F\u5206\u7EC4",
  "board.byStatus": "\u6309\u72B6\u6001\u5206\u680F",
  "board.byWorkspace": "\u6309\u5DE5\u4F5C\u533A\u5206\u680F",
  "board.byActivity": "\u6309\u6700\u8FD1\u6D3B\u52A8\u5206\u680F",
  "board.exit": "\u9000\u51FA\u770B\u677F\uFF08\u6062\u590D\u539F\u4F4D\uFF09",
  "board.applied": "\u5DF2\u5207\u6362\uFF1A{name}",
  "board.state.running": "\u8FDB\u884C\u4E2D",
  "board.state.waiting": "\u7B49\u4F60\u5904\u7406",
  "board.state.unread": "\u6709\u65B0\u7ED3\u679C",
  "board.state.idle": "\u7A7A\u95F2",
  "board.activity.fresh": "\u521A\u521A\u6D3B\u52A8",
  "board.activity.hour": "1 \u5C0F\u65F6\u5185",
  "board.activity.stale": "\u66F4\u65E9",
  fit: "\u9002\u5E94",
  "hint.pan": "\u62D6\u52A8\u7A7A\u767D\u5904\u5E73\u79FB",
  "hint.zoom": "\u7F29\u653E",
  "hint.zoomKey": "\u6EDA\u8F6E",
  "count.cards": "{n} \u5F20\u5361",
  "count.running": "{n} \u4E2A\u8FD0\u884C\u4E2D",
  "empty.title": "\u8FD8\u6CA1\u6709\u5361\u7247",
  "empty.sub": "\u5728\u5DE6\u4FA7\u4F1A\u8BDD\u5217\u8868\u91CC\u628A\u9F20\u6807\u653E\u5230\u4E00\u6761\u4F1A\u8BDD\u4E0A\uFF0C\u70B9\u300C\uFF0B\u300D\u5C31\u80FD\u628A\u5B83\u644A\u5230\u8FD9\u5757\u753B\u5E03\u4E0A\u3002",
  "empty.card": "\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5185\u5BB9",
  "empty.loading": "\u6B63\u5728\u6253\u5F00\u4F1A\u8BDD\u2026",
  untitled: "\u672A\u547D\u540D\u4F1A\u8BDD",
  loadOlder: "\u52A0\u8F7D\u66F4\u65E9",
  "attach.button": "\u6DFB\u52A0\u56FE\u7247\u6216\u6587\u4EF6",
  "attach.remove": "\u79FB\u9664\u9644\u4EF6",
  "attach.image": "\u56FE\u7247",
  "attach.file": "\u6587\u4EF6",
  "attach.uploading": "\u9644\u4EF6\u8FD8\u5728\u4E0A\u4F20\uFF0C\u8BF7\u7A0D\u5019",
  "attach.failed": "\u9644\u4EF6\u6DFB\u52A0\u5931\u8D25",
  "attach.failedShort": "\u4E0A\u4F20\u5931\u8D25",
  "attach.unsupported": "\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u9644\u4EF6",
  "composer.steerHint": "Enter \u6392\u961F\uFF1BCmd/Ctrl+Enter \u63D2\u8BDD\u53D1\u9001",
  "queue.steer": "\u63D2\u8BDD\u53D1\u9001",
  "queue.steerUnavailable": "\u4EC5\u8FD0\u884C\u4E2D\u53EF\u63D2\u8BDD\u53D1\u9001",
  "queue.steerFailed": "\u63D2\u8BDD\u53D1\u9001\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  "queue.count": "{n} \u6761\u6392\u961F\u6D88\u606F",
  "queue.remove": "\u5220\u9664\u6392\u961F\u6D88\u606F",
  "queue.removeFailed": "\u5220\u9664\u5931\u8D25\uFF1A\u8FD9\u6761\u6D88\u606F\u53EF\u80FD\u5DF2\u7ECF\u5F00\u59CB\u53D1\u9001\u3002",
  "queue.attachment": "[\u9644\u4EF6]",
  "status.waitingApproval": "\u7B49\u5F85\u5BA1\u6279",
  "status.waitingAnswer": "\u7B49\u5F85\u56DE\u7B54",
  "status.queued": "\u6392\u961F {n}",
  "state.running": "\u8FDB\u884C\u4E2D",
  "state.idle": "\u7A7A\u95F2",
  stacked: "\u53E0 {n}",
  detach: "\u4ECE\u8FD9\u4E00\u645E\u91CC\u62BD\u51FA\u6765",
  openNative: "\u5728\u539F\u751F\u4F1A\u8BDD\u4E2D\u6253\u5F00",
  remove: "\u4ECE\u5DE5\u4F5C\u53F0\u79FB\u9664",
  "toast.stacked": "\u5DF2\u53E0\u6210\u4E00\u645E \xB7 \u70B9\u54EA\u5F20\u7FFB\u5230\u54EA\u5F20",
  "composer.idle": "\u7EE7\u7EED\u5BF9\u8BDD\u2026  \u23CE \u53D1\u9001",
  "composer.busy": "\u8FD0\u884C\u4E2D\u2026 \u53EF\u6392\u961F\u6216\u505C\u6B62",
  "composer.label": "\u7ED9\u8FD9\u5F20\u4F1A\u8BDD\u5361\u53D1\u6D88\u606F",
  send: "\u53D1\u9001",
  stop: "\u505C\u6B62",
  "tool.running": "\u6267\u884C\u4E2D",
  "tool.done": "\u5B8C\u6210",
  "tool.error": "\u5931\u8D25",
  "error.open": "\u8FD9\u4E2A\u4F1A\u8BDD\u6CA1\u80FD\u6253\u5F00\uFF0C\u53EF\u80FD\u5DF2\u88AB\u5F52\u6863\u3002",
  "error.read": "\u8BFB\u53D6\u4F1A\u8BDD\u65F6\u51FA\u9519\u3002",
  "error.send": "\u53D1\u9001\u5931\u8D25",
  "error.stop": "\u505C\u6B62\u5931\u8D25",
  "error.new": "\u65B0\u5EFA\u4F1A\u8BDD\u5931\u8D25",
  "row.add": "\u5728\u5DE5\u4F5C\u53F0\u91CC\u6253\u5F00",
  "tool.toggle": "\u5C55\u5F00/\u6536\u8D77\u8BE6\u60C5",
  "tool.args": "\u53C2\u6570",
  "tool.output": "\u7ED3\u679C",
  "tool.errorOutput": "\u9519\u8BEF",
  "tool.waiting": "\u7B49\u5F85\u8F93\u51FA\u2026",
  "tool.noOutput": "\u6CA1\u6709\u8F93\u51FA",
  "model.switch": "\u5207\u6362\u6A21\u578B",
  "model.switchTitle": "\u9009\u62E9\u6A21\u578B",
  "model.loading": "\u8BFB\u53D6\u6A21\u578B\u76EE\u5F55\u2026",
  "model.error": "\u6A21\u578B\u5207\u6362\u5931\u8D25",
  "model.empty": "\u6CA1\u6709\u53EF\u7528\u6A21\u578B",
  "model.switched": "\u5DF2\u5207\u6362\u5230 {name}",
  "board.collapseAll": "\u6536\u8D77\u8FC7\u7A0B",
  "board.expandAll": "\u5C55\u5F00\u8FC7\u7A0B",
  "board.collapsedAll": "\u5DF2\u6536\u8D77\u6240\u6709\u8FC7\u7A0B\u884C",
  "board.expandedAll": "\u5DF2\u5C55\u5F00\u6240\u6709\u8FC7\u7A0B\u884C",
  "todo.approval": "\u5F85\u5BA1\u6279 {n}",
  "todo.question": "\u5F85\u56DE\u7B54 {n}",
  "todo.queued": "\u6392\u961F {n}",
  "todo.title": "\u70B9\u51FB\u5B9A\u4F4D\u5230\u4E0B\u4E00\u4E2A\u9700\u8981\u4F60\u5904\u7406\u7684\u5361\u7247",
  "transcript.truncated": "\u66F4\u65E9\u7684\u5185\u5BB9\u672A\u52A0\u8F7D\uFF08\u672C\u5361\u4FDD\u7559\u6700\u8FD1 {n} \u6761\uFF09",
  "transcript.user": "\u6211",
  "attach.retry": "\u91CD\u8BD5",
  "pipe.linked": "\u6D41\u6C34\u7EBF\u5DF2\u6307\u5411\u300C{name}\u300D",
  "pipe.modeSendHint": "\u5F53\u524D\uFF1A\u5B8C\u6210\u540E\u81EA\u52A8\u53D1\u9001",
  "pipe.modeDraftHint": "\u5F53\u524D\uFF1A\u53EA\u586B\u5165\u8349\u7A3F",
  "pipe.already": "\u5DF2\u7ECF\u8FDE\u8FC7\u300C{name}\u300D\u4E86",
  "pipe.multi": "\u2192 {n} \u4E2A\u4E0B\u6E38",
  "pipe.noted": "\u7ED3\u679C\u5DF2\u8FFD\u52A0\u5230\u4FBF\u7B7E\u300C{name}\u300D",
  "pipe.noteBlock": "## \u6765\u81EA\u300C{title}\u300D \xB7 {time}\n\n{text}",
  "pipe.noteTarget": "\u6D41\u6C34\u7EBF \u2192 \u4FBF\u7B7E",
  "pipe.noteHint": "\u4E0B\u6E38\u662F\u4FBF\u7B7E\uFF1A\u8DD1\u5B8C\u628A\u7ED3\u679C\u5199\u8FDB\u53BB\uFF0C\u4E0D\u53D1\u9001",
  "pipe.noteAppend": "\u8FFD\u52A0\u5230\u4FBF\u7B7E",
  "pipe.noteAppendHint": "\u6BCF\u8F6E\u90FD\u63A5\u5728\u540E\u9762\uFF0C\u50CF\u65E5\u5FD7",
  "pipe.noteReplace": "\u53EA\u4FDD\u7559\u6700\u65B0\u4E00\u6BB5",
  "pipe.noteReplaceHint": "\u8986\u76D6\u65E7\u5185\u5BB9\uFF0C\u5F53\u6C47\u603B\u680F\u7528",
  "pipe.modeAppend": "\u4FBF\u7B7E\uFF1A\u8FFD\u52A0\u6A21\u5F0F",
  "pipe.modeReplace": "\u4FBF\u7B7E\uFF1A\u53EA\u4FDD\u7559\u6700\u65B0\u4E00\u6BB5",
  "pipe.notedReplaced": "\u5DF2\u8986\u76D6\u4FBF\u7B7E\u300C{name}\u300D\u4E3A\u6700\u65B0\u7ED3\u679C",
  "pipe.removeNote": "\u5220\u9664\u8FD9\u6761\u4FBF\u7B7E\u6D41\u6C34\u7EBF",
  "pipe.port": "\u6309\u4F4F\u62D6\u52A8\u5230\u53E6\u4E00\u5F20\u5361\u4E0A\uFF0C\u5EFA\u7ACB\u6D41\u6C34\u7EBF",
  "pipe.created": "\u6D41\u6C34\u7EBF\u5DF2\u8FDE\u5230\u300C{name}\u300D",
  "pipe.needTarget": "\u62D6\u5230\u53E6\u4E00\u5F20\u5361\uFF08\u4F1A\u8BDD\u5361\u6216\u4FBF\u7B7E\uFF09\u4E0A\u624D\u7B97\u8FDE\u7EBF",
  "pipe.remove": "\u5220\u9664\u8FD9\u6761\u6D41\u6C34\u7EBF",
  "pipe.removed": "\u6D41\u6C34\u7EBF\u5DF2\u5220\u9664",
  "pipe.sendHint": "\u5B8C\u6210\u540E\u81EA\u52A8\u628A\u7ED3\u679C\u53D1\u8FC7\u53BB",
  "pipe.draftHint": "\u53EA\u586B\u8FDB\u4E0B\u6E38\u8F93\u5165\u6846\uFF0C\u7B49\u4EBA\u786E\u8BA4",
  "pipe.modeSend": "\u5DF2\u5207\u5230\uFF1A\u81EA\u52A8\u53D1\u9001",
  "pipe.modeDraft": "\u5DF2\u5207\u5230\uFF1A\u53EA\u586B\u8349\u7A3F",
  "pipe.title": "\u6D41\u6C34\u7EBF\uFF1A\u5B8C\u6210\u540E\u628A\u7ED3\u679C\u9001\u5230\u4E0B\u6E38\u5361",
  "pipe.to": "\u4E0B\u6E38\u5361\u7247",
  "pipe.send": "\u81EA\u52A8\u53D1\u9001\u5230\u4E0B\u6E38",
  "pipe.draft": "\u53EA\u586B\u5165\u4E0B\u6E38\u8349\u7A3F",
  "pipe.off": "\u5173\u95ED\u6D41\u6C34\u7EBF",
  "pipe.active": "\u2192 {name}",
  "pipe.sent": "\u6D41\u6C34\u7EBF\uFF1A\u5DF2\u53D1\u9001\u5230\u300C{name}\u300D",
  "pipe.drafted": "\u6D41\u6C34\u7EBF\uFF1A\u5DF2\u586B\u5165\u300C{name}\u300D\u8349\u7A3F",
  "pipe.none": "\u6CA1\u6709\u53EF\u4EE5\u63A5\u7684\u4E0B\u6E38\u4F1A\u8BDD\u5361",
  "pipe.tooLong": "\u6D41\u6C34\u7EBF\u94FE\u6761\u8FC7\u957F\uFF0C\u5DF2\u505C\u6B62",
  "pipe.failed": "\u6D41\u6C34\u7EBF\u6295\u9012\u5931\u8D25\uFF1A{error}",
  "ref.title": "\u5F15\u7528\u5230\u53E6\u4E00\u5F20\u5361",
  "ref.to": "\u5F15\u7528\u5230\u2026",
  "ref.inserted": "\u5DF2\u63D2\u5165\u5230\u76EE\u6807\u5361\u8F93\u5165\u6846",
  "ref.none": "\u6CA1\u6709\u5176\u5B83\u5361\u7247\u53EF\u4EE5\u5F15\u7528",
  "ref.noTarget": "\u8FD9\u5F20\u5361\u7684\u8F93\u5165\u6846\u5F53\u524D\u4E0D\u53EF\u7528",
  "batch.title": "\u6279\u91CF\u64CD\u4F5C",
  "batch.selected": "\u5DF2\u9009 {n} \u5F20",
  "batch.stack": "\u53E0\u6210\u4E00\u645E",
  "batch.align": "\u5DE6\u5BF9\u9F50",
  "batch.distribute": "\u6A2A\u5411\u94FA\u5F00",
  "batch.close": "\u5173\u95ED\u6240\u9009",
  "batch.clear": "\u53D6\u6D88\u9009\u62E9",
  "batch.stacked": "\u5DF2\u53E0 {n} \u5F20",
  "batch.aligned": "\u5DF2\u5BF9\u9F50",
  "batch.distributed": "\u5DF2\u94FA\u5F00",
  "batch.closed": "\u5DF2\u5173\u95ED {n} \u5F20",
  "arrange.title": "\u6392\u5217\u65B9\u5F0F",
  "arrange.grid": "\u7F51\u683C\u6392\u5217",
  "arrange.workspace": "\u6309\u5DE5\u4F5C\u533A\u6392\u5217",
  "arrange.activity": "\u6309\u6700\u8FD1\u6D3B\u52A8\u6392\u5217",
  "arrange.done": "\u5DF2\u91CD\u65B0\u6392\u5217",
  "workspace.none": "\u65E0\u5DE5\u4F5C\u533A",
  "a11y.canvas": "\u7075\u611F\u5DE5\u4F5C\u53F0\u753B\u5E03\uFF1A\u65B9\u5411\u952E\u5207\u6362\u5361\u7247\uFF0C\u56DE\u8F66\u8FDB\u5165\u8F93\u5165\u6846",
  "a11y.body": "\u4F1A\u8BDD\u6B63\u6587",
  "a11y.focused": "\u5DF2\u805A\u7126\uFF1A{name}",
  "shortcuts.title": "\u952E\u76D8\u5FEB\u6377\u952E",
  "shortcuts.move": "\u65B9\u5411\u952E\uFF1A\u5207\u6362\u5361\u7247 \xB7 Shift+\u65B9\u5411\u952E\uFF1A\u79FB\u52A8\u5361\u7247",
  "shortcuts.act": "\u56DE\u8F66\u8FDB\u5165\u8F93\u5165\u6846 \xB7 O \u6253\u5F00\u539F\u751F \xB7 C \u590D\u5236 \xB7 P \u56FA\u5B9A",
  "shortcuts.find": "/ \u641C\u7D22 \xB7 T \u8F6E\u6B21\u5927\u7EB2 \xB7 [ ] \u4E0A\u4E00\u5F20 / \u4E0B\u4E00\u5F20",
  "shortcuts.leave": "Esc \u56DE\u5230\u753B\u5E03",
  "card.search": "\u5728\u5361\u7247\u5185\u641C\u7D22",
  "card.outline": "\u8F6E\u6B21\u5927\u7EB2",
  "search.placeholder": "\u5728\u5361\u7247\u5185\u641C\u7D22\u2026  \u23CE \u4E0B\u4E00\u4E2A",
  "search.count": "{i}/{n}",
  "search.none": "\u65E0\u5339\u914D",
  "outline.empty": "\u8FD8\u6CA1\u6709\u5DF2\u5B8C\u6210\u7684\u8F6E\u6B21",
  "outline.turn": "\u7B2C {n} \u8F6E",
  "outline.running": "\u8FDB\u884C\u4E2D",
  "outline.notLoaded": "\u8FD9\u4E00\u8F6E\u5DF2\u4E0D\u5728\u5F53\u524D\u52A0\u8F7D\u8303\u56F4\u5185",
  "card.pin": "\u56FA\u5B9A\u4F4D\u7F6E",
  "card.pinned": "\u5DF2\u56FA\u5B9A\uFF0C\u6392\u5217\u65F6\u4E0D\u4F1A\u79FB\u52A8",
  "card.unpinned": "\u5DF2\u53D6\u6D88\u56FA\u5B9A",
  "card.copy": "\u590D\u5236\u4E3A Markdown",
  "card.copied": "\u5DF2\u590D\u5236\u4E3A Markdown",
  "card.copyEmpty": "\u8FD9\u5F20\u5361\u8FD8\u6CA1\u6709\u5185\u5BB9",
  "card.copyFailed": "\u590D\u5236\u5931\u8D25",
  "card.approvalCancelled": "\u5361\u7247\u5DF2\u79FB\u9664\uFF0C\u672A\u5904\u7406\u7684\u5BA1\u6279\u5DF2\u53D6\u6D88",
  "note.add": "\u4FBF\u7B7E",
  "note.added": "\u5DF2\u6DFB\u52A0\u4FBF\u7B7E\u5361",
  "note.title": "\u4FBF\u7B7E",
  "note.placeholder": "\u968F\u624B\u8BB0\u70B9\u4EC0\u4E48\u2026",
  "settings.chainWheel": "\u6EDA\u5230\u5361\u7247\u4E24\u7AEF\u65F6\u5E26\u52A8\u753B\u5E03",
  "settings.size.compact": "\u7D27\u51D1",
  "settings.size.normal": "\u6807\u51C6",
  "settings.size.wide": "\u5BBD",
  "settings.export": "\u5BFC\u51FA\u5E03\u5C40",
  "settings.import": "\u5BFC\u5165\u5E03\u5C40",
  "settings.reset": "\u91CD\u7F6E",
  "settings.exported": "\u5E03\u5C40\u5DF2\u5BFC\u51FA",
  "settings.imported": "\u5E03\u5C40\u5DF2\u5BFC\u5165",
  "settings.resetDone": "\u5DE5\u4F5C\u53F0\u5DF2\u91CD\u7F6E",
  "settings.exportFailed": "\u5BFC\u51FA\u5931\u8D25",
  "settings.importFailed": "\u5BFC\u5165\u5931\u8D25",
  "settings.importInvalid": "\u8FD9\u4E0D\u662F\u6709\u6548\u7684\u5E03\u5C40\u6587\u4EF6",
  "sync.restored": "\u5DF2\u4ECE Host \u6062\u590D\u5E03\u5C40",
  "sync.applied": "\u5E03\u5C40\u5DF2\u5728\u5176\u5B83\u7A97\u53E3\u66F4\u65B0\uFF0C\u5DF2\u540C\u6B65",
  "unsupported.title": "\u8FD9\u4E2A\u7248\u672C\u6682\u65F6\u7528\u4E0D\u4E86\u7075\u611F\u5DE5\u4F5C\u53F0",
  "unsupported.body": "\u5F53\u524D DSH \u7F3A\u5C11\u63D2\u4EF6\u4F9D\u8D56\u7684\u4F1A\u8BDD\u670D\u52A1\u3002\u8BF7\u5347\u7EA7\u5230 0.2.1-rc.5 \u6216\u66F4\u9AD8\u7248\u672C\u3002",
  "failure.taskStopped": "\u4EFB\u52A1\u5DF2\u505C\u6B62",
  "failure.stopped": "\u5DF2\u505C\u6B62",
  "failure.turnError": "\u672C\u8F6E\u8FD0\u884C\u5931\u8D25",
  "failure.maxTokens": "\u5DF2\u8FBE\u5230\u8F93\u51FA token \u4E0A\u9650",
  "failure.interrupted": "DSH \u8FDB\u7A0B\u5728\u672C\u8F6E\u5B8C\u6210\u524D\u9000\u51FA\uFF08\u4F8B\u5982\u88AB\u5F3A\u5236\u7ED3\u675F\u3001\u5D29\u6E83\u6216\u5173\u95ED\u8D85\u65F6\uFF09\uFF0C\u91CD\u65B0\u542F\u52A8\u540E\u672C\u8F6E\u5DF2\u4E2D\u6B62\u3002\u672A\u5B8C\u6210\u7684\u5DE5\u5177\u8C03\u7528\u7ED3\u679C\u672A\u77E5\u3002",
  "model.effortTitle": "\u601D\u8003\u5F3A\u5EA6 \xB7 {name}",
  "model.effortRow": "\u601D\u8003\u5F3A\u5EA6",
  "model.effortCurrent": "\u5F53\u524D \xB7 {name}",
  "model.effortCount": "{n} \u6863\u5F3A\u5EA6",
  "model.effortDefault": "\u9ED8\u8BA4\u5F3A\u5EA6",
  "model.back": "\u8FD4\u56DE\u6A21\u578B",
  "question.title": "\u9700\u8981\u4F60\u786E\u8BA4",
  "answer.submit": "\u63D0\u4EA4",
  "answer.custom": "\u6216\u8F93\u5165\u81EA\u5B9A\u4E49\u7B54\u6848",
  "answer.openNative": "\u53BB\u539F\u751F\u4F1A\u8BDD\u56DE\u7B54",
  "answer.submitted": "\u5DF2\u63D0\u4EA4\u56DE\u7B54",
  "answer.failed": "\u63D0\u4EA4\u56DE\u7B54\u5931\u8D25",
  "workspace.pick": "\u9009\u62E9\u5DE5\u4F5C\u533A",
  "workspace.untitled": "\u672A\u547D\u540D\u5DE5\u4F5C\u533A",
  "workspace.label": "\u5DE5\u4F5C\u533A\uFF1A",
  settings: "\u8BBE\u7F6E",
  "settings.inlineApprovals": "\u5728\u5361\u7247\u5185\u5904\u7406\u5BA1\u6279\uFF08\u5B9E\u9A8C\uFF09",
  "settings.inlineApprovalsHint": "\u53EA\u5728\u539F\u751F\u5BF9\u8BDD\u9762\u677F\u6CA1\u6253\u5F00\u65F6\u63A5\u7BA1\uFF1B\u5176\u5B83\u60C5\u51B5\u4E00\u5F8B\u4EA4\u7ED9\u539F\u751F\u5904\u7406\u3002",
  "settings.approvalsOn": "\u5DF2\u5F00\u542F\u5361\u7247\u5185\u5BA1\u6279",
  "approval.escalation": "\u5DE5\u5177 {name} \u8BF7\u6C42\u8D8A\u6743\u6267\u884C",
  "approval.requested": "\u6709\u64CD\u4F5C\u5728\u7B49\u5F85\u4F60\u7684\u5BA1\u6279",
  "approval.platformLimit": "\u8FD9\u4E00\u7248\u7684\u63D2\u4EF6\u62FF\u4E0D\u5230\u5BA1\u6279\u8BF7\u6C42\uFF1A\u5BA1\u6279\u53EA\u5728\u539F\u751F\u4F1A\u8BDD\u9875\u5904\u7406\u3002\u5EFA\u8BAE\u628A\u8BBF\u95EE\u6A21\u5F0F\u5207\u5230\u300C\u5DE5\u4F5C\u533A\u5185\u4FEE\u6539\u300D\uFF0C\u8BA9\u6C99\u7BB1\u76F4\u63A5\u62D2\u7EDD\u800C\u4E0D\u662F\u7B49\u4EBA\u5BA1\u6279\u3002",
  "approval.reject": "\u62D2\u7EDD",
  "approval.allowOnce": "\u5141\u8BB8\u4E00\u6B21",
  "approval.waiting": "\u7B49\u5F85\u5BA1\u6279",
  "approval.tool": "\u5DE5\u5177\uFF1A{name}",
  "approval.unknown": "\u6709\u64CD\u4F5C\u5728\u7B49\u5F85\u4F60\u7684\u6388\u6743",
  "approval.openNative": "\u53BB\u539F\u751F\u4F1A\u8BDD\u5904\u7406",
  "code.copy": "\u590D\u5236",
  "code.copied": "\u5DF2\u590D\u5236",
  "turn.meta": "\u672C\u8F6E\u6982\u51B5",
  "turn.toolCalls": "{n} \u6B21\u5DE5\u5177\u8C03\u7528",
  "turn.messages": "{n} \u6761\u6D88\u606F",
  "turn.noMeta": "\u6CA1\u6709\u66F4\u591A\u4FE1\u606F",
  "turn.worked": "\u5DF2\u5B8C\u6210",
  "turn.failed": "\u5904\u7406\u5931\u8D25",
  "turn.used": "\u7528\u65F6 ",
  "turn.done": "\u5DF2\u5B8C\u6210",
  "duration.seconds": "{n}\u79D2",
  "duration.minutes": "{m}\u5206",
  "duration.minutesSeconds": "{m}\u5206{s}\u79D2",
  "duration.hoursMinutes": "{h}\u5C0F\u65F6{m}\u5206",
  "step.joinTwo": "{first}\u5E76{second}",
  "step.sharedPrefix": "\u5DF2",
  "step.more": "{title}\u7B49",
  "step.thinking": "\u5DF2\u5B8C\u6210\u5206\u6790",
  "stepRunning.thinking": "\u6B63\u5728\u5206\u6790\u8BF7\u6C42",
  "step.joinMany": "\uFF0C",
  "step.tools": "\u5DF2\u8C03\u7528\u5DE5\u5177",
  "step.read": "\u5DF2\u8BFB\u53D6\u6587\u4EF6",
  "step.readImage": "\u5DF2\u8BFB\u53D6\u56FE\u7247",
  "step.write": "\u5DF2\u5199\u5165\u6587\u4EF6",
  "step.search": "\u5DF2\u641C\u7D22\u4EE3\u7801",
  "step.edit": "\u4FEE\u6539\u4E86\u6587\u4EF6",
  "step.commands": "\u6267\u884C\u4E86\u547D\u4EE4",
  "step.code": "\u8FD0\u884C\u4E86\u4EE3\u7801",
  "step.webSearch": "\u5DF2\u641C\u7D22\u7F51\u9875",
  "step.webFetch": "\u5DF2\u8BBF\u95EE\u7F51\u9875",
  "step.subagents": "\u5DF2\u534F\u8C03\u5B50\u667A\u80FD\u4F53",
  "step.plan": "\u66F4\u65B0\u4E86\u8BA1\u5212",
  "step.questions": "\u5411\u7528\u6237\u63D0\u51FA\u4E86\u95EE\u9898",
  "stepRunning.tools": "\u6B63\u5728\u8C03\u7528\u5DE5\u5177",
  "stepRunning.read": "\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6",
  "stepRunning.readImage": "\u6B63\u5728\u8BFB\u53D6\u56FE\u7247",
  "stepRunning.write": "\u6B63\u5728\u5199\u5165\u6587\u4EF6",
  "stepRunning.search": "\u6B63\u5728\u641C\u7D22\u4EE3\u7801",
  "stepRunning.edit": "\u6B63\u5728\u7F16\u8F91\u6587\u4EF6",
  "stepRunning.commands": "\u6B63\u5728\u8FD0\u884C\u547D\u4EE4",
  "stepRunning.code": "\u6B63\u5728\u8FD0\u884C\u4EE3\u7801",
  "stepRunning.webSearch": "\u6B63\u5728\u641C\u7D22\u7F51\u9875",
  "stepRunning.webFetch": "\u6B63\u5728\u8BBF\u95EE\u7F51\u9875",
  "stepRunning.subagents": "\u6B63\u5728\u534F\u8C03\u5B50\u667A\u80FD\u4F53",
  "stepRunning.plan": "\u6B63\u5728\u66F4\u65B0\u8BA1\u5212",
  "stepRunning.questions": "\u7B49\u5F85\u4F60\u7684\u64CD\u4F5C"
};
var en = {
  "panel.label": "Inspiration workbench",
  title: "Inspiration workbench",
  new: "New conversation card",
  arrange: "Arrange",
  canvas: "Canvas",
  "canvas.title": "Canvas",
  "canvas.active": "Current canvas: {name}",
  "canvas.current": "Current: {name}",
  "canvas.unsaved": "This canvas is not saved yet",
  "canvas.placeholder": "Name this canvas",
  "canvas.save": "Save",
  "canvas.overwrite": "Overwrite \u201C{name}\u201D",
  "canvas.meta": "{n} cards \xB7 {time}",
  "canvas.none": "No saved canvases yet",
  "canvas.saved": "Saved canvas \u201C{name}\u201D",
  "canvas.updated": "Updated canvas \u201C{name}\u201D",
  "canvas.switched": "Switched to \u201C{name}\u201D",
  "canvas.deleted": "Deleted canvas \u201C{name}\u201D",
  "canvas.delete": "Delete this canvas",
  "canvas.nameRequired": "Give the canvas a name first",
  "canvas.broken": "That canvas could not be read",
  "card.more": "More actions",
  "card.unpin": "Unpin",
  boardMode: "Board",
  "board.title": "Group into columns",
  "board.byStatus": "By status",
  "board.byWorkspace": "By workspace",
  "board.byActivity": "By recent activity",
  "board.exit": "Exit board (restore positions)",
  "board.applied": "Switched: {name}",
  "board.state.running": "Running",
  "board.state.waiting": "Needs you",
  "board.state.unread": "New result",
  "board.state.idle": "Idle",
  "board.activity.fresh": "Just now",
  "board.activity.hour": "Within an hour",
  "board.activity.stale": "Older",
  fit: "Fit",
  "hint.pan": "Drag empty space to pan",
  "hint.zoom": "zoom",
  "hint.zoomKey": "wheel",
  "count.cards": "{n} cards",
  "count.running": "{n} running",
  "empty.title": "No cards yet",
  "empty.sub": "Hover a conversation in the sidebar list and press \u201C+\u201D to drop it onto this canvas.",
  "empty.card": "This conversation has no content yet",
  "empty.loading": "Opening conversation\u2026",
  untitled: "Untitled conversation",
  loadOlder: "Load older",
  "attach.button": "Add image or file",
  "attach.remove": "Remove attachment",
  "attach.image": "Image",
  "attach.file": "File",
  "attach.uploading": "Attachments are still uploading",
  "attach.failed": "Could not add the attachment",
  "attach.failedShort": "Upload failed",
  "attach.unsupported": "Attachments are not supported on this build",
  "composer.steerHint": "Enter queues; Cmd/Ctrl+Enter steers",
  "queue.steer": "Steer",
  "queue.steerUnavailable": "Steering needs a running turn",
  "queue.steerFailed": "Could not steer; please retry.",
  "queue.count": "{n} queued message(s)",
  "queue.remove": "Remove queued message",
  "queue.removeFailed": "Could not remove: this message may already be sending.",
  "queue.attachment": "[attachment]",
  "status.waitingApproval": "Waiting for approval",
  "status.waitingAnswer": "Waiting for answer",
  "status.queued": "{n} queued",
  "state.running": "Running",
  "state.idle": "Idle",
  stacked: "stack {n}",
  detach: "Pull out of this stack",
  openNative: "Open in the native conversation",
  remove: "Remove from workbench",
  "toast.stacked": "Stacked \xB7 click any card to bring it to the top",
  "composer.idle": "Continue\u2026  \u23CE to send",
  "composer.busy": "Running\u2026 queue or stop",
  "composer.label": "Message this conversation card",
  send: "Send",
  stop: "Stop",
  "tool.running": "running",
  "tool.done": "done",
  "tool.error": "failed",
  "error.open": "This conversation could not be opened; it may be archived.",
  "error.read": "Reading this conversation failed.",
  "error.send": "Send failed",
  "error.stop": "Stop failed",
  "error.new": "Could not create a conversation",
  "row.add": "Open in the inspiration workbench",
  "tool.toggle": "Expand or collapse details",
  "tool.args": "Arguments",
  "tool.output": "Result",
  "tool.errorOutput": "Error",
  "tool.waiting": "Waiting for output\u2026",
  "tool.noOutput": "No output",
  "model.switch": "Switch model",
  "model.switchTitle": "Choose a model",
  "model.loading": "Loading model catalog\u2026",
  "model.error": "Could not switch the model",
  "model.empty": "No models available",
  "model.switched": "Switched to {name}",
  "board.collapseAll": "Collapse work",
  "board.expandAll": "Expand work",
  "board.collapsedAll": "All work details collapsed",
  "board.expandedAll": "All work details expanded",
  "todo.approval": "{n} awaiting approval",
  "todo.question": "{n} awaiting answer",
  "todo.queued": "{n} queued",
  "todo.title": "Jump to the next card that needs you",
  "transcript.truncated": "Older content is not loaded (this card keeps the latest {n} entries)",
  "transcript.user": "Me",
  "attach.retry": "Retry",
  "pipe.linked": "Pipeline points at \u201C{name}\u201D",
  "pipe.modeSendHint": "Currently: auto-send on completion",
  "pipe.modeDraftHint": "Currently: draft only",
  "pipe.already": "\u201C{name}\u201D is already connected",
  "pipe.multi": "\u2192 {n} downstream",
  "pipe.noted": "Result appended to note \u201C{name}\u201D",
  "pipe.noteBlock": "## From \u201C{title}\u201D \xB7 {time}\n\n{text}",
  "pipe.noteTarget": "Pipeline \u2192 note",
  "pipe.noteHint": "Note downstream: the result is written into the note, never sent",
  "pipe.noteAppend": "Append to the note",
  "pipe.noteAppendHint": "Keep every run, like a log",
  "pipe.noteReplace": "Keep only the latest",
  "pipe.noteReplaceHint": "Overwrite, for a summary pane",
  "pipe.modeAppend": "Note: append mode",
  "pipe.modeReplace": "Note: keep only the latest",
  "pipe.notedReplaced": "Note \u201C{name}\u201D replaced with the latest result",
  "pipe.removeNote": "Remove this note pipeline",
  "pipe.port": "Drag onto another card to wire a pipeline",
  "pipe.created": "Pipeline wired to \u201C{name}\u201D",
  "pipe.needTarget": "Drop it on another card (session or note) to connect",
  "pipe.remove": "Remove this pipeline",
  "pipe.removed": "Pipeline removed",
  "pipe.sendHint": "Send the result downstream when the turn finishes",
  "pipe.draftHint": "Only fill the downstream composer",
  "pipe.modeSend": "Mode: auto-send",
  "pipe.modeDraft": "Mode: draft only",
  "pipe.title": "Pipeline: forward this card's result downstream",
  "pipe.to": "Downstream card",
  "pipe.send": "Auto-send downstream",
  "pipe.draft": "Fill downstream draft only",
  "pipe.off": "Turn pipeline off",
  "pipe.active": "\u2192 {name}",
  "pipe.sent": "Pipeline: sent to \u201C{name}\u201D",
  "pipe.drafted": "Pipeline: filled \u201C{name}\u201D draft",
  "pipe.none": "No downstream session card available",
  "pipe.tooLong": "Pipeline chain is too long, stopped",
  "pipe.failed": "Pipeline delivery failed: {error}",
  "ref.title": "Quote into another card",
  "ref.to": "Quote into\u2026",
  "ref.inserted": "Inserted into the target composer",
  "ref.none": "No other card to quote into",
  "ref.noTarget": "That card has no usable input right now",
  "batch.title": "Batch actions",
  "batch.selected": "{n} selected",
  "batch.stack": "Stack",
  "batch.align": "Align",
  "batch.distribute": "Spread",
  "batch.close": "Close selected",
  "batch.clear": "Clear selection",
  "batch.stacked": "Stacked {n} cards",
  "batch.aligned": "Aligned",
  "batch.distributed": "Spread out",
  "batch.closed": "Closed {n} cards",
  "arrange.title": "Arrange by",
  "arrange.grid": "Grid",
  "arrange.workspace": "Workspace",
  "arrange.activity": "Recent activity",
  "arrange.done": "Rearranged",
  "workspace.none": "No workspace",
  "a11y.canvas": "Workbench canvas: arrow keys move between cards, Enter focuses the composer",
  "a11y.body": "Conversation transcript",
  "a11y.focused": "Focused: {name}",
  "shortcuts.title": "Keyboard shortcuts",
  "shortcuts.move": "Arrows switch cards \xB7 Shift+Arrows move the card",
  "shortcuts.act": "Enter focuses the composer \xB7 O open native \xB7 C copy \xB7 P pin",
  "shortcuts.find": "/ search \xB7 T outline \xB7 [ ] previous / next card",
  "shortcuts.leave": "Esc returns to the canvas",
  "card.search": "Search this card",
  "card.outline": "Turn outline",
  "search.placeholder": "Search in this card\u2026  \u23CE next",
  "search.count": "{i}/{n}",
  "search.none": "No match",
  "outline.empty": "No completed turns yet",
  "outline.turn": "Turn {n}",
  "outline.running": "Running",
  "outline.notLoaded": "That turn is outside the loaded range",
  "card.pin": "Pin position",
  "card.pinned": "Pinned: arranging will not move it",
  "card.unpinned": "Unpinned",
  "card.copy": "Copy as Markdown",
  "card.copied": "Copied as Markdown",
  "card.copyEmpty": "This card has no content yet",
  "card.copyFailed": "Copy failed",
  "card.approvalCancelled": "Card removed; its pending approval was cancelled",
  "note.add": "Note",
  "note.added": "Note card added",
  "note.title": "Note",
  "note.placeholder": "Jot something down\u2026",
  "settings.chainWheel": "Pan the canvas when a card reaches its end",
  "settings.size.compact": "Compact",
  "settings.size.normal": "Standard",
  "settings.size.wide": "Wide",
  "settings.export": "Export layout",
  "settings.import": "Import layout",
  "settings.reset": "Reset",
  "settings.exported": "Layout exported",
  "settings.imported": "Layout imported",
  "settings.resetDone": "Workbench reset",
  "settings.exportFailed": "Export failed",
  "settings.importFailed": "Import failed",
  "settings.importInvalid": "That file is not a layout export",
  "sync.restored": "Layout restored from the Host",
  "sync.applied": "Layout updated from another window",
  "unsupported.title": "The workbench cannot run on this build",
  "unsupported.body": "This DSH build is missing the session services the plugin needs. Update to 0.2.1-rc.5 or newer.",
  "failure.taskStopped": "Task stopped",
  "failure.stopped": "Stopped",
  "failure.turnError": "This turn failed",
  "failure.maxTokens": "Output token limit reached",
  "failure.interrupted": "The DSH process exited before this turn finished (for example, it was killed, crashed, or timed out while shutting down), so the turn was closed when DSH restarted. Unfinished tool calls have unknown outcomes.",
  "model.effortTitle": "Thinking effort \xB7 {name}",
  "model.effortRow": "Thinking effort",
  "model.effortCurrent": "Current \xB7 {name}",
  "model.effortCount": "{n} levels",
  "model.effortDefault": "Default effort",
  "model.back": "Back to models",
  "question.title": "Waiting for you",
  "answer.submit": "Submit",
  "answer.custom": "Or type a custom answer",
  "answer.openNative": "Answer in the native conversation",
  "answer.submitted": "Answer submitted",
  "answer.failed": "Could not submit the answer",
  "workspace.pick": "Choose a workspace",
  "workspace.untitled": "Untitled workspace",
  "workspace.label": "Workspace: ",
  settings: "Settings",
  "settings.inlineApprovals": "Handle approvals inside cards (experimental)",
  "settings.inlineApprovalsHint": "Only takes over while the native conversation is closed; everything else stays with the native UI.",
  "settings.approvalsOn": "Inline approvals enabled",
  "approval.escalation": "Tool {name} requests privileged execution",
  "approval.requested": "An action is waiting for your approval",
  "approval.platformLimit": "This build does not deliver approval requests to plugins; approvals are handled on the native conversation page only. Prefer the \u201Cworkspace write\u201D access mode so the sandbox denies instead of waiting for a human.",
  "approval.reject": "Reject",
  "approval.allowOnce": "Allow once",
  "approval.waiting": "Waiting for approval",
  "approval.tool": "Tool: {name}",
  "approval.unknown": "An action is waiting for your approval",
  "approval.openNative": "Handle it in the native conversation",
  "code.copy": "Copy",
  "code.copied": "Copied",
  "turn.meta": "Turn summary",
  "turn.toolCalls": "{n} tool calls",
  "turn.messages": "{n} messages",
  "turn.noMeta": "No further detail",
  "turn.worked": "Completed",
  "turn.failed": "Failed",
  "turn.used": "in ",
  "turn.done": "Finished",
  "duration.seconds": "{n}s",
  "duration.minutes": "{m}m",
  "duration.minutesSeconds": "{m}m {s}s",
  "duration.hoursMinutes": "{h}h {m}m",
  "step.joinTwo": "{first} and {second}",
  "step.sharedPrefix": "",
  "step.more": "{title}, etc.",
  "step.thinking": "Completed analysis",
  "stepRunning.thinking": "Analyzing the request",
  "step.joinMany": ", ",
  "step.tools": "Called tools",
  "step.read": "Read files",
  "step.readImage": "Read images",
  "step.write": "Wrote files",
  "step.search": "Searched code",
  "step.edit": "Edited files",
  "step.commands": "Ran commands",
  "step.code": "Ran code",
  "step.webSearch": "Searched the web",
  "step.webFetch": "Fetched pages",
  "step.subagents": "Coordinated subagents",
  "step.plan": "Updated the plan",
  "step.questions": "Asked you a question",
  "stepRunning.tools": "Calling tools",
  "stepRunning.read": "Reading files",
  "stepRunning.readImage": "Reading images",
  "stepRunning.write": "Writing files",
  "stepRunning.search": "Searching code",
  "stepRunning.edit": "Editing files",
  "stepRunning.commands": "Running commands",
  "stepRunning.code": "Running code",
  "stepRunning.webSearch": "Searching the web",
  "stepRunning.webFetch": "Fetching pages",
  "stepRunning.subagents": "Coordinating subagents",
  "stepRunning.plan": "Updating the plan",
  "stepRunning.questions": "Waiting for you"
};
var runtime = {
  ctx: void 0,
  adapter: void 0,
  translate: void 0,
  board: void 0,
  pending: []
};
function t(key) {
  if (runtime.translate) {
    const value = runtime.translate(key);
    if (typeof value === "string" && value && value !== key) return value;
  }
  return zh[key] || key;
}
function svgIcon(size) {
  const edge = typeof size === "number" ? size : 16;
  return import_react.default.createElement(
    "svg",
    { width: edge, height: edge, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 1.8, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
    import_react.default.createElement("rect", { x: 3, y: 3, width: 8, height: 8, rx: 2 }),
    import_react.default.createElement("rect", { x: 13, y: 3, width: 8, height: 8, rx: 2 }),
    import_react.default.createElement("rect", { x: 3, y: 13, width: 8, height: 8, rx: 2 }),
    import_react.default.createElement("rect", { x: 13, y: 13, width: 8, height: 8, rx: 2 })
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
    runtime.ctx?.get?.("layout")?.selectPanel?.(PANEL_ID);
  } catch {
  }
}
function RowAction(props) {
  const label = t("row.add");
  return import_react.default.createElement(
    "button",
    {
      type: "button",
      className: "iwb-row-action",
      title: label,
      "aria-label": label,
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        queueOrAdd(props?.sessionId, props?.displayTitle);
      }
    },
    import_react.default.createElement(
      "svg",
      { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "aria-hidden": "true" },
      import_react.default.createElement("path", { d: "M12 5v14M5 12h14" })
    )
  );
}
function openInNative(sessionId) {
  try {
    runtime.ctx?.get?.("uiWorkspace")?.openSession?.(sessionId);
  } catch {
  }
  try {
    runtime.ctx?.get?.("layout")?.selectPanel?.("conversation");
  } catch {
  }
}
function UnsupportedPanel() {
  return import_react.default.createElement(
    "div",
    { className: "iwb-unsupported" },
    import_react.default.createElement("div", { className: "iwb-unsupported-title" }, t("unsupported.title")),
    import_react.default.createElement("div", { className: "iwb-unsupported-body" }, runtime.adapterError || t("unsupported.body"))
  );
}
var approvalHub = createApprovalHub();
function WorkbenchPanel() {
  if (!runtime.adapter) return import_react.default.createElement(UnsupportedPanel);
  const hostRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const host = hostRef.current;
    if (!host) return void 0;
    const board = createBoard({
      host,
      adapter: runtime.adapter,
      approvals: approvalHub,
      t,
      onOpenSession: openInNative
    });
    runtime.board = board;
    board.restore();
    while (runtime.pending.length) {
      const item = runtime.pending.shift();
      board.addSession(item);
    }
    return () => {
      if (runtime.board === board) runtime.board = void 0;
      try {
        board.dispose();
      } catch (error) {
        console.error("[inspiration-workbench] unmount cleanup failed", error);
      }
    };
  }, []);
  return import_react.default.createElement("div", { ref: hostRef, style: { height: "100%", minHeight: 0 } });
}
var inject = ["slots", "locale", "sessions", "layout", "uiWorkspace", "remote", "remote.session", "workspaces", "conversation"];
async function apply(ctx) {
  runtime.ctx = ctx;
  let styleNode = document.querySelector('style[data-iwb="1"]');
  if (!styleNode) {
    styleNode = document.createElement("style");
    styleNode.dataset.iwb = "1";
    document.head.appendChild(styleNode);
  }
  styleNode.textContent = styles_default + "\n" + task_view_default;
  const locale = ctx.get?.("locale") ?? ctx.locale;
  if (locale?.register) {
    ctx.effect(() => locale.register(LOCALE_NS, { zh, en }), "inspiration-workbench: locale");
    const translate = locale.bind(LOCALE_NS);
    runtime.translate = (key) => translate(key);
  }
  try {
    runtime.adapter = createSessionsAdapter(ctx);
  } catch (error) {
    runtime.adapter = void 0;
    runtime.adapterError = error instanceof Error ? error.message : String(error);
  }
  ctx.effect(() => ctx.slots.inject("main", () => ctx.slots.register({ name: "main", key: PANEL_ID }, WorkbenchPanel)), "inspiration-workbench: panel");
  ctx.effect(
    () => ctx.slots.inject(
      "sidebar.panellist",
      () => ctx.slots.register(
        { name: "sidebar.panellist", id: PANEL_ID, order: 30, label: () => runtime.translate?.("panel.label") ?? "\u7075\u611F\u5DE5\u4F5C\u53F0" },
        PanelIcon
      )
    ),
    "inspiration-workbench: panel list"
  );
  ctx.effect(
    () => ctx.slots.inject(
      "sidebar.workspaces.session.row.action",
      () => ctx.slots.register({ name: "sidebar.workspaces.session.row.action", id: ROW_ACTION_ID, order: 50 }, RowAction)
    ),
    "inspiration-workbench: session row action"
  );
  ctx.effect(
    () => () => {
      approvalHub.setEnabled(false);
      runtime.adapter?.dispose?.();
      runtime.adapter = void 0;
      runtime.ctx = void 0;
      styleNode?.remove();
    },
    "inspiration-workbench: teardown"
  );
}
return module.exports;
}});
//# sourceMappingURL=client.js.map
