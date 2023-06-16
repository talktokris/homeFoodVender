import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
function AppButtonSmall({ title, color = "primary", icon, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>
          {icon && (
            <MaterialCommunityIcons name={icon} size={18} style={styles.icon} />
          )}
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    color: colors.white,
    margin: 30,
    padding: 50,
  },
});

export default AppButtonSmall;
