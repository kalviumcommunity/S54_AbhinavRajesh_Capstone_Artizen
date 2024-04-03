import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import uploadIcon from '../assets/uploadicon.png'
Modal.setAppElement('#root');

const ArtworkGrid = () => {
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
    fetchData();

    return () => {

    };
  }, []);

  const fetchData = async () => {
    try {
      const source = axios.CancelToken.source();
      const response = await axios.get('http://localhost:4000/api/data/artworks', {
        cancelToken: source.token
      });
      setArtworks(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to fetch artworks. Please try again later.');
      }
    }
  
    return () => {
      if (source) {
        source.cancel('Request cancelled by cleanup');
      }
    };
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    try {
      await axios.post('http://localhost:4000/api/artworks', formData);
      toast.success('Artwork uploaded successfully.');
      fetchData();
      setModalIsOpen(false);
      setFormData({
        title: '',
        category: '',
        author: '',
        image: '',
        description: '',
      });
    } catch (error) {
      console.error('Error uploading artwork:', error);
      toast.error('Failed to upload artwork. Please try again later.');
    }
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
        <button className="upload-button" onClick={() => setModalIsOpen(true)}><img style={{width: '50px',paddingRight:'10px'}} src={uploadIcon} /> Upload</button>
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
