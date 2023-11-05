import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import LoginNav from '../../components/LoginNav/LoginNav';
import { connect, useDispatch } from 'react-redux';
import { signup } from '../../actions/auth';
import { setEmail, setNickname } from '../../actions/actions';

const Signup = ({ signup, isAuthenticated }) => {
  const dispatch = useDispatch();
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    gender: '',
    mbti: '',
    password1: '',
    password2: '',
    age: '',
  });
  const { email, nickname, gender, mbti, password1, password2, age } = formData;

  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    if (password1 === password2 && password1.length >= 8) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password1, password2]);

  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = e => {
    setSelectedGender(e.target.value);
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const isFormValid = () => {
    return (
      email.length > 0 &&
      mbti.length > 0 &&
      password1.length > 0 &&
      nickname.length >= 2 &&
      gender.length > 0 &&
      age.length > 0
    );
  };

  const handleEmailDispatch = selectedEmail => {
    dispatch(setEmail(selectedEmail));
  };
  const handleNicknameDispatch = selectedNickname => {
    dispatch(setNickname(selectedNickname));
  };

  const onSubmit = e => {
    e.preventDefault();
    handleEmailDispatch(formData.email);
    handleNicknameDispatch(formData.nickname);
    if (password1 === password2) {
      signup(email, nickname, gender, mbti, password1, password2, age);
      setAccountCreated(true);
      navigate('/signup/email');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (accountCreated) {
      navigate('/signup/email');
    }
  }, [accountCreated, navigate]);

  const mbtiOptions = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  const ageOptions = [
    { label: '10대', value: '10' },
    { label: '20대 초반', value: '20_1' },
    { label: '20대 후반', value: '20_2' },
    { label: '30대 초반', value: '30_1' },
    { label: '30대 후반', value: '30_2' },
    { label: '40대', value: '40' },
  ];

  return (
    <>
      <LoginNav />
      <SignupPage>
        <SignupContainer onSubmit={onSubmit}>
          <SignupLogo src="/media/images/LoginNav/Only_Tex.png" />
          <SignupLabel>이메일</SignupLabel>
          <TextInput
            value={email}
            type="email"
            placeholder="이메일 주소"
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            autoComplete="new-password"
          />
          <SignupLabel>비밀번호(8자 이상 15자 이하) </SignupLabel>
          <TextInput
            value={password1}
            type="password"
            placeholder="비밀번호"
            onChange={e => {
              const newPassword = e.target.value;
              setFormData({ ...formData, password1: newPassword });
              setPasswordMatch(newPassword === password2);
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
              setFormData({ ...formData, password2: newPassword });
              setPasswordMatch(newPassword === password2);
            }}
          />
          <SignupLabel>기타 정보 (성향 분석에 필요합니다!)</SignupLabel>
          <MBTIDropdown
            value={mbti}
            onChange={e => setFormData({ ...formData, mbti: e.target.value })}
          >
            <option value="">MBTI 선택</option>
            {mbtiOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </MBTIDropdown>
          <TextInput
            value={nickname}
            placeholder="닉네임 (2자 이상 10자 이하)"
            onChange={e => {
              const newNickname = e.target.value;
              if (newNickname.length <= 10) {
                setFormData({ ...formData, nickname: newNickname });
              } else {
                window.alert('닉네임은 10자를 넘을 수 없습니다.');
              }
            }}
          />
          <GenderRadioGroup>
            <input
              className="radio-input"
              type="radio"
              name="gender"
              value="M"
              checked={gender === 'M'}
              onChange={e => handleGenderChange(e)}
              id="male-radio"
            />
            <GenderOption
              htmlFor="male-radio"
              className={gender === 'M' ? 'selected' : ''}
            >
              남성
            </GenderOption>

            <input
              className="radio-input"
              type="radio"
              name="gender"
              value="W"
              checked={gender === 'W'}
              onChange={e => handleGenderChange(e)}
              id="female-radio"
            />
            <GenderOption
              htmlFor="female-radio"
              className={gender === 'W' ? 'selected' : ''}
            >
              여성
            </GenderOption>
          </GenderRadioGroup>
          <SignupLabel>나이</SignupLabel>
          <MBTIDropdown
            value={age}
            onChange={e => setFormData({ ...formData, age: e.target.value })}
          >
            <option value="">나이 선택</option>
            {ageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </MBTIDropdown>
          <SignupBtn disabled={!isFormValid()}>회원가입</SignupBtn>
          <SignupToLogin>
            바로 <SignupLoginBtn to="/login">로그인</SignupLoginBtn>하러 가기
          </SignupToLogin>
        </SignupContainer>
      </SignupPage>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth?.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);

const SignupPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 100px;
`;

const SignupLogo = styled.img`
  width: 280px;
`;

const PassWordCheck = styled.img`
  opacity: 0.9;
  width: 20px;
  margin-left: 5px;
`;

const PasswordMatchText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: green;
  transition: opacity 0.3s ease;
`;

const SignupLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 20px;
`;

const TextInput = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  font-size: 18px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;

const GenderRadioGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const GenderOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  height: 50px;
  width: 140px;
  cursor: pointer;
  transition: border 0.3s ease;

  .radio-input {
    display: none;
  }

  &:hover {
    border: 5px #17355a solid;
  }

  .radio-input:checked + & {
    border: 5px #17355a solid;
  }
`;

const SignupBtn = styled.button`
  margin-top: 10px;
  width: 300px;
  height: 50px;
  font-size: 20px;
  color: white;
  background-color: ${props => (props.disabled ? '#d4d4d4' : '#ff495a')};
  border: none;
  border-radius: 5px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const SignupToLogin = styled.div`
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const SignupLoginBtn = styled(Link)`
  color: #ff495a;
  margin: 0px 5px;
`;

const MBTIDropdown = styled.select`
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  font-size: 18px;
  border: 1px rgba(128, 128, 128, 0.2) solid;
  background-color: #f4faff;
  padding-left: 20px;
`;
