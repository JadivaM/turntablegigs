const mongoose = require('mongoose'),
  Media = require('../db/models/media'),
  cloudinary = require('cloudinary').v2,
  User = require('../db/models/user');

exports.uploadMedia = async (req, res) => {
  try {
    await cloudinary.uploader.upload(
      req.files.mediaFile.tempFilePath,
      { resource_type: 'auto' },
      function (result) {
        const media = new Media({
          caption: req.body.caption,
          mediaFile: result.secure_url,
          owner: req.user._id
        });
        media.save();
      }
    );
    res.status(201).json(media);
  } catch (e) {
    res.json({ error: e.toString() });
  }
};

exports.getSpecificMedia = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send('Not valid');

  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    const Media = await Media.findOne({ owner: user._id });
    console.log('******', media);
    if (!media) return res.status(404).send('Not found');
    res.json({
      user: user,
      Media: media
    });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    Media.find().then((media) => res.status(200).json(media));
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.updateMedia = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['caption'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' });
  try {
    const media = await Media.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!media) return res.status(404).json({ error: 'not found' });
    updates.forEach((update) => (media[update] = req.body[update]));
    await media.save();
    res.json(media);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!media) return res.status(404).json({ error: 'not found' });
    res.json({ message: 'Media has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};
