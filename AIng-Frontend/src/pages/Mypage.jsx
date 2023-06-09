import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage.css';

export default function Mypage() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState('');
  const [showPlot, setShowPlot] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://localhost:8080/mypage', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const analyzeScores = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.post('http://localhost:8080/analyze', {
        token: token
      });
      setImage(response.data.image);
      setShowPlot(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div className='text-black'>Loading...</div>;
  }

  return (
    <div className='MyPageContainer'>
      <div className='title'>내 정보</div><span className='MyPageLine'></span>
      <div className='UserInfoContainer'>
        <div className='p-2'>이름 <div className='UserInfoBox'>{user.name}</div></div>
        <div className='p-2'>아이디 <div className='UserInfoBox'>{user.email}</div></div>
      </div>
      <button onClick={analyzeScores}></button>
      {showPlot && <img src={image} alt='Score Plot' />}
    </div>
  );
}
