import React from "react"
import { Image, StyleSheet, TouchableHighlight, View } from "react-native"
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { colors } from "../config/colors"
import AppText from "./AppText"

const ListItem = ({ title, subTitle, image, onPress, renderRightActions }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
    <TouchableHighlight underlayColor={colors.lightGray} onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableHighlight>
    </Swipeable >
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
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
