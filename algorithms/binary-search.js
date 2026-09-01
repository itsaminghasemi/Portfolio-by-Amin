/**
 * Binary Search Algorithm
 * Searches for a target value in a sorted array using binary search.
 * @param {number[]} arr - A sorted array of numbers
 * @param {number} target - The value to search for
 * @returns {number} - The index of the target if found, -1 otherwise
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// Export for use in other modules (Node.js and browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { binarySearch };
}

// Export for browser usage - attach directly to window
if (typeof window !== 'undefined') {
  window.binarySearch = binarySearch;
}
