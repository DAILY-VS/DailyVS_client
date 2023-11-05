import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainGridCard = ({ id, thumbnail, title }) => {
  const navigate = useNavigate();
  const onClickDetailButton = () => {
    navigate(`/vote-detail/${id}`);
  };
  return (
    <Container onClick={onClickDetailButton}>
      <GridThumbnail src={'https://daily-vs.com/api' + thumbnail} alt={title} />
      {/* <GridThumbnail src={thumbnail} /> */}
      <GridName>{title}</GridName>
    </Container>
  );
};

export default MainGridCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const GridThumbnail = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
`;

const GridName = styled.div`
  margin-top: 10px;
  font-size: 12px;
`;
