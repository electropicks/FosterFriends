import React, { Component } from 'react';
import GiftRequestEditor from './GiftRequestEditor.jsx';
import VolunteerRequestEditor from './VolunteerRequestEditor.jsx';
import OtherRequestEditor from './OtherRequestEditor.jsx';

// Home component - provides list of requests
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='btn-panel center-40pct'>
        <div className='home-button'>
          <GiftRequestEditor btnClass='btn btn-primary btn-block'/>
        </div>
        <div className='home-button'>
          <VolunteerRequestEditor btnClass='btn btn-primary btn-block'/>
        </div>
        <div className='home-button'>
          <OtherRequestEditor btnClass='btn btn-primary btn-block'/>
        </div>
      </div>
    );
  }
}
