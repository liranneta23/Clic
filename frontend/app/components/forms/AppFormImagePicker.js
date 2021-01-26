import React from "react"
import { useFormikContext } from "formik"

import ImageInputList from "../ImageInputList"
import ErrorMessage from "./ErrorMessage"

const AppFormImagePicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext()

  // This variable acts as an allias
  const imageUris = values[name]

  const handleAddImageToList = (imageUriToBeAdded) => {
    setFieldValue(name, [...imageUris, imageUriToBeAdded])
  }

  const handleRemoveImageFromList = (imageUriToBeRemoved) => {
    const newImageUris = imageUris.filter((uri) => imageUriToBeRemoved !== uri)
    setFieldValue(name, newImageUris)
  }

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        addImageToList={handleAddImageToList}
        removeImageFromList={handleRemoveImageFromList}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormImagePicker
