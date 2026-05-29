(function () {
  const host = window.location.hostname;
  const isProd =
    host === "soreya.app" ||
    host === "www.soreya.app" ||
    host === "soreya.it" ||
    host === "www.soreya.it";

  if (!isProd) return;

  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };

  if (document.querySelector('script[src="/_vercel/insights/script.js"]')) {
    return;
  }

  const script = document.createElement("script");
  script.defer = true;
  script.src = "/_vercel/insights/script.js";
  document.head.appendChild(script);
})();
