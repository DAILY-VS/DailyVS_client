import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useClickEffect from '../../utils/hooks/useClickEffect';

const PollLikeBtn = () => {
  const ref = useRef(null);
  const { handleBtnMD, handleBtnMU, handleBtnME, handleBtnML } =
    useClickEffect(ref);
  const [likeInfo, setLikeInfo] = useState('');
  const [isLiked, setIsLiked] = useState(likeInfo.user_likes_poll);
  const [likeCount, setLikeCount] = useState(likeInfo?.like_count);
  const params = useParams();
  const detailId = params.id;

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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

    fetch(`https://daily-vs.com/api/${detailId}/like`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLikeInfo(result);
        setIsLiked(result?.user_likes_poll);
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

    const requestBody = JSON.stringify({
      poll_id: detailId,
    });

    fetch(`https://daily-vs.com/api/${detailId}/like`, {
      ...requestOptions,
      body: requestBody,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  };

  const heartImgSrc = isLiked
    ? '/media/images/Buttons/likeBtnRed.png'
    : '/media/images/Buttons/likeBtn.png';

  if (isAuthenticated)
    return (
      <Container onClick={handleLikeClick} data-liked={isLiked}>
        <LikeCount>{likeCount}</LikeCount>
        <Likes>Likes</Likes>
        <HeartImg
          src={heartImgSrc}
          alt="좋아요"
          ref={ref}
          onMouseDown={handleBtnMD}
          onMouseUp={handleBtnMU}
          onMouseEnter={handleBtnME}
          onMouseLeave={handleBtnML}
        />
      </Container>
    );
};

export default PollLikeBtn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const HeartImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  width: 25px;
`;

const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  color: gray;
`;

const Likes = styled.div`
  margin-right: 0.2rem;
  color: gray;
`;
