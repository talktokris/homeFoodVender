import React, { useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function AppTextInputChat({ icon, lebel, width = "100%", ...otherProps }) {
  const refsFocus = useRef(null);
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          refsFocus.current.focus();
        }}
      >
        {lebel && <Text style={styles.lebel}>{lebel} </Text>}
        <View style={[styles.container, { width: width }]}>
          <TextInput
            placeholderTextColor={colors.secondary}
            style={styles.textInput}
            {...otherProps}
            ref={refsFocus}
          />
        </View>
      </TouchableWithoutFeedback>
      {icon && (
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => console.log("Click Send Message")}>
            <MaterialCommunityIcons
              name={icon}
              size={60}
              style={styles.icon}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    height: 70,
    zIndex: 1,
  },
  textInput: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.secondary,
    width: "100%",
  },
  icon: {
    marginRight: 3,
    padding: Platform.OS === "android" ? 7 : 5,
  },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.secondary,
  },
  btn: {
    position: "absolute",
    right: 5,
    width: 65,
    zIndex: 2,
    top: 10,
  },
});

export default AppTextInputChat;
