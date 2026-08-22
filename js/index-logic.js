// Dynamic footer year

"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  const menuBtn = document.getElementById("nav-toggle");
  const guideBtn = document.querySelector(".guide-btn");

  menuBtn.addEventListener("click", () => {
    guideBtn.array.forEach((el) => {
      el.style.display = "none";
    });
  });
})();
