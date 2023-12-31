import axios from 'axios';
import authHeader from './AuthHeader';

// URL for Django REST API backend
const API_URL = 'http://127.0.0.1:8000/';

class UserService {
  // Creates a review for a given book.
  create_review(reviewTitle, reviewDescription, reviewDate, bookTitle, bookAuthor, bookYear, bookGenre, bookDescription, bookCover) {
    // Send POST request to backend to create the book review.
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
}

export default new UserService();
