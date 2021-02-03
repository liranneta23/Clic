const express = require("express")
const router = express.Router()
const Joi = require("joi")
const users = require("../database/users")
const validateWith = require("../middleware/validation")

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
}

router.post("/", validateWith(schema), (req, res) => {
  const { name, email, password } = req.body

  const userAlreadyExists = users.getUserByEmail(email)

  if (userAlreadyExists) {
    res.status(400).send({
      error: "Email address already in use. Please Try a unique Email.",
    })
  } else {
    const user = { name, email, password }
    users.addUser(user)
    res.status(201).send(user)
  }
})

module.exports = router
