// Guide Modal Functions - Centralized Script
// This script handles the guide modal functionality for all pages

(function () {
  'use strict';

  // Open guide modal
  window.openGuideModal = function () {
    const modal = document.getElementById('guideModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Close guide modal
  window.closeGuideModal = function () {
    const modal = document.getElementById('guideModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Initialize event listeners when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const guideModal = document.getElementById('guideModal');

    if (guideModal) {
      // Close modal when clicking outside (on overlay)
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

    // Safe DOM queries
    const menuBtn = document.querySelector('.nav-toggle-label');
    const guideBtns = document.querySelectorAll('.guide-btn');

    // 3. Toggle event listener
    if (menuBtn && guideBtns.length > 0) {
      menuBtn.addEventListener('click', () => {
        guideBtns.forEach((el) => {
          // If currently hidden, revert to default CSS (""). Otherwise, hide it ("none").
          el.style.display = el.style.display === 'none' ? '' : 'none';
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
