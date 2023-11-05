import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EmailError = () => {
  return (
    <Container>
      <ImgSection>
        <RedFace src="/media/images/ErrorPage/404.png" />
        <BlueFace src="/media/images/ErrorPage/mail.png" />
      </ImgSection>
      <Number>404</Number>
      <ErrorKorean>이메일 인증에 실패하였습니다</ErrorKorean>
      <GoToMain to="/">메인페이지로 돌아가기</GoToMain>
    </Container>
  );
};

export default EmailError;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgSection = styled.div`
  margin-top: 2rem;
  display: flex;
`;

const BlueFace = styled.img`
  width: 200px;
`;

const RedFace = styled.img`
  width: 200px;
`;

const Number = styled.h1`
  margin-top: 2rem;
  font-family: 'GongGothicBold';
  font-size: 100px;
  color: #17355a;
`;

const ErrorKorean = styled.h2`
  margin-top: 1.5rem;
  font-family: 'GongGothicLight';
  font-size: 20px;
  color: #17355a;
`;

const GoToMain = styled(Link)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GongGothicLight';
  font-size: 20px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
    text-decoration: none;
  }
`;
