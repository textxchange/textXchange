import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Book from '../components/Book';
import { Books } from '../../api/book/Book';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Discover extends React.Component {
  render() {
    const book1 = [
      {
        ISBN: '12345',
        title: 'Book',
        author: 'Jeff Wong',
        yearPublished: new Date(),
        description: 'This is a book',
        cost: '13',
        owner: 'john@foo.com',
        class: 'ICS314',
        image: 'https://media.discordapp.net/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png',
        datePosted: new Date(),
        condition: 'good',
      },
      {
        ISBN: '12345',
        title: 'Book',
        author: 'Jeff Wong',
        yearPublished: new Date(),
        description: 'This is a book',
        cost: '13',
        owner: 'john@foo.com',
        class: 'ICS314',
        // eslint-disable-next-line max-len
        image: 'https://lonelyplanet-weblinc.netdna-ssl.com/product_images/lonely_planet_us/the-place-to-be-1/pdp/5a2c7946f92ea161d578fc2d/pdp_main.jpg?c=1512864070',
        datePosted: new Date(),
        condition: 'good',
      },
    ];
    return (
        <Container>
          <Header as='h1' textAlign="center" inverted>Browse</Header>
          <Card.Group centered>
            {this.props.books.map((book, index) => <Book key={index} book={book}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
Discover.propTypes = {
  books: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Book');
  return {
    books: Books.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Discover);
