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
import AddressScreen from "../screen/AddressScreen";
import AddressAddScreen from "../screen/AddressAddScreen";
import SalesStatementScreen from "../screen/SalesStatementScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
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
