/**
 * Advertisement Placeholder Component
 * Fixed space reserved for AdMob or banner ads
 * Production-ready for ad integration
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "../constants/theme";

const AdSpace = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Advertisement</Text>
      <Text style={styles.placeholderSubtext}>AdMob Banner Ad (320x50)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.adSpace,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  placeholderText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
  },
  placeholderSubtext: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
    fontStyle: "italic",
  },
});

export default AdSpace;
