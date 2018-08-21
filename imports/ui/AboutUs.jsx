import React, { Component } from 'react';

import Modal from './Modal.jsx';

// Home component - represents the entry point
export default class AboutUs extends Component {

  render() {
    return(
      <p className='container-fluid'>
        Foster Friends is a non profit organization based in San Diego that works with agencies
        to better the lives of foster kids in the area. This application serves as a way for agencies
        to better request help from our group or to help personalize gifts for the children that range
        from celebrating a birthday to sharing condolences.<br/><br/>
        For any questions please contact: 267-575-3743 or <a href='mailto:nene2100@yahoo.com?Subject=Help%20Needed'>nene2100@yahoo.com</a>.
      </p>
    );
  }
}