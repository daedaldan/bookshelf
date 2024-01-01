import React from 'react';

export default function Review(props) {
  return (
      <div className="review">
        <p>{props.title}</p>
        <p>{props.date}</p>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.bookTitle}</p>
        <p>{props.bookAuthor}</p>
        <p>{props.bookYear}</p>
        <p>{props.bookGenre}</p>
      </div>
  );
}
