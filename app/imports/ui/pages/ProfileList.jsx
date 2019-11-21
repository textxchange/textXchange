import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
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

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfileList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Profile</Header>
          <Segment inverted>
          <Image src='/images/george.jpg'  size='small' centered/>
           <Divider inverted />
          <Grid textAlign='center' columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Menu fluid vertical inverted>
                  <Menu.Item className='header'>(username)</Menu.Item>
                  <Menu.Item className='header'>(firstname lastname)</Menu.Item>
                  <Menu.Item className='header'>(student id#)</Menu.Item>
                  <Menu.Item className='header'>(campus)</Menu.Item>
                  <Menu.Item className='header'>(status)</Menu.Item>
                  <Menu.Item>(member since 2017)</Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Segment>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfileList.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ProfileList);
