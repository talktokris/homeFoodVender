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
  pick_type: Yup.object().required().nullable().label("Veg Status"),
  status: Yup.object().required().nullable().label("Active Status"),
});

function MenuTitleEditScreen({ route, navigation }) {
  const { user } = useAuth();

  const headData = route.params.heading;
  const menuData = route.params.menu;
  const menu = menuData[0];

  // console.log(menu);

  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const activeData = user.options.active_status;
  const pickerData = user.options.pick_type;
  // console.log(pickTypeData);

  // const pickerData = [
  //   { id: 1, title: "Single Item", value: true },
  //   { id: 2, title: "Multiple Item", value: false },
  // ];

  const statusSelectedItem = activeData.find(
    (c) =>
      c.integer_value == headData.status &&
      c.options_name == "active_status_lists"
  );

  const pickTypeSelectedItem = pickerData.find(
    (c) =>
      c.integer_value == headData.pick_type &&
      c.options_name == "extra_pick_type"
  );
  // console.log(headData);

  const ref = useRef();

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
    const result = await menuApi.editHeading(formData, headData.id, menu);

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

        // navigation.goBack();

        navigation.navigate(routes.PRO_DONE, {
          message: messageSend,
          paramsObj: {
            venderId: menu.user_id,
            menuID: menu.id,
          },
          navRoute: routes.FOOD_OPTIONS,
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
            title: headData.title,
            pick_type: pickTypeSelectedItem,
            status: statusSelectedItem,
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
              placeholder="Extra Title"
              textContentType="name"
              secureTextEntry={false}
              maxLength={100}
            />
          </View>

          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormPicker
                items={pickerData}
                name="pick_type"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Pick Type"

                /* width="80%" */
              />
            </View>
            <View style={styles.viewHalf}>
              <AppFormPicker
                items={activeData}
                name="status"
                /* numberOfColumns={2} */
                /* PickerItemComponent={PickerItem} */

                placeholder="Status"

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

export default MenuTitleEditScreen;
