import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('#root');

const Testimonials = () => {
  const [users, setUsers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    testimonial: '',
    likes: 0,
  });

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch Testimonials. Please try again later.');
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users. Please try again later.');
      }
    };

    fetchUserData();
    fetchTestimonialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTestimonialUpload = async () => {
    try {
      await axios.post('http://localhost:4000/api/testimonials', form);
      toast.success('Testimonial Submitted Successfully');
      setForm({
        title: '',
        testimonial: '',
        likes: 0,
      });
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to Submit Testimonial');
    }
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
              {/* {users.map((user, userIndex) => (
                <div key={userIndex} className='testimonial-box-header'>
                  <img src={user.pfp} alt=""  style={{width:'8vw',height:'15vh',borderRadius:'50%'}}/>
                  <h4>{user.username}</h4>
                </div> */}
              {/* ))} */}
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
        <button className='upload-button' onClick={() => setModalOpen(true)}>Submit</button>
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
