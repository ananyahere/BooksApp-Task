const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  referredUser:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isPaymentMade:{
    type: Boolean,
    default: false
  },
  totalEarnings:{
    type: Number,
    default: 0
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User