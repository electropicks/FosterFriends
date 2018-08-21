import React, { Component } from 'react';
import { Requests } from '../api/requests.js';
import Modal from './Modal.jsx';

const defaultState = {
  type: 'Other Request',
  payload: {
    request: '',
  },
};

export default class OtherRequestEditor extends Component {

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
    Bert.alert('Other Request ' + action + ' successfully', 'info', 'growl-top-right' );

    this.reset();
  }

  reset = () => {
    // Only reset state if issue was created, otherwise
    // keep it intact for future edits
    if (!this.state._id) {
      this.setState({
        ...defaultState,
      });  
    }
  }

  render() {
    return (
      <Modal
        btnClass={this.props.btnClass}
        btnLabel={this.state._id ? 'Edit' : 'Enter New Other Request'}
        title='Other Request'
        onCancel={this.reset}
        onSubmit={this.handleSubmit}
        createMode={this.state._id ? false : true}>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Other Request</label>
              <textarea
                name='request'
                className="form-control"
                placeholder="Enter request..."
                rows='6'
                value={this.state.payload.request}
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}