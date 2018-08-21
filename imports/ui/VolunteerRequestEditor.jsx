import React, { Component } from 'react';
import { Requests } from '../api/requests.js';
import Modal from './Modal.jsx';

const defaultState = {
  type: 'Volunteer Request',
  payload: {
    request: '',
    number: '',
    date: '',
    other: '',
    },
};

export default class VolunteerRequestEditor extends Component {

  constructor(props) {
    super(props);
    // Override default with props as needed
    const initialState = this.props.initialState || defaultState;
    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    this.setState({
      payload: {
        ...this.state.payload,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleSubmit = () => {
    const now = new Date();
    const request = {
      ...this.state,
      modifiedAt: now,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };
    if (!request._id) {
      request.createdAt = now;
    }

    Requests.upsert({
      _id: request._id,
    }, {
      $set: {
        ...request,
      }
    });

    const action = request._id ? 'updated' : 'created';
    Bert.alert('Volunteer Request ' + action + ' successfully', 'info', 'growl-top-right' );

    this.reset();
  }

  reset = () => {
    this.setState({
      ...defaultState,
    });
  }

  render() {
    return (
      <Modal
        btnClass={this.props.btnClass}
        btnLabel={this.state._id ? 'Edit' : 'Enter New Volunteer Request'}
        title='Volunteer Request'
        onCancel={this.reset}
        onSubmit={this.handleSubmit}
        createMode={this.state._id ? false : true}>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Description of Volunteer Request</label>
              <input
                name='request'
                type="text"
                className="form-control"
                placeholder="Enter request..."
                value={this.state.payload.request}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Number of volunteers needed</label>
              <input
                name='number'
                type="text"
                className="form-control"
                placeholder="Enter number of volunteers..."
                value={this.state.payload.number}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date(s) needed</label>
              <input
                name='date'
                type="text"
                className="form-control"
                placeholder="Enter date(s)..."
                value={this.state.payload.date}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Any other information</label>
              <input
                name='other'
                type="text"
                className="form-control"
                placeholder="Enter other information..."
                value={this.state.payload.other}
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}