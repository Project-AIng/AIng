import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 100px;
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
    margin-top:80px;
    margin-bottom:50px;
`;

const TextContainer = styled.div`
    flex: 1;
    padding-right: 16px;
    text-align: left;
`;

const Image = styled.img`
    width: 50%; 
    border-radius: 40px; 
`;
const Text = styled.div`
    color: black;
    font-size: 50px;
    margin-bottom: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 600;
`;

const RoundedText = styled.div`
    border: 10px solid #136dd4; 
    border-radius: 5px; 
    padding: 2px 10px; 
    display: inline-block;
    color : white;
    background-color:#136dd4;
    margin-top:30px;
    font-size:20px;
`;
const DetailText = styled.div`
    color :black; 
    font-weight:500;
    font-family: "Lato", sans-serif;
`;
export default function HomeMain() {
    return (
        <>
        <Container>
        <TextContainer>
            <Text>AIng을 만나면
                <br></br>
                영어가 보인다
            </Text>
            <DetailText>
            AIng은 AI와의 주제별 프리토킹, 채팅을 <br></br>통해서
            영어 능력 점검하며 향상 시킬 수 <br></br>
            있는 웹 서비스 입니다.<br></br>
            </DetailText>
            <br></br>
            <RoundedText>
            <Link to='/TopicChoice'>
            Get Start →</Link>
            </RoundedText>
            
        </TextContainer>
        <Image src="/images/homeMain.png" alt="homeMain" />
        </Container>
    </>
    );
}

