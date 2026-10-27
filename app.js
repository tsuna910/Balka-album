(function () {
  "use strict";

  var SHARE_TEXT = "バルカ入国ツアーの旅アルバム。お前は、VIVANTか？\n#バルカ入国ツアー #VIVANT";

  // アルバムのURL：?以降と#以降を除いた絶対URL
  function albumUrl() {
    return location.href.split("#")[0].split("?")[0];
  }

  // --- スクロールで ふわっと表示 ---
  document.documentElement.classList.add("js");
  var reveals = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  // --- Xで共有 ---
  document.getElementById("share-x").addEventListener("click", function () {
    var intent = "https://twitter.com/intent/tweet" +
      "?text=" + encodeURIComponent(SHARE_TEXT) +
      "&url=" + encodeURIComponent(albumUrl());
    window.open(intent, "_blank", "noopener");
  });

  // --- URLをコピー ---
  var copyBtn = document.getElementById("copy-url");
  var copyLabel = copyBtn.textContent;
  var resetTimer = null;

  function showCopied() {
    copyBtn.textContent = "コピーしました";
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () { copyBtn.textContent = copyLabel; }, 2000);
  }

  function showFallback() {
    var box = document.getElementById("copy-fallback");
    var input = document.getElementById("copy-input");
    input.value = albumUrl();
    box.hidden = false;
    input.focus();
    input.select();
    input.setSelectionRange(0, input.value.length);
  }

  copyBtn.addEventListener("click", function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(albumUrl()).then(showCopied, showFallback);
    } else {
      showFallback();
    }
  });
})();
