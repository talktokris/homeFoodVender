import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import FavListScreen from "../screens/FavListScreen";
import AppliedJobsScreen from "../screens/AppliedJobsScreen";
import MessagesScreenView from "../screens/MessagesScreenView";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Message View" component={MessagesScreenView} />
    <Stack.Screen name="Favorite Jobs" component={FavListScreen} />
    <Stack.Screen name="Jobs Applied" component={AppliedJobsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
