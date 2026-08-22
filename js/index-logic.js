"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic year
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Safe DOM queries (inside DOMContentLoaded)
    const menuBtn = document.getElementById("nav-toggle");
    const guideBtns = document.querySelectorAll(".guide-btn"); // Note the 'All'

    // 3. Safe event listener
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        guideBtns.forEach((el) => {
          el.style.display = "none";
        });
      });
    }
  });
})();
