import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveryReadyScreen from "../screen/DeliveryReadyScreen";

import HeaderTop from "../components/HeaderTop";

const Stack = createNativeStackNavigator();

const DeliveryNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      lazy: false,
      headerShown: true,
      height: 250,
      backgroundColor: "#111",
      headerMode: "screen",
      animation: "fade",

      header: (props) => <HeaderTop style="light" {...props} />,
    }}
  >
    <Stack.Screen name="Ready for Delivery" component={DeliveryReadyScreen} />
  </Stack.Navigator>
);

export default DeliveryNavigator;
