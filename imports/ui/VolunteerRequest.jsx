import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Requests } from '../api/requests.js';

const initialState = {
  request: '',
  number: '',
  date: '',
  other: '',
};

// Home component - represents the entry point
export default class VolunteerRequest extends Component {

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
      type: 'Volunteer Request',
      payload: { ...this.state },
      createdAt: new Date(), //current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    console.log(this.state);
    this.setState({
      ...initialState,
    });

  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          Description of Volunteer Request
          <input
            type="text"
            name='request'
            value={this.state.request}
            onChange={this.handleChange}
          /><br/>
          Number of Volunteers Needed:
          <input
            type="text"
            name='number'
            value={this.state.number}
            onChange={this.handleChange}
          /><br/>
          Date(s) needed:
          <input
            type="text"
            name='date'
            value={this.state.date}
            onChange={this.handleChange}
          /><br/>
          Any other information:
          <input
            type="text"
            name='other'
            value={this.state.other}
            onChange={this.handleChange}
          /><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}