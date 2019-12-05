import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Book extends React.Component {
  render() {
    const right = { float: 'right' };
    const noPadding = { paddingBottom: '7px' };

    return (
        <Card>
          <Image className='book-image' src={this.props.book.image}/>
          <Card.Content>
            <Card.Header>{this.props.book.title}</Card.Header>
            <Card.Meta>{this.props.book.author}</Card.Meta>
            <Card.Description> {this.props.book.description} </Card.Description>
          </Card.Content>
          <Card.Content style={noPadding}>
            <Card.Meta>
              <Image className='profile-pic' floated='left'
                     /* eslint-disable-next-line max-len */
                     src='https://media.discordapp.net/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png'/>
              $ {this.props.book.cost}
              <span style={right}> Posted {this.props.book.datePosted.toLocaleDateString()} </span>
            </Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Book.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Book);
