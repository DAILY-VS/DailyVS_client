import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGender } from '../../../actions/actions';

const DetailGender = () => {
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = e => {
    const selectedGender = e.target.value;
    setSelectedGender(selectedGender);
  };

  const handleDispatch = selectedGender => {
    dispatch(setGender(selectedGender));
  };

  handleDispatch(selectedGender);

  const params = useParams();
  const detailId = params.id;
  const navigate = useNavigate();
  const isFormValid = () => {
    return selectedGender !== '';
  };
  console.log(selectedGender);

  const handleVoteSubmit = () => {
    navigate(`/vote-detail-age/${detailId}`);
  };

  return (
    <DetailGenderContainer>
      <GenderQuestion>당신의 성별은?</GenderQuestion>
      <GenderOptionContainer>
        <GenderOption
          className="radio-input"
          type="radio"
          name="option"
          value="M"
          checked={selectedGender === 'M'}
          onChange={e => handleGenderChange(e)}
          id="M"
        />
        <GenderOptionName
          htmlFor="M"
          className={selectedGender === 'M' ? 'selected' : ''}
          onClick={() => setSelectedGender('M')}
        >
          남성
        </GenderOptionName>
        <GenderOption
          className="radio-input"
          type="radio"
          name="option"
          value="W"
          checked={selectedGender === 'W'}
          onChange={e => handleGenderChange(e)}
          id="W"
        />
        <GenderOptionName
          htmlFor="W"
          className={selectedGender === 'W' ? 'selected' : ''}
          onClick={() => setSelectedGender('W')}
        >
          여성
        </GenderOptionName>
      </GenderOptionContainer>
      <GenderButton onClick={handleVoteSubmit} disabled={!isFormValid()}>
        등록하기
      </GenderButton>
    </DetailGenderContainer>
  );
};

export default DetailGender;

const DetailGenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  background-color: #f8f8ff;
  width: 500px;
  min-height: 800px;
`;

const GenderQuestion = styled.h1`
  margin: 100px auto 10px;
  font-size: 28px;
  font-family: 'GongGothicMedium';
  color: #17355a;
`;

const GenderOptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const GenderOptionName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'GongGothicMedium';
  margin: 10px auto;
  margin-top: 30px;
  font-size: 26px;
  height: 70px;
  width: 280px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #bdbdbd;
  }
`;

const GenderOption = styled.input`
  display: none;
  &:checked + ${GenderOptionName} {
    background-color: #ff495a;
    color: white;
  }
`;

const GenderButton = styled.button`
  display: flex;
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