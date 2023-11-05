import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginNav from '../../components/LoginNav/LoginNav';
import axios from 'axios';
import { reset_password } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../actions/actions';
import Sending from '../../components/Atoms/Sending';

const Password = () => {
  const dispatch = useDispatch();
  const [newemail, setNewemail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleEmailChange = e => {
    const newEmail = e.target.value;
    setNewemail(newEmail);

    const isValidEmail =
      newEmail.includes('.') && newEmail.includes('@') && newEmail.length >= 8;
    setIsButtonDisabled(!isValidEmail);
  };
  const handleEmailDispatch = selectedEmail => {
    dispatch(setEmail(selectedEmail));
  };

  console.log(newemail);
  const onSubmit = e => {
    e.preventDefault();

    if (!isButtonDisabled) {
      setIsSending(true);
      sendResetPasswordRequest(newemail);
    }
  };

  const sendResetPasswordRequest = email => {
    fetch(`https://daily-vs.com/api/accounts/password/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (response.ok) {
          setIsSending(false);
          console.log('Password reset successful');
          setSuccessMessage(`${newemail}`);
        } else {
          setIsSending(false);
          console.error('Password reset failed');
          setErrorMessage('이메일 전송 실패');
        }
      })
      .catch(error => {
        setIsSending(false);
        console.error('Error:', error);
        setErrorMessage('이메일 전송 중 오류 발생');
      });
  };

  return (
    <>
      <LoginNav />
      <Container onSubmit={onSubmit}>
        <LogoImg src="/media/images/LoginNav/Only_Tex.png" />
        <EmailTitle>비밀번호 재설정</EmailTitle>
        <EmailQuestion>
          가입 시 사용한 계정을 입력해주세요. <br />
          <EmailInput
            type="email"
            placeholder="이메일 입력"
            value={newemail}
            onChange={handleEmailChange}
          />
        </EmailQuestion>
        <EmailRegister
          onClick={() => {
            handleEmailDispatch(newemail);
          }}
          disabled={isButtonDisabled}
        >
          이메일 전송하기
        </EmailRegister>
        {isSending && (
          <EmailSending>
            이메일 전송중...
            <Sending />
          </EmailSending>
        )}
        {successMessage && (
          <>
            <SuccessMent>이메일 전송 성공!</SuccessMent>
            <SuccessMessage>{successMessage}</SuccessMessage>
            <SuccessMent>을 확인해주세요!</SuccessMent>
          </>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
};
export default Password;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 40rem;
  white-space: nowrap;
`;

const EmailTitle = styled.h1`
  font-family: 'GongGothicLight';
  color: #17355a;
  font-size: 28px;
`;

const EmailInput = styled.input`
  margin-top: 10px;
  width: min(100%, 300px);
  height: 50px;
  font-size: 18px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const LogoImg = styled.img`
  width: 220px;
  margin-top: 3rem;
`;

const EmailQuestion = styled.div`
  margin-top: 1rem;
  font-size: 20px;
  text-align: center;
`;

const EmailRegister = styled.button`
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

const EmailSending = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #457c9e;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff495a;
`;

const SuccessMessage = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #17355a;
  font-family: 'GongGothicLight';
`;

const SuccessMent = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
