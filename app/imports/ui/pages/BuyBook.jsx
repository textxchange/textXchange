import React from "react";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Card, Header, Container, Loader, Segment, Image, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { _ } from "meteor/underscore";
import SubmitField from "uniforms-semantic/SubmitField";
import AutoForm from "uniforms-semantic/AutoForm";
import { withTracker } from "meteor/react-meteor-data";
import { Books } from "../../api/book/Book";
import MultiSelectField from "../forms/controllers/MultiSelectField";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import ProfileBook from "../components/ProfileBook";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import { Profiles } from "/imports/api/profile/Profile";
import { Email } from "meteor/email";
import Confirm from "semantic-ui-react/dist/commonjs/addons/Confirm";

/** Create a schema to specify the structure of the data to appear in the form. */
const right = { float: "right" };
const noPadding = { paddingBottom: "7px" };

let emailSent = false;


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class BuyBook extends React.Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  plsEmail(email, book, image, buyerName) {
    if (emailSent == false) {
      Meteor.call("buyEmail", email, book, image, buyerName);
      emailSent = true;
    }
    this.setState({ modalOpen: true });
    this.setState({ open: false });
  }

  constructor(props) {
    super(props);
    console.log(this.props.location.select);
    if (this.props.location.select != undefined) {
      localStorage.setItem("SelectedOption", JSON.stringify(this.props.location.select));
    }
    this.select = JSON.parse(localStorage.getItem("SelectedOption") || 1);
    this.select.datePosted = new Date(this.select.datePosted);
    console.log(this.select);
  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { open } = this.state;
    return (
        <Container>
          <Header as='h1' textAlign="center" inverted>Buy Book</Header>
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
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button centered basic color='green' onClick={this.open}>
                  Contact Seller For Purchase
                </Button>
                <Confirm
                    header='Purchase Confirmation'
                    content='The seller of this book will be notified of your intent to purchase and will contact you via email.'
                    cancelButton='Cancel Purchase'
                    confirmButton="Confirm Purchase"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => this.plsEmail(
                        this.select.owner,
                        this.select.title,
                        this.select.image,
                        this.props.profile[0].firstName
                    )}/>

                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size='small'
                >
                  <Header icon='checkmark' content='Purchase Confirmed!'/>
                  <Modal.Content>
                    <h3>Email has been sent to seller</h3>
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
  profile: PropTypes.array.isRequired
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe("BookPublic");
  const profilesub = Meteor.subscribe("Profile");
  return {
    profile: Profiles.find({}).fetch(),
    books: Books.find({}).fetch(),
    ready: subscription.ready() && profilesub.ready()
  };
})(BuyBook);
