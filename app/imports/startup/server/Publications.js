import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';
import { Books } from '../../api/book/Book';


/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Book', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Books.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents in Books */
Meteor.publish('BookPublic', function publish() {
    return Books.find();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Profile', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.find({ owner: username });
  }
  return this.ready();
});
