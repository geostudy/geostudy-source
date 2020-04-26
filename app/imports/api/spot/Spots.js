import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Spots = new Mongo.Collection('Spots');

/** Define a schema to specify the structure of each document in the collection. */
const SpotsSchema = new SimpleSchema({
  image: String,
  name: String,
  location: String,
  description: String,
  rating: Number,
  owner: String,
  tags: Array,
  'tags.$': String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Spots.attachSchema(SpotsSchema);

/** Make the collection and schema available to other code. */
export { Spots, SpotsSchema };
