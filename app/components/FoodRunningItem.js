import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinkButton } from "./forms";

import AppStatusText from "./forms/AppStatusText";

function FoodRunningItem({
  id,
  title,
  subTitle,
  price,
  qty,
  total_amount,
  order_status,
  deliveryAddres,
  userInfo,
  currency = "RM ",
  image,
  distance,
  distanceUnit = "KM",
  orderStatus,
  paymentStatus,
  onPress,
}) {
  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight underlayColor={colors.lightGray}>
          <>
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
                  <View style={styles.priceContainer}>
                    <View style={styles.priceLeft}>
                      <AppText style={styles.price} numberOfLines={1}>
                        {currency} {price}
                      </AppText>

                      <AppText style={styles.subTitle} numberOfLines={2}>
                        Qty : {qty}
                      </AppText>

                      <AppText style={styles.total} numberOfLines={2}>
                        Total
                      </AppText>
                      <AppText style={styles.price} numberOfLines={2}>
                        {currency} {total_amount}
                      </AppText>
                    </View>
                    <View style={[styles.priceRight, { paddingRight: 5 }]}>
                      <AppStatusText
                        title={" " + orderStatus}
                        color="secondry"
                        textColor="green"
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
                        {paymentStatus}
                      </AppText>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.bottomArea, { paddingTop: 10 }]}>
              <View style={styles.bottomLeft}>
                <AppText style={styles.location} numberOfLines={5}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="map-marker"
                    size={15}
                    color={colors.primary}
                  />
                  {distance + " " + distanceUnit}
                  {deliveryAddres.address}
                </AppText>
                <AppText style={styles.location} numberOfLines={5}>
                  {deliveryAddres.street}, {deliveryAddres.city_name},{" "}
                  {deliveryAddres.state} {deliveryAddres.postal_code}
                </AppText>
              </View>
              <View style={styles.bottomRight}>
                <>
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
                      {userInfo.first_name + " " + userInfo.last_name}
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
                  title="Food Cooking"
                  color="orange"
                  onPress={() => onPress(3, id)}
                />
              </View>

              <View style={[styles.bottomRight]}>
                <View
                  style={[
                    styles.bottomLeft,
                    { width: "100%", paddingLeft: 10, paddingRight: 10 },
                  ]}
                >
                  <LinkButton
                    title="Food Ready"
                    color="skyBlue"
                    onPress={() => onPress(4, id)}
                  />
                </View>
              </View>
            </View>
          </>
        </TouchableHighlight>
      </View>
    </>
  );
}

export default FoodRunningItem;

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
  bottomLeft: { width: "50%" },
  bottomRight: { width: "50%", flexDirection: "row-reverse" },
  location: {
    fontSize: 14,
    paddingLeft: 10,
  },
  priceContainer: { flexDirection: "row" },
  priceLeft: { width: "50%" },
  priceRight: { width: "50%" },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "right",
    paddingLeft: 10,
  },
});
