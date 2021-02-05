import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "../../config/colors"
import AppText from "../AppText"

const ErrorMessage = ({ error, visible, color = colors.danger }) => {
  if (!visible || !error) return null
  return <AppText style={{ color: color }}>{error}</AppText>
}

export default ErrorMessage
