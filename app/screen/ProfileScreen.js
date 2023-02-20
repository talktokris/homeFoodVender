import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function ProfileScreen({ navigation }) {
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
        <View style={styles.imageFrame}>
          <Image
            source={require("../assets/images/av.png")}
            style={styles.image}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => console.log("Click Picture Upload")}
            >
              <View style={styles.uploadBtn}>
                <MaterialCommunityIcons
                  name="camera"
                  size={20}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit=""
          validationSchema={validationSchema}
        >
          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormField
                name="firstName"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder=" First Name"
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
                placeholder=" Last Name"
                textContentType="name"
                secureTextEntry={true}
                maxLength={6}
              />
            </View>
          </View>
          <View style={styles.otp}>
            <View style={styles.viewHalf}>
              <AppFormField
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                icon="earth"
                keyboardType="email-address"
                placeholder="(+60) Malaysia"
                textContentType="emailAddress"
                editable={false}
              />
            </View>
            <View style={styles.viewHalf}>
              <AppFormField
                name="password"
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                placeholder="Mobile No"
                textContentType="telephoneNumber"
                maxLength={11}
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
  imageFrame: {
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    margin: 5,
    marginTop: 20,
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
  otp: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewHalf: { flex: 1, width: "50%", padding: 5 },
  resend: {
    color: colors.primary,
    fontWeight: "800",
  },
});

export default ProfileScreen;
