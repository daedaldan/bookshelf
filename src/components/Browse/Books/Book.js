import { useLocation } from 'react-router-dom';

/**
 * Book is a component that displays all of the information for a certain book,
 * as well as all of the reviews written for that book.
 */
export default function Book() {
  const location = useLocation();
  const receivedProps = location.state;

  return (
      <div className="book">
        <h2>{receivedProps.book.title}</h2>
        <h3>{receivedProps.book.author}</h3>
        <p>{receivedProps.book.description}</p>
        <p>{receivedProps.book.year}</p>
        <p>{receivedProps.book.genre}</p>
        <img src={receivedProps.book.cover} alt={"book cover for " + receivedProps.book.title}/>

        <h3>Reviews</h3>
        <p>{receivedProps.reviews}</p>
      </div>
  );
};
