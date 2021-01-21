import React, { useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import ListItem from "../components/ListItem"
import ListItemSeperator from "../components/ListItemSeperator"
import Screen from "../components/Screen"

import ListItemDeleteAction from "../components/ListItemDeleteAction"

const initialMessages = [
  {
    id: 1,
    title: "What do you want to buy?",
    description:
      "I want to buy and dell a lot of things and get them to the whole wide world and it is so",
    image: require("../assets/bonarhyme.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/bonarhyme.jpg"),
  },
]

const MessagesScreen = () => {
  const [messages, setMessages] = useState(initialMessages)
  const [refresh, setRefresh] = useState(false)

  const handleDelete = (message) => {
    const newMessages = messages.filter((m) => m.id !== message.id)
    setMessages(newMessages)
  }

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log(item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={() => <ListItemSeperator />}
        refreshing={refresh}
        onRefresh={() =>
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/bonarhyme.jpg"),
            },
          ])
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})

export default MessagesScreen
