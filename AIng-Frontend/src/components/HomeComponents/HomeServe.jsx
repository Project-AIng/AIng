import React from 'react';
import styled from 'styled-components';
import  useScrollFadeIn  from '../../Hooks/useScrollFadeIn';
import { Link } from 'react-router-dom';

const S = { 
    Wrapper: styled.section`
    width: 100%;
    padding: 120px 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #136dd4;
    `,
    Label: styled.p`
    display: inline-block;
    margin-bottom: 1rem;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    `,
    Title: styled.h2`
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.1;
    color:black;
    `,
};
export default function HomeServe() {
    const animatedItem = {
        0: useScrollFadeIn('up', 1, 0),
        1: useScrollFadeIn('up', 1, 0.2),
        2: useScrollFadeIn('up', 1, 0.3),
    };
    return (
        <S.Wrapper>
    <S.Label {...animatedItem[0]}>Get Started</S.Label>
    <S.Title {...animatedItem[1]}>
        AIng is AI Tutor
        <br />
        Speak English Out Loud Now
    </S.Title>
    <div {...animatedItem[2]}>
        <S.Label>
            <Link to='/TopicChoice'>
        <button>
        Select Topic
        </button>
        </Link>
        </S.Label>
    </div>
    </S.Wrapper>
    );
}


