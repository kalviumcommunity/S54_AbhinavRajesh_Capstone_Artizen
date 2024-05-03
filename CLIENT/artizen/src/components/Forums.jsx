import axios from 'axios';
import React, { useEffect, useState } from 'react';
import heartIcon from '../assets/heart.png';
import repliesIcon from '../assets/replies.png';
import viewsIcon from '../assets/views.png';
import { useClerk } from '@clerk/clerk-react';

const Forums = () => {
  const [users, setUsers] = useState([]);
  const [forum, setForum] = useState([]);
  const { user } = useClerk();
  console.log(user);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const usersData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users`);
        setUsers(usersData.data);

        const forumsData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/forums`);
        setForum(forumsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleLike = (forumId) => {
    console.log(forumId);
  };

  return (
    <>
      <h1 className='forums-title' style={{fontSize:'5vw'}}>Forums</h1>
      <div className='forums-body'>
        {forum.map((forums, index) => (
          <div key={index} className='forums-grid-container'>
            <div className='forums-header'>
              <div className='forums-header-left'>
                <h2>Posted By :- </h2>
                <div className='forums-header-user'>
                  {users.map((user) =>
                    user.username === forums.author && (
                      <img
                        key={user.username}
                        src={user.pfp}
                        alt='Profile'
                        style={{
                          width: '3vw',
                          borderRadius: '50%',
                          height: '5.6vh',
                        }}
                        className='profile-picture'
                      />
                    )
                  )}
                  <h3>{forums.author}</h3>
                </div>
              </div>
              <h3>{formatDate(forums.date)}</h3>
            </div>
            <div className='forums-box-body'>
              <div className='forums-question'>{forums.question}</div>
            </div>
            <div className='forums-footer'>
              <div className='forums-footer-likes'>
                <img src={heartIcon} alt='' onClick={() => handleLike(forums._id)} />
                <h4>{forums.likes}</h4>
              </div>
              <div className='forums-footer-replies'>
                <img src={repliesIcon} alt="" />
                <h4>{forums.replies.length}</h4>
              </div>
              <div className='forums-footer-views'>
                <img src={viewsIcon} alt="" />
                <h4>0</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Forums;
