import React, { useEffect, useState } from "react"
import { useFormikContext } from "formik"
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { colors } from "../../config/colors"

const AppFormImagePickerForUser = ({ name }) => {
  const { setFieldValue, values } = useFormikContext()
  const [imageUri, setImageUri] = useState()

  const requestPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync()

    if (!result.granted)
      alert("You need to enable permission to access your camera")
  }
  useEffect(() => {
    let isMounted = true
    requestPermission()
    return () => {
      isMounted = false
    }
  }, [])

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync()
      if (!result.cancelled) {
        setImageUri(result.uri)
      }
    } catch (error) {
      alert("An error occured. Failed to access images")
      console.log("error occured", error)
    }
  }
  const handlePress = () => {
    if (!imageUri) {
      selectImage()
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        {
          text: "Yes",
          onPress: () => {
            setImageUri(null)
            setFieldValue(name, null)
          },
        },
        { text: "No" },
      ])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons
            name="camera"
            size={80}
            color={colors.meduimBlack}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    resizeMode: "contain",
    overflow: "hidden",
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
})

export default AppFormImagePickerForUser
