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
        <h1 className="person-name">{receivedProps.person.name}</h1>
        <h3 className="person-review-count">{(receivedProps.person.numReviews === 1) ? (receivedProps.person.numReviews + " book") : (receivedProps.person.numReviews + " books")}</h3>
        <div id="books">
          {receivedProps.person.books.map((book, index) => (
              <BookshelfItem key={index} book={book}/>
          ))}
        </div>
      </div>
  );
};
