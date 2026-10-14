/* Static artwork only needs to report startup status to its display page. */
(function () {
  const token = new URLSearchParams(location.hash.slice(1)).get('displayToken');
  function send(type) { parent.postMessage({ channel: 'project-display', token, type }, '*'); }
  window.addEventListener('error', () => send('error'));
  window.addEventListener('load', () => queueMicrotask(() => send('ready')));
})();
