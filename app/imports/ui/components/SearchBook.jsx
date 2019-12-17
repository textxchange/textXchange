import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Input, Select, Button, Icon } from 'semantic-ui-react';
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

    submit() {
        if (this.state.search !== '') {
            this.setState({ refer: true });
        }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value });
    };

    handleInputChange = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value !== '') {
                this.setState({ refer: true, search: e.target.value });
            }
        }
    };

    handleSelectChange = (e, data) => {
        this.setState({ param: data.value });
    };

    renderPage() {
        const options = [
            { key: 'title', text: 'Title', value: 'title' },
            { key: 'class', text: 'Class', value: 'class' },
            { key: 'author', text: 'Author', value: 'author' },
        ];

        if (this.state.refer === true && this.state.search !== '') {
            return <Redirect
                to={{
                    pathname: '/discover',
                    state: { search: this.state.search, param: this.state.param, redirect: true },
                }}/>;
        }
        return (
            <div className='searchBar'>
                <Input
                    fluid
                    icon
                    iconPosition='left'
                    placeholder='Search for a book now!'
                >
                    <i className='book icon'/>
                    <input style={{ borderRadius: '7000px 0px 0px 7000px' }}
                           onKeyDown={this.handleInputChange}
                           onChange={this.handleChange}/>
                    <Select style={{ borderRadius: '0px 0px 0px 0px' }}
                            compact options={options} defaultValue='title' onChange={this.handleSelectChange}/>
                    <Button type='submit'
                            icon
                            style={{ borderRadius: '0px 7000px 7000px 0px' }}
                            onClick={this.submit.bind(this)}>
                        <Icon name='search'/>
                    </Button>
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
