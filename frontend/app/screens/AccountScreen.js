import React, { useContext } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import AuthContext from "../auth/appContext"
import authStorage from "../auth/storage"
import Icon from "../components/Icon"
import cache from "../../utility/cache"

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
  // {
  //   title: "My Messages",
  //   icon: {
  //     name: "email",
  //     backgoundColor: colors.secondary,
  //   },
  //   targetScreen: "Messages",
  // },
]

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext)

  const handleLogout = () => {
    setUser(null)
    authStorage.removeToken()
    cache.removeAllAsyncStorage()
  }
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
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
        onPress={handleLogout}
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
