import React from "react"
import { TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Icon = ({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  onPress,
  marginRight,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          marginRight: marginRight,
        }}
      >
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        />
      </View>
    </TouchableOpacity>
  )
}

export default Icon
