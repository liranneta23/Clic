import React, { useEffect } from "react"
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

import { colors } from "../config/colors"

const ImageInput = ({ imageUri, setImageUriInImageInput }) => {
  const requestPermission = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!result.granted)
      alert("You need to enable permission to access the library")
  }

  useEffect(() => {
    requestPermission()
  }, [])

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      })
      if (!result.cancelled) {
        setImageUriInImageInput(result.uri)
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
        { text: "Yes", onPress: () => setImageUriInImageInput(null) },
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
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
})

export default ImageInput
