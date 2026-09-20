function getCartSubtotal(prices) {
  // Your implementation
  if (!Array.isArray(prices)) {
    throw new TypeError('Input must be an array');
  }
  let sum = 0;
  for (let i = 0; i < prices.length; i++) {
    if (typeof prices[i] === 'number' && Number.isFinite(prices[i]) && prices[i] >= 0) {
      sum += prices[i];
    }
  }
  return Math.round(sum * 100) / 100; // Round to 2 decimal places
}

// 🧪 Test cases
console.log(getCartSubtotal([19.99, 5, 0.01]));
// Expected: 25

console.log(getCartSubtotal([10, '20', -5, NaN, Infinity, null, 2.5]));
// Expected: 12.5

console.log(getCartSubtotal([]));
// Expected: 0

console.log(getCartSubtotal('19.99'));
// Expected: TypeError
