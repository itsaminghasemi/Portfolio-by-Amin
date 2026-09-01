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

// Export for use in other modules (Node.js and browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fibonacci };
}

// Export for browser usage - ensure it runs immediately when script loads
(function(global) {
  global.fibonacci = fibonacci;
})(typeof window !== 'undefined' ? window : this);
