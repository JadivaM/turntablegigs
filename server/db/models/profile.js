const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  about: {
    type: String,
    trim: true
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  souncloud: {
    type: String
  },
  experience: {
    type: String
  },
  commendations: {
    type: Boolean,
    default: false,
    trim: true
  },
  location: {
    type: String
  },
  reviews: {
    type: Boolean,
    default: false,
    trim: true
  },
  gigsOpen: {
    type: Boolean,
    default: false
  },
  coverPhoto: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
