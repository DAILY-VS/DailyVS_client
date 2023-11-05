import React from 'react';
import styled from 'styled-components';
import LoginNav from '../../components/LoginNav/LoginNav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Email = () => {
  const selectedEmail = useSelector(state => state.email.selectedEmail);
  const selectedNickname = useSelector(
    state => state.nickname.selectedNickname,
  );

  const navigate = useNavigate();
  console.log(selectedEmail);
  const handleResendEmail = async () => {
    console.log('click');
    try {
      await axios.post(`https://daily-vs.com/api/accounts/resend-email/`);
    } catch (error) {
      console.error('Error resending email:', error);
    }
  };

  return (
    <>
      <LoginNav />
      <Container>
        <EmailTitle>이메일 인증</EmailTitle>
        <LogoImg src="/media/images/Nav/main_logo.png" />
        <EmailContent>
          {!selectedEmail ? (
            <div>
              <p>
                이미 가입했거나 유효하지 않은 이메일 입니다.
                <br />
                다른 계정으로 회원가입을 진행해주세요
              </p>
              <EmailBtn onClick={() => navigate('/signup')}>
                회원가입 페이지로
              </EmailBtn>
            </div>
          ) : (
            <div>
              <p>
                안녕하세요 <Nickname>{selectedNickname}</Nickname>님!
              </p>
              <p>
                <Nickname>{selectedEmail}</Nickname>에서 <br />
                이메일 인증을 완료해주세요!
              </p>
              <EmailQuestion>아직 이메일을 받지 않으셨다면? </EmailQuestion>
              <EmailBtn onClick={handleResendEmail}>
                인증 이메일 다시받기
              </EmailBtn>
            </div>
          )}
        </EmailContent>
      </Container>
    </>
  );
};
export default Email;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 40rem;
`;

const EmailTitle = styled.h1`
  font-family: 'GongGothicLight';
  color: #17355a;
  font-size: 32px;
`;

const EmailContent = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 0.2rem;
  line-height: 1.3;
`;

const LogoImg = styled.img`
  width: 220px;
`;

const Nickname = styled.span`
  font-family: 'GongGothicMedium';
  color: #17355a;
`;

const EmailBtn = styled.button`
  margin-left: 10px;
  margin-top: 1rem;
  font-size: 16px;
  width: 200px;
  height: 35px;
  border: solid 1px #ff495a;
  background-color: white;
  color: #ff495a;
  &:hover {
    background-color: #ff495a;
    color: white;
  }
`;

const EmailQuestion = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
`;
