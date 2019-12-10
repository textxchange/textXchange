import { Meteor } from 'meteor/meteor';
import { Books } from '../../api/book/Book';

/* eslint-disable no-console */
function addBook(book) {
  console.log(`  Adding: ${book.title} (${book.owner})`);
  Books.insert(book);
}

/** Initialize the collection if empty. */
if (Books.find().count() === 0) {
  if (Meteor.settings.defaultBooks) {
    console.log('Creating default books.');
    Meteor.settings.defaultBooks.map(book => addBook(book));
  }
}
