import React, {Component} from 'react';

import ReviewWriter from './ReviewWriter.js'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render () {
    return(
        <div className="profile">
          <h1>Profile</h1>
          <ReviewWriter/>
        </div>
    );
  }
}
