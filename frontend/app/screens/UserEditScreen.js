import React, { useContext, useEffect, useState } from "react"
import { ScrollView, Text, TextInput, StyleSheet } from "react-native"
import * as Yup from "yup"

import AuthContext from "../auth/appContext"
import { AppForm, AppFormField, SubmitButton } from "../components/forms"
import tokenStorage from "../auth/storage"
import updateUserApi from "../../api/users"

import Screen from "../components/Screen"
import AppFormImagePickerForUser from "../components/forms/AppFormImagePickerForUser"
import UploadScreen from "./UploadScreen"
import { colors } from "../config/colors"

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().email().required().label("Email"),
  location: Yup.string().optional(),
  phoneNumber: Yup.string().nullable(),
  images: Yup.array().max(1, "Please a profile picture.").nullable(),
})

const UserEditScreen = () => {
  const { user, setUser } = useContext(AuthContext)
  const [image, setImage] = useState([])

  const [uploadVisible, setUploadVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (userDetails) => {
    // console.log(userDetails)
    setUploadVisible(true)
    const result = await updateUserApi.userUpdate(
      {
        ...userDetails,
      },
      (progressTime) => setProgress(progressTime)
    )

    if (!result.ok) {
      setUploadVisible(false)
      return alert(result.originalError)
    } else {
      setUser(result.data)
    }
    // if (result.ok) {
    //   resetForm()
    // }
  }

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <UploadScreen
          onAnimationFinish={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            name: user.name,
            email: user.email,
            images: user.images[0].fileName,
            location: user.location,
            phoneNumber: user.phoneNumber,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormImagePickerForUser name="images" />
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
      </Screen>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
  },
})

export default UserEditScreen
