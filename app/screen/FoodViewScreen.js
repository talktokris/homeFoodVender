import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, FlatList, Image } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Separater from "../components/Separater";
import { ErrorMessage } from "../components/forms";

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
import ImageInputList from "../components/ImageInputList";

function FoodViewScreen({ route, navigation }) {
  const fethcID = route.params.id;
  // console.log(fethcID);
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const activeData = user.options.active_status;
  const vegStatusData = user.options.veg_status;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback((id) => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    //console.log(fethcID);
    menuApi
      .fetchSingleMenu(fethcID)
      .then((data) => {
        //   console.log(data.data.results);
        if (data.ok) {
          setMenuData(data);
          setLoading(false);
          setMenuData(data.data.results[0]);

          //   console.log(data.data.results[0].images);
          //  console.log("Krishna : " + data.data.results[0].id);
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
  const handleDelete = async (id) => {
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
  /*
  const onRemoveImage = (image) => {
    // navigation.navigate(routes.MENU_IMAGE_UPLOAD, { menuID: fethcID });
    console.log("RemoveClicked : " + image.id);
    deleteMenu;
  };
*/
  const onRemoveImage = async (image) => {
    setLoading(true);

    const result = await menuApi.imageDeleteMenu(image.id, fethcID);
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
  const onAddImage = () => {
    // console.log("Add Image Clicked 2");
    navigation.navigate(routes.MENU_IMAGE_UPLOAD, { menuID: fethcID });
  };

  function activeStaus(status) {
    const statusSelectedItem = activeData.find((c) => c.id == status);

    if (typeof statusSelectedItem !== "undefined") {
      return statusSelectedItem.title;
    }
  }

  function vegStaus(status) {
    const vegSelectedItem = vegStatusData.find((c) => c.id == status);

    if (typeof vegSelectedItem !== "undefined") {
      return vegSelectedItem.title;
    }
  }

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <AppText style={styles.heading}>{menuData.food_title}</AppText>
          <Separater />

          <View>
            <ImageInputList
              imageUris={menuData.images}
              itemID={fethcID}
              onRemoveImage={onRemoveImage}
              onAddImage={onAddImage}
            />
          </View>
          <AppText style={styles.text}>{menuData.food_description}</AppText>
          <Separater />

          <View style={styles.bottomArea}>
            <View style={styles.bottomLeft}>
              <AppText style={styles.location} numberOfLines={1}>
                Menu ID
              </AppText>
              <AppText style={styles.price} numberOfLines={1}>
                HM {menuData.id}
              </AppText>
            </View>

            <View style={styles.bottomRight}>
              <AppText style={styles.price} numberOfLines={1}>
                RM {menuData.customer_price}
              </AppText>
              <AppText style={styles.location} numberOfLines={1}>
                Customer Price
              </AppText>
            </View>
          </View>

          <View style={styles.bottomArea}>
            <View style={styles.bottomLeft}>
              <AppText style={styles.location} numberOfLines={1}>
                Vender Price
              </AppText>
              <AppText style={styles.price} numberOfLines={1}>
                RM {menuData.vender_price}
              </AppText>
            </View>

            <View style={styles.bottomRight}>
              <AppText style={styles.price} numberOfLines={1}>
                {menuData.discount_per} %
              </AppText>
              <AppText style={styles.location} numberOfLines={1}>
                Discount
              </AppText>
            </View>
          </View>

          <View style={styles.bottomArea}>
            <View style={styles.bottomLeft}>
              <AppText style={styles.location} numberOfLines={1}>
                Veg Status
              </AppText>
              <AppText style={styles.price} numberOfLines={1}>
                {vegStaus(menuData.veg_status)}
              </AppText>
            </View>

            <View style={styles.bottomRight}>
              <AppText style={styles.price} numberOfLines={1}>
                {activeStaus(menuData.active_status)}
              </AppText>
              <AppText style={styles.location} numberOfLines={1}>
                Active Status
              </AppText>
            </View>
          </View>
          <Separater />
          <View style={styles.bottomArea}>
            <View style={styles.bottomLeft}>
              <AppButton
                title="  Edit"
                onPress={() => {
                  navigation.navigate(routes.MENU_EDIT_FOOD, {
                    itemData: menuData,
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
                  handleDelete(menuData.id);
                }}
                icon="delete"
              />
            </View>
          </View>
        </Screen>
      )}
    </>
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
  price: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "800",
  },

  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "50%", padding: 10 },
  bottomRight: {
    width: "50%",
    flexDirection: "column-reverse",
    justifyContent: "center",
    padding: 10,
  },
});

export default FoodViewScreen;
