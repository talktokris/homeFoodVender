import React, { useState, useRef } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  LinkButton,
  SubmitButton,
  AppFormPicker,
  ErrorMessage,
} from "../components/forms";

import colors from "../config/colors";
import AppCheckBox from "../components/AppCheckBox";
import useAuth from "../auth/useAuth";
import menuApi from "../api/menu";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(5).max(100).label("Title"),
  description: Yup.string().required().min(4).max(200).label("Description"),
  vender_price: Yup.number().required().integer().label("Vender Price"),
  customer_price: Yup.number().required().integer().label("Customer Price"),
  discount: Yup.number().required().integer().label("Discount"),
  veg_status: Yup.object().required().nullable().label("Veg Status"),
  active_status: Yup.object().required().nullable().label("Active Status"),
});

function FoodAddScreen({ route, navigation }) {
  const { user } = useAuth();

  const [venderPrice, setVenderPrice] = useState(0);
  const [customerPrice, setCustomerPrice] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const activeData = user.options.active_status;
  const vegStatusData = user.options.veg_status;
  const marginPercentage = user.results[0].app_margin_per;
  const ref = useRef();

  const discountHandle = (v) => {
    let e = v.nativeEvent.text;
    setDiscountValue(e);
    const venderDiscount = (Number(venderPrice) / 100) * Number(e);
    let totalVenderPrice = Number(venderPrice) - venderDiscount;
    const costomerPrice =
      (Number(totalVenderPrice) / 100) * Number(marginPercentage);
    let totalPrice = costomerPrice + Number(totalVenderPrice);
    updateCustomerPrice(totalPrice);
  };

  const venderPriceHandle = (v) => {
    let e = v.nativeEvent.text;
    setVenderPrice(e);
    var totalVenderPrice = 0;
    if (discountValue >= 1) {
      const venderDiscount = (Number(e) / 100) * discountValue;
      totalVenderPrice = Number(e) - venderDiscount;
      console.log(totalVenderPrice);
    } else {
      totalVenderPrice = Number(e);
    }
    const costomerPrice = (totalVenderPrice / 100) * Number(marginPercentage);
    let totalPrice = costomerPrice + totalVenderPrice;
    updateCustomerPrice(totalPrice);
  };

  function updateCustomerPrice(totalPrice) {
    setCustomerPrice(totalPrice);
    if (!Number(totalPrice)) {
      totalPrice = 0;
    } else {
      totalPrice = totalPrice.toFixed(0);
    }
    ref.current.setFieldValue("customer_price", "" + totalPrice + "");
  }

  const handleSubmit = async ({
    title,
    description,
    customer_price,
    veg_status,
    active_status,
  }) => {
    setLoading(true);

    const result = await menuApi.createMenu(
      title,
      description,
      venderPrice,
      customer_price,
      discountValue,
      veg_status,
      active_status
    );
    // const tokenSet= result.access_token;
    // console.log(result.data);
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
        navRoute: routes.SEARCH_DETAILS,
      });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppForm
          initialValues={{
            title: "",
            description: "",
            vender_price: 0,
            customer_price: 0,
            discount: 0,
            veg_status: "",
            active_status: "",
          }}
          innerRef={ref}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={eStatus} />
          {/* <View style={styles.imageFrame}>
            <Image
              source={require("../assets/images/img.png")}
              style={styles.image}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => console.log("Click Picture Upload")}
              >
                <View style={styles.uploadBtn}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={20}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
          <View style={styles.inputContainer}>
            <AppFormField
              name="title"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="text"
              placeholder="Food Title"
              textContentType="name"
              secureTextEntry={false}
              maxLength={100}
            />
            <AppFormField
              name="description"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="text"
              placeholder="Food Description"
              textContentType="name"
              secureTextEntry={false}
              maxLength={200}
              multiline
              numberOfLines={3}
              style={{ height: 60 }}
            />
          </View>

          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormField
                name="vender_price"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Vender Price"
                textContentType="text"
                secureTextEntry={false}
                maxLength={6}
                onChange={(text) => venderPriceHandle(text)}
              />
            </View>
            <View style={styles.viewHalf}>
              <AppFormField
                name="customer_price"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Customer Price"
                textContentType="name"
                secureTextEntry={false}
                maxLength={6}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormField
                name="discount"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Discount Percentage"
                textContentType="name"
                secureTextEntry={false}
                maxLength={6}
                //  onChange={(e) => dicountSet(e)}
                onChange={(text) => discountHandle(text)}
              />
            </View>
            <View style={styles.viewHalf}>
              <AppFormPicker
                items={vegStatusData}
                name="veg_status"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Veg Status"

                /* width="80%" */
              />
            </View>
          </View>

          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormPicker
                items={activeData}
                name="active_status"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Active Status"

                /* width="80%" */
              />
            </View>
            <View style={styles.viewHalf}></View>
          </View>

          <SubmitButton title="Save" color="secondary" />
        </AppForm>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  imageFrame: {
    justifyContent: "center",
    backgroundColor: colors.secondary,
    width: 380,
    height: 209,
    borderRadius: 5,
  },
  image: {
    width: 375,
    height: 205,
    alignSelf: "center",
    margin: 0,
    marginTop: 0,
    borderRadius: 4,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: -40,
    left: 40,
  },
  uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 2,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.white,
  },

  viewStyleForLine: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginBottom: 30,
    marginTop: 30,
  },
  msg: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  inputContainer: {
    margin: 5,
    margin: 5,
  },
  otp: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewHalf: { flex: 1, width: "50%", padding: 5, marginTop: -15 },
  resend: {
    color: colors.primary,
    fontWeight: "800",
  },
  imageFrame: {
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    margin: 5,
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: -40,
    left: 40,
  },
  uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 2,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.white,
  },

  viewStyleForLine: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginBottom: 30,
    marginTop: 30,
  },
});

export default FoodAddScreen;
