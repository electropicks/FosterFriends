import React, { Component } from 'react';
import moment from 'moment/moment.js';

import GiftRequestEditor from './GiftRequestEditor.jsx';
import VolunteerRequestEditor from './VolunteerRequestEditor.jsx';
import OtherRequestEditor from './OtherRequestEditor.jsx';

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
    const confirmed = this.props.confirmDelete ?
      confirm("Delete the selected " + this.props.request.type + "?") : true;
    if (confirmed) {
      Requests.remove(this.props.request._id);
    }
  }

  render() {
    const { request } = this.props;

    // Give requests a different className when they are checked off,
    //so that we can style them nicely in CSS
    const requestClassname = request.checked ? 'checked' : '';
    
    let text = "";
    const keys = Object.keys(request.payload);
    for (let i = 0; i < keys.length; i++) {
      if (request.payload[keys[i]]) {
        // Only add leading separator if this is not the first key
        if (i > 0) {
          text += ", ";
        }
        const keyString = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
        text += keyString + ": " + request.payload[keys[i]];
      }
    }
    const requestDate = moment(request.createdAt).format("YYYY/MM/DD");

    return (
      <li className={requestClassname}>
        <button className="delete" onClick={this.delete}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!request.checked}
          onChange={this.handleInputChange}
        />
        {request.type === 'Gift Request' &&
          <GiftRequestEditor btnClass='btn btn-outline-primary btn-sm' initialState={request}/>
        }
        {request.type === 'Volunteer Request' &&
          <VolunteerRequestEditor btnClass='btn btn-outline-primary btn-sm' initialState={request}/>
        }
        {request.type === 'Other Request' &&
          <OtherRequestEditor btnClass='btn btn-outline-primary btn-sm' initialState={request}/>
        }
        <span className="text">
          On {requestDate}, <strong>{request.username}</strong> submitted a {request.type}:
          <span className="request">{text}</span>
        </span>
      </li>
    );
  }
}
