import React from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { StyleSheet, TouchableOpacity, View } from "react-native"
import { colors } from "../config/colors"

const NewListingButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={30}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: colors.white,
    borderWidth: 10,
    bottom: 15,
  },
})

export default NewListingButton
