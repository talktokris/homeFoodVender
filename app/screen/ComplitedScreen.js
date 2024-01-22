import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

function ComplitedScreen({ route, navigation }) {
  const message = route.params.message;
  const paramsObj = route.params.paramsObj;
  const navRoute = route.params.navRoute;

  return (
    <View style={styles.container}>
      <AppText title={message} />

      <MaterialCommunityIcons
        style={styles.icon}
        name="check-circle"
        size={50}
        color={colors.medium}
      />
      <Text style={styles.test}>{message}</Text>
      <View style={styles.buttonDiv}>
        <AppButton
          title="Ok"
          onPress={() => {
            navigation.navigate(navRoute, paramsObj);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonDiv: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  animations: { width: 150 },
  test: { padding: 10 },
});

export default ComplitedScreen;
