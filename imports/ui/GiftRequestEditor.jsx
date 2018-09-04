import React, { Component } from 'react';
import { Requests } from '../api/requests.js';
import Modal from './Modal.jsx';

const defaultState = {
  type: 'Gift Request',
  payload: {
    name: '',
    age: '',
    interests: '',
    wishlist: '',
    occasion: '',
    specific: '',  
  },
};

export default class GiftRequestEditor extends Component {

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
      owner: Meteor.userId(),
      username: Meteor.user().username,
    };
    if (!request._id) {
      request.createdAt = now;
    } else {
      request.modifiedAt = now;
    }

    Requests.upsert({
      _id: request._id,
    }, {
      $set: {
        ...request,
      }
    });

    const action = request._id ? 'updated' : 'created';
    Bert.alert('Gift Request ' + action + ' successfully', 'info', 'growl-top-right' );

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
        btnLabel={this.state._id ? 'Edit' : 'Request Gift for a Child'}
        title='Gift Request'
        onCancel={this.reset}
        onSubmit={this.handleSubmit}
        createMode={this.state._id ? false : true}>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Recipient's Name</label>
              <input
                name='name'
                type="text"
                className="form-control"
                placeholder="Enter first and last name"
                value={this.state.payload.name}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">The recipient name is optional</small>
            </div>
            <div className="form-group">
              <label>Recipient's Age</label>
              <input
                name='age'
                type="text"
                className="form-control"
                placeholder="Enter age"
                value={this.state.payload.age}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Interests</label>
              <input
                name='interests'
                type="text"
                className="form-control"
                placeholder="Enter interests..."
                value={this.state.payload.interests}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gift Wishlist</label>
              <input
                name='wishlist'
                type="text"
                className="form-control"
                placeholder="Enter wishlist..."
                value={this.state.payload.wishlist}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Occasion/Circumstance for Gift</label>
              <input
                name='occasion'
                type="text"
                className="form-control"
                placeholder="Enter occasion or circumstance..."
                value={this.state.payload.occasion}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Any specific request for gift</label>
              <input
                name='specific'
                type="text"
                className="form-control"
                placeholder="Enter specific request if any..."
                value={this.state.payload.specific}
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}