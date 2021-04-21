const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  Profile = require('./profile'),
  GigPost = require('./gigPost'),
  GigApplication = require('./gigApplication'),
  Booking = require('./booking');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error("Password can't include the word password");
        }
        if (value.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: String
    },
    location: {
      type: String
    },
    dj: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to log in');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to log in');
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8);

  next();
});

userSchema.virtual('gigPosts', {
  ref: 'GigPost',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('profiles', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('music', {
  ref: 'Music',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('gigApplications', {
  ref: 'GigApplication',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Booking.deleteMany({
    owner: user._id
  });
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Profile.deleteMany({
    owner: user._id
  });
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await GigPost.deleteMany({
    owner: user._id
  });
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await GigApplication.deleteMany({
    owner: user._id
  });
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Music.deleteMany({
    owner: user._id
  });
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
