/** Minimal, dependency-free DOCX text extraction for browser previews. */
function findEndOfCentralDirectory(view) {
  const start = Math.max(0, view.byteLength - 65557);
  for (let index = view.byteLength - 22; index >= start; index -= 1) {
    if (view.getUint32(index, true) === 0x06054b50) return index;
  }
  return -1;
}

async function inflate(data) {
  if (typeof DecompressionStream === 'undefined') throw new Error('当前浏览器不支持 DOCX 解压');
  const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return await new Response(stream).arrayBuffer();
}

export async function readZipEntry(buffer, entryName) {
  const view = new DataView(buffer);
  const decoder = new TextDecoder();
  const end = findEndOfCentralDirectory(view);
  if (end < 0) throw new Error('不是有效的 DOCX 文件');
  const count = view.getUint16(end + 10, true);
  let cursor = view.getUint32(end + 16, true);
  for (let index = 0; index < count; index += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) break;
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = decoder.decode(new Uint8Array(buffer, cursor + 46, nameLength));
    if (name === entryName) {
      if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error('DOCX 本地文件头损坏');
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const offset = localOffset + 30 + localNameLength + localExtraLength;
      const bytes = buffer.slice(offset, offset + compressedSize);
      if (method === 0) return bytes;
      if (method === 8) return await inflate(bytes);
      throw new Error('DOCX 使用了暂不支持的压缩方式');
    }
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error('DOCX 中找不到 document.xml');
}

function xmlText(xml) {
  return xml
    .replace(/<\/w:(p|tr)\b[^>]*>/g, '\n')
    .replace(/<\/w:tc\b[^>]*>/g, '\t')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function extractDocxText(buffer) {
  const bytes = await readZipEntry(buffer, 'word/document.xml');
  const xml = new TextDecoder().decode(bytes);
  return xmlText(xml).slice(0, 240000);
}

export async function extractPptxText(buffer) {
  const decoder = new TextDecoder();
  const slides = [];
  const view = new DataView(buffer);
  const end = findEndOfCentralDirectory(view);
  if (end < 0) throw new Error('不是有效的 PPTX 文件');
  const count = view.getUint16(end + 10, true);
  let cursor = view.getUint32(end + 16, true);
  const names = [];
  for (let index = 0; index < count; index += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) break;
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
    slides.push('## ' + name + '\n' + xmlText(xml));
  }
  return slides.join('\n\n').slice(0, 240000);
}
