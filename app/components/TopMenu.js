import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function TopMenu({
  name,
  size = 32,
  backgroundColor = "#000",
  iconColor = "#fff",
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconBg}
        onPress={() => console.log("Send OTP")}
      >
        <MaterialCommunityIcons
          name="cart"
          size={32}
          color={colors.secondary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconBg}
        onPress={() => console.log("Send OTP")}
      >
        <MaterialCommunityIcons
          name="bell"
          size={32}
          color={colors.secondary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconBg}
        onPress={() => console.log("Send OTP")}
      >
        <MaterialCommunityIcons
          name="account-circle"
          size={42}
          color={colors.secondary}
        />
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
    paddingRight: 20,
  },
  text: {
    padding: 15,
    backgroundColor: "#eee",
    marginTop: 2,
  },
});
export default TopMenu;
