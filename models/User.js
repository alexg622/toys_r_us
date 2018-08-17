const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  cart: [
    {
      toy: {
        type: Schema.Types.ObjectId,
        ref: "toy"
      },
      quantity: {
        type: String,
        default: "1"
      }
    }
  ],
  toys: [
    {
      toy: {
        type: Schema.Types.ObjectId,
        ref: 'toy'
      },
      quantity: {
        type: String,
        default: "1"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("users", UserSchema)
