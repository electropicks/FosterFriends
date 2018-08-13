import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home.jsx';
import App from './App.jsx';
import GiftRequest from './GiftRequest.jsx';
import VolunteerRequest from './VolunteerRequest.jsx';
import AboutUs from './AboutUs.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.js'
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';


// App component - represents the whole app
class AppRouter extends Component {

  render() {
    return(
      <BrowserRouter>
        <div>
        <AccountsUIWrapper />
        <h1>Foster Friends</h1>
        { this.props.currentUser ?
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark no-print">
              <ul className="header">
                <li><NavLink exact to="/">Home</NavLink> </li>
                <li><NavLink to="/giftRequest">Gift Request</NavLink></li>
                <li><NavLink to="/volunteerRequest">Volunter Request</NavLink></li>
                <li><NavLink to="/otherRequest">Other Request</NavLink></li>
                <li><NavLink to="/aboutUs">About Us</NavLink></li>
              </ul>
            </nav>
            <div>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/giftRequest" component={GiftRequest} />
                <Route path="/volunteerRequest" component={VolunteerRequest} />
                <Route path="/otherRequest" component={VolunteerRequest} />
                <Route path="/aboutUs" component={AboutUs} />
              </Switch>
            </div>
          </div> : 
          <div>
            
          </div>
        }
        </div>
      </BrowserRouter>
    );
  }
}


export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1} }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true} }).count(),
    currentUser: Meteor.user(),
  };
})(AppRouter);
