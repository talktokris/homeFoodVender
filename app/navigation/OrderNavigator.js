import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrdersPendingScreen from "../screen/OrdersPendingScreen";
import FoodTrackingScreen from "../screen/FoodTrackingScreen";

const Stack = createNativeStackNavigator();

const OrderNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Pending Orders" component={OrdersPendingScreen} />
    <Stack.Screen name="Order Tracking" component={FoodTrackingScreen} />
  </Stack.Navigator>
);

export default OrderNavigator;
