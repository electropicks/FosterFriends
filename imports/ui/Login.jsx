import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from './Modal.jsx';
import { Redirect } from 'react-router-dom';

// Home component - represents the entry point
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      agency: '',
      contact: '',
      login: true,
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.login) {
      Meteor.loginWithPassword(this.state.username, this.state.password, (error) => {
        if (error) {
          alert('Login failed: ' + error.reason);
        }
      });  
    } else {
      if (this.state.password && this.state.confirm &&
        this.state.password !== this.state.confirm) {
        alert('Error: passwords do not match');
        return;
      }
      Accounts.createUser({
        username: this.state.username,
        password: this.state.password,
        profile: {
          agency: this.state.agency,
          contact: this.state.contact,
        },
       }, (error) => {
        if (error) {
          alert('Registration failed: ' + error.reason);
        }
      });
    }
  }

  toggleLogin = (e) => {
    e.preventDefault();
    this.setState({
      login: !this.state.login,
    })
  }

  render() {
    return (
      <div className='login-panel'>
        <h1 className='title'>Foster Friends</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name='username'
              type="text"
              className="form-control"
              placeholder="Enter username..."
              value={this.state.username}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">
              The username is case sensitive and spaces are not allowed
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name='password'
              type="password"
              className="form-control"
              placeholder="Enter password..."
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {!this.state.login &&
            <div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  name='confirm'
                  type="password"
                  className="form-control"
                  placeholder="Confirm password..."
                  value={this.state.confirm}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Agency Name</label>
                <input
                  name='agency'
                  type="text"
                  className="form-control"
                  placeholder="Enter agency name..."
                  value={this.state.agency}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Agency Contact</label>
                <input
                  name='contact'
                  type="text"
                  className="form-control"
                  placeholder="Enter contact name..."
                  value={this.state.contact}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          }
          <button type="submit" className="btn btn-primary">{this.state.login ? 'Submit' : 'Register'}</button>
          <div className="form-group">
            <br/>
            {this.state.login ?
              <small className="form-text">Not yet registered? Click <u onClick={this.toggleLogin}>here!</u></small> :
              <small className="form-text">Already registered? <u onClick={this.toggleLogin}>Sign in!</u></small>
            }
          </div>
        </form>
      </div>
    );
  }
}