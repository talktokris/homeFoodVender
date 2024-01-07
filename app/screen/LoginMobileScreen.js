import React, { useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  LinkButton,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";

import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import AppCheckBox from "../components/AppCheckBox";
import routes from "../navigation/routes";
import authApi from "../api/auth";

const phoneRegex = RegExp(/^\(?([0-9]\d{8}|\d{9}|\d{10}|\d{11})$/);

const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(phoneRegex, "Invalid Mobile No")
    .required("Phone is required"),
});

const countryObj = { id: 1, code: "+60", name: "Malaysia" };

function LoginMobileScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFailMessage, setloginFailMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ country, mobile }) => {
    setLoading(true);
    const result = await authApi.otpRequest(country, mobile);
    setLoading(false);

    if (!result.ok || result.data == null) {
      setloginFailMessage(
        "Unable to connect to server. Please check your Internet connection"
      );
      setLoginFailed(true);
    } else {
      if (result.data.success == false) {
        setloginFailMessage(result.data.message);
        setLoginFailed(true);
      } else if (result.data.success == true) {
        navigation.navigate(routes.AUTH_MOBILE_OTP, {
          country: country,
          mobile: mobile,
        });
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <AppForm
            initialValues={{ country: countryObj, mobile: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={styles.inputContainer}>
              <ErrorMessage error={loginFailMessage} visible={loginFailed} />

              <AppFormField
                name="country"
                autoCapitalize="none"
                autoCorrect={false}
                icon="earth"
                keyboardType="email-address"
                placeholder="( +60 ) Malaysia"
                textContentType="name"
                editable={false}
              />

              <AppFormField
                name="mobile"
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                placeholder="Handphone No"
                textContentType="telephoneNumber"
                secureTextEntry={false}
                maxLength={11}
                keyboardType="numeric"
              />

              <AppCheckBox
                text="I accept the"
                linkText="terms and conditions"
                onPress={() => console.log("I accept")}
              />

              <SubmitButton color="secondary" title="Login" />
              {/* <LinkButton
          title=" Login"
          color="secondary"
          onPress={() => {
            navigation.navigate(routes.AUTH_MOBILE_OTP);
          }}
        /> */}
            </View>
          </AppForm>
        </View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputContainer: { padding: 20 },
  image: {
    width: 150,
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

export default LoginMobileScreen;
