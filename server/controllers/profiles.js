const mongoose = require('mongoose'),
  Profile = require('../db/models/profile');

exports.createProfile = async (req, res) => {
  const profile = await new Profile({
    ...req.body,
    owner: req.user._id
  });
  try {
    profile.save();
    res.status(201).json(profile);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getSpecificProfile = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).send('Not a valid user profile');

  try {
    const profile = Profile.findOne({ _id, owner: req.user._id }); // user.name?
    if (!profile) return res.status(404).send();

    res.json(profile);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = Profile.find();
    return res.json(profiles);
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

//need delete
//need remove in user model
//need virtual relationship for almost all models
//how to implemetn isDj isVenue for profiles and gigPosts
