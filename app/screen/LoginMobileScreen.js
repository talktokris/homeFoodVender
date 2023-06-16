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
import routes from "../navigation/routes";
import authApi from "../api/auth";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const validationSchema = Yup.object().shape({
  // mobile: Yup.string().required().min(10).label("Mobile"),
  mobile: Yup.string()
    .matches(phoneRegex, "Invalid Mobile No")
    .required("Phone is required"),
});

const countryObj = { id: 1, code: "+60", name: "Malaysia" };

function LoginMobileScreen({ navigation }) {
  //const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFailMessage, setloginFailMessage] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async ({ country, mobile }) => {
    setLoading(true);

    // console.log(country + "-" + mobile);

    const result = await authApi.otpRequest(country, mobile);
    // const tokenSet= result.access_token;
    setLoading(false);
    // console.log(result.data);

    //console.log("==================");

    if (!result.ok || result.data == null) {
      setLoading(false);
      setloginFailMessage(
        "Unable to connect to server. Please check your Internet connection"
      );
      // return
      setLoginFailed(true);
    }
    if (result.data.error == "Unauthorized") {
      setLoading(false);
      setloginFailMessage("Invalid email and/or password");
      return setLoginFailed(true);
    }
    setLoading(false);
    setLoginFailed(false);
    //  logIn(result.data.access_token);
    // console.log(result.data.access_token);
    if (result.data.data == 1) {
      navigation.navigate(routes.AUTH_MOBILE_OTP, {
        country: country,
        mobile: mobile,
      });
    }
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
            initialValues={{ country: countryObj, mobile: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
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
              placeholder="Mobile No"
              textContentType="telephoneNumber"
              secureTextEntry={false}
              maxLength={11}
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
  forgetBtn: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800",
    textDecorationLine: "underline",
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

export default LoginMobileScreen;
