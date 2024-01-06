import { useLocation } from 'react-router-dom';
import Review from "../Reviews/Review.js";

/**
 * Book is a component that displays all of the information for a certain book,
 * as well as all of the reviews written for that book.
 */
export default function Book() {
  const location = useLocation();
  const receivedProps = location.state;

  return (
      <div className="book">
        <h1 className="book-title">{receivedProps.book.title}</h1>
        <h2 className="book-author">{receivedProps.book.author}</h2>
        <h3 className="book-date">{"Published: " + receivedProps.book.year}</h3>
        <h3 className="book-genre">{"Genre: " + receivedProps.book.genre}</h3>
        <img className="book-image" src={receivedProps.book.cover} alt={"book cover for " + receivedProps.book.title}/>

        <h1>Reviews</h1>
        <div id="book-reviews">
          {receivedProps.book.reviews.map((review, index) => (
              <Review key={index} review={review}/>
          ))}
        </div>
      </div>
  );
};
