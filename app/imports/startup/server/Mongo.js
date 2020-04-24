import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots.js';
import { Tags } from '../../api/tag/Tags.js';
import { Ratings } from '../../api/rating/Ratings.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addSpots({ image, name, location, description, rating, owner, tags }) {
  console.log(`  Adding: ${name} (${owner})`);
  Spots.insert({ image, name, location, description, rating, owner, tags });
}

function addTags({ tag, spot }) {
  console.log(`  Adding: ${tag}`);
  Tags.insert({ tag, spot });
}

function addRatings({ rating, owner, spot }) {
  console.log(`  Adding: ${spot} (${rating})`);
  Tags.insert({ rating, owner, spot });
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
