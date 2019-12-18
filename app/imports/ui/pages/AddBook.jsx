import React from 'react';
import { Books } from '/imports/api/book/Book';
import { Grid, Segment, Header, Form, Popup } from 'semantic-ui-react';
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
import { Tracker } from 'meteor/tracker'; // required for Uniforms

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
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Renders the Page for adding a document. */
class AddBook extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { ISBN, title, author, yearPublished, description, cost, classUsed, datePosted, condition } = data;
    const image = `http://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`;
    const owner = Meteor.user().username;
    Books.insert(
        { ISBN, title, author, yearPublished, description, cost, owner, classUsed, image, datePosted, condition },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        },
);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" >Sell a Book</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='title'/>
                  <TextField name='author'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='yearPublished'/>
                  <NumField name='ISBN' decimal={false}/>
                </Form.Group>
                <LongTextField name='description' placeholder=
                    'What does this book cover? Was it helpful? Was it mandatory?
                Now is your chance to tell the community!'/>
                <Form.Group widths={'equal'}>
                  <NumField iconLeft='dollar' name='cost' decimal={true} min='0' />
                  <Popup
                      trigger={<TextField name='classUsed'/>}
                      header='Use the course&apos;s abbreviated name and number'
                      content='i.e: ICS 111, CHEM 161, etc.'
                      on='focus'
                      wide
                  />
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

export default AddBook;
