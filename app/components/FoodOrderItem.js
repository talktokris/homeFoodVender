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
import { LinkButton } from "./forms";
import LinkButtonSmall from "./forms/LinkButtonSmall";

function FoodOrderItem({
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
          <>
            <View style={styles.content}>
              {image && <Image style={styles.image} source={image} />}

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
                  <View style={styles.priceContainer}>
                    <View style={styles.priceLeft}>
                      <AppText style={styles.price} numberOfLines={1}>
                        {currency} {price}
                      </AppText>

                      <AppText style={styles.subTitle} numberOfLines={2}>
                        Qty : 3
                      </AppText>

                      <AppText style={styles.total} numberOfLines={2}>
                        Total : 45
                      </AppText>
                    </View>
                    <View style={[styles.priceRight, { paddingRight: 5 }]}>
                      <LinkButtonSmall
                        title=" Pending"
                        color="primary"
                        onPress={() => {
                          // navigation.navigate(routes.AUTH_REGISTER);
                        }}
                      />
                      <AppText
                        style={[
                          styles.total,
                          {
                            fontSize: 11,
                            fontWeight: "900",
                            color: colors.blueRibbon,
                          },
                        ]}
                        numberOfLines={2}
                      >
                        <MaterialCommunityIcons
                          style={styles.icon}
                          name="currency-usd"
                          size={15}
                          color={colors.primary}
                        />
                        Cash on Delivery
                      </AppText>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.bottomArea}>
              <View style={styles.bottomLeft}>
                <AppText style={styles.location} numberOfLines={5}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="map-marker"
                    size={15}
                    color={colors.primary}
                  />
                  {distance + " " + distanceUnit}
                  13a, Persiaran Wawasan, Pusat Bandar Puchong, 47160 Puchong,
                  Selangor, Malaysia
                </AppText>
              </View>

              <View style={[styles.bottomRight, { flexDirection: "column" }]}>
                <>
                  <View
                    style={[
                      styles.userInfo,
                      {
                        borderBottomColor: colors.lightGray,
                        borderBottomWidth: 2,
                        paddingBottom: 5,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      style={styles.icon}
                      name="cellphone-basic"
                      size={18}
                      color={colors.primary}
                    />
                    <AppText
                      style={[styles.total, { paddingLeft: 5 }]}
                      numberOfLines={2}
                    >
                      0162132323
                    </AppText>
                  </View>
                  <View style={[styles.userInfo, { paddingTop: 5 }]}>
                    <MaterialCommunityIcons
                      style={styles.icon}
                      name="account-circle-outline"
                      size={18}
                      color={colors.primary}
                    />
                    <AppText
                      style={[styles.total, { paddingLeft: 5 }]}
                      numberOfLines={2}
                    >
                      Seelaan
                    </AppText>
                  </View>
                </>
              </View>
            </View>

            <View style={styles.bottomArea}>
              <View
                style={[
                  styles.bottomLeft,
                  { width: "50%", paddingLeft: 10, paddingRight: 5 },
                ]}
              >
                <LinkButton
                  title="Accept Order"
                  color="green"
                  onPress={() => {
                    // navigation.navigate(routes.AUTH_REGISTER);
                  }}
                />
              </View>

              <View
                style={[
                  styles.bottomRight,
                  { width: "50%", paddingLeft: 10, paddingRight: 5 },
                ]}
              >
                <LinkButton
                  title=" Call"
                  color="secondary"
                  icon="phone"
                  onPress={() => {
                    // navigation.navigate(routes.AUTH_REGISTER);
                  }}
                />
              </View>
            </View>
          </>
        </TouchableHighlight>
      </View>
    </>
  );
}

export default FoodOrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
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
  total: {
    fontSize: 16,
    color: colors.greenDark,
    paddingRight: 4,
    fontWeight: "800",
  },
  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "60%" },
  bottomRight: { width: "40%", flexDirection: "row-reverse" },
  location: {
    fontSize: 14,
    paddingLeft: 10,
  },
  priceContainer: { flexDirection: "row" },
  priceLeft: { width: "50%" },
  priceRight: { width: "50%" },
  userInfo: {
    flexDirection: "row",
    position: "relative",
  },
});
