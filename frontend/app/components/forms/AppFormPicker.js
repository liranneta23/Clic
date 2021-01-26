import { useFormikContext } from "formik"
import React from "react"

import AppPicker from "../AppPicker"
import ErrorMessage from "./ErrorMessage"

const AppFormPicker = ({
  items,
  name,
  numberOfColumns,
  placeholder,
  PickerItemComponent,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext()
  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        placeholder={placeholder}
        PickerItemComponent={PickerItemComponent}
        setSelectedItem={(item) => {
          // This updates the global state
          setFieldValue(name, item)
        }}
        selectedItem={values[name]}
        width={width}
      >
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </AppPicker>
    </>
  )
}

export default AppFormPicker
