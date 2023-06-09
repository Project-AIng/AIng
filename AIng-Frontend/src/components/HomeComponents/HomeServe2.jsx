import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 70px;
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
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
    font-size: 35px;
    margin-bottom: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 600;
`;

const DetailText = styled.div`
    color :#136dd4; 
    font-weight:600;
    font-family: "Lato", sans-serif;
`;
const DetailText2 = styled.div`
    color :black; 
    font-weight:500;
    font-family: "Lato", sans-serif;
`;
export default function HomeServe2() {
    return (
        <>
        <Container>
        <TextContainer>
            <Text>영어 학습의 미래
                <br></br>
                AI 와의 프리토킹
            </Text>
            <DetailText2>
            이제 언제 어디서나, 진짜 사람같은 AI와 자유롭게 영어로 대화하세요.
            <br></br>
            어색한 표현이나 문법도 AI가 고쳐줘요.
            </DetailText2>
            <br></br>
            <DetailText>
            <Link to='/AIngGuide'>
            AIng 튜터 자세히 살펴보기 👉🏻</Link>
            </DetailText>
        </TextContainer>
        <Image src="/images/homeServe2.png" alt="homeServe2" />
        </Container>
    </>
    );
}

