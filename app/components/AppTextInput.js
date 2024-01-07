import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Platform, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function AppTextInput({ icon, lebel, width = "100%", ...otherProps }) {
  const refsFocus = useRef(null);

  function getSpacingStyle() {
    if (!icon) {
      return { paddingLeft: 10 };
    }
  }
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          refsFocus.current.focus();
        }}
      >
        {lebel && <Text style={styles.lebel}>{lebel} </Text>}
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              style={styles.icon}
              color={colors.medium}
            />
          )}
          <TextInput
            placeholderTextColor={styles.placeholder}
            style={[styles.textInput, getSpacingStyle(icon)]}
            {...otherProps}
            ref={refsFocus}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    flexDirection: "row",
    padding: 5,
    marginBottom: 10,
    marginTop: 5,
  },
  textInput: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.secondary,
    width: "85%",
  },
  placeholder: { color: "#eeeeee" },
  icon: {
    marginRight: 3,
    padding: Platform.OS === "android" ? 7 : 5,
  },
  lebel: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "700",
    paddingTop: 10,
    color: colors.medium,
  },
});

export default AppTextInput;
