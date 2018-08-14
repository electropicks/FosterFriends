import { Meteor } from 'meteor/meteor';
import '../imports/api/requests.js';

Meteor.startup(() => {
  // code to run on server at startup
  // Support for playing D&D: Roll 3d6 for dexterity.
  Accounts.onCreateUser((options, user) => {
    const customizedUser = Object.assign({
      dexterity: 'test',
    }, user);

    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
      customizedUser.profile = options.profile;
    }

    return customizedUser;
  });
});
