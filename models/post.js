const mongoose = require("mongoose");
const imagePath = 'uploads/images'
const path = require('path')

const PostSchema = new mongoose.Schema({
  message: String,
  image: String,
  likes: Number,
  posted_by: String,

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

PostSchema.virtual('imagePath').get(function() {
  if (this.image != null) {
    return path.join('/', imagePath, this.image)
  }
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
// module.exports = mongoose.model('Image', imageSchema);
module.exports.imagePath = imagePath;


// title: { 
//   type: String,
//   required: true
// },
// image: {
//   type: String,
//   required: true
// },