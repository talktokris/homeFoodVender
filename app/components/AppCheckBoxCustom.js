import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import AppCircleButton from "./AppCircleButton";

function AppCheckBoxCustom({ text, price, data, onPress, color }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkBoxArea}>
        <Text style={styles.text}> {text} </Text>
        <AppCircleButton
          icon="pencil"
          size={20}
          color={colors.orangeDark}
          onPress={() => console.log("Change Profile Btn")}
        />
      </View>
      <View style={styles.checkPrice}>
        {price && <AppText style={styles.textPrice}> +{price}</AppText>}
        <AppCircleButton
          icon="delete"
          size={20}
          color={colors.primary}
          onPress={() => console.log("Change Profile Btn")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
    borderColor: "#ffffff",
  },
  checkBoxArea: {
    flexDirection: "row",
    width: "75%",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.medium,
  },
  checkPrice: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
  },
  textPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.orangeDark,
    textAlign: "right",
    paddingRight: 20,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default AppCheckBoxCustom;