import { useFormikContext } from "formik"
import React from "react"

import AppPicker from "../AppPicker"
import ErrorMessage from "./ErrorMessage"

const AppFormPicker = ({ items, name, placeholder }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext()
  return (
    <>
      <AppPicker
        items={items}
        onSelectedItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      >
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </AppPicker>
    </>
  )
}

export default AppFormPicker
