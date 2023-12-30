import axios from 'axios';
import authHeader from './auth-header';

// URL for Django REST API backend
const API_URL = 'http://127.0.0.1:8000/';

class UserService {
  // Creates a review for a given book.
  create_review(review_title, review_description, book_title, book_author, book_year, book_genre, book_description) {
    // Send POST request to backend to create the book review.
    return axios
        .post(
            API_URL + "reviews/create/", {
              review_title: review_title,
              review_description: review_description,
              book_title: book_title,
              book_author: book_author,
              book_year: book_year,
              book_genre: book_genre,
              book_description: book_description
            },
            {
              headers: authHeader()
            });
  }
}

export default new UserService();
