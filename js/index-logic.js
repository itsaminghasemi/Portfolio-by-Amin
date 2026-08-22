"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic year
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
})();
