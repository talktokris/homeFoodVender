import React, { useState, useContext } from "react";

import { View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function RetryComponent({ icon = "wifi-alert", message, onPress }) {
  return (
    <>
      <View style={styles.retryView}>
        <View style={styles.iconView}>
          <MaterialCommunityIcons name={icon} size={40} color={colors.medium} />
        </View>
        {message ? (
          <AppText style={styles.noMsgFound}>{message}</AppText>
        ) : (
          <AppText style={styles.noMsgFound}>
            Unable to connect to network. please check your internet connection
          </AppText>
        )}

        {onPress && <AppButton title="Retry" onPress={onPress} />}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  retryView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "center",
    margin: 50,
  },
  noMsgFound: {
    marginVertical: 40,
    textAlign: "center",
    color: colors.medium,
  },
  iconView: { justifyContent: "center", alignItems: "center" },
  emptyMessageStyle: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default RetryComponent;
