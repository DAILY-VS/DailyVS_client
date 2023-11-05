import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useClickEffect from '../../../utils/hooks/useClickEffect';

function MainHero({ data }) {
  const [todayPoll, setTodayPoll] = useState();
  useEffect(() => {
    setTodayPoll(data);
  }, []);
  const navigate = useNavigate();
  const onClickDetailButton = () => {
    navigate(`/vote-detail/${data.poll.id}`);
  };
  const [btnLeftIdx, setBtnLeftIdx] = useState(0);
  const [btnRightIdx, setBtnRightIdx] = useState(0);
  const buttonLeft = [
    '/images/TodayVS/buttonBlue.png',
    '/images/TodayVS/buttonBlue_pressed.png',
  ];
  const buttonRight = [
    '/images/TodayVS/buttonRed_pressed.png',
    '/images/TodayVS/buttonRed.png',
  ];
  const handleBtnLeftChange = () => {
    setBtnLeftIdx(prev => (prev === 0 ? 1 : 0));
  };
  const handleBtnRightChange = () => {
    setBtnRightIdx(prev => (prev === 0 ? 1 : 0));
  };
  useEffect(() => {
    const Linterval = setInterval(handleBtnLeftChange, 1000);
    return () => clearInterval(Linterval);
  }, []);
  useEffect(() => {
    const Rinterval = setInterval(handleBtnRightChange, 1000);
    return () => clearInterval(Rinterval);
  }, []);
  const btnLeft = useRef(null);
  const btnRight = useRef(null);
  const {
    handleBtnMD: handleLBtnMD,
    handleBtnMU: handleLBtnMU,
    handleBtnME: handleLBtnME,
    handleBtnML: handleLBtnML,
  } = useClickEffect(btnLeft);
  const {
    handleBtnMD: handleRBtnMD,
    handleBtnMU: handleRBtnMU,
    handleBtnME: handleRBtnME,
    handleBtnML: handleRBtnML,
  } = useClickEffect(btnRight);
  const TVImgLeftRef = useRef(null);
  const TVImgRightRef = useRef(null);

  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (TVImgLeftRef.current) {
      let TVLwidth = TVImgLeftRef.current.clientWidth;
      setWidth(TVLwidth);
      TVImgLeftRef.current.style.height = `${width}px`;
      TVImgRightRef.current.style.height = `${width}px`;
    }
  }, []);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleMakeVoteClick = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용해주세요');
    } else {
      navigate('/create');
    }
  };

  return (
    <Wrapper>
      <Container>
        <DailyVS onClick={onClickDetailButton}>
          <div className="tag">오늘의 VS</div>
          <Title>{!!todayPoll && todayPoll.poll?.title}</Title>
          <VS>
            <div>
              <img src="/media/images/Letters/v.svg" alt="V of VS" />
            </div>
            <div>
              <img src="/media/images/Letters/s.svg" alt="S of VS" />
            </div>
          </VS>
          <ButtonPress>
            <div
              className="buttonLeft"
              ref={btnLeft}
              onMouseDown={handleLBtnMD}
              onMouseUp={handleLBtnMU}
              onMouseEnter={handleLBtnME}
              onMouseLeave={handleLBtnML}
            >
              <img src={buttonLeft[btnLeftIdx]} alt="buttonleft" />
            </div>
            <div
              className="buttonRight"
              ref={btnRight}
              onMouseDown={handleRBtnMD}
              onMouseUp={handleRBtnMU}
              onMouseEnter={handleRBtnME}
              onMouseLeave={handleRBtnML}
            >
              <img src={buttonRight[btnRightIdx]} alt="buttonRight" />
            </div>
          </ButtonPress>
          <TV>
            <div>
              <TVImgLeft ref={TVImgLeftRef}>
                <img
                  src={`https://daily-vs.com/api/${data?.choice1}`}
                  alt="choice1"
                />
                <div>
                  <span>
                    {!!todayPoll && todayPoll.poll?.choices[0].choice_text}
                  </span>
                </div>
              </TVImgLeft>
            </div>
            <div>
              <TVImgRight ref={TVImgRightRef}>
                <img
                  src={`https://daily-vs.com/api/${data?.choice2}`}
                  alt="choice2"
                />
                <div>
                  <span>
                    {!!todayPoll && todayPoll.poll?.choices[1].choice_text}
                  </span>
                </div>
              </TVImgRight>
            </div>
          </TV>
        </DailyVS>
        <HeroMenuContainer>
          <FortuneContainer to="/fortune" className="heroMenu">
            <div className="fortuneHeader">
              <h2>오늘의 포춘쿠키 뽑으러 가기</h2>
            </div>
            <div className="fortuneIcon">
              <img src="/media/images/Fortune/Cookie.png" alt="포춘쿠키" />
            </div>
          </FortuneContainer>
          <MakeVoteContainer onClick={handleMakeVoteClick} className="heroMenu">
            <div className="makeVoteHeader">
              <h2>투표 만들기</h2>
            </div>
          </MakeVoteContainer>
        </HeroMenuContainer>
      </Container>
    </Wrapper>
  );
}
const TV = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  gap: 110px;

  & > div {
    flex: 1;
    height: 300px;
    text-align: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
  }
  & > div:first-child {
    background-image: url('images/TodayVS/tv_left.png');
    background-position: right center;
  }
  & > div:last-child {
    background-image: url('images/TodayVS/tv_right.png');
    background-position: left center;
  }

  @media screen and (max-width: 500px) {
    gap: 0px;
  }
