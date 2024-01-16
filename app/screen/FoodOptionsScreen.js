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

import FoodItem from "../components/FoodItem";
import AppText from "../components/AppText";

import AppButton from "../components/AppButton";
import { ErrorMessage, LinkButton } from "../components/forms";
import menuApi from "../api/menu";
import AppCheckBoxCustom from "../components/AppCheckBoxCustom";
import AppRadioCustom from "../components/AppRadioCustom";
import settings from "../config/setting";
import AppEditButtonSmall from "../components/AppEditButtonSmall";
import AppCircleButton from "../components/AppCircleButton";

function FoodOptionsScreen({ route, navigation }) {
  const item = route.params.item;
  const options = item.arguments;
  const vender = route.params.vender;
  const restData = vender[0];
  const { user, logOut } = useAuth();

  // const currrentUser = user.id;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const [totalPrice, setTotalPrice] = useState(item.customer_price);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // console.log(cart);
  });

  //console.log(item.arguments);
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

  const addItem = (m, status) => {
    let itemPrice = m.price;
    let id = m.id;
    const getItems = [...items];
    if (status) {
      setTotalPrice(+totalPrice - +itemPrice);
      const index = getItems.indexOf(id);
      getItems.splice(index, 1);
      setItems(getItems);
    } else {
      setTotalPrice(+totalPrice + +itemPrice);
      // items.push(m.id);
      getItems.push(id);
      setItems(getItems);
    }
    // console.log(m);
  };

  const handleAddCart = () => {
    const venderData = {
      id: restData.id,
      name: restData.name,
      location: restData.location_lebel,
      image: restData.banner_image,
    };

    const foodData = {
      id: item.id,
      title: item.food_title,
      discription: item.food_description,
      image: item.image_name,
      price: item.customer_price,
    };
    // console.log(restData);

    const cartObj = {
      vender_id: item.user_id,
      vData: venderData,
      food_id: item.id,
      fData: foodData,
      tPrice: totalPrice,
      arguments: items,
    };
    const getCarts = [...cart, cartObj];
    setCart(getCarts);

    Alert.alert("", "Item added successfully", [
      {
        text: "Ok",
        onPress: () => navigation.goBack(),
      },
    ]);
    // console.log(getCarts);

    // navigation.navigate(routes.HOME_FOOD_DETAILS, {
    //   foodId: item.id,
    //   itemData: item,
    //   venderId: item.user_id,
    //   type: "list",
    // });
  };
  // console.log(item.arguments);
  // console.log(restData.name);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageUpdateBtn}>
              <AppEditButtonSmall
                title="Change"
                color="secondary"
                icon="image-edit"
                styleProps={styles.profileChangeBtn}
                onPress={() => console.log("Rest Profile Update")}
              />
            </View>

            <View>
              {item.image_name && (
                <Image
                  style={styles.image}
                  source={{ uri: makeUri(restData.id, item.image_name) }}
                />
              )}
            </View>
            <View style={styles.container}>
              <View style={styles.imageUpdateBtn}>
                <AppEditButtonSmall
                  title="Edit"
                  color="secondary"
                  icon="pencil"
                  styleProps={styles.profileChangeBtn}
                  onPress={() => console.log("Rest Profile Update")}
                />
              </View>
              <View style={styles.foodContainer}>
                <View style={styles.headContainer}>
                  <AppText style={styles.heading}>{item.food_title}</AppText>
                  <AppText style={styles.text}>{item.food_description}</AppText>
                </View>
                <View style={styles.priceContainer}>
                  <AppText style={styles.price}>
                    RM {item.customer_price}
                  </AppText>
                  <AppText style={styles.bPrice}>Best Price</AppText>
                </View>
              </View>
            </View>

            {/* <View style={[styles.container, { flexDirection: "column" }]}>
              <View style={styles.titleContainer}>
                <AppText style={styles.headingSmall}>Extras</AppText>
                <AppText style={styles.textPd}>Optional max 2</AppText>
              </View>

              <View style={styles.optionsContainer}>
                {extraData.map((e) => (
                  <AppCheckBoxCustom
                    key={e.id.toString()}
                    text={e.title}
                    price={e.price}
                    onPress={() => console.log("I accept")}
                  />
                ))}
              </View>
            </View> */}

            {/* <View style={[styles.container, { flexDirection: "column" }]}>
              <View style={styles.titleContainer}>
                <AppText style={styles.headingSmall}>
                  Choice of Preparation
                </AppText>
                <AppText style={styles.textPd}>Pick 1</AppText>
              </View>

              <View style={styles.optionsContainer}>
                {MixDataChoice.map((m) => (
                  <AppRadioCustom
                    key={m.id.toString()}
                    id={m.id}
                    text={m.title}
                    price={m.price}
                    onPress={onCheck}
                    status={comStatus}
                    // onCheck={onCheck}
                  />
                ))}
              </View>
            </View> */}
            <View style={styles.optionBoxContainer}>
              <View style={styles.imageUpdateBtn}>
                <AppEditButtonSmall
                  title="Extra Title"
                  color="secondary"
                  icon="plus"
                  styleProps={styles.profileChangeBtn}
                  onPress={() => console.log("Rest Profile Update")}
                />
              </View>
              {options.map((op) =>
                op.pick_type ? (
                  <View
                    key={op.id.toString()}
                    style={[styles.container, { flexDirection: "column" }]}
                  >
                    <View style={styles.titleContainer}>
                      <AppText style={styles.headingSmall}>{op.title}</AppText>
                      <AppText style={styles.textPd}>Pick 1</AppText>
                      <View style={styles.optionBtns}>
                        <AppCircleButton
                          icon="pencil"
                          size={20}
                          color={colors.orangeDark}
                          onPress={() => console.log("Change Profile Btn")}
                        />

                        <AppCircleButton
                          icon="delete"
                          size={20}
                          color={colors.primary}
                          onPress={() => console.log("Change Profile Btn")}
                        />
                      </View>

                      <View style={styles.imageUpdateBtn}>
                        <AppCircleButton
                          icon="plus-circle"
                          size={25}
                          color={colors.secondary}
                          onPress={() => console.log("Change Profile Btn")}
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
                          onPress={addItem}

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
                      <AppText style={styles.headingSmall}>{op.title} </AppText>
                      <AppText style={styles.textPd}></AppText>
                      <View style={styles.optionBtns}>
                        <AppCircleButton
                          icon="pencil"
                          size={20}
                          color={colors.orangeDark}
                          onPress={() => console.log("Change Profile Btn")}
                        />

                        <AppCircleButton
                          icon="delete"
                          size={20}
                          color={colors.primary}
                          onPress={() => console.log("Change Profile Btn")}
                        />
                      </View>
                      <View style={styles.imageUpdateBtn}>
                        <AppCircleButton
                          icon="plus-circle"
                          size={25}
                          color={colors.secondary}
                          onPress={() => console.log("Change Profile Btn")}
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
                          onPress={addItem}
                        />
                      ))}
                    </View>
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
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
  foodContainer: { flex: 1, flexDirection: "row", marginTop: 35 },
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
  imageUpdateBtn: {
    position: "absolute",
    zIndex: 2,
    flexDirection: "row",
    top: 5,
    right: 5,
  },
  optionBtns: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FoodOptionsScreen;
