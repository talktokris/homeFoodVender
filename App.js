import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";

import navigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import RetryNavigator from "./app/navigation/RetryNavigator";

import authStorage from "./app/auth/storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  // App Loading Start

  const restoreUser = async () => {
    const token = await authStorage.getToken();
    // console.log(token);
    const user = await authStorage.getUser();
    if (user) setUser(user);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        restoreUser();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //  await new Promise((resolve) => setTimeout(resolve, 2000));
        restoreUser;
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // App Loading end

  function RenderComponent() {
    if (token) return <RetryNavigator />;
    else return <AuthNavigator />;
  }

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : RenderComponent()}
        {/* {user ? <AppNavigator /> : <AuthNavigator />} */}

        {/* <AppNavigator /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
