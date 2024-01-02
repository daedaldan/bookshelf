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
       let book = props.books[title][0]["book"];
       book.reviews = props.books[title];
       bookData.push(book);
     }
   }

   return (
      <div>
        <h1>Books</h1>
        <div id="books">
          {bookData.map((book, index) => (
              <BookPreview key={index} book={book}/>
          ))}
        </div>
      </div>
  );
};
