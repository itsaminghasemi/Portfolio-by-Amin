/**
 * Bubble Sort Algorithm
 * Sorts an array of numbers in ascending order using bubble sort.
 * @param {number[]} arr - The array to sort
 * @returns {number[]} - A new sorted array (does not modify original)
 */
function bubbleSort(arr) {
  const result = [...arr]; // Create a copy to avoid mutating original
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Swap elements
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred, array is already sorted
    if (!swapped) break;
  }

  return result;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bubbleSort };
}
