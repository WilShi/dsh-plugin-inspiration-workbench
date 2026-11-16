import { extractDocxText, extractPptxText } from './docx-text.js';

export function fileKind(file) {
  const type = String(file?.type || '').toLowerCase();
  const name = String(file?.name || '').toLowerCase();
  if (type.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg|bmp|avif)$/.test(name)) return 'image';
  if (type === 'application/pdf' || /\.pdf$/.test(name)) return 'pdf';
  if (/\.(docx)$/.test(name)) return 'docx';
  if (/\.(pptx)$/.test(name)) return 'pptx';
  if (/\.(html?|xhtml)$/.test(name) || type === 'text/html') return 'html';
  if (type.startsWith('text/') || /\.(txt|md|markdown|json|jsonl|csv|tsv|xml|ya?ml|log|js|mjs|cjs|ts|tsx|jsx|css|scss|less|py|java|go|rs|sql|sh|bash|zsh|env|ini|toml|vue|svelte)$/.test(name)) return 'text';
  return 'other';
}

export function formatBytes(value) {
  const size = Number(value) || 0;
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(size < 10240 ? 1 : 0) + ' KB';
  return (size / 1024 / 1024).toFixed(1) + ' MB';
}

export async function buildFilePreview(file) {
  const kind = fileKind(file);
  if (kind === 'image' || kind === 'pdf') return { kind, url: URL.createObjectURL(file.blob || file) };
  if (kind === 'docx') return { kind, text: await extractDocxText(await (file.blob || file).arrayBuffer()) };
  if (kind === 'pptx') return { kind, text: await extractPptxText(await (file.blob || file).arrayBuffer()) };
  if (kind === 'html' || kind === 'text') {
    const buffer = await (file.blob || file).slice(0, 1024 * 1024).text();
    return { kind, text: buffer };
  }
  return { kind: 'other', text: '暂不支持此格式的直接预览，可下载后查看。' };
}

export function openFilePreview(file, options = {}) {
  const dialog = document.createElement('dialog');
  dialog.className = 'iwb-file-dialog';
  dialog.setAttribute('aria-label', file.name || '文件预览');
  document.body.appendChild(dialog);
  const close = () => dialog.close();
  dialog.innerHTML = '<div class="iwb-file-dialog-head"><div><h2></h2><p></p></div><button type="button" class="iwb-file-dialog-close" aria-label="关闭预览">×</button></div><div class="iwb-file-dialog-body"></div><div class="iwb-file-dialog-foot"><a class="iwb-btn" download>下载文件</a></div>';
  dialog.querySelector('h2').textContent = file.name || '文件预览';
  dialog.querySelector('p').textContent = formatBytes(file.size) + ' · ' + (file.type || '文件');
  dialog.querySelector('.iwb-file-dialog-close').addEventListener('click', close);
  const download = dialog.querySelector('a');
  download.download = file.name || 'download';
  const body = dialog.querySelector('.iwb-file-dialog-body');
  body.textContent = '正在读取预览…';
  let url = '';
  dialog.addEventListener('close', () => {
    if (url) URL.revokeObjectURL(url);
    dialog.remove();
    options.onClose?.();
  });

  void buildFilePreview(file).then((preview) => {
    body.textContent = '';
    if (preview.url) {
      url = preview.url;
      download.href = url;
      if (preview.kind === 'image') {
        const image = document.createElement('img');
        image.className = 'iwb-file-preview-image';
        image.alt = file.name || '图片预览';
        image.src = url;
        body.appendChild(image);
      } else {
        const frame = document.createElement('iframe');
        frame.className = 'iwb-file-preview-frame';
        frame.sandbox = '';
        frame.src = url;
        body.appendChild(frame);
      }
      return;
    }
    if (preview.kind === 'html') {
      const frame = document.createElement('iframe');
      frame.className = 'iwb-file-preview-frame';
      frame.sandbox = '';
      frame.srcdoc = preview.text;
      body.appendChild(frame);
      download.href = URL.createObjectURL(file.blob || file);
      url = download.href;
      return;
    }
    const pre = document.createElement('pre');
    pre.className = 'iwb-file-preview-text';
    pre.textContent = preview.text || '这个文件没有可显示的文本内容。';
    body.appendChild(pre);
    if (preview.kind !== 'other') {
      download.href = URL.createObjectURL(file.blob || file);
      url = download.href;
    } else {
      download.href = URL.createObjectURL(file.blob || file);
      url = download.href;
    }
  }).catch((error) => {
    body.textContent = error?.message || '预览失败，请下载后查看。';
    download.href = URL.createObjectURL(file.blob || file);
    url = download.href;
  });
  dialog.showModal();
  return dialog;
}
