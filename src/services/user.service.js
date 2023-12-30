import axios from 'axios';
import authHeader from './auth-header';

// URL for Django REST API backend
const API_URL = 'http://127.0.0.1:8000/';

class UserService {
  // Creates a review for a given book.
  create_review(reviewTitle, reviewDescription, bookTitle, bookAuthor, bookYear, bookGenre, bookDescription) {
    // Send POST request to backend to create the book review.
    return axios
        .post(
            API_URL + "reviews/create/", {
              title: reviewTitle,
              description: reviewDescription,
              book: {
                title: bookTitle,
                author: bookAuthor,
                year: bookYear,
                genre: bookGenre,
                description: bookDescription
              }
            },
            {
              headers: authHeader()
            });
  }
}

export default new UserService();
