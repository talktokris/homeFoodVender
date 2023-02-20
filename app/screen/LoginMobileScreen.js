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

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginMobileScreen({ navigation }) {
  /*
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFailMessage, setloginFailMessage] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);

    const result = await authApi.login(email, password);
    // const tokenSet= result.access_token;
    // console.log(result);
    //console.log("==================");

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
      return setLoginFailed(true);
    }
    setLoading(false);
    setLoginFailed(false);
    logIn(result.data.access_token);
    // console.log(result.data.access_token);

   
  };
   */

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
        />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit=""
          validationSchema={validationSchema}
        >
          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            icon="earth"
            keyboardType="email-address"
            placeholder="( +60 ) Malaysia"
            textContentType="emailAddress"
            editable={false}
          />

          <AppFormField
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon="cellphone"
            placeholder="Mobile No"
            textContentType="password"
            secureTextEntry={true}
            maxLength={11}
          />

          <AppCheckBox
            text="I accept the"
            linkText="terms and conditions"
            onPress={console.log("I accept")}
          />

          <LinkButton
            title=" Login"
            color="secondary"
            onPress={() => {
              navigation.navigate(routes.AUTH_MOBILE_OTP);
            }}
          />

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
