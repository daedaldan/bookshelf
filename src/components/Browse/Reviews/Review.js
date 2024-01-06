import React from 'react';

export default function Review(props) {
  return (
      <div className="review">
        <h1>{props.review.title}</h1>
        <h2>{props.review.name}</h2>
        <h3>{props.review.date}</h3>
        <p>{props.review.description}</p>
      </div>
  );
}
