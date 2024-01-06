import React, { Component } from 'react';
import UserService from '../../../services/UserService.js';

/**
 * BookshelfItem is a component that displays a preview of a review with
 * the information for the book, such as the title, author, and description.
 *
 * When clicked upon, BookshelfItem displays a modal that contains the review information.
 */
export default class BookshelfItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReviewModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  /**
   * When the book preview is clicked on, display the review as a modal.
   */
  openModal() {
    this.setState({ showReviewModal: true });
    console.log("opened modal");
  };

  /**
   * Hide the review modal when the close icon is clicked.
   */
  closeModal(e) {
    // Prevent the click event from propagating to the parent div.
    e.stopPropagation();
    this.setState({ showReviewModal: false });
  };

  /**
   * Deletes the review this component is associated with.
   */
  async deleteReview() {
    // Hide the review modal.
    this.setState({ showReviewModal: false });

    // Delete the review and update the user profile.
    await UserService.deleteReview(this.props.book.review.id).then(response => {
        this.props.updateProfile();
    });
  }

  render() {
    return (
        <div>
          <div className="book-preview" onClick={this.openModal}>
            <div className="book-preview-container">
              <img className="book-preview-image" src={this.props.book.cover} alt={"book cover for " + this.props.book.title}/>
              <div className="book-preview-text">
                <h3 className="book-preview-title">{this.props.book.title}</h3>
                <p className="book-preview-author">{this.props.book.author}</p>
                <p className="book-preview-year">{this.props.book.year}</p>
                <p className="book-preview-genre">{this.props.book.genre}</p>
              </div>
            </div>
          </div>

          {/* The review for the bookshelf item is displayed as a modal. */}
          {this.state.showReviewModal && (
              <div>
                <dialog open className="review-modal">
                  <div className="dialog-content">
                    <button className="close-button" onClick={this.closeModal}>
                      &times;
                    </button>
                    <h1 className="review-title">{this.props.book.review.title}</h1>
                    <h2 className="review-book">{this.props.book.title + " by " + this.props.book.author}</h2>
                    <h3 className="review-date">{"Read " + this.props.book.review.date}</h3>
                    <p className="review-description">{this.props.book.review.description}</p>
                    {this.props.book.canDelete && (
                        <button className="delete-button" onClick={this.deleteReview}>
                          Delete
                        </button>
                    )}
                  </div>
                </dialog>
              </div>
          )}
        </div>
    );
  }
};
