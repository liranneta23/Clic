const express = require("express")
const router = express.Router()
const Joi = require("joi")
const multer = require("multer")
const config = require("config")
const authMiddleware = require("../middleware/auth")
const pushNotifications = require("../utilities/pushNotifications")

const User = require("../model/userModel")
const Listings = require("../model/listingsModel")
const listingsMapper = require("../mappers/listingsMappers")

const {
  getAllCategories,
  getSingleCategory,
} = require("../database/categories")

const validateWith = require("../middleware/validation")
const imageResize = require("../middleware/imageResize")
const authMiddlware = require("../middleware/auth")
const baseUrl = config.get("assetsBaseUrl")

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
  subCategoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    latitude: Joi.number().required(),
  }).optional(),
}

// GET /api/listings
// Also query strings for search
router.get("/", async (req, res) => {
  // const word = req.query.name.toString()
  // const keyword = new RegExp(word, "i")

  // const listings = filterListings((listing) => listing.title.match(keyword))
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const listings = await Listings.find({ ...keyword })
  if (listings) {
    res.send(listings)
  } else {
    res.status(404).send({ error: "Listings not found." })
  }
})

// Add seen counter
router.put("/:id", authMiddleware, async (req, res) => {
  // const result = getSingleListing(parseInt(req.params.id))
  const result = await Listings.findById(req.params.id)

  if (req.user.userId !== result.userId) {
    result.seenCounter = result.seenCounter + 1
    res.send(result)
  } else {
    console.log("Error counting...")
    res.send({ error: "Unable to increment the seen counter." })
  }
})
// find one  GET /api/listings/:id
router.get("/:id", authMiddleware, async (req, res) => {
  // const result = getSingleListing(parseInt(req.params.id))
  const result = await Listings.findById(req.params.id)

  if (result) {
    res.send(result)
  } else {
    console.log("Unable to get listing")
    res.send({ error: "Failed to get the listing." })
  }
})

// Get categories /api/listings/:categoryId protected
router.get("/:id", async (req, res) => {
  const listings = await Listings.find({ categoryId: parseInt(req.params.id) })

  if (listings.length <= 0) {
    res.send({
      error: "No items found in this category",
    })
  } else {
    res.send(listings)
  }
})

// Get sub categories /api/listings/sub/:id/:subcategoryId protected
router.get("/sub/:id/:sub", authMiddleware, async (req, res) => {
  let listingConfirm = await Listings.find({
    categoryId: parseInt(req.params.id),
    categoryId: parseInt(req.params.sub),
  })
  if (listingConfirm.length <= 0) {
    res.status(404).send({
      error: "No items found in this subcategory.",
    })
  } else {
    res.send(listingConfirm)
  }
})

// POST /api/listings

router.post(
  "/",
  authMiddleware,
  [
    upload.array("images", config.get("maxImageCount")),
    validateWith(schema),
    imageResize,
  ],
  // anchor podcast
  async (req, res) => {
    const user = await User.findById(req.user.userId)

    //find users with push token
    const usersWithPush = await User.find({}, { _id: 0, expoPushToken: 1 })

    const sellerOrPoster = {
      userId: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      images: user.images[0].fileName || "",
      location: user.location || "",
      listings: user.listings + 1,
    }
    const listingForm = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      subCategoryId: parseInt(req.body.categoryId),
      description: req.body.description,
      location2: req.body.location2,
      date: req.body.date,
      seenCounter: 0,
      seller: sellerOrPoster,
    }
    listingForm.images = req.images.map((fileName) => ({
      url: `${baseUrl}${fileName}_full.jpg`,
      thumbnailUrl: `${baseUrl}${fileName}_thumb.jpg`,
    }))
    if (req.body.location) listingForm.location = JSON.parse(req.body.location)
    if (req.user) listingForm.userId = req.user.userId

    if (user) {
      // This adds the listing to the database
      const listing = await Listings.create(listingForm)

      if (listing) {
        res.status(201).send(listing)
        pushNotifications({
          targetExpoPushToken: usersWithPush,
          title: `${listing.seller.name} posted ${listing.title}.`,
          body: `${listing.description && listing.description} in ${
            listing.seller.location && listing.seller.location
          }`,
          data: `${listing._id}`,
        })
      } else {
        console.log("error occured")
        res
          .status(400)
          .send({ error: "Unable to create listing. Please try again" })
      }
    } else {
      res
        .status(400)
        .send({ error: "Unable to create listing. Please try again" })
    }
  }
)

module.exports = router
