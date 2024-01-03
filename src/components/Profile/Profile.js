import React, {Component} from 'react';

import ReviewWriter from './ReviewWriter.js'
import UserService from '../../services/UserService.js';
import AuthService from '../../services/AuthService.js';
import BookshelfItem from "../Browse/Books/BookshelfItem";

/**
 * Profile is a component that displays the information for the user that is currently logged in.
 *
 * The user can write new reviews, view their current bookshelf, and delete old reviews.
 */
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      books: [],
      showReviewWriter: false
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.updateBooks = this.updateBooks.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    // Update the user's profile with their book and review info.
    await this.updateProfile();
  }

  /**
   * Updates the user's profile with their book and review info.
   */
  async updateProfile() {
    // Get list of the current user's reviews from the backend and update state.
    await UserService.getAllReviewsByUser().then(response => {
      let responseData = response.data;
      let username = AuthService.getCurrentUser().username;
      let reviewData = responseData[username];

      this.setState({ reviews : reviewData }, () => {
        this.updateBooks();
      })
    });
  }

  /**
   * Updates the current user's list of books for the Profile page based on the review data.
   */
  updateBooks() {
    // Create an array to store the updated books.
    let updatedBooks = [];

    // For each of the person's reviews, add the book to their book list.
    for (let reviewNum = 0; reviewNum < this.state.reviews.length; reviewNum++) {
      // Initialize the person's book.
      let book = this.state.reviews[reviewNum].book;
      // Add the person's review as part of the book object.
      book.review = this.state.reviews[reviewNum];
      // The user currently logged in can delete their own reviews.
      book.canDelete = true;

      // Add the book to the list.
      updatedBooks.push(book);
    }

    // Update the state.
      this.setState({
        books: updatedBooks,
        reviews: this.state.reviews
      });
  }

  /**
   * When the review writer is opened, display it as a modal.
   */
  openModal() {
    this.setState({ showReviewWriter: true });
  };

  /**
   * Hide the review writer when the close icon is clicked.
   */
  closeModal(e) {
    // Prevent the click event from propagating to the parent div.
    e.stopPropagation();
    this.setState({ showReviewWriter: false });
  };

  render() {
    return(
        <div className="profile">
          <h1>Profile</h1>
          <h2>My Bookshelf</h2>
          <div id="books">
            {(this.state.reviews.length === 0) && "You don't have any book reviews right now."}
            {this.state.books.map((book, index) => (
              <BookshelfItem key={index} book={book} updateProfile={this.updateProfile}/>
            ))}
          </div>

          {this.state.showReviewWriter && <ReviewWriter updateProfile={this.updateProfile} closeModal={this.closeModal}/>}

          <button className="open-review-writer" onClick={this.openModal}>
              Write a Review
          </button>
        </div>
    );
  }
}
