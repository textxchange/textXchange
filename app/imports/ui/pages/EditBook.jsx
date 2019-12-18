import React from 'react';
import { Books } from '/imports/api/book/Book';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker'; // required for Uniforms
import { Redirect } from 'react-router-dom';

const formSchema = new SimpleSchema({
  ISBN: { type: Number, label: 'ISBN' },
  title: String,
  author: String,
  yearPublished: Date,
  description: String,
  cost: {
    type: Number,
    min: 0,
  },
  classUsed: String,
  datePosted: { type: Date, defaultValue: new Date() },
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good' },
}, { tracker: Tracker });

/** Renders the Page for adding a document. */
class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferer: false,
    };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { ISBN, title, author, yearPublished, description, cost, classUsed, datePosted, condition, _id } = data;
    const image = `http://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`;
    const owner = Meteor.user().username;
    Books.update(_id,
        // eslint-disable-next-line max-len
        {
          $set: {
            ISBN,
            title,
            author,
            yearPublished,
            description,
            cost,
            classUsed,
            datePosted,
            condition,
            _id,
            owner,
            image,
          },
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Book Edited successfully', 'success');
            formRef.reset();
            this.setState({ error: '', redirectToReferer: true });
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to={'/profile'}/>;
    }

    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit a Book</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} model={this.props.doc}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='title'/>
                  <TextField name='author'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='yearPublished'/>
                  <NumField name='ISBN' decimal={false}/>
                </Form.Group>
                <LongTextField name='description'/>
                <Form.Group widths={'equal'}>
                  <NumField iconLeft='dollar' name='cost' decimal={true}/>
                  <TextField name='classUsed'/>
                  <SelectField name='condition'/>
                </Form.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Book document in the props object. Uniforms adds 'model' to the props, which we use. */
EditBook.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Book documents.
  const subscription = Meteor.subscribe('Book');
  return {
    doc: Books.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditBook);
