import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Card, Header, Container, Loader, Segment, Form, Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SubmitField from 'uniforms-semantic/SubmitField';
import TextField from 'uniforms-semantic/TextField';
import AutoForm from 'uniforms-semantic/AutoForm';
import { withTracker } from 'meteor/react-meteor-data';
import { Books } from '../../api/book/Book';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import DiscoverBook from '../components/DiscoverBook';
import DiscoverMessage from '../components/DiscoverMessage';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allClasses) => new SimpleSchema({
  classUsed: { type: Array, label: 'Classes', optional: true },
  'classUsed.$': { type: String, allowedValues: allClasses },
  title: { type: String, label: 'Title of Book', optional: true },
  author: { type: String, label: 'Author of Book', optional: true },
});

class Discover extends React.Component {

  constructor(props) {
    super(props);
    this.state = { classUsed: [], param: 'title', search: false };
  }

  handleChange = (e, { value }) => this.setState({ param: value });

  submit(data) {
    if (this.state.param === 'class') {
      this.setState({ classUsed: data.classUsed || [] });
    } else
      if (this.state.param === 'title') {
        const re = new RegExp(data.title, 'gi');
        this.setState({ search: true, books: Books.find({ title: re }).fetch() });
      } else
        if (this.state.param === 'author') {
          const re = new RegExp(data.author, 'gi');
          this.setState({ search: true, books: Books.find({ author: re }).fetch() });
        }

    return null;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // eslint-disable-next-line react/prop-types
    const allClasses = _.uniq(_.pluck(_.sortBy((Books.find().fetch()), 'classUsed'), 'classUsed'));
    const formSchema = makeSchema(allClasses);
    // const found = _.filter(this.props.books, (book) => book.classUsed === this.state.classUsed[0]);
    return (
        <Container className='browse'>
          <Header as='h1' textAlign="center">Browse</Header>
          <DiscoverMessage/>
          <AutoForm schema={formSchema} onSubmit={data => this.submit(data)}>
            <Segment>
              {/* eslint-disable-next-line no-nested-ternary */}
              {this.state.param === 'class' ? (
                  <MultiSelectField name='classUsed' showInlineError={true} placeholder={'Search by classes'}/>
              ) : this.state.param === 'title' ? (
                  <TextField name='title' placeholder={'Search by book title'}/>
              ) : <TextField name='author' placeholder={'Search by book author'}/>
              }
              <Form.Group inline>
                <Form.Field>
                  <Radio label='Title'
                         value='title'
                         checked={this.state.param === 'title'}
                         onClick={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                  <Radio label='Author'
                         value='author'
                         checked={this.state.param === 'author'}
                         onClick={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                  <Radio label='Class Used'
                         value='class'
                         checked={this.state.param === 'class'}
                         onClick={this.handleChange}/>
                </Form.Field>
              </Form.Group>
              <SubmitField value='Search'/>
            </Segment>
          </AutoForm>
          <Card.Group centered style={{ paddingTop: '10px' }}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {this.state.param === 'class' ? (
                this.state.classUsed.map((classUsed) => {
                  const found = _.filter(this.props.books, (book) => book.classUsed === classUsed);
                  return found.map((book, index) => <DiscoverBook book={book} key={index}/>);
                })
            ) : this.state.search ? (
                this.state.books.map((book, index) => <DiscoverBook book={book} key={index}/>)
            ) : ''}
          </Card.Group>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
Discover.propTypes = {
  books: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('BookPublic');
  return {
    ready: subscription.ready(),
    books: Books.find().fetch(),
  };
})(Discover);
