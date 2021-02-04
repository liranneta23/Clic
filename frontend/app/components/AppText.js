import React from "react"
import { Text } from "react-native"

import defaultStyles from "../config/styles"

const AppText = ({ children, style, numberOfLines, onPress }) => {
  return (
    <Text
      style={[defaultStyles.text, style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  )
}

export default AppText
