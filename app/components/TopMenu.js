import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import MsgAlertIcon from "./MsgAlertIcon";
import routes from "../navigation/routes";
import { useNavigation } from "@react-navigation/native";
import useMessage from "../api/message";

function TopMenu({
  name,
  size = 32,
  backgroundColor = "#000",
  iconColor = "#fff",
  onPress,
}) {
  const navigation = useNavigation();

  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      autoUpdateData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const autoUpdateData = useCallback(() => {
    useMessage
      .messageReadCount()
      .then((response) => {
        if (response.ok) {
          setMsgCount(response.data.data);
          // console.log(response.data.data);
        }
      })
      .catch((error) => {});
  }, []);

  const handlePress = () => {
    navigation.navigate(routes.ACCOUNT_MESSAGES);
  };
  return (
    <View style={styles.container}>
      <MsgAlertIcon onPress={handlePress} Items={msgCount} />

      {/* <TouchableOpacity style={styles.iconBg} onPress={onPress}>
        <MaterialCommunityIcons
          name="bell"
          size={27}
          color={colors.statusbarTextColor}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBg: {
    //backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },
  text: {
    padding: 15,
    backgroundColor: "#eee",
    marginTop: 2,
  },
});
export default TopMenu;
