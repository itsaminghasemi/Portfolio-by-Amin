/**
 * JS Drum Kit - Interactive Virtual Drums
 * Premium implementation with keyboard and mouse/touch support
 * Synced with Portfolio theme
 */

(function() {
  'use strict';

  // Cache audio elements for better performance
  const audioCache = new Map();
  
  /**
   * Preload all audio files into cache
   */
  function preloadAudio() {
    const audioElements = document.querySelectorAll('audio[data-key]');
    audioElements.forEach(audio => {
      const key = audio.getAttribute('data-key');
      audioCache.set(key, audio);
      // Start loading
      audio.load();
    });
  }

  /**
   * Play sound for a given key code
   * @param {string} keyCode - The key code to play
   */
  function playSound(keyCode) {
    const audio = audioCache.get(keyCode);
    if (!audio) return;

    // Reset audio to start for rapid repeated plays
    audio.currentTime = 0;
    
    // Play with error handling
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn(`Audio playback failed for key ${keyCode}:`, error);
      });
    }
  }

  /**
   * Add visual feedback to the key element
   * @param {string} keyCode - The key code to highlight
   */
  function addVisualFeedback(keyCode) {
    const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (!keyElement) return;

    // Add playing class
    keyElement.classList.add('playing');

    // Remove after animation completes
    setTimeout(() => {
      keyElement.classList.remove('playing');
    }, 150);
  }

  /**
   * Handle key press event
   * @param {KeyboardEvent} e - The keyboard event
   */
  function handleKeyPress(e) {
    const keyCode = e.keyCode || e.which;
    
    // Only handle valid drum keys (A-L: 65-76)
    if (keyCode < 65 || keyCode > 76) return;

    playSound(keyCode);
    addVisualFeedback(keyCode);
  }

  /**
   * Handle click/tap on drum pads
   * @param {MouseEvent|TouchEvent} e - The click/touch event
   */
  function handleClick(e) {
    // Get the closest .key element (in case of clicking child elements)
    const keyElement = e.target.closest('.key');
    if (!keyElement) return;

    const keyCode = keyElement.getAttribute('data-key');
    if (!keyCode) return;

    playSound(keyCode);
    addVisualFeedback(keyCode);

    // Remove focus to prevent spacebar re-triggering
    keyElement.blur();
  }

  /**
   * Handle keyboard accessibility (Enter/Space)
   * @param {KeyboardEvent} e - The keyboard event
   */
  function handleKeyAccessibility(e) {
    if (e.target.classList.contains('key')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const keyCode = e.target.getAttribute('data-key');
        playSound(keyCode);
        addVisualFeedback(keyCode);
      }
    }
  }

  /**
   * Update footer year dynamically
   */
  function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Initialize the drum kit
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeDrumKit);
    } else {
      initializeDrumKit();
    }
  }

  /**
   * Main initialization function
   */
  function initializeDrumKit() {
    // Preload audio files
    preloadAudio();

    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);

    // Add click listeners to all drum pads
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
      key.addEventListener('click', handleClick);
      key.addEventListener('keydown', handleKeyAccessibility);
    });

    // Update footer year
    updateFooterYear();

    // Log initialization
    console.log('🥁 JS Drum Kit initialized successfully!');
    console.log('Press keys A-L or click/tap the pads to play.');
  }

  // Start initialization
  init();

})();
