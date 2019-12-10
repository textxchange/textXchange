import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Card, Header, Container, Loader, Segment, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SubmitField from 'uniforms-semantic/SubmitField';
import AutoForm from 'uniforms-semantic/AutoForm';
import { withTracker } from 'meteor/react-meteor-data';
import { Books } from '../../api/book/Book';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import ProfileBook from '../components/ProfileBook';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import { Profiles } from '/imports/api/profile/Profile';

/** Create a schema to specify the structure of the data to appear in the form. */
const right = { float: 'right' };
const noPadding = { paddingBottom: '7px' };

Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({ to, from, subject, text });
  },
});


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BuyBook extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.location.select);
    if (this.props.location.select != undefined) {
      localStorage.setItem('SelectedOption', JSON.stringify(this.props.location.select));
    }
    this.select = JSON.parse(localStorage.getItem('SelectedOption') || 1);
    this.select.datePosted = new Date(this.select.datePosted);
    console.log(this.select);
  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as='h1' textAlign="center" inverted>Buy Book</Header>
          <Card fluid>
            <Card.Group centered>
              <Card color='red' image={this.select.image}/>
            </Card.Group>
            <Card.Content>
              <Card.Header>{this.select.title}</Card.Header>
              <Card.Meta>{this.select.author}</Card.Meta>
              <Card.Description> {this.select.description} </Card.Description>
              <Label tag floated='right'>
                {this.select.classUsed}
              </Label>
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
            <Card.Content extra>
              <Modal
                  trigger={<Button basic color='green' content='Contact Seller for Purchase' onClick={Meteor.call(
                      'sendEmail',
                      'textXchange.team@gmail.com',
                      this.select.owner,
                      'textXchange, Buyer Notification!',
                      `Hello ${this.select.owner},${
                      this.props.profile[0].firstName} ${
                      this.props.profile[0].lastName
                      } would like to purchase your book: ${
                      this.select.title}please contact them via email at : ${
                      this.select.owner} to setup an exchange.     -textXchange`,
                  )}/>}
                  header='Exchange Initiated'
                  content='The seller will be notified of your intent to purchase and will contact you!'
                  actions={[{ key: 'done', content: 'Got it', positive: true }]}
              />
              <span style={right}> Owned by {this.select.owner}</span>
            </Card.Content>
          </Card>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
BuyBook.propTypes = {
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  profile: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('BookPublic');
  const profilesub = Meteor.subscribe('Profile');
  return {
    profile: Profiles.find({}).fetch(),
    books: Books.find({}).fetch(),
    ready: subscription.ready() && profilesub.ready(),
  };
})(BuyBook);
