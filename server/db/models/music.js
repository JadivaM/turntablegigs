const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  songFile: {
    required: true,
    type: String
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  genre: {
    type: String,
    trim: true
  },
  coverPhoto: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Music = mongoose.model('Music', musicSchema);
module.exports = Music;
