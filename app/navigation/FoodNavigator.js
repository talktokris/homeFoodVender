import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FoodListingScreen from "../screen/FoodListingScreen";
import FoodViewScreen from "../screen/FoodViewScreen";
import FoodAddScreen from "../screen/FoodAddScreen";
import FoodEditScreen from "../screen/FoodEditScreen";

import ComplitedScreen from "../screen/ComplitedScreen";
import ImageUplaodScreen from "../screen/ImageUplaodScreen";

import HeaderTop from "../components/HeaderTop";
import FoodOptionsScreen from "../screen/FoodOptionsScreen";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => (
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
    <Stack.Screen name="Food Menu" component={FoodListingScreen} />
    <Stack.Screen name="Food Options" component={FoodOptionsScreen} />
    <Stack.Screen name="Food Details" component={FoodViewScreen} />
    <Stack.Screen name="Add New Menu" component={FoodAddScreen} />
    <Stack.Screen name="Edit Menu" component={FoodEditScreen} />
    <Stack.Screen name="Image Upload" component={ImageUplaodScreen} />
    <Stack.Screen name="Done" component={ComplitedScreen} />
  </Stack.Navigator>
);

export default FoodNavigator;
