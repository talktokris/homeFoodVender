import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  LinkButton,
  SubmitButton,
} from "../components/forms";

import colors from "../config/colors";
import AppCheckBox from "../components/AppCheckBox";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AddressAddScreen({ navigation }) {
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
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit=""
          validationSchema={validationSchema}
        >
          <View style={styles.inputContainer}>
            <AppFormField
              name="firstName"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder=" Building Name"
              textContentType="name"
              secureTextEntry={true}
              maxLength={150}
            />

            <AppFormField
              name="firstName"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder=" Street Name"
              textContentType="name"
              secureTextEntry={true}
              maxLength={150}
            />
          </View>
          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormField
                name="firstName"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder=" City Name"
                textContentType="name"
                secureTextEntry={true}
                maxLength={6}
              />
            </View>
            <View style={styles.viewHalf}>
              <AppFormField
                name="lastName"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder=" Postal Code"
                textContentType="name"
                secureTextEntry={true}
                maxLength={6}
              />
            </View>
          </View>

          <AppCheckBox
            text="Set this as default address"
            onPress={() => console.log("I accept")}
          />
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

export default AddressAddScreen;
