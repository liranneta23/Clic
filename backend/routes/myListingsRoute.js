const express = require("express")
const router = express.Router()

const listingsDatabase = require("../model/listingsModel")
const listingsMapper = require("../mappers/listingsMappers")
const authMiddleware = require("../middleware/auth")

// Protected GET api/mylistings
router.get("/", authMiddleware, async (req, res) => {
  const listings = await listingsDatabase.find({ userId: req.user.userId })
  if (listings) {
    res.send(listings)
  } else {
    res.status(404).send({ error: "No listings found for this user." })
  }
})
// Protected DELETE api/mylistings
router.delete("/:id", authMiddleware, async (req, res) => {
  const listings = await listingsDatabase.findById(req.params.id)
  if (req.user.userId == listings.userId) {
    await listingsDatabase.findByIdAndDelete(req.params.id)
    res.send({ message: "Listing has been deleted successfully." })
  } else {
    res.status(400).send({ error: "You cannot remove this listing." })
  }
})

module.exports = router
