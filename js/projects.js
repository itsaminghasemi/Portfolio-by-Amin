// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Add hover effect with sound feedback for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });

    // Add keyboard navigation support
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add smooth scroll behavior for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add intersection observer for fade-in animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project cards for scroll animations
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Mobile menu close on link click
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });

  console.log('Projects page loaded successfully');
});
