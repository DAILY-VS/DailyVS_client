import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainVoteCard = ({ id, thumbnail, title, content }) => {
  const navigate = useNavigate();

  const onClickDetailButton = () => {
    navigate(`/vote-detail/${id}`);
  };

  return (
    <Container>
      <VoteThumnail
        src={'https://daily-vs.com/api' + thumbnail}
        alt="투표썸네일"
        onClick={onClickDetailButton}
      />
      <VoteName>{title}</VoteName>
      <VoteExplanation>{content}</VoteExplanation>
    </Container>
  );
};

export default MainVoteCard;

const Container = styled.div`
  width: 400px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const VoteThumnail = styled.img`
  width: 500px;
  height: 250px;
  object-fit: cover;
  margin-left: auto;
  border-radius: 5px;
`;

const VoteName = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  text-align: center;
  font-size: 23px;
  color: black;
`;

const VoteExplanation = styled.div`
  width: 400px;
  padding-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
`;
