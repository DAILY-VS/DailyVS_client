import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { MintButton } from '../Atoms/Buttons';
import { useSelector } from 'react-redux';

function CommentInput({
  setCurrentPage,
  voteId,
  voteChoice,
  onCommentSubmit,
  userInfo,
}) {
  const [comment, setComment] = useState('');

  const handleChange = e => {
    const newComment = e.target.value;
    setComment(newComment);
  };

  const handleSubmit = () => {
    onCommentSubmit(comment);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const accessToken = localStorage.getItem('access');

    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        content: comment,
        user_info: userInfo,
        poll: voteId,
      }),
    };

    fetch(`https://daily-vs.com/api/${voteId}/comment`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('성공:', data);
        window.location.reload();
        window.scrollTo(2000, document.body.scrollHeight);
      })
      .catch(error => {
        console.error('데이터 받기 실패:', error);
      });

    setComment('');
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Container>
      {isAuthenticated ? (
        <>
          <Info>
            <div className="name">{userInfo?.nickname}</div>
            <div className="mbti">{userInfo?.mbti}</div>
            <div className="gender">{userInfo?.gender}</div>
            <div className="result">{voteChoice?.choice_text}</div>
          </Info>
          <CommentText
            value={comment}
            onChange={handleChange}
            placeholder="댓글을 입력하세요"
          />
          <div style={{ width: '30%', marginLeft: 'auto' }}>
            <MintButton
              content={'댓글 달기'}
              onClick={handleSubmit}
              disabled={comment.length === 0}
            />
          </div>
        </>
      ) : (
        <div>로그인 후 이용해주세요</div>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid ${theme.colors.turquoisSecondaryColor};
  background-color: white;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;

  & .name {
    font-weight: 900;
    font-size: 20px;
    margin-right: 10px;
  }
  & .gender {
    margin: 0 5px;
  }
  & .result {
    color: ${theme.colors.turquoisSecondaryColor};
  }
`;
const CommentText = styled.textarea`
  resize: none;
  border: none;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  padding: 7px 12px;
  height: 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${theme.colors.placeholder};
    transition: color 0.3s;
  }

  &:focus::placeholder {
    color: ${theme.colors.turquoisSecondaryColor};
  }
`;

export default CommentInput;
