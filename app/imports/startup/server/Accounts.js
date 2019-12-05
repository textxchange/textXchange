import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName, studentId, campus, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      studentId: studentId,
      campus: campus,
    },

  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

function createProfile(firstName, lastName, studentId, campus, email) {
  console.log(` Creating profile for user ${email}`);
  Profiles.insert({ firstName, lastName, studentId, campus, owner: email });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map((
        { email, password, firstName, lastName, studentId, campus, role },
    ) => createUser(email, password, firstName, lastName, studentId, campus, role));
    Meteor.settings.defaultProfiles.map((
        { firstName, lastName, studentId, campus, owner },
    ) => createProfile(firstName, lastName, studentId, campus, owner));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
