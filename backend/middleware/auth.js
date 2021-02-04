const Jwt = require("jsonwebtoken")

/*
This middleware authenticates the user
---> It does so by receiving the user's token from the frontend
---> And verify's it with jwt
---> Then sets the req.user to the user's value from the verified token
*/

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token")

  if (!token) {
    return res.status(401).send({
      error: "Access denied. No token provided",
    })
  } else {
    try {
      const payload = Jwt.verify(token, "jwtPrivateKey")
      req.user = payload
      next()
    } catch (error) {
      res.status(400).send({
        error: "Invalid token.",
      })
    }
  }
}
