import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginEmail = () => {
  return (
    <Container>
      <ImgSection>
        <BlueFace src="/media/images/ErrorPage/mail.png" />
      </ImgSection>
      <ErrorKorean>
        이메일 인증 완료 후 <br /> 로그인해주세요
      </ErrorKorean>
      <GoToMain to="/">메인페이지로 돌아가기</GoToMain>
    </Container>
  );
};
export default LoginEmail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgSection = styled.div`
  margin-top: 4rem;
  display: flex;
`;

const BlueFace = styled.img`
  width: 250px;
`;

const ErrorKorean = styled.h2`
  margin-top: 1.5rem;
  font-family: 'GongGothicLight';
  font-size: 24px;
  color: #ff495a;
  text-align: center;
  line-height: 1.2;
`;

const GoToMain = styled(Link)`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GongGothicLight';
  font-size: 20px;
  color: #17355a !important;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
    text-decoration: none;
  }
`;
