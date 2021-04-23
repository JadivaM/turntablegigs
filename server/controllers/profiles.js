const mongoose = require('mongoose'),
  Profile = require('../db/models/profile'),
  User = require('../db/models/user'),
  cloudinary = require('cloudinary').v2;

exports.createProfile = async (req, res) => {
  try {
    const profile = await new Profile({
      ...req.body,
      owner: req.user._id
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getSpecificProfile = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send('Not a valid user profile');

  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    const profile = await Profile.findOne({ owner: user._id });
    console.log('******', profile);
    if (!profile) return res.status(404).send('profile not found');
    res.json({
      user: user,
      profile: profile
    });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    Profile.find().then((profile) => res.status(200).json(profile));
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['about', 'socialMedia', 'music', 'location'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' });
  try {
    const profile = await Profile.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!profile) return res.status(404).json({ error: 'profile not found' });
    updates.forEach((update) => (profile[update] = req.body[update]));
    await profile.save();
    res.json(profile);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.uploadCoverPhoto = async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      req.files.coverPhoto.tempFilePath
    );
    req.profile.coverPhoto = response.secure_url;
    await req.profile.save();
    res.json(response);
  } catch (e) {
    res.json({ error: e.toString() });
  }
};
