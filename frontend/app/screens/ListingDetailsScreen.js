import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  Linking,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  Button,
} from "react-native"
import { Image } from "react-native-expo-image-cache"
import { useNavigation } from "@react-navigation/native"
import SelectPicker from "react-native-form-select-picker"

import AppText from "../components/AppText"
import Icon from "../components/Icon"
import ListItem from "../components/ListItem"
import { colors } from "../config/colors"
import AppButton from "../components/AppButton"
import routeNames from "../navigators/routeNames"
import Slider from "../components/Slider"
import Rating from "../components/Ratings"
import ListItemSeperator from "../components/ListItemSeperator"
import AppTextInput from "../components/AppTextInput"
import apiReviews from "../../api/reviews"
import ErrorMessage from "../components/forms/ErrorMessage"

const options = [
  {
    name: "1 - Poor",
    value: 1,
  },
  {
    name: "2 - Fair",
    value: 2,
  },
  {
    name: "3 - Good",
    value: 3,
  },
  {
    name: "4 - Very Good",
    value: 4,
  },
  {
    name: "5 - Excellent",
    value: 5,
  },
]

const ListingDetailsScreen = ({ route }) => {
  const [isRating, setIsRating] = useState(false)
  const [selected, setSelected] = useState()
  const [comment, setComment] = useState("")
  const [userToBeReviewedId, setUserToBeReviewedId] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { listing, count } = route.params
  const navigation = useNavigation()

  const postReviews = async () => {
    const result = await apiReviews.postReview(
      userToBeReviewedId,
      comment,
      selected
    )

    if (!result.ok) {
      setError(true)
      setSuccess(false)
      console.log(result.originalError)
      // setResponse(result.data.error)
    } else {
      setError(false)
      setSuccess(true)
    }
  }

  // Set up in google
  // useEffect(() => {
  //   fetch(
  //     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //       "37.78825" +
  //       "," +
  //       "-122.4324" +
  //       "&key=" +
  //       "AIzaSyDP1PH7MjRk4mwL8WhKUoIlpMT0mGfGDx0"
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(
  //         "ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson)
  //       )
  //     })
  // }, [])

  return (
    <ScrollView>
      <Slider images={listing.images} height={300} />

      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <View style={styles.seen}>
          <AppText style={styles.price}>${listing.price} </AppText>
          <Icon
            name="eye"
            size={30}
            backgroundColor={colors.primary}
            marginRight={5}
          />
          <AppText style={{ color: colors.primary }}>{count}</AppText>
        </View>
        <View style={styles.contactContainer}>
          <AppText style={{ fontWeight: "700" }}>
            Seller: {listing.seller.name}
          </AppText>
          <Rating
            value={listing.seller.rating}
            numReview={listing.seller.numReview}
          />
          <AppButton
            title="Rate seller"
            onPress={() => {
              setIsRating(true)
            }}
          />
          <Modal visible={isRating}>
            <Button
              title="close"
              onPress={() => {
                setUserToBeReviewedId(listing.userId)
                setIsRating(false)
              }}
            />
            <ScrollView>
              <ErrorMessage
                visible={error}
                error="An error occured. Unable to review."
              />
              <View style={styles.textInputContainer}>
                <SelectPicker
                  placeholderStyle={{
                    fontWeight: "700",
                  }}
                  onSelectedStyle={{
                    fontWeight: "700",
                  }}
                  onValueChange={(value) => {
                    setSelected(value)
                  }}
                  selected={selected}
                  placeholder="Tap here to Rate seller"
                >
                  {options.map((val) => (
                    <SelectPicker.Item
                      label={val.name}
                      value={val.value}
                      key={val.name}
                    />
                  ))}
                </SelectPicker>
                {success && (
                  <Text style={{ color: colors.secondary }}>Success!!!</Text>
                )}
                <Rating value={selected} />
                <TextInput
                  placeholder="Enter comment"
                  numberOfLines={2}
                  multiline={true}
                  maxLength={200}
                  style={styles.textInput}
                  onChangeText={(text) => setComment(text)}
                />
                <Button title="Submit" onPress={postReviews} />
              </View>

              <View>
                <FlatList
                  data={listing.seller.reviews}
                  keyExtractor={(review) => review.userId.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.reviews}>
                      <AppText>User: {item.name}</AppText>
                      <Rating value={item.rating} />
                      <Text>Comment: {item.comment}</Text>
                    </View>
                  )}
                  ItemSeparatorComponent={() => <ListItemSeperator />}
                />
              </View>
            </ScrollView>
          </Modal>
          <View style={styles.reachSeller}>
            <Icon
              size={50}
              marginRight={8}
              name="phone"
              backgroundColor={colors.primary}
              onPress={() => Linking.openURL(`tel:${listing.seller.phone}`)}
            />
            <Icon
              size={50}
              name="email"
              backgroundColor={colors.primary}
              onPress={() => Linking.openURL(`mailto:${listing.seller.email}`)}
              marginRight={8}
            />
            <Icon
              size={50}
              name="whatsapp"
              backgroundColor={colors.primary}
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=${
                    "Hello, " +
                    listing.seller.name +
                    `. I am Interested in your ${listing.title}, listed on Clic.`
                  }&phone=${listing.seller.phone}`
                )
              }
              marginRight={8}
            />
            <Icon
              marginRight={20}
              name="google-maps"
              size={50}
              backgroundColor={colors.primary}
              onPress={() =>
                Linking.openURL(
                  `geo:${listing.location.latitude},${listing.location.longitude}`
                )
              }
            />
          </View>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/bonarhyme.jpg")}
            title={listing.seller.name}
            subTitle="5 listings"
          />
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  contactContainer: {
    justifyContent: "flex-end",
    marginTop: 40,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: colors.secondary,
    fontSize: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  userContainer: {
    marginVertical: 40,
  },
  seen: {
    flexDirection: "row",
    marginVertical: 10,
  },
  reachSeller: {
    flexDirection: "row",
    marginTop: 10,
  },
  reviews: {
    padding: 10,
  },
  reviewedUser: {
    padding: 10,
  },
  textInput: {
    width: "95%",
    borderWidth: 2,
    padding: 4,
  },
  textInputContainer: {
    height: 200,
    alignItems: "center",
  },
})

export default ListingDetailsScreen
