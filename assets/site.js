// Remembers the language picked on the site (same key the platform uses).
(function () {
  var MAP = { pt: 'pt-BR', en: 'en', es: 'es', zh: 'zh-CN' };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.dx-lang-pill');
    if (!a) return;
    try { localStorage.setItem('diamondx.language', MAP[a.getAttribute('hreflang')] || 'pt-BR'); } catch (_) {}
  });
})();
