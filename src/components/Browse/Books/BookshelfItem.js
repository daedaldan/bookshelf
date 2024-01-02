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
      <div className="book-preview" onClick={this.openModal}>
        <h3>{this.props.book.title}</h3>
        <p>{this.props.book.author}</p>
        <p>{this.props.book.description}</p>
        <p>{this.props.book.year}</p>
        <p>{this.props.book.genre}</p>
        <img src={this.props.book.cover} alt={"book cover for " + this.props.book.title}/>

        {/* The review for the bookshelf item is displayed as a modal. */}
        {this.state.showReviewModal && (
            <dialog open className="review-modal">
              <button className="close" onClick={this.closeModal}>
                &times;
              </button>
              <h1>{this.props.book.review.title}</h1>
              <h3>{this.props.book.title + " by " + this.props.book.author}</h3>
              <h4>{"Written " + this.props.book.review.date}</h4>
              <p>{this.props.book.review.description}</p>
              {this.props.book.canDelete && (
                  <button className="delete" onClick={this.deleteReview}>
                    Delete
                  </button>
              )}
            </dialog>
        )}
      </div>
    );
  }
};
