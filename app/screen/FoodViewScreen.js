import React, { useState, useCallback } from "react";

import { View, StyleSheet, FlatList, Image } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";

import FoodItem from "../components/FoodItem";
import AppTextSearch from "../components/AppTextSearch";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import menuApi from "../api/menu";

const messages = [
  {
    id: 1,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img1.jpg"),
    price: 15,
    currency: "RM",
    distance: 3,
    distanceUnit: "KM",
  },
  {
    id: 2,
    title: "Mutton Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img2.jpg"),
    price: 12,
    currency: "RM",
    distance: 0.5,
    distanceUnit: "KM",
  },
  {
    id: 3,
    title: "Fish Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img3.jpg"),
    price: 17,
    currency: "RM",
    distance: 1.5,
    distanceUnit: "KM",
  },

  {
    id: 4,
    title: "Special Cheese Dosa",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img4.jpg"),
    price: 19,
    currency: "RM",
    distance: 1.8,
    distanceUnit: "KM",
  },

  {
    id: 5,
    title: "Non Veg Thali",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img5.jpg"),
    price: 11,
    currency: "RM",
    distance: 2.3,
    distanceUnit: "KM",
  },
];

function FoodViewScreen({ route, navigation }) {
  const itemData = route.params.itemData;
  //console.log(itemData);
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const handleDelete = async ({ id }) => {
    //  console.log("Hi: " + id);
    setLoading(true);

    const result = await menuApi.deleteMenu(id);
    // const tokenSet= result.access_token;
    //console.log(result.data);
    //console.log("==================");
    setLoading(false);

    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.success == false) {
      //  console.log("Krishna");
      setEstatus(true);
      setError(result.data.message);
    } else if (result.data.success == true) {
      const { data: id, message: messageSend } = result.data;
      navigation.navigate(routes.PRO_DONE, {
        message: messageSend,
        id: id,
        navRoute: routes.SEARCH_FOOD,
      });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  return (
    <Screen>
      <AppText style={styles.heading}>{itemData.food_title}</AppText>
      <Separater />
      <View>
        <Image
          source={require("../assets/images/img1.jpg")}
          style={styles.image}
        />
        <View style={styles.nav}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="circle"
            size={20}
            color={colors.primary}
          />

          <MaterialCommunityIcons
            style={styles.icon}
            name="circle"
            size={20}
            color={colors.primary}
          />

          <MaterialCommunityIcons
            style={styles.icon}
            name="circle"
            size={20}
            color={colors.primary}
          />

          <MaterialCommunityIcons
            style={styles.icon}
            name="circle"
            size={20}
            color={colors.primary}
          />
        </View>
      </View>
      <AppText style={styles.text}>{itemData.food_description}</AppText>
      <Separater />

      <View style={styles.bottomArea}>
        <View style={styles.bottomLeft}>
          <AppButton
            title="  Edit"
            onPress={() => {
              navigation.navigate(routes.MENU_EDIT_FOOD, {
                itemData: itemData,
              });
            }}
            color="secondary"
            icon="lead-pencil"
          />
        </View>

        <View style={styles.bottomRight}>
          <AppButton
            title="  Delete"
            onPress={() => {
              handleDelete(itemData);
            }}
            icon="delete"
          />
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontWeight: "900",
    fontSize: 20,
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 10,
    color: colors.secondary,
  },
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
  },
  nav: {
    flexDirection: "row",
    textAlign: "center",
    padding: 15,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
  itemArea: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
  },
  item: {
    fontSize: 20,
    fontWeight: "600",
  },
  itemInput: {
    width: 40,
    height: 40,
    border: 2,
    padding: 7,
    borderRadius: 4,
    borderColor: colors.secondary,
    backgroundColor: colors.lightGray,
    marginLeft: 20,
    marginRight: 20,
  },
  btnContainer: {
    padding: 5,
  },

  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "50%", padding: 30 },
  bottomRight: { width: "50%", flexDirection: "row-reverse", padding: 30 },
});

export default FoodViewScreen;
