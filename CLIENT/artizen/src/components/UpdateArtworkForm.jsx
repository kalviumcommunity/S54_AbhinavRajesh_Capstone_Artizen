import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateArtworkForm = ({ artwork, onClose }) => {
    const {_id : id} = artwork
    console.log(id)
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        author: '',
        image: '',
        description: ''
    });

    useEffect(() => {
        if (artwork) {
            setFormData({
                title: artwork.title,
                category: artwork.category,
                author: artwork.author,
                image: artwork.image,
                description: artwork.description
            });
        }
    }, [artwork]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input Changed:', name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://artizen.onrender.com/api/artworks/${id}`, formData);
            toast.success('Artwork updated successfully');
            onClose(); 
        } catch (error) {
            console.error('Error updating artwork:', error);
            toast.error('Failed to update artwork. Please try again later.');
        }
    };

    return (
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
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default UpdateArtworkForm;
