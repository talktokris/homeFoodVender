import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, FlatList } from "react-native";
//import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";

import FoodItem from "../components/FoodItem";
import AppTextSearch from "../components/AppTextSearch";
import { ErrorMessage, LinkButton } from "../components/forms";
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
];

function FoodListingScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    menuApi
      .fetchAllMenu()
      .then((data) => {
        if (data.ok) {
          setMenuData(data);
          setLoading(false);
          setMenuData(data.data.results);
          //  console.log(data.data.results);
        } else {
          setError(
            "Unable to get the database. Please check your internet connection"
          );
          setEstatus(true);
        }
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  // Delete
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <FlatList
            data={menuData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <FoodItem
                title={item.food_title}
                subTitle={item.food_description}
                //  image={item.image}
                image="../assets/images/img1.jpg"
                price={item.vender_price}
                distance={item.active_status}
                distanceUnit={item.veg_status}
                onPress={() => {
                  navigation.navigate(routes.SEARCH_DETAILS, {
                    itemData: item,
                  });
                }}
                // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            )}
            ItemSeparatorComponent={Separater}
          />

          <View style={styles.buttonContainer}>
            <LinkButton
              title=" Add New Menu"
              color="secondary"
              icon="google-maps"
              onPress={() => {
                // console.log("Hi");
                navigation.navigate(routes.MENU_ADD_FOOD);
              }}
              width="90"
            />
          </View>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
  },
});

export default FoodListingScreen;
