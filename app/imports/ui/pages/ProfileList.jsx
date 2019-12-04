import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Label } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/Profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import { Books } from '../../api/book/Book';
import Book from '../components/Book';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="beauty">
          <Container>
            <Header as="h2" textAlign="center" className="less-margin" inverted>Profile</Header>
            <Container className="profile-container">
              <Grid>
                  <Grid.Row className="profile-top-row">
                      <Grid.Column width={3}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      </Grid.Column>
                      <Grid.Column width={13}>

                        <Container className="profile-info">
                          <Header as="h2" textAlign="left" className="less-margin" inverted>Username: </Header>
                          <Header as="h5" className="less-margin" textAlign="left" inverted>{this.props.profile[0].owner}</Header>
                        </Container>

                        <Container className="profile-info">
                          <Header as="h2" textAlign="left" className="less-margin" inverted>Name: </Header>
                          <Header as="h5"className="less-margin" textAlign="left" inverted>{this.props.profile[0].firstName} {this.props.profile[0].lastName} </Header>
                        </Container>

                        <Container className="profile-info">
                          <Header as="h2" textAlign="left" className="less-margin" inverted>Student ID: </Header>
                          <Header as="h5" className="less-margin" textAlign="left" inverted>{this.props.profile[0].studentId} </Header>
                        </Container>

                        <Container className="profile-info">
                          <Header as="h2" textAlign="left" className="less-margin" inverted>Campus: </Header>
                          <Header as="h5" className="less-margin" textAlign="left" inverted>{this.props.profile[0].campus} </Header>
                        </Container>

                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Container className="profile-bottom-row">
                      <Card.Group>
                        {this.props.books.map((book, index) => <Book
                            key={index}
                            book={book}/>)}
                      </Card.Group>
                    </Container>
                  </Grid.Row>
              </Grid>
            </Container>
            <br/>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileList.propTypes = {
  profile: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  const bookSub = Meteor.subscribe('Book');
  return {
    profile: Profiles.find({}).fetch(),
    books: Books.find({}).fetch(),
    ready: subscription.ready() && bookSub.ready(),
  };
})(ProfileList);
