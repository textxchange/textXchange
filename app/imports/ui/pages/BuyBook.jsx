import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Header, Container, Loader, Image, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import { Profiles } from '/imports/api/profile/Profile';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import { Books } from '../../api/book/Book';

/** Create a schema to specify the structure of the data to appear in the form. */
const right = { float: 'right' };
const noPadding = { paddingBottom: '7px' };

let emailSent = false;

class BuyBook extends React.Component {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  plsEmail(email, book, image, buyerName, buyerEmail) {
    if (emailSent === false) {
      Meteor.call('buyEmail', email, book, image, buyerName, buyerEmail);
      emailSent = true;
    }
    this.setState({ modalOpen: true });
    this.setState({ open: false });
  }

  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    if (this.props.location.select !== undefined) {
      // eslint-disable-next-line no-undef,react/prop-types
      localStorage.setItem('SelectedOption', JSON.stringify(this.props.location.select));
    }
    // eslint-disable-next-line no-undef
    this.select = JSON.parse(localStorage.getItem('SelectedOption') || 1);
    this.select.datePosted = new Date(this.select.datePosted);
  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as='h1' textAlign="center">Buy Book</Header>
          <Card.Group itemsPerRow={2}>
            <Card>
              <Image centered src={this.select.image} size='medium'/>
            </Card>
            <Card>
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
                  <br/>
                  <span style={right}> Owned by {this.select.owner}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button basic color='green' onClick={this.open}>
                  Contact Seller For Purchase
                </Button>
                <Confirm
                    header='Purchase Confirmation'
                    /* eslint-disable-next-line max-len */
                    content='The seller of this book will be notified of your intent to purchase and will contact you via email.'
                    cancelButton='Cancel Purchase'
                    confirmButton="Confirm Purchase"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => this.plsEmail(
                        this.select.owner,
                        this.select.title,
                        this.select.image,
                        this.props.profile[0].firstName,
                        this.props.profile[0].owner,
                    )}/>

                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size='small'
                >
                  <Header style={{ color: 'White' }}>
                    <Icon color='green' name='checkmark' />
                     Purchase Confirmed!
                  </Header>
                  <Modal.Content>
                    <h3 style={{ color: 'White' }}>Email has been sent to seller</h3>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                      Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
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
