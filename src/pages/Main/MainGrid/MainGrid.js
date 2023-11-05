import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainGridCard from './MainGridCard';

const MainGrid = ({ loading }) => {
  const [mainGridVote, setMainGridVote] = useState([]);

  // useEffect(() => {
  //   if (!loading) {
  //     fetch(`http://127.0.0.1:8000/api/`)
  //       .then(response => response.json())
  //       .then(result => {
  //         setMainGridVote(result);
  //       });
  //   }
  // }, [loading]);

  useEffect(() => {
    if (!loading) {
      fetch(`https://daily-vs.com/api/`)
        .then(response => response.json())
        .then(result => {
          setMainGridVote(result.polls);
        });
    }
  }, [loading]);

  return (
    <MainGridSection>
      <MainGridName>📓 투표 모음 📊</MainGridName>
      <MainGridMapSection>
        {mainGridVote.map(mainGridVotes => (
          <MainGridVote key={mainGridVotes.id}>
            <MainGridCard
              id={mainGridVotes.id}
              title={mainGridVotes.title}
              thumbnail={mainGridVotes.thumbnail}
            />
          </MainGridVote>
        ))}
      </MainGridMapSection>
    </MainGridSection>
  );
};

export default MainGrid;

const MainGridSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  margin-top: 50px;
`;

const MainGridName = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 24px;
`;

const MainGridMapSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

const MainGridVote = styled.div`
  width: 200px;
`;
