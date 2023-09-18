import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import LoginNav from '../../components/LoginNav/LoginNav';
import EmailVerification from './EmailVerification';

const Signup = () => {
  const [userSignupInfo, setUserSignupInfo] = useState({
    signupEmail: '',
    signupPW: '',
    signupMBTI: '',
    signupNickName: '',
    signupGender: '',
  });
  const [signupPWCheck, setSignupPWCheck] = useState('');
  const { signupEmail, signupPW, signupMBTI, signupNickName, signupGender } =
    userSignupInfo;

  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('');
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const handleGenderChange = e => {
    setSelectedGender(e.target.value);
  };

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,15}$/;

  const emailCheck = userSignupEmail => emailRegEx.test(userSignupEmail);

  const passwordCheck = userSignupPW => {
    return userSignupPW.match(passwordRegEx) !== null;
  };

  const passwordDoubleCheck = (userSignupPW, signupPWCheck) => {
    return userSignupPW === signupPWCheck;
  };

  // 모달 열기 함수
  const openEmailVerificationModal = () => {
    setShowEmailVerificationModal(true);
  };

  // 모달 닫기 함수
  const closeEmailVerificationModal = () => {
    setShowEmailVerificationModal(false);
  };

  const isFormValid = () => {
    return (
      signupEmail.length > 0 &&
      passwordCheck(signupPW) &&
      signupMBTI.length > 0 &&
      signupNickName.length >= 2 &&
      signupGender.length > 0
    );
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(userSignupInfo);

    if (!passwordCheck(signupPW)) {
      alert('비밀번호 형식을 확인해주세요.');
      return;
    }

    if (!passwordDoubleCheck(signupPW, signupPWCheck)) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isFormValid()) {
      // 유효성 검사 실패 시 경고 메시지를 표시하거나 다른 처리를 수행할 수 있습니다.
      alert('입력 정보를 확인해주세요.');
      return;
    }

    try {
      // 서버로 회원가입 데이터 전송
      const response = await fetch('서버_회원가입_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userSignupInfo),
      });

      if (response.ok) {
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate('/login');
      } else {
        // 회원가입 실패 시 적절한 처리를 수행합니다.
        const data = await response.json();
        alert(data.message); // 서버에서 반환한 에러 메시지 표시
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      // 에러 처리 로직 추가
    }
  };
  // MBTI 선택 항목
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

  return (
    <>
      <LoginNav />
      <SignupPage>
        <SignupContainer onSubmit={onSubmit}>
          <SignupLogo src="images/LoginNav/Only_Tex.png" />
          <TextInput
            value={signupEmail}
            type="email"
            placeholder="이메일 주소"
            onChange={e => {
              setUserSignupInfo({
                ...userSignupInfo,
                signupEmail: e.target.value,
              });
              emailCheck(e.target.value);
            }}
          />
          <TextInput
            value={signupPW}
            type="password"
            placeholder="비밀번호 (8자 이상 15자 이하)"
            onChange={e => {
              setUserSignupInfo({
                ...userSignupInfo,
                signupPW: e.target.value,
              });
              passwordCheck(e.target.value);
            }}
          />
          <TextInput
            value={signupPWCheck}
            type="password"
            placeholder="확인 비밀번호"
            onChange={e => {
              setSignupPWCheck(e.target.value);
              passwordDoubleCheck(signupPW, e.target.value);
            }}
          />
          <MBTIDropdown
            value={signupMBTI}
            onChange={e =>
              setUserSignupInfo({
                ...userSignupInfo,
                signupMBTI: e.target.value,
              })
            }
          >
            <option value="">MBTI 선택</option>
            {mbtiOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </MBTIDropdown>
          <TextInput
            value={signupNickName}
            placeholder="닉네임 (2자 이상 10자 이하)"
            onChange={e =>
              setUserSignupInfo({
                ...userSignupInfo,
                signupNickName: e.target.value,
              })
            }
          />
          <GenderRadioGroup>
            <input
              className="radio-input"
              type="radio"
              name="gender"
              value="male"
              checked={selectedGender === 'male'}
              onChange={handleGenderChange}
              id="male-radio"
            />
            <GenderOption
              htmlFor="male-radio"
              className={selectedGender === 'male' ? 'selected' : ''}
            >
              남성
            </GenderOption>

            <input
              className="radio-input"
              type="radio"
              name="gender"
              value="female"
              checked={selectedGender === 'female'}
              onChange={handleGenderChange}
              id="female-radio"
            />
            <GenderOption
              htmlFor="female-radio"
              className={selectedGender === 'female' ? 'selected' : ''}
            >
              여성
            </GenderOption>
          </GenderRadioGroup>
          <SignupBtn disabled={!isFormValid()}>회원가입</SignupBtn>
          <SignupToLogin>
            바로 <SignupLoginBtn to="/login">로그인</SignupLoginBtn>하러 가기
          </SignupToLogin>
          {/* 이메일 인증 모달 */}
          {showEmailVerificationModal && (
            <EmailVerification
              user={{ username: signupNickName }}
              code="인증 코드 여기에"
              onClose={closeEmailVerificationModal} // 모달 닫기 함수 전달
            />
          )}
        </SignupContainer>
      </SignupPage>
      <FakeBtn onClick={openEmailVerificationModal}>임시버튼</FakeBtn>
    </>
  );
};

export default Signup;

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
`;

const SignupLogo = styled.img`
  width: 280px;
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

const FakeBtn = styled.button`
  width: 150px;
`;
