const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String },
    rating: { type: Number },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    images: {
      type: Array,
    },
    reviews: [reviewSchema],
    location: {
      type: String,
    },
    listings: {
      type: Number,
    },
    expoPushToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

//THis is used to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//This is used to test
userSchema.pre("save", async function (next) {
  //This first one checks to see that it doesnt rehash a password on login or register
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel
