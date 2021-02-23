import React, { useContext } from "react"
import { Image, Text, View, StyleSheet } from "react-native"
import AuthContext from "../auth/appContext"
import AppText from "../components/AppText"

import Screen from "../components/Screen"

const ProfileScreen = () => {
  const { user } = useContext(AuthContext)
  return (
    <Screen>
      <Image
        source={{ uri: user.images[0].fileName }}
        style={{ width: "100%", height: 300, resizeMode: "contain" }}
      />
      <View style={styles.container}>
        <AppText>Name: {user.name}</AppText>
        <AppText>Email: {user.email}</AppText>
        <AppText>Location: {user.location}</AppText>
        {/* <AppText>Listings: {user.name} listings.</AppText> */}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
})

export default ProfileScreen
