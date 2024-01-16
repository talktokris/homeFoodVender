import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
function AppEditButtonSmall({
  title,
  color = "primary",
  styleProps,
  icon,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, styleProps]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={15}
              color={colors.statusbarTextColor}
            />
          )}{" "}
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "90%",
  },
  text: {
    color: colors.statusbarTextColor,
    fontSize: 12,
    fontWeight: "bold",
  },
  icon: {
    color: colors.white,
  },
});

export default AppEditButtonSmall;
