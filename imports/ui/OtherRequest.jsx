import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Requests } from '../api/requests.js';

const initialState = {
  request: '',
};

// Home component - represents the entry point
export default class OtherRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    Requests.insert({
      type: 'Other Request',
      payload: { ...this.state },
      createdAt: new Date(), //current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    this.setState({
      ...initialState,
    });

  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          Other Request:<br/>
          <textarea
            name='request'
            value={this.state.request}
            onChange={this.handleChange}
          /><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}