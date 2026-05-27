const toggle = document.querySelector("[data-language-toggle]");
const html = document.documentElement;

function setLanguage(language) {
  html.lang = language === "zh" ? "zh-CN" : "pt-BR";

  document.querySelectorAll("[data-lang]").forEach((element) => {
    element.hidden = element.dataset.lang !== language;
  });
}

toggle.addEventListener("click", () => {
  const nextLanguage = html.lang === "zh-CN" ? "pt" : "zh";
  setLanguage(nextLanguage);
});
