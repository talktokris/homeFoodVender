import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PasswordResetScreen from "../screens/PasswordResetScreen";
import PasswordResetUpdateScreen from "../screens/PasswordResetUpdateScreen";
import AuthTaskDoneScreen from "../screens/AuthTaskDoneScreen";

const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Password Reset" component={PasswordResetScreen} />
    <Stack.Screen
      name="Password Reset Save"
      component={PasswordResetUpdateScreen}
    />
    <Stack.Screen name="Reset Done" component={AuthTaskDoneScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
