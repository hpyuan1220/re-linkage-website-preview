const body = document.body;
const langToggle = document.querySelector("[data-lang-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const contactForm = document.querySelector("[data-contact-form]");
const networkForms = document.querySelectorAll("[data-network-form]");

const savedLang = localStorage.getItem("relinkage-lang") || "en";
setLanguage(savedLang);

function setLanguage(lang) {
  body.classList.toggle("lang-en", lang === "en");
  body.classList.toggle("lang-zh", lang === "zh");
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  if (langToggle) {
    langToggle.textContent = lang === "zh" ? "EN" : "中文";
  }
  localStorage.setItem("relinkage-lang", lang);
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const nextLang = body.classList.contains("lang-en") ? "zh" : "en";
    setLanguage(nextLang);
  });
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent("RE-Linkage project inquiry");
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Target market: ${data.get("market") || ""}`,
      "",
      "Project need:",
      `${data.get("message") || ""}`,
    ];
    const bodyText = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:Admin@re-linkage.com?subject=${subject}&body=${bodyText}`;
  });
}

networkForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const formType = form.dataset.formType || "Network submission";
    const subject = encodeURIComponent(`RE-Linkage network submission: ${formType}`);
    const lines = [`Submission type: ${formType}`, ""];

    for (const [key, value] of data.entries()) {
      lines.push(`${formatLabel(key)}: ${value || ""}`);
    }

    const bodyText = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:Admin@re-linkage.com?subject=${subject}&body=${bodyText}`;
  });
});

function formatLabel(key) {
  return key
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
