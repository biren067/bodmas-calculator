/**
 * History Section Component
 * Displays calculation history in a scrollable list
 */

import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  MAX_HISTORY_ITEMS,
} from "../constants/theme";
import { useCalculator } from "../context/CalculatorContext";

const HistorySection = () => {
  const { history } = useCalculator();

  const isEmpty = history.length === 0;

  const renderHistoryItem = ({ item, index }) => (
    <View style={styles.historyItem} key={index}>
      <Text style={styles.historyText} numberOfLines={1} ellipsizeMode="tail">
        {item.expression} = {item.result}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculation History</Text>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Empty Calculations</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(_, index) => `history-${index}`}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.historyBackground,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    minHeight: 100,
    maxHeight: 250,
  },
  title: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    marginBottom: SPACING.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 80,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.md,
    fontStyle: "italic",
  },
  historyItem: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    backgroundColor: COLORS.displayBackground,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  historyText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
    fontWeight: "500",
  },
});

export default HistorySection;
