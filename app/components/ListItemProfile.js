import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function ListItemProfile({
  title,
  subTitle,
  iconComponent,
  image,
  imgStatus,
  onPress,
}) {
  return (
    <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
      <View style={styles.container}>
        {iconComponent}
        {imgStatus == null ? (
          <Image
            style={styles.image}
            source={require("../assets/images/av.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
        <View style={styles.appTextContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default ListItemProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.light,

    alignItems: "center",
  },
  appTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.secondary,
  },
  subTitle: {
    fontSize: 16,
    color: colors.primary,
  },
});
