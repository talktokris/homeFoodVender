import React, { useState } from "react";
import {
  View,
  Modal,
  Button,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import IconBtn from "./IconBtn";
import AddressOptionItem from "./AddressOptionItem";
import Separater from "./Separater";

function ModalDatePicker({
  isDatePickerVisible,
  hideDatePicker,
  handleConfirm,
}) {
  // Date picker start
  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };
  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };
  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };
  // Date picker end

  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      // mode="datetime"
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      pickerStyleIOS={{ backgroundColor: colors.secondary }}
      // pickerContainerStyleIOS={{
      //   backgroundColor: colors.secondary,
      // }}
      buttonTextColorIOS={colors.secondary}
    />
  );
}

export default ModalDatePicker;

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    height: 300,
  },
});
