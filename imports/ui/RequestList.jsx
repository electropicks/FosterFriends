import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Requests } from '../api/requests.js';
import Request from './Request.jsx';

// Request List component - provides list of requests
class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showGiftRequests: true,
      showVolunteerRequests: true,
      showOtherRequests: true,
      confirmDelete: true,
      hideCompleted: false,
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  renderRequests() {
    let filteredRequests = this.props.requests;
    if (this.props.currentUser) {
      if (this.props.currentUser.username !== 'admin') {
        filteredRequests = filteredRequests.filter(request => request.username === this.props.currentUser.username);
      }  
    }
    if (!this.state.showGiftRequests) {
      filteredRequests = filteredRequests.filter(request => request.type !== 'Gift Request');
    }
    if (!this.state.showVolunteerRequests) {
      filteredRequests = filteredRequests.filter(request => request.type !== 'Volunteer Request');
    }
    if (!this.state.showOtherRequests) {
      filteredRequests = filteredRequests.filter(request => request.type !== 'Other Request');
    }
    if (this.state.hideCompleted) {
      filteredRequests = filteredRequests.filter(request => !request.checked);
    }
    return filteredRequests.map((request) => (
      <Request
        key={request._id}
        request={request}
        confirmDelete={this.state.confirmDelete}
      />
    ));
  }

  render() {
    return(
      <div>
        <header>
          <h1>Request List ({this.props.incompleteCount})</h1>
          <br/>
          <label className="filter-box">
            <input
              type="checkbox"
              name="showGiftRequests"
              checked={this.state.showGiftRequests}
              onChange={this.handleInputChange}
            />
            Gift Requests
          </label>
          <label className="filter-box">
            <input
              type="checkbox"
              name="showVolunteerRequests"
              checked={this.state.showVolunteerRequests}
              onChange={this.handleInputChange}
            />
            Volunteer Requests
          </label>
          <label className="filter-box">
            <input
              type="checkbox"
              name="showOtherRequests"
              checked={this.state.showOtherRequests}
              onChange={this.handleInputChange}
            />
            Other Requests
          </label>
          <label className="hide-completed">
            <input
              type="checkbox"
              name="confirmDelete"
              checked={this.state.confirmDelete}
              onChange={this.handleInputChange}
            />
            Confirm Delete
          </label>
          <label className="hide-completed">
            <input
              type="checkbox"
              name="hideCompleted"
              checked={this.state.hideCompleted}
              onChange={this.handleInputChange}
            />
            Hide Completed Requests
          </label>
          <br/>
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
})(RequestList);