`;
const TVImgLeft = styled.div`
  width: 174px;
  height: 174px;
  background-color: black;
  position: absolute;
  top: 31%;
  right: 34px;
  border-radius: 7px;
  background-color: white;
  overflow: hidden;
  z-index: -1;
  & > img {
    width: 100%;
    object-fit: cover;
  }
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > span {
    color: white;
    font-size: 24px;
  }
  @media screen and (max-width: 700px) {
    width: 60%;
    height: 56%;
    right: 10%;
  }
  @media screen and (max-width: 500px) {
    top: 34%;
  }
  @media screen and (max-width: 400px) {
    top: 39%;
  }
`;
const TVImgRight = styled.div`
  width: 174px;
  height: 174px;
  background-color: black;
  position: absolute;
  border-radius: 7px;
  top: 31%;
  left: 43px;
  background-color: white;
  overflow: hidden;
  z-index: -1;
  & > img {
    width: 100%;
    object-fit: cover;
  }
  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > span {
    color: white;
    font-size: 24px;
  }
  @media screen and (max-width: 700px) {
    width: 60%;
    left: 13%;
  }
  @media screen and (max-width: 500px) {
    top: 35%;
  }
  @media screen and (max-width: 400px) {
    top: 39%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #bbdcf1;
  cursor: pointer;
`;
const Container = styled.div`
  width: min(100%, 1200px);
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
const DailyVS = styled.div`
  height: 500px;
  flex: 1;
  background-color: aliceblue;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.mintSecondaryColor};
  }
  & > .tag {
    position: absolute;
    background-color: ${theme.colors.lightGrayColor};
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 15px;
    padding: 10px 20px;
    font-weight: 900;
  }
  @media screen and (max-width: 500px) {
    & > .tag {
      left: 50%;
      transform: translate(-50%);
      border-bottom-left-radius: 15px;
      background-color: ${theme.colors.blueBgColor};
      border: 4px solid ${theme.colors.redpinkPrimaryColor};
      border-top: none;
    }
  }
`;
const Title = styled.div`
  padding: 10px 28px;
  margin-bottom: 80px;
  margin-top: 20px;
  background-color: ${theme.colors.darkbluePrimaryColor};
  border-radius: 10px;
  border: 2px solid ${theme.colors.mintSecondaryColor};
  color: white;
  text-align: center;
  font-size: 20px;
  @media screen and (max-width: 500px) {
    margin-top: 30px;
  }
`;
const ButtonPress = styled.div`
  display: flex;
  cursor: pointer;
  z-index: 10;

  & div {
    transition: 0.1s;
  }
  & img {
    width: 130px;
    z-index: 100;
  }
`;
const VS = styled.div`
  position: relative;
  width: 160px;
  height: 160px;

  & > div {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
  }
  & > div:first-child {
    top: 0;
    left: 0;
  }
  & > div:last-child {
    right: 0;
    bottom: 0;
  }
  & > div::before {
    position: absolute;
    content: '';
    background-color: rgba(167, 220, 221, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  & > div:last-child:before {
    background-color: rgba(69, 124, 158, 0.65);
  }
  & > div > img {
    z-index: 5;
  }
  @media screen and (max-width: 500px) {
    top: -100px;
    transform: scale(0.6);
  }
`;
const HeroMenuContainer = styled.div`
  width: 350px;

  background-color: ${theme.colors.darkbluePrimaryColor};
  padding: 16px;
  grid-gap: 16px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  & > .heroMenu {
    width: 100%;
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 270px;
  }
  @media screen and (max-width: 800px) {
    height: 200px;
  }
`;
const FortuneContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  overflow: hidden;
  transition: 0.3s;
  border-radius: 10px;
  &:hover {
    border-radius: 20px;
  }
  &:hover h2 {
    color: black;
  }

  & .fortuneHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffeef0;
    height: 30%;
    padding: 10px;
    text-align: center;
    line-height: 1.5rem;
    word-break: keep-all;
    & h2 {
      font-size: 20px;
      font-family: 'GongGothicLight';
    }
  }
  & .fortuneIcon {
    background-color: #ebecff;
    height: 70%;
    position: relative;

    & img {
      width: 140px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      animation: AnimatedFortune 3s ease-in-out infinite;
    }
  }
  @media screen and (max-width: 800px) {
    & .fortuneIcon {
      & img {
        width: 100px;
      }
    }
    & .fortuneHeader {
      & h2 {
        font-size: 16px;
      }
    }
  }
  @keyframes AnimatedFortune {
    0%,
    100% {
      transform: translate(-50%, -45%);
    }
    50% {
      transform: translate(-50%, -55%);
    }
  }
`;

const MakeVoteContainer = styled.div`
  background: url(/images/kakao-thumbnail.png);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  transition: 0.3s;
  border-radius: 10px;
  &:hover {
    border-radius: 20px;
  }
  & .makeVoteHeader {
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  &:hover h2 {
    color: black;
  }
  @media screen and (max-width: 800px) {
    & .makeVoteHeader {
      font-size: 16px;
    }
  }
`;
export default MainHero;
