// Packages
import cloudinary from 'cloudinary';

// Configs
import config from '../config/config';

// Setting The Cloudinary Configurations
cloudinary.v2.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.api_key,
  api_secret: config.cloud.api_secret
});

// Delete image from cloudinary
export const destroyFile = (PublicID) =>
  cloudinary.v2.uploader.destroy(PublicID, (err, des) => des);

// Upload image into cloudinary
export const uploadFile = (file, folderName, format) =>
  cloudinary.v2.uploader.upload(file, {
    folder: `${config.cloud.project}/${folderName}`,
    crop: 'fit',
    format
  });
