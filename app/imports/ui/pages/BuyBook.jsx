import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Card, Header, Container, Loader, Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SubmitField from 'uniforms-semantic/SubmitField';
import AutoForm from 'uniforms-semantic/AutoForm';
import { withTracker } from 'meteor/react-meteor-data';
import { Books } from '../../api/book/Book';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import ProfileBook from '../components/ProfileBook';

/** Create a schema to specify the structure of the data to appear in the form. */
const right = { float: 'right' };
const noPadding = { paddingBottom: '7px' };
/** Component for layout out a Book Card. */
const MakeCard = (props) => (
    <Card>
      <Image className='book-image' src={props.book.image}/>
      <Card.Content>
        <Card.Header>{props.book.title}</Card.Header>
        <Card.Meta>{props.book.author}</Card.Meta>
        <Card.Description> {props.book.description} </Card.Description>
      </Card.Content>
      <Card.Content style={noPadding}>
        <Card.Meta>
          {/* eslint-disable-next-line max-len */}
          <Image className='profile-pic' floated='left'
              /* eslint-disable-next-line max-len */
                 src='https://media.discordapp.net/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png'/>
          $ {props.book.cost}
          <span style={right}> Posted {props.book.datePosted.toLocaleDateString()} </span>
        </Card.Meta>
      </Card.Content>
    </Card>
);

/** Require a document to be passed to this component. */
MakeCard.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BuyBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = { classUsed: [] };
    this.select  = this.props.location;
    console.log(this.select);
  }

  submit(data) {
    this.setState({ classUsed: data.classUsed || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {

    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as='h1' textAlign="center" inverted>Buy Book</Header>

          <Card.Group centered style={{ paddingTop: '10px' }}>
            <Card>
              <Image className='book-image' src={this.select.image}/>
              <Card.Content>
                <Card.Header>{this.select.title}</Card.Header>
                <Card.Meta>{this.select.author}</Card.Meta>
                <Card.Description> {this.select.description} </Card.Description>
              </Card.Content>
              <Card.Content style={noPadding}>
                <Card.Meta>
                  {/* eslint-disable-next-line max-len */}
                  <Image className='profile-pic' floated='left'
                      /* eslint-disable-next-line max-len */
                         src='https://media.discordapp.net/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png'/>
                  $ {this.select.cost}
                  <span style={right}> Posted {this.select.datePosted.toLocaleDateString()} </span>
                </Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
BuyBook.propTypes = {
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('BookPublic');
  return {
    books: Books.find({}).fetch(),
    ready: subscription.ready(),
  };
})(BuyBook);
