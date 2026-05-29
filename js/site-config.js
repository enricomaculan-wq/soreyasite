window.SOREYA_SITE = {
  url: "https://soreya.app",
  email: "support@soreya.app",
  whatsapp: "393701608154",
  whatsappDefault:
    "Ciao, vorrei informazioni su Soreya Assistant.",
  whatsappCalculator:
    "Ciao, ho provato il calcolatore sul sito e vorrei capire come Soreya Assistant può aiutarmi.",
};

window.soreyaWhatsAppUrl = function (message) {
  const text = encodeURIComponent(
    message || window.SOREYA_SITE.whatsappDefault
  );
  return `https://wa.me/${window.SOREYA_SITE.whatsapp}?text=${text}`;
};
