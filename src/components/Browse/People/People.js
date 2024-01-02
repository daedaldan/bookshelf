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
       // Initialize a person object with their name and number of reviews.
       let person = {}
       person.name = props.people[username][0]["name"];
       person.numReviews = props.people[username].length;

       // Add the person to peopleData.
       peopleData.push(person);
     }
   }

   return (
      <div>
        <h1>People</h1>
        <div id="people">
          {peopleData.map((person, index) => (
            <PersonPreview key={index} person={person}/>
        ))}
        </div>
      </div>
  );
};
