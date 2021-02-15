import client from "./client"

const postReview = (userToBeReviewedId, comment, rating) =>
  client.post("/api/users/reviews", { userToBeReviewedId, comment, rating })

export default {
  postReview,
}
