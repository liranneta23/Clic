import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { colors } from "../config/colors"
import AppText from "./AppText"

const ListItem = ({ title, subTitle, image }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontWeight: "600",
    color: "#333",
  },
  subTitle: {
    color: colors.meduimBlack,
  },
})

export default ListItem
