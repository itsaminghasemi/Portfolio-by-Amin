const message = 'Hello from the console!';
console.log(message);

// Question Box
// Complete the function below.
// Do not use a global variable.\

function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

// Test Cases
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // Expected: 10
console.log(double(7)); // Expected: 14
console.log(triple(5)); // Expected: 15
