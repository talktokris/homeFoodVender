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
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import LocationTime from "../components/LocationTime";
import Stars from "../components/Stars";
import RightArrow from "./RightArrow";
import Price from "../components/Price";
import settings from "../config/setting";
import AppEditButtonSmall from "../components/AppEditButtonSmall";
import AppCircleButton from "../components/AppCircleButton";

/*
const reviewData = [
  {
    id: 1,
    title: "The food was good. test from old days",
    auther: "Harry",
    rate: 5,
  },
  {
    id: 2,
    title: "So testy. I love it. test from old days. test from old days ",
    auther: "Jhon Smith",
    rate: 4,
  },
  {
    id: 3,
    title: "Very Healthy Food",
    auther: "Marry",
    rate: 5,
  },
  {
    id: 4,
    title: "Traditional test from old days,  we all love it.",
    auther: "James",
    rate: 3,
  },
];
*/
function RestaurantInfo({ restData }) {
  const scrollView = useRef();

  const vender = restData[0];
  // console.log(vender);

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }

  return (
    <>
      <Screen>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={{ uri: makeUri(vender.id, vender.banner_image) }}
          />

          <View style={styles.imageUpdateBtn}>
            <AppCircleButton
              icon="pencil-box"
              size={35}
              color={colors.primary}
              onPress={() => console.log("Change Profile Btn")}
            />
          </View>
        </View>
        <View style={styles.restContainer}>
          <View style={styles.imageUpdateBtn}>
            <AppCircleButton
              icon="pencil-box"
              size={35}
              color={colors.primary}
              onPress={() => console.log("Change Profile Btn")}
            />
          </View>
          <View style={styles.restItem}>
            <View style={styles.restItemContainer}>
              <AppText style={styles.heading}>
                {vender.name} - {vender.location_lebel}
              </AppText>
            </View>
            <RightArrow />
          </View>
          <View style={styles.restItem}>
            <View style={[styles.restItemContainer, { flexDirection: "row" }]}>
              <View>
                <Stars size={16} star={2.5} />
              </View>
              <AppText style={[styles.text, { marginLeft: 10 }]}>
                4.3 (2K) . Ratings and reviews
              </AppText>
            </View>
            <RightArrow />
          </View>

          <View style={styles.restItem}>
            <View style={[styles.restItemContainer, { flexDirection: "row" }]}>
              <AppText style={styles.text}>
                <MaterialCommunityIcons
                  name="sale"
                  size={16}
                  color={colors.primary}
                />
                Check for available
              </AppText>
            </View>
            <RightArrow />
          </View>
        </View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  logoContainer: { flexDirection: "row", justifyContent: "center" },
  image: {
    alignSelf: "center",
    width: "100%",
    height: 100,
    resizeMode: "contain",
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
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
    marginBottom: 10,
    borderColor: colors.separator,
    borderRadius: 10,
    justifyContent: "center",
  },

  restItem: {
    flexDirection: "row",
    paddingTop: 10,
    PaddingBottom: 10,
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: colors.separator,
    minHeight: 45,
    width: "auto",
  },
  restItemContainer: { flex: 1 },
  rowContainer: {
    flexDirection: "row",
  },
  vContainer: {
    flex: 1,
  },
  heading: {
    fontWeight: "900",
    fontSize: 18,
    color: colors.secondary,
    width: "95%",
    marginVertical: 10,
  },

  text: {
    fontSize: 12,
    justifyContent: "center",
    fontWeight: "600",
  },
  icon: { paddingTop: 5, marginRight: 5 },
  reviewArea: {
    justifyContent: "flex-end",
  },
  reviewList: {
    position: "relative",
  },
  reviewBox: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    width: 200,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 2,
  },
  reviewFooter: { flexDirection: "row", marginTop: 10 },

  profileChangeBtn: { width: 100 },
  imageUpdateBtn: {
    position: "absolute",
    zIndex: 2,
    flexDirection: "row",
    top: 5,
    right: 0,
  },
});

export default RestaurantInfo;
