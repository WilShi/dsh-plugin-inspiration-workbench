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
@media (max-width: 1180px) { .iwb-hint { display: none; } }

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
  fill: none; stroke: var(--dsw-alias-label-deep-diving); stroke-width: 1.6;
  opacity: .55; pointer-events: stroke; cursor: pointer;
}
.iwb-links path.iwb-link:hover { opacity: .95; stroke-width: 2; }
.iwb-links path.iwb-link-hit { fill: none; stroke: transparent; stroke-width: 14; pointer-events: stroke; cursor: pointer; }
.iwb-links path.iwb-link-temp { fill: none; stroke: var(--dsw-alias-label-deep-diving); stroke-width: 2; stroke-dasharray: 5 4; opacity: .9; }
.iwb-port {
  position: absolute; right: -5px; top: 33px; width: 12px; height: 12px;
  border-radius: 50%; border: 1.5px solid var(--dsw-alias-label-deep-diving);
  background: var(--dsw-alias-bg-layer-1); cursor: crosshair;
  opacity: .55; transition: opacity .12s, transform .12s; z-index: 3;
}
.iwb-card:hover .iwb-port, .iwb-card.iwb-focus .iwb-port, .iwb-port:hover { opacity: 1; }
.iwb-port::after {
  content: "\u2192"; position: absolute; inset: 0; display: grid; place-items: center;
  font-size: 8px; line-height: 1; color: var(--dsw-alias-label-deep-diving);
}
.iwb-card.iwb-link-target { outline: 2px dashed var(--dsw-alias-label-deep-diving); outline-offset: 3px; }
.iwb-card-note.iwb-link-target { outline-style: solid; }
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
/* The batch bar owns the bottom edge; lift toasts above it while it is visible. */
.iwb-batch:not([hidden]) ~ .iwb-toast { bottom: 62px; }
`;

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
  function appendInline(parent, text) {
    const pattern = /(`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]*\]\([^)\s]+\))/g;
    let last = 0;
    let match;
    while (match = pattern.exec(text)) {
      if (match.index > last) parent.appendChild(document.createTextNode(text.slice(last, match.index)));
      const token = match[0];
      if (token.startsWith("`")) {
        const code = el("code", "iwb-md-code");
        code.textContent = token.slice(1, -1);
        parent.appendChild(code);
      } else if (token.startsWith("**") || token.startsWith("__")) {
        const strong = document.createElement("strong");
        appendInline(strong, token.slice(2, -2));
        parent.appendChild(strong);
      } else if (token.startsWith("~~")) {
        const strike = document.createElement("s");
        appendInline(strike, token.slice(2, -2));
        parent.appendChild(strike);
      } else if (token.startsWith("[")) {
        const split = token.match(/^\[([^\]]*)\]\(([^)\s]+)\)$/);
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
          parent.appendChild(document.createTextNode(split ? split[1] : token));
        }
      } else {
        const em = document.createElement("em");
        appendInline(em, token.slice(1, -1));
        parent.appendChild(em);
      }
      last = pattern.lastIndex;
    }
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
  }
  function appendParagraph(parent, text) {
    const node = el("div", "iwb-md-p");
    const lines = text.split("\n");
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
  function appendMarkdownLite(parent, text) {
    const lines = String(text || "").split(/\r?\n/);
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
      const text = el2("div", "iwb-question-text");
      text.textContent = item.question || "";
      block.appendChild(text);
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
    const answerable2 = approvals.some((approval) => canAnswerApproval?.(card.sessionId, approval.id));
    if (answerable2) {
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
        const text = el2("div", "iwb-msg-text");
        text.textContent = item.text;
        node2.appendChild(text);
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
    const text = transcriptMarkdown(card);
    if (!text) {
      toast(t2("card.copyEmpty"));
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
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
  function highlight2(root, term, hits) {
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
      const text = node.nodeValue;
      const lower = text.toLowerCase();
      let index = lower.indexOf(needle);
      if (index < 0) continue;
      const frag = document.createDocumentFragment();
      let cursor = 0;
      while (index >= 0) {
        if (index > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, index)));
        const mark = el2("mark", "iwb-hit");
        mark.textContent = text.slice(index, index + needle.length);
        frag.appendChild(mark);
        hits.push(mark);
        cursor = index + needle.length;
        index = lower.indexOf(needle, cursor);
      }
      if (cursor < text.length) frag.appendChild(document.createTextNode(text.slice(cursor)));
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
    highlight2(body, term, hits);
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
  function quoteText(text, title) {
    const collapsed = String(text || "").replace(/\r/g, "").trim();
    const clipped = collapsed.length > 600 ? collapsed.slice(0, 600).trimEnd() + " \u2026" : collapsed;
    const quoted = clipped.split("\n").map((line) => "> " + line).join("\n");
    return "> \u300C" + title + "\u300D\n" + quoted + "\n\n";
  }
  function insertQuote(target, text, sourceTitle) {
    const field = target.kind === "note" ? target.el.querySelector(".iwb-note-input") : target.el.querySelector(".iwb-foot textarea");
    if (!field) {
      toast(t2("ref.noTarget"));
      return false;
    }
    const block = quoteText(text, sourceTitle);
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
  function openRefPicker(anchor, source, text) {
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
        insertQuote(target, text, source.title || t2("untitled"));
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
      void createCardIn(null);
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
      reset();
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
    settings: { inlineApprovals: false, chainWheel: true },
    selected: /* @__PURE__ */ new Set(),
    zTop: 20,
    focusedId: null,
    savedView: false,
    board: { active: false, key: "status", saved: /* @__PURE__ */ new Map() },
    canvases: [],
    activeCanvas: null
  };
  const expandedTurns = /* @__PURE__ */ new Map();
  const tools = createCardTools({ t: t2, el, toast, ensureVisible, state });
  const {
    copyTranscript,
    openSearch,
    toggleSearch,
    runSearch,
    stepSearch,
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
    openRefPicker: (anchor, source, text) => tools.openRefPicker(anchor, source, text),
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
  actions.append(todoBar, btnNew, btnNote, btnCanvas, btnArrange, btnBoard, btnFit, btnCollapse, btnSettings);
  toolbar.append(titles, hint, actions);
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
    resetLayout: () => reset2(),
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
  function toast(text) {
    toastNode.textContent = text;
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
    const wrap = el("div", "iwb-note");
    const area = document.createElement("textarea");
    area.className = "iwb-note-input";
    area.value = card.note || "";
    area.placeholder = t2("note.placeholder");
    area.addEventListener("input", () => {
      card.note = area.value;
      saveSoon();
    });
    wrap.appendChild(area);
    body.appendChild(wrap);
  }
  function addNote({ id, note, title, x, y, w, h, focus }) {
    if (disposed) return null;
    const slot = nextSlot();
    const card = {
      id: id || "n" + ++state.seq,
      kind: "note",
      note: note || "",
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
  function addSession({ sessionId, title, workspace, x, y, w, h, focus, pipeline }) {
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
      running: false,
      startedAt: 0,
      composerDraft: "",
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
    node.appendChild(el("span", "iwb-port"));
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
    if (!target) return;
    if (state.activeCanvas && state.activeCanvas !== id) {
      const current = syncCanvases().find((canvas2) => canvas2.id === state.activeCanvas);
      if (current) {
        current.layout = layoutPayload();
        current.savedAt = Date.now();
      }
    }
    state.activeCanvas = id;
    storeCanvases();
    closeCanvasMenu();
    try {
      applyLayout(target.layout, { toast: t2("canvas.switched").replace("{name}", target.name) });
      save();
      void fitView();
    } catch {
      toast(t2("canvas.broken"));
    }
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
        switchCanvas(canvas2.id);
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
  function addPipeTarget(card, targetCard) {
    const kind = targetCard.kind === "note" ? "note" : "session";
    const id = kind === "note" ? targetCard.id : targetCard.sessionId;
    if (!id || targetCard === card) return false;
    const targets = pipeTargets(card).filter((target) => !(target.kind === kind && target.id === id));
    const expanded = targets.length !== pipeTargets(card).length;
    targets.push({ kind, id, mode: "send" });
    setPipeTargets(card, targets);
    return !expanded;
  }
  function portAnchor(card) {
    return { x: card.x + card.w, y: card.y + 30 };
  }
  function targetAnchor(card) {
    return { x: card.x, y: card.y + 30 };
  }
  function linkPath(from, to) {
    const dx = Math.max(40, Math.abs(to.x - from.x) * 0.45);
    return "M " + from.x + " " + from.y + " C " + (from.x + dx) + " " + from.y + ", " + (to.x - dx) + " " + to.y + ", " + to.x + " " + to.y;
  }
  function renderPipelines() {
    while (linkLayer.firstChild) linkLayer.removeChild(linkLayer.firstChild);
    for (const card of state.cards) {
      for (const target of pipeTargets(card)) {
        const targetCard = cardOfPipeTarget(target);
        if (!targetCard || targetCard === card) continue;
        const d = linkPath(portAnchor(card), targetAnchor(targetCard));
        const hit = document.createElementNS(SVG_NS, "path");
        hit.setAttribute("d", d);
        hit.setAttribute("class", "iwb-link-hit");
        hit.addEventListener("pointerdown", (event) => {
          event.stopPropagation();
          openPipeMenu(card, target, event.currentTarget);
        });
        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        path.setAttribute("class", "iwb-link");
        if (target.mode === "draft") path.setAttribute("stroke-dasharray", "4 4");
        linkLayer.append(hit, path);
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
    const port = card.el.querySelector(".iwb-port");
    if (!port) return;
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
      const temp = document.createElementNS(SVG_NS, "path");
      temp.setAttribute("class", "iwb-link-temp");
      linkLayer.appendChild(temp);
      let hovered = null;
      const draw = (clientX, clientY) => {
        temp.setAttribute("d", linkPath(portAnchor(card), point(clientX, clientY)));
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
          const created = addPipeTarget(card, hovered);
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
  async function deliverPipeline(card) {
    const targets = pipeTargets(card);
    if (!targets.length) return;
    const text = lastAssistantText(card);
    if (!text) return;
    const fingerprint = text.slice(0, 160);
    card.pipedFingerprints = card.pipedFingerprints || {};
    const depth = (card.pipeDepth || 0) + 1;
    if (depth > 3) {
      toast(t2("pipe.tooLong"));
      return;
    }
    for (const target of targets) {
      const key = target.kind + ":" + target.id;
      if (card.pipedFingerprints[key] === fingerprint) continue;
      const targetCard = cardOfPipeTarget(target);
      if (target.kind === "note") {
        if (!targetCard) continue;
        const area = targetCard.el?.querySelector(".iwb-note-input");
        if (!area) continue;
        const block = t2("pipe.noteBlock").replace("{title}", card.title || t2("untitled")).replace("{time}", canvasStamp()).replace("{text}", text);
        const replace = target.write === "replace";
        area.value = replace ? block : area.value.trim() ? area.value.replace(/\s*$/, "\n\n") + block : block;
        area.dispatchEvent(new Event("input", { bubbles: true }));
        targetCard.pipeDepth = depth;
        card.pipedFingerprints[key] = fingerprint;
        ensureVisible(targetCard);
        toast(t2(replace ? "pipe.notedReplaced" : "pipe.noted").replace("{name}", targetCard.title || t2("untitled")));
        continue;
      }
      if (target.mode === "draft") {
        const field = targetCard?.el?.querySelector(".iwb-foot textarea");
        if (!field) continue;
        field.value = field.value ? field.value.replace(/\s*$/, "\n\n") + text : text;
        field.dispatchEvent(new Event("input", { bubbles: true }));
        ensureVisible(targetCard);
        targetCard.pipeDepth = depth;
        card.pipedFingerprints[key] = fingerprint;
        toast(t2("pipe.drafted").replace("{name}", pipeTargetLabel(target)));
        continue;
      }
      try {
        await adapter.prompt(target.id, text, "queue");
        card.pipedFingerprints[key] = fingerprint;
        if (targetCard) targetCard.pipeDepth = depth;
        toast(t2("pipe.sent").replace("{name}", pipeTargetLabel(target)));
      } catch (error) {
        toast(t2("pipe.failed").replace("{error}", error?.message || ""));
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
    schedulePipelines();
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
  function renderCard(card) {
    if (card.kind === "note") return;
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
      const text = el("div", "iwb-queue-text");
      text.textContent = item.text || (item.attachments ? t2("queue.attachment") : "");
      text.title = item.text || "";
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
      row.append(text, steer, remove);
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
    const text = textarea.value.trim();
    const attachments = [...card.attachments || []];
    if (!text && !attachments.length) return;
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
        await adapter.sendWithAttachments(card.sessionId, text, attachments.map((attachment) => attachment.id), mode);
        adapter.releaseDrafts?.(attachments.map((attachment) => attachment.id));
      } else {
        await adapter.prompt(card.sessionId, text, mode);
      }
      card.attachments = [];
      card.startedAt = Date.now();
      renderFoot(card);
    } catch (error) {
      card.composerDraft = text;
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
          if (card.kind === "note") node.querySelector(".iwb-note-input")?.focus();
          else node.querySelector(".iwb-foot textarea")?.focus();
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
    head.addEventListener("dblclick", () => centerCard(card));
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
    const running = state.cards.filter((c) => c.running).length;
    const parts = [t2("count.cards").replace("{n}", String(state.cards.length))];
    if (running) parts.push(t2("count.running").replace("{n}", String(running)));
    countsNode.textContent = parts.join(" \xB7 ");
  }
  function updateEmptyState() {
    emptyState.style.display = state.cards.length ? "none" : "flex";
  }
  let saveTimer = 0;
  let suppressSave = false;
  function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 220);
  }
  function save() {
    if (disposed || suppressSave) return;
    try {
      const payload = layoutPayload();
      localUpdatedAt = payload.updatedAt;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      if (!applyingRemote) {
        void pushRemoteLayout(payload, clientId).then((result) => {
          if (result?.rev) remoteRev = result.rev;
        });
      }
    } catch {
    }
  }
  function restore() {
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
      syncApprovalSessions();
      void syncFromRemote().then(() => startRemoteSync());
      void loadCanvases();
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
  function applyLayout(saved, options) {
    if (!saved || !Array.isArray(saved.cards)) throw new Error(t2("settings.importInvalid"));
    reset2();
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
      const text = await file.text();
      applyLayout(JSON.parse(text), { toast: t2("settings.imported") });
    } catch (error) {
      toast(error?.message || t2("settings.importFailed"));
    }
  }
  let interactionActive = false;
  let remoteRev = 0;
  let localUpdatedAt = 0;
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
  function reset2() {
    state.cards.forEach((card) => {
      try {
        card.detach?.();
      } catch {
      }
      card.el.remove();
    });
    state.cards = [];
    state.stacks = [];
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
          if (!(atTop && scrollingUp) && !(atBottom && !scrollingUp)) return;
        } else {
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
  document.addEventListener("keydown", onKey);
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
      if (active.length) void adapter.pollStates?.(active.map((card) => card.sessionId));
    }
  }, 1e3);
  return {
    root,
    addSession,
    restore,
    reset: reset2,
    dispose() {
      disposed = true;
      try {
        clearInterval(ticker);
        clearTimeout(saveTimer);
        clearTimeout(toastTimer);
        settingsMenu.close();
        tools.dispose();
        stopApprovalWatch?.();
        stopUploadWatch?.();
        stopTitleWatch?.();
        stopRemoteSync?.();
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
  const text = Array.isArray(blocks) ? blocks.map((block) => {
    if (!block || typeof block !== "object") return "";
    if (block.type === "text") return block.text || "";
    if (block.type === "reasoning") return "";
    if (block.type === "image") return "[image]";
    if (block.type === "file") return "[file]";
    if (block.type === "tool-call") return "";
    return "";
  }).join("") : typeof blocks === "string" ? blocks : "";
  const fromError = data?.error ? data.error.reason || data.error.message || data.error.code || "" : "";
  return (text || fromError || "").slice(0, 4e3);
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
        const text = messageText(data);
        const attachments = attachmentMeta(data);
        if (text || attachments.length) push({ k: "user", text, attachments });
        break;
      }
      case "assistant/message": {
        const text = messageText(data);
        if (text) push({ k: "assistant", text, turn: data.turn });
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
  for (let index = 0; index < items.length; index += 1) {
    const entry = items[index];
    if (entry.k !== "turnProcess") continue;
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
    items.splice(index < anchor ? anchor - 1 : anchor, 0, entry);
    index = Math.max(0, index < anchor ? anchor - 1 : anchor);
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
  function open(sessionId, onChange) {
    if (!sessions) {
      onChange();
      return () => {
      };
    }
    let entry = entries.get(sessionId);
    if (!entry) {
      let reference;
      try {
        reference = sessions.retain(sessionId, { source: "inspirationWorkbench" });
      } catch {
        reference = sessions.retain(sessionId, { source: "gateway" });
      }
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
  async function sendWithAttachments(sessionId, text, attachmentIds, mode) {
    const service = conversationService();
    const binding = bindingOf(sessionId);
    if (!service?.sendSession || !binding) throw new Error("\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u9644\u4EF6");
    await service.sendSession(binding.session, text, attachmentIds, mode || "queue");
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
      running: Boolean(snapshot.running),
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
  async function prompt(sessionId, text, mode) {
    const binding = bindingOf(sessionId);
    if (!binding) throw new Error("\u4F1A\u8BDD\u8FD8\u5728\u6253\u5F00\u4E2D\uFF0C\u7A0D\u7B49\u4E00\u4E0B\u518D\u53D1");
    const result = await binding.session.prompt([{ type: "text", text }], mode === "steer" ? "steer" : "queue");
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
      return ctx.remote?.session || ctx.get?.("remote")?.session;
    } catch {
      return void 0;
    }
  };
  let catalogCache = null;
  let catalogAt = 0;
  let catalogPromise = null;
  async function modelCatalog() {
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
  async function createSession(options) {
    if (!sessions?.create) throw new Error("\u5F53\u524D\u7248\u672C\u6CA1\u6709\u63D0\u4F9B\u9759\u9ED8\u65B0\u5EFA\u4F1A\u8BDD\u7684\u63A5\u53E3");
    const request2 = {};
    const workspaceId = options && typeof options === "object" ? options.workspaceId : void 0;
    if (workspaceId) request2.workspaceId = workspaceId;
    return await sessions.create(request2);
  }
  return {
    available: Boolean(sessions),
    hasModelPicker: () => Boolean(remoteSession()?.selectModel),
    modelCatalog,
    selectModel,
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
  "attach.file": "\u9644\u4EF6",
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
  "pipe.port": "\u62D6\u8FD9\u6761\u7EBF\u5230\u53E6\u4E00\u5F20\u5361\uFF0C\u5EFA\u7ACB\u6D41\u6C34\u7EBF",
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
  "attach.file": "Attachment",
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
  "pipe.port": "Drag this line onto another card to wire a pipeline",
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
var inject = ["slots", "locale", "sessions", "layout", "uiWorkspace", "remote", "remote.session", "remote.userQuestions", "workspaces", "conversation"];
async function apply(ctx) {
  runtime.ctx = ctx;
  let styleNode = document.querySelector('style[data-iwb="1"]');
  if (!styleNode) {
    styleNode = document.createElement("style");
    styleNode.dataset.iwb = "1";
    document.head.appendChild(styleNode);
  }
  styleNode.textContent = styles_default;
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
