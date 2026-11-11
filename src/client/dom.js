const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

export { clamp, el };
