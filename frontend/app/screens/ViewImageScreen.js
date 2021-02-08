import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "../config/colors"
import Swipeable from "react-native-gesture-handler/Swipeable"
import Icon from "../components/Icon"

const ViewImageScreen = ({ route }) => {
  const { images, user } = route.params

  const [index, setIndex] = useState(0)

  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" color="white" size={35} />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="white"
          size={35}
        />
      </View>

      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: images[index].url }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
})

export default ViewImageScreen
