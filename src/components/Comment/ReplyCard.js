import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import useClickEffect from '../../utils/hooks/useClickEffect';
import { CommentLikeBtn } from '../Atoms/Buttons';

function ReplyCard({ voteChoice, user, data, reply, setShowReply }) {
  const [liked, setLiked] = useState(false);

  const Time = () => {
    return (
      <span
        style={{
          fontSize: 14,
          color: theme.colors.grayColor,
          marginLeft: 'auto',
        }}
      >
        방금 전
      </span>
    );
  };

  const Likes = () => {
    return (
      <span
        style={{
          fontSize: 14,
          color: theme.colors.grayColor,
        }}
      >
        {data.likes_count} likes
      </span>
    );
  };
  function handleLike() {
    setLiked(curr => !curr);
  }

  const Reply = () => {
    const refReply = useRef(null);

    const { handleBtnMD, handleBtnMU, handleBtnME, handleBtnML } =
      useClickEffect(refReply);

    return (
      <ReplyBtn
        ref={refReply}
        onMouseDown={handleBtnMD}
        onMouseUp={handleBtnMU}
        onMouseEnter={handleBtnME}
        onMouseLeave={handleBtnML}
        onClick={() => {
          setShowReply(curr => !curr);
        }}
      >
        답글 {reply.length}
      </ReplyBtn>
    );
  };
  return (
    <Container re={reply ? false : true}>
      {!reply && (
        <img src="/media/images/Buttons/reply.png" width={25} alt="reply" />
      )}

      <Info>
        <div className="name">{user.nickname}</div>
        <div className="mbti">{user.mbti}</div>
        <div className="gender">{user.gender}</div>
        <div className="result">{voteChoice}</div>
        <Time />
      </Info>
      <Content>{data}</Content>

      <Bottom>
        <CommentLikeBtn liked={liked} onClick={handleLike} />
        <Likes />
        {!!reply && <Reply />}
      </Bottom>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${theme.colors.lightGrayColor};
  padding-left: ${props => (props.re ? '30px' : 0)};
  position: relative;
  & > img {
    position: absolute;
    left: 0;
    top: 10px;
  }
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

const Content = styled.div`
  display: flex;
  padding: 10px 0;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ReplyBtn = styled.div`
  margin-left: auto;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.turquoisSecondaryColor};
  color: ${theme.colors.turquoisSecondaryColor};
  border-radius: 10px;
  cursor: pointer;
  transition: 0.1s;
`;
export default ReplyCard;
