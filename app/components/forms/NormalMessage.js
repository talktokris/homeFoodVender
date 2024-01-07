import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function NormalMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.medium,
    verticalAlign: 30,
    fontSize: 18,
    padding: 50,
    alignSelf: "center",
  },
});
export default NormalMessage;
