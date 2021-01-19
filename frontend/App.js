import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { Switch, Text, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import ViewImageScreen from "./app/screens/ViewImageScreen"
import WelcomeScreen from "./app/screens/WelcomeScreen"
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen"
import MessagesScreen from "./app/screens/MessagesScreen"
import ListingScreen from "./app/screens/ListingScreen"
import Icon from "./app/components/Icon"
import Screen from "./app/components/Screen"
import ListItem from "./app/components/ListItem"
import AccountScreen from "./app/screens/AccountScreen"
import AppTextInput from "./app/components/AppTextInput"
import AppPicker from "./app/components/AppPicker"

const categories = [
  { label: "Funiture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Cameras", value: 3 },
]

export default function App() {
  const [category, setCategory] = useState(categories[0])

  return (
    <Screen>
      <AppPicker
        selectedItem={category}
        onSelectedItem={(item) => setCategory(item)}
        items={categories}
        icon="apps"
        placeholder="Category"
      />
      <AppTextInput icon="email" />
    </Screen>
  )
}
