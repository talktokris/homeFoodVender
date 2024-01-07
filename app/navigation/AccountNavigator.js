import React from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screen/AccountScreen";
import ProfileScreen from "../screen/ProfileScreen";
import MessagesScreen from "../screen/MessagesScreen";
import SearchRadiusScreen from "../screen/SearchRadiusScreen";
import OrdersHistoryScreen from "../screen/OrdersHistoryScreen";
import SupportScreen from "../screen/SupportScreen";
import AccountPasswordScreen from "../screen/AccountPasswordScreen";
import SalesStatementScreen from "../screen/SalesStatementScreen";
import AddressScreen from "../screen/AddressScreen";

import HeaderTop from "../components/HeaderTop";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
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
    <Stack.Screen name="Account Menu" component={AccountScreen} />
    <Stack.Screen name="Address" component={AddressScreen} />
    <Stack.Screen name="Earning Statement" component={SalesStatementScreen} />

    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Search Radius" component={SearchRadiusScreen} />
    <Stack.Screen name="Sales History" component={OrdersHistoryScreen} />
    <Stack.Screen name="Support" component={SupportScreen} />
    <Stack.Screen name="Change Password" component={AccountPasswordScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
