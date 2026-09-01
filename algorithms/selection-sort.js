/**
 * Selection Sort Algorithm
 * Sorts an array by repeatedly finding the minimum element and placing it at the beginning.
 * @param {number[]} arr - The array to sort
 * @returns {number[]} - A new sorted array (does not modify original)
 */
function selectionSort(arr) {
  const result = [...arr]; // Create a copy to avoid mutating original
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Find the minimum element in the remaining unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element of unsorted portion
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  
  return result;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { selectionSort };
}
