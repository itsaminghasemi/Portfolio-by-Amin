// Guide Modal Functions - Centralized Script
// Handles guide modal functionality for all pages

(function () {
  'use strict';

  // Open guide modal
  let lastFocusedElement = null;

  window.openGuideModal = function () {
    const modal = document.getElementById('guideModal');

    if (modal) {
      lastFocusedElement = document.activeElement;
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('tabindex', '-1');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Hide all guide buttons while the modal is open
      document.querySelectorAll('.guide-btn').forEach((button) => {
        button.hidden = true;
      });
      requestAnimationFrame(() => modal.focus());
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
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
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
        if (e.key === 'Tab' && guideModal.classList.contains('active')) {
          const focusable = guideModal.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
      guideModal.addEventListener('transitionend', () => {
        if (guideModal.classList.contains('active')) guideModal.focus();
      }, { once: true });
    }

    // Mobile menu button
    const menuBtn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-links');

    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('menu-open', !expanded);
      });
      nav.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('menu-open');
      });
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  });
})();
