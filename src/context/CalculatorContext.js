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

      // If user starts new input after equals, start fresh
      if (state.lastWasEquals && /\d/.test(input)) {
        return {
          ...state,
          expression: input,
          result: null,
          lastWasEquals: false,
          error: null,
        };
      }

      // Continue previous result with operator
      if (state.lastWasEquals && ["+", "-", "*", "/"].includes(input)) {
        const newExpression = state.result + input;
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

      // Handle implicit multiplication: 5( becomes 5*( and )( becomes )*(
      let newExpression = state.expression + input;
      const lastChar = state.expression.slice(-1);
      
      if (input === "(" && lastChar && /\d|\)/.test(lastChar)) {
        // Insert * before (
        newExpression = state.expression + "*" + input;
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
        expression: `${state.expression} =`,
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
