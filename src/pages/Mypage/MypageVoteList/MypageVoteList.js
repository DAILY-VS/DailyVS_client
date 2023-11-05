import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paginator from '../../../components/Molecules/Paginator';

const MypageVoteList = () => {
  const [voteList, setVoteList] = useState([]);
  const [listCount, setListCount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    fetch(`https://daily-vs.com/api/mypage_uservote?page=${currentPage}`, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(result => {
        setVoteList(result.uservote);
        console.log(result);
        setListCount(result.uservote.length);
      });
  }, []);

  console.log(voteList);
  return (
    <Container>
      <VoteListTitle>내가 투표한 VOTE</VoteListTitle>
      {voteList.map((poll, index) => (
        <LikeLine key={index} to={`/vote-detail/${poll.poll.id}`}>
          <LikeImage
            src={'https://daily-vs.com' + poll.poll.thumbnail}
            alt={poll.poll?.title}
          />
          <TruncateText>
            <LikeName>{poll.poll?.title}</LikeName>
          </TruncateText>
          <LikeCreator>{poll.choice.choice_text}</LikeCreator>
          <LikeDate>{poll.poll.created_at?.slice(0, 10)}</LikeDate>
        </LikeLine>
      ))}
      <Paginator
        count={listCount}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </Container>
  );
};

export default MypageVoteList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const VoteListTitle = styled.h1`
  display: flex;
  font-family: 'GongGothicMedium';
  font-size: 24px;
  margin: 20px;
  width: 540px;
`;

const LikeLine = styled(Link)`
  display: grid;
  grid-template-columns: 40px 300px 100px 100px;
  margin-top: 10px;
  font-family: 'GongGothicLight';
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const TruncateText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 295px;
`;

const LikeName = styled.h1`
  font-family: 'GongGothicLight';
  color: #17355a;
  font-size: 18px;
  margin: 5px;
`;

const LikeImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LikeCreator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #457c9e;
`;

const LikeDate = styled.div`
  display: flex;
  align-items: center;
  color: gray;
`;
