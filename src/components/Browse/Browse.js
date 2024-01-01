import React, {Component} from 'react';
import People from './People/People.js';
import Books from './Books/Books.js';

export default function Browse () {
    return(
        <div className="browse">
          <People/>
          <Books/>
        </div>
    );
}
