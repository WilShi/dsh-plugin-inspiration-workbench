import { el as makeEl } from './dom';

/** Model/effort menu: placement, catalog fetch, and its own dismissal listeners. */
export function createModelMenu(deps) {
  const { t, layer, adapter, markDirty, toast, onEscapeExtras } = deps;
  const el = makeEl;
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
    const anchor = card.el.querySelector('.iwb-meta');
    if (!anchor) return;
    if (popoverCard === card && popover) {
      closeModelMenu();
      return;
    }
    closeModelMenu();
    popoverCard = card;

    const pop = el('div', 'iwb-popover');
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('model.switchTitle');
    const list = el('div', 'iwb-popover-body');
    const loading = el('div', 'iwb-popover-note');
    loading.textContent = t('model.loading');
    list.appendChild(loading);
    pop.append(head, list);
    layer.appendChild(pop);
    popover = pop;

    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(Math.max(8, Math.min(rect.left, window.innerWidth - 320))) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';

    let catalog;
    try {
      catalog = await adapter.modelCatalog();
    } catch (error) {
      if (popover !== pop) return;
      list.textContent = '';
      const note = el('div', 'iwb-popover-note');
      note.textContent = error?.message || t('model.error');
      list.appendChild(note);
      return;
    }
    if (popover !== pop) return;
    list.textContent = '';

    const current = card.view?.selection || null;
    const effortName = (model, id) => (model.reasoning?.efforts || []).find((entry) => entry.id === id)?.name || id;

    const commit = async (provider, model, effort) => {
      const selection = { provider, model: model.id };
      const resolved = effort !== undefined ? effort : model.reasoning?.defaultEffort;
      if (resolved !== undefined && resolved !== null && resolved !== '') selection.reasoningEffort = resolved;
      closeModelMenu();
      try {
        await adapter.selectModel(card.sessionId, selection);
        card.model = (model.name || model.id) + (selection.reasoningEffort ? ' · ' + effortName(model, selection.reasoningEffort) : '');
        markDirty(card);
        toast(t('model.switched').replace('{name}', card.model));
      } catch (error) {
        toast(error?.message || t('model.error'));
      }
    };

    const renderModels = () => {
      head.textContent = t('model.switchTitle');
      list.textContent = '';
      for (const group of catalog.groups || []) {
        const groupLabel = el('div', 'iwb-model-group');
        groupLabel.textContent = group.name || group.id;
        list.appendChild(groupLabel);
        for (const model of group.models || []) {
          const selected = Boolean(current && current.provider === group.id && current.model === model.id);
          const row = el('button', 'iwb-model-row' + (selected ? ' current' : ''));
          row.type = 'button';
          row.innerHTML =
            '<span class="iwb-model-main"><span class="iwb-model-name"></span>' +
            (model.description ? '<span class="iwb-model-desc"></span>' : '') +
            '</span>' +
            (selected && model.reasoning?.efforts?.length
              ? '<span class="iwb-model-sub">' + t('model.effortCurrent').replace('{name}', effortName(model, current.reasoningEffort || model.reasoning.defaultEffort)) + '</span>'
              : model.reasoning?.efforts?.length
                ? '<span class="iwb-model-sub">' + t('model.effortCount').replace('{n}', String(model.reasoning.efforts.length)) + '</span>'
                : '') +
            (selected ? '<span class="iwb-check">✓</span>' : '<span class="iwb-check"></span>');
          row.querySelector('.iwb-model-name').textContent = model.name || model.id;
          if (model.description) row.querySelector('.iwb-model-desc').textContent = model.description;
          row.addEventListener('click', (event) => {
            event.stopPropagation();
            if (model.reasoning?.efforts?.length) renderEfforts(group, model);
            else void commit(group.id, model);
          });
          list.appendChild(row);
        }
      }
      // A direct entry point: users look for "思考强度" itself, not a model row.
      const currentGroup = (catalog.groups || []).find((group) => group.id === current?.provider);
      const currentModel = (currentGroup?.models || []).find((model) => model.id === current?.model);
      if (current && currentModel?.reasoning?.efforts?.length) {
        const row = el('button', 'iwb-model-row iwb-effort-entry');
        row.type = 'button';
        row.innerHTML =
          '<span class="iwb-model-main"><span class="iwb-model-name">' + t('model.effortRow') + '</span>' +
          '<span class="iwb-model-desc"></span></span><span class="iwb-model-sub"></span><span class="iwb-chev">›</span>';
        row.querySelector('.iwb-model-desc').textContent = currentModel.name || currentModel.id;
        row.querySelector('.iwb-model-sub').textContent = effortName(currentModel, current.reasoningEffort || currentModel.reasoning.defaultEffort);
        row.addEventListener('click', (event) => {
          event.stopPropagation();
          renderEfforts(currentGroup, currentModel);
        });
        list.appendChild(row);
      }
      if (!list.childElementCount) {
        const note = el('div', 'iwb-popover-note');
        note.textContent = t('model.empty');
        list.appendChild(note);
      }
    };

    const renderEfforts = (group, model) => {
      head.textContent = t('model.effortTitle').replace('{name}', model.name || model.id);
      list.textContent = '';
      const back = el('button', 'iwb-model-back');
      back.type = 'button';
      back.textContent = '‹ ' + t('model.back');
      back.addEventListener('click', (event) => {
        event.stopPropagation();
        renderModels();
      });
      list.appendChild(back);

      const efforts = model.reasoning?.efforts || [];
      const rows = [];
      const fallback = model.reasoning?.defaultEffort;
      if (fallback) rows.push({ id: fallback, name: t('model.effortDefault'), description: '' });
      for (const effort of efforts) {
        if (rows.some((entry) => entry.id === effort.id)) continue;
        rows.push(effort);
      }
      for (const effort of rows) {
        const activeEffort = current?.reasoningEffort || model.reasoning?.defaultEffort;
        const selected = Boolean(current && current.provider === group.id && current.model === model.id && activeEffort === effort.id);
        const row = el('button', 'iwb-model-row' + (selected ? ' current' : ''));
        row.type = 'button';
        row.innerHTML =
          '<span class="iwb-model-main"><span class="iwb-model-name"></span>' +
          (effort.description ? '<span class="iwb-model-desc"></span>' : '') +
          '</span>' + (selected ? '<span class="iwb-check">✓</span>' : '<span class="iwb-check"></span>');
        row.querySelector('.iwb-model-name').textContent = effort.name || effort.id;
        if (effort.description) row.querySelector('.iwb-model-desc').textContent = effort.description;
        row.addEventListener('click', (event) => {
          event.stopPropagation();
          void commit(group.id, model, effort.id);
        });
        list.appendChild(row);
      }
    };

    renderModels();

    const measured = pop.getBoundingClientRect();
    if (measured.bottom > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
    if (measured.right > window.innerWidth - 8) {
      pop.style.left = Math.max(8, Math.round(window.innerWidth - measured.width - 8)) + 'px';
    }
  }

  const onDocumentPointerDown = (event) => {
    if (!popover) return;
    if (event.target?.closest?.('.iwb-popover') || event.target?.closest?.('.iwb-meta')) return;
    closeModelMenu();
  };
  const onDocumentKeyDown = (event) => {
    if (event.key !== 'Escape') return;
    closeModelMenu();
    onEscapeExtras?.();
  };
  document.addEventListener('pointerdown', onDocumentPointerDown, true);
  document.addEventListener('keydown', onDocumentKeyDown);



  function dispose() {
    closeModelMenu();
    document.removeEventListener('pointerdown', onDocumentPointerDown, true);
    document.removeEventListener('keydown', onDocumentKeyDown);
  }

  return { open: openModelMenu, close: closeModelMenu, dispose, isOpen: () => Boolean(popover) };
}

