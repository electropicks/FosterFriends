import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Home component - represents the entry point
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <p className='container'>
        Foster Friends is a non profit organization based in San Diego that works with agencies
        to better the lives of foster kids in the area. This application serves as a way for agencies
        to better request help from our group or to help personalize gifts for the children that range
        from celebrating a birthday to sharing condolences. For any questions please contact: xxxxx";
      </p>
    );
  }
}