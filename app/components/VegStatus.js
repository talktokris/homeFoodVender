import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function VegStatus({ status }) {
  return (
    <View style={styles.container}>
      {status === 1 ? (
        <MaterialCommunityIcons
          style={styles.icon}
          name="circle-box-outline"
          size={14}
          color={colors.primary}
        />
      ) : (
        <MaterialCommunityIcons
          style={styles.icon}
          name="circle-box-outline"
          size={14}
          color={colors.greenDark}
        />
      )}
    </View>
  );
}

export default VegStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
