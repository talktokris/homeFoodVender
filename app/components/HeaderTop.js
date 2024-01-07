import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Constants from "expo-constants";
import TopMenu from "./TopMenu";
import HeaderBackButton from "./HeaderBackButton";
import colors from "../config/colors";

function HeaderTop(props) {
  const { route, navigation } = props;
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkGo();
    });
    return unsubscribe;
  }, [navigation]);

  function checkGo() {
    if (navigation.canGoBack()) {
      setShowBack(true);
    } else {
      setShowBack(false);
    }
  }
  return (
    <SafeAreaView style={styles.screens}>
      <View style={styles.container}>
        <View style={styles.backIconContainer}>
          {showBack && <HeaderBackButton onPress={() => navigation.goBack()} />}
        </View>
        <View>
          <Text style={styles.titleText}>{route.name}</Text>
        </View>
        <TopMenu />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screens: {
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.statusbarColor,
  },
  container: {
    backgroundColor: colors.statusbarColor,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  backIconContainer: { width: 50 },

  titleText: {
    padding: 5,
    marginTop: 2,
    fontSize: 16,
    fontWeight: "600",
    color: colors.statusbarTextColor,
  },
});
export default HeaderTop;
