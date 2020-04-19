import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Spots } from '../../api/spot/Spots';
import { Notes } from '../../api/note/Notes';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Spots', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Spots.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ContactsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Notes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.find({ owner: username });
  }
  return this.ready();
});
//