const express = require("express")
const router = express.Router()
const Joi = require("joi")
const authMiddleware = require("../middleware/auth")

const messagesDatabase = require("../database/messages")
const userDatabase = require("../database/users")

// Protected with auth middleware
// GET api/messages
router.get("/", authMiddleware, (req, res) => {
  const messages = messagesDatabase.getMessagesForUser(req.user.userId)

  const mapUser = (userId) => {
    const user = userDatabase.getUserById(userId)
    return { id: user.id, name: user.name }
  }

  const resources = messages.map((message) => ({
    id: message.id,
    listingId: message.listingId,
    dateTime: message.dateTime,
    content: message.content,
    fromUser: mapUser(message.fromUserId),
    toUser: mapUser(message.toUserId),
  }))
  res.send(user)
})

module.exports = router
