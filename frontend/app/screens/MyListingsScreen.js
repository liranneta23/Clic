import React from "react"

import { StyleSheet, View, Text } from "react-native"
import Screen from "../components/Screen"

const MyListingsScreen = () => {
  return (
    <Screen style={styles.container}>
      <View>
        <Text>Nothing is here at the moment!!</Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyListingsScreen
