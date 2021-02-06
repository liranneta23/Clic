import React from "react"
import { Platform, StyleSheet, TextInput, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import defaultStyles from "../config/styles"

const AppTextInput = ({
  icon,
  width = "100%",
  flexDirection = "row",
  ...otherProps
}) => {
  return (
    <View
      style={[styles.container, { width: width, flexDirection: flexDirection }]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.meduimBlack}
          style={styles.icon}
        />
      )}
      <TextInput style={defaultStyles.text} {...otherProps} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.lightGray,
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf: "center",
  },
  text: {
    backgroundColor: "red",
  },
})

export default AppTextInput
