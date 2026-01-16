/**
 * Calculation History Manager
 * Manages stack-based calculation history with max limit
 */

import { MAX_HISTORY_ITEMS } from "../constants/theme";

/**
 * Adds a calculation to history (newest first)
 * @param {array} history - Current history
 * @param {object} calculation - { expression, result }
 * @returns {array} - Updated history
 */
export const addToHistory = (history, calculation) => {
  if (!calculation.expression || calculation.result === null) {
    return history;
  }

  const newHistory = [calculation, ...history];
  return newHistory.slice(0, MAX_HISTORY_ITEMS);
};

/**
 * Clears all history
 * @returns {array} - Empty array
 */
export const clearHistory = () => {
  return [];
};

/**
 * Formats calculation for display
 * @param {object} item - { expression, result }
 * @returns {string} - Formatted string "expression = result"
 */
export const formatHistoryItem = (item) => {
  return `${item.expression} = ${item.result}`;
};

/**
 * Gets recent calculation if available
 * @param {array} history - Current history
 * @returns {number|null} - Most recent result or null
 */
export const getRecentResult = (history) => {
  return history.length > 0 ? history[0].result : null;
};
