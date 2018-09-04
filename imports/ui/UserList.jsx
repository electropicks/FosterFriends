import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import User from './User.jsx';

// User List component - provides list of users
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: true,
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // TODO: let people from the same agency see their colleagues?
  renderUsers() {
    return this.props.users.map((user) => (
      <User
        key={user._id}
        user={user}
        confirmDelete={this.state.confirmDelete}
      />
    ));
  }

  render() {
    if (this.props.currentUser && this.props.currentUser.username !== 'admin') {
      return <div></div>;
    }
    return(
      <div>
        <header>
          <h3 className='title'>User List ({this.props.count})</h3>
          { this.notSupported &&
            <label className="hide-completed">
              <input
                type="checkbox"
                name="confirmDelete"
                checked={this.state.confirmDelete}
                onChange={this.handleInputChange}
              />
              Confirm Delete
            </label>
          }
        </header>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    users: Meteor.users.find({}, { sort: { createdAt: -1} }).fetch(),
    count: Meteor.users.find({}).count(),
    currentUser: Meteor.user(),
  };
})(UserList);
