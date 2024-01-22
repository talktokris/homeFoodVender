import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { AppForm, ErrorMessage, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
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

function MenuImageUplaodScreen({ route, navigation, props }) {
  const menuID = route.params.menuID;
  const [ImagePath, SetImagePath] = useState(
    settings.imageUrl + "/menu/no_image.jpg"
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
  const [errorMsg, setErrorMsg] = useState(null);
  const [eStatus, setEstatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (userInfo) => {
    //console.log("-----------Hi------------");
    // console.log(menuID);
    // console.log(userInfo.images[0].uri);
    //   const fileUri = userInfo.images[0].uri;

    setLoading(true);
    const result = await menuApi.imageUploadMenu(
      userInfo.images[0].uri,
      menuID
    );
    setLoading(false);

    // console.log(result.data);

    if (!result.ok) return;

    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.success == false) {
      setEstatus(true);
      setErrorMsg(result.data.message);
    } else if (result.data.success == true) {
      const messageSend = result.data.message;
      navigation.navigate(routes.SEARCH_DETAILS, { id: menuID });
    } else if (result.data.message) {
      setEstatus(true);
      setErrorMsg(result.data.message);
    } else {
      setEstatus(true);
      setErrorMsg("Unknown error");
    }
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
        <ErrorMessage error={errorMsg} visible={eStatus} />
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
            Images should be jpg or png and less then 5 MB in size
          </AppText>
          <View style={styles.uploadBtn}>
            <AppFormImagePicker
              name="images"
              imageStatus=""
              imagePath={ImagePath}
            />
            <SubmitButton title="Upload" />
          </View>
        </AppForm>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  note: {
    padding: 10,
    fontSize: 14.5,
    color: colors.medium,
  },
});

export default MenuImageUplaodScreen;
