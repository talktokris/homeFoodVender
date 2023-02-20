import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import AppTextSearch from "../AppTextSearch";



function AppFormSearch({ name, lebel, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <AppTextSearch
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

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormSearch;
