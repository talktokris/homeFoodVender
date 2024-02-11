import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import StatusLabel from "../components/StatusLabel";
import Stars from "../components/Stars";
import RightArrow from "./RightArrow";
import Price from "../components/Price";
import settings from "../config/setting";
import VegStatus from "../components/VegStatus";
import CatHalal from "../components/CatHalal";
import AppButton from "../components/AppButton";

import OrderItemProcess from "../components/OrderItemProcess";
import AppButtonSmall from "../components/AppButtonSmall";

function RestaurantOrderProcess({
  id,
  vData,
  tPrice,
  oData,
  orderStatus,
  onAction,
}) {
  const scrollView = useRef();

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }
  //   console.log(orderStatus);

  const handleAction = (salesID, orderID, statusCooking) => {
    Alert.alert("Confirmation", "Are you sure you want to process this?", [
      {
        text: "Yes",
        onPress: () => onAction(salesID, orderID, statusCooking),
      },
      { text: "No" },
    ]);
  };

  return (
    <>
      <Screen>
        <View style={styles.restContainer}>
          <View style={styles.restItem}>
            <View style={styles.restItemContainer}>
              <Image
                style={styles.image}
                source={{ uri: makeUri(vData.id, vData.banner_image) }}
              />
              <AppText style={styles.heading}>{vData.name}</AppText>
              <AppText style={[styles.text, { marginLeft: 0 }]}>
                {vData.location}
              </AppText>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.vListContainer}>
                <StatusLabel orderTitle="OD ID" id={id} />
              </View>

              <View style={styles.vListContainer}>
                {/* <Price price={tPrice} size={14} lebel="Total " /> */}
                <StatusLabel
                  lebel="Status"
                  status={orderStatus.sting_value}
                  color={colors.greenDark}
                />
              </View>
            </View>
          </View>

          <View style={[styles.restItem, { borderBottomWidth: 0 }]}>
            {oData.map((ci, i) => (
              <OrderItemProcess
                sn={i + 1}
                id={ci.menu.id}
                salesID={id}
                orderID={ci.id}
                key={ci.menu.id + i.toString()}
                venderId={vData.id}
                title={ci.menu.food_title}
                price={ci.menu.customer_price}
                tPrice={ci.price_after_discount}
                extra={ci.menu.extra}
                image={ci.menu.image_name}
                statusData={ci.order_status_string}
                onAction={handleAction}
              />
            ))}
          </View>
        </View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "100%",
    height: 30,
    resizeMode: "contain",
    borderRadius: 5,
    margin: 1,
    marginLeft: 10,
  },
  imageItem: {
    width: 55,
    height: 55,
    borderRadius: 5,
    margin: 5,
  },

  restContainer: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#f7f7f7",
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 5,
    borderColor: colors.separator,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
  },

  restItem: {
    paddingTop: 5,
    PaddingBottom: 10,
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: colors.separator,
    minHeight: 45,
    width: "auto",
    marginBottom: 10,
  },
  restItemContainer: { flex: 1 },
  content: {
    flexDirection: "row",

    // backgroundColor: "red",
  },
  appTextContainer: {
    width: "70%",
    alignItems: "flex-start",
  },
  snText: { alignItems: "center", justifyContent: "center", width: 20 },
  delBtn: {
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontWeight: "900",
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
  },

  text: {
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
  },
  vListContainer: { flexDirection: "row", justifyContent: "space-between" },
});

export default RestaurantOrderProcess;
