const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}
// const Cat = mongoose.model("Cat", { name: String })
// const kitty = new Cat({ name: "Zildjian" })
// kitty.save().then(() => console.log("meow"))

module.exports = connectDB
