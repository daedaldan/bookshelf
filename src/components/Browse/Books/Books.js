import React from 'react';
import BookPreview from './BookPreview.js';

/**
 * Books is a component that displays the previews of all of the books
 * that have at least one review.
 */
export default function Books (props) {
   // Create list of the books to display.
   let bookData = [];

   // For each book in the database, if it has at least one review, display it.
   for (let title in props.books) {
     if (props.books[title].length > 0) {
      bookData.push(props.books[title][0]["book"]);
     }
   }

   return (
      <div>
        <h1>Books</h1>
        <div id="books">
          {bookData.map((book, index) => (
              <BookPreview key={index} book={book} reviews={props.books}/>
          ))}
        </div>
      </div>
  );
};
