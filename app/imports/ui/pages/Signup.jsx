import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */

class Signup extends React.Component {
    /** Initialize state fields. */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            campus: '',
            description: 'No description',
            image: 'https://react.semantic-ui.com/images/wireframe/image.png',
            error: '',
            redirectToReferer: false,
        };
        this.state = {
            email: '',
            password: '',
            repassword: '',
            firstName: '',
            lastName: '',
            campus: '',
            description: 'No description',
            image: 'https://react.semantic-ui.com/images/wireframe/image.png',
            error: '',
            redirectToReferer: false,
        };
    }

    /** Update the form controls each time the user interacts with them. */
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
    handleSubmit = () => {
        const { email, password, repassword, firstName, lastName, campus, image } = this.state;
        // perform all neccassary validations

        if (password !== repassword) {
            this.setState({ error: 'Passwords do not match, Please re-enter your passwords again.' });
        } else if (!email.includes('@hawaii.edu')) {
            this.setState({ error: 'Email must be from the UH system (ending in @hawaii.edu)' });
        } else {
            Accounts.createUser({ email, username: email, password, firstName, lastName, campus }, (err) => {
                if (err) {
                    this.setState({ error: err.reason });
                } else {
                    Profiles.insert({ firstName, lastName, campus, description: 'No description', image, owner: email },
                        (error) => {
                            if (error) {
                                swal('Error', error.message, 'error');
                            } else {
                                // eslint-disable-next-line max-len
                                swal('Success', 'Profile created successfully, please check your email for confirmation', 'success');
                            }
                        });
                    this.setState({ error: '', redirectToReferer: true });
                    Meteor.call('verification');
                    Meteor.logout();
                }
            });
        }
    }

    /** Display the signup form. Redirect to add page after successful registration and login. */
    render() {
        const options = [
            { key: 'm', text: 'Mānoa', value: 'Mānoa' },
            { key: 'h', text: 'Hilo', value: 'Hilo' },
            { key: 'ha', text: 'Hawaiʻi', value: 'Hawaiʻi' },
            { key: 'ho', text: 'Honolulu', value: 'Honolulu' },
            { key: 'k', text: 'Kapiʻolani', value: 'Kapiʻolani' },
            { key: 'ka', text: 'Kauaʻi', value: 'Kauaʻi' },
            { key: 'le', text: 'Leeward', value: 'Leeward' },
            { key: 'ma', text: 'Maui', value: 'Maui' },
            { key: 'wi', text: 'Windward', value: 'Windward' },
            { key: 'wo', text: 'West Oʻahu', value: 'West Oʻahu' },
        ];

        // if correct authentication, redirect to from: page instead of signup screen
        if (this.state.redirectToReferer) {
            return <Redirect to={'/signin'}/>;
        }
        return (
            <Container>
                <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center">
                            Register your account
                        </Header>
                        <Form onSubmit={this.handleSubmit} inverted>
                            <Segment stacked inverted>
                                <Header as="h5" textAlign="center">
                                    Account Information
                                </Header>
                                <Form.Input
                                    label="Email"
                                    icon="user"
                                    iconPosition="left"
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="E-mail address"
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    label="Password"
                                    icon="lock"
                                    iconPosition="left"
                                    required
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    label="repassword"
                                    icon="lock"
                                    iconPosition="left"
                                    name="repassword"
                                    required
                                    placeholder="repassword"
                                    type="password"
                                    onChange={this.handleChange}
                                />

                                <Header as="h5" textAlign="center">
                                    Student Information
                                </Header>
                                <Form.Group widths={'equal'}>
                                    <Form.Input fluid label='First name' placeholder='First name' name="firstName"
                                                type="firstName"
                                                onChange={this.handleChange} required/>
                                    <Form.Input fluid label='Last name' placeholder='Last name' name="lastName"
                                                type="lastName"
                                                onChange={this.handleChange} required/>
                                </Form.Group>
                                <Form.Group widths={'equal'}>
                                    <Form.Select
                                        fluid
                                        label='Campus'
                                        options={options}
                                        required
                                        placeholder='Campus'
                                        name="campus"
                                        type="campus"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Button content="Submit"/>
                            </Segment>
                        </Form>
                        <Message color='black'>
                            Have an account with us? <Link to="/signin">Sign in</Link>
                        </Message>

                        {this.state.error === '' ? (
                            ''
                        ) : (
                            <Message
                                error
                                header="Registration was not successful"
                                content={this.state.error}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
    location: PropTypes.object,
};

export default Signup;
