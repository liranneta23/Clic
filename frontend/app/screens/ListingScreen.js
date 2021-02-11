import React, { useState, useEffect } from "react"
import {
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from "../components/Screen"
import AppCard from "../components/AppCard"
import { colors } from "../config/colors"
import routeNames from "../navigators/routeNames"
import categories from "../config/categories"

import listingsApi from "../../api/listings"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import AppActivityIndicator from "../components/AppActivityIndicator"
import ErrorMessage from "../components/forms/ErrorMessage"
import defaultStyles from "../config/styles"

const ListingScreen = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false)
  const [listings, setListings] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [keyword, setKeyword] = useState("")

  // To use multiple times, do not destructure. just use a variable.
  const getAllListings = async () => {
    setLoading(true)
    const result = await listingsApi.getListings()
    setLoading(false)
    if (result.problem) {
      setError(true)
    } else {
      setError(false)
      setListings(result.data)
    }
  }
  const handleSeenCounter = async (id) => {
    const result = await listingsApi.incrementCounter(id)
    if (result.ok) {
      setCount(result.data.seenCounter)
    }
  }

  // search listings
  const searchListings = async (keyword) => {
    setLoading(true)
    const result = await listingsApi.searchListings(keyword)
    setLoading(false)
    if (result.problem) {
      setError(true)
    } else {
      setError(false)
      setListings(result.data)
    }
  }

  useEffect(() => {
    getAllListings()
  }, [])

  const handleCategory = async (categoryId) => {
    setLoading(true)
    const result = await listingsApi.filterListings(categoryId)
    setLoading(false)
    if (result.problem) {
      setError(true)
    } else {
      setError(false)
      setListings(result.data)
    }
  }

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <ErrorMessage
        error="An error occured. Unable to filter list."
        visible={error}
      />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>An error occured. Data fetched from cache.</AppText>
            <AppButton
              title="Retry"
              color="primary"
              onPress={() => getAllListings()}
            />
          </>
        )}
        <View>
          <View style={styles.searchContainer}>
            <TextInput
              style={{
                flex: 1,
                paddingLeft: 10,
              }}
              onChangeText={(text) => setKeyword(text)}
              returnKeyType="search"
              onSubmitEditing={() => searchListings(keyword)}
            />
            <MaterialCommunityIcons
              name="search-web"
              size={35}
              onPress={() => searchListings(keyword)}
            />
          </View>
          <ScrollView
            horizontal
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}
          >
            {categories.map((item, key) => {
              return (
                // Flat List Item
                <TouchableOpacity
                  style={styles.category}
                  key={key}
                  onPress={() => handleCategory(item.value)}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={item.backgroundColor}
                    size={25}
                  />
                  <AppText style={styles.text}>{item.label}</AppText>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        {listings.length >= 1 && (
          <FlatList
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            refreshing={refresh}
            onRefresh={() => getAllListings()}
            renderItem={({ item }) => (
              <AppCard
                title={item.title}
                subTitle={"$" + item.price}
                image={item.images[0].url}
                thumbnail={item.images[0].thumbnailUrl}
                onPress={() => (
                  navigation.navigate(routeNames.LISTING_DETAILS, {
                    listing: item,
                    count: count,
                  }),
                  handleSeenCounter(item.id.toString())
                )}
              />
            )}
          />
        )}
        {listings.length === 0 && (
          <AppText style={{ color: colors.primary, marginTop: 10 }}>
            No listings available in this category.
          </AppText>
        )}
      </Screen>
    </>
  )
}
const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    height: "10%",
  },
  text: {
    color: colors.primary,
    marginLeft: 5,
  },
  category: {
    flexDirection: "row",
    padding: 10,
  },
  searchContainer: {
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: colors.black,
    borderWidth: 3,
    flexDirection: "row",
  },
})

export default ListingScreen
