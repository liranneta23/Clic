const express = require("express")
const router = express.Router()
const Joi = require("joi")

const authMiddleware = require("../middleware/auth")
const validateWith = require("../middleware/validation")
const usersDatabase = require("../database/users")

const schema = {
  userToBeReviewedId: Joi.number().required(),
  comment: Joi.string().required(),
  rating: Joi.number().required(),
}

// // POST /api/reviews protected
router.post("/", authMiddleware, validateWith(schema), async (req, res) => {
  const { userToBeReviewedId, comment, rating } = req.body
  console.log(userToBeReviewedId, comment, rating)

  const userToBeReviewed = await usersDatabase.getUserById(userToBeReviewedId)
  if (
    userToBeReviewed.reviews.find((user) => user.userId === req.user.userId)
  ) {
    res.status(400).send({
      error: "You have already reviewed this seller.",
    })
  } else {
    userToBeReviewed.reviews.push({
      userId: req.user.userId,
      name: req.user.name,
      rating,
      comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    userToBeReviewed.numReview = userToBeReviewed.reviews.length

    userToBeReviewed.rating = (
      userToBeReviewed.reviews.reduce((acc, user) => user.rating + acc, 0) /
      userToBeReviewed.reviews.length
    ).toFixed(1)

    res.status(201).send(userToBeReviewed)
  }
})

module.exports = router
