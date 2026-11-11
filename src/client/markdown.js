import { el } from './dom';

/**
 * Markdown renderer for assistant text: block parsing (fences, headings, tables,
 * quotes, lists, rules, paragraphs) plus an inline pass (code, bold, italic,
 * strike, links). Everything is built from DOM nodes and textContent so model
 * output can never inject markup.
 */
export function createMarkdown({ t }) {
function splitRow(line) {
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function safeHref(url) {
  const value = String(url || '').trim();
  if (/^(https?:|mailto:)/i.test(value)) return value;
  return '';
}

function appendInline(parent, text) {
  const pattern = /(`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|~~[^~\n]+~~|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]*\]\([^)\s]+\))/g;
  let last = 0;
  let match;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parent.appendChild(document.createTextNode(text.slice(last, match.index)));
    const token = match[0];
    if (token.startsWith('`')) {
      const code = el('code', 'iwb-md-code');
      code.textContent = token.slice(1, -1);
      parent.appendChild(code);
    } else if (token.startsWith('**') || token.startsWith('__')) {
      const strong = document.createElement('strong');
      appendInline(strong, token.slice(2, -2));
      parent.appendChild(strong);
    } else if (token.startsWith('~~')) {
      const strike = document.createElement('s');
      appendInline(strike, token.slice(2, -2));
      parent.appendChild(strike);
    } else if (token.startsWith('[')) {
      const split = token.match(/^\[([^\]]*)\]\(([^)\s]+)\)$/);
      const href = split ? safeHref(split[2]) : '';
      if (href) {
        const link = document.createElement('a');
        link.className = 'iwb-md-link';
        link.href = href;
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        link.textContent = split[1] || href;
        parent.appendChild(link);
      } else {
        parent.appendChild(document.createTextNode(split ? split[1] : token));
      }
    } else {
      const em = document.createElement('em');
      appendInline(em, token.slice(1, -1));
      parent.appendChild(em);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
}

function appendParagraph(parent, text) {
  const node = el('div', 'iwb-md-p');
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (index > 0) node.appendChild(document.createElement('br'));
    appendInline(node, line);
  });
  parent.appendChild(node);
}

function appendCodeBlock(parent, lang, code) {
  const wrapper = el('div', 'iwb-codeblock');
  const head = el('div', 'iwb-codeblock-head');
  const label = el('span', 'iwb-codeblock-lang');
  label.textContent = lang || 'text';
  const copy = el('button', 'iwb-codeblock-copy');
  copy.type = 'button';
  copy.textContent = t('code.copy');
  copy.addEventListener('click', (event) => {
    event.stopPropagation();
    const write = navigator.clipboard?.writeText?.(code);
    if (write && typeof write.then === 'function') {
      write.then(() => {
        copy.textContent = t('code.copied');
        setTimeout(() => {
          copy.textContent = t('code.copy');
        }, 1400);
      }).catch(() => {});
    }
  });
  head.append(label, copy);
  const body = el('pre', 'iwb-codeblock-body');
  body.textContent = code;
  wrapper.append(head, body);
  parent.appendChild(wrapper);
}

function appendTable(parent, header, rows) {
  const table = el('table', 'iwb-md-table');
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  for (const cell of header) {
    const th = document.createElement('th');
    appendInline(th, cell);
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (let index = 0; index < header.length; index += 1) {
      const td = document.createElement('td');
      appendInline(td, row[index] || '');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  parent.appendChild(table);
}

function listItemNode(entry) {
  const li = document.createElement('li');
  if (entry.task !== null) {
    const box = el('span', 'iwb-md-task' + (entry.task ? ' checked' : ''));
    box.textContent = entry.task ? '✓' : '';
    li.appendChild(box);
  }
  appendInline(li, entry.text);
  return li;
}

function appendList(parent, block) {
  const base = Math.min(...block.items.map((entry) => entry.indent));
  const list = document.createElement(block.ordered ? 'ol' : 'ul');
  list.className = 'iwb-md-list';
  let nested = null;
  for (const entry of block.items) {
    if (entry.indent > base + 1) {
      if (!nested) {
        nested = document.createElement('ul');
        nested.className = 'iwb-md-list nested';
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
  const lines = String(text || '').split(/\r?\n/);
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];

    const fence = line.match(/^\s*```\s*(.*)$/);
    if (fence) {
      const lang = (fence[1] || '').trim();
      const body = [];
      index += 1;
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1;
      appendCodeBlock(parent, lang, body.join('\n'));
      continue;
    }

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const node = el('div', 'iwb-md-h iwb-md-h' + heading[1].length);
      appendInline(node, heading[2]);
      parent.appendChild(node);
      index += 1;
      continue;
    }

    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      parent.appendChild(el('div', 'iwb-md-hr'));
      index += 1;
      continue;
    }

    if (
      line.includes('|') &&
      index + 1 < lines.length &&
      /^\s*\|?[\s:|-]*-[\s:|-]*\|[\s:|-]*$/.test(lines[index + 1]) &&
      lines[index + 1].includes('-')
    ) {
      const header = splitRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      appendTable(parent, header, rows);
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      const node = el('blockquote', 'iwb-md-quote');
      appendMarkdownLite(node, quote.join('\n'));
      parent.appendChild(node);
      continue;
    }

    if (/^\s*([-*+]|\d+[.)])\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const items = [];
      while (index < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[index])) {
        const raw = lines[index];
        const indent = (raw.match(/^\s*/) || [''])[0].length;
        let content = raw.replace(/^\s*([-*+]|\d+[.)])\s+/, '');
        const task = content.match(/^\[([ xX])\]\s+(.*)$/);
        items.push({
          indent,
          ordered,
          task: task ? task[1].toLowerCase() === 'x' : null,
          text: task ? task[2] : content,
        });
        index += 1;
      }
      appendList(parent, { items, ordered });
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^\s*(```|#{1,6}\s|>|([-*+]|\d+[.)])\s)/.test(lines[index]) &&
      !/^\s*([-*_])\1{2,}\s*$/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    if (!paragraph.length) {
      paragraph.push(lines[index] || '');
      index += 1;
    }
    appendParagraph(parent, paragraph.join('\n'));
  }
}

  return { appendMarkdownLite };
}
