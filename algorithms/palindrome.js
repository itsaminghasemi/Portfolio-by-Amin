/**
 * Palindrome Checker
 * Checks if a string is a palindrome (reads the same forwards and backwards).
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a palindrome, false otherwise
 */
function isPalindrome(str) {
  // Normalize: remove non-alphanumeric chars and convert to lowercase
  const normalized = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  // Compare with reversed version
  const reversed = normalized.split('').reverse().join('');
  
  return normalized === reversed;
}

// Export for use in other modules (Node.js and browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isPalindrome };
}

// Export for browser usage - ensure it runs immediately when script loads
(function(global) {
  global.isPalindrome = isPalindrome;
})(typeof window !== 'undefined' ? window : this);
