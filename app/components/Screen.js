import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screens, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screens: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
