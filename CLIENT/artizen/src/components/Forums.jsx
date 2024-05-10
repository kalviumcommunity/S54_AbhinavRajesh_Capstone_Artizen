import axios from 'axios';
import React, { useEffect, useState } from 'react';
import heartIcon from '../assets/heart.png';
import heartLiked from '../assets/heart-liked.png'
import repliesIcon from '../assets/replies.png';
import viewsIcon from '../assets/views.png';
import { useClerk } from '@clerk/clerk-react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Forums = () => {

  const [users, setUsers] = useState([]);
  const [forum, setForum] = useState([]);
  const { user } = useClerk();
  const { fullName } = user && user || ' '

  let isButtonDisabled = false;
  
  const likedArray = JSON.parse(localStorage.getItem('likedForumData')) || [];
  const handleToggleLiked = async (forumId) => {
    if (isButtonDisabled) {
        return;
    }

    let updatedLikedArray = JSON.parse(localStorage.getItem('likedForumData')) || [];

    if (updatedLikedArray.includes(forumId)) {
        handleRemoveLike(forumId);
        updatedLikedArray = updatedLikedArray.filter(id => id !== forumId);
    } else {
        handleLike(forumId);
        updatedLikedArray.push(forumId);
    }

    localStorage.setItem('likedForumData', JSON.stringify(updatedLikedArray));

    const updatedForums = forum.map(forum => ({
        ...forum,
        liked: updatedLikedArray.includes(forum._id)
    }));
    setForum(updatedForums);

    isButtonDisabled = true;
    setTimeout(() => {
        isButtonDisabled = false;
    }, 3000);
};

useEffect(() => {
  const fetchInitialData = async () => {
      try {
          if (fullName) {
              const usersData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/getLikedForums/${fullName}`);
              console.log('users data:', usersData.data.response.likedforum);
              setUsers(usersData.data.response.likedforum);
              
              if (usersData.data.response.likedforum && usersData.data.response.likedforum > 0) {
                  localStorage.removeItem('likedForumData');
                  localStorage.setItem('likedForumData', JSON.stringify(usersData.data[0].likedforum));
              }
              
              const forumsData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/forums`);
              console.log('forum data:', forumsData.data);
              setForum(forumsData.data);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  fetchInitialData();
}, [fullName]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const handleLike = async (forumId) => {
  if (!forumId) {
    toast.error("Forum Id is Empty");
    return;
  }
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/likeforums`, { 'forumId': forumId, 'username': user.fullName });
    if (response.status === 200) {
      const updatedLikesCount = response.data.likesCount;
      toast.success("Liked Forum Successfully");
      // Update the likes count in the UI
      const updatedForum = forum.map(forumItem => {
        if (forumItem._id === forumId) {
          return {
            ...forumItem,
            likes: updatedLikesCount
          };
        }
        return forumItem;
      });
      setForum(updatedForum);
    }
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

const handleRemoveLike = async (forumId) => {
  if (!forumId) {
    toast.error("Forum Id is Empty");
    return;
  }
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/removelike`, { 'forumId': forumId, 'username': user.fullName });
    if (response.status === 200) {
      const updatedLikesCount = response.data.likesCount;
      toast.success("Unliked Forum Successfully");

      const updatedForum = forum.map(forumItem => {
        if (forumItem._id === forumId && forumItem.likes > 0) {
          return {
            ...forumItem,
            likes: updatedLikesCount
          };
        }
        return forumItem;
      });
      setForum(updatedForum);
    }
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

return (
  <>
    <h1 className='forums-title' style={{ fontSize: '5vw' }}>Forums</h1>
    <div className='forums-body'>
      {forum.map((forums, index) => (
        <div key={index} className='forums-grid-container'>
          <div className='forums-header'>
            <div className='forums-header-left'>
              <h2>Posted By :- </h2>
              <div className='forums-header-user'>
                {users.length > 0 && users.map((user) =>
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
            <img 
              src={likedArray.includes(forums._id) ? heartLiked : heartIcon} 
              alt='' 
              onClick={() => user ? handleToggleLiked(forums._id) : toast.error("login to like post")} 
            />
            <h4>
              {forums.likes}
            </h4>
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
