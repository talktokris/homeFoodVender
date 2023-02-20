import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function Stars({
  name,
  size = 32,
  backgroundColor = "#000",
  iconColor = "#fff",
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.icon}
        name="star"
        size={20}
        color={colors.primary}
      />
      <MaterialCommunityIcons
        style={styles.icon}
        name="star"
        size={20}
        color={colors.primary}
      />
      <MaterialCommunityIcons
        style={styles.icon}
        name="star-half-full"
        size={20}
        color={colors.primary}
      />
      <MaterialCommunityIcons
        style={styles.icon}
        name="star-outline"
        size={20}
        color={colors.primary}
      />
    </View>
  );
}

export default Stars;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
