import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import Icon from "../components/Icon"

import ListItem from "../components/ListItem"
import ListItemSeperator from "../components/ListItemSeperator"
import Screen from "../components/Screen"
import { colors } from "../config/colors"

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgoundColor: colors.primary,
    },
    targetScreen: "MyListings",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgoundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
]

const AccountScreen = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Bonaventure Chukwudi"
          subTitle="bonarhyme@gmail.com"
          image={require("../assets/bonarhyme.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgoundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.lightGray,
  },
})

export default AccountScreen
