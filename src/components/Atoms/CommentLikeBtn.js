import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useClickEffect from '../../utils/hooks/useClickEffect';

const CommentLikeBtn = ({ commentId }) => {
  const ref = useRef(null);

  const [likeInfo, setLikeInfo] = useState('');
  const [isLiked, setIsLiked] = useState(likeInfo.user_likes_comment);
  const [likeCount, setLikeCount] = useState(likeInfo?.like_count);

  const { handleBtnMD, handleBtnMU, handleBtnME, handleBtnML } =
    useClickEffect(ref);

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

    fetch(`https://daily-vs.com/api/${commentId}/comment_like`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLikeInfo(result);
        setIsLiked(result?.user_likes_comment);
        setLikeCount(result?.like_count);
      });
  }, []);

  console.log('likeinfo', likeInfo);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const requestOptions = {
      method: 'POST',
      headers: headers,
    };

    fetch(`https://daily-vs.com/api/${commentId}/comment_like`, {
      ...requestOptions,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  };

  const heartImgSrc = isLiked
    ? '/media/images/Buttons/likeBtnRed.png'
    : '/media/images/Buttons/likeBtn.png';

  return (
    <Container onClick={handleLikeClick}>
      <HeartImg
        src={heartImgSrc}
        alt="좋아요"
        ref={ref}
        onMouseDown={handleBtnMD}
        onMouseUp={handleBtnMU}
        onMouseEnter={handleBtnME}
        onMouseLeave={handleBtnML}
      />
      <LikeCount>{likeCount}</LikeCount>
      <Likes>Likes</Likes>
    </Container>
  );
};

export default CommentLikeBtn;

const Container = styled.div`
  display: flex;
`;

const HeartImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  width: 20px;
`;

const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  color: gray;
  font-size: 14px;
  margin-left: 0.6rem;
`;

const Likes = styled.div`
  margin-right: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 14px;
`;
