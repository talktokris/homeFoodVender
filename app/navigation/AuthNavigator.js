import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginMobileScreen from "../screen/LoginMobileScreen";
import LoginMobileOtpScreen from "../screen/LoginMobileOtpScreen";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import LoginEmailOtpScreen from "../screen/LoginEmailOtpScreen";
import ForgetPasswordScreen from "../screen/ForgetPasswordScreen";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login Mobile"
      component={LoginMobileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login Mobile OTP" component={LoginMobileOtpScreen} />
    <Stack.Screen name="Email Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Email OTP" component={LoginEmailOtpScreen} />
    <Stack.Screen name="Password Reset" component={ForgetPasswordScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
