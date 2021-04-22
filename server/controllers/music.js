const mongoose = require('mongoose'),
  Music = require('../db/models/music'),
  cloudinary = require('cloudinary').v2,
  User = require('../db/models/user');

exports.createMusic = async (req, res) => {
  try {
    const music = await new Music({
      ...req.body,
      owner: req.user._id
    });
    await music.save();
    res.status(201).json(music);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getSpecificMusic = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send('Not a valid song');

  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    const Music = await Music.findOne({ owner: user._id });
    console.log('******', music);
    if (!music) return res.status(404).send('Not found');
    res.json({
      user: user,
      Music: music
    });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.getAllMusic = async (req, res) => {
  try {
    Music.find().then((music) => res.status(200).json(music));
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.updateMusic = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['songFile', 'title', 'description', 'photo'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' });
  try {
    const music = await Music.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!music) return res.status(404).json({ error: 'not found' });
    updates.forEach((update) => (music[update] = req.body[update]));
    await music.save();
    res.json(music);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!music) return res.status(404).json({ error: 'not found' });
    res.json({ message: 'Music has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.uploadCoverPhoto = async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      req.files.coverPhoto.tempFilePath
    );
    req.music.coverPhoto = response.secure_url;
    await req.music.save();
    res.json(response);
  } catch (e) {
    res.json({ error: e.toString() });
  }
};