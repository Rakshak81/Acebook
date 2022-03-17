const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post
    .find( (err, posts) => {
      if (err) {
        throw err;
      }
      
      posts.forEach((post) => {
        post.postedAt = post.createdAt.toLocaleString();
      })

      res.render("posts/index", { posts: posts,
          title: "Acebook",
          name: req.session.user.name,
          username: req.session.user.username
      });
    }).populate('user')
      .sort({createdAt: -1 }) 
      .exec(function(err, posts) {
        if(err) throw err;
        posts.forEach((post) => {
          console.log(post.user.name);
        })
      })
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    req.body.user = req.session.user._id;
    req.body.posted_by = req.session.user.email;
    req.body.likes = 0;
    console.log(req.body.user);
    const post = new Post(req.body);
    console.log(post.user);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
