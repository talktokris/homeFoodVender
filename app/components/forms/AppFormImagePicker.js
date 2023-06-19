import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";
import ImageInput from "../ImageInput";
import ImageInputSingle from "../ImageInputSingle";

function AppFormImagePicker({ name, imageStatus, imagePath }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    // console.log("uri");
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputSingle
        imageUris={[...imageUris]}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        imageStatus={imageStatus}
        imagePath={imagePath}
        name={name}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFormImagePicker;
