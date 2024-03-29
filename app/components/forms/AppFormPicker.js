import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  items,
  name,
  lebel,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
  ...otherProps
}) {
  const { errors, setFieldValue, selectedItem, touched, values } =
    useFormikContext();

  // console.log(values[name]);

  return (
    <>
      <ErrorMessage error={errors[name]} visible={touched[name]} />

      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        lebel={lebel}
        //selectedItem={selectedItem}
        selectedItem={values[name]}
        bnBlue={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
    </>
  );
}

export default AppFormPicker;
