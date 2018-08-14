import React, { Component } from 'react';

import { Requests } from '../api/requests.js';

// Request component - represents a single todo item
export default class Request extends Component {

  handleInputChange = () => {
    // Set the checked property to the opposite of its current value
    Requests.update(this.props.request._id, {
      $set: { checked: !this.props.request.checked },
    });
  }

  delete = () => {
    Requests.remove(this.props.request._id);
  }

  render() {
    // Give requests a different className when they are checked off,
    //so that we can style them nicely in CSS
    const requestClassname = this.props.request.checked ? 'checked' : '';
    
    const text = JSON.stringify(this.props.request.payload);
    const requestDate = this.props.request.createdAt.toString("YYYY/MM/DD");

    return (
      <li className={requestClassname}>
        <button className="delete" onClick={this.delete}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.request.checked}
          onChange={this.handleInputChange}
        />

        <span className="text">
          {requestDate} <strong>{this.props.request.username}</strong>: {text}
        </span>
      </li>
    );
  }
}
