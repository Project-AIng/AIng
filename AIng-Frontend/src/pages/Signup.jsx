import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './pages.css';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [labelsVisible, setLabelsVisible] = useState({
    name: true,
    email: true,
    password: true,
    password2: true
  });

  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false); // Add this state variable

  const handleFocus = (event) => {
    const name = event.target.name;
    setLabelsVisible({ ...labelsVisible, [name]: false });
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    if (user[name] === '') {
        setLabelsVisible({ ...labelsVisible, [name]: true });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });

    // 유효성 검사
    const message = {};
    switch (name) {
      case 'name':
        if (value.length < 2) {
          message.name = '이름은 2글자 이상이어야 합니다.';
        } else if (value.length > 6) {
          message.name = '이름은 6글자 이하이어야 합니다.';
        } else {
          message.name = '';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          message.email = '이메일 형식이 올바르지 않습니다.';
        } else {
          message.email = '';
        }
        break;
      case 'password':
        if (value.length < 8) {
          message.password = '비밀번호는 최소 8자리 이상이어야 합니다.';
        } else {
          message.password = '';
        }
        break;
      case 'password2':
        if (value !== user.password) {
          message.password2 = '비밀번호가 일치하지 않습니다.';
        } else {
          message.password2 = '';
        }
        break;
      default:
        break;
    }
    setErrorMessage({ ...errorMessage, ...message });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 유효성 검사
    const message = {};
    Object.keys(user).forEach((name) => {
      switch (name) {
        case 'name':
          if (user[name].length < 2) {
            message.name = '이름은 2글자 이상이어야 합니다.';
          } else if (user[name].length > 6) {
            message.name = '이름은 6글자 이하이어야 합니다.';
          }
          break;
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(user[name])) {
            message.email = '이메일 형식이 올바르지 않습니다.';
          }
          break;
        case 'password':
          if (user[name].length < 8) {
            message.password = '비밀번호는 최소 8자리 이상이어야 합니다.';
          }
          break;
        case 'password2':
          if (user[name] !== user.password) {
            message.password2 = '비밀번호가 일치하지 않습니다.';
          }
          break;
        default:
          break;
      }
    });

    // 에러 메시지가 있으면 보여주고 종료
    if (Object.keys(message).length > 0) {
      setErrorMessage({ ...errorMessage, ...message });
      return;
    }

    // 비밀번호 재입력 검사
    if (user.password !== user.password2) {
      setErrorMessage({ ...errorMessage, password2: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    // 회원가입 요청 보내기
    axios
      .post('http://localhost:8080/signup', user)
      .then((response) => {
        console.log(response.data);
        // 회원가입 성공 처리
        setIsSignUpSuccessful(true);
        navigate("/Login");
        alert("회원가입 완료.");
      })
      .catch((error) => {
        console.log(error.response.data);
        // 회원가입 실패 처리
        setIsSignUpSuccessful(false);
      });
  };


  return (
    <div className='container'>
  <h1>회원가입</h1>
  <form className='input_data' onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      value={user.name}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
    {labelsVisible.name && <label>이름을 입력해주세요</label>}
    {errorMessage.name && <p className='error_message'>{errorMessage.name}</p>}
  </form>
  <form className='input_data' onSubmit={handleSubmit}>
    <input
      type="text"
      name="email"
      value={user.email}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
    {labelsVisible.email && <label>이메일을 입력해주세요</label>}
    {errorMessage.email && <p className='error_message'>{errorMessage.email}</p>}
  </form>
  <form className='input_data' onSubmit={handleSubmit}>
    <input
      type="password"
      name="password"
      value={user.password}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
    {labelsVisible.password && <label>비밀번호 설정(최소 8자리)</label>}
    {errorMessage.password && <p className='error_message'>{errorMessage.password}</p>}
  </form>
  <form className='input_data' onSubmit={handleSubmit}>
    <input
      type="password"
      name="password2"
      value={user.password2}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
    {labelsVisible.password2 && <label>비밀번호 재입력</label>}
    {errorMessage.password2 && <p className='error_message'>{errorMessage.password2}</p>}
  </form>
  <button className='btn' onClick={handleSubmit}>가입 완료</button>
  {isSignUpSuccessful && <p>가입이 완료됐습니다!</p>}
</div>

    );
}
