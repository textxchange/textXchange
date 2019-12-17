import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Profiles, ProfileSchema } from '/imports/api/profile/Profile';
import { Redirect } from 'react-router-dom';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }

    /** On successful submit, insert the data. */
    submit(data) {
        const { firstName, lastName, campus, description, image, owner, _id } = data;
        Profiles.update(_id, { $set: { firstName, lastName, campus, description, image, owner } }, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Profile updated successfully', 'success')));
        this.setState({ redirect: true });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        if (this.state.redirect !== true) {
            return (
                <Grid container centered>
                    <Grid.Column>
                        <Header as="h2" textAlign="center">Edit Profile</Header>
                        <AutoForm schema={ProfileSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
                            <Segment>
                                <TextField name='firstName'/>
                                <TextField name='lastName'/>
                                <TextField name='campus'/>
                                <TextField name='image'/>
                                <LongTextField name='description'/>
                                <SubmitField value='Submit'/>
                                <ErrorsField/>
                                <HiddenField name='owner'/>
                            </Segment>
                        </AutoForm>
                    </Grid.Column>
                </Grid>
            );
        }
        return <Redirect to={{ pathname: '/profile' }}/>;

    }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Profile');
    return {
        doc: Profiles.findOne(documentId),
        ready: subscription.ready(),
    };
})(EditProfile);
