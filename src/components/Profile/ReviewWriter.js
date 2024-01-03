import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

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
      selectedItem: {}
    }

    this.handleReviewTitleChange = this.handleReviewTitleChange.bind(this);
    this.handleReviewDateChange = this.handleReviewDateChange.bind(this);
    this.handleReviewDescriptionChange = this.handleReviewDescriptionChange.bind(this);
    this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.formatResult = this.formatResult.bind(this);
  }

  /**
   * Updates the book information from the Open Library Search API given the search input text.
   */
  async updateBooksFound() {
    // Get the raw book information from the Open Library Search API.
    let rawBooks = await UserService.searchBook(this.state.searchInput);

    console.log("API data returned.");

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
      book.genre = (rawBooks[bookNum].subject.length > 0) ? rawBooks[bookNum].subject[0] : "No Genre";
      book.description = rawBooks[bookNum].subtitle ? rawBooks[bookNum].subtitle : "No Description";
      // Add the book's ID for ReactSearchAutocomplete.
      book.id = bookNum;
      // Create the book cover URL using the Open Library Cover API URL.
      book.cover = 'https://covers.openlibrary.org/b/id/' + rawBooks[bookNum].cover_i + '-M.jpg';

      // Add the book to the array.
      cleanedBooks.push(book);
    }

    // Update the state.
    this.setState({ booksFound : cleanedBooks });
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
  }

  /**
   * Handles searches from ReactSearchAutocomplete input.
   * @param string
   * @param results
   */
  handleOnSearch(string, results) {
    // Update the search input state.
    this.setState({ searchInput: string });

    // Update the books found based on the new search input state.
    this.updateBooksFound();
  }

  /**
   * Handles state changes for ReactSearchAutocomplete input.
   * @param item
   */
  handleOnSelect(item) {
    console.log(item);

    this.setState({ selectedItem: item }, () =>{
      console.log(this.state.selectedItem);
    });
  }

  /**
   * Returns HTML for how ReactSearchAutocomplete results are formatted.
   * @param item
   * @returns {JSX.Element}
   */
  formatResult(item) {
    return (
      <div className="result-wrapper">
        <span className="result-span">{item.title}</span>
        <span className="result-span">{item.author}</span>
      </div>
    );
  };

  render() {
    return(
        <div className="review-writer">
          <h2>Write a Review</h2>
          {/* ReactSearchAutocomplete is used for the book search bar. */}
          <ReactSearchAutocomplete
              items={this.state.booksFound}
              onSearch={this.handleOnSearch}
              onSelect={this.handleOnSelect}
              formatResult={this.formatResult}
              fuseOptions={{ keys: ["title", "author"] }}
              resultStringKeyName="title"
          />
          <textarea placeholder="Title" value={this.state.reviewTitle} onChange={this.handleReviewTitleChange} />
          <textarea placeholder="Date of Reading" value={this.state.reviewDate} onChange={this.handleReviewDateChange} />
          <textarea placeholder="Your review here..." value={this.state.reviewDescription} onChange={this.handleReviewDescriptionChange} />
          <button onClick={this.handleReviewSubmission}>Publish</button>
        </div>

    );
  }
}
