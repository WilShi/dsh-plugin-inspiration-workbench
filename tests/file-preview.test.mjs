import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { extractDocxText } from '../src/client/docx-text.js';
import { fileKind, formatBytes } from '../src/client/file-preview.js';

test('classifies common file types and formats sizes', () => {
  assert.equal(fileKind({ name: 'a.png', type: 'image/png' }), 'image');
  assert.equal(fileKind({ name: 'a.docx', type: '' }), 'docx');
  assert.equal(fileKind({ name: 'a.html', type: 'text/html' }), 'html');
  assert.equal(fileKind({ name: 'a.md', type: 'text/plain' }), 'text');
  assert.equal(fileKind({ name: 'a.bin', type: 'application/octet-stream' }), 'other');
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(2048), '2.0 KB');
});

test('extracts readable Chinese and English text from a real DOCX file', async () => {
  const buffer = await readFile(new URL('../var/sample.docx', import.meta.url));
  const text = await extractDocxText(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
  assert.ok(text.includes('工作区预览测试'));
  assert.ok(text.includes('中文内容'));
  assert.ok(text.includes('123'));
});
