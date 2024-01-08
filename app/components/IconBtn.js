import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function IconBtn({
  name = "email",
  size = 32,
  backgroundColor = "#000",
  iconColor = "#fff",
  onPress,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBg} onPress={onPress}>
        <MaterialCommunityIcons name={name} size={size} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBg: {
    //backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  text: {
    padding: 15,
    backgroundColor: "#eee",
    marginTop: 2,
  },
});
export default IconBtn;
