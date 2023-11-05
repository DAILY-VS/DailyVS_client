import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Modify = ({ isAuthenticated }) => {
  const [userInformation, setUserInformation] = useState({
    nickname: '',
    gender: '',
    mbti: '',
    age: '',
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState(userInformation);

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(`https://daily-vs.com/api/mypage`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUserInformation(result.user);
        console.log(result.user);
      });
  }, []);
  formData.nickname = userInformation.nickname;
  formData.gender = userInformation.gender;
  formData.mbti = userInformation.mbti;
  formData.age = userInformation.age;

  console.log(userInformation.email);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  console.log(userInformation);
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

  const handleModifyClick = event => {
    event.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(userInformation),
    };

    fetch(`https://daily-vs.com/api/mypage`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('서버 응답:', result);

        if (result) {
          navigate(`/my-page`);
        }
      })
      .catch(error => {
        console.error('POST 요청 오류:', error);
      });
  };
  return (
    <SignupPage>
      <SignupContainer>
        <SignupLogo src="/images/LoginNav/Only_Tex.png" />
        <ModifyTitle>개인정보 수정하기</ModifyTitle>
        <MBTIDropdown
          value={userInformation.mbti}
          onChange={e => {
            const newValue = e.target.value;
            setUserInformation({ ...userInformation, mbti: newValue });
            setFormData({ ...formData, mbti: newValue });
          }}
        >
          {mbtiOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </MBTIDropdown>
        <TextInput
          value={userInformation.nickname}
          placeholder="닉네임 (2자 이상 10자 이하)"
          onChange={e => {
            const newNickname = e.target.value;
            if (newNickname.length <= 10) {
              setUserInformation({ ...userInformation, nickname: newNickname });
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
            checked={formData.gender === 'M'}
            onChange={e => {
              const newGender = e.target.value;
              setUserInformation({ ...userInformation, gender: newGender });
              setFormData({ ...formData, gender: newGender });
            }}
            id="male-radio"
            style={{ display: 'none' }}
          />
          <GenderOption
            htmlFor="male-radio"
            className={userInformation.gender === 'M' ? 'selected' : ''}
          >
            남성
          </GenderOption>

          <input
            className="radio-input"
            type="radio"
            name="gender"
            value="W"
            checked={formData.gender === 'W'}
            onChange={e => {
              const newGender = e.target.value;
              setUserInformation({ ...userInformation, gender: newGender });
              setFormData({ ...formData, gender: newGender });
            }}
            id="female-radio"
            style={{ display: 'none' }}
          />
          <GenderOption
            htmlFor="female-radio"
            className={userInformation.gender === 'W' ? 'selected' : ''}
          >
            여성
          </GenderOption>
        </GenderRadioGroup>

        <SignupLabel>나이</SignupLabel>
        <MBTIDropdown
          value={userInformation.age || ''}
          onChange={e => {
            const newAge = e.target.value;
            setUserInformation({ ...userInformation, age: newAge });
            setFormData({ ...formData, age: newAge });
          }}
        >
          {ageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </MBTIDropdown>
        <SignupBtn
          onClick={handleModifyClick}
          disabled={userInformation.nickname.length < 3}
        >
          수정하기
        </SignupBtn>
      </SignupContainer>
      <SignupToLogin>
        <SignupLoginBtn to="/find-password">비밀번호</SignupLoginBtn>
        변경하러 가기
      </SignupToLogin>
    </SignupPage>
  );
};

export default Modify;

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

const ModifyTitle = styled.h1`
  font-family: 'GongGothicLight';
  font-size: 24px;
  color: #17355a;
  text-align: center;
  margin-bottom: 1rem;
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
    display: none !important;
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
  font-size: 16px;
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
