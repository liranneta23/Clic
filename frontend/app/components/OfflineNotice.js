import React from "react"
import { View, StyleSheet, StatusBar } from "react-native"
import { useNetInfo } from "@react-native-community/netinfo"

import { colors } from "../config/colors"

import AppText from "./AppText"

const OfflineNotice = () => {
  const netInfo = useNetInfo()

  if (!netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    )

  return null
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 70,
    top: StatusBar.currentHeight,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: colors.white,
  },
})

export default OfflineNotice
