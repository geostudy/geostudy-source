import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots.js';
import { Tags } from '../../api/tag/Tags.js';

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

/** Initialize the collection if empty. */
if ((Meteor.settings.loadAssetsFile) && (Spots.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading spots from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.spots.map(spot => addSpots(spot));
}

if ((Meteor.settings.loadAssetsFile) && (Tags.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading tags from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.tags.map(tag => addTags(tag));
}
