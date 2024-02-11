import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import fonts from "../config/fonts";
import AppText from "./AppText";
import Screen from "./Screen";
import IconBtn from "./IconBtn";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  lebel,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      {lebel && <Text style={styles.lebel}>{lebel} :</Text>}
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={25}
              style={styles.icon}
              color={colors.medium}
            />
          )}
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.title}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={styles.modalContent}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.closeButton}>
              <IconBtn
                name="close-circle"
                size={32}
                iconColor={colors.statusbarTextColor}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={styles.modalHeader}>
              <AppText style={styles.headerText}>Please Select</AppText>
            </View>
            <View style={styles.modalBody}>
              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numberOfColumns}
                renderItem={({ item }) => (
                  <>
                    <PickerItemComponent
                      item={item}
                      lebel={JSON.stringify(item.title)}
                      onPress={() => {
                        setModalVisible(false);
                        onSelectItem(item);
                      }}
                    />
                  </>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    padding: Platform.OS === "android" ? 0 : 5,
  },
  text: {
    flex: 1,
    color: colors.medium,
    fontSize: 14,
    paddingTop: 2,
    paddingLeft: 10,
  },

  placeholder: {
    color: colors.medium,
    flex: 1,
    fontSize: 14,
    paddingLeft: 10,
    padding: Platform.OS === "android" ? 0 : 5,
  },
  icon: {
    marginRight: 10,
  },
  lebel: {
    fontSize: 14,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 10,
    color: colors.medium,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    padding: 15,
    position: "relative",
  },
  modalBox: {
    width: "100%",
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.statusbarColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  headerText: {
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    padding: 10,
    color: colors.statusbarTextColor,
  },
  modalBody: { padding: 10 },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1,
  },
});

export default AppPicker;
