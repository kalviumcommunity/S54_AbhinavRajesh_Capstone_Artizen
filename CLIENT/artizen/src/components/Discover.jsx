import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useClerk } from '@clerk/clerk-react';
import { useDropzone } from 'react-dropzone';
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import uploadIcon from '../assets/uploadicon.png';
import {addImageToCloudinary} from './cloudinary';
Modal.setAppElement('#root');

const ArtworkGrid = () => {
  const { user } = useClerk();
  const [artworks, setArtworks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    image: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data/artworks');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to fetch artworks. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpload = async () => {
    try {
      const imageUrl = await addImageToCloudinary(formData.image);
      formData.image = imageUrl[0];
      await axios.post('http://localhost:4000/api/artworks', formData);
      toast.success('Artwork uploaded successfully.');
      console.log(formData)
      setFormData({
        title: '',
        category: '',
        author: '',
        image: '', 
        description: '',
      });
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error uploading artwork:', error);
      toast.error('Failed to upload artwork. Please try again later.');
    }
  };
  

  const handleUploadButtonClick = () => {
    if (!user) {
      toast.error('Please sign in to upload artwork.');
      return;
    }
    setModalIsOpen(true);
  };

  const onDrop = (acceptedFiles) => {
    setFormData(prevState => ({
      ...prevState,
      image: acceptedFiles[0]
    }));
    setImagePreview(URL.createObjectURL(acceptedFiles[0]));
  };

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <>
      <div className="container">
        <h1 className="discover-hero-text">Discover</h1>
        <div className="artworks">
          {artworks.map((artwork, index) => (
            <div key={index} className="artwork">
              <div className="frame">
                <img src={artwork.image} alt={artwork.title} style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="artwork-info">
                <h2>{artwork.title}</h2>
                <p>{artwork.author}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="upload-button" onClick={handleUploadButtonClick}><img style={{width: '50px',paddingRight:'10px'}} src={uploadIcon} /> Upload</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Upload Artwork</h2>
        <form>
          <div className="form-group">
            <h3>Title :</h3>
            <input placeholder='title' className='form-input' type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Category :</h3>
            <input placeholder='category' className='form-input' type="text" name="category" value={formData.category} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Author :</h3>
            <input placeholder='author' className='form-input' type="text" name="author" value={formData.author} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <h3>Image :</h3>
            <div {...getRootProps()} className="dropzone" style={{ backgroundColor: 'white', border: '2px dashed #0087F7', borderRadius: '4px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '50px', marginBottom: '10px' }} />}
              { imagePreview ? null : <p>Drag 'n' drop some files here, or select files</p>}
            </div>
          </div>
          <div className="form-group">
            <h3>Description :</h3>
            <textarea placeholder='description' name='description' className='description-input' type='text' value={formData.description} onChange={handleInputChange}></textarea>
          </div>
          <button type="button" onClick={handleUpload}>Upload</button>
        </form>
      </Modal>
    </>
  );
};

export default ArtworkGrid;
