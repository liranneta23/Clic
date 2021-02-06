import React from "react"
import { useFormikContext } from "formik"

import AppTextInput from "../AppTextInput"
import ErrorMessage from "./ErrorMessage"

const AppFormField = ({ name, width, flexDirection, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext()
  return (
    <>
      <AppTextInput
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        width={width}
        flexDirection={flexDirection}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormField
