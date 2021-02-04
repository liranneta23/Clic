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

const MyListingsScreen = () => {
  const [refresh, setRefresh] = useState(false)
  const { data: myListings, error, loading, request: getMyListings } = useApi(
    getMyListingsApi.getMyListings
  )

  useEffect(() => {
    getMyListings()
  }, [myListings])

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {myListings.length === 0 && (
          <AppText>
            Opps! You have no listings at the moment. Add a new listing.
          </AppText>
        )}
        {myListings.length >= 1 && (
          <FlatList
            data={myListings}
            keyExtractor={(listing) => listing.id.toString()}
            refreshing={refresh}
            onRefresh={() => getMyListings()}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                subTitle={"$" + item.price}
                // image={item.images[0].url}
                thumbnailImage={item.images[0].thumbnailUrl}
                onPress={() => console.log(item)}
              />
            )}
          />
        )}
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyListingsScreen
