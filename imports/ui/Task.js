import React, { Component } from 'react';

import { Requests } from '../api/requests.js';

// Request component - represents a single todo item
export default class Request extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Requests.update(this.props.request._id, {
      $set: { checked: !this.props.request.checked },
    });
  }

  deleteThisRequest() {
    Requests.remove(this.props.request._id);
  }

  render() {
    // Give requests a different className when they are checked off,
    //so that we can style them nicely in CSS
    const requestClassname = this.props.request.checked ? 'checked' : '';

    return (
      <li className={requestClassname}>
        <button className="delete" onClick={this.deleteThisRequest.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.request.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">
          <strong>{this.props.request.username}</strong>: {this.props.request.text}
        </span>
      </li>
    );
  }
}
