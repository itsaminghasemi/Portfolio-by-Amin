/**
 * Reverse String Algorithm
 * Reverses a given string character by character.
 * @param {string} str - The string to reverse
 * @returns {string} - The reversed string
 */
function reverseString(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }

  return str.split('').reverse().join('');
}

// Export for browser usage
window.reverseString = reverseString;
