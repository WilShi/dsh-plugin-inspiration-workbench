/** Stable, full-content fingerprint for idempotent pipeline delivery. */
export function pipelineFingerprint(text) {
  const source = String(text || '');
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}
