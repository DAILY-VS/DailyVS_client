import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import LoginNav from '../../components/LoginNav/LoginNav';

const Login = ({ login, isAuthenticated }) => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const isValid =
    email.length >= 8 &&
    email.includes('@') &&
    email.includes('.') &&
    password.length >= 8;

  return (
    <>
      <LoginNav />
      <Container>
        <LoginPage onSubmit={e => onSubmit(e)}>
          <LoginLogo src="/media/images/Nav/main_logo.png" />
          <LoginIdInput
            type="text"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
            placeholder="이메일"
          />
          <LoginPwInput
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            placeholder="비밀번호"
            autoComplete="current-password"
          />
          <LoginSubmitBtn disabled={isValid ? false : true}>
            로그인
          </LoginSubmitBtn>
        </LoginPage>
        <KakaoLogin to={KAKAO_AUTH_URL}>
          <KakaoImg src="/media/images/LoginNav/kakaoLogo.png" />
          카카오 로그인
        </KakaoLogin>
        <LoginAsk>
          아직 로그인 계정이 없으신가요?
          <LoginToSignup to="/signup">회원가입</LoginToSignup>
          <LoginFindPw to="/find-password">비밀번호 찾기</LoginFindPw>
        </LoginAsk>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state?.auth?.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 10rem;
`;

const LoginPage = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px auto;
  padding: 0 20px;
`;

const LoginLogo = styled.img`
  margin-top: 30px;
  width: min(100%, 250px);
`;

const LoginIdInput = styled.input`
  width: min(100%, 300px);
  height: 50px;
  margin-bottom: 10px;
  font-size: 18px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const LoginPwInput = styled.input`
  width: min(100%, 300px);
  height: 50px;
  margin-bottom: 30px;
  font-size: 18px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const LoginSubmitBtn = styled.button`
  width: min(100%, 300px);
  height: 50px;
  font-size: 20px;
  color: white;
  background-color: ${props => (props.disabled ? '#d4d4d4' : '#ff495a')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const KakaoImg = styled.img`
  width: 30px;
  margin-right: 10px;
`;

const KakaoLogin = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  width: min(100%, 300px);
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  background-color: #f7e600;
  color: #3a1d1d;
  &:hover {
    cursor: pointer;
  }
`;

const LoginAsk = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 2rem;
  font-size: 14px;
  /* height: 200px; */
`;

const LoginToSignup = styled(Link)`
  margin-left: 5px;
  color: #ff495a !important;
  font-weight: bold;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const LoginFindPw = styled(Link)`
  margin-left: 6px;
  color: #457c9e !important;
  font-weight: bold;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;
