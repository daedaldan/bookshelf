import { useLocation } from 'react-router-dom';

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
        <p>{receivedProps.person.numReviews + "reviews"}</p>
      </div>
  );
};
