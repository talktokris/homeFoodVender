import React, { useState, useContext, useEffect, useCallback } from "react";
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
import AuthContext from "../auth/context";
import routes from "../navigation/routes";
import usersApi from "../api/users";
import authStorage from "../auth/storage";
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

function AddressScreen({ route, navigation }) {
  const [user, setUser] = useContext(AuthContext);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    // return user;
  };

  const items =
    user.results[0].default_address != null
      ? user.results[0].default_address
      : [];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // getData();
    });
    return unsubscribe;
  }, [navigation]);

  // const getData = useCallback(() => {
  //   setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
  //   usersApi
  //     .userRefresh()
  //     .then((data) => {
  //       // console.log(data.data);
  //       if (data.ok) {
  //         setLoading(false);
  //         setUser(data.data);
  //         if (data.data.results[0].default_address != null) {
  //           setDefaultAddress(data.data.results[0].default_address);
  //         }
  //       } else {
  //         setError(
  //           "Unable to get the database. Please check your internet connection"
  //         );
  //         setEstatus(true);
  //       }
  //     })
  //     .catch((error) => {
  //       // display error
  //       setLoading(false); // stop the loader
  //     });
  // }, []);

  const handleSubmit = async ({
    address,
    street,
    city_name,
    state,
    postal_code,
  }) => {
    setLoading(true);

    const result = await usersApi.userAddressUpdate(
      items.id,
      address,
      street,
      city_name,
      state,
      postal_code
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
      // getData();
      const { data: id, message: messageSend } = result.data;

      restoreUser();

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
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

  //  console.log(defaultAddress);

  const stateSelectedItem = stateData.find((c) => c.title == items.state);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && user && (
        <Screen>
          <View style={styles.container}>
            <AppForm
              initialValues={{
                address: items.address,
                street: items.street,
                city_name: items.city_name,
                state: stateSelectedItem,
                postal_code: items.postal_code,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={styles.inputContainer}>
                <AppFormField
                  name="address"
                  lebel="Building Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Building"
                  textContentType="name"
                  secureTextEntry={false}
                  maxLength={150}
                />

                <AppFormField
                  name="street"
                  lebel="Street Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Street"
                  textContentType="name"
                  secureTextEntry={false}
                  maxLength={150}
                />
                <AppFormPicker
                  items={stateData}
                  name="state"
                  lebel="State Name"
                  /* numberOfColumns={2} */
                  /* PickerItemComponent={PickerItem} */

                  placeholder=" State"

                  /* width="80%" */
                />
              </View>
              <View style={styles.otp}>
                <View style={styles.viewHalf}>
                  <AppFormField
                    lebel="City Name"
                    name="city_name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="City"
                    textContentType="name"
                    secureTextEntry={false}
                    maxLength={100}
                  />
                </View>
                <View style={styles.viewHalf}>
                  <AppFormField
                    lebel="Postal Code"
                    name="postal_code"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder=" Postal Code"
                    textContentType="postalCode"
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
                onSubmit={() => console.log("find location")}
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

export default AddressScreen;
