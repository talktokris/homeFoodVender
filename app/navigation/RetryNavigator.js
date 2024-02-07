import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RetryScreen from "../screen/RetryScreen";

const Stack = createNativeStackNavigator();
const RetryNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Retry Again"
      component={RetryScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RetryNavigator;
