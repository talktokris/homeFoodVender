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

function StatementItem({
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
    <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
      <>
        <View style={styles.container}>
          <View style={[styles.qtr, { width: "45%" }]}>
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.appTextContainer}>
              <AppText style={styles.title} numberOfLines={2}>
                {title}
              </AppText>

              {price && (
                <AppText style={styles.price} numberOfLines={2}>
                  {price + ".00"}
                </AppText>
              )}
            </View>
          </View>
          <View style={styles.qtrTwo}>
            <AppText style={styles.title} numberOfLines={2}>
              Credit
            </AppText>

            {price && (
              <AppText style={styles.priceTwo} numberOfLines={1}>
                {price + ".00"}
              </AppText>
            )}
          </View>
          <View style={styles.qtrTwo}>
            <AppText style={styles.title} numberOfLines={2}>
              Debit
            </AppText>

            {price && (
              <AppText style={styles.priceTwo} numberOfLines={1}>
                {price + ".00"}
              </AppText>
            )}
          </View>
          <View style={styles.qtrTwo}>
            <AppText style={styles.title} numberOfLines={2}>
              Balance
            </AppText>

            {price && (
              <AppText style={styles.priceTwo} numberOfLines={1}>
                {price + ".00"}
              </AppText>
            )}
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

export default StatementItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtr: {
    flexDirection: "row",
    width: "20%",

    // backgroundColor: "red",
  },
  qtrTwo: {
    flexDirection: "column",
    width: "20%",

    // backgroundColor: "red",
  },
  appTextContainer: {
    paddingLeft: 5,
    justifyContent: "center",
  },
  image: {
    flexDirection: "row",
    width: 40,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.secondary,
  },

  priceTwoprice: {
    width: "100%",
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
  price: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
  priceTwo: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "800",
  },
});
