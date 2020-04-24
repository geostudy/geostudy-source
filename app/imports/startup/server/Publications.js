import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Spots } from '../../api/spot/Spots';
import { Tags } from '../../api/tag/Tags';
import { Ratings } from '../../api/rating/Ratings';

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

Meteor.publish('RatingsTotal', function publish(location) {
  check(location, String);
  if (this.userId) {
    const sum = _.map(Ratings.find({ spot: location }));
    const average = sum / (_.size(Ratings.find({ spot: location })) - 1);
    if (_.size(Ratings.find({ spot: location })) === 0) {
      return 0;
    }
    return average;
  }
  return this.ready();
});
//
