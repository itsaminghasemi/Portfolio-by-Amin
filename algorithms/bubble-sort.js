/**
 * Bubble Sort Algorithm
 * Sorts an array of numbers in ascending order using bubble sort.
 * @param {number[]} arr - The array to sort
 * @returns {number[]} - A new sorted array (does not modify original)
 */
function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return result;
}

// Export for browser usage
window.bubbleSort = bubbleSort;
