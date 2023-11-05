import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import HeaderText from '../Atoms/HeaderText';
import CommentBox from './CommentBox';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import Paginator from '../Molecules/Paginator';

function Comment({ voteId, voteChoice }) {
  const [comments, setComments] = useState('');
  const [commentsCount, setCommentsCount] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [newcomments, setNewcomments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const addComment = newComment => {
    setNewcomments([...newcomments, newComment]);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    };

    fetch(`https://daily-vs.com/api/accounts/user_info/`, {
      headers: config.headers,
    })
      .then(response => response.json())
      .then(result => {
        setUserInfo(result);
      });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    };

    fetch(
      `https://daily-vs.com/api/${voteId}/comment/newest?page=${currentPage}`,
      {
        headers: config.headers,
      },
    )
      .then(response => response.json())
      .then(result => {
        setComments(result.comments);
        setCommentsCount(result.comments_count);
      });
  }, [currentPage]);

  console.log('comments', comments);
  console.log('comments_count', commentsCount);
  console.log('currentPage', currentPage);
  console.log('userInfo', userInfo);
  return (
    <Container>
      <div style={{ width: 50, marginRight: 'auto', paddingLeft: 20 }}>
        <HeaderText content="댓글" />
      </div>
      <CommentInput
        voteId={voteId}
        voteChoice={voteChoice}
        onCommentSubmit={addComment}
        userInfo={userInfo}
        setCurrentPage={setCurrentPage}
      />
      <Wrapper>
        {newcomments &&
          newcomments
            ?.slice()
            .reverse()
            .map((comment, index) => (
              <CommentCard
                key={index}
                data={comment}
                voteChoice={voteChoice}
                userInfo={userInfo}
                voteId={voteId}
              />
            ))}
        {comments &&
          comments.map(data => (
            <CommentBox
              key={data.id}
              data={data}
              voteId={voteId}
              voteChoice={voteChoice}
              userInfo={userInfo}
              setCurrentPage={setCurrentPage}
            />
          ))}
      </Wrapper>
      <Paginator
        count={commentsCount}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </Container>
  );
}

const Container = styled.div`
  width: min(100%, 1200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.pinkBgColor};
  padding: 20px;
`;

const Wrapper = styled.div`
  width: 400px;
`;
export default Comment;
