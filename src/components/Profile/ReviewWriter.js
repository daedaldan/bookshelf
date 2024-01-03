import React, { Component } from 'react';

import UserService from '../../services/UserService.js';

export default class ReviewWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewTitle: "",
      reviewDate: "",
      reviewDescription: "",
      searchInput: "",
      booksFound: [],
      selectedBook: {},
      loading: false,
      noBooksFound: false,
    }

    this.handleReviewTitleChange = this.handleReviewTitleChange.bind(this);
    this.handleReviewDateChange = this.handleReviewDateChange.bind(this);
    this.handleReviewDescriptionChange = this.handleReviewDescriptionChange.bind(this);
    this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.formatSuggestion = this.formatSuggestion.bind(this);
    this.displaySuggestions = this.displaySuggestions.bind(this);

    // Initialize a variable to store the timer for updating books
    this.debounceTimer = null;
  }

  /**
   * Updates the book information from the Open Library Search API given the search input text.
   */
  async updateBooksFound() {
    // Set the search bar loading state to true.
    this.setState({
      loading: true
    });

    // Get the raw book information from the Open Library Search API.
    let rawBooks = await UserService.searchBooks(this.state.searchInput, 10);

    // Create an array to store the cleaned book information.
    let cleanedBooks = [];

    // For each book, add its cleaned info to the array.
    for (let bookNum = 0; bookNum < rawBooks.length; bookNum++) {
      // Initialize a Book object.
      let book = {};

      // Add the book's essential information.
      book.title = rawBooks[bookNum].title;
      book.author = rawBooks[bookNum].author_name[0];
      book.year = rawBooks[bookNum].first_publish_year.toString();
      // Get the first subject.
      book.genre = rawBooks[bookNum].subject ? rawBooks[bookNum].subject[0] : "No Genre";
      book.description = rawBooks[bookNum].subtitle ? rawBooks[bookNum].subtitle : "No Description";
      // Add the book's ID for ReactSearchAutocomplete.
      book.id = bookNum;
      // Create the book cover URL using the Open Library Cover API URL.
      book.cover = 'https://covers.openlibrary.org/b/id/' + rawBooks[bookNum].cover_i + '-M.jpg';

      // Add the book to the array.
      cleanedBooks.push(book);
    }

    // Update the cleanedBooks state and set the search bar loading state to false.
    this.setState({
      booksFound : cleanedBooks,
      loading: false,
      noBooksFound: (cleanedBooks.length === 0) ? true : false
    });
  }

  /**
   * Updates the review title input field when the user changes it.
   * @param e user input for review title
   */
  handleReviewTitleChange(e) {
    this.setState({ reviewTitle : e.target.value });
  }

  /**
   * Updates the review date input field when the user changes it.
   * @param e user input for review date
   */
  handleReviewDateChange(e) {
    this.setState({ reviewDate : e.target.value });
  }

  /**
   * Updates the review description input field when the user changes it.
   * @param e user input for review description
   */
  handleReviewDescriptionChange(e) {
    this.setState({ reviewDescription : e.target.value });
  }

  /**
   * Event listener for the review publication button.
   * Calls UserService.createReview to create the review in the backend database,
   * then updates the profile page.
   */
  async handleReviewSubmission() {
    // Check that all the necessary fields are filled out.
    if (!this.state.reviewTitle) {
      return alert("The review title is required.");
    }
    if (!this.state.reviewDate) {
      return alert("The review date is required.");
    }
    if (!this.state.reviewDescription) {
      return alert("The review description is required.");
    }
    if (!this.state.selectedItem.title ||
        !this.state.selectedItem.author
    ) {
      return alert("You must select a book for the review.");
    }

    // Create the review, update the user profile, and reset the form's state.
    await UserService.createReview(
        this.state.reviewTitle,
        this.state.reviewDescription,
        this.state.reviewDate,
        this.state.selectedItem.title,
        this.state.selectedItem.author,
        this.state.selectedItem.year,
        this.state.selectedItem.genre,
        this.state.selectedItem.description,
        this.state.selectedItem.cover
    ).then(response => {
        // Update the user profile.
        this.props.updateProfile();

        // Reset the form's state.
        this.setState({
          reviewTitle: "",
          reviewDate: "",
          reviewDescription: "",
          searchInput: "",
          booksFound: [],
          selectedItem: {}
        });
    });

    // Close the review writer modal after submission.
    this.props.closeModal();
  }

  /**
   * When the user's search input changes, update the text displayed and books found in the backend.
   */
  handleInputChange(e) {
    // Update the search input state.
    this.setState({
      searchInput: e.target.value
    });

    // If a book has already been selected, unselect it.
    this.setState({
      selectedItem: {},
      selectedBook: false
    });

    // Clear the previous timer.
    clearTimeout(this.debounceTimer);

    // Update the books found based on the new search input state (only if the input hasn't been updated for 300 ms).
    this.debounceTimer = setTimeout(() => {
      this.updateBooksFound();
    }, 300);
  }

  /**
   * When the user selects a book suggestion, set it to the selected book,
   * update the text displayed, and clear the book suggestions.
   */
  handleSelection(selectedBook) {
    this.setState({
      selectedItem: selectedBook,
      searchInput: this.formatSuggestion(selectedBook),
      booksFound: [],
      noBooksFound: false,
      selectedBook: true
    });
  }

  /**
   * Returns a string for how the search bar result is formatted.
   * @param book
   * @returns {JSX.Element}
   */
  formatSuggestion(book) {
    return book.title + " by " + book.author;
  };

  /**
   * Returns unordered list HTML for book suggestions
   * @returns {JSX.Element} list of book suggestions
   */
  displaySuggestions() {
    if (this.state.selectedBook) { // If the user has already selected a book, return nothing.
      return (<div></div>);
    } else if (!this.state.noBooksFound) {
      return (
        <ul className="suggestions-list">
          {this.state.booksFound.map((book, index) => (
            <li key={index} onClick={() => this.handleSelection(book)}>
              {this.formatSuggestion(book)}
            </li>
          ))}
        </ul>
      );
    } else {
        return (
            <ul className="suggestions-list">
              <li>
                No books found.
              </li>
            </ul>
        );
    }
  }

  render() {
    return(
        <dialog open className="review-writer">
          <h2>Write a Review</h2>
          <button className="close" onClick={this.props.closeModal}>
              &times;
          </button>

          <div className="book-search">
            <input
              type="text"
              value={this.state.searchInput}
              onChange={this.handleInputChange}
              placeholder="Search for a book"
            />
            {this.state.loading ? "Loading results..." : this.displaySuggestions()}
            {}
          </div>

          <textarea placeholder="Title" value={this.state.reviewTitle} onChange={this.handleReviewTitleChange} />
          <textarea placeholder="Date of Reading" value={this.state.reviewDate} onChange={this.handleReviewDateChange} />
          <textarea placeholder="Your review here" value={this.state.reviewDescription} onChange={this.handleReviewDescriptionChange} />
          <button onClick={this.handleReviewSubmission}>Publish</button>
        </dialog>

    );
  }
}
