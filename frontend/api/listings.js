import client from "./client"

// Get all listings
const endPoint = "/api/listings/"
const getListings = () => client.get(endPoint)
const filterListings = (id) => client.get(`/api/listings/sub/${id}`)
const incrementCounter = (id) => client.put(`/api/listings/${id}`)
const findOne = (id) => client.get(`/api/listings/${id}`)
const findAUsersListings = (id) => client.get(`/api/listings/all/${id}`)
const searchListings = (keyword) => client.get(`/api/listings/?name=${keyword}`)
const filterListingsSub = (id, sub) =>
  client.get(`/api/listings/sub/${id}/${sub}`)

const addListing = (listing, onUploadProgress) => {
  const data = new FormData()
  data.append("title", listing.title)
  data.append("price", listing.price)
  data.append("categoryId", listing.category.value)
  data.append("subCategoryId", listing.subCategory.value)
  data.append("description", listing.description)
  data.append("location2", listing.location2)
  data.append("date", listing.date)

  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  })
  if (listing.location)
    data.append("location", JSON.stringify(listing.location))
  return client.post(endPoint, data, {
    // This handles upload time setting
    onUploadProgress: (progressTime) =>
      onUploadProgress(progressTime.loaded / progressTime.total),
  })
}

export default {
  addListing,
  getListings,
  filterListings,
  incrementCounter,
  searchListings,
  filterListingsSub,
  findOne,
  findAUsersListings,
}
