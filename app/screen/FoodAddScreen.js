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
import useCrudApi from "../hooks/useCrudApi";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(5).max(100).label("Title"),
  description: Yup.string().required().min(4).max(200).label("Description"),
  food_category: Yup.object().required().nullable().label("Food Category"),
  vender_price: Yup.number().required().integer().label("Vender Price"),
  customer_price: Yup.number().required().integer().label("Customer Price"),
  halal_status: Yup.object().required().nullable().label("Halal Status"),
  veg_status: Yup.object().required().nullable().label("Veg Status"),
  discount: Yup.number().required().integer().label("Discount"),
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
  const halalStatusData = user.options.halal_status;
  const foodCategory = user.options.food_category;

  // console.log(options);
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
      // console.log(totalVenderPrice);
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

  const handleSubmit = async (formData) => {
    setLoading(true);
    setEstatus(false);
    const result = await menuApi.createMenu(formData);

    setLoading(false);

    if (!result.ok) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.ok) {
      if (result.data.success == false) {
        setEstatus(true);
        setError(result.data.message);
      } else if (result.data.success == true) {
        // console.log(result.data);
        const { data: id, message: messageSend } = result.data;
        navigation.navigate(routes.PRO_DONE, {
          message: messageSend,
          id: id,
          navRoute: routes.SEARCH_FOOD,
        });
      }
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
            food_category: "",
            vender_price: 0,
            customer_price: 0,
            halal_status: "",
            veg_status: "",
            discount: 0,
            active_status: "",
          }}
          innerRef={ref}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={eStatus} />

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
              style={{ height: 60, paddingLeft: 10, color: colors.medium }}
            />

            <AppFormPicker
              items={foodCategory}
              name="food_category"
              /* numberOfColumns={2} */
              /* PickerItemComponent={PickerItem} */

              placeholder="Food Category"

              /* width="80%" */
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
              <AppFormPicker
                items={halalStatusData}
                name="halal_status"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Halal Status"

                /* width="80%" */
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
              <AppFormField
                name="discount"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Discount"
                textContentType="name"
                secureTextEntry={false}
                maxLength={6}
                //  onChange={(e) => dicountSet(e)}
                onChange={(text) => discountHandle(text)}
              />
            </View>
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

  inputContainer: {
    margin: 5,
    margin: 5,
  },
  otp: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewHalf: {
    flex: 1,
    width: "50%",
    padding: 5,
    marginTop: -15,
    color: colors.primary,
    fontWeight: "800",
  },
});

export default FoodAddScreen;
