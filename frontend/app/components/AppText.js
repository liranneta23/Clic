import React from "react"
import { Text, Platform, StyleSheet } from "react-native"

import defaultStyles from "../config/styles"

const AppText = ({ children, style, numberOfLines }) => {
  return (
    <Text style={[defaultStyles.text, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  )
}

export default AppText
