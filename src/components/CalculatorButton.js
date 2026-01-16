/**
 * Reusable Calculator Button Component
 * Handles styling and interaction for all button types
 */

import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES } from "../constants/theme";

const CalculatorButton = ({
  label,
  onPress,
  type = "digit",
  style,
  testID,
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case "digit":
        return styles.digitButton;
      case "operator":
        return styles.operatorButton;
      case "equals":
        return styles.equalsButton;
      case "clear":
        return styles.clearButton;
      case "delete":
        return styles.deleteButton;
      default:
        return styles.digitButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "digit":
        return styles.digitText;
      case "operator":
        return styles.operatorText;
      case "equals":
        return styles.equalsText;
      case "clear":
        return styles.clearText;
      case "delete":
        return styles.deleteText;
      default:
        return styles.digitText;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && styles.pressed,
        style,
      ]}
      testID={testID}
      android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
    >
      <Text style={getTextStyle()}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  digitButton: {
    flex: 1,
    backgroundColor: COLORS.digitColor,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.md,
    minHeight: 60,
  },
  operatorButton: {
    flex: 1,
    backgroundColor: COLORS.operatorColor,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.md,
    minHeight: 60,
  },
  equalsButton: {
    flex: 1,
    backgroundColor: COLORS.equalsColor,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.md,
    minHeight: 60,
  },
  clearButton: {
    flex: 1,
    backgroundColor: COLORS.clearColor,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.md,
    minHeight: 60,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.clearColor,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.md,
    minHeight: 60,
  },
  digitText: {
    color: COLORS.digitTextColor,
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
  },
  operatorText: {
    color: COLORS.operatorTextColor,
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
  },
  equalsText: {
    color: COLORS.equalsTextColor,
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
  },
  clearText: {
    color: COLORS.clearTextColor,
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
  },
  deleteText: {
    color: COLORS.clearTextColor,
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
  },
});

export default CalculatorButton;
