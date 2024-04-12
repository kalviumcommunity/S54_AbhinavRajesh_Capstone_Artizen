import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useClerk } from '@clerk/clerk-react';
import { Rating } from 'react-simple-star-rating';

const Profile = () => {
    const { user } = useClerk();
    const [artworks, setArtworks] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artworksResponse, testimonialsResponse] = await Promise.all([
                    axios.get('http://localhost:4000/api/data/artworks'),
                    axios.get('http://localhost:4000/api/testimonials')
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    const userArtworks = artworks.filter(artwork => artwork.author === user.fullName);
    const userTestimonials = testimonials.filter(testimonial => testimonial.author === user.fullName);

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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',padding:'5vw',gap:'5vw'}}>
                    {userArtworks.map(artwork => (
                        <div key={artwork.id}>
                            <img src={artwork.image} alt={artwork.title} style={{ width: '100%', height: '100%', borderRadius:'50px' }} />
                        </div>
                    ))}
                </div>
            </div>
            <div>
            <div>
                <h1 style={{ fontSize: '5vw' }}>My Testimonials</h1>
            </div>
            <div style={{padding:'5vw'}}>
                {userTestimonials.map(testimonial => (
                    <div key={testimonial.id} className='testimonial-grid-container'>
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
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Profile;
