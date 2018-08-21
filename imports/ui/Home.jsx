import React, { Component } from 'react';
import GiftRequestEditor from './GiftRequestEditor.jsx';

// Home component - provides list of requests
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <GiftRequestEditor />
        <GiftRequestEditor />
      </div>
    );
  }
}
