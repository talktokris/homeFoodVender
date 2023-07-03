import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveryReadyScreen from "../screen/DeliveryReadyScreen";

const Stack = createNativeStackNavigator();

const DeliveryNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Ready for Delivery" component={DeliveryReadyScreen} />
  </Stack.Navigator>
);

export default DeliveryNavigator;
