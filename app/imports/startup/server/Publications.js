import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Spots', function publish() {
  if (this.userId) {
    return Spots.find();
  }
  return this.ready();
});
//
