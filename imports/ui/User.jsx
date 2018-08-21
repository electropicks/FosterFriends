import React, { Component } from 'react';
import moment from 'moment/moment.js';

// User component - represents a single user
export default class User extends Component {

  delete = () => {
    const confirmed = this.props.confirmDelete ?
      confirm("Delete the selected user?") : true;
    if (confirmed) {
      Meteor.users.remove(this.props.user._id);
    }
  }

  render() {
    const { user } = this.props;

    const agency = user.profile && user.profile.agency;
    const contact = user.profile && user.profile.contact;

    return (
      <li>
        <button className="delete" onClick={this.delete}>
          &times;
        </button>

        <span>User Name: {user.username}, Agency Name: {agency}, Agency Contact: {contact}</span>
      </li>
    );
  }
}
