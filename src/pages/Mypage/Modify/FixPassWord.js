import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const FixPassWord = () => {
  const navigate = useNavigate();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  console.log(password1, password2);
  const url = window.location.href;
  const uid = url.split('/').slice(-3, -2)[0];
  const token = url.split('/').slice(-2)[0];

  useEffect(() => {
    if (password1 === password2 && password1.length >= 8) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password1, password2]);

  const handleInformationClick = event => {
    event.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        new_password1: password1,
        new_password2: password2,
        uid: uid,
        token: token,
      }),
    };

    fetch(
      `https://daily-vs.com/api/accounts/password/reset/confirm/${uid}/${token}/`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('서버 응답:', result);
        console.log('Request Body:', JSON.stringify({}));
        if (result) {
          navigate(`/`);
        }
      })
      .catch(error => {
        console.error('POST 요청 오류:', error);
      });
  };

  return (
    <Container>
      <SignupLogo src="/media/images/LoginNav/Only_Tex.png" />
      <PasswordModify>비밀번호 변경하기</PasswordModify>
      <SignupLabel>비밀번호(8자 이상 15자 이하) </SignupLabel>
      <TextInput
        value={password1}
        type="password"
        placeholder="비밀번호"
        onChange={e => {
          const newPassword = e.target.value;
          setPassword1(newPassword);
        }}
        required
      />
      <SignupLabel>
        확인 비밀번호
        {passwordMatch && (
          <PasswordMatchText>
            <PassWordCheck src="/media/images/LoginNav/check.png" />
          </PasswordMatchText>
        )}
      </SignupLabel>
      <TextInput
        type="password"
        placeholder="확인 비밀번호"
        name="password2"
        value={password2}
        onChange={e => {
          const newPassword = e.target.value;
          setPassword2(newPassword);
        }}
      />
      <Register disabled={!passwordMatch} onClick={handleInformationClick}>
        등록하기
      </Register>
    </Container>
  );
};
export default FixPassWord;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignupLogo = styled.img`
  width: 280px;
`;

const PasswordModify = styled.h1`
  font-family: 'GongGothicLight';
  font-size: 24px;
  color: #17355a;
  text-align: center;
  margin-bottom: 1rem;
`;

const SignupLabel = styled.label`
  font-size: 14px;
  display: flex;
  margin-top: 10px;
  height: 20px;
  width: 300px;
`;

const TextInput = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 2rem;
  font-size: 16px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const PasswordMatchText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-bottom: 7px;
  color: green;
  transition: opacity 0.3s ease;
`;

const PassWordCheck = styled.img`
  opacity: 0.9;
  width: 20px;
  margin-left: 5px;
`;

const Register = styled.button`
  margin-top: 10px;
  margin-bottom: 3rem;
  width: 300px;
  height: 50px;
  font-size: 20px;
  color: white;
  background-color: ${props => (props.disabled ? '#d4d4d4' : '#ff495a')};
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;
