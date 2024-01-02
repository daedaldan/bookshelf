import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * BookPreview is a component that displays a preview of the information for a book,
 * such as the title, author, and description.
 *
 * When clicked upon, BookPreview navigates to a separate page with more detailed information
 * for the book, including all of its reviews.
 */
export default function BookPreview (props) {
  const navigate = useNavigate();

  const handleClick = () => {
    const propsToPass = { book: props.book, reviews: props.reviews };
    navigate('/book', { state: propsToPass });
  };

  return (
      <div className="book-preview" onClick={handleClick}>
        <h3>{props.book.title}</h3>
        <p>{props.book.author}</p>
        <p>{props.book.description}</p>
        <p>{props.book.year}</p>
        <p>{props.book.genre}</p>
        <img src={props.book.cover} alt={"book cover for " + props.book.title}/>
      </div>
  );
};
