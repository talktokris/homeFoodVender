import React from "react";
import {
  View,
  Modal,
  Button,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import IconBtn from "./IconBtn";
// import AddressOptionItem from "./AddressOptionItem";
import Separater from "./Separater";

function ModalOptions({
  title,
  modalVisible = false,
  data,
  onSelect,
  onClose,
}) {
  return (
    <Modal
      visible={modalVisible}
      style={styles.modalContent}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <View style={styles.closeButton}>
            <IconBtn
              name="close-circle"
              size={32}
              iconColor={colors.statusbarTextColor}
              onPress={() => onClose(!modalVisible)}
            />
          </View>
          <View style={styles.modalHeader}>
            <AppText style={styles.headerText}>{title}</AppText>
          </View>
          <View style={styles.modalBody}>
            {/* <FlatList
              data={data}
              keyExtractor={(address) => address.id.toString()}
              renderItem={({ item }) => (
                <AddressOptionItem
                  data={item}
                  onPress={onSelect}
                  //   onPress={onSelect}
                />
              )}
              ItemSeparatorComponent={Separater}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalOptions;

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    height: 300,
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
  modalBody: { padding: 10, marginBottom: 10 },
  closeButton: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1,
  },
});
