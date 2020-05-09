import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Suggestions = new Mongo.Collection('Suggestions');

/** Define a schema to specify the structure of each document in the collection. */
const SuggestionsSchema = new SimpleSchema({
  name: String,
  description: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Suggestions.attachSchema(SuggestionsSchema);

/** Make the collection and schema available to other code. */
export { Suggestions, SuggestionsSchema };
