import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import {
  Switch,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, useNavigation } from "@react-navigation/native"

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
import LoginScreen from "./app/screens/LoginScreen"
import ListingEditScreen from "./app/screens/ListingEditScreen"
import AppButton from "./app/components/AppButton"
import ImageInput from "./app/components/ImageInput"
import ImageInputList from "./app/components/ImageInputList"
import RegisterScreen from "./app/screens/RegisterScreen"
import AuthNavigator from "./app/navigators/AuthNavigator"
import navigationTheme from "./app/navigators/navigationTheme"
import AppNavigator from "./app/navigators/AppNavigator"

// Replace AppNavigator with AuthNavigator to see the login, registration and welcome screen. Try it!!!
export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  )
}
