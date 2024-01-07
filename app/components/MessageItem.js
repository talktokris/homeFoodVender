import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItem({ title, subTitle, date, iconComponent, image, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
      <>
        <View style={styles.msgDateContainer}>
          <AppText style={styles.dateTime} numberOfLines={1}>
            {date}
          </AppText>
        </View>
        <View style={styles.container}>
          {iconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.appTextContainer}>
            <View style={styles.titleBlock}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
            </View>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            style={styles.icon}
            name="chevron-right"
            size={25}
            color={colors.primary}
          />
        </View>
      </>
    </TouchableHighlight>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    // backgroundColor: colors.light,
    alignItems: "center",
  },
  titleBlock: { width: "80%" },
  appTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    padding: 5,
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 16,
    color: colors.secondary,
  },
  msgDateContainer: { position: "absolute", right: 10, top: 5 },
  dateTime: {
    fontSize: 12,
    color: colors.medium,
  },
});
