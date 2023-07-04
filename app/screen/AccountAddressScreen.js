import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Alert } from "react-native";
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
import routes from "../navigation/routes";
import userApi from "../api/user";
import ActivityIndicator from "../components/ActivityIndicator";

const stateData = [
  { id: 1, title: "Kuala Lumpur" },
  { id: 2, title: "Selangor" },
  { id: 3, title: "Putrajaya" },
  { id: 4, title: "Johor" },
  { id: 5, title: "Kedah" },
  { id: 6, title: "Kelantan" },
  { id: 7, title: "Malacca" },
  { id: 8, title: "Negeri Sembilan" },
  { id: 9, title: "Pahang" },
  { id: 10, title: "Perak" },
  { id: 11, title: "Perlis" },
  { id: 12, title: "Sabah" },
  { id: 13, title: "Sarawak" },
  { id: 14, title: "Terengganu" },
];

const validationSchema = Yup.object().shape({
  address: Yup.string().required().min(5).max(100).label("Building  Name"),
  street: Yup.string().required().min(4).max(200).label("Street"),
  city_name: Yup.string().required().min(4).max(200).label("City Name"),
  state: Yup.object().required().nullable().label("State"),
  postal_code: Yup.number()
    .required()
    .integer("Postal code invalid")
    .label("Postal Code"),
});

function AccountAddressScreen({ route, navigation }) {
  const items = route.params.item;
  //console.log(items.postal_code);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async ({
    address,
    street,
    city_name,
    state,
    postal_code,
  }) => {
    setLoading(true);

    const result = await userApi.userAddressUpdate(
      items.id,
      address,
      street,
      city_name,
      state,
      postal_code
    );
    // const tokenSet= result.access_token;
    //  console.log(result.data);
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

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => navigation.navigate(routes.ACCOUNT_ADDRESS),
        },
      ]);
      // navigation.navigate(routes.PRO_DONE, {
      //   message: messageSend,
      //   id: id,
      //   navRoute: routes.ACCOUNT_ADDRESS,
      // });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  const stateSelectedItem = stateData.find((c) => c.title == items.state);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && (
        <Screen>
          <View style={styles.container}>
            <AppForm
              initialValues={{
                address: items.address,
                street: items.street,
                city_name: items.city_name,
                state: stateSelectedItem,
                postal_code: "" + items.postal_code + "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.inputContainer}>
                <AppFormField
                  name="address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Building Name"
                  textContentType="name"
                  secureTextEntry={false}
                  maxLength={150}
                />

                <AppFormField
                  name="street"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder=" Street Name"
                  textContentType="name"
                  secureTextEntry={false}
                  maxLength={150}
                />
                <AppFormPicker
                  items={stateData}
                  name="state"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder=" State"

                  /* width="80%" */
                />
              </View>
              <View style={styles.otp}>
                <View style={styles.viewHalf}>
                  <AppFormField
                    name="city_name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder=" City Name"
                    textContentType="name"
                    secureTextEntry={false}
                    maxLength={100}
                  />
                </View>
                <View style={styles.viewHalf}>
                  <AppFormField
                    name="postal_code"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder=" Postal Code"
                    textContentType="name"
                    secureTextEntry={false}
                    maxLength={7}
                  />
                </View>
              </View>

              <SubmitButton title="Save" color="secondary" />

              <LinkButton
                title=" Find My GPS Location "
                color="primary"
                icon="google-maps"
                width="80%"
                onSubmit={() => console.log("register")}
              />

              <View style={styles.imageFrame}>
                <Image
                  source={require("../assets/images/map.jpg")}
                  style={styles.image}
                />
              </View>
            </AppForm>
          </View>
        </Screen>
      )}
    </>
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
    padding: 5,
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
});

export default AccountAddressScreen;
