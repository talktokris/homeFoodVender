import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function CatHalal({ halalStatus, foodCategory }) {
  return (
    <View style={styles.container}>
      {halalStatus && (
        <AppText style={styles.nText} numberOfLines={1}>
          {halalStatus}
        </AppText>
      )}

      {foodCategory && (
        <AppText style={styles.nText} numberOfLines={1}>
          {" - " + foodCategory}
        </AppText>
      )}
    </View>
  );
}

export default CatHalal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 2,
    paddingTop: 2,
  },

  nText: {
    fontSize: 12,
    color: colors.secondary,
    backgroundColor: "#fff4ee",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
