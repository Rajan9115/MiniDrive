require('dotenv').config();

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary using your credentials from the .env file
function cloudinaryConnect(){
    try{
        cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
        });
      }
      catch(err){
        console.log(err);
      }
}

module.exports = cloudinaryConnect;