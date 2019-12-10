import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Card, Header, Container, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SubmitField from 'uniforms-semantic/SubmitField';
import AutoForm from 'uniforms-semantic/AutoForm';
import { withTracker } from 'meteor/react-meteor-data';
import { Books } from '../../api/book/Book';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import DiscoverBook from '../components/DiscoverBook';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allClasses) => new SimpleSchema({
  classUsed: { type: Array, label: 'Classes', optional: true },
  'classUsed.$': { type: String, allowedValues: allClasses },
});

class Discover extends React.Component {

  constructor(props) {
    super(props);
    this.state = { classUsed: [] };
  }

  submit(data) {
    this.setState({ classUsed: data.classUsed || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const allClasses = _.pluck(_.sortBy((Books.find().fetch()), 'classUsed'), 'classUsed');
    const formSchema = makeSchema(allClasses);
    // const found = _.filter(this.props.books, (book) => book.classUsed === this.state.classUsed[0]);
    return (
        <Container>
          <Header as='h1' textAlign="center">Browse</Header>
          <AutoForm schema={formSchema} onSubmit={data => this.submit(data)}>
            <Segment>
              <MultiSelectField name='classUsed' showInlineError={true} placeholder={'Choose your classes'}/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
          <Card.Group centered style={{ paddingTop: '10px' }}>
            {this.state.classUsed.map((classUsed) => {
              const found = _.filter(this.props.books, (book) => book.classUsed === classUsed);
              return found.map((book, index) => <DiscoverBook book={book} key={index}/>);
            })}
          </Card.Group>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
Discover.propTypes = {
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Book documents.
  const subscription = Meteor.subscribe('BookPublic');
  return {
    books: Books.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Discover);
