import react, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";

import JobsNavigator from "./JobsNavigator";
import AccountNavigator from "./AccountNavigator";
import ResumeNavigator from "./ResumeNavigator";
import userUpdate from "../api/userUpdate";
import useAuth from "../auth/useAuth";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
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
      initialRouteName="Jobs"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Resume"
        component={ResumeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-account"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton onPress={() => navigation.navigate("Jobs")} />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Accout"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
