import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js'
import Home from './Home.jsx';
import GiftRequest from './GiftRequest.jsx';
import VolunteerRequest from './VolunteerRequest.jsx';
import OtherRequest from './OtherRequest.jsx';
import AboutUs from './AboutUs.jsx';

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
                <Route exact path="/" component={Home} />
                <Route path="/giftRequest" component={GiftRequest} />
                <Route path="/volunteerRequest" component={VolunteerRequest} />
                <Route path="/otherRequest" component={OtherRequest} />
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
    currentUser: Meteor.user(),
  };
})(AppRouter);
