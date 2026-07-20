"use strict";

// Wait for DOM to be fully loaded before querying elements
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".close-modal");
  const btnsOpenModal = document.querySelectorAll(".show-modal");

  const openModal = function () {
    if (modal && overlay) {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }
  };

  const closeModal = function () {
    if (modal && overlay) {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  };

  // Attach click events to open buttons
  for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener("click", openModal);
  }

  // Close button and overlay click events
  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  // Escape key handler
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});
