import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import AppText from "./AppText"
import Icon from "./Icon"

const CategoryPickerItem = ({ onPress, item }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={item.icon} backgroundColor={item.backgroundColor} size={80} />
      <AppText style={styles.label}>{item.label}</AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: "33.3%",
  },
  label: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
  },
})

export default CategoryPickerItem
