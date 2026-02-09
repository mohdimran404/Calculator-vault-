/**
 * Performs calculation based on two values and an operator
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {string} operator - Mathematical operator (+, -, *, /)
 * @returns {string|number} - Result as string or "Error" for invalid operations
 */
export function calculate(a, b, operator) {
  // Handle division by zero
  if (operator === '/' && b === 0) {
    return 'Error';
  }

  let result;
  
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = a / b;
      break;
    default:
      return 'Error';
  }

  // Handle floating point precision issues
  result = parseFloat(result.toFixed(10));
  
  // Return as string to match display format
  return result.toString();
}

/**
 * Checks if a value is a mathematical operator
 * @param {string} value - Value to check
 * @returns {boolean} - True if value is an operator
 */
export function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

/**
 * Formats display value for better readability
 * @param {string} value - Raw display value
 * @returns {string} - Formatted display value
 */
export function formatDisplay(value) {
  if (value === 'Error') return value;
  
  // Remove leading zeros
  let formatted = value.replace(/^0+(?=\d)/, '');
  
  // Ensure we always have at least '0'
  if (formatted === '' || formatted === '.') {
    formatted = '0' + formatted;
  }
  
  // Remove multiple decimal points (keep only first)
  const decimalCount = (formatted.match(/\./g) || []).length;
  if (decimalCount > 1) {
    const firstDecimalIndex = formatted.indexOf('.');
    formatted = formatted.substring(0, firstDecimalIndex + 1) + 
                formatted.substring(firstDecimalIndex + 1).replace(/\./g, '');
  }
  
  // Limit total length to prevent overflow
  if (formatted.length > 15) {
    formatted = formatted.substring(0, 15);
  }
  
  return formatted;
}

/**
 * Evaluates a mathematical expression string
 * Note: This is a safer alternative to eval()
 * @param {string} expression - Mathematical expression
 * @returns {string|number} - Result or "Error"
 */
export function evaluateExpression(expression) {
  try {
    // Remove any whitespace
    const cleanExpression = expression.replace(/\s+/g, '');
    
    // Validate expression contains only numbers and operators
    if (!/^[0-9+\-*/.]+$/.test(cleanExpression)) {
      return 'Error';
    }
    
    // Simple parser for basic operations
    // This handles basic cases but for complex expressions, consider a proper parser
    const tokens = cleanExpression.split(/([+\-*/])/);
    let result = parseFloat(tokens[0]);
    
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseFloat(tokens[i + 1]);
      
      if (isNaN(nextNumber)) {
        return 'Error';
      }
      
      result = calculate(result, nextNumber, operator);
      if (result === 'Error') {
        return 'Error';
      }
    }
    
    return result.toString();
  } catch (error) {
    return 'Error';
  }
}
