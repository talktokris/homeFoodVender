import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { AppForm, ErrorMessage, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppFormLogoImagePicker from "../components/forms/AppFormLogoImagePicker";
import UploadScreen from "./UploadScreen";
import settings from "../config/setting";
import colors from "../config/colors";
import menuApi from "../api/menu";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
const validationSchema = Yup.object().shape({
  images: Yup.array().min(
    1,
    "Please select image ( Images should be jpg or png and less then 5 MB in size)"
  ),
});

function ImageUplaodScreen({ route, navigation, props }) {
  const fethcID = route.params.fethcID;
  const fullImagePath = route.params.imagePath;
  const imageName = route.params.imageName;
  // console.log(fullImagePath);

  const [ImagePath, SetImagePath] = useState(
    settings.imageUrl + "/venders/no_image_logo.jpg"
  );
  const [ImageStatus, SetImageStatus] = useState();

  //console.log(users.image);
  //var imageOldName = users.image;
  /*

  if (menuID != null) {
    var imagePath = settings.imageUrl + "members/av.png";
  } else {
    var imagePath =
      settings.imageUrl + "members/" + users.id + "/" + users.image;
  }
  */
  //console.log(imagePath);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    setLoading(true);
    setEstatus(false);
    const imageUri = userInfo.images[0]?.assets[0]?.uri;
    const result = await menuApi.imageUploadProfile(imageUri, fethcID);
    // const result = await menuApi.editAddOn(formData, menu, heading, extraData);

    setLoading(false);

    if (!result.ok) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.ok) {
      if (result.data.success == false) {
        setEstatus(true);
        setError(result.data.message);
      } else if (result.data.success == true) {
        // console.log(result.data);
        const { data: id, message: messageSend } = result.data;

        navigation.goBack();
      }
    } else {
      setEstatus(true);
      setError("Unknown error");
    }

    // const handleSubmit = async (userInfo) => {
    //   //console.log("-----------Hi------------");
    //   // console.log(menuID);
    //   // console.log(userInfo.images[0].uri);
    //   //   const fileUri = userInfo.images[0].uri;

    //   setLoading(true);
    //   const result = await menuApi.imageUploadMenu(
    //     userInfo.images[0].uri,
    //     menuID
    //   );
    //   setLoading(false);

    //   // console.log(result.data);

    //   if (!result.ok) return;

    //   if (!result.data) {
    //     setEstatus(true);
    //     setError(
    //       "Unable to connect to server. Please check your Internet connection"
    //     );
    //   } else if (result.data.success == false) {
    //     setEstatus(true);
    //     setErrorMsg(result.data.message);
    //   } else if (result.data.success == true) {
    //     const messageSend = result.data.message;
    //     navigation.navigate(routes.SEARCH_DETAILS, { id: menuID });
    //   } else if (result.data.message) {
    //     setEstatus(true);
    //     setErrorMsg(result.data.message);
    //   } else {
    //     setEstatus(true);
    //     setErrorMsg("Unknown error");
    //   }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ActivityIndicator visible={isLoading} />
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <ErrorMessage error={error} visible={eStatus} />

        {/*
        {users.image == null ? (
          <Image
            style={styles.image}
            source={require("../assets/images/av.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: imagePath }} />
        )}
        */}
        <AppForm
          initialValues={{
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppText style={styles.note}>
            Images should be jpg or png and less then 5 MB in size with ratio of
            (W:350 X H:150)
          </AppText>
          <View style={styles.uploadBtn}>
            <AppFormLogoImagePicker
              name="images"
              imageStatus=""
              imagePath={ImagePath}
            />
            <SubmitButton title="Upload" color="secondary" />
          </View>
        </AppForm>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
    borderColor: colors.light,
    backgroundColor: "#f7f7f7",
    shadowColor: "#c4c2c2",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingBottom: 5,
  },
  note: {
    padding: 10,
    fontSize: 12,
    color: colors.medium,
    textAlign: "center",
  },
  uploadBtn: { marginHorizontal: 50, marginBottom: 20 },
});

export default ImageUplaodScreen;
