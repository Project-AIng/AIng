import React from 'react';
import styled from 'styled-components';
import useScrollFadeIn from '../../Hooks/useScrollFadeIn';

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
    color:#136dd4;
    font-size: 40px;
    margin-bottom: 40px;
    font-weight: 600;
`;

const DetailText = styled.div`
    color :black; 
    font-weight:600;
`;


export default function Guide4() {
    const fadeInText = useScrollFadeIn('left', 1, 0);

    return (
        <>
        <Container>
        <Image src="/images/Guide4.png" alt="Guide4" />
        <TextContainer>
            <Text>분석 결과
            </Text>
            <DetailText {...fadeInText}>
            대화할 때 마다 
            내 영어 문장 스코어를 확인할 수 있어요<br></br>
            나의 영어 능력치를 확인하면서 학습해보아요!
            </DetailText>
            <br></br>
            
        </TextContainer>
        </Container>
        </>
    );
}

