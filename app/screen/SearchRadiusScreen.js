import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function SearchRadiusScreen({ navigation }) {
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
          source={require("../assets/images/target.png")}
          style={styles.image}
        />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit=""
          validationSchema={validationSchema}
        >
          <AppText style={styles.textRadius}>10 KM Radius</AppText>
          <View style={styles.slider}>
            <View style={styles.slideBtn}></View>
          </View>

          <SubmitButton title="Save" color="secondary" />
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
    width: 100,
    height: 100,
    alignSelf: "center",
    margin: 30,
    marginTop: 40,
  },
  slider: {
    height: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 40,
  },
  slideBtn: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    top: -10,
    left: 50,
  },
  textRadius: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "800",
  },
});

export default SearchRadiusScreen;
