/**
 * Calculator Buttons Grid Component
 * Displays all calculator buttons in organized grid layout
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import CalculatorButton from "./CalculatorButton";
import { useCalculator } from "../context/CalculatorContext";

const ButtonsGrid = () => {
  const { addInput, deleteLast, evaluate, clear } = useCalculator();

  return (
    <View style={styles.container}>
      {/* Row 1: Clear and Delete */}
      <View style={styles.row}>
        <CalculatorButton
          label="C"
          onPress={clear}
          type="clear"
          testID="btn-clear"
        />
        <CalculatorButton
          label="DEL"
          onPress={deleteLast}
          type="delete"
          testID="btn-delete"
        />
        <CalculatorButton
          label="("
          onPress={() => addInput("(")}
          type="operator"
          testID="btn-open-bracket"
        />
        <CalculatorButton
          label=")"
          onPress={() => addInput(")")}
          type="operator"
          testID="btn-close-bracket"
        />
      </View>

      {/* Row 2: 7, 8, 9, / */}
      <View style={styles.row}>
        <CalculatorButton
          label="7"
          onPress={() => addInput("7")}
          type="digit"
          testID="btn-7"
        />
        <CalculatorButton
          label="8"
          onPress={() => addInput("8")}
          type="digit"
          testID="btn-8"
        />
        <CalculatorButton
          label="9"
          onPress={() => addInput("9")}
          type="digit"
          testID="btn-9"
        />
        <CalculatorButton
          label="+"
          onPress={() => addInput("+")}
          type="operator"
          testID="btn-add"
        />
        {/* <CalculatorButton
          label="÷"
          onPress={() => addInput('/')}
          type="operator"
          testID="btn-divide"
        /> */}
      </View>

      {/* Row 3: 4, 5, 6, * */}
      <View style={styles.row}>
        <CalculatorButton
          label="4"
          onPress={() => addInput("4")}
          type="digit"
          testID="btn-4"
        />
        <CalculatorButton
          label="5"
          onPress={() => addInput("5")}
          type="digit"
          testID="btn-5"
        />
        <CalculatorButton
          label="6"
          onPress={() => addInput("6")}
          type="digit"
          testID="btn-6"
        />
        <CalculatorButton
          label="×"
          onPress={() => addInput("*")}
          type="operator"
          testID="btn-multiply"
        />
      </View>

      {/* Row 4: 1, 2, 3, - */}
      <View style={styles.row}>
        <CalculatorButton
          label="1"
          onPress={() => addInput("1")}
          type="digit"
          testID="btn-1"
        />
        <CalculatorButton
          label="2"
          onPress={() => addInput("2")}
          type="digit"
          testID="btn-2"
        />
        <CalculatorButton
          label="3"
          onPress={() => addInput("3")}
          type="digit"
          testID="btn-3"
        />
        <CalculatorButton
          label="−"
          onPress={() => addInput("-")}
          type="operator"
          testID="btn-subtract"
        />
      </View>

      {/* Row 5: 0, ., +, = */}
      <View style={styles.row}>
        <CalculatorButton
          label="0"
          onPress={() => addInput("0")}
          type="digit"
          style={styles.zeroButton}
          testID="btn-0"
        />
        <CalculatorButton
          label="."
          onPress={() => addInput(".")}
          type="digit"
          testID="btn-decimal"
        />
        <CalculatorButton
          label="÷"
          onPress={() => addInput("/")}
          type="operator"
          testID="btn-divide"
        />
        {/* <CalculatorButton
          label="+"
          onPress={() => addInput('+')}
          type="operator"
          testID="btn-add"
        /> */}
        <CalculatorButton
          label="="
          onPress={evaluate}
          type="equals"
          testID="btn-equals"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  zeroButton: {
    flex: 2,
  },
});

export default ButtonsGrid;
