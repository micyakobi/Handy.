import React, { useState } from 'react';
import Video from '../../styles/Video.mp4';
import styled from 'styled-components';
import {  Link } from 'react-scroll';
import { useHistory } from 'react-router-dom';
import { HomeBg, HomeP2, HomeContainer, VideoBg, HomeP, HomeContent, HomeBtnWrapper, HomeH1, ArrowForward, ArrowRight } from './LiveHomeElements';
import homepage from '../../images/homepage.png';

const LiveHome = () => {

    const history=useHistory();
    const [hover, setHover] = useState(false);

    const handleGetStarted = () => {
        history.push(`/signin`);
    }

    const onHover = () => {
        setHover(!hover);
    }

    return (
        <HomeContainer>
            <HomeBg>
                {/* <VideoBg autoPlay loop muted src={Video} type='Video/mp4' />\ */}
                <img src={homepage} />
            </HomeBg>

            <HomeContent>
                <HomeH1>WELCOME TO HANDY!</HomeH1>
                <HomeP>
                    SERVICE PROVIDERS FOR ALL YOUR NEEDS
                </HomeP>
                <HomeP2>
                    Let us know what you're looking for
                </HomeP2>
                <HomeBtnWrapper>

                    <Button onClick={handleGetStarted} primary="true" dark="true" onMouseEnter={onHover} onMouseLeave={onHover}>
                        Get started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>

                </HomeBtnWrapper>
            </HomeContent>

        </HomeContainer>
    )
}

const Button = styled(Link)`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#fff' : '#0087b4')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : ' 12px 30px')};
    color: ${({ dark }) => (dark ? '#0087b4' : '#0087b4')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border:none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items:center;
    transition: all 0.2s ease-in-out;


    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => (primary ? '#93a3a3' : '#fff')};
    }
`

export default LiveHome;
