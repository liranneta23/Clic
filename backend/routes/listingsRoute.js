const express = require("express")
const router = express.Router()
const Joi = require("joi")
const multer = require("multer")
const config = require("config")
const authMiddleware = require("../middleware/auth")

const {
  getAllListings,
  getSingleListing,

  addListing,
  filterListings,
} = require("../database/listings")
const listingsMapper = require("../mappers/listingsMappers")

const {
  getAllCategories,
  getSingleCategory,
} = require("../database/categories")

const validateWith = require("../middleware/validation")
const imageResize = require("../middleware/imageResize")
const authMiddlware = require("../middleware/auth")

// Handles where the binaries should be kept, so as to be used as a reference when calling to the database
const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
})

const schema = {
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    latitude: Joi.number().required(),
  }).optional(),
}

// GET /api/listings
router.get("/", (req, res) => {
  const listings = getAllListings()
  const resources = listings.map(listingsMapper)
  res.send(resources)
})

router.put("/:id", authMiddleware, (req, res) => {
  const result = getSingleListing(parseInt(req.params.id))
  if (req.user.userId !== result.userId) {
    result.seenCounter++
  }
  res.send(result)
})

// Get /api/listings/:categoryId protected
router.get("/:id", (req, res) => {
  const listings = filterListings(
    (listing) => listing.categoryId === parseInt(req.params.id)
  )
  if (!listings) {
    res.status(400).send({
      error: "Listing category not found ",
    })
  } else {
    const resources = listings.map(listingsMapper)
    res.send(resources)
  }
})

// POST /api/listings

router.post(
  "/",
  [
    upload.array("images", config.get("maxImageCount")),
    validateWith(schema),
    imageResize,
  ],
  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
    }
    listing.images = req.images.map((fileName) => ({
      fileName: fileName,
    }))
    if (req.body.location) listing.location = JSON.parse(req.body.location)
    if (req.user) listing.userId = req.user.userId

    // This adds the listing to the database
    addListing(listing)

    res.status(201).send(listing)
  }
)

module.exports = router
