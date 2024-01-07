import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import settings from "../config/setting";
import Price from "../components/Price";
import VegStatus from "../components/VegStatus";
import CatHalal from "../components/CatHalal";

function OrderItemRecent({
  id,
  sn,
  venderId,
  title,
  price,
  tPrice,
  extra,
  image,
  onDelete,
}) {
  const [extraData, setExtraData] = useState([]);

  useEffect(() => {
    setData();
  }, []);

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";

    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }

  function removeDuplicates(arr) {
    let unique = arr.reduce(function (acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);
    return unique;
  }
  // console.log(extra.length);
  // console.log(exPrice);

  const setData = () => {
    let headArray = [];
    let extraDataNewSet = [];
    extra.forEach((element) => {
      headArray.push(element.heading);
    });

    let uniqueHeadings = headArray.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );

    let newArray = [];
    uniqueHeadings.forEach((item, i) => {
      let exData = extra.filter((setdata, i) => setdata.heading == item);
      newArray.push({ id: i, heading: item, data: exData });

      // console.log(exData[0].heading);

      // console.log(i + "--" + item);
    });

    setExtraData(newArray);
  };

  //  console.log(extraData);
  return (
    <>
      <View style={styles.content}>
        <View style={styles.snTextBox}>
          <AppText style={styles.snText}>{sn}.</AppText>
        </View>
        <Image
          style={styles.imageItem}
          source={{ uri: makeUri(venderId, image) }}
        />

        <View style={styles.appTextContainer}>
          <AppText style={styles.title} numberOfLines={2}>
            {title}
          </AppText>

          <View style={styles.vListContainer}>
            <VegStatus status="0" />
            <CatHalal halalStatus="Non Halal" foodCategory="Asian Food" />
          </View>
          <View style={styles.vListContainer}>
            <Price price={price} />

            <View style={styles.status}>
              <AppText style={styles.statusLebel}>Status : </AppText>
              <AppText style={styles.statusValue}> Pending</AppText>
            </View>
          </View>
        </View>
        <View style={styles.delBtn}>
          <TouchableHighlight
            underlayColor={colors.lightGray}
            onPress={() => onDelete()}
          >
            <MaterialCommunityIcons
              style={styles.icon}
              name="bike-fast"
              size={30}
              color={colors.medium}
            />
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.contentEx}>
        <View style={styles.snTextBox}>
          <AppText style={styles.snText}></AppText>
        </View>

        <View style={[styles.appTextContainer, { width: "90%" }]}>
          <View style={styles.addOnContainer}>
            {extraData.map((ex) => (
              <View style={styles.addOn} key={ex.id.toString()}>
                <View style={styles.addRowHead}>
                  <AppText style={styles.addOnHead}>{ex.heading}</AppText>
                </View>
                {ex.data.map((d) => (
                  <View style={styles.addRow} key={d.id.toString()}>
                    <AppText style={styles.addOnText}>{d.title}</AppText>
                    <AppText style={styles.addOnPrice}>
                      {" "}
                      RM {d.customer_price}
                    </AppText>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

export default OrderItemRecent;

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "100%",
    height: 60,
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

  content: {
    flexDirection: "row",
    // backgroundColor: "ffffff",
    marginTop: 30,
  },
  contentEx: {
    flexDirection: "row",
    // backgroundColor: "ffffff",
  },
  appTextContainer: {
    width: "70%",
    alignItems: "flex-start",
  },
  snTextBox: { alignItems: "center", width: 20 },
  snText: {
    fontWeight: "900",
    fontSize: 12,
    color: colors.secondary,
    paddingTop: 5,
  },
  delBtn: {
    alignItems: "center",
  },

  title: {
    fontWeight: "900",
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
  },

  text: {
    fontSize: 10,
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
  },
  vListContainer: { flexDirection: "row", justifyContent: "space-between" },
  status: { flexDirection: "row", marginLeft: 20 },
  statusLebel: { fontSize: 12, color: colors.medium, fontWeight: "600" },
  statusValue: { fontSize: 12, color: colors.orange, fontWeight: "900" },
  addOnContainer: { padding: 5, width: "100%" },
  addOn: {
    flexDirection: "column",
    marginTop: 1,
  },
  addRowHead: {
    flexDirection: "row",
  },
  addRow: {
    flexDirection: "row",
    backgroundColor: "#fff4ee",
    justifyContent: "space-between",
  },
  addOnHead: {
    fontSize: 10,
    color: colors.medium,
    fontWeight: "900",
  },
  addOnText: {
    fontSize: 12,
    color: colors.medium,
    fontWeight: "600",
  },
  addOnPrice: {
    fontSize: 12,
    color: colors.medium,
    fontWeight: "900",
  },
});
