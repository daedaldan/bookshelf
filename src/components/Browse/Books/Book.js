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
        <div className="book-meta">
          <span className="book-meta-tag book-meta-tag-year">
            <span className="book-meta-label">Published</span>
            <span className="book-meta-value">{receivedProps.book.year}</span>
          </span>
          <span className="book-meta-tag book-meta-tag-genre">
            <span className="book-meta-label">Genre</span>
            <span className="book-meta-value">{receivedProps.book.genre}</span>
          </span>
        </div>
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
