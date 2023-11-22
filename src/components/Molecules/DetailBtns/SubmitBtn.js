import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import LoginModal from '../LoginModal';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useClickEffect from '../../../utils/hooks/useClickEffect';

const SubmitBtn = ({ isFormValid }) => {
  const ref = useRef(null);
  const { handleBtnMD, handleBtnMU, handleBtnME, handleBtnML } =
    useClickEffect(ref);

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const detailId = params.id;
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedChoice = useSelector(state => state.choice.selectedChoice);
  const selectedOption = useSelector(state => state.option.selectedOption);
  const selectedGender = useSelector(state => state.gender.selectedGender);
  const selectedMBTI = useSelector(state => state.mbti.selectedMBTI);
  const selectedAge = useSelector(state => state.age.selectedAge);
  const selectedCategoryList = useSelector(
    state => state.categoryList.selectedCategoryList,
  );

  const handleInformationClick = event => {
    event.preventDefault();
    setIsLoading(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    fetch(`${process.env.REACT_APP_HOST}/${detailId}/poll_result_page`, {
      method: 'POST',
      headers: headers,
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <RegisterButton
          ref={ref}
          onMouseDown={handleBtnMD}
          onMouseUp={handleBtnMU}
          onMouseEnter={handleBtnME}
          onMouseLeave={handleBtnML}
          onClick={() => {
            openModal();
          }}
          disabled={!isFormValid()}
        >
          투표하기
        </RegisterButton>
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      </>
    );
  } else {
    return (
      <RegisterButton
        ref={ref}
        onMouseDown={handleBtnMD}
        onMouseUp={handleBtnMU}
        onMouseEnter={handleBtnME}
        onMouseLeave={handleBtnML}
        onClick={handleInformationClick}
        disabled={!isFormValid()}
      >
        투표하기
      </RegisterButton>
    );
  }
};
export default SubmitBtn;

const RegisterButton = styled.button`
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  width: 300px;
  height: 50px;
  font-size: 24px;
  background-color: ${props => (props.disabled ? '#BDBDBD' : '#17355a')};
  color: white;
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;
