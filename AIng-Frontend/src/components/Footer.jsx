import React from 'react';
import { Link } from 'react-router-dom';
import { RiInstagramFill, RiFacebookBoxFill, RiYoutubeFill, RiGithubFill } from 'react-icons/ri';
import './css/Footer.css';

export default function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <div className='footer'>
        <div className='fcontainer'>
        <div className='left'>
            <h3>AIng 고객센터</h3>
            <h2>8282-8282<span>공휴일 제외 오전 9시 - 오후 6시</span></h2>
            <div className='btnContent'>
            <span>카카오톡 문의</span><p>공휴일 제외 오전 9시 - 오후 6시</p>
            </div>
            <div className='btnContent'>
            <span>1:1 문의</span><p>365일<br/>고객센터 운영시간에 순차적으로 답변드리겠습니다.</p>
            </div>
        </div>

        <div className='right'>
            <ul className='navbar'>
            <li><Link to="/">AIng소개</Link></li>
            <li>마이페이지</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>이용안내</li>
            </ul>
            <p className='notice'>
            법인명 : AIng <span className='line'></span> 사업자등록번호 : 119-82-1234<br/>
            통신판매업 : 한성대학교 1234 호 <span className='line'></span> 개인정보보호책임자 : AIng<br/>
            주소 : 서울특별시 성북구 1234로, 10층 <span className='line'></span> 대표이사 : AIng<br/>
            입점문의 : 8282-8282 <span className='line'></span> 채용문의 : 8282-8282
            </p>
            <ul className='sns'>
            <li><RiInstagramFill size="30" title="인스타그램" /></li>
            <li><RiFacebookBoxFill size="30" title="페이스북"/></li>
            <li><RiYoutubeFill size="30" title="유튜브"/></li>
            <li><RiGithubFill size="30" title="github"/></li>
            </ul>
            </div>
        </div>
        <p className='copy'>© {year}.All rights reserved.</p>
    </div>
    );
}

