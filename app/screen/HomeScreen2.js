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

const messages = [
  {
    id: 1,
    title: "Traditional Malaysian Food",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img6.jpg"),
    price: 15,
    currency: "RM",
    distance: 3,
    distanceUnit: "KM",
  },
  {
    id: 2,
    title: "Sea Food Breakfast",
    subTitle:
      "Chopathi Ponni Rice Kootu Chicken Fry, Fish Fry Rasom Curd, Simple Green Salad",
    image: require("../assets/images/img7.jpg"),
    price: 12,
    currency: "RM",
    distance: 0.5,
    distanceUnit: "KM",
  },
];

function HomeScreen2({ navigation }) {
  /*
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    userUpdate
      .messageFatch(currrentUser)
      .then((data) => {
        setUsers(data);
        // console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);
  // console.log(users);
  var key = 1;
  */
  return (
    <Screen>
      <AppText style={styles.heading}> Recommended Foods</AppText>
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
      <Separater />
      <AppText style={styles.heading}> Top Foods Nearby</AppText>
      <Separater />
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <FoodItem
            title={item.title}
            subTitle={item.subTitle}
            image={item.image}
            price={item.price}
            distance={item.distance}
            distanceUnit={item.distanceUnit}
            onPress={() => {
              navigation.navigate(routes.SEARCH_DETAILS);
            }}
            // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
            renderRightActions={() => (
              <View style={{ backgroundColor: "red", height: 70 }}></View>
            )}
          />
        )}
        ItemSeparatorComponent={Separater}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontWeight: "900",
    fontSize: 19,
    paddingBottom: 5,
    color: colors.secondary,
    paddingTop: 10,
  },
  image: {
    width: "100%",
    height: 180,
    alignSelf: "center",
  },
  nav: {
    flexDirection: "row",
    textAlign: "center",
    padding: 15,
    justifyContent: "center",
  },
});

export default HomeScreen2;
