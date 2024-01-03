import axios from 'axios';
import authHeader from './AuthHeader';

// URL for Django REST API backend
const API_URL = 'http://127.0.0.1:8000/';
// URL for Open Library Search API
const LIBRARY_API_URL = 'https://openlibrary.org/search.json?q=';

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

  /**
   * Given a snippet of text, this function sends the text
   * to the Open Library Search API to find the first bookLimit books that match
   * the search text.
   *
   * @param searchText text sent to the Open Library Search API
   * @param bookLimit the maximum number of books that will be returned
   */
  async searchBooks(searchText, bookLimit) {
    let rawResponse = await axios
        .get(
            LIBRARY_API_URL +  searchText.trim().split(' ').join('+')
        );

    // Create an array to store the books that will be returned.
    let bookResults = [];

    if (rawResponse.data && rawResponse.data.docs) {
      let numBooks = bookLimit;
      // If there are less than 5 books in the search results, return all of them.
      if (rawResponse.data.docs.length < bookLimit) {
        numBooks = rawResponse.data.docs.length;
      }

      // Add the books to the return array.
      for (let bookNum = 0; bookNum < numBooks; bookNum++) {
        bookResults.push(rawResponse.data.docs[bookNum]);
      }

      return bookResults;
    } else {
      console.log("Invalid response format.")
      return [];
    }
  }
}

export default new UserService();
