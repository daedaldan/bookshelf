import axios from 'axios';
import authHeader from './AuthHeader';

// URL for Django REST API backend
const API_URL = 'http://127.0.0.1:8000/';

/**
 * The class UserService provides a set of services that allow the frontend to send and receive
 * requests to/from the backend in order to create, delete, and access user reviews.
 */
class UserService {
  /**
   * Creates a review for a given book.
   *
   * @param reviewTitle
   * @param reviewDescription
   * @param reviewDate
   * @param bookTitle
   * @param bookAuthor
   * @param bookYear
   * @param bookGenre
   * @param bookDescription
   * @param bookCover
   * @returns {Promise<AxiosResponse<any>>}
   */
  createReview(reviewTitle, reviewDescription, reviewDate, bookTitle, bookAuthor, bookYear, bookGenre, bookDescription, bookCover) {
    // Send POST request to the backend to create the book review.
    return axios
        .post(
            API_URL + "reviews/create/", {
              title: reviewTitle,
              description: reviewDescription,
              date: reviewDate,
              book: {
                title: bookTitle,
                author: bookAuthor,
                year: bookYear,
                genre: bookGenre,
                description: bookDescription,
                cover: bookCover
              }
            },
            {
              headers: authHeader()
            });
  }

  /**
   * Deletes the review with the specified ID.
   *
   * @param reviewID
   * @returns {Promise<AxiosResponse<any>>}
   */
  deleteReview(reviewID) {
    // Send DELETE request to the backend to delete the review with the specified ID.
    return axios
        .delete(
            API_URL + "reviews/delete/" + reviewID + "/",
            {
              headers: authHeader()
            });
  }

  /**
   * Gets all the reviews from the user with the specified username.
   *
   * @param username
   * @returns {Promise<AxiosResponse<any>>}
   */
  getUserReviews(username) {
    // Send GET request to the backend to get the reviews from the user with the specified username.
    return axios
        .get(
            API_URL + "reviews/user/" + username + "/",
            {
              headers: authHeader()
            });
  }

  /**
   * Gets all the reviews organized by the user(s) who wrote them.
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllReviewsByUser() {
    // Send GET request to the backend to get all the reviews organized by the user(s) who wrote them.
    return axios
        .get(
            API_URL + "reviews/all/user/",
            {
              headers: authHeader()
            });
  }

  /**
   * Gets all the reviews organized by the book(s) they were written for.
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllReviewsByBook() {
    // Send GET request to the backend to get all the reviews organized by the book(s) they were written for.
    return axios
        .get(
            API_URL + "reviews/all/book/",
            {
              headers: authHeader()
            });
  }
}

export default new UserService();
