const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

// Handles .env
require("dotenv/config")

// handles config/filename.json
const config = require("config")

app.get("/api", (req, res) => {
  res.send("API is running!!!")
})

const PORT = process.env.PORT || config.get("port")
app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}...`)
})
