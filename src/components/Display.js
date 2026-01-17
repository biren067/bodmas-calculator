/**
 * Display Component
 * Shows current expression and real-time result
 */

import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  MAX_DISPLAY_LENGTH,
} from "../constants/theme";
import {
  addThousandsSeparator,
  formatNumber,
} from "../utils/calculationEngine";
import { useCalculator } from "../context/CalculatorContext";

const Display = () => {
  const { expression, result, error } = useCalculator();

  const displayExpression = useMemo(() => {
    if (expression.length > MAX_DISPLAY_LENGTH) {
      return "..." + expression.slice(-MAX_DISPLAY_LENGTH);
    }
    return expression;
  }, [expression]);

  const displayResult = useMemo(() => {
    if (error) {
      return error;
    }
    if (result === null || result === undefined) {
      return "";
    }
    return formatNumber(result, 15);
  }, [result, error]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.expressionContainer}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={styles.expressionText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {displayExpression || "0"}
        </Text>
      </ScrollView>

      <View style={styles.resultContainer}>
        <Text
          style={[styles.resultText, error && styles.errorText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayResult}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.displayBackground,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    minHeight: 140,
    justifyContent: "space-between",
  },
  expressionContainer: {
    flex: 1,
    maxHeight: 80,
  },
  expressionText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xl,
    fontWeight: "500",
    textAlign: "right",
    minHeight: 30,
  },
  resultContainer: {
    marginTop: SPACING.md,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  resultText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.display,
    fontWeight: "700",
    textAlign: "right",
  },
  errorText: {
    color: COLORS.errorColor,
    fontSize: FONT_SIZES.xxl,
  },
});

export default Display;
