import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { motion } from "framer-motion";
import { useClerk } from '@clerk/clerk-react';
import { useDropzone } from 'react-dropzone';
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import uploadIcon from '../assets/uploadicon.png';
import { addImageToCloudinary } from './cloudinary';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

Modal.setAppElement('#root');

const ArtworkGrid = () => {
  const { user } = useClerk();
  const [artworks, setArtworks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    author: '',
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams);
  const selectedCategory = searchParams.get('category');

  const [imagePreview, setImagePreview] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
    try {
      if ( selectedCategory){
        const response = await axios.get(`https://artizen.onrender.com/api/data/artworks?category=${selectedCategory}`);
        setArtworks(response.data);
      } else {
        const response = await axios.get(`https://artizen.onrender.com/api/data/artworks`);
        setArtworks(response.data);
      }
    } catch (error) {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to fetch artworks. Please try again later.');
    }
};

    fetchData();

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedCategory]);

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        author: user.fullName
      }));
    }
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    try {
      const imageUrl = await addImageToCloudinary(formData.image);
      formData.image = imageUrl[0];
      await axios.post('https://artizen.onrender.com/api/artworks', formData);
      console.log(formData);
      setFormData({
        title: '',
        category: '',
        author: user.fullName,
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
    setFormData((prevState) => ({
      ...prevState,
      image: acceptedFiles[0],
    }));
    setImagePreview(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const renderArtworkGrid = () => {
    const columnCount = 3;
    const columnWidth = (containerWidth - (columnCount - 1) * 20) / columnCount;
    const columnSpacing = 20;

    let columns = Array.from({ length: columnCount }, () => []);

    artworks.forEach((artwork, index) => {
      const aspectRatio = artwork.width / artwork.height;
      const height = columnWidth / aspectRatio;

      const columnIndex = index % columnCount;
      columns[columnIndex].push({
        key: index,
        height,
        artwork,
      });
    });

    const columnHeights = columns.map(column => column.reduce((acc, item) => acc + item.height, 0));
    const maxHeight = Math.max(...columnHeights);

    return (
      <div style={{ position: 'relative', height: maxHeight }}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} style={{ position: 'absolute', left: columnIndex * (columnWidth + columnSpacing), top: 0 }}>
            {column.map(({ key, height, artwork }) => (
              <div key={key} className="artwork" style={{ width: columnWidth, height, marginBottom: columnIndex < columnCount - 1 ? columnSpacing : 0 }}>
                <img src={artwork.image} alt={artwork.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="discover-hero-text">Discover</h1>
        <div className="artworks" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          {renderArtworkGrid()}
        </div>
        {user && (
          <motion.button whileHover={{ scale: 1.1 }} className="upload-button" onClick={handleUploadButtonClick}>
            <img style={{ width: '50px', paddingRight: '10px' }} src={uploadIcon} alt="Upload" /> Upload
          </motion.button>
        )}
      </div>
      <motion.div
        className="modal-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: modalIsOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
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
              <input placeholder="title" className="form-input" type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <h3>Category :</h3>
              <select className="form-input" name="category" value={formData.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                <option value="Painting">Painting</option>
                <option value="Drawing">Drawing</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Photography">Photography</option>
              </select>
            </div>
            <div className="form-author">
              <h3>Author :</h3>
              <p>{formData.author}</p>
            </div>
            <div className="form-group">
              <h3>Image :</h3>
              <div {...getRootProps()} className="dropzone" style={{ backgroundColor: 'white', border: '2px dashed #0087F7', borderRadius: '4px', padding: '20px 8px', textAlign: 'center', cursor: 'pointer' }}>
                <input {...getInputProps()} />
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '50px', marginBottom: '10px' }} />}
                {imagePreview ? null : <p>Drag 'n' drop some files here, or select files</p>}
              </div>
            </div>
            <div className="form-group">
              <h3>Description :</h3>
              <textarea placeholder="description" name="description" className="description-input" type="text" value={formData.description} onChange={handleInputChange}></textarea>
            </div>
            <motion.button whileHover={{ scale: 1.1 }} type="button" onClick={handleUpload}>Upload</motion.button>
          </form>
        </Modal>
      </motion.div>
    </>
  );
};

export default ArtworkGrid;
