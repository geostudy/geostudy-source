import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tags } from '../../api/tag/Tags';

/** Define a Mongo collection to hold the data. */
const Tags = new Mongo.Collection('Tags');

/** Define a schema to specify the structure of each document in the collection. */
const TagsSchema = new SimpleSchema({
  name: String,
  spot: {
    type: Array,
    optional: true,
    defaultValue: ['test'],
  },
  'spot.$': { type: String, allowedValues: _.pluck(Tags.find().fetch(), 'name')},
},

/** Attach this schema to the collection. */
Tags.attachSchema(TagsSchema);

/** Make the collection and schema available to other code. */
export { Tags, TagsSchema };
