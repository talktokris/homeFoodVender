import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function PromoTop({ lebel, text }) {
  return (
    <View style={styles.container}>
      {lebel && (
        <AppText style={styles.price} numberOfLines={1}>
          {lebel}
        </AppText>
      )}

      {text && (
        <AppText style={styles.oPrice} numberOfLines={1}>
          {text}
        </AppText>
      )}
    </View>
  );
}

export default PromoTop;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontSize: 12,
    color: colors.orangeDark,
    fontWeight: "800",
  },
  oPrice: {
    fontSize: 12,
    color: colors.price,
    fontWeight: "500",
    marginLeft: 5,
  },
});
