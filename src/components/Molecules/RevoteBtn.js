import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setGender, setAge, setMBTI } from '../../actions/actions';

const RevoteBtn = () => {
  const params = useParams();
  const navigate = useNavigate();
  const detailId = params.id;
  const dispatch = useDispatch();
  const [userInformation, setUserInformation] = useState('');

  const selectedChoice = useSelector(state => state.choice.selectedChoice);
  const selectedOption = useSelector(state => state.option.selectedOption);
  const selectedGender = useSelector(state => state.gender.selectedGender);
  const selectedMBTI = useSelector(state => state.mbti.selectedMBTI);
  const selectedAge = useSelector(state => state.age.selectedAge);
  const selectedCategoryList = useSelector(
    state => state.categoryList.selectedCategoryList,
  );

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

    fetch(`https://daily-vs.com/api/accounts/user_info/`, requestOptions)
      .then(response => response.json())
      .then(response => console.log(response))
      .then(result => {
        setUserInformation(result);
      });
  }, []);

  dispatch(setAge(userInformation?.age));
  dispatch(setMBTI(userInformation?.mbti));
  dispatch(setGender(userInformation?.gender));

  const handleInformationClick = event => {
    event.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    // const requestOptions = {
    //   method: 'POST',
    //   headers: headers,
    //   body: JSON.stringify({
    //     choice_number: selectedOption,
    //     choice_id: selectedChoice,
    //     category_list: selectedCategoryList,
    //     gender: selectedGender,
    //     mbti: selectedMBTI,
    //     age: selectedAge,
    //   }),
    // };

    fetch(`https://daily-vs.com/api/${detailId}/poll_result_page`, {
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
        console.error('POST 요청 오류:', error);
      });
  };

  return <Container onClick={handleInformationClick}>다시투표</Container>;
};

export default RevoteBtn;

const Container = styled.button`
  width: 160px;
  height: 50px;
  font-size: 24px;
  color: white;
  background-color: #17355a;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
