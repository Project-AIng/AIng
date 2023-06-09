import React from 'react';
import styled ,{ keyframes }from 'styled-components';

const Container = styled.div`
    padding: 100px;
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
`;

const TextContainer = styled.div`
    flex: 1;
    padding-right: 16px;
`;
const fadeIn = keyframes`
    from {
    opacity: 0;
    }
    to {
    opacity: 1;
    }
`;

const Image = styled.img`
    width: 50%; 
    border-radius: 60px; 
    animation: ${fadeIn} 1s ease-in-out;
`;
const Text = styled.div`
    color: black;
    font-size: 28px;
    margin-bottom: 16px;
    font-family: "Lato", sans-serif;
    font-weight: 600;

`;

const RoundedText = styled(Text)`
    border: 2px solid black; 
    border-radius: 5px; 
    padding: 4px 16px; 
    display: inline-block;
`;
const DetailText = styled.div`
    color :#535353; 
    font-weight:400;
`;

export default function Guide5() {
    return (
    <>
        <Container>
        <Image src="/images/Guide5.png" alt="Guide5" />
        <TextContainer>
            <RoundedText>AI 튜터링</RoundedText>
            <Text>
            자연스러운 대화 학습에 최적화 된 AI 튜터
            </Text>
            <DetailText>
            AI튜터 AIng과 함께 영어 울렁증을 극복해보세요.
            <br></br>
            외국인과의 대화에서 더이상 겁먹지 마세요.
            <br></br>
            이제 AIng의 AI튜터와 함께 말해보세요.
            </DetailText>
        </TextContainer>
        
        </Container>
    </>
    );
}
