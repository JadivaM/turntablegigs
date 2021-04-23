require('./db/config');
const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  passport = require('./middleware/authentication'),
  fileUpload = require('express-fileupload'),
  gigRouter = require('./routes/secure/gigPost'),
  gigApplicationRouter = require('./routes/secure/gigApplication'),
  openPostsRouter = require('./routes/open/gigPost'),
  openProfilesRouter = require('./routes/open/profile'),
  userRouter = require('./routes/secure/users'),
  bookingRouter = require('./routes/secure/bookings'),
  chatsRouter = require('./routes/secure/chats'),
  profilesRouter = require('./routes/secure/profiles'),
  openUsersRouter = require('./routes/open/users'),
  openMusicRouter = require('./routes/open/music'),
  secureMusicRouter = require('./routes/secure/music');
const axios = require('axios');

const mapApiKey = process.env.MAP_API;

const app = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/api/map', async (request, response) => {
  try {
    response.json(mapApiKey);
  } catch (error) {
    console.log(error);
  }
});

// Unauthenticated routes

app.use('/api/search/profiles', openProfilesRouter);
app.use('/api/search/gigs', openPostsRouter);
app.use('/api/users', openUsersRouter);
app.use('/api/music', openMusicRouter);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
);

// Any authentication middleware and related routing would be here.

app.use('/api/*', passport.authenticate('jwt', { session: false }));

// Authenticated Routes

app.use('/api/gigs', gigRouter);
app.use('/api/application', gigApplicationRouter);
app.use('/api/user/profiles', profilesRouter);
app.use('/api/users', userRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/music', secureMusicRouter);
// app.use('/api/chats', chatsRouter);

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;
