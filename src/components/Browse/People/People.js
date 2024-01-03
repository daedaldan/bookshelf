import PersonPreview from './PersonPreview.js';

/**
 * People is a component that displays the previews of all of the people
 * that have written at least one review.
 */
export default function People(props) {
   // Create list of the people to display.
   let peopleData = [];

   // For each person in the database, if they have at least one review, display the person's info.
   for (let username in props.people) {
     if (props.people[username].length > 0) {
       // Initialize a person object with their name, books, and reviews.
       let person = {}
       // Add the person's name.
       person.name = props.people[username][0]["name"];

       // Create a list of the person's books.
       let bookData = [];

       // For each of the person's reviews, add the book to their book list.
       for (let reviewNum = 0; reviewNum < props.people[username].length; reviewNum++) {
         // Initialize the person's book.
         let book = props.people[username][reviewNum].book;
         // Add the person's review as part of the book object.
         book.review = props.people[username][reviewNum];
         // By default, a review cannot be deleted from the BookshelfItem modal.
         book.canDelete = false;

         // Add the book to the list.
         bookData.push(book);
       }

       // Add the person's books and reviews.
       person.books = bookData;
       person.numReviews = props.people[username].length;

       // Add the person to peopleData.
       peopleData.push(person);
     }
   }

   return (
      <div>
        <h1>People</h1>
        <div id="people">
          {(peopleData.length === 0) && "Nobody has written a review yet."}
          {peopleData.map((person, index) => (
            <PersonPreview key={index} person={person}/>
        ))}
        </div>
      </div>
  );
};
