import React from 'react';
import { Card, Image, Label, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class DiscoverBook extends React.Component {
  render() {
    const right = { float: 'right' };
    const noPadding = { paddingBottom: '7px' };

    return (
        <Card>
          <Image className='book-image' src={this.props.book.image}/>
          <Card.Content>
            <Card.Header>{this.props.book.title}</Card.Header>
            <Card.Meta>{this.props.book.author}</Card.Meta>
            <Card.Description>
              <Popup
                  content={this.props.book.description}
                  on='click'
                  trigger={<Button content='View Description' />}
              />
              <Label tag floated='right'>
                {this.props.book.classUsed}
              </Label>
            </Card.Description>
          </Card.Content>
          <Card.Content style={noPadding}>
            <Card.Meta>
              <Image className='profile-pic' floated='left'
                     /* eslint-disable-next-line max-len */
                     src='https://media.discordapp.net/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png'/>
              $ {this.props.book.cost}
              <span style={right}> Posted {this.props.book.datePosted.toLocaleDateString()} </span>
              <span style={right}> Owned by {this.props.book.owner}</span>
            </Card.Meta>
              <Card.Content extra>
                  <div className='ui two buttons'>
                      <Button basic color='green' pointing="top right" text="Buy Book" as={NavLink} exact
                              to={{ pathname: "/buybook", select: this.props.book }}>
                          Buy Book
                      </Button>
                  </div>
              </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
DiscoverBook.propTypes = {
  book: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DiscoverBook);
