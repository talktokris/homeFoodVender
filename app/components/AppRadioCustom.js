import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import AppCircleButton from "./AppCircleButton";

function AppRadioCustom({ text, price, data, onEdit, onRemove }) {
  return (
    <View style={styles.container}>
      <View style={styles.checkBoxArea}>
        <Text style={styles.text}> {text} </Text>
        <AppCircleButton
          icon="pencil"
          size={20}
          color={colors.orangeDark}
          onPress={onEdit}
        />
      </View>
      <View style={styles.checkPrice}>
        {/* {price && <AppText style={styles.textPrice}> +{price}</AppText>} */}
        <AppCircleButton
          icon="delete"
          size={20}
          color={colors.primary}
          onPress={onRemove}
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
    width: "90%",
    paddingTop: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.medium,
  },
  checkPrice: {},
  textPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.medium,
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

export default AppRadioCustom;
