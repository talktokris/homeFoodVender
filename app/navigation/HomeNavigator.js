import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/HomeScreen";
import OrdersActiveScreen from "../screen/OrdersActiveScreen";
import MessagesScreen from "../screen/MessagesScreen";
import MessagesViewScreen from "../screen/MessagesViewScreen";

import HeaderTop from "../components/HeaderTop";
const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
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
    <Stack.Screen name="Services on Process" component={OrdersActiveScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Message View" component={MessagesViewScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
