import React, { useContext } from "react"
import { ScrollView, Text, TextInput } from "react-native"
import * as Yup from "yup"

import AuthContext from "../auth/appContext"
import { AppForm, AppFormField, SubmitButton } from "../components/forms"
import tokenStorage from "../auth/storage"

import Screen from "../components/Screen"
import AppFormImagePickerForUser from "../components/forms/AppFormImagePickerForUser"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().email().required().label("Email"),
  location: Yup.string().optional(),
  phoneNumber: Yup.string().nullable(),
  images: Yup.array().max(1, "Please a profile picture.").nullable(),
})

const UserEditScreen = () => {
  const { user, setUser } = useContext(AuthContext)

  const handleSubmit = async (userDetails) => {
    console.log(userDetails)
  }

  return (
    <ScrollView>
      <AppForm
        initialValues={{
          name: user.name,
          email: user.email,
          image: [],
          location: "",
          phoneNumber: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormImagePickerForUser name="image" />
        <AppFormField name="name" placeholder="Name" />
        <AppFormField
          name="email"
          placeholder="Email"
          keyboardType="email-address"
        />
        <AppFormField
          name="phoneNumber"
          keyboardType="number-pad"
          placeholder="Phone Number"
        />
        <AppFormField name="location" placeholder="Location" />
        <SubmitButton title="Update" />
      </AppForm>
    </ScrollView>
  )
}

export default UserEditScreen
