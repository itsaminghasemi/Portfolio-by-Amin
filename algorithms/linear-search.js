/**
 * Linear Search Algorithm
 * Searches for a target value in an array by checking each element sequentially.
 * @param {any[]} arr - The array to search in
 * @param {any} target - The value to search for
 * @returns {number} - The index of the target if found, -1 otherwise
 */
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  
  return -1;
}

// Export for use in other modules (Node.js and browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { linearSearch };
}

// Export for browser usage - ensure it runs immediately when script loads
(function(global) {
  global.linearSearch = linearSearch;
})(typeof window !== 'undefined' ? window : this);
