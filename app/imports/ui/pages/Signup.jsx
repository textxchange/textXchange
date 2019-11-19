import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profile';
import swal from 'sweetalert';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */

const options = [
  { key: 'm', text: 'Mānoa', value: 'manoa' },
  { key: 'h', text: 'Hilo', value: 'hilo' },
  { key: 'ha', text: 'Hawaiʻi', value: 'hawaii' },
  { key: 'ho', text: 'Honolulu', value: 'honolulu' },
  { key: 'k', text: 'Kapiʻolani', value: 'kapiolani' },
  { key: 'ka', text: 'Kauaʻi', value: 'kauai' },
  { key: 'le', text: 'Leeward', value: 'leeward' },
  { key: 'ma', text: 'Maui', value: 'maui' },
  { key: 'wi', text: 'Windward', value: 'winward' },
  { key: 'wo', text: 'West Oʻahu', value: 'westoahu' },
]

class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '',firstName:'',lastName:'',studentID:'',campus:'', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, studentId, campus } = this.state;
    Accounts.createUser({ email, username: email, password, firstName, lastName, studentId, campus }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Profiles.insert({ firstName, lastName, studentId, campus, owner: email },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'Profile created successfully', 'success');
              }
            });
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit} inverted>
              <Segment stacked inverted>
                <Header as="h5" textAlign="center">
                  Account Information
                </Header>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                    label="Re-enter Password"
                    icon="lock"
                    iconPosition="left"
                    name="re-enter password"
                    placeholder="re-enter password"
                    type="password"
                    onChange={this.handleChange}
                />
                <Header as="h5" textAlign="center">
                  Student Information
                </Header>
                <Form.Group widths={'equal'}>
                  <Form.Input fluid label='First name' placeholder='First name' name="firstName" type="firstName" onChange={this.handleChange} />
                  <Form.Input fluid label='Last name' placeholder='Last name' name="lastName" type="lastName" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <Form.Input fluid label='Student ID Number' placeholder='XXXXXXXX' name="studentId" type="studentId" onChange={this.handleChange}/>
                  <Form.Select
                      fluid
                      label='Campus'
                      options={options}
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
