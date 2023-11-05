import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const detailId = params.id;
  const handleOverlayClick = () => {
    onClose();
  };

  const selectedChoice = useSelector(state => state.choice.selectedChoice);
  const selectedOption = useSelector(state => state.option.selectedOption);
  const selectedGender = useSelector(state => state.gender.selectedGender);
  const selectedMBTI = useSelector(state => state.mbti.selectedMBTI);
  const selectedAge = useSelector(state => state.age.selectedAge);
  const selectedCategoryList = useSelector(
    state => state.categoryList.selectedCategoryList,
  );

  const handleInformationClick = () => {
    setIsLoading(true);
    fetch(`https://daily-vs.com/api/${detailId}/poll_result_page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        choice_number: selectedOption,
        choice_id: selectedChoice,
        category_list: selectedCategoryList,
        gender: selectedGender,
        mbti: selectedMBTI,
        age: selectedAge,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('서버 응답:', result);
        console.log(
          'Request Body:',
          JSON.stringify({
            choice_id: selectedOption,
            category_list: selectedCategoryList,
            gender: selectedGender,
            mbti: selectedMBTI,
            age: selectedAge,
          }),
        );
        if (result) {
          navigate(`/vote-result/${detailId}`);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('POST 요청 오류:', error);
      });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return isOpen ? (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalTitle>Daily VS</ModalTitle>
        <ModalContent>정보 입력 하나하나 번거로우시죠?</ModalContent>
        로그인을 하시면 자동 정보 입력 외에 <br />
        여러가지 기능을 이용하실 수 있어요!
        <ModalButton>
          <LoginButton onClick={handleLogin}>로그인하기</LoginButton>
          <VoteButton onClick={handleInformationClick}>
            그냥 투표하기
          </VoteButton>
        </ModalButton>
      </ModalContainer>
    </ModalOverlay>
  ) : null;
};

export default LoginModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  text-align: center;
  padding: 2rem;
  width: 22rem;
  height: 13rem;
  line-height: 1.2;
`;

const ModalTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  font-family: 'GongGothicMedium';
  margin-bottom: 1rem;
  color: #17355a;
`;

const ModalContent = styled.div``;

const ModalButton = styled.div`
  display: flex;
  justify-content: space-around;
  width: 18rem;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2rem;
  margin-top: 1rem;
  text-align: center;
  border: 2px #ff495a solid;
  font-size: 16px;
  color: #ff495a;
  background-color: white;
  &:hover {
    background-color: #ff495a;
    color: white;
    cursor: pointer;
  }
`;

const VoteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2rem;
  margin-top: 1rem;
  text-align: center;
  border: 2px #17355a solid;
  font-size: 16px;
  color: #17355a;
  background-color: white;
  &:hover {
    background-color: #17355a;
    color: white;
    cursor: pointer;
  }
`;
