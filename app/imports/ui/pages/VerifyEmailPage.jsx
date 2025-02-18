import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

class VerifyEmailPage extends React.Component {
    constructor() {
        super();
        this.state = { refer: false };
    }

    componentDidMount() {
        const token = this.props.token;
        Accounts.verifyEmail(token, (err) => {
            if (err) {
                swal('Error', 'Could not verify email! ', 'error');
                Meteor.logout();
            } else {
                swal('Success', 'Email confirmed successfully!', 'success');
                this.setState({ refer: true });
            }
        });
    }

    update() {
        if (this.state === '') {
            this.setState = 'update';
            this.forceUpdate();
        }
    }

    render() {
        return (
            <Redirect to={'/profile'} />
        );
    }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
VerifyEmailPage.propTypes = {
    token: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => ({
    token: match.params.token,
}))(VerifyEmailPage);
