import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class DiscoverMessage extends Component {
  state = { visible: true }

  handleDismiss = () => {
    this.setState({ visible: false });
  }

  handleExpand = () => {
    this.setState({ visible: true });
  }

  render() {
    if (this.state.visible) {
      return (
          <Message
              onDismiss={this.handleDismiss}>
            <Message.Header>Search for books!</Message.Header>
            <p>You can search for books with three options</p>
            <ul>
              <li>
                Click on <b>Title</b> to search for books by title
              </li>
              <li>
                Click on <b>Author</b> to search for books by author
              </li>
              <li>
                Click on <b>Class Used</b> to search for books by your classes
                <ul>
                  <li>
                    You may search by as many classes as needed
                  </li>
                </ul>
              </li>
            </ul>
          </Message>
      );
    }

    return (
        <Message hidden/>
    );
  }
}

export default DiscoverMessage;