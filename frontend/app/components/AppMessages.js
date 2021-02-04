import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AppText from "./AppText"
import Screen from "./Screen"
import { colors } from "../config/colors"

const AppMessages = ({
  fromUser,
  message,
  fromUserAvatar,
  onPress,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        <View style={styles.container}>
          <AppText style={styles.name}>{fromUser}</AppText>
          <AppText>{message}</AppText>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={colors.meduimBlack}
        />
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 5,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default AppMessages
