import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Creators = () => {
  const [users, setUsers] = useState([]);

  useEffect(()=>{

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
      console.log(users)

    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error('Error fetching artworks:', error);
        toast.error('Failed to fetch artworks. Please try again later.');
      }
    }
  };

  fetchUserData()

  },[])


  return (
    <>
    <div>
      <h1 className='creators-title'>Creators in Artizen</h1>
    </div>
    <div className='user-grid'>
      {users.map((user, index) => (
        <div key={index} className='users-div'>
          <div className='pfp'>
            <img src={user.pfp} alt="" style={{width:'8vw',height:'15vh',borderRadius:'50%'}} />
          </div>
          <div>
            <h2 style={{color:'white'}}>{user.username}</h2>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Creators;
