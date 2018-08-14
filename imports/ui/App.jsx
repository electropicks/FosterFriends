import React, { Component } from 'react';
import ReactDOM from'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter } from 'react-router-dom'

import { Requests } from '../api/requests.js';

import Request from './Request.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    //Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Requests.insert({
      text,
      createdAt: new Date(), //current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderRequests() {
    let filteredRequests = this.props.requests;
    if (this.state.hideCompleted) {
      filteredRequests = filteredRequests.filter(request => !request.checked);
    }
    return filteredRequests.map((request) => (
      <Request key={request._id} request={request} />
    ));
  }

  render() {
    return(
      <div className="container">
        <header>
          <h1>Request List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Requests
          </label>


          { this.props.currentUser ?
          <form className="new-request" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref= "textInput"
              placeholder="Type to add new requests"
            />
          </form> : ''
        }  
        </header>

        <ul>
          {this.renderRequests()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    requests: Requests.find({}, { sort: { createdAt: -1} }).fetch(),
    incompleteCount: Requests.find({ checked: { $ne: true} }).count(),
    currentUser: Meteor.user(),
  };
})(App);
