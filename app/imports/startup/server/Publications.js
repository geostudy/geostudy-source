import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots';
import { Tags } from '../../api/tag/Tags';
import { Ratings } from '../../api/rating/Ratings';
import { Suggestions } from '../../api/suggestion/Suggestions';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Spots', function publish() {
  if (this.userId) {
    return Spots.find();
  }
  return this.ready();
});

Meteor.publish('Tags', function publish() {
  if (this.userId) {
    return Tags.find();
  }
  return this.ready();
});

Meteor.publish('Ratings', function publish() {
  if (this.userId) {
    return Ratings.find();
  }
  return this.ready();
});

Meteor.publish('Suggestions', function publish() {
  if (this.userId) {
    return Suggestions.find();
  }
  return this.ready();
});
