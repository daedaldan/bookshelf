import { useLocation } from 'react-router-dom';
import BookshelfItem from "../Books/BookshelfItem";

/**
 * Person is a component that displays all of the information for a certain person,
 * as well as all of the reviews written by that person.
 */
export default function Person () {
  const location = useLocation();
  const receivedProps = location.state;

  return (
      <div className="person">
        <h3>{receivedProps.person.name}</h3>
        <p>{receivedProps.person.numReviews + " reviews"}</p>
        <div id="books">
          {receivedProps.person.books.map((book, index) => (
              <BookshelfItem key={index} book={book}/>
          ))}
        </div>
      </div>
  );
};
