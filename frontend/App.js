import { StatusBar } from "expo-status-bar"
import React from "react"
import { Text, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import ViewImageScreen from "./app/screens/ViewImageScreen"
import WelcomeScreen from "./app/screens/WelcomeScreen"
// import AppCard from "./app/components/AppCard"
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen"
import MessagesScreen from "./app/screens/MessagesScreen"

export default function App() {
  return <MessagesScreen />
}
