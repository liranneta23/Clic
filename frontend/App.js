import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState, useRef } from "react"
import {
  Switch,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
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

import listingsApi from "./api/listings"
import * as Notifications from "expo-notifications"
import Constants from "expo-constants"
import OfflineNotice from "./app/components/OfflineNotice"

import AuthContext from "./app/auth/appContext"
import authStorage from "./app/auth/storage"

import TestToken from "./app/components/TestToken"
import TestLocalNotification from "./app/components/TestLocalNotification"

import AppMessages from "./app/components/AppMessages"
import AppMyListings from "./app/components/AppMyListings"
import MyListingsScreen from "./app/screens/MyListingsScreen"
import Slider from "./app/components/Slider"
import Rating from "./app/components/Ratings"

import { navigationRef } from "./app/navigators/RootNavigation"
import DatePicker from "./app/components/DatePicker"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})
export default function App() {
  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)
  const [subCategory, setSubCategory] = useState(0)
  const [searchKeywords, setSearchKeywords] = useState([])

  // push notification
  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      }
    )

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response)
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

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
    return () => (isMounted = false)
  }, [])

  const getListings = async () => {
    const result = await listingsApi.getListings()
    if (result.ok) {
      const finder = result.data.some((field) =>
        field.title.includes(searchKeywords[0])
      )
      console.log(finder)
      if (finder) {
        schedulePushNotification()
        console.log(searchKeywords)
      }
    }
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "CLIC: Listing that relates your search...",
        body: `Listings that relates to your [${searchKeywords[0]}] search  has been posted`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    })
  }

  useEffect(() => {
    let isMounted = true
    getListings()

    return () => {
      isMounted = false
    }
  }, [searchKeywords])

  /**
   * Trick used so as to use navigation in the AppNavigation.js
   * const navigationRef = React.createRef()
   * const navigation = navigationRef.current
   * navigation.navigate(routenames.ACCOUNT_SCREEN)
   * The logic was later implemented in RootNavigation.js
   */

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          subCategory,
          setSubCategory,
          setSearchKeywords,
          searchKeywords,
        }}
      >
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
        {/* <TestLocalNotification />
        <TestToken /> */}
      </AuthContext.Provider>
    </>
  )
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert("Must use physical device for Push Notifications")
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  return token
}
