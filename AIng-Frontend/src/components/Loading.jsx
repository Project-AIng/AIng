import React from 'react';
import { FadeLoader } from 'react-spinners';

export default function Loading() {
    return (
        <>
        <div className='text-black'>
            분석 중입니다 잠시만 기다려주세요.</div>
            <FadeLoader color='#136dd4'/>
        </>
    );
}