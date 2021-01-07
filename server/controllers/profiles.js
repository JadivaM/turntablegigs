const mongoose = require('mongoose'),
  Profile = require('../db/models/profile'),
  User = require('../db/models/user');

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

  // console.log(req.user.name)
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send('Not a valid user profile');

  try {
    const profile = await Profile.findOne({ owner: req.params.id });
    console.log(profile);
    if (!profile) return res.status(404).send('profile not found');

    res.json(profile);
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
