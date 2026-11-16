/**
 * Run task-analysis prompts through a real, inspectable DSH session.
 * The session remains in the native sidebar so users can audit the full answer.
 */

export function assistantTextFromView(view) {
  const items = Array.isArray(view?.items) ? view.items : [];
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index];
    if (item?.k === 'assistant' && typeof item.text === 'string' && item.text.trim()) {
      return item.text.trim();
    }
  }
  return '';
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runTaskAnalysis({
  adapter,
  prompt,
  workspaceId,
  timeoutMs = 120000,
  selection,
  signal,
  pollMs = 450,
  title = '灵感工作台 · 任务规划',
}) {
  if (!adapter?.createSession || !adapter?.prompt) {
    throw new Error('当前环境没有提供可用的 AI 会话接口');
  }
  if (!String(prompt || '').trim()) throw new Error('规划内容不能为空');

  const sessionId = await adapter.createSession({ workspaceId, title });
  const stop = adapter.open(sessionId, () => {});
  let timedOut = false;
  const startedAt = Date.now();
  let sawRunning = false;

  const abort = async () => {
    try { await adapter.cancel(sessionId); } catch { /* best effort */ }
  };
  signal?.addEventListener?.('abort', abort, { once: true });

  try {
    if (adapter.waitForReady) await adapter.waitForReady(sessionId, { timeoutMs: 15000 });
    if (selection && adapter.selectModel) {
      await adapter.selectModel(sessionId, {
        provider: selection.provider,
        model: selection.model || selection.id,
        reasoningEffort: selection.reasoningEffort,
      });
    }
    await adapter.prompt(sessionId, prompt, 'queue');

    while (Date.now() - startedAt < timeoutMs) {
      if (signal?.aborted) throw new Error('已取消本次规划');
      const view = adapter.read(sessionId);
      sawRunning = sawRunning || Boolean(view?.running);
      if (view?.lastError) throw new Error(String(view.lastError));
      const text = assistantTextFromView(view);
      // Some adapters publish the final text just before flipping running=false.
      // Requiring either an observed run or a short settle window avoids returning
      // an empty intermediate frame on very fast responses.
      if (text && !view?.running && (sawRunning || Date.now() - startedAt > 1800)) {
        return { sessionId, text, title };
      }
      await sleep(pollMs);
    }
    timedOut = true;
    await abort();
    const error = new Error('本次规划超时，已停止等待；可在原生会话中查看或重试');
    error.sessionId = sessionId;
    throw error;
  } catch (error) {
    if (!error.sessionId) error.sessionId = sessionId;
    if (!timedOut && signal?.aborted) await abort();
    throw error;
  } finally {
    signal?.removeEventListener?.('abort', abort);
    stop?.();
  }
}
