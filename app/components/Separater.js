import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function Separater() {
  return <View style={styles.separater} />;
}
const styles = StyleSheet.create({
  separater: {
    backgroundColor: colors.separator,
    height: 1,
    width: "100%",
  },
});

export default Separater;
