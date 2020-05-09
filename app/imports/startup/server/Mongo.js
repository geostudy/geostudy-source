import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Spots } from '../../api/spot/Spots.js';
import { Tags } from '../../api/tag/Tags.js';
import { Ratings } from '../../api/rating/Ratings.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addSpots({ image, name, location, description, owner }) {
  console.log(`  Adding: ${name} (${owner})`);
  Spots.insert({ image, name, location, description, owner });
}

function addTags({ name, spot }) {
  const spotId = _.pluck(_.flatten(_.map(spot,
      (tag) => Spots.find({ name: tag }).fetch()), true), '_id');
  console.log(`  Adding: ${name}`);
  Tags.insert({ name, spotId });
}

function addRatings({ score, owner, spot }) {
  const spotId = _.reduce(_.pluck(Spots.find({ name: spot }).fetch(), '_id'), (memo, num) => memo + num);
  console.log(`  Adding: ${spot} (${score})`);
  Ratings.insert({ score, owner, spotId });
}

/** Initialize the collection if empty. */
if (Meteor.settings.loadAssetsFile) {
  if (Spots.find().count() === 0) {
    const assetsFileName = 'data.json';
    console.log(`Loading spots from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.spots.map(spot => addSpots(spot));
  }

  if (Tags.find().count() === 0) {
    const assetsFileName = 'data.json';
    console.log(`Loading tags from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.tags.map(tag => addTags(tag));
  }

  if (Ratings.find().count() === 0) {
    const assetsFileName = 'data.json';
    console.log(`Loading ratings from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.ratings.map(rating => addRatings(rating));
  }
}
