/**
 * Safe expression evaluator using expr-eval library
 * Supports: +, -, *, /, brackets, decimal numbers
 * No eval() usage - production safe
 */

import { Parser } from "expr-eval";

/**
 * Validates if an expression is complete and can be evaluated
 * @param {string} expression - Mathematical expression
 * @returns {boolean} - True if expression is valid for evaluation
 */
export const isValidExpression = (expression) => {
  if (!expression || expression.trim() === "") {
    return false;
  }

  // Check for balanced brackets
  let bracketCount = 0;
  for (let char of expression) {
    if (char === "(") bracketCount++;
    if (char === ")") bracketCount--;
    if (bracketCount < 0) return false;
  }

  if (bracketCount !== 0) return false;

  // Check if expression ends with a valid number or closing bracket
  const lastChar = expression.trim().slice(-1);
  if (!/[\d)]/.test(lastChar)) return false;

  return true;
};

/**
 * Evaluates a mathematical expression safely
 * @param {string} expression - Mathematical expression to evaluate
 * @returns {object} - { result: number, error: string | null }
 */
export const evaluateExpression = (expression) => {
  try {
    if (!isValidExpression(expression)) {
      return { result: null, error: "Invalid expression" };
    }

    const parser = new Parser();
    const result = parser.evaluate(expression);

    // Handle edge cases
    if (!isFinite(result)) {
      return { result: null, error: "Math error" };
    }

    // Round to avoid floating point precision issues
    const rounded = Math.round(result * 1000000) / 1000000;

    return { result: rounded, error: null };
  } catch (error) {
    return { result: null, error: "Invalid expression" };
  }
};

/**
 * Formats a number for display
 * @param {number} num - Number to format
 * @param {number} maxLength - Maximum length for display
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num, maxLength = 20) => {
  if (num === null || num === undefined) return "";

  let str = num.toString();

  // Handle very large or very small numbers
  if (str.length > maxLength) {
    return parseFloat(num).toExponential(5);
  }

  return str;
};

/**
 * Validates the format of an input before adding to expression
 * @param {string} currentExpression - Current expression
 * @param {string} input - Character being added
 * @returns {boolean} - True if input is valid to add
 */
export const isValidInput = (currentExpression, input) => {
  const lastChar = currentExpression.slice(-1);

  // Prevent multiple decimal points in same number
  if (input === ".") {
    const lastNumberPart = currentExpression.split(/[\+\-\*\/\(]/).pop();
    if (lastNumberPart && lastNumberPart.includes(".")) return false;
    if (lastChar === "" || lastChar === "(") return false;
  }

  // Prevent operator at start (except -)
  if (["+", "*", "/"].includes(input) && currentExpression === "") return false;

  // Prevent consecutive operators (except - after operator for negative numbers)
  if (
    ["+", "-", "*", "/", "("].includes(input) &&
    ["+", "-", "*", "/", "("].includes(lastChar)
  ) {
    if (input === "-" && ["+", "-", "*", "/", "("].includes(lastChar)) {
      return true; // Allow negative numbers
    }
    return false;
  }

  // Prevent closing bracket if no opening bracket
  if (input === ")") {
    const openCount = (currentExpression.match(/\(/g) || []).length;
    const closeCount = (currentExpression.match(/\)/g) || []).length;
    if (closeCount >= openCount) return false;
    if (
      lastChar === "(" ||
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "*" ||
      lastChar === "/"
    ) {
      return false;
    }
  }

  // Prevent opening bracket after digit
  if (input === "(" && lastChar && /\d/.test(lastChar)) {
    return false;
  }

  return true;
};

/**
 * Removes the last character from expression
 * @param {string} expression - Current expression
 * @returns {string} - Expression with last character removed
 */
export const removeLastCharacter = (expression) => {
  return expression.slice(0, -1);
};

/**
 * Adds thousands separator for better readability
 * @param {number} num - Number to format
 * @returns {string} - Formatted string with commas
 */
export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined) return "";
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
