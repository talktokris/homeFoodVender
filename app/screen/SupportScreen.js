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
import AppTextInputChat from "../components/AppTextInputChat";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function SupportScreen({ navigation }) {
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
          <View style={(styles.itemContainer, [{ flexDirection: "row" }])}>
            <View style={styles.textChatLeft}>
              <AppText style={styles.heading}>Support</AppText>
              <AppText style={styles.textChat}>Hi, How may I help you?</AppText>
            </View>
          </View>
          <View
            style={(styles.itemContainer, [{ flexDirection: "row-reverse" }])}
          >
            <View style={styles.textChatRight}>
              <AppText style={styles.headingYou}>You</AppText>
              <AppText style={styles.textChatYou}>
                I have the problem with my order status
              </AppText>
            </View>
          </View>

          <View style={(styles.itemContainer, [{ flexDirection: "row" }])}>
            <View style={styles.textChatLeft}>
              <AppText style={styles.heading}>Support</AppText>
              <AppText style={styles.textChat}>
                Can you please let me your order no.
              </AppText>
            </View>
          </View>
          <View
            style={(styles.itemContainer, [{ flexDirection: "row-reverse" }])}
          >
            <View style={styles.textChatRight}>
              <AppText style={styles.headingYou}>You</AppText>
              <AppText style={styles.textChatYou}>
                My order no : 01927399
              </AppText>
            </View>
          </View>
          <View style={styles.chatTextContainer}>
            <View style={styles.chatText}>
              <AppTextInputChat
                placeholder="Aa.."
                icon="send-circle"
                multiline={true}
              />
            </View>
          </View>
        </AppForm>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
  },
  itemContainer: { width: "100%" },
  textChatLeft: {
    border: 1,
    backgroundColor: colors.light,
    borderRadius: 10,
    maxWidth: "70%",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  textChatRight: {
    border: 1,
    backgroundColor: colors.chatme,
    borderRadius: 10,
    maxWidth: "70%",
    marginTop: 10,
    alignItems: "flex-end",
    color: "white",
  },
  heading: {
    fontSize: 16,
    fontWeight: "800",
    textDecorationLine: "underline",
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headingYou: {
    fontSize: 16,
    fontWeight: "800",
    textDecorationLine: "underline",
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: "white",
  },

  textChat: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    fontSize: 16,
  },
  textChatYou: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    fontSize: 16,
    color: colors.white,
  },
  chatTextContainer: {
    position: "absolute",
    bottom: 10,
  },
  chatText: {
    height: 90,
    marginLeft: 15,
  },
});

export default SupportScreen;
