import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Books = new Mongo.Collection('Books');

/** Define a schema to specify the structure of each document in the collection. */
const BookSchema = new SimpleSchema({
  ISBN: Number,
  title: String,
  author: String,
  datePublished: Date,
  description: String,
  cost: Number,
  owner: String,
  class: String,
  image: String,
  datePosted: Date,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Books.attachSchema(BookSchema);

/** Make the collection and schema available to other code. */
export { Books, BookSchema };
