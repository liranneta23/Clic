const users = [
  {
    id: 1,
    name: "Bonaventure",
    email: "bonarhyme@gmail.com",
    password: "##Bonaventure1",
    phoneNumber: "+234816767676",
    rating: 4.5,
    numReview: 19,
  },
  {
    id: 2,
    name: "John",
    email: "john@domain.com",
    password: "##John1",
    phoneNumber: "+234808754543",
    rating: 2,
    numReview: 44,
  },
]

const getAllUsers = () => users

const getUserById = (id) => users.find((user) => user.id === id)

const getUserByEmail = (email) => users.find((user) => user.email === email)

const addUser = (user) => {
  user.id = users.length + 1
  users.push(user)
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  addUser,
}
