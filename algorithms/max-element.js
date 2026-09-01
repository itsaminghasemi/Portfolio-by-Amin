/**
 * Find Maximum Element Algorithm
 * Finds the maximum value in an array of numbers.
 * @param {number[]} arr - The array to search
 * @returns {number|null} - The maximum value, or null if array is empty
 * @throws {Error} If input is not an array
 */
function findMaxElement(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  
  if (arr.length === 0) {
    return null;
  }
  
  let max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  return max;
}

// Export for use in other modules (Node.js and browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { findMaxElement };
}

// Export for browser usage - ensure it runs immediately when script loads
(function(global) {
  global.findMaxElement = findMaxElement;
})(typeof window !== 'undefined' ? window : this);
