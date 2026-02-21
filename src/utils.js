export function escapeHtml(text) {
  if (text == null || typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function sanitizeName(val) {
  if (val == null) return '';
  return String(val).trim().slice(0, 100);
}
