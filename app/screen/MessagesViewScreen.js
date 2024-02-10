import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import MessageItem from "../components/MessageItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";

import AppText from "../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import useMessage from "../api/message";

function MessagesViewScreen({ navigation, route }) {
  const item = route.params.item;
  // console.log(item.seen);

  useEffect(() => {
    autoUpdateData();
  }, []);

  const autoUpdateData = useCallback(() => {
    useMessage
      .messageReadUpdate(item.id)
      .then((response) => {
        if (response.ok) {
          // console.log(item.id);
          //   setMsgCount(response.data.data);
          // console.log(response.data);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <Screen>
      <View style={styles.messageBox}>
        <View style={styles.iconTop}>
          {item.seen ? (
            <MaterialCommunityIcons
              style={styles.icon}
              name="email-open"
              size={25}
              color={colors.statusbarTextColor}
            />
          ) : (
            <MaterialCommunityIcons
              style={styles.icon}
              name="email"
              size={25}
              color={colors.orangeDark}
            />
          )}

          <AppText style={styles.iconText}>{item.humanDate}</AppText>
        </View>
        <View style={styles.msgTitleBox}>
          <AppText style={styles.heading}>{item.title}</AppText>
        </View>
        <View style={styles.msgBox}>
          <AppText style={styles.subHeading}>{item.message}</AppText>
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: { padding: 10, fontSize: 16, fontWeight: "800" },

  subHeading: {
    padding: 10,
    fontSize: 14,
  },
  messageBox: {
    marginHorizontal: 20,
    backgroundColor: "#f7f7f7",
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  msgTitleBox: { marginTop: 20, backgroundColor: "#eeeeee" },
  msgBox: {},
  iconTop: { justifyContent: "center", alignItems: "center" },
  iconText: { fontSize: 12, color: colors.medium },
});

export default MessagesViewScreen;
