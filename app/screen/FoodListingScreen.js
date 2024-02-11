import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";

import AppTextSearch from "../components/AppTextSearch";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";

import RestaurantInfo from "./RestaurantInfo";
import FoodGridItem from "../components/FoodGridItem";

import menuApi from "../api/menu";
import useApi from "../hooks/useApi";
import RetryComponent from "../components/RetryComponent";
import AppEditButtonSmall from "../components/AppEditButtonSmall";

function FoodListingScreen({ route, navigation }) {
  const { user, logOut } = useAuth();

  const currrentUser = user.results ? user.results[0].id : 0;
  const fethcID = currrentUser;
  // const [fetch, setFetch] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [memuFilttred, setMemuFilttred] = useState([]);
  const [resultText, setResultText] = useState("");
  const [restData, setRestData] = useState([]);
  const [gHeight, setGHeight] = useState(0);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    // if (gHeight <= 50) {
    // setGHeight(width);
    // }
    // console.log(event.nativeEvent.layout);
  };

  const [refreshing, setRefreshing] = useState(false);

  const getFetchData = useApi(menuApi.fetchVenderMenu);

  const {
    data: { vender: venderData = [], food: foodData = [] },
    error,
    loading,
  } = getFetchData;

  useEffect(() => {
    const responseData = navigation.addListener("focus", () => {
      setBusy(true);
      getFetchData.request(fethcID);
    });
    return responseData;
  }, [navigation]);

  useEffect(() => {
    setBusy(foodData.loading);
    setErrorStatus(foodData.error);

    setRestData(venderData);

    setMenuData(foodData);

    setMemuFilttred(foodData);
    // console.log(foodData);
  }, [getFetchData.data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFetchData.request(fethcID);

    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);

  const onReTry = () => {
    getFetchData.request(fethcID);
  };

  function roundFunction(amount) {
    return parseFloat(amount).toFixed(0);
  }

  const handleSearch = (searchQuery) => {
    let filtered = menuData.filter((m) =>
      m.food_title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    if (searchQuery.length >= 1) {
      setMemuFilttred(filtered);
      if (filtered.length == 0) {
        setResultText("No results found");
      } else if (filtered.length == 1) {
        setResultText(memuFilttred.length + " result found");
      } else if (filtered.length <= 1) {
        setResultText(filtered.length + " results found");
      }
    } else {
      setResultText("");
      setMemuFilttred(menuData);
    }
  };

  const dataUpdate = () => {
    // console.log("Krishna: " + value);
    setFetch(!fetch);
  };

  return (
    <>
      <ActivityIndicator visible={busy} />
      <Screen>
        {errorStatus ? (
          <RetryComponent
            onPress={onReTry}
            message={" Couldn't retrieve the menu data."}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onReTry} />
            }
          >
            {restData.length >= 1 && (
              <RestaurantInfo
                route={route}
                navigation={navigation}
                restData={restData}
              />
            )}

            <View style={styles.imageUpdateBtn}>
              <AppEditButtonSmall
                title="Add Menu"
                color="secondary"
                icon="plus"
                styleProps={styles.profileChangeBtn}
                onPress={() => {
                  navigation.navigate(routes.MENU_ADD_FOOD, {
                    vender: restData,
                  });
                }}
              />
            </View>

            <View style={styles.searchBox}>
              <AppTextSearch
                name="words"
                autoCapitalize="none"
                autoCorrect={false}
                icon="magnify"
                textContentType="jobTitle"
                placeholder="Search here"
                onPress={handleSearch}
                // onChange={(e) => handleSearch(e)}
                //  onChange={(e) => console.log(e.nativeEvent.text)}
              />
              <AppText style={styles.searchHeading}>{resultText}</AppText>
            </View>
            <View
              onLayout={onLayout}
              style={[styles.gridContainer, { flex: 1, minHeight: gHeight }]}
            >
              {memuFilttred.map((item) => (
                <FoodGridItem
                  key={item.id.toString()}
                  id={item.id}
                  venderId={item.user_id}
                  category={item.food_category}
                  title={item.food_title}
                  price={item.customer_price}
                  oldPrice={item.vender_price}
                  //image={item.image}
                  image={item.image_name}
                  discount={item.discount_per}
                  onPress={() => {
                    navigation.navigate(routes.FOOD_OPTIONS, {
                      // item: item,
                      menuID: item.id,
                      venderId: restData[0].id,
                    });
                  }}
                  // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                  renderRightActions={() => (
                    <View style={{ backgroundColor: "red", height: 70 }}></View>
                  )}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  logoContainer: { justifyContent: "center" },

  heading: {
    fontWeight: "900",
    fontSize: 16,
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 10,
    color: colors.secondary,
  },

  searchHeading: {
    fontWeight: "900",
    fontSize: 14,
    paddingLeft: 25,
    paddingBottom: 5,
    paddingTop: 5,
    color: colors.secondary,
    textAlign: "center",
  },

  image: {
    alignSelf: "center",
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderRadius: 5,
    margin: 5,
    marginLeft: 10,
  },
  restContainer: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 10,
    borderColor: colors.separator,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  restItem: {
    flexDirection: "row",
    paddingTop: 10,
    PaddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  restItemContainer: { flex: 1 },
  icon: {
    marginTop: 10,
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  searchBox: { marginLeft: 15, marginTop: 10, marginRight: 15 },
  bottomArea: { flexDirection: "row" },
  bottomLeft: { width: "50%", padding: 10 },
  bottomRight: {
    width: "50%",
    flexDirection: "column-reverse",
    justifyContent: "center",
    padding: 10,
  },
  profileChangeBtn: { width: 120 },
  imageUpdateBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 2,
    top: 5,
    right: 20,
  },
});

export default FoodListingScreen;
