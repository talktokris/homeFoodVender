import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function LocationTime({ time, distance, fSize = 12 }) {
  return (
    <View style={styles.container}>
      {time && (
        <AppText style={[styles.time, { fontSize: fSize }]} numberOfLines={1}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="clock-outline"
            size={fSize}
            color={colors.secondary}
          />{" "}
          {time}
        </AppText>
      )}

      {distance && (
        <AppText style={[styles.time, { fontSize: fSize }]} numberOfLines={1}>
          {" - "}
          <MaterialCommunityIcons
            style={styles.icon}
            name="map-marker-outline"
            size={fSize}
            color={colors.secondary}
          />{" "}
          {distance}
        </AppText>
      )}
    </View>
  );
}

export default LocationTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 2,
    paddingTop: 2,
  },

  time: {
    fontSize: 12,
    color: colors.secondary,
  },

  location: {
    fontSize: 12,
    color: colors.secondary,
    marginLeft: 10,
  },
});
