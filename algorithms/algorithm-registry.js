/**
 * Algorithm Registry
 * Central configuration for all available algorithms in the playground.
 * 
 * To add a new algorithm:
 * 1. Create the algorithm .js file in the /algorithms folder
 * 2. Add an entry to this registry with:
 *    - name: Display name for the dropdown
 *    - file: Path to the .js file (relative to this file)
 *    - function: The exported function name
 *    - description: Short description shown in the UI
 *    - inputHint: Example of expected input format
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
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALGORITHM_REGISTRY };
}
