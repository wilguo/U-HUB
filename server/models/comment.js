const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  }
})

const Comment = new mongoose.model('Comment', CommentSchema)

module.exports = { Comment }
