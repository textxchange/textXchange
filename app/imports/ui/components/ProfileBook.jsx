import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Books } from '/imports/api/book/Book';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileBook extends React.Component {

  delete(id) {
    Books.remove(id);
    this.setState({ open: false });
  }

  edit(id) {
    return <Redirect to={'/'}/>;
  }

  state = { open: false }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

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
              {/* eslint-disable-next-line max-len */}
              <Image className='profile-pic' floated='left'
                     /* eslint-disable-next-line max-len */
                     src='https://media.discordapp.net/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png'/>
              $ {this.props.book.cost}
              <span style={right}> Posted {this.props.book.datePosted.toLocaleDateString()} </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='red' onClick={this.open}>
                Delete
              </Button>
              <Confirm
                  open={this.state.open}
                  onCancel={this.close}
                  onConfirm={() => this.delete(this.props.book._id)}
              />
              <Button basic color='green'>
                Edit
              </Button>
            </div>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileBook.propTypes = {
  book: PropTypes.object.isRequired,
  Books: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileBook);
