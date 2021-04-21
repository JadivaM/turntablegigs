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
  photo: {
    type: String,
    required: true
  }
});

const Music = mongoose.model('Music', musicSchema);
module.exports = Music;
