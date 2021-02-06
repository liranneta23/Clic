import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import * as Yup from "yup"

import Screen from "../components/Screen"
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormImagePicker,
} from "../components/forms"
import AppFormPicker from "../components/forms/AppFormPicker"
import { colors } from "../config/colors"
import CategoryPickerItem from "../components/CategoryPickerItem"
import useLocation from "../components/custom-hooks/useLocation"
import listingsApi from "../../api/listings"
import UploadScreen from "./UploadScreen"
import categories from "../config/categories"

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select atleast one image"),
})

const ListingEditScreen = () => {
  const location = useLocation()
  const [uploadVisible, setUploadVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  // listing is the value from formik, the second argument is from formik too. use to reset the data.
  const handleSubmit = async (listing, { resetForm }) => {
    setUploadVisible(true)
    const result = await listingsApi.addListing(
      {
        ...listing,
        location,
      },
      (progressTime) => setProgress(progressTime)
    )

    if (!result.ok) {
      setUploadVisible(false)
      return alert("Unable to save the listing. Please try again.")
    }

    resetForm()
  }

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onAnimationFinish={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          width="50%"
          name="price"
          placeholder="Price"
        />
        <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
  },
})

export default ListingEditScreen
