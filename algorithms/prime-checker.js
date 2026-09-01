/**
 * Prime Number Checker
 * Checks if a number is prime (divisible only by 1 and itself).
 * @param {number} n - The number to check
 * @returns {boolean} - True if the number is prime, false otherwise
 */
function isPrime(n) {
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }

  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  const sqrtN = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= sqrtN; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

// Export for browser usage
window.isPrime = isPrime;
