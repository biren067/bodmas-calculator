/**
 * Main Calculator Screen Component
 * Orchestrates all calculator sub-components
 */

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import Display from "./Display";
import ButtonsGrid from "./ButtonsGrid";
import HistorySection from "./HistorySection";
import AdSpace from "./AdSpace";

const CalculatorScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Title */}
        <View style={styles.header}>
          <Text style={styles.title}>BODMAS</Text>
          <Text style={styles.subtitle}>Calculator</Text>
        </View>

        {/* Display */}
        <View style={styles.calculatorContainer}>
          <Display />

          {/* Buttons */}
          <ButtonsGrid />

          {/* History */}
          <HistorySection />
        </View>
      </ScrollView>

      {/* Fixed Advertisement Area */}
      <AdSpace />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: "center",
  },
  title: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 1,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "500",
    marginTop: SPACING.xs,
    letterSpacing: 0.5,
  },
  calculatorContainer: {
    flex: 1,
  },
});

export default CalculatorScreen;
