import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";

function MsgAlertIcon({ Items = 0, onPress }) {
  return (
    <TouchableOpacity style={styles.iconBg} onPress={onPress}>
      {Items > 0 && (
        <View style={styles.aletBox}>
          <AppText style={styles.text}>{Items}</AppText>
        </View>
      )}
      <MaterialCommunityIcons
        name="bell"
        size={27}
        color={colors.statusbarTextColor}
      />
    </TouchableOpacity>
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
    color: colors.white,
    fontWeight: "900",
    fontSize: 10,
    paddingTop: 2,
    textAlign: "center",
  },
  aletBox: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    position: "absolute",
    zIndex: 2,
    left: 20,
    top: -10,
  },
});
export default MsgAlertIcon;