/** Arrange menu: three layout strategies over the movable cards. */
export function createArrangeMenu(deps) {
  const {
    t,
    state,
    canvas,
    fitView,
    saveSoon,
    toast,
    defaultSize,
    gap,
    anchor,
    afterArrange,
  } = deps;
  const el = makeEl;
  const DEFAULT_W = defaultSize.w;
  const DEFAULT_H = defaultSize.h;
  const GAP = gap;

  let arrangePop = null;

  function closeArrange() {
    arrangePop?.remove();
    arrangePop = null;
  }

  function arrangeGrid(cards) {
    const cols = Math.max(1, Math.min(3, Math.floor(canvas.clientWidth / state.zoom / (DEFAULT_W + GAP))));
    cards.forEach((card, index) => {
      card.x = (index % cols) * (DEFAULT_W + GAP);
      card.y = Math.floor(index / cols) * (DEFAULT_H + GAP);
    });
  }

  /** One horizontal band per workspace, in sidebar order. */
  function arrangeByWorkspace(cards) {
    const groups = new Map();
    for (const card of cards) {
      const key = card.kind === 'note' ? t('note.title') : card.workspace || t('workspace.none');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(card);
    }
    let row = 0;
    for (const [, members] of groups) {
      members.forEach((card, index) => {
        card.x = index * (DEFAULT_W + GAP);
        card.y = row * (DEFAULT_H + GAP);
      });
      row += 1;
    }
  }

  /** Most recently active cards first. */
  function arrangeByActivity(cards) {
    const sorted = [...cards].sort((left, right) => (right.activityAt || 0) - (left.activityAt || 0));
    const cols = Math.max(1, Math.min(3, Math.floor(canvas.clientWidth / state.zoom / (DEFAULT_W + GAP))));
    sorted.forEach((card, index) => {
      card.x = (index % cols) * (DEFAULT_W + GAP);
      card.y = Math.floor(index / cols) * (DEFAULT_H + GAP);
    });
  }

  function arrangeBy(strategy) {
    closeArrange();
    const movable = state.cards.filter((card) => !card.stackId && !card.pinned);
    if (!movable.length) return;
    if (strategy === 'workspace') arrangeByWorkspace(movable);
    else if (strategy === 'activity') arrangeByActivity(movable);
    else arrangeGrid(movable);
    for (const card of movable) {
      card.el.style.left = card.x + 'px';
      card.el.style.top = card.y + 'px';
    }
    saveSoon();
    void fitView();
    afterArrange?.();
    toast(t('arrange.done'));
  }

  function openArrangeMenu() {
    if (arrangePop) {
      closeArrange();
      return;
    }
    const pop = el('div', 'iwb-popover iwb-arrange');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('arrange.title'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('arrange.title');
    pop.appendChild(head);
    const options = [
      { id: 'grid', label: t('arrange.grid') },
      { id: 'workspace', label: t('arrange.workspace') },
      { id: 'activity', label: t('arrange.activity') },
    ];
    for (const option of options) {
      const button = el('button', 'iwb-model-row');
      button.type = 'button';
      button.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span></span>';
      button.querySelector('.iwb-model-name').textContent = option.label;
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        arrangeBy(option.id);
      });
      pop.appendChild(button);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    arrangePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.right > window.innerWidth - 8) pop.style.left = Math.max(8, window.innerWidth - measured.width - 8) + 'px';
  }

  anchor.addEventListener('click', (event) => {
    event.stopPropagation();
    openArrangeMenu();
  });

  const onArrangePointerDown = (event) => {
    if (!arrangePop) return;
    if (event.target?.closest?.('.iwb-arrange') || event.target?.closest?.('.iwb-toolbar')) return;
    closeArrange();
  };
  document.addEventListener('pointerdown', onArrangePointerDown, true);
  function disposeArrange() {
    closeArrange();
    document.removeEventListener('pointerdown', onArrangePointerDown, true);
  }

  return { open: openArrangeMenu, close: closeArrange, dispose: disposeArrange };
}

