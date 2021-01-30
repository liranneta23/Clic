const express = require("express")
const router = express.Router()

const { getAllListings, getSingleListing } = require("../database/listings")
const listingsMapper = require("../mappers/listingsMappers")

// GET /api/listings
router.get("/", (req, res) => {
  const listings = getAllListings()
  const resources = listings.map(listingsMapper)
  res.send(resources)
})

module.exports = router
