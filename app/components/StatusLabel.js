import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function StatusLabel({
  id,
  orderTitle,
  lebel,
  status,
  color = "#000",
  fSize = 12,
}) {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.container}>
        {lebel && (
          <AppText style={[styles.time, { fontSize: fSize }]} numberOfLines={1}>
            {lebel} {" : "}
          </AppText>
        )}

        {status && (
          <AppText
            style={[styles.location, { color: color }]}
            numberOfLines={1}
          >
            {status}
          </AppText>
        )}
      </View>
      <View style={styles.container}>
        {orderTitle && (
          <AppText style={[styles.time, { fontSize: fSize }]} numberOfLines={1}>
            {orderTitle} {" :"}
          </AppText>
        )}

        {id && (
          <AppText style={[styles.orderNo]} numberOfLines={1}>
            {id}
          </AppText>
        )}
      </View>
    </View>
  );
}

export default StatusLabel;

const styles = StyleSheet.create({
  fullContainer: { marginBottom: 5 },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: "600",
  },

  location: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: "900",
    marginLeft: 10,
  },
  orderNo: {
    fontSize: 12,
    backgroundColor: "#ccc",
    fontWeight: "800",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
});
