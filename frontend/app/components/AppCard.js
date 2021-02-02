import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Image } from "react-native-expo-image-cache"

import { colors } from "../config/colors"
import AppText from "./AppText"

// The image component is from react-native-expo-image-cache, used to hold the image in the cache
// Cloudinary can be used to save images....

const AppCard = ({ title, subTitle, image, onPress, thumbnail }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          preview={{ uri: thumbnail }}
          uri={image}
          tint="light"
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title} </AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
})

export default AppCard
