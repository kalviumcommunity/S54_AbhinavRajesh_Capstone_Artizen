import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTestimonialForm = ({ testimonial, onClose }) => {
    const { _id: id } = testimonial;
    const [formData, setFormData] = useState({
        title: '',
        testimonial: '',
        likes: 0
    });

    useEffect(() => {
        if (testimonial) {
            setFormData({
                title: testimonial.title,
                testimonial: testimonial.testimonial,
                likes: testimonial.likes
            });
        }
    }, [testimonial]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const likesValue = name === 'likes' ? Math.min(parseInt(value), 5) : value;
        setFormData({
            ...formData,
            [name]: likesValue
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/api/testimonials/${id}`, formData);
            toast.success('Testimonial updated successfully');
            onClose(); 
        } catch (error) {
            console.error('Error updating testimonial:', error);
            toast.error('Failed to update testimonial. Please try again later.');
        }
    };

    return (
        <form>
            <div className="form-group">
                <h3>Title :</h3>
                <input placeholder='Title' className='form-input' type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <h3>Testimonial :</h3>
                <textarea placeholder='Testimonial' name='testimonial' className='description-input' type='text' value={formData.testimonial} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
                <h3>Likes :</h3>
                <input placeholder='Likes' className='form-input' type="number" name="likes" value={formData.likes} onChange={handleInputChange} />
            </div>
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default UpdateTestimonialForm;
