const config = require("config")

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
  return {
    ...listing,
    images: listing.images.map(mapImage),
  }
}

module.exports = listingsMapper
