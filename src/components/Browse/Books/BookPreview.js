import React from 'react';

 export default function BookPreview (props) {
  return (
      <div className="book-preview">>
        <h3>{props.title}</h3>
        <p>{props.author}</p>
        <p>{props.description}</p>
        <p>{props.year}</p>
        <p>{props.genre}</p>
      </div>
  );
};
