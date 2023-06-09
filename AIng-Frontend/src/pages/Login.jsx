import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import './pages.css';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: email,
                password: password
            });
            const token = response.data.token;
            localStorage.setItem('auth_token', token);
            // After successfully logging in, request the email from the /get_email endpoint
            const emailResponse = await axios.post('http://localhost:5000/get_email', {
                token: token  // assuming that your Flask server expects the token in the request body
            });
            if (emailResponse.status === 200) {
                // Optionally, save the email to localStorage or another suitable place
                localStorage.setItem('user_email', emailResponse.data.email);
            }
            navigate("/"); 
            alert("로그인 완료");
            window.location.reload();
        } catch (error) {
            console.error(error);
            setAuthError('잘못된 이메일 혹은 비밀번호입니다.');
            alert("이메일과 비밀번호를 확인해주세요");

        }
    }

    return (
        <div className='container'>
            <h1>로그인하기</h1>
            {authError && <div className='alert alert-danger'>{authError}</div>}
            <form className='input_data' onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} 
                placeholder='이메일을 입력해주세요.'/>
            </form>
            <form className='input_data' onSubmit={handleSubmit}>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                placeholder='비밀번호를 입력해주세요.'/>
            </form>
            <button className='btn' onClick={handleSubmit}>로그인</button>
            <Link to='/Signup'><button className='btn'>회원가입</button>
            </Link>
        </div>
    );
}