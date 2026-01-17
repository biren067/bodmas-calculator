/**
 * Calculator State Management Context
 * Handles all calculator state and actions using React Context
 */

import React, { createContext, useReducer, useCallback } from "react";
import {
  evaluateExpression,
  isValidInput,
  removeLastCharacter,
} from "../utils/calculationEngine";
import {
  addToHistory,
  clearHistory,
  getRecentResult,
} from "../utils/historyManager";

export const CalculatorContext = createContext();

const INITIAL_STATE = {
  expression: "",
  result: null,
  history: [],
  lastWasEquals: false,
  error: null,
};

const ACTIONS = {
  ADD_INPUT: "ADD_INPUT",
  DELETE_LAST: "DELETE_LAST",
  EVALUATE: "EVALUATE",
  CLEAR: "CLEAR",
  SET_ERROR: "SET_ERROR",
  CONTINUE_CALCULATION: "CONTINUE_CALCULATION",
};

/**
 * Reducer function for calculator state management
 */
const calculatorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_INPUT: {
      const { input } = action.payload;

      // If user types a digit, dot after equals, show error
      if (state.lastWasEquals && (/\d/.test(input) || input === ".")) {
        return {
          ...state,
          error: "Only operators (+, −, ×, ÷) and brackets are allowed",
        };
      }

      // Continue previous result with operator or bracket
      if (state.lastWasEquals && ["+", "-", "*", "/"].includes(input)) {
        const newExpression = state.result + input;
        return {
          ...state,
          expression: newExpression,
          lastWasEquals: false,
          error: null,
        };
      }

      // Allow opening bracket after equals - treat as implicit multiplication
      if (state.lastWasEquals && input === "(") {
        const newExpression = state.result + "*" + input;
        return {
          ...state,
          expression: newExpression,
          lastWasEquals: false,
          error: null,
        };
      }

      // Validate input
      if (!isValidInput(state.expression, input)) {
        return state;
      }

      // Replace last operator/bracket if user types a different operator/bracket
      let newExpression = state.expression + input;
      const lastChar = state.expression.slice(-1);
      const last2Chars = state.expression.slice(-2);

      // Check if we should replace the last operator (NOT brackets)
      const shouldReplace =
        ["+", "-", "*", "/"].includes(input) && // Only operators can replace
        ["+", "-", "*", "/"].includes(lastChar); // Only replace other operators

      if (shouldReplace) {
        // Replace the last operator with new operator
        newExpression = state.expression.slice(0, -1) + input;
      } else if (["+", "-", "*", "/"].includes(input) && last2Chars === "*(") {
        // If last operator is *( and typing new operator, replace *(  with the new operator
        // Example: 10*( + "+" → becomes 10+
        newExpression = state.expression.slice(0, -2) + input;
      } else if (["+", "-", "*", "/"].includes(input) && lastChar === "(") {
        // If typing an operator after (, find and replace the last operator before the bracket
        // Example: 17+( + "*" → becomes 17*(
        const lastOperatorIndex = Math.max(
          state.expression.lastIndexOf("+"),
          state.expression.lastIndexOf("-"),
          state.expression.lastIndexOf("*"),
          state.expression.lastIndexOf("/"),
        );

        if (lastOperatorIndex !== -1) {
          newExpression =
            state.expression.slice(0, lastOperatorIndex) +
            input +
            state.expression.slice(lastOperatorIndex + 1);
        }
      } else if (input === "(" && lastChar && /\d|\)/.test(lastChar)) {
        // Insert * before ( when last char is digit or closing bracket
        // 1. 5( becomes 5*(
        // 2. )( becomes )*(
        newExpression = state.expression + "*" + input;
      } else if (
        input === "(" &&
        lastChar &&
        lastChar !== "*" &&
        ["+", "-", "*", "/"].includes(lastChar)
      ) {
        // Replace non-* operator with *( when ( is pressed after operator
        // 10+ becomes 10*( (treat *( as single operator)
        newExpression = state.expression.slice(0, -1) + "*" + input;
      } else if (input === "(" && lastChar === "*") {
        // If last char is already *, just add (
        newExpression = state.expression + input;
      }

      const { result, error } = evaluateExpression(newExpression);

      return {
        ...state,
        expression: newExpression,
        result: result,
        error: error,
        lastWasEquals: false,
      };
    }

    case ACTIONS.DELETE_LAST: {
      if (state.expression === "") return state;

      const newExpression = removeLastCharacter(state.expression);
      const { result, error } = evaluateExpression(newExpression);

      return {
        ...state,
        expression: newExpression,
        result: result,
        error: error,
        lastWasEquals: false,
      };
    }

    case ACTIONS.EVALUATE: {
      if (!state.expression) return state;

      const { result, error } = evaluateExpression(state.expression);

      if (error) {
        return {
          ...state,
          error: error,
        };
      }

      const newHistory = addToHistory(state.history, {
        expression: state.expression,
        result: result,
      });

      return {
        ...state,
        expression: "", // Clear expression, show only result
        result: result,
        history: newHistory,
        lastWasEquals: true,
        error: null,
      };
    }

    case ACTIONS.CLEAR:
      return INITIAL_STATE;

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case ACTIONS.CONTINUE_CALCULATION: {
      const recentResult = getRecentResult(state.history);
      if (recentResult === null) return state;

      return {
        ...state,
        expression: recentResult.toString(),
        result: recentResult,
        lastWasEquals: false,
        error: null,
      };
    }

    default:
      return state;
  }
};

/**
 * Calculator Context Provider Component
 */
export const CalculatorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const addInput = useCallback((input) => {
    dispatch({
      type: ACTIONS.ADD_INPUT,
      payload: { input },
    });
  }, []);

  const deleteLast = useCallback(() => {
    dispatch({
      type: ACTIONS.DELETE_LAST,
    });
  }, []);

  const evaluate = useCallback(() => {
    dispatch({
      type: ACTIONS.EVALUATE,
    });
  }, []);

  const clear = useCallback(() => {
    dispatch({
      type: ACTIONS.CLEAR,
    });
  }, []);

  const setError = useCallback((error) => {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { error },
    });
  }, []);

  const continueCalculation = useCallback(() => {
    dispatch({
      type: ACTIONS.CONTINUE_CALCULATION,
    });
  }, []);

  const value = {
    // State
    expression: state.expression,
    result: state.result,
    history: state.history,
    error: state.error,
    lastWasEquals: state.lastWasEquals,

    // Actions
    addInput,
    deleteLast,
    evaluate,
    clear,
    setError,
    continueCalculation,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};

/**
 * Custom hook to use calculator context
 */
export const useCalculator = () => {
  const context = React.useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within CalculatorProvider");
  }
  return context;
};
