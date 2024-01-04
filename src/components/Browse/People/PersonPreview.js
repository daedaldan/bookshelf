import {useNavigate} from "react-router-dom";

/**
 * PersonPreview is a component that displays a preview of the information for a person,
 * including their name and number of reviews.
 *
 * When clicked upon, PersonPreview navigates to a separate page with more detailed information
 * for the person, including all of their reviews.
 */
export default function PersonPreview (props) {
  const navigate = useNavigate();

  /**
   * When the book preview is clicked on, navigate to a separate page for the person.
   */
  const handleClick = () => {
    const propsToPass = { person: props.person };
    navigate('/person', { state: propsToPass });
  };

  return (
      <div className="person-preview" onClick={handleClick}>
        <h3>{props.person.name}</h3>
        <p>{(props.person.numReviews === 1) ? (props.person.numReviews + " review") : (props.person.numReviews + " books")}</p>
      </div>
  );
};
