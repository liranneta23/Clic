import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import ListItem from "../components/ListItem"
import ListItemSeperator from "../components/ListItemSeperator"
import Screen from "../components/Screen"

import ListItemDeleteAction from "../components/ListItemDeleteAction"
import useApi from "../components/custom-hooks/useApi"
import AppActivityIndicator from "../components/AppActivityIndicator"
import getMessagesApi from "../../api/messages"
import AppMessages from "../components/AppMessages"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"

const MessagesScreen = () => {
  const [refresh, setRefresh] = useState(false)

  const { data: messages, error, loading, request: getAllMessages } = useApi(
    getMessagesApi.getMessages
  )

  useEffect(() => {
    let isMounted = true
    getAllMessages()
    return () => {
      isMounted = false
    }
  }, [messages])

  // set to handle delete in the backend later...
  const handleDelete = (message) => {
    const newMessages = messages.filter((m) => m.dateTime !== message.dateTime)
    setMessages(newMessages)
  }

  return (
    <>
      <AppActivityIndicator visible={loading} />
      {messages.length === 0 && (
        <>
          <AppText>You have no messages at the moment. </AppText>
          <AppButton
            title="Refresh"
            color="primary"
            onPress={() => console.log(messages)}
          />
        </>
      )}
      {messages.length >= 1 && (
        <Screen>
          <FlatList
            data={messages}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <AppMessages
                fromUser={item.fromUser.name}
                message={item.content}
                onPress={() => console.log(item)}
                renderRightActions={() => (
                  // This will be turned to a delete request to the backend
                  <ListItemDeleteAction onPress={() => handleDelete(item)} />
                )}
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeperator />}
            refreshing={refresh}
            onRefresh={() => getAllMessages()}
          />
        </Screen>
      )}
    </>
  )
}

const styles = StyleSheet.create({})

export default MessagesScreen
