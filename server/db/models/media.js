const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  mediaFile: {
    required: true,
    type: String
  },
  caption: {
    type: String,
    trim: true
  },
  date: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
