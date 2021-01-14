import { StatusBar } from "expo-status-bar"
import React from "react"
import { Text, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import ViewImageScreen from "./app/screens/ViewImageScreen"
import WelcomeScreen from "./app/screens/WelcomeScreen"
// import AppCard from "./app/components/AppCard"
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen"

export default function App() {
  return <ListingDetailsScreen />
}
