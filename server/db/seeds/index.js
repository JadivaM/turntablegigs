if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('../config/');

const djs = require('./data');
const User = require('../models/user'),
  faker = require('faker'),
  mongoose = require('mongoose');
const profiles = require('./index');
const Profile = require('../models/profile');

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Profile.countDocuments({}, function (err, count) {
    console.log('Number of profiles:', count);
  });

  const venueIdArray = [];
  const djIdArray = [];
  const userIdArray = [];
  const profileIdArray = [];

  for (let i = 0; i < djs.length; i++) {
    console.log(djs[i]);
    const newDj = await new User({
      name: djs[i].name,
      location: djs[i].location,
      email: djs[i].email,
      avatar: djs[i].avatar,
      password: 'superSecret',
      dj: djs[i].dj
    });
    await newDj.generateAuthToken();
    djIdArray.push(newDj._id);
  }
  for (let i = 0; i < djIdArray.length; i++) {
    const newProfile = new Profile({
      about: faker.lorem.paragraph(),
      owner: djIdArray[i],
      experience: faker.lorem.paragraph(),
      music: djs[i].music
    });
    await newProfile.save();
  }

  for (let i = 0; i < 12; i++) {
    const venue = new User({
      name: faker.company.companyName(),
      dj: false,
      email: faker.internet.email(),
      password: 'superSecret',
      location: faker.address.city(),
      avatar: faker.random.image()
    });
    await venue.generateAuthToken();
    venueIdArray.push(venue._id);
  }

  for (let i = 0; i < venueIdArray.length; i++) {
    const newProfile = await new Profile({
      about: faker.lorem.paragraph(),
      owner: venueIdArray[i],
      experience: faker.lorem.paragraph()
    });
    await newProfile.save();
    profileIdArray.push(newProfile._id);
  }

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });

  await Profile.countDocuments({}, function (err, count) {
    console.log('Number of profiles:', count);
  });
};

dbReset();
