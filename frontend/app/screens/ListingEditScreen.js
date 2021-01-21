import React from "react"
import { StyleSheet } from "react-native"
import * as Yup from "yup"

import Screen from "../components/Screen"
import { AppForm, AppFormField, SubmitButton } from "../components/forms"
import AppFormPicker from "../components/forms/AppFormPicker"
import { colors } from "../config/colors"
import CategoryPickerItem from "../components/CategoryPickerItem"

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
})

const categories = [
  {
    label: "Funiture",
    value: 1,
    backgroundColor: "orange",
    icon: "floor-lamp",
  },
  { label: "Cars", value: 2, backgroundColor: "#ed5499", icon: "car" },
  { label: "Camera", value: 3, backgroundColor: "#333679", icon: "camera" },
  {
    label: "Games",
    value: 4,
    backgroundColor: "green",
    icon: "gamepad-variant",
  },
  {
    label: "Clothings",
    value: 5,
    backgroundColor: "indigo",
    icon: "shoe-heel",
  },
  { label: "Sports", value: 6, backgroundColor: "blue", icon: "football" },
  {
    label: "Movies & Music",
    value: 7,
    backgroundColor: "maroon",
    icon: "music",
  },
  {
    label: "Books",
    value: 8,
    backgroundColor: "purple",
    icon: "book-open-page-variant",
  },
  {
    label: "others",
    value: 9,
    backgroundColor: "gray",
    icon: "file-presentation-box",
  },
]
const ListingEditScreen = () => {
  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
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
