const express = require("express")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")

// handles config/filename.json
const config = require("config")

const listingsRoute = require("./routes/listingsRoute")
const authRoute = require("./routes/authRoute")

app.use(cors())

// Handle images and assets
app.use(express.static("public"))
app.use(express.json())
app.use(helmet())
app.use(compression())

// Handles .env
require("dotenv/config")

app.use("/api/listings", listingsRoute)
app.use("/api/login", authRoute)

const PORT = process.env.PORT || config.get("port")
app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}...`)
})
