import React from 'react';
import styled from 'styled-components';
import useScrollCount from '../../Hooks/useScrollCount';

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
    color :#444445; 
    font-weight:600;
`;
export default function Guide6() {
    const { ref } = useScrollCount(88, 0, 2000, 0);

    return (
        <>
        <Container>
        <Image src="/images/Guide6.png" alt="Guide6" />
        <TextContainer>
            <Text>웹캠을 통한 자가 점검
            </Text>
            <DetailText>
            그거 아셨나요?<br></br> 청각 장애인 중  <p
        ref={ref}
        style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: 'black',
            display: 'inline-block',
        }}
        >
        0
        </p>%는
            말로 의사소통이 가능합니다.(2017 보건복지부)<br></br>
            웹캠을 통해 자신의 입모양을 보면서 영어 회화 연습을 해보세요.<br></br>
            청각 장애인/ 비장애인 모두에게 유용한 영어 웹 어플리케이션
            <br></br>
            </DetailText>
            <br></br>
            
        </TextContainer>
        </Container>
        </>
    );
}

