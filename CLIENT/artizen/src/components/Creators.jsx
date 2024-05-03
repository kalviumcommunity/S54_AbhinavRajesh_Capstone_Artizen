import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Creators = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users. Please try again later.');
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ marginBottom: '4vh' }}>
        <h1 className='creators-title' style={{ fontSize: '5vw' }}>Creators in Artizen</h1>
      </div>
      <div style={{ marginBottom: '10vh' }}>
        <input
          type="text"
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '70vw', borderRadius: '50px', height: '7vh', border: 'none', paddingLeft: '2vw', fontSize: '1.5vw', letterSpacing: '0.8px' }}
        />
      </div>
      <div className='user-grid'>
        {filteredUsers.map((user, index) => (
          <div key={index} className='users-div'>
            <div className='pfp'>
              <img src={user.pfp} alt="" style={{ width: '8vw', height: '15vh', borderRadius: '50%' }} />
            </div>
            <div>
              <h2 style={{ color: 'white' }}>{user.username}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Creators;
