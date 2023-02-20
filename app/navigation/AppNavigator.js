import react, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import * as Notifications from "expo-notifications";
//import * as Device from "expo-device";

import HomeNavigator from "./HomeNavigator";
import FoodNavigator from "./FoodNavigator";
import OrderNavigator from "./OrderNavigator";
import AccountNavigator from "./AccountNavigator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import TopMenu from "../components/TopMenu";
import IconBtn from "../components/IconBtn";

//import userUpdate from "../api/userUpdate";
//import useAuth from "../auth/useAuth";

/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
*/
const Tab = createBottomTabNavigator();

const AppNavigator = (color = "blue") => {
  /*
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //  alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);

      savingDeviceToken(token);
      // this.setState({ expoPushToken: token });
    } else {
      // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const { user, logOut } = useAuth();
  
  const currrentUser = user.id;

  const savingDeviceToken = async (deviceID) => {
    // console.log(userInfo);

    userUpdate.pushDeviceSave(deviceID, currrentUser);
    /// if (!result.ok) return;
  };

  /*

  const registerForPushNotifications = async () => {

    const token = await Notifications.getExpoPushTokenAsync();
    console.log("hi:" + token);

    try {
      const permissions = Permissions.askAsync(Permissions.NOTIFICATIONS);
      console.log("hi" + token);
      if (!permissions.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
  */

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarLabelStyle: { fontWeight: "600", fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <TopMenu
              name="email"
              onPress={() => console.log("hi")}
              title="Update count"
            />
          ),
          headerLeft: () => <IconBtn />,
          headerTintColor: colors.lightGray,
          headerStyle: {
            backgroundColor: colors.lightGray,
          },
        }}
      />

      <Tab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),

          headerRight: () => (
            <TopMenu
              name="email"
              onPress={() => console.log("hi")}
              title="Update count"
            />
          ),
          headerLeft: () => <IconBtn />,
          headerTintColor: colors.lightGray,
          headerStyle: {
            backgroundColor: colors.lightGray,
          },
          // headerShown: false,
        }}
      />

      <Tab.Screen
        name="Menu"
        component={FoodNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),
          headerRight: () => (
            <TopMenu
              name="email"
              onPress={() => console.log("hi")}
              title="Update count"
            />
          ),
          headerLeft: () => <IconBtn />,
          headerTintColor: colors.lightGray,
          headerStyle: {
            backgroundColor: colors.lightGray,
          },
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerRight: () => (
            <TopMenu
              name="email"
              onPress={() => console.log("hi")}
              title="Update count"
            />
          ),
          headerLeft: () => <IconBtn />,
          headerTintColor: colors.lightGray,
          headerStyle: {
            backgroundColor: colors.lightGray,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
