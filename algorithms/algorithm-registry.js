/**
 * Algorithm Registry
 * Central configuration for all available algorithms in the playground.
 * 
 * To add a new algorithm:
 * 1. Create the algorithm .js file in the /algorithms folder
 * 2. Add an entry to this registry with:
 *    - id: Unique identifier (kebab-case)
 *    - name: Display name for the dropdown
 *    - file: Path to the .js file (relative to this file)
 *    - functionName: The exported function name
 *    - description: Short description shown in the UI
 *    - inputHint: Example of expected input format
 *    - argCount: Number of arguments the function expects
 */

const ALGORITHM_REGISTRY = [
  {
    id: 'binary-search',
    name: 'Binary Search',
    file: './algorithms/binary-search.js',
    functionName: 'binarySearch',
    description: 'Searches for a target value in a sorted array using binary search.',
    inputHint: 'Example: [1, 2, 3, 4, 5], 3 (sorted array, target value)',
    argCount: 2
  },
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    file: './algorithms/bubble-sort.js',
    functionName: 'bubbleSort',
    description: 'Sorts an array of numbers in ascending order using bubble sort.',
    inputHint: 'Example: [5, 2, 8, 1, 9] (array of numbers)',
    argCount: 1
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci Sequence',
    file: './algorithms/fibonacci.js',
    functionName: 'fibonacci',
    description: 'Generates the first n numbers of the Fibonacci sequence.',
    inputHint: 'Example: 10 (number of elements to generate)',
    argCount: 1
  },
  {
    id: 'palindrome',
    name: 'Palindrome Checker',
    file: './algorithms/palindrome.js',
    functionName: 'isPalindrome',
    description: 'Checks if a string is a palindrome (reads the same forwards and backwards).',
    inputHint: 'Example: "A man, a plan, a canal: Panama" (string to check)',
    argCount: 1
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    file: './algorithms/linear-search.js',
    functionName: 'linearSearch',
    description: 'Searches for a target value in an array by checking each element sequentially.',
    inputHint: 'Example: [10, 25, 30, 45, 50], 30 (array, target value)',
    argCount: 2
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    file: './algorithms/selection-sort.js',
    functionName: 'selectionSort',
    description: 'Sorts an array by repeatedly finding the minimum element and placing it at the beginning.',
    inputHint: 'Example: [64, 25, 12, 22, 11] (array of numbers)',
    argCount: 1
  },
  {
    id: 'reverse-string',
    name: 'Reverse String',
    file: './algorithms/reverse-string.js',
    functionName: 'reverseString',
    description: 'Reverses a given string character by character.',
    inputHint: 'Example: "Hello World" (string to reverse)',
    argCount: 1
  },
  {
    id: 'factorial',
    name: 'Factorial',
    file: './algorithms/factorial.js',
    functionName: 'factorial',
    description: 'Calculates the factorial of a non-negative integer (n!).',
    inputHint: 'Example: 5 (non-negative integer)',
    argCount: 1
  },
  {
    id: 'prime-checker',
    name: 'Prime Number Checker',
    file: './algorithms/prime-checker.js',
    functionName: 'isPrime',
    description: 'Checks if a number is prime (divisible only by 1 and itself).',
    inputHint: 'Example: 17 (integer to check)',
    argCount: 1
  },
  {
    id: 'max-element',
    name: 'Find Maximum Element',
    file: './algorithms/max-element.js',
    functionName: 'findMaxElement',
    description: 'Finds the maximum value in an array of numbers.',
    inputHint: 'Example: [3, 7, 2, 9, 1, 5] (array of numbers)',
    argCount: 1
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALGORITHM_REGISTRY };
}

// Export for browser usage - ensure it runs immediately when script loads
(function(global) {
  global.ALGORITHM_REGISTRY = ALGORITHM_REGISTRY;
})(typeof window !== 'undefined' ? window : this);
