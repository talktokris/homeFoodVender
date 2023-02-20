import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodListingScreen from "../screen/FoodListingScreen";
import FoodViewScreen from "../screen/FoodViewScreen";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen name="Food Search" component={FoodListingScreen} />
    <Stack.Screen name="Food Details" component={FoodViewScreen} />
  </Stack.Navigator>
);

export default FoodNavigator;
