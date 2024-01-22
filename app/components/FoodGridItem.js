import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Stars from "./Stars";
import Price from "./Price";
import CatHalal from "./CatHalal";
import LocationTime from "./LocationTime";
import VegStatus from "./VegStatus";
import PromoTop from "./PromoTop";
import AppCircleButton from "./AppCircleButton";
import settings from "../config/setting";

function FoodGridItem({
  id,
  venderId,
  category,
  title,
  price,
  oldPrice,
  image,
  onPress,
}) {
  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";
    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    // console.log(imgUri);
    return imgUri;
  }
  return (
    <>
      <View style={styles.container} key={id.toString()}>
        <View style={styles.content}>
          {category && (
            <View style={styles.category}>
              <AppText style={styles.subTitle}>{category}</AppText>
            </View>
          )}

          <Image
            style={styles.image}
            source={{ uri: makeUri(venderId, image) }}
          />

          <View style={styles.buttonView}>
            <AppCircleButton
              icon="eye-circle"
              color={colors.secondary}
              onPress={onPress}
            />
          </View>
          <AppText style={styles.title} numberOfLines={2}>
            {" "}
            {title}
          </AppText>
          <View style={{ marginLeft: 5 }}>
            <Price price={price} oldPrice={oldPrice} size={14} />
          </View>
        </View>
      </View>
    </>
  );
}

export default FoodGridItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 10,
    width: "45%",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",

    // backgroundColor: "red",
  },

  image: {
    height: 170,
    width: 170,
    borderRadius: 5,
    backgroundColor: "#cccccc",
    margin: 3,
    // alignItems: "stretch",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondary,
  },
  category: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: "50%",
    position: "absolute",
    zIndex: 1,
    borderWidth: 0.5,
    borderColor: colors.white,
    top: 15,
    right: 15,
  },
  subTitle: {
    fontSize: 10,
    color: colors.white,
    fontWeight: "800",
    paddingTop: 3,
    paddingBottom: 3,
    textAlign: "center",
  },
  buttonView: { position: "absolute", zIndex: 1, right: -3, bottom: -10 },

  vListContainer: { flexDirection: "row", justifyContent: "space-between" },
  promoContainer: { flexDirection: "row" },
});
