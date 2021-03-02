const mongoose = require("mongoose")

const listingsSchema = mongoose.Schema({
  title: { type: String, required: true },
  images: { type: Array, required: true },
  categoryId: { type: Number, required: true },
  subCategoryId: { type: Number },
  description: { type: String },
  price: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: { type: Object, required: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  location2: {
    type: String,
  },
  date: {
    type: String,
  },
  seenCounter: { type: Number },
})

const ListingsModel = mongoose.model("Listing", listingsSchema)

module.exports = ListingsModel
