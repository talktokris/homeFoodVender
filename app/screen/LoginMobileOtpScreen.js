import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";

import {
  AppForm,
  AppFormField,
  ErrorMessage,
  LinkButton,
  SubmitButton,
} from "../components/forms";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
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
    setLoading(true);
    const result = await authApi.loginMobile(country, mobile, textMobile, otp);
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
        setLoading(false);
        setLoginFailed(false);
        logIn(result.data.data.token);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
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
            <View style={styles.inputContainer}>
              <ErrorMessage error={loginFailMessage} visible={loginFailed} />
              <AppText style={styles.msg}>Please enter OTP code</AppText>

              <AppFormField
                name="textMobile"
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                placeholder="Mobile No"
                textContentType="telephoneNumber"
                secureTextEntry={false}
                maxLength={15}
                editable={false}
                style={styles.noBg}
              />
              <View style={styles.otp}>
                <View style={styles.otpBox}>
                  <AppFormField
                    name="otp"
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="keyboard-close"
                    placeholder="______                     "
                    textContentType="oneTimeCode"
                    secureTextEntry={false}
                    maxLength={6}
                    keyboardType="numeric"
                    style={styles.otpCode}
                  />
                </View>
                <View style={styles.otpButtonBox}>
                  <TouchableOpacity onPress={() => console.log("Send OTP")}>
                    <View style={styles.otpButton}>
                      <AppText style={styles.resend}>Resend OTP</AppText>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <SubmitButton title="Confirm" color="secondary" />
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
    paddingBottom: 20,
  },
  otpBox: {
    width: "50%",
  },
  otpButtonBox: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  otpButton: {
    borderWidth: 1,
    borderColor: colors.light,
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
  },
  resend: {
    color: colors.secondary,
    fontWeight: "600",
    fontSize: 16,
  },
  otpCode: { letterSpacing: 10 },
  noBg: {},
});

export default LoginMobileOtpScreen;
