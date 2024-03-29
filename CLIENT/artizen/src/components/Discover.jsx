import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import '../App.css';
import 'react-toastify/dist/ReactToastify.css'; 

const ArtworkGrid = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data/artworks');
        console.log('Artworks response:', response.data);
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to fetch artworks. Please try again later.'); 
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 style={{ fontSize: '8vw' }}>Discover</h1>
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
      </div>
    </>
  );
};

export default ArtworkGrid;
