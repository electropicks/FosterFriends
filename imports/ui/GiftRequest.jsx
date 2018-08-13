import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

const initialState = {
  name: '',
  age: '',
  interests: '',
  wishlist: '',
  occasion: '',
  specific: '',
};

// Home component - represents the entry point
export default class Home extends Component {

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
          Recipient's name (optional): 
          <input
            type="text"
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          /><br/>
          Age:
          <input
            type="text"
            name='age'
            value={this.state.age}
            onChange={this.handleChange}
          /><br/>
          Interests:
          <input
            type="text"
            name='interests'
            value={this.state.interests}
            onChange={this.handleChange}
          /><br/>
          Gift Wishlist:
          <input
            type="text"
            name='wishlist'
            value={this.state.wishlist}
            onChange={this.handleChange}
          /><br/>
          Occasion/Circumstance for Gift:
          <input
            type="text"
            name='occasion'
            value={this.state.occasion}
            onChange={this.handleChange}
          /><br/>
          Any specific request for gift:
          <input
            type="text"
            name='specific'
            value={this.state.specific}
            onChange={this.handleChange}
          /><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}