import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Input, Select } from 'semantic-ui-react';
import SubmitField from 'uniforms-semantic/SubmitField';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Books } from '../../api/book/Book';

class SearchBook extends React.Component {

    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    constructor(props) {
        super(props);
        this.state = { param: 'title', refer: false, search: '' };
    }

    submit(data) {
        this.setState({ query: data.query || '' });
    }

    handleFormSubmit = () => {
        const searchValue = this.state.query;
        if (searchValue) {
            Meteor.subscribe('BookPublic');
            return {
                books: Books.find({ name: searchValue }).fetch(),
            };
        }
        return null;
    }

    handleInputChange = (e) => {
        if (e.key === 'Enter') {
            this.setState({ refer: true, search: e.target.value });
        }
    }

    handleSelectChange = (e) => {
        this.setState({ param: e.target.value });
    }

    searchItems = (book) => {
        if (book.title.toLowerCase().includes(this.state.query.toLowerCase())) {
            return true;
        }
        if (book.classUsed.toLowerCase().includes(this.state.query.toLowerCase())) {
            return true;
        }
        if (this.state.query === '') {
            return true;
        }
        return false;
    }

    renderPage() {
        const options = [
            { key: 'title', text: 'Title', value: 'title' },
            { key: 'class', text: 'Class', value: 'class' },
            { key: 'author', text: 'Author', value: 'author' },
        ];

        if (this.state.refer === true) {
            return <Redirect
                to={{ pathname: '/discover', state: { search: this.state.search, param: this.state.param } }}/>;
        }
        return (
            <div className='searchBar'>
                <Input
                    fluid
                    icon
                    iconPosition='left'
                    placeholder='Search for a book now!'
                >
                    <i className='search icon'/>
                    <input style={{ borderRadius: '7000px 0px 0px 7000px' }} onKeyDown={this.handleInputChange}/>
                    <Select style={{ borderRadius: '0px 7000px 7000px 0px' }}
                            compact options={options} defaultValue='title' onChange={this.handleSelectChange}/>
                </Input>
            </div>
        );

    }
}

SearchBook.propTypes = {
    books: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('BookPublic');
    return {
        books: Books.find({}).fetch(),
        ready: subscription.ready(),
    };
})(SearchBook);
