import React from 'react';
import styled from 'styled-components';
import Guide1 from '../components/AIngGuideComponents/Guide1';
import Guide2 from '../components/AIngGuideComponents/Guide2';
import Guide3 from '../components/AIngGuideComponents/Guide3';
import Guide4 from '../components/AIngGuideComponents/Guide4';
import Guide5 from '../components/AIngGuideComponents/Guide5';
import Guide6 from '../components/AIngGuideComponents/Guide6';
const Container = styled.div`
    padding: 30px;
    display: flex;
    align-items: center;
    width: 100%; 
    height:4%;
    background-color:#136dd4;
`;
const Text= styled.div`
    color:white;
    font-weight:600;

`;

const Text2= styled.div`
    color:white;
    font-weight:600;
    margin-left:auto;
    border: 1px solid white; 
    border-radius: 5px; 
    padding: 4px 10px;
`;

export default function AIngGuide() {
    return (
        <>
        <Container>
            <Text>원어민 없는 프리토킹, 완전히 새로운 등장 AI 튜터 인사드려요!</Text>
            <Text2>#프리토킹 #문법교정 #분석결과</Text2>
        </Container>
        <Guide5/>
        <Guide1/>
        <Guide2/>
        <Guide6/>
        <Guide3/>
        <Guide4/>
        </>
    );
}

