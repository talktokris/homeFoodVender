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

function FoodItem({
  title,
  subTitle,
  price,
  currency = "RM ",
  image,
  distance,
  distanceUnit,
  onPress,
}) {
  /*const { user, logOut } = useAuth();
  var favDefaultName = "",
    favDefaultColor = "";

  var fav = 0;
  var favId = null;

  const currrentUser = user.id;
  //console.log(currrentUser);
  favData.map((userData) => {
    // console.log(currrentUser + "--" + userData.user_id);
    if (userData.user_id == currrentUser) {
      fav = 1;
      favId = userData.id;
    }
  });

  if (fav == 1) {
    favDefaultName = "cards-heart";
    favDefaultColor = colors.primary;
  } else {
    favDefaultName = "cards-heart-outline";
    favDefaultColor = colors.medium;
  }
  const [iconColor, setIconColor] = useState(favDefaultColor);
  const [heartIconName, setHeartIconName] = useState(favDefaultName);

  const onPressIcon = () => {
    if (heartIconName == "cards-heart") {
      setHeartIconName((heartIconName) => "cards-heart-outline");
      setIconColor((iconColor) => colors.medium);
      favoriteDelete(favId);
    } else {
      setHeartIconName((heartIconName) => "cards-heart");
      setIconColor((iconColor) => colors.primary);

      efavoriteCreate(favId);

      // Delete Fav Record
    }

    async function efavoriteCreate(favId) {
      const result = await userUpdate.favoriteJobsCreate(currrentUser, job_id);
      // console.log(result);
    }

    async function favoriteDelete(favId) {
      const result = await userUpdate.favoriteJobsDelete(favId);
      //console.log(result);
    }
  };
  */

  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
          <View style={styles.content}>
            {image && <Image style={styles.image} source={{ uri: image }} />}
            <View style={styles.appTextContainer}>
              <AppText style={styles.title} numberOfLines={2}>
                {title}
              </AppText>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={3}>
                  {subTitle}
                </AppText>
              )}

              {price && (
                <AppText style={styles.price} numberOfLines={1}>
                  {currency} {price}
                </AppText>
              )}
              <View style={styles.bottomArea}>
                <View style={styles.bottomLeft}>
                  <AppText style={styles.location} numberOfLines={1}>
                    <MaterialCommunityIcons
                      style={styles.icon}
                      name="map-marker-radius"
                      size={15}
                      color={colors.secondary}
                    />{" "}
                    {distance + " " + distanceUnit}
                  </AppText>
                </View>

                <View style={styles.bottomRight}>
                  <Stars />
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
}

export default FoodItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    width: "100%",

    // backgroundColor: "red",
  },
  appTextContainer: {
    width: "64%",
    paddingLeft: 5,
    justifyContent: "center",
  },
  image: {
    flexDirection: "row",
    width: 130,
    height: 130,
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.secondary,
  },
  subTitle: {
    fontSize: 14,
    color: colors.secondary,
    paddingRight: 4,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "800",
  },
  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "50%" },
  bottomRight: { width: "50%", flexDirection: "row-reverse" },
  location: {
    fontSize: 12,
    fontWeight: "600",
  },
});
