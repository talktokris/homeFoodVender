import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Price({ price, lebel, oldPrice, size = 12, currency = "RM" }) {
  return (
    <View style={styles.container}>
      {lebel && (
        <AppText style={[styles.lebel, { fontSize: size }]} numberOfLines={1}>
          {lebel}
        </AppText>
      )}
      {price && (
        <AppText style={[styles.price, { fontSize: size }]} numberOfLines={1}>
          {currency} {price}
        </AppText>
      )}

      {oldPrice >= 1 && (
        <AppText style={[styles.oPrice, { fontSize: size }]} numberOfLines={1}>
          {currency} {oldPrice}
        </AppText>
      )}
    </View>
  );
}

export default Price;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 2,
    paddingTop: 2,
  },
  lebel: {
    fontWeight: "800",
    marginLeft: 3,
  },

  price: {
    color: colors.primary,
    fontWeight: "800",
  },
  oPrice: {
    color: colors.price,
    fontWeight: "500",
    marginLeft: 3,
    textDecorationLine: "line-through",
  },
});
