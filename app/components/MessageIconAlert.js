import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";

function MessageIconAlert({ Items = 0, ItemData, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconBg}
        onPress={() => console.log("Send OTP")}
      >
        {Items > 0 && (
          <View style={styles.aletBox}>
            <AppText style={styles.text}>{Items}</AppText>
          </View>
        )}
        <MaterialCommunityIcons
          name="email"
          size={25}
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
    paddingLeft: 10,
  },
  text: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 12,
    paddingTop: 2,
    textAlign: "center",
  },
  aletBox: {
    backgroundColor: colors.primary,
    width: 20,
    height: 25,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.white,
    position: "absolute",
    zIndex: 2,
    left: 30,
    top: -2,
  },
});
export default MessageIconAlert;
