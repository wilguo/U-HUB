const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  media: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  }
})

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['event', 'discussion']
  },
  topic: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  eventBody: {
    type: EventSchema,
    required: function (){
      return this.type === "event"
    }
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = { Post }
