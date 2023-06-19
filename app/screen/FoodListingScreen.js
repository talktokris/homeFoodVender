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
import settings from "../config/setting";

import FoodItem from "../components/FoodItem";
import AppTextSearch from "../components/AppTextSearch";
import { ErrorMessage, LinkButton } from "../components/forms";
import menuApi from "../api/menu";

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

  function makeUri(defID, imaData) {
    // console.log(imaData.food_menu_id);
    let imgUri = (imgUri = settings.imageUrl + "/menu/no_image.jpg");

    if (imaData != null)
      imgUri =
        settings.imageUrl +
        "/menu/" +
        imaData.food_menu_id +
        "/" +
        imaData.image_name;
    //  console.log(imgUri);

    return imgUri;
  }

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
                image={makeUri(item.menu_profile_img_id, item.default_image)}
                price={item.vender_price}
                distance={item.active_status}
                distanceUnit={item.veg_status}
                onPress={() => {
                  // console.log(item.id);
                  navigation.navigate(routes.SEARCH_DETAILS, {
                    id: item.id,
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
              icon="food"
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
