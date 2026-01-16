/**
 * Main App Entry Point
 * Sets up the calculator application with context provider
 */

import React from "react";
import { StatusBar } from "react-native";
import { CalculatorProvider } from "./src/context/CalculatorContext";
import CalculatorScreen from "./src/components/CalculatorScreen";
import { COLORS } from "./src/constants/theme";

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundColor}
        translucent={false}
      />
      <CalculatorProvider>
        <CalculatorScreen />
      </CalculatorProvider>
    </>
  );
}
