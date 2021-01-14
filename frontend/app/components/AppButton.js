import React from "react"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { colors } from "../config/colors"

const AppButton = ({ title, onPress, color = "primary" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 50,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: 10,
  },
  text: {
    fontSize: "150%",
    fontFamily: "couchin",
    color: colors.white,
    fontWeight: "bold",
  },
})

export default AppButton
