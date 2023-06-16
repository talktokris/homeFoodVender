import React, { useState } from "react";
import {
  CheckBox,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  LinkButton,
  SubmitButton,
} from "../components/forms";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import AppCheckBox from "../components/AppCheckBox";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  //mobile: Yup.string().required().email().label("Email"),
  otp: Yup.string()
    .required("Enter OTP")
    .min(6, "OTP Invalid")
    .max(6, "OTP Invalid")
    .typeError("OTP Invalid"),
});

function LoginMobileOtpScreen({ route, navigation }) {
  const country = route.params.country;
  const mobile = route.params.mobile;

  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFailMessage, setloginFailMessage] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async ({ textMobile, otp }) => {
    // setLoading(true);
    // console.log(country.name + "-" + mobile + "-" + otp);
    const result = await authApi.loginMobile(country, mobile, textMobile, otp);
    // const tokenSet= result.access_token;
    // setLoading(false);
    // console.log(result.data.data.token);
    //console.log("==================");
    setLoading(false);

    if (!result.ok || result.data == null) {
      setLoading(false);
      setloginFailMessage(
        "Unable to connect to server. Please check your Internet connection"
      );
      return setLoginFailed(true);
    }
    if (result.data.error == "Unauthorized") {
      setLoading(false);
      setloginFailMessage("Invalid email and/or password");
      setLoginFailed(true);
    }
    setLoading(false);
    setLoginFailed(false);
    logIn(result.data.data.token);
    // console.log(result.data.data.token);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      {/* {<ActivityIndicator visible={registerApi.loading || loginApi.loading} />} */}
      <Screen>
        <View style={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />
          <AppForm
            initialValues={{ textMobile: country.code + mobile, otp: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppText style={styles.msg}>
              Please enter OTP password send to your number
            </AppText>

            <AppFormField
              name="textMobile"
              autoCapitalize="none"
              autoCorrect={false}
              icon="cellphone"
              placeholder="Mobile No"
              textContentType="telephoneNumber"
              secureTextEntry={false}
              maxLength={11}
              editable={false}
            />
            <View style={styles.otp}>
              <AppFormField
                name="otp"
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                placeholder=" _  _  _  _  _  _"
                textContentType="oneTimeCode"
                secureTextEntry={false}
                maxLength={6}
                width="70%"
              />
              <TouchableOpacity onPress={() => console.log("Send OTP")}>
                <AppText style={styles.resend}>Resend OTP</AppText>
              </TouchableOpacity>
            </View>
            <SubmitButton title="Confirm" color="secondary" />

            <View style={styles.viewStyleForLine}></View>
            <View>
              <LinkButton
                title=" Login by email"
                color="secondary"
                icon="lock"
                onPress={() => {
                  navigation.navigate(routes.AUTH_EMAIL_LOGIN);
                }}
              />
              <LinkButton
                title=" Register by email"
                color="primary"
                icon="login"
                onPress={() => {
                  navigation.navigate(routes.AUTH_REGISTER);
                }}
              />
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
  image: {
    width: 180,
    height: 120,
    alignSelf: "center",
    margin: 30,
    marginTop: 40,
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
  otp: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  resend: {
    color: colors.primary,
    fontWeight: "800",
  },
});

export default LoginMobileOtpScreen;
