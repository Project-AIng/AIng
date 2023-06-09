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
    text-align: center;
`;

const Image = styled.img`
    width: 50%; 
    border-radius: 40px; 
`;
const Text = styled.div`
    color: black;
    font-size: 40px;
    margin-bottom: 40px;
    font-family: "Lato", sans-serif;
    font-weight: 600;
`;

const DetailText = styled.div`
    color :black; 
    font-weight:400;
    font-family: "Lato", sans-serif;
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
export default function Guide1() {
    return (
        <>
        <Container><Image src="/images/Guide1.png" alt="Guide1" />
        <TextContainer>
            <Text>오늘은 어떤 주제로
                <br></br>
                대화를 해볼까요?
            </Text>
            <DetailText>
            특정 주제를 선택하세요!
            <br></br>
            잘 대답해주는 AI 튜터와
            <br></br>
            자연스럽게 대화할 수 있습니다.
            </DetailText>
            <br></br>
            <RoundedText><Link to='/TopicChoice'>주제별 프리토킹</Link></RoundedText>
        </TextContainer>
        
        </Container>
        </>
    );
}

