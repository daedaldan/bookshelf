import React, {Component} from 'react';
import People from './People/People.js';
import Books from './Books/Books.js';

import UserService from '../../services/UserService.js';

export default class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      books: [],
    };
  }

  async componentDidMount() {
    // Get list of people from backend and update state.
    await UserService.getAllReviewsByUser().then(response => {
      this.setState({ people : response.data})
    });

    // Get list of books from backend and update state.
    await UserService.getAllReviewsByBook().then(response => {
      this.setState({ books : response.data})
    });
  }

  render() {
    return(
        <div className="browse">
          <People people={this.state.people}/>
          <Books books={this.state.books}/>
        </div>
    );
  }
}