/**
 * Workspace picker for a new session card: the canvas has no "inherit the row's
 * workspace" context the way the native sidebar does.
 */
export function createWorkspaceMenu(deps) {
  const { t, adapter, toast, addSession, centerCard, anchor } = deps;
  const el = makeEl;

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
        title: adapter.titleOf(sessionId) || t('untitled'),
        workspace: workspace?.title || '',
      });
      if (card) centerCard(card);
    } catch (error) {
      toast(error?.message || t('error.new'));
    }
  }

  /**
   * A new session needs a workspace; the native sidebar inherits the workspace
   * whose row was clicked, which has no equivalent on the canvas.
   */
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
    const pop = el('div', 'iwb-popover iwb-workspaces');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('workspace.pick'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('workspace.pick');
    pop.appendChild(head);
    for (const workspace of workspaces) {
      const row = el('button', 'iwb-model-row iwb-workspace-row');
      row.type = 'button';
      row.innerHTML = '<span class="iwb-model-main"><span class="iwb-model-name"></span><span class="iwb-model-desc"></span></span>';
      row.querySelector('.iwb-model-name').textContent = workspace.title || t('workspace.untitled');
      const desc = row.querySelector('.iwb-model-desc');
      if (workspace.path) desc.textContent = workspace.path;
      else desc.remove();
      row.addEventListener('click', (event) => {
        event.stopPropagation();
        void createCardIn(workspace);
      });
      pop.appendChild(row);
    }
    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    workspacePop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.right > window.innerWidth - 8) {
      pop.style.left = Math.max(8, Math.round(window.innerWidth - measured.width - 8)) + 'px';
    }
    if (measured.top + measured.height > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
  }


  // Self-managed dismissal: the board no longer registers one of its own.
  const onWorkspacePointerDown = (event) => {
    if (!workspacePop) return;
    if (event.target?.closest?.('.iwb-workspaces') || event.target?.closest?.('.iwb-toolbar')) return;
    closeWorkspacePicker();
  };
  document.addEventListener('pointerdown', onWorkspacePointerDown, true);

  function disposeWorkspace() {
    closeWorkspacePicker();
    document.removeEventListener('pointerdown', onWorkspacePointerDown, true);
  }

  return { open: openWorkspacePicker, close: closeWorkspacePicker, dispose: disposeWorkspace };
}

