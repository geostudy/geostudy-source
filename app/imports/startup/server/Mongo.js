import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addSpot(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Spots.insert(data);
}

/** Initialize the collection if empty. */
if (Spots.find().count() === 0) {
  if (Meteor.settings.defaultSpots) {
    console.log('Creating default spots.');
    Meteor.settings.defaultSpots.map(data => addSpot(data));
  }
}
