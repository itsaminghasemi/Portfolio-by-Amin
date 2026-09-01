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

  // State
  let loadedAlgorithms = {};

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
    // Algorithm selection change
    algorithmSelect.addEventListener('change', handleAlgorithmChange);

    // Run button click
    runBtn.addEventListener('click', handleRun);

    // Clear button click
    clearBtn.addEventListener('click', handleClear);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    // Input field enter key (for single-line inputs)
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
      loadAlgorithm(selectedAlgo);
    }
    
    // Clear previous output when changing algorithms
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
   * Load an algorithm script dynamically
   */
  async function loadAlgorithm(algo) {
    if (loadedAlgorithms[algo.id]) {
      return; // Already loaded
    }

    try {
      // Create script element to load the algorithm file
      const script = document.createElement('script');
      script.src = algo.file;
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load algorithm: ${algo.name}`));
        document.head.appendChild(script);
      });

      // Mark as loaded
      loadedAlgorithms[algo.id] = true;
      
    } catch (error) {
      showError(`Failed to load algorithm "${algo.name}": ${error.message}`);
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
      // For multiple arguments, we need to split carefully
      // This handles comma-separated values while respecting nested structures
      
      if (argCount === 1) {
        // Single argument - just eval the whole thing
        return [evaluateInput(inputStr)];
      }
      
      // Multiple arguments - need to parse carefully
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
            // Found argument separator
            args.push(evaluateInput(current.trim()));
            current = '';
            continue;
          }
        }
        
        current += char;
      }
      
      // Don't forget the last argument
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
      // Handle string literals
      if ((str.startsWith('"') && str.endsWith('"')) || 
          (str.startsWith("'") && str.endsWith("'"))) {
        return str.slice(1, -1);
      }
      
      // Use Function constructor for safer eval
      // eslint-disable-next-line no-new-func
      return Function('"use strict";return (' + str + ')')();
    } catch (error) {
      // If evaluation fails, return as string
      return str;
    }
  }

  /**
   * Execute the selected algorithm with parsed input
   */
  function executeAlgorithm(algo, inputValue) {
    try {
      // Get the function from global scope
      const fn = window[algo.functionName];
      
      if (typeof fn !== 'function') {
        throw new Error(`Function "${algo.functionName}" not found. Make sure the algorithm file exports it correctly.`);
      }

      // Parse input arguments
      const args = parseInput(inputValue, algo.argCount);
      
      // Validate argument count
      if (args.length < algo.argCount) {
        throw new Error(`Expected ${algo.argCount} argument(s), but received ${args.length}. ${algo.inputHint}`);
      }

      // Execute the algorithm
      const result = fn(...args);
      
      // Display the result
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
    // Ctrl+Enter to run
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleRun();
    }
    
    // Escape to clear
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
