import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.errorColor,
    fontSize: 12,
  },
});
export default ErrorMessage;
