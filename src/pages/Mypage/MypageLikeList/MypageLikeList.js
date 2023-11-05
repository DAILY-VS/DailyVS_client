import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paginator from '../../../components/Molecules/Paginator';

const MypageLikeList = () => {
  const [pollLike, setPollLike] = useState([]);
  const [listCount, setListCount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    fetch(`https://daily-vs.com/api/mypage_poll_like?page=${currentPage}`, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(result => {
        setPollLike(result.poll_like);
        console.log(result);
        setListCount(result.poll_like.length);
      });
  }, []);

  if (!pollLike || !pollLike.length) {
    return (
      <Container>
        <LikeTitle>나의 좋아요 VOTE</LikeTitle>
        <p>'좋아요'한 투표가 존재하지 않습니다. </p>
      </Container>
    );
  }

  return (
    <Container>
      <LikeTitle>나의 좋아요 VOTE</LikeTitle>
      {pollLike?.map((poll, index) => (
        <LikeLine key={index} to={`/vote-detail/${poll.id}`}>
          <LikeImage
            src={'https://daily-vs.com' + poll.thumbnail}
            alt={poll?.title}
          />
          <TruncateText>
            <LikeName>{poll.title}</LikeName>
          </TruncateText>
          <LikeCreator>{poll.owner.nickname}</LikeCreator>
          <LikeDate>{poll.created_at.slice(0, 10)}</LikeDate>
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

export default MypageLikeList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LikeTitle = styled.h1`
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
