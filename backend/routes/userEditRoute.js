const express = require("express")
const router = express.Router()
const Joi = require("joi")
const multer = require("multer")
const config = require("config")
const authMiddleware = require("../middleware/auth")
const bcrypt = require("bcryptjs")

const validateWith = require("../middleware/validation")
const imageResize = require("../middleware/imageResize")
const users = require("../model/userModel")

const baseUrl = config.get("assetsBaseUrl")

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
})

// Put api/user/edit
router.put(
  "/",
  authMiddleware,
  [upload.array("images"), imageResize],

  async (req, res) => {
    const { name, email, location, phoneNumber } = req.body

    const user = await users.findById(req.user.userId)
    if (user) {
      user.email = email || user.email
      user.name = name || user.name
      user.phoneNumber = phoneNumber || user.phoneNumber
      user.location = location || user.location
      user.images = req.images.map((fileName) => ({
        fileName: `${baseUrl}${fileName}_full.jpg`,
      }))
      const updatedUser = await user.save()
      res.send(updatedUser)
    } else {
      res.send({ error: "An error occured. Unable to update account" })
    }
  }
)

module.exports = router
