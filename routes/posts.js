var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) console.log(err);
    res.json(posts)
  });
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  var newPost = Post({
    title: title,
    content: content
  });

  newPost.save(function(err, post) {
    if (err) console.log(err);
    res.json(post);
  });
});

module.exports = router;
