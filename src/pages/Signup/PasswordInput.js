import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import LoginNav from '../../components/LoginNav/LoginNav';
import { useLocation, useNavigate } from 'react-router-dom';

const PasswordInput = () => {
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const pathArray = location.pathname.split('/');
  const uid = pathArray[pathArray.length - 3];
  const token = pathArray[pathArray.length - 2];

  console.log('uid', uid);
  console.log('token', token);
  const handlePassword1Change = e => {
    const newPassword1 = e.target.value;
    setPassword1(newPassword1);
    console.log(newPassword1);
  };

  const handlePassword2Change = e => {
    const newPassword2 = e.target.value;
    setPassword2(newPassword2);
    console.log(newPassword2);
  };
  useEffect(() => {
    if (password1 === password2 && password1.length >= 8) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password1, password2]);

  const sendResetPasswordRequest = () => {
    const requestBody = {
      uid: uid,
      token: token,
      new_password1: password1,
      new_password2: password2,
    };

    console.log(requestBody);
    console.log(
      `https://daily-vs.com/api/accounts/password/reset/confirm/${uid}/${token}`,
    );
    fetch(
      `https://daily-vs.com/api/accounts/password/reset/confirm/${uid}/${token}/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then(response => {
        if (response.ok) {
          alert('비밀번호 변경 성공! 다시 로그인해 주세요!');
        } else {
          console.error('Password reset failed');
          alert('비밀번호 설정 실패!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const onSubmit = e => {
    e.preventDefault();
    sendResetPasswordRequest();
  };

  return (
    <>
      <LoginNav />
      <Container onSubmit={onSubmit}>
        <LogoImg src="/images/LoginNav/Only_Tex.png" />
        <PasswordTitle>비밀번호 재설정</PasswordTitle>
        <PasswordContent>새로운 비밀번호를 설정해주세요</PasswordContent>
        <PasswordQuestion>
          {/* {selectedEmail}님 <br /> */}
          <PasswordLabel>비밀번호(8자 이상 15자 이하)</PasswordLabel>
          <PasswordWrite
            placeholder="비밀번호 입력"
            type="password"
            value={password1}
            onChange={handlePassword1Change}
          />
          <PasswordLabel>비밀번호 재입력(8자 이상 15자 이하)</PasswordLabel>
          <PasswordReWrite
            placeholder="비밀번호 재입력"
            type="password"
            name="password2"
            value={password2}
            onChange={handlePassword2Change}
          />
        </PasswordQuestion>
        <PasswordLabel>
          {passwordMatch && (
            <PasswordMatchText>
              비밀번호 일치 <PassWordCheck src="images/LoginNav/check.png" />
            </PasswordMatchText>
          )}
        </PasswordLabel>
        <PasswordRegister onClick={onSubmit} disabled={!passwordMatch}>
          비밀번호 변경하기
        </PasswordRegister>
      </Container>
    </>
  );
};

export default PasswordInput;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40rem;
  white-space: nowrap;
`;

const PasswordTitle = styled.h1`
  font-family: 'GongGothicLight';
  color: #17355a;
  font-size: 28px;
`;

const PasswordContent = styled.div`
  margin-top: 1rem;
`;

const PasswordWrite = styled.input`
  margin-top: 10px;
  width: min(100%, 300px);
  height: 50px;
  font-size: 16px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const PasswordReWrite = styled.input`
  margin-top: 10px;
  width: min(100%, 300px);
  height: 50px;
  font-size: 16px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);  
  }
  50% {
    transform: scale(1.2); 
  }
  100% {
    transform: scale(1); 
  }
`;

const LogoImg = styled.img`
  width: 220px;
  margin-top: 3rem;
`;

const PasswordQuestion = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  font-size: 20px;
  text-align: center;
`;

const PasswordRegister = styled.button`
  margin-left: 10px;
  margin-top: 1rem;
  font-size: 18px;
  width: 200px;
  height: 35px;
  border: solid 1px #17355a;
  background-color: white;
  color: #17355a;
  &:disabled {
    background-color: #bdbdbd;
    border: 1px solid #bdbdbd;
    color: white;
    cursor: not-allowed;
  }
  &:hover {
    cursor: pointer;
  }
`;

const PasswordLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  height: 20px;
  margin-top: 10px;
  margin-bottom: -10px;
`;

const PassWordCheck = styled.img`
  opacity: 0.9;
  width: 20px;
  margin-left: 5px;
  animation: ${pulse} 2s infinite;
`;

const PasswordMatchText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: green;
  opacity: ${props => (props.visible ? 0 : 1)};
  transition: opacity 0.7s ease;
`;
