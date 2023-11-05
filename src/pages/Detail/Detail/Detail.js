import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DetailCard from './DetailCard';
import OptionCard from './OptionCard';
import {
  setOption,
  setChoice,
  setCategory,
  setCategoryList,
} from '../../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import RegisterBtn from '../../../components/Molecules/DetailBtns/RegisterBtn';
import AuthSubmitBtn from '../../../components/Molecules/AuthSubmitBtn';
import RevoteBtn from '../../../components/Molecules/RevoteBtn';
import ResultBtn from '../../../components/Molecules/ResultBtn';

const Detail = () => {
  const dispatch = useDispatch();
  const [voteDetail, setVoteDetail] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const params = useParams();
  const detailId = params.id;

  const handleDispatch = selectedOption => {
    dispatch(setOption(selectedOption + 1));
  };

  const handleChoiceDispatch = selectedChoice => {
    dispatch(setChoice(selectedChoice));
  };

  const handleCategoryDispatch = selectedCategory => {
    dispatch(setCategory(selectedCategory));
  };

  const handleCategoryListDispatch = selectedCategoryList => {
    dispatch(setCategoryList(selectedCategoryList));
  };

  useEffect(() => {
    handleCategoryDispatch(voteDetail.category_list);
    handleCategoryListDispatch(voteDetail.category_list);
  }, [voteDetail]);

  useEffect(() => {
    handleDispatch(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    handleChoiceDispatch(selectedChoice);
  }, [selectedChoice]);

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    fetch(`https://daily-vs.com/api/${detailId}`, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(result => {
        setVoteDetail(result);
      });
  }, []);

  console.log('voteDetail', voteDetail);
  console.log('categoryList', voteDetail.category_list);
  console.log('length', voteDetail.category_list?.length);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const isFormValid = () => {
    return selectedOption !== '';
  };

  return (
    <DetailContainer>
      {voteDetail ? (
        <>
          <DetailCard voteDetail={voteDetail} />
          <OptionCard
            voteDetail={voteDetail}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
          />
          {voteDetail.previous_choice ? (
            <ReButtons>
              <RevoteBtn />
              <ResultBtn />
            </ReButtons>
          ) : voteDetail.category_list?.length === 0 ? (
            <AuthSubmitBtn isFormValid={isFormValid} />
          ) : (
            <RegisterBtn isFormValid={isFormValid} />
          )}
        </>
      ) : (
        <p>Vote not found</p>
      )}
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  background-color: #f8f8ff;
`;

const ReButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  margin-top: 2rem;
  width: 350px;
  align-items: center;
`;
