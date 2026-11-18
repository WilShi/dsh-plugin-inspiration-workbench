import test from 'node:test';
import assert from 'node:assert/strict';
import { pipelineFingerprint } from '../src/client/pipeline-utils.js';

test('pipelineFingerprint is stable for identical full text', () => {
  assert.equal(pipelineFingerprint('结论一'), pipelineFingerprint('结论一'));
});

test('pipelineFingerprint distinguishes outputs sharing a long prefix', () => {
  const prefix = '相同前缀'.repeat(80);
  assert.notEqual(pipelineFingerprint(prefix + 'A'), pipelineFingerprint(prefix + 'B'));
});
