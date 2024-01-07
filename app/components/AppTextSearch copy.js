import React, { useState, useRef, useEffect } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showClose, setShowChose] = useState(false);

  function onChange(e) {
    let searchText = e.nativeEvent.text;
    setSearchQuery(searchText);
    if (searchText.length >= 1) {
      setShowChose(true);
    }
  }

  //const { handleSubmit } = useFormikContext();

  return (
    <>
      {lebel && <Text style={styles.lebel}>{lebel} :</Text>}
      <View style={[styles.container, { width: width }]}>
        <TextInput
          placeholderTextColor={colors.medium}
          style={styles.textInput}
          onChange={(e) => onChange(e)}
          value={searchQuery}
          {...otherProps}
        />
        <View style={styles.searchButtons}>
          <TouchableOpacity
            style={[styles.buttonClose]}
            onPress={() => {
              setShowChose(false);
              onPress("");
              setSearchQuery("");
            }}
          >
            {showClose && (
              <MaterialCommunityIcons
                name="close-circle"
                size={22}
                style={styles.icon}
                color={colors.medium}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonRight, { backgroundColor: colors[color] }]}
            onPress={() => onPress(searchQuery)}
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: "row",
    marginVertical: 8,
    margin: 6,
    color: colors.secondary,
    paddingLeft: 10,
  },
  textInput: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    color: colors.secondary,
    width: "80%",
    padding: 7,
    paddingRight: 35,
  },
  searchButtons: { position: "relative", flexDirection: "row-reverse" },
  icon: { alignSelf: "center" },
  lebel: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 5,
    paddingLeft: 5,
    color: colors.medium,
  },
  buttonRight: {
    position: "absolute",
    right: -1,
    top: 0,
    width: 73,
    height: "100%",
    // height: 43,

    height: Platform.OS === "android" ? 40 : 35,
    padding: 5,
    color: "#fff",

    alignSelf: "flex-end",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonClose: {
    position: "relative",
    flexDirection: "row-reverse",
    right: -30,
    top: 0,
    width: 25,
    // // height: 43,
    height: Platform.OS === "android" ? 40 : 35,
    // padding: 5,
    // color: "#fff",
    alignSelf: "center",
    justifyContent: "center",

    // borderBottomRightRadius: 10,
    // borderTopRightRadius: 10,
  },

});

export default AppTextSearch;
