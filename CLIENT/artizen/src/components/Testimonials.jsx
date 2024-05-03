import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useClerk } from '@clerk/clerk-react';
import { useCookies } from 'react-cookie';
import { Rating } from 'react-simple-star-rating';
Modal.setAppElement('#root');

const Testimonials = () => {
  const [users, setUsers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    testimonial: '',
    likes: 0,
    author: '',
  });

  const { user } = useClerk();
  const [cookies] = useCookies(['__client_uat']);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const usersData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users`);
        setUsers(usersData.data);

        const testimonialsData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/testimonials`);
        setTestimonials(testimonialsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again later.');
      }
    };

    fetchInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'likes') {
      newValue = Math.min(parseInt(value), 5);
    }

    setForm(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleTestimonialUpload = async () => {
    try {
      if (!user) {
        toast.error('Please sign in to submit a testimonial.');
        return;
      }
      
      const hasSubmitted = testimonials.some(testimonial => testimonial.author === user.fullName);
      if (hasSubmitted) {
        toast.error('You have already submitted a testimonial.');
        return;
      }

      const updatedForm = {
        ...form,
        author: user.fullName
      };
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/testimonials`, updatedForm);
      setForm({
        title: '',
        testimonial: '',
        likes: 0,
        author: '',
      });
      setModalOpen(false);
  
      toast.success('Testimonial Submitted Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to Submit Testimonial');
    }
  };

  const handleUploadButtonClick = () => {
    if (!user) {
      toast.error('Please sign in to submit a testimonial.');
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <div>
        <div>
          <h1 style={{ fontSize: '5vw' }}>Testimonials</h1>
        </div>
        <div className='testimonials-div'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='testimonial-grid-container'>
              <div className='testimonial-header'>
                {users.map(user => user.username === testimonial.author && (
                  <img 
                    key={user.username} 
                    src={user.pfp} 
                    alt="Profile" 
                    style={{ width: '3vw', borderRadius: '50%', height: '5.6vh' }} 
                    className="profile-picture" 
                  />
                ))}
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
        <button className='upload-button' onClick={handleUploadButtonClick}>Submit</button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className='modal'
        overlayClassName='overlay'
      >
        <h2>Submit Testimonial</h2>
        <form>
          <div className='form-group'>
            <h3>Title: </h3>
            <input placeholder='title' type="text" className='form-input' name="title" value={form.title} onChange={handleInputChange}/>
          </div>
          <div className='form-group'>
            <h3>Testimonial: </h3>
            <input placeholder='testimonial' type="text" className='form-input' name="testimonial" value={form.testimonial} onChange={handleInputChange}/>
          </div>
          <div className='form-group'>
            <h3>Rating: </h3>
            <input placeholder='rating' type="number" className='form-input' name="likes" value={form.likes} onChange={handleInputChange}/>
          </div>
          <button type='button' onClick={handleTestimonialUpload}>Upload</button>
        </form>
      </Modal>
    </>
  );
};

export default Testimonials;
