/**
 * Factorial Algorithm
 * Calculates the factorial of a non-negative integer (n!).
 * @param {number} n - A non-negative integer
 * @returns {number} - The factorial of n (n! = n × (n-1) × ... × 1)
 */
function factorial(n) {
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }

  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

// Export for browser usage
window.factorial = factorial;
