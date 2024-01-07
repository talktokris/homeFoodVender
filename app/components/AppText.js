import { StyleSheet, Text, Platform } from "react-native";
import React from "react";

import fonts from "../config/fonts";

export default function ({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    //  fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
