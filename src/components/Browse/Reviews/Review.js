import React from 'react';

export default function Review(props) {
  return (
      <div className="review">
        <p>{props.review.title}</p>
        <p>{props.review.description}</p>
        <p>{props.review.name}</p>
        <p>{props.review.date}</p>
      </div>
  );
}
