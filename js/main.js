document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
      });
    });
  }

  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.style.background =
        window.scrollY > 40
          ? "rgba(10, 10, 10, 0.92)"
          : "rgba(10, 10, 10, 0.72)";
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll(".products-nav__list a, .footer__col a")
    .forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.endsWith(current)) {
        a.classList.add("active");
      }
    });

  document.querySelectorAll("[data-wa-msg]").forEach((el) => {
    const key = el.getAttribute("data-wa-msg");
    let msg;
    if (key === "calculator") {
      msg = window.SOREYA_SITE?.whatsappCalculator;
    } else if (key) {
      msg = key;
    }
    if (window.soreyaWhatsAppUrl) {
      el.href = window.soreyaWhatsAppUrl(msg || undefined);
    }
  });

  const waFloat = document.querySelector(".wa-float");
  if (waFloat && window.soreyaWhatsAppUrl) {
    waFloat.href = window.soreyaWhatsAppUrl();
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("reveal--visible"));
  }

  if (window.SOREYA_SITE?.analyticsId && window.plausible) {
    return;
  }
  if (window.SOREYA_SITE?.analyticsId) {
    const s = document.createElement("script");
    s.defer = true;
    s.dataset.domain = window.SOREYA_SITE.analyticsId;
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }
});
