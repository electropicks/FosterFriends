import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

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

    Tasks.insert({
      type: 'OtherRequest',
      text: JSON.stringify(this.state),
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