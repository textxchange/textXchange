import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Loader, Input, Popup } from 'semantic-ui-react';
import Book from '/imports/ui/components/Book';
import SubmitField from 'uniforms-semantic/SubmitField';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';
import DiscoverBook from './DiscoverBook';

class SearchBook extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  submit(data) {
    this.setState({ query: data.query || '' });
  }

  handleFormSubmit = () => {
    const searchValue = this.state.query;
    if (searchValue) {
      Meteor.subscribe('BookPublic');
      return {
        books: Books.find({ name: searchValue }).fetch(),
      };
    }
    return null;
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  }

  searchItems = (book) => {
    if (book.title.toLowerCase().includes(this.state.query.toLowerCase())) {
      return true;
    }
    if (book.classUsed.toLowerCase().includes(this.state.query.toLowerCase())) {
      return true;
    }
    if (this.state.query === '') {
      return true;
    }
    return false;
  }

  renderPage() {
    return (
        <div>
          <Popup
            trigger={
              <Input
                  icon='search'
                  type='text'
                  placeholder='Enter Book Title or Class'
                  value={this.state.query}
                  onChange={this.handleInputChange}
                  onSubmit={this.handleFormSubmit}
                  //action={<SubmitField value='Submit'/>}
                  />
            }
            on='click'
            flowing
            content={
              <Card.Group itemsPerRow={4}>
                {this.props.books.filter(this.searchItems).map((book, index) => <DiscoverBook key={index}
                                                                                      book={book} />)}
              </Card.Group>
            }
          />
        </div>
    );
  }
}
SearchBook.propTypes = {
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('BookPublic');
  return {
    books: Books.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SearchBook);
