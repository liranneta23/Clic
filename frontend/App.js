import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import {
  Switch,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import NetInfo, { useNetInfo } from "@react-native-community/netinfo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode"
// import AppLoading from "expo-app-loading"

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
import AppText from "./app/components/AppText"
import { colors } from "./app/config/colors"
import OfflineNotice from "./app/components/OfflineNotice"

import AuthContext from "./app/auth/appContext"
import authStorage from "./app/auth/storage"
import AppMessages from "./app/components/AppMessages"
import AppMyListings from "./app/components/AppMyListings"
import MyListingsScreen from "./app/screens/MyListingsScreen"
import Slider from "./app/components/Slider"
import Rating from "./app/components/Ratings"

// Replace AppNavigator with AuthNavigator to see the login, registration and welcome screen. Try it!!!
export default function App() {
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)
  const [subCategory, setSubCategory] = useState(0)

  const restoreToken = async () => {
    const token = await authStorage.getToken()
    if (!token) return
    setUser(jwtDecode(token))
  }

  // This controls the splash screen or the screen that shows before our app loads
  // Control the splash screen backgroundImage in app.json

  // expo-app-loading gives an error and I can't fix it!!!!!
  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreToken}
  //       onFinish={setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   )

  useEffect(() => {
    let isMounted = true
    restoreToken()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <AuthContext.Provider
        value={{ user, setUser, subCategory, setSubCategory }}
      >
        <OfflineNotice />
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  )
}
