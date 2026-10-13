// Diamond X site: remembers the chosen language and handles cookie consent for Google Analytics.
(function () {
  var GA_ID = 'G-K88DPJ55S7';
  var CONSENT_KEY = 'diamondx.cookieConsent'; // 'granted' | 'denied'
  var MAP = { pt: 'pt-BR', en: 'en', es: 'es', zh: 'zh-CN' };

  function store(k, v) { try { localStorage.setItem(k, v); } catch (_) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }

  // Language pills
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.dx-lang-pill');
    if (a) store('diamondx.language', MAP[a.getAttribute('hreflang')] || 'pt-BR');
  });

  // Google Analytics: loaded only after the visitor accepts
  function loadGA() {
    if (window.__dxGA) return; window.__dxGA = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  var lang = (document.documentElement.lang || 'pt').slice(0, 2);
  var prefix = lang === 'pt' ? '/' : '/' + lang + '/';
  var T = {
    pt: ['Usamos cookies de análise (Google Analytics) para entender o uso do site e melhorá-lo. Você pode aceitar ou recusar.', 'Aceitar', 'Recusar', 'Política de cookies'],
    en: ['We use analytics cookies (Google Analytics) to understand how the site is used and improve it. You can accept or decline.', 'Accept', 'Decline', 'Cookie policy'],
    es: ['Usamos cookies de análisis (Google Analytics) para entender el uso del sitio y mejorarlo. Puedes aceptar o rechazar.', 'Aceptar', 'Rechazar', 'Política de cookies'],
    zh: ['我们使用分析类 Cookie（Google Analytics）来了解网站的使用情况并加以改进。您可以选择接受或拒绝。', '接受', '拒绝', 'Cookie 政策']
  }[lang] || null;

  function banner() {
    var t = T || ['Usamos cookies de análise (Google Analytics) para melhorar o site.', 'Aceitar', 'Recusar', 'Política de cookies'];
    var css = document.createElement('style');
    css.textContent = '.dx-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:720px;margin:0 auto;background:#FFFFFF;color:#1D2330;border:1px solid #EAECF1;border-radius:18px;box-shadow:0 18px 48px rgba(29,35,48,.16);padding:18px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;font:15px/1.5 Inter,"PingFang SC","Microsoft YaHei",system-ui,sans-serif}'
      + '.dx-cookie p{margin:0;flex:1 1 320px}.dx-cookie a{color:#A6121C}.dx-cookie div{display:flex;gap:8px;flex-wrap:wrap}'
      + '.dx-cookie button{font:inherit;font-weight:600;border-radius:999px;padding:10px 18px;cursor:pointer;min-height:44px}'
      + '.dx-cookie .ok{background:#A6121C;color:#FFFFFF;border:0}.dx-cookie .no{background:#FFFFFF;color:#1D2330;border:1px solid #DCE0E8}';
    document.head.appendChild(css);
    var box = document.createElement('div');
    box.className = 'dx-cookie'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', t[3]);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(t[0] + ' '));
    var link = document.createElement('a'); link.href = prefix + 'termos/#cookies'; link.textContent = t[3];
    p.appendChild(link);
    var btns = document.createElement('div');
    var no = document.createElement('button'); no.type = 'button'; no.className = 'no'; no.textContent = t[2];
    var ok = document.createElement('button'); ok.type = 'button'; ok.className = 'ok'; ok.textContent = t[1];
    btns.appendChild(no); btns.appendChild(ok);
    box.appendChild(p); box.appendChild(btns);
    ok.addEventListener('click', function () { store(CONSENT_KEY, 'granted'); box.remove(); loadGA(); });
    no.addEventListener('click', function () { store(CONSENT_KEY, 'denied'); box.remove(); });
    document.body.appendChild(box);
  }

  var c = read(CONSENT_KEY);
  if (c === 'granted') loadGA();
  else if (c !== 'denied') banner();
})();
