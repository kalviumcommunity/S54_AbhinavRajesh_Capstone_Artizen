import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useClerk } from '@clerk/clerk-react';
import { useCookies } from 'react-cookie'; // Import useCookies hook
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
  const [cookies] = useCookies(['__client_uat']); // Access the __client_uat cookie value

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch user data
        const userData = await axios.get('http://localhost:4000/api/users');
        setUsers(userData.data);

        // Fetch testimonials data
        const testimonialsData = await axios.get('http://localhost:4000/api/testimonials');
        setTestimonials(testimonialsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again later.');
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array ensures this useEffect runs only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Ensure likes value doesn't exceed 10
    if (name === 'likes') {
      newValue = Math.min(parseInt(value), 10);
    }

    setForm(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleTestimonialUpload = async () => {
    try {
      if (cookies['__client_uat'] === '0') {
        toast.error('Please sign in to submit a testimonial.');
        return;
      }
      const fullName = user.fullName;
      const updatedForm = {
        ...form,
        author: fullName
      };
      await axios.post('http://localhost:4000/api/testimonials', updatedForm);
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
    if (cookies['__client_uat'] === 0) {
      toast.error('Please sign in to submit a testimonial.');
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <div>
        <div>
          <h1 style={{ fontSize: '8vw' }}>Testimonials</h1>
        </div>
        <div className='testimonials-div'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='testimonial-grid-container'>
              <div className='testimonial-header'>
                {users.map(user => user.username === testimonial.author && <img src={user.pfp} style={{width:'3vw', borderRadius:'50%',height:'5.6vh'}} className="profile-picture" />)}
                {testimonial.author}
              </div>
              <div className='testimonial-box-body'>
                <div className='test-title'>{testimonial.title}</div>
                <div className='test-body'>{testimonial.testimonial}</div>
              </div>
              <div className='testimonial-box-rating'>
                {testimonial.likes}
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
