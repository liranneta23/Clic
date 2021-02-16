const express = require("express")
const router = express.Router()
const Joi = require("joi")
const multer = require("multer")
const config = require("config")
const authMiddleware = require("../middleware/auth")

const validateWith = require("../middleware/validation")
const imageResize = require("../middleware/imageResize")
const usersDatabase = require("../database/users")

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
})

const schema = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required().min(1),
  location: Joi.string(),
}

// Put api/user/edit
router.put(
  "/",
  authMiddleware,
  [upload.array("images"), imageResize],

  async (req, res) => {
    const { name, email, location, phoneNumber } = req.body
    const user = usersDatabase.getUserById(req.user.userId)

    if (user) {
      user.email = email
      user.name = name
      user.phoneNumber = phoneNumber
      user.location = location
      user.images = req.images.map((fileName) => ({
        fileName: fileName,
      }))
      console.log(user)
      res.status(201).send(user)
    } else {
      res.send({ error: "An error occured. Unable to update account" })
    }
  }
)

module.exports = router
