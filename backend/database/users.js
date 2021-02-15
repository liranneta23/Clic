const users = [
  {
    id: 1,
    name: "Bonaventure",
    email: "bonarhyme@gmail.com",
    password: "##Bonaventure1",
    phoneNumber: "+234816767676",
    reviews: [
      {
        userId: 5,
        name: "Peter pan",
        rating: 3,
        comment: "His products are very good",
        createdAt: "2021-02-14T11:02:25.934Z",
        updatedAt: "2021-02-14T11:02:25.934Z",
      },
      {
        userId: 6,
        name: "Juliana",
        rating: 4,
        comment: "Fair enough",
        createdAt: "2021-01-14T11:02:25.934Z",
        updatedAt: "2021-01-14T11:02:25.934Z",
      },
      {
        userId: 7,
        name: "Bello",
        rating: 4,
        comment: "Okayyyy ",
        createdAt: "2021-01-14T11:02:25.934Z",
        updatedAt: "2021-01-14T11:02:25.934Z",
      },
      {
        userId: 9,
        name: "Bou",
        rating: 3,
        comment: "Not good",
        createdAt: "2021-01-14T11:02:25.934Z",
        updatedAt: "2021-01-14T11:02:25.934Z",
      },
      {
        userId: 10,
        name: "Bookjhgfhj",
        rating: 4,
        comment: "Fair enough",
        createdAt: "2021-01-14T11:02:25.934Z",
        updatedAt: "2021-01-14T11:02:25.934Z",
      },
    ],
    rating: 3.5,
    numReview: 5,
    userImage: "",
  },
  {
    id: 2,
    name: "John",
    email: "john@domain.com",
    password: "##John1",
    phoneNumber: "+234808754543",
    reviews: [
      {
        userId: 7,
        name: "Dancing senator",
        rating: 3,
        comment: "His products are very good",
        createdAt: "2021-02-14T11:02:25.934Z",
        updatedAt: "2021-02-14T11:02:25.934Z",
      },
      {
        userId: 6,
        name: "Juliana",
        rating: 5,
        comment: "Fair enough",
        createdAt: "2021-01-14T11:02:25.934Z",
        updatedAt: "2021-01-14T11:02:25.934Z",
      },
    ],
    rating: 4,
    numReview: 2,
    userImage: "",
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
