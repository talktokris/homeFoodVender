import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppTextInput from "../AppTextInput";

function AppFormField({ name, lebel, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <View>
        <ErrorMessage error={errors[name]} visible={touched[name]} />
        <AppTextInput
          //autoCapitalize="none"
          // autoCorrect={false}
          // icon="email"
          // keyboardType="email-address"
          bnBlue={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          lebel={lebel}
          {...otherProps}
          //  placeholder="Email"
          // textContentType="emailAddress"
        />
      </View>
    </>
  );
}

export default AppFormField;
