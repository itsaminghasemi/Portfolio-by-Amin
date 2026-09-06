// Guide Modal Functions - Centralized Script
// Handles guide modal functionality for all pages

(function () {
  'use strict';

  // Open guide modal
  window.openGuideModal = function () {
    const modal = document.getElementById('guideModal');

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Hide all guide buttons while the modal is open
      document.querySelectorAll('.guide-btn').forEach((button) => {
        button.hidden = true;
      });
    }
  };

  // Close guide modal
  window.closeGuideModal = function () {
    const modal = document.getElementById('guideModal');

    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';

      // Show all guide buttons again
      document.querySelectorAll('.guide-btn').forEach((button) => {
        button.hidden = false;
      });
    }
  };

  // Initialize event listeners when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const guideModal = document.getElementById('guideModal');

    if (guideModal) {
      // Close modal when clicking outside the modal content
      guideModal.addEventListener('click', function (e) {
        if (e.target === this) {
          closeGuideModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeGuideModal();
        }
      });
    }

    // Mobile menu button
    const menuBtn = document.querySelector('.nav-toggle-label');
    const guideBtns = document.querySelectorAll('.guide-btn');

    if (menuBtn && guideBtns.length > 0) {
      menuBtn.addEventListener('click', () => {
        guideBtns.forEach((button) => {
          // Do not toggle guide visibility while the modal is open
          if (!guideModal?.classList.contains('active')) {
            button.hidden = !button.hidden;
          }
        });
      });
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  });
})();
