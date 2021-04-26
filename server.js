if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const app = require('./server/app');
const port = process.env.PORT || 8080;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
