const categories = [
  {
    label: "Funiture",
    value: 1,
    backgroundColor: "orange",
    icon: "floor-lamp",
  },
  { label: "Cars", value: 2, backgroundColor: "#ed5499", icon: "car" },
  { label: "Camera", value: 3, backgroundColor: "#333679", icon: "camera" },
  {
    label: "Games",
    value: 4,
    backgroundColor: "green",
    icon: "gamepad-variant",
  },
  {
    label: "Clothings",
    value: 5,
    backgroundColor: "indigo",
    icon: "shoe-heel",
  },
  { label: "Sports", value: 6, backgroundColor: "blue", icon: "football" },
  {
    label: "Movies & Music",
    value: 7,
    backgroundColor: "maroon",
    icon: "music",
  },
  {
    label: "Books",
    value: 8,
    backgroundColor: "purple",
    icon: "book-open-page-variant",
  },
  {
    label: "others",
    value: 9,
    backgroundColor: "gray",
    icon: "file-presentation-box",
  },
]

const getAllCategories = () => categories

const getSingleCategory = (id) =>
  categories.find((category) => category.id === id)

module.exports = {
  getAllCategories,
  getSingleCategory,
}
