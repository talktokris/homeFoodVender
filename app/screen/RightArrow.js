import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function RightArrow({ route, navigation }) {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name="chevron-right"
      size={24}
      color={colors.medium}
    />
  );
}
const styles = StyleSheet.create({
  icon: {
    flexDirection: "column",
  },
});

export default RightArrow;
