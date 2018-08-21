import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Home from './Home.jsx';
import RequestList from './RequestList.jsx';
import UserList from './UserList.jsx';
import AboutUs from './AboutUs.jsx';
import Login from './Login.jsx';

// App component - represents the whole app
class AppRouter extends Component {

  logout = (e) => {
    e.preventDefault();
    const logout = confirm('Do you want to log out?');
    if (logout) {
      Meteor.logout();
    }
  }

  render() {
    return(
      <BrowserRouter>
        <div>
        {!this.props.currentUser &&
        <Login/>
        }

        {this.props.currentUser &&
          <div className='center-70pct'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand">Foster Friends</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <NavLink exact to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/requestList">Request List</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/userList">User List</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/aboutUs">About Us</NavLink>
                  </li>
                </ul>
                <ul className='navbar-nav'>
                  <li className='nav-item justify-content-end' onClick={this.logout}>
                    <NavLink to="/">Logout</NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/requestList" component={RequestList} />
                <Route path="/userList" component={UserList} />
                <Route path="/aboutUs" component={AboutUs} />
              </Switch>
            </div>
          </div>
        }
        </div>
      </BrowserRouter>
    );
  }
}


export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(AppRouter);
