import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/HomeScreen";
import OrdersActiveScreen from "../screen/OrdersActiveScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Services on Process" component={OrdersActiveScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
