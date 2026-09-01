/**
 * Palindrome Checker
 * Checks if a string is a palindrome (reads the same forwards and backwards).
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a palindrome, false otherwise
 */
function isPalindrome(str) {
  const normalized = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
}

// Export for browser usage
window.isPalindrome = isPalindrome;
