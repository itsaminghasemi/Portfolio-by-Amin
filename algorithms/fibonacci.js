/**
 * Fibonacci Sequence Generator
 * Generates the first n numbers of the Fibonacci sequence.
 * @param {number} n - The number of Fibonacci numbers to generate (must be >= 0)
 * @returns {number[]} - An array containing the first n Fibonacci numbers
 */
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const result = [0, 1];

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}

// Export for browser usage
window.fibonacci = fibonacci;
