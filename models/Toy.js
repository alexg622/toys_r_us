const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ToySchema = new Schema({
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      review: {
        type: String
      },
      stars: {
        type: Number
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('toy', ToySchema)