/** Settings popover: approvals, wheel chaining, size presets, import/export/reset. */
export function createSettingsMenu(deps) {
  const {
    t,
    el,
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
    anchor,
  } = deps;

  // ── settings popover ─────────────────────────────────────────────────
  let settingsPop = null;

  function closeSettings() {
    settingsPop?.remove();
    settingsPop = null;
  }

  function toggleInlineApprovals(value) {
    state.settings.inlineApprovals = Boolean(value);
    approvals?.setEnabled?.(state.settings.inlineApprovals);
    saveSoon();
    if (state.settings.inlineApprovals) toast(t('settings.approvalsOn'));
  }

  function openSettings() {
    if (settingsPop) {
      closeArrange();
      closeOverlays();
      closeWorkspace();
      closeSettings();
      return;
    }
    const pop = el('div', 'iwb-popover iwb-settings');
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', t('settings'));
    const head = el('div', 'iwb-popover-head');
    head.textContent = t('settings');
    const row = document.createElement('label');
    row.className = 'iwb-settings-row';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = Boolean(state.settings.inlineApprovals);
    box.addEventListener('change', () => toggleInlineApprovals(box.checked));
    const label = el('span', 'iwb-settings-label');
    label.textContent = t('settings.inlineApprovals');
    row.append(box, label);
    const hintNode = el('div', 'iwb-popover-note');
    hintNode.textContent = t('settings.inlineApprovalsHint');
    const wheelRow = document.createElement('label');
    wheelRow.className = 'iwb-settings-row';
    const wheelBox = document.createElement('input');
    wheelBox.type = 'checkbox';
    wheelBox.checked = state.settings.chainWheel !== false;
    wheelBox.addEventListener('change', () => {
      state.settings.chainWheel = wheelBox.checked;
      saveSoon();
    });
    const wheelLabel = el('span', 'iwb-settings-label');
    wheelLabel.textContent = t('settings.chainWheel');
    wheelRow.append(wheelBox, wheelLabel);

    const sizeRow = el('div', 'iwb-settings-actions');
    const sizes = [
      { id: 'compact', w: 340, h: 380 },
      { id: 'normal', w: 420, h: 520 },
      { id: 'wide', w: 560, h: 600 },
    ];
    for (const preset of sizes) {
      const btn = el('button', 'iwb-btn');
      btn.type = 'button';
      btn.textContent = t('settings.size.' + preset.id);
      btn.addEventListener('click', () => {
        applySizePreset(preset);
        closeSettings();
      });
      sizeRow.appendChild(btn);
    }

    const fileRow = el('div', 'iwb-settings-actions');
    const exportBtn = el('button', 'iwb-btn');
    exportBtn.type = 'button';
    exportBtn.textContent = t('settings.export');
    exportBtn.addEventListener('click', () => {
      exportLayout();
      closeSettings();
    });
    const importBtn = el('button', 'iwb-btn');
    importBtn.type = 'button';
    importBtn.textContent = t('settings.import');
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = 'application/json';
    importInput.hidden = true;
    importInput.addEventListener('change', () => {
      const file = importInput.files?.[0];
      if (!file) return;
      void importLayout(file);
      closeSettings();
    });
    importBtn.addEventListener('click', () => importInput.click());
    const resetBtn = el('button', 'iwb-btn');
    resetBtn.type = 'button';
    resetBtn.textContent = t('settings.reset');
    resetBtn.addEventListener('click', () => {
      reset();
      closeSettings();
      toast(t('settings.resetDone'));
    });
    fileRow.append(exportBtn, importBtn, resetBtn);

    const shortcuts = el('div', 'iwb-shortcuts');
    const shortcutsTitle = el('div', 'iwb-shortcuts-title');
    shortcutsTitle.textContent = t('shortcuts.title');
    shortcuts.appendChild(shortcutsTitle);
    for (const key of ['shortcuts.move', 'shortcuts.act', 'shortcuts.find', 'shortcuts.leave']) {
      const line = el('div', 'iwb-shortcuts-row');
      line.textContent = t(key);
      shortcuts.appendChild(line);
    }

    pop.append(head, row, hintNode, wheelRow, sizeRow, fileRow, shortcuts, importInput);

    const rect = anchor.getBoundingClientRect();
    pop.style.left = Math.round(rect.left) + 'px';
    pop.style.top = Math.round(rect.bottom + 6) + 'px';
    document.body.appendChild(pop);
    settingsPop = pop;
    const measured = pop.getBoundingClientRect();
    if (measured.right > window.innerWidth - 8) {
      pop.style.left = Math.max(8, Math.round(window.innerWidth - measured.width - 8)) + 'px';
    }
    if (measured.top + measured.height > window.innerHeight - 8) {
      pop.style.top = Math.max(8, Math.round(rect.top - measured.height - 6)) + 'px';
    }
  }

  anchor.addEventListener('click', (event) => {
    event.stopPropagation();
    openSettings();
  });
  const onSettingsPointerDown = (event) => {
    if (!settingsPop) return;
    if (event.target?.closest?.('.iwb-settings') || event.target?.closest?.('.iwb-toolbar')) return;
    closeSettings();
  };
  document.addEventListener('pointerdown', onSettingsPointerDown, true);

  function disposeSettings() {
    closeSettings();
    document.removeEventListener('pointerdown', onSettingsPointerDown, true);
  }

  return { open: openSettings, close: closeSettings, dispose: disposeSettings };
}
