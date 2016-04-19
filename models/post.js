var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

var Post = mongoose.model('Post', postSchema);

// Make this available to our other files
module.exports = Post;
