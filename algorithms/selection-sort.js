/**
 * Selection Sort Algorithm
 * Sorts an array by repeatedly finding the minimum element and placing it at the beginning.
 * @param {number[]} arr - The array to sort
 * @returns {number[]} - A new sorted array (does not modify original)
 */
function selectionSort(arr) {
  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }

  return result;
}

// Export for browser usage
window.selectionSort = selectionSort;
