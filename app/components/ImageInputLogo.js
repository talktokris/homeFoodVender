import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import ActivityIndicator from "./ActivityIndicator";

function ImageInputLogo({ name, imageUri, imageStatus, imagePath }) {
  const [loading, setLoading] = useState(false);
  const [imageUriLink, setImageUriLink] = useState(imagePath);
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  //console.log(imageUriLink);

  const handleAdd = (uri) => {
    // console.log(uri);
    setFieldValue(name, [uri]);
  };

  useEffect(() => {
    requstPermission();
  }, []);
  const granted = (requstPermission = async () => {
    const granted = ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  });

  const handlePress = () => {
    selectImage();
  };

  const selectImage = async () => {
    setLoading(true);
    // console.log("hi");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [3, 2],
        quality: 1,
      });

      // console.log(result.assets[0].uri);
      // if (!result.canceled) onChangeImage(result.uri);
      if (!result.canceled) {
        delete result.cancelled;

        // console.log(result);

        // console.log(result);
        // setImageUriLink(result.assets[0].uri);

        setImageUriLink(result?.assets[0]?.uri);
        // assets[0].uri

        // console.log(imageUriLink);

        handleAdd(result);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error reading the image" + error);
    }
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageUriLink }} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.uploadBtn}>
              {!imageUri && (
                <MaterialCommunityIcons
                  name="camera"
                  size={30}
                  color={colors.white}
                />
              )}
              {/*  {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
              )}
            */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: -20,
    left: "40%",
  },
  uploadBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    zIndex: 2,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  image: {
    width: 350,
    height: 150,
    alignSelf: "center",
    // resizeMode: "contain",
    borderRadius: 20,
    borderColor: colors.medium,
    backgroundColor: colors.lightGray,
    borderWidth: 1,
  },
});

export default ImageInputLogo;
