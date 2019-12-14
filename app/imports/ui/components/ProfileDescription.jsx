import React from 'react';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { Profiles, ProfileSchema } from '../../api/profile/Profile';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  description: String,
}, { tracker: Tracker });

class ProfileDescription extends React.Component {

  submit(data, formRef) {
    const {description, owner} = data;
    /* Update profile here */
  }

  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField label="Description" name='description-field'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
    );
  }

}

export default ProfileDescription;
