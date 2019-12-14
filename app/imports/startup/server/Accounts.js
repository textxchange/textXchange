import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName, campus, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

function createProfile(firstName, lastName, campus, description, image, owner) {
  console.log(` Creating profile for user ${owner}`);
  Profiles.insert({ firstName, lastName, campus, description, image, owner });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map((
        { email, password, firstName, lastName, campus, role },
    ) => createUser(email, password, firstName, lastName, campus, role));
    Meteor.settings.defaultProfiles.map((
        { firstName, lastName, campus, description, image, owner },
    ) => createProfile(firstName, lastName, campus, description, image, owner));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
