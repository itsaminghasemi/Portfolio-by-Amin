/**
 * Algorithm Playground - Main JavaScript
 * Handles algorithm selection, input parsing, execution, and output display.
 */

(function() {
  "use strict";

  // DOM Elements
  const algorithmSelect = document.getElementById('algorithm-select');
  const testInput = document.getElementById('test-input');
  const runBtn = document.getElementById('run-btn');
  const clearBtn = document.getElementById('clear-btn');
  const outputPanel = document.getElementById('output-panel');
  const inputHint = document.getElementById('input-hint');

  /**
   * Initialize the playground
   */
  function init() {
    populateAlgorithmSelect();
    setupEventListeners();
    updateInputHint();
  }

  /**
   * Populate the algorithm dropdown from the registry
   */
  function populateAlgorithmSelect() {
    if (typeof ALGORITHM_REGISTRY === 'undefined') {
      showError('Algorithm registry not loaded. Please refresh the page.');
      return;
    }

    ALGORITHM_REGISTRY.forEach(algo => {
      const option = document.createElement('option');
      option.value = algo.id;
      option.textContent = algo.name;
      algorithmSelect.appendChild(option);
    });
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    algorithmSelect.addEventListener('change', handleAlgorithmChange);
    runBtn.addEventListener('click', handleRun);
    clearBtn.addEventListener('click', handleClear);
    document.addEventListener('keydown', handleKeyboard);

    testInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        handleRun();
      }
    });
  }

  /**
   * Handle algorithm selection change
   */
  function handleAlgorithmChange() {
    const selectedId = algorithmSelect.value;
    const selectedAlgo = ALGORITHM_REGISTRY.find(a => a.id === selectedId);

    if (selectedAlgo) {
      updateInputHint(selectedAlgo);
    }

    clearOutput();
  }

  /**
   * Update the input hint based on selected algorithm
   */
  function updateInputHint(algo) {
    if (algo && algo.inputHint) {
      inputHint.textContent = algo.inputHint;
      inputHint.style.display = 'block';
    } else {
      inputHint.textContent = 'Format your input as JavaScript values (numbers, strings, arrays, objects).';
      inputHint.style.display = 'block';
    }
  }

  /**
   * Handle run button click
   */
  function handleRun() {
    const selectedId = algorithmSelect.value;

    if (!selectedId) {
      showError('Please select an algorithm first.');
      return;
    }

    const inputValue = testInput.value.trim();

    if (!inputValue) {
      showError('Please enter a test case.');
      return;
    }

    const selectedAlgo = ALGORITHM_REGISTRY.find(a => a.id === selectedId);

    if (!selectedAlgo) {
      showError('Selected algorithm not found.');
      return;
    }

    executeAlgorithm(selectedAlgo, inputValue);
  }

  /**
   * Parse the input string into JavaScript arguments
   */
  function parseInput(inputStr, argCount) {
    try {
      if (argCount === 1) {
        return [evaluateInput(inputStr)];
      }

      const args = [];
      let depth = 0;
      let current = '';
      let inString = false;
      let escapeNext = false;

      for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr[i];

        if (escapeNext) {
          current += char;
          escapeNext = false;
          continue;
        }

        if (char === '\\') {
          escapeNext = true;
          current += char;
          continue;
        }

        if (char === '"' || char === "'") {
          inString = !inString;
          current += char;
          continue;
        }

        if (!inString) {
          if (char === '[' || char === '{' || char === '(') {
            depth++;
          } else if (char === ']' || char === '}' || char === ')') {
            depth--;
          } else if (char === ',' && depth === 0) {
            args.push(evaluateInput(current.trim()));
            current = '';
            continue;
          }
        }

        current += char;
      }

      if (current.trim()) {
        args.push(evaluateInput(current.trim()));
      }

      return args;

    } catch (error) {
      throw new Error(`Invalid input syntax: ${error.message}`);
    }
  }

  /**
   * Safely evaluate a single input value
   */
  function evaluateInput(str) {
    try {
      if ((str.startsWith('"') && str.endsWith('"')) ||
          (str.startsWith("'") && str.endsWith("'"))) {
        return str.slice(1, -1);
      }

      // eslint-disable-next-line no-new-func
      return Function('"use strict";return (' + str + ')')();
    } catch (error) {
      return str;
    }
  }

  /**
   * Execute the selected algorithm with parsed input
   */
  function executeAlgorithm(algo, inputValue) {
    try {
      const fn = window[algo.functionName];

      if (typeof fn !== 'function') {
        throw new Error(`Function "${algo.functionName}" not found.`);
      }

      const args = parseInput(inputValue, algo.argCount);

      if (args.length < algo.argCount) {
        throw new Error(`Expected ${algo.argCount} argument(s), but received ${args.length}. ${algo.inputHint}`);
      }

      const result = fn(...args);

      displayResult(result);

    } catch (error) {
      showError(error.message);
    }
  }

  /**
   * Display successful result
   */
  function displayResult(result) {
    outputPanel.className = 'output-panel success';

    let formattedResult;

    if (result === null) {
      formattedResult = 'null';
    } else if (result === undefined) {
      formattedResult = 'undefined';
    } else if (typeof result === 'object') {
      formattedResult = JSON.stringify(result, null, 2);
    } else if (typeof result === 'boolean') {
      formattedResult = result ? 'true ✓' : 'false ✗';
    } else {
      formattedResult = String(result);
    }

    outputPanel.innerHTML = `<span class="result-prefix">Result:</span> ${escapeHtml(formattedResult)}`;
  }

  /**
   * Display error message
   */
  function showError(message) {
    outputPanel.className = 'output-panel error';
    outputPanel.innerHTML = `<span class="error-message">⚠️ Error: ${escapeHtml(message)}</span>`;
  }

  /**
   * Clear input and output
   */
  function handleClear() {
    testInput.value = '';
    clearOutput();
    testInput.focus();
  }

  /**
   * Clear only the output panel
   */
  function clearOutput() {
    outputPanel.className = 'output-panel empty';
    outputPanel.innerHTML = '<span class="placeholder-text">Results will appear here...</span>';
  }

  /**
   * Handle keyboard shortcuts
   */
  function handleKeyboard(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleRun();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      handleClear();
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
