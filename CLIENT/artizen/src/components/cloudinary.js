import axios from 'axios';

const addImageToCloudinary = async (image) => {
  try {
    const uploadedImages = [];

      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'user_image_data');

      const response = await axios.post(`${import.meta.env.VITE_CLOUDINARY_URL}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data && response.data.secure_url) {
        uploadedImages.push(response.data.secure_url);
      } else {
        throw new Error('Failed to upload image to Cloudinary');
      }

    return uploadedImages;

  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    throw new Error('Failed to upload images to Cloudinary');
  }
};

export { addImageToCloudinary };