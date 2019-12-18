import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Header, Loader, Radio, Segment } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/Profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SimpleSchema from 'simpl-schema';
import { Books } from '../../api/book/Book';
import AdminBook from '../components/AdminBook';
import DiscoverMessage from '../components/DiscoverMessage';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allClasses) => new SimpleSchema({
    classUsed: { type: Array, label: 'Classes', optional: true },
    'classUsed.$': { type: String, allowedValues: allClasses },
    title: { type: String, label: 'Title of Book', optional: true },
    author: { type: String, label: 'Author of Book', optional: true },
});

class ProfileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { classUsed: [], param: 'title', search: false };
    }

    editProfile(id) {
        // eslint-disable-next-line react/prop-types
        this.props.history.push(`/profile/edit/${id}`);
    }

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    submit(data) {
        if (this.state.param === 'class') {
            this.setState({ classUsed: data.classUsed || [] });
        } else if (this.state.param === 'title') {
            const re = new RegExp(data.title, 'gi');
            this.setState({ search: true, books: Books.find({ title: re }).fetch() });
        } else if (this.state.param === 'author') {
            const re = new RegExp(data.author, 'gi');
            this.setState({ search: true, books: Books.find({ author: re }).fetch() });
        }

        return null;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        // eslint-disable-next-line react/prop-types
        const allClasses = _.uniq(_.pluck(_.sortBy((Books.find().fetch()), 'classUsed'), 'classUsed'));
        const formSchema = makeSchema(allClasses);
        // const found = _.filter(this.props.books, (book) => book.classUsed === this.state.classUsed[0]);
        return (
            <Container className='browse'>
                <Header as='h1' textAlign="center">Admin Page</Header>
                <AutoForm schema={formSchema} onSubmit={data => this.submit(data)}>
                    <Segment>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {this.state.param === 'class' ? (
                            <MultiSelectField name='classUsed' showInlineError={true}
                                              placeholder={'Search by classes'}/>
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
                            return found.map((book, index) => <AdminBook book={book} key={index}/>);
                        })
                    ) : this.state.search ? (
                        this.state.books.map((book, index) => <AdminBook book={book} key={index}/>)
                    ) : ''}
                </Card.Group>
            </Container>
        );
    }
}

/** Require an array of Book & Profile documents in the props. */
ProfileList.propTypes = {
    profile: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Book documents.
    const subscription = Meteor.subscribe('Profile');
    const bookSub = Meteor.subscribe('BookPublic');

    return {
        profile: Profiles.find({}).fetch(),
        books: Books.find({}).fetch(),
        ready: subscription.ready() && bookSub.ready(),
    };
})(ProfileList);
