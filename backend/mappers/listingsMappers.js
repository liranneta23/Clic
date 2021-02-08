const config = require("config")
const userDatabase = require("../database/users")

/*
This function does the following:

    1. Fetches the development asset url from "config/development.json"
    2. Creates a url object for the full image
    3. creates a thumbnailUrl for the thumnail image
*/

const listingsMapper = (listing) => {
  const baseUrl = config.get("assetsBaseUrl")

  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`,
  })

  const mapUser = (userId) => {
    const user = userDatabase.getUserById(userId)
    return {
      id: user.id,
      name: user.name,
      phone: user.phoneNumber,
      email: user.email,
    }
  }

  return {
    ...listing,
    images: listing.images.map(mapImage),
    seller: mapUser(listing.userId),
  }
}

module.exports = listingsMapper
