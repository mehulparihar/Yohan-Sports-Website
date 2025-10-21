import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    secure: true
});

/**
 * Upload a buffer to Cloudinary and return result.
 * @param {Buffer} buffer
 * @param {object} options - folder, public_id, resource_type, transformation
 */
export function uploadBufferToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
}

/**
 * Delete a Cloudinary public_id (image).
 * @param {string} publicId
 * @param {object} options
 */
export function deleteFromCloudinary(publicId, options = {}) {
  return cloudinary.uploader.destroy(publicId, options);
}

// export default cloudinary;