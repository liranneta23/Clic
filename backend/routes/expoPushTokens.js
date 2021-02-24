const express = require("express")
const router = express.Router()
const Joi = require("joi")

const usersDatabase = require("../model/userModel")
const authMiddleware = require("../middleware/auth")
const validateWith = require("../middleware/validation")

// expo push api/user/notifications
router.put(
  "/",
  [authMiddleware, validateWith({ token: Joi.string().required() })],
  async (req, res) => {
    const user = await usersDatabase.findById(req.user.userId)
    if (!user) return res.status(400).send({ error: "Invalid user." })

    user.expoPushToken = req.body.token
    const userWithToken = await user.save()
    console.log("User registered for notifications: ", userWithToken)
    res.status(201).send(userWithToken)
  }
)

module.exports = router
