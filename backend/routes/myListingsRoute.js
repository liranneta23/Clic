const express = require("express")
const router = express.Router()

const listingsDatabase = require("../database/listings")
const listingsMapper = require("../mappers/listingsMappers")
const authMiddleware = require("../middleware/auth")

// Protected api/mylistings
router.get("/", authMiddleware, (req, res) => {
  const listings = listingsDatabase.filterListings(
    (listing) => listing.userId === req.user.userId
  )

  const resources = listings.map(listingsMapper)
  res.send(resources)
})

module.exports = router
