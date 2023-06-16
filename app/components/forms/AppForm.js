import React from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  onSubmit,
  innerRef,
  validationSchema,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      innerRef={innerRef}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
