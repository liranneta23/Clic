import React, { useEffect, useState } from "react"

import { StyleSheet, View, Text, FlatList } from "react-native"
import useApi from "../components/custom-hooks/useApi"
import Screen from "../components/Screen"
import getMyListingsApi from "../../api/myListings"
import AppActivityIndicator from "../components/AppActivityIndicator"
import { ErrorMessage } from "../components/forms"
import ListItem from "../components/ListItem"
import ListItemDeleteAction from "../components/ListItemDeleteAction"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import Swipeable from "react-native-gesture-handler/Swipeable"

const MyListingsScreen = () => {
  const [refresh, setRefresh] = useState(false)
  const { data: myListings, error, loading, request: getMyListings } = useApi(
    getMyListingsApi.getMyListings
  )
  const [message, setMessage] = useState(null)

  const deleteMyListing = async (id) => {
    const result = await getMyListingsApi.deleteMyListing(id)
    if (result.ok) {
      setMessage(result.data.message)
    } else {
      setError(result.data.error)
    }
  }

  useEffect(() => {
    let isMounted = true
    getMyListings()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {myListings.length === 0 && (
          <>
            <AppText>
              Opps! You have no listings at the moment. Add a new listing.
            </AppText>
            <AppButton title="Refresh" onPress={() => getMyListings()} />
          </>
        )}
        {myListings.length >= 1 && (
          <>
            {message && <AppText>{message}</AppText>}
            <FlatList
              data={myListings}
              keyExtractor={(listing) => listing._id}
              refreshing={refresh}
              onRefresh={() => getMyListings()}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  subTitle={"$" + item.price}
                  // image={item.images[0].url}
                  thumbnailImage={item.images[0].thumbnailUrl}
                  onPress={() => console.log(item)}
                  renderRightActions={() => (
                    <ListItemDeleteAction
                      onPress={() => deleteMyListing(item._id)}
                    />
                  )}
                />
              )}
            />
          </>
        )}
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyListingsScreen
