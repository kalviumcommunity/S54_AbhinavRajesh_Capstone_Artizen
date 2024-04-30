import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClerk } from '@clerk/clerk-react';
import { Rating } from 'react-simple-star-rating';
import Modal from 'react-modal';
import UpdateArtworkForm from './UpdateArtworkForm';
import UpdateTestimonialForm from './UpdateTestimonialForm';
import edit from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

Modal.setAppElement('#root');

const Profile = () => {
    const { user } = useClerk();
    const [artworks, setArtworks] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [buttonHover, setButtonHover] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artworksResponse, testimonialsResponse] = await Promise.all([
                    axios.get('https://artizen.onrender.com/api/data/artworks'),
                    axios.get('https://artizen.onrender.com/api/testimonials')
                ]);
                
                setArtworks(artworksResponse.data);
                setTestimonials(testimonialsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    const handleMouseEnter = (id) => {
        setButtonHover(id);
    };
    
    const handleMouseLeave = () => {
        setButtonHover(null);
    };

    const handleDelete = async (id, type) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
        if (!confirmDelete) {
            return;
        }
    
        try {
            await axios.delete(`https://artizen.onrender.com/api/${type}/${id}`);
            if (type === 'artworks') {
                setArtworks(artworks.filter(artwork => artwork.id !== id));
            } else if (type === 'testimonials') {
                setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
            }
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            toast.error(`Failed to delete ${type}. Please try again later.`);
        }
    };
    
    const handleUpdateOpen = (item, type) => {
        if (type === 'artwork') {
            setSelectedArtwork(item);
        } else if (type === 'testimonial') {
            setSelectedTestimonial(item);
        }
        setIsUpdateModalOpen(true);
    };
    
    const closeModal = () => {
        setSelectedArtwork(null);
        setSelectedTestimonial(null);
        setIsUpdateModalOpen(false);
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return null;
    }

    const userArtworks = artworks.filter(artwork => artwork.author === user.fullName);
    const filteredTestimonials = testimonials.filter(testimonial => testimonial.author === user.fullName);

    return (
        <>
            <div>
                <div>
                    <img className='profile-pic' src={user.imageUrl} alt="" />
                </div>
                <div>
                    <h1 className='profile-name'>{user.fullName}</h1>
                </div>
            </div>
            <div>
                <div>
                    <h1 style={{ fontSize: '5vw' }}>My Uploads</h1>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '5vw', gap: '5vw' }}>
                {userArtworks.map((artwork,i) => (
                    <div key={artwork.id} style={{ position: 'relative' }}>
                        <img src={artwork.image} alt={artwork.title} style={{ width: '100%', height: '100%', borderRadius: '50px' }} />
                        <div 
                            style={{ 
                                padding:'5%',
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start', 
                                background: 'rgba(0, 0, 0, 0.5)', 
                                opacity: 0, 
                                transition: 'opacity 0.3s' 
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                        >
                            <button onClick={() => handleUpdateOpen(artwork, 'artwork', artwork._id)} style={{cursor:'pointer', padding:'3%' ,background:'black', color: 'white',border:'none',borderRadius:'5px' }}><img src={edit} style={{width:'50px'}} /></button>
                            <button onClick={() => handleDelete(artwork._id, 'artworks')} style={{cursor:'pointer', padding: '3%', background: 'black', color: 'white', marginRight: '5px', border: 'none', borderRadius: '5px' }}>
                                <img src={deleteIcon} style={{ width: '50px' }} alt="Delete" />
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div>
                <h1 style={{ fontSize: '5vw' }}>My Testimonials</h1>
            </div>
            <div style={{ padding: '5vw' }}>
                {filteredTestimonials.map(testimonial => (
                    <div 
                    key={testimonial._id} 
                    className='testimonial-grid-container' 
                    style={{ position: 'relative' }} 
                    onMouseEnter={() => handleMouseEnter(testimonial.id)}
                    onMouseLeave={() => handleMouseLeave(testimonial.id)}
                >   
                        <div className='testimonial-header'>
                            <img 
                                src={user.imageUrl}
                                alt="Profile" 
                                style={{ width: '3vw', borderRadius: '50%', height: '5.6vh' }} 
                                className="profile-picture" 
                            />
                            {testimonial.author}
                        </div>
                        <div className='testimonial-box-body'>
                            <div className='test-title'>{testimonial.title}</div>
                            <div className='test-body'>{testimonial.testimonial}</div>
                        </div>
                        <div className='testimonial-box-rating'>
                            <Rating readonly={true} initialValue={testimonial.likes} size={20} />
                        </div>
                                <div 
                                    className='testimonial-buttons'
                                    style={{ 
                                        position: 'absolute', 
                                        padding:'5%',
                                        top: 0, 
                                        width: '100%', 
                                        height: '100%', 
                                        // display:'flex',
                                        justifyContent:'space-between',
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        transition: 'opacity 0.3s',
                                        display: buttonHover === testimonial.id ? 'block' : 'none', 
                                    }}
                                >   
                                <button 
                                    onClick={() => handleUpdateOpen(testimonial, 'testimonial')} 
                                    style={{padding:'3%', marginRight:'1vw',background:'black', color: 'white',border:'none',borderRadius:'5px',cursor:'pointer'}}
                                >
                                    <img src={edit} alt="Edit" style={{ width: '20px' }} />
                                </button>
                                <button onClick={() => handleDelete(testimonial._id, 'testimonials')} style={{padding:'3%' ,background:'black', color: 'white',border:'none',borderRadius:'5px',cursor:'pointer'  }}>
                                    <img src={deleteIcon} alt="Delete" style={{ width: '20px' }} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
            >
                {selectedArtwork && (
                    <UpdateArtworkForm artwork={selectedArtwork} onClose={closeModal} />
                )}
                {selectedTestimonial && (
                    <UpdateTestimonialForm testimonial={selectedTestimonial} onClose={closeModal} />
                )}
            </Modal>
        </>
    );
};

export default Profile;
