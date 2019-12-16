import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, List, Button } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/Profile';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import { Books } from '../../api/book/Book';
import ProfileBook from '../components/ProfileBook';


class ProfileList extends React.Component {
  editProfile(id) {
    this.props.history.push(`/profile/edit/${this.props.profile[0]._id}`)
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="beauty">
          <Container>
            <Container className="profile-container">
              <Grid>
                  <Grid.Row className="profile-top-row">

                      <Grid.Column textAlign='center' width={4}>
                        <Image className="profile-picture"
                               src={this.props.profile[0].image} />
                        <Button onClick={this.editProfile.bind(this, this.props.profile[0]._id)}>
                          Edit Profile
                        </Button>
                      </Grid.Column>

                      <Grid.Column width={9}>
                        <Container>
                          <Grid className="profile-info" columns='equal'>
                            <Grid.Row>

                              <Grid.Column width={9}>
                                <List className="profile-list" size="huge">
                                  <List.Item>
                                    <List.Header>Name:</List.Header>
                                    {this.props.profile[0].firstName} {this.props.profile[0].lastName}
                                  </List.Item>

                                  <List.Item>
                                    <List.Header>Email:</List.Header>{this.props.profile[0].owner}
                                  </List.Item>

                                  <List.Item>
                                    <List.Header>Campus: </List.Header>
                                    {this.props.profile[0].campus}
                                  </List.Item>
                                </List>
                              </Grid.Column>

                              <Grid.Column width={7}>
                                <List className="profile-list" size="huge">
                                  <List.Item>
                                    <List.Header>Description: </List.Header>
                                    {this.props.profile[0].description}
                                  </List.Item>
                                </List>
                              </Grid.Column>

                            </Grid.Row>
                          </Grid>
                        </Container>
                      </Grid.Column>
                  </Grid.Row>

                  <Grid.Row className="profile-bottom-row">
                    <Container className="bottom-container">
                      <Header as="h2" textAlign="center" >Selling</Header>
                      <Card.Group>
                        {this.props.books.map((book, index) => <ProfileBook
                            className="profile-book"
                            key={index}
                            book={book}
                            Books={this.props.books}/>)}
                      </Card.Group>
                    </Container>
                  </Grid.Row>

              </Grid>
            </Container>
          </Container>
        </div>
    );
  }
}

/** Require an array of Book & Profile documents in the props. */
ProfileList.propTypes = {
  profile: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('Profile');
  const bookSub = Meteor.subscribe('Book');
  return {
    profile: Profiles.find({}).fetch(),
    books: Books.find({}).fetch(),
    ready: subscription.ready() && bookSub.ready(),
  };
})(ProfileList);
