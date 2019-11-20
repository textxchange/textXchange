import React from 'react';
import { Card, Header, Container, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Discover extends React.Component {
  render() {
    return (
        <Container>
          <Header as='h1' textAlign="center" inverted>Browse</Header>
          <Card.Group centered>
            <Card>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                  <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content>
            </Card>
            <Card>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                  <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content>
            </Card>
            <Card>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                  <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
Discover.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Discover);
