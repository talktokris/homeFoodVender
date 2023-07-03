import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

function AppStatusText({
  title,
  color = "primary",
  textColor = "orange",
  icon,
}) {
  return (
    <View
      style={[styles.button, { borderColor: colors[color], borderWidth: 1 }]}
    >
      <Text style={[styles.text, { color: colors[textColor] }]}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={18} style={styles.icon} />
        )}
        {title}
      </Text>
    </View>
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
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    color: colors.white,
    margin: 30,
    padding: 50,
  },
});

export default AppStatusText;
