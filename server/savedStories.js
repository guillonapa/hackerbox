const mongoose = require('mongoose');

const { Schema } = mongoose;

// this will be our data base's data structure
const SavedStoriesSchema = new Schema(
  {
    user: String,
    title: String,
    description: String,
    link: String,
    linkToImage: String,
    source: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('SavedStories', SavedStoriesSchema);
