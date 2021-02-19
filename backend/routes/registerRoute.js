const express = require("express")
const router = express.Router()
const Joi = require("joi")
const users = require("../model/userModel")
const validateWith = require("../middleware/validation")
const UserModel = require("../model/userModel")

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
}

router.post("/", validateWith(schema), async (req, res) => {
  const { name, email, password } = req.body

  const userAlreadyExists = await users.findOne({ email })
  if (userAlreadyExists) {
    res.status(400).send({
      error: "Email address already in use. Please Try a unique Email.",
    })
  } else {
    const formUser = { name, email, password }
    const User = new UserModel(formUser)
    User.save()
      .then((user) => {
        console.log(user)
        res.status(201).send(user)
      })
      .catch((error) => console.log(error))
  }
})

module.exports = router
