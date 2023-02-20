import React from "react";

//import { useFormikContext } from "formik";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";

function AppTextSearch({
  icon,
  color = "primary",
  lebel,
  width = "97%",
  onPress,
  ...otherProps
}) {
  //const { handleSubmit } = useFormikContext();

  return (
    <>
      {lebel && <Text style={styles.lebel}>{lebel} :</Text>}
      <View style={[styles.container, { width: width }]}>
        <TextInput
          placeholderTextColor={colors.medium}
          style={styles.textInput}
          {...otherProps}
        />
        <TouchableOpacity
          style={[styles.buttonRight, { backgroundColor: colors[color] }]}
          onPress={() => console.log("Search Click ")}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              style={styles.icon}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.secondary,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    margin: 6,
    color: colors.secondary,
  },
  textInput: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.secondary,
  },
  icon: {
    marginRight: 10,
    padding: Platform.OS === "android" ? 7 : 5,
  },
  lebel: {
    fontSize: 16,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
  buttonRight: {
    position: "absolute",
    right: -1,
    paddingLeft: 20,
    width: 73,
    height: 55,
    padding: 12,
    color: "#fff",

    alignSelf: "flex-end",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default AppTextSearch;
