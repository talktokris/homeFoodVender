import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";

import colors from "../config/colors";
import routes from "../navigation/routes";
import usersApi from "../api/users";
import AuthContext from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(2).label("Password"),
  confirm_password: Yup.string().required().min(2).label("Confirm Password"),
});

function AccountPasswordScreen({ navigation }) {
  const [user, setUser] = useContext(AuthContext);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);

  const userData = user.results[0];

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    usersApi
      .userRefresh()
      .then((data) => {
        // console.log(data.data);
        if (data.ok) {
          setLoading(false);
          setUser(data.data);
          if (data.data.results[0].default_address != null) {
            setDefaultAddress(data.data.results[0].default_address.id);
          }
          // getData();
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

  const handleSubmit = async ({ password, confirm_password }) => {
    // console.log(first_name + "-" + last_name + "+" + email);
    setLoading(true);

    const result = await usersApi.userPasswordChange(
      password,
      confirm_password
    );

    setLoading(false);
    console.log(result.data);
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
      getData();
      const { data: id, message: messageSend } = result.data;

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => navigation.navigate(routes.ACCOUNT_MENU),
        },
      ]);
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && user && (
        <Screen>
          <View style={styles.container}>
            <AppForm
              initialValues={{
                email: userData.email,
                password: "",
                confirm_password: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppFormField
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                placeholder="Email Address"
                textContentType="emailAddress"
              />

              <AppFormField
                name="password"
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Password"
                textContentType="password"
                secureTextEntry={true}
              />
              <AppFormField
                name="confirm_password"
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Confirm Password"
                textContentType="password"
                secureTextEntry={true}
              />

              <SubmitButton title="Change Password" color="secondary" />
            </AppForm>
          </View>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 180,
    height: 100,
    alignSelf: "center",
    margin: 30,
    marginTop: 40,
  },
  forgetBtn: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});

export default AccountPasswordScreen;
