import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import uploadIcon from '../assets/uploadicon.png'
import { useClerk } from '@clerk/clerk-react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://artizen.onrender.com/api/data/artworks');
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
      await axios.post('https://artizen.onrender.com/api/artworks', formData);
      toast.success('Artwork uploaded successfully.');      
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
            <input placeholder='image link' className='form-input' type="text" name="image" value={formData.image} onChange={handleInputChange} />
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
