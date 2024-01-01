import React, {Component} from 'react';
import People from './People/People.js';
import Books from './Books/Books.js';

export default class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render () {
    return(
        <div className="browse">
          <People/>
          <Books/>
        </div>
    );
  }
}
