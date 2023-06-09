import React, {useState} from 'react';
import { Link,Route,Routes } from 'react-router-dom';
import Mypage from '../pages/Mypage';
import Deep from '../pages/Deep';
import './css/MypageMenu.css';


export default function MypageMenu() {
    const [activeBar, setActiveBar] = useState('MyPage');

    const handleBarClick = (tab) => {
        setActiveBar(tab);
    };
    return (
    <>
    <div className='MyPageMenuContainer'>
        <div className='MyPageMenuBarContainer'>
            <h1>마이 페이지</h1>
            <div>
            <ul className='MyPageMenuBar'>
                <li className={activeBar === 'MyPage' ? 'active' : ''}>
                <Link to="/MypageMenu/MyPage" 
                onClick={() => handleBarClick('MyPage')}
                >내 정보</Link>
                </li>
                <li className={activeBar === 'Deep' ? 'active' : ''}>
                <Link to="/MypageMenu/Deep" 
                onClick={() => handleBarClick('Deep')}
                >분석</Link>
                </li>
            </ul>
            </div>
            </div>
        <div className='MyPageDeep'>
                <Routes>
                    <Route path="MyPage" element={<Mypage/>}/>
                    <Route path="Deep" element={<Deep/>}/>
                    <Route/>
                </Routes>
        </div>
    </div>
    </>
    );
}

