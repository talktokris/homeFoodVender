import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../navigation/routes";

function ImageInput({ imageUri, onAddImage, onRemoveImage }) {
  const foodId = 10;
  useEffect(() => {
    requstPermission();
  }, []);
  const granted = (requstPermission = async () => {
    const granted = ImagePicker.requestCameraPermissionsAsync();
    if (!granted)
      alert("You need to enable permission to access the library s");
  });

  const handlePress = () => {
    Alert.alert("Delete", "Are you sure you want to delete this Image?", [
      {
        text: "Yes",
        onPress: () => onRemoveImage(),
      },
      { text: "No" },
    ]);
  };
  /*
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error reading the image" + error);
    }
  };
  */

  return (
    <>
      {imageUri && (
        <>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="close-thick"
                size={20}
                color={colors.white}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        </>
      )}

      {!imageUri && (
        <TouchableWithoutFeedback
          //   onPress={selectImage}
          onPress={onAddImage}
        >
          <View style={[styles.container, { marginLeft: 30 }]}>
            <MaterialCommunityIcons
              name="camera"
              size={40}
              color={colors.white}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
    margin: 0,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.black,
    top: 5,
    left: 115,
    borderRadius: 15,
    padding: 5,
    zIndex: 2,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
