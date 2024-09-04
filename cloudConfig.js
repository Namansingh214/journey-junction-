const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_API_key,
    api_secret: process.env.cloud_API_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'journey_junction_DEV',
      allowedFormat: ["png","jpg","jpeg"]
    },
  });


module.exports = {
    cloudinary,
    storage,
};