"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic year
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Safe DOM queries
    const menuBtn = document.querySelector(".nav-toggle-label");
    const guideBtns = document.querySelectorAll(".guide-btn");

    // 3. Toggle event listener
    if (menuBtn && guideBtns.length > 0) {
      menuBtn.addEventListener("click", () => {
        guideBtns.forEach((el) => {
          // If currently hidden, revert to default CSS (""). Otherwise, hide it ("none").
          el.style.display = el.style.display === "none" ? "" : "none";
        });
      });
    }
  });
})();
