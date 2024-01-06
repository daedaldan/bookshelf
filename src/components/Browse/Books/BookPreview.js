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

  /**
   * When the book preview is clicked on, navigate to a separate page for the book.
   */
  const handleClick = () => {
    const propsToPass = { book: props.book };
    navigate('/book', { state: propsToPass });
  };

  return (
      <div className="book-preview" onClick={handleClick}>
        <div className="book-preview-container">
           <img className="book-preview-image" src={props.book.cover} alt={"book cover for " + props.book.title}/>
          <div className="book-preview-text">
            <h3 className="book-preview-title">{props.book.title}</h3>
            <p className="book-preview-author">{props.book.author}</p>
            <p className="book-preview-year">{props.book.year}</p>
            <p className="book-preview-genre">{props.book.genre}</p>
          </div>
        </div>
      </div>
  );
};
