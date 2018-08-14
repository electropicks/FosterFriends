import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import AppRouter from '../imports/ui/AppRouter.jsx';
import './main.html'
import '../imports/startup/accounts-config.js';

import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  render(<AppRouter/>, document.getElementById('root'));
});
