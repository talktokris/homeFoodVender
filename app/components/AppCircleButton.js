import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
   
    function AppCircleButton({ color = "#000000", size = 40, icon, onPress }) {
      return (
        <TouchableOpacity
          style={([styles.button], { width: size + 5 })}
          onPress={onPress}
        >
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name={icon}
              size={size}
              color={color}
            />
          </View>
        </TouchableOpacity>
      );
    }

    const styles = StyleSheet.create({
      buttonContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
      },
      icon: {
        // color: colors.primary,
      },
    });

export default AppCircleButton;
