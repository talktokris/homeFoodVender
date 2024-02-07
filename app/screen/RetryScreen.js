import React, { useState, useContext } from "react";

import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import userRetrive from "../auth/userRetrive";
import useAuth from "../auth/useAuth";

function RetryScreen({ action, message, icon = "wifi-alert" }) {
  const [user, setUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const restoreUser = async () => {
    const token = await authStorage.getToken();
    // console.log("token: " + token);
    // console.log("user: " + user);
    setLoading(true);
    const profile = await userRetrive(token);
    if (!profile.ok) setLoading(false);
    // console.log(profile.status);
    if (profile.status == 401) {
      // console.log("hi2");
      // useAuth.logOut();
      setUser(null);
    }
    if (profile.status == 200) {
      setUser(profile.data);
    }
    // setUser(null);
    // console.log("hi");

    // console.log("user: " + user);
    setLoading(false);
    //  if(user)
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <View style={styles.retryView}>
              <View style={styles.iconView}>
                <MaterialCommunityIcons
                  name={icon}
                  size={40}
                  color={colors.medium}
                />
              </View>

              <AppText style={styles.noMsgFound}>
                Unable to connect to network. please check your internet
                connection
              </AppText>

              <AppButton title="Retry" onPress={() => restoreUser()} />
            </View>
          </>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  retryView: {
    flex: 1,
    justifyContent: "center",
    margin: 50,
  },
  noMsgFound: {
    marginVertical: 40,
    textAlign: "center",
    color: colors.medium,
  },
  iconView: { justifyContent: "center", alignItems: "center" },
  emptyMessageStyle: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default RetryScreen;
