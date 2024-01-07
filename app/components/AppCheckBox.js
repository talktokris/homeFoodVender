import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppCheckBox({ color, text, linkText, onPress }) {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked) || onPress}>
      <View style={styles.container}>
        {isChecked ? (
          <MaterialCommunityIcons
            name="checkbox-outline"
            size={25}
            style={styles.icon}
            color={colors.medium}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={25}
            style={styles.icon}
            color={colors.medium}
          />
        )}
        <Text style={styles.text}> {text} </Text>
        {linkText && <Text style={styles.link}> {linkText}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default AppCheckBox;
