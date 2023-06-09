import React from 'react';
import styled from 'styled-components';
import useScrollFadeIn from '../../Hooks/useScrollFadeIn';

const Container = styled.div`
    padding: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-align: center;
`;

const TextContainer = styled.div`
    flex: 1;
    padding-right: 16px;
    text-align: center;
`;

const Image = styled.img`
    padding:40px;
    width: 60%;
    height:20%; 
    border-radius: 20px; 
`;
const Text = styled.div`
    color: #444445;
    font-size: 30px;
    margin-top:100px;
    margin-bottom: 10px;
    font-weight: 600;
    padding:
`;

const DetailText = styled.div`
    color :black; 
    font-weight:600;
    font-size:17px;
`;


export default function Guide3() {
    const fadeInText = useScrollFadeIn('up', 1, 0);
    const fadeInDetailText = useScrollFadeIn('up', 1, 0.2);
    const fadeInImage = useScrollFadeIn('up', 1, 0.2);

    return (
        <>
        <Container>
            <Text {...fadeInText}>표현, 문법까지 전부<br></br>실시간으로 교정해드려요
            </Text>
        <Image {...fadeInImage} src="/images/Guide3.png" alt="Guide3" />
        <TextContainer>
            <DetailText {...fadeInDetailText}>
            AI의 정확한 교정으로<br></br>내 영어가 원어민처럼 자연스러워져요
            </DetailText>
            <br></br>
        </TextContainer>
        
        </Container>
        </>
    );
}

