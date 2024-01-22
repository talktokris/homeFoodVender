import React, { useState, useEffect, useCallback, useContext } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";
import RetryComponent from "../components/RetryComponent";

// import FoodmenuData from "../components/FoodmenuData";
import AppText from "../components/AppText";

import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";
import menuApi from "../api/menu";
import AppCheckBoxCustom from "../components/AppCheckBoxCustom";
import AppRadioCustom from "../components/AppRadioCustom";
import settings from "../config/setting";
import AppEditButtonSmall from "../components/AppEditButtonSmall";
import AppCircleButton from "../components/AppCircleButton";
import VegStatus from "../components/VegStatus";
import CatHalal from "../components/CatHalal";
import Stars from "../components/Stars";
function FoodOptionsScreen({ route, navigation }) {
  const fethcID = route.params.venderId;
  const menuID = route.params.menuID;
  // console.log(menuID);

  const [isLoading, setLoading] = useState(false);
  const [eStatus, setEstatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [menuData, setMenuData] = useState([]);
  const [options, setOptions] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [menuDatas, setmenuDatas] = useState([]);

  const getFetchData = useApi(menuApi.fetchSingleMenu);

  const {
    data: { food: foodData = [] },
    error,
    loading,
  } = getFetchData;

  useEffect(() => {
    const responseData = navigation.addListener("focus", () => {
      getFetchData.request(menuID);
    });
    return responseData;
  }, [navigation]);

  useEffect(() => {
    if (foodData.length >= 1) {
      setMenuData(foodData);
      // console.log(foodData[0]);
      setTotalPrice(foodData[0].customer_price);
      setOptions(foodData[0].arguments);
    }

    // setMemuFilttred(foodData);
  }, [getFetchData.data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFetchData.request(menuID);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onReTry = () => {
    getFetchData.request(menuID);
  };
  // console.log(foodData);
  // const menuData = route.params.menuData;

  // const vender = route.params.vender;

  // console.log(restData.id);

  useEffect(() => {
    // console.log(cart);
  });

  //console.log(menuData.arguments);
  function onCheck(value) {
    // console.log(value);
    //  setComStatus(false);
  }

  function makeUri(defID, imageName) {
    let imgUri = settings.imageUrl + "/venders/no_image.jpg";
    if (imageName != null)
      imgUri = settings.imageUrl + "/venders/" + defID + "/" + imageName;
    return imgUri;
  }

  const handleTitleRemove = async (titleData) => {
    // console.log(titleData);

    setLoading(true);
    setEstatus(false);
    const result = await menuApi.deleteHeading(titleData);

    setLoading(false);

    if (!result.ok) {
      setEstatus(true);
      setErrorMsg(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.ok) {
      if (result.data.success == false) {
        setEstatus(true);
        setErrorMsg(result.data.message);
      } else if (result.data.success == true) {
        // console.log(result.data);
        const { data: id, message: messageSend } = result.data;

        navigation.navigate(routes.PRO_DONE, {
          message: messageSend,
          paramsObj: {
            venderId: fethcID,
            menuID: menuID,
          },
          navRoute: routes.FOOD_OPTIONS,
        });
      }
    } else {
      setEstatus(true);
      setErrorMsg("Unknown error");
    }
  };

  const handlemenuDataRemove = (menuDataData, menuData) => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Yes",
        onPress: () => handleDeleteExtraItem(menuDataData, menuData),
      },
      { text: "No" },
    ]);
  };

  const handleDeleteExtraItem = async (menuDataData, menuData) => {
    const argId = menuDataData.id;
    const foodMenuId = menuData[0].id;

    setLoading(true);
    setEstatus(false);
    const result = await menuApi.deleteAddOn(argId, foodMenuId);

    setLoading(false);

    if (!result.ok) {
      setEstatus(true);
      setErrorMsg(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.ok) {
      if (result.data.success == false) {
        setEstatus(true);
        setErrorMsg(result.data.message);
      } else if (result.data.success == true) {
        // console.log(result.data);
        const { data: id, message: messageSend } = result.data;

        navigation.navigate(routes.PRO_DONE, {
          message: messageSend,
          paramsObj: {
            venderId: fethcID,
            menuID: menuID,
          },
          navRoute: routes.FOOD_OPTIONS,
        });
      }
    } else {
      setEstatus(true);
      setErrorMsg("Unknown error");
    }
  };

  const handleMenuRemove = (menuData, MenumenuData) => {
    console.log("Menu Delete Clicked");
  };

  const handleMenumenuData = (op, menuData) => {
    navigation.navigate(routes.MENU_EXTRA_ADD, {
      menu: menuData,
      heading: op,
    });
  };

  function halalFind(halalStatus) {
    if (halalStatus == 1) {
      return "Halal";
    } else if (halalStatus == 2) {
      return "Non Halal";
    } else {
      return "";
    }
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        {error ? (
          <RetryComponent
            onPress={onReTry}
            message=" Couldn't retrieve the menu data."
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {menuData.length >= 1 && (
              <>
                <View style={styles.imageUpdateBtn}>
                  <AppEditButtonSmall
                    title="Change"
                    color="secondary"
                    icon="image-edit"
                    styleProps={styles.profileChangeBtn}
                    onPress={() => {
                      navigation.navigate(routes.MENU_IMAGE_UPLOAD, {
                        fethcID: fethcID,
                        menu: menuData[0],
                      });
                    }}
                  />
                </View>

                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: makeUri(fethcID, menuData[0].image_name) }}
                  />
                </View>
                <View style="containerFull">
                  <View style={styles.btnContainer}>
                    <AppEditButtonSmall
                      title="Edit"
                      color="secondary"
                      icon="pencil"
                      styleProps={styles.profileChangeBtn}
                      onPress={() => {
                        navigation.navigate(routes.MENU_EDIT_FOOD, {
                          menu: menuData[0],
                          fethcID: fethcID,
                        });
                      }}
                    />

                    <View style={styles.imageUpdateBtn}>
                      <AppEditButtonSmall
                        title="Delete"
                        color="secondary"
                        icon="delete"
                        styleProps={styles.profileChangeBtn}
                        onPress={() => {
                          Alert.alert(
                            "Delete",
                            "Are you sure you want to delete this menu?",
                            [
                              {
                                text: "Yes",
                                onPress: () =>
                                  handleMenuRemove(fethcID, menuData[0]),
                              },
                              { text: "No" },
                            ]
                          );
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.container}>
                    <View style={styles.foodContainer}>
                      <View style={styles.headContainer}>
                        <AppText style={styles.heading}>
                          {menuData[0].food_title}
                        </AppText>
                        <AppText style={styles.text}>
                          {menuData[0].food_description}
                        </AppText>
                      </View>
                      <View style={styles.priceContainer}>
                        <AppText style={styles.price}>
                          RM {menuData[0].customer_price}
                        </AppText>
                        <AppText style={styles.bPrice}>Best Price</AppText>
                      </View>
                    </View>
                  </View>
                  <View style={styles.containerFull}>
                    <Stars star={menuData[0].rating} />
                    <CatHalal
                      halalStatus={halalFind(menuData[0].halal_status)}
                      foodCategory={menuData[0].food_category}
                    />

                    <VegStatus status={menuData[0].veg_status} />
                  </View>
                </View>

                <View style={styles.optionBoxContainer}>
                  <View style={styles.imageUpdateBtn}>
                    <AppEditButtonSmall
                      title="Extra Title"
                      color="secondary"
                      icon="plus"
                      styleProps={styles.profileChangeBtn}
                      onPress={() => {
                        navigation.navigate(routes.MENU_TITLE_ADD, {
                          menu: menuData[0],
                        });
                      }}
                    />
                  </View>

                  {eStatus && (
                    <ErrorMessage error={errorMsg} visible={eStatus} />
                  )}
                  {options.map((op) =>
                    op.pick_type ? (
                      <View
                        key={op.id.toString()}
                        style={[styles.container, { flexDirection: "column" }]}
                      >
                        <View style={styles.titleContainer}>
                          <AppText style={styles.headingSmall}>
                            {op.title}
                          </AppText>
                          <AppText style={styles.textPd}>Pick 1</AppText>
                          <View style={styles.optionBtns}>
                            <AppCircleButton
                              icon="pencil"
                              size={20}
                              color={colors.orangeDark}
                              onPress={() => {
                                navigation.navigate(routes.MENU_TITLE_EDIT, {
                                  menu: menuData,
                                  fethcID: fethcID,
                                  heading: op,
                                });
                              }}
                            />

                            <AppCircleButton
                              icon="delete"
                              size={20}
                              color={colors.primary}
                              onPress={() => {
                                Alert.alert(
                                  "Delete",
                                  "Are you sure you want to delete this menu?",
                                  [
                                    {
                                      text: "Yes",
                                      onPress: () => handleTitleRemove(op),
                                    },
                                    { text: "No" },
                                  ]
                                );
                                // handleTitleRemove(op);
                              }}
                            />
                          </View>

                          <View style={styles.imageUpdateBtn}>
                            <AppCircleButton
                              key={op.id.toString()}
                              icon="plus-circle"
                              size={25}
                              color={colors.secondary}
                              onPress={() => handleMenumenuData(op, menuData)}
                            />
                          </View>
                        </View>

                        <View style={styles.optionsContainer}>
                          {op.list.map((m) => (
                            <AppRadioCustom
                              key={m.id.toString()}
                              text={m.description}
                              price={m.price}
                              data={m}
                              onEdit={() => {
                                navigation.navigate(routes.MENU_EXTRA_EDIT, {
                                  menu: menuData,
                                  heading: op,
                                  extraData: m,
                                });
                              }}
                              onRemove={() => {
                                handlemenuDataRemove(m, menuData);
                              }}

                              // onCheck={onCheck}
                            />
                          ))}
                        </View>
                      </View>
                    ) : (
                      <View
                        key={op.id.toString()}
                        style={[styles.container, { flexDirection: "column" }]}
                      >
                        <View style={styles.titleContainer}>
                          <AppText style={styles.headingSmall}>
                            {op.title}{" "}
                          </AppText>
                          <AppText style={styles.textPd}></AppText>
                          <View style={styles.optionBtns}>
                            <AppCircleButton
                              icon="pencil"
                              size={20}
                              color={colors.orangeDark}
                              onPress={() => {
                                navigation.navigate(routes.MENU_TITLE_EDIT, {
                                  menu: menuData,
                                  heading: op,
                                });
                              }}
                            />

                            <AppCircleButton
                              icon="delete"
                              size={20}
                              color={colors.primary}
                              onPress={() => {
                                Alert.alert(
                                  "Delete",
                                  "Are you sure you want to delete this menu?",
                                  [
                                    {
                                      text: "Yes",
                                      onPress: () => handleTitleRemove(op),
                                    },
                                    { text: "No" },
                                  ]
                                );

                                // handleTitleRemove(op);
                              }}
                            />
                          </View>
                          <View style={styles.imageUpdateBtn}>
                            <AppCircleButton
                              icon="plus-circle"
                              key={op.id.toString()}
                              size={25}
                              color={colors.secondary}
                              onPress={() => {
                                Alert.alert(
                                  "Delete",
                                  "Are you sure you want to delete this title?",
                                  [
                                    {
                                      text: "Yes",
                                      onPress: () =>
                                        handleMenumenuData(op, menuData),
                                    },
                                    { text: "No" },
                                  ]
                                );
                              }}
                            />
                          </View>
                        </View>

                        <View style={styles.optionsContainer}>
                          {op.list.map((n) => (
                            <AppCheckBoxCustom
                              key={n.id.toString()}
                              text={n.description}
                              price={n.price}
                              data={n}
                              onEdit={() => {
                                navigation.navigate(routes.MENU_EXTRA_EDIT, {
                                  menu: menuData,
                                  heading: op,
                                  extraData: n,
                                });
                              }}
                              onRemove={() => {
                                handlemenuDataRemove(n, menuData);
                              }}
                            />
                          ))}
                        </View>
                      </View>
                    )
                  )}
                </View>
              </>
            )}
          </ScrollView>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  containerFull: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    padding: 5,
    marginBottom: 5,
  },
  container: {
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 5,
  },

  foodContainer: { flex: 1, flexDirection: "row" },
  headContainer: { padding: 10, width: "75%" },
  priceContainer: {
    flexDirection: "column",
    with: "25%",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    alignSelf: "center",
  },
  heading: {
    fontWeight: "900",
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 0,
    color: colors.secondary,
  },

  headingSmall: {
    fontWeight: "800",
    fontSize: 14,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.secondary,
  },

  text: {
    fontSize: 14,
  },
  textPd: {
    fontSize: 12,
    paddingBottom: 5,
    paddingTop: 12,
    paddingLeft: 10,
    color: colors.medium,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "800",
    textAlign: "center",
  },
  bPrice: { fontSize: 14, textAlign: "center" },
  optionBoxContainer: {
    position: "relative",
    paddingTop: 40,
  },
  titleContainer: { flexDirection: "row" },
  optionsContainer: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    padding: 10,
  },
  profileChangeBtn: { width: 110 },
  btnContainer: { flexDirection: "row", padding: 5 },
  imageUpdateBtn: {
    position: "absolute",
    zIndex: 2,
    flexDirection: "row",
    right: 5,
    top: 5,
  },
  optionBtns: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FoodOptionsScreen;
