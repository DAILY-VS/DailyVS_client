import React from 'react';
import styled from 'styled-components';

const DetailCard = ({ voteDetail }) => {
  return (
    <CardContainer>
      <DetailImage
        src={'http://127.0.0.1:8000' + voteDetail.poll?.thumbnail}
        alt={voteDetail.poll?.title}
      />
      <DetailBottom>
        <DetailTitle>{voteDetail.poll?.title}</DetailTitle>
        <DetailExplain>{voteDetail.poll?.content}</DetailExplain>
      </DetailBottom>
    </CardContainer>
  );
};

export default DetailCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
`;

const DetailTitle = styled.h1`
  font-family: 'GongGothicMedium';
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 0 auto 20px auto;
  color: #17355a;
`;

const DetailExplain = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 16px;
  margin: 0 auto;
`;

const DetailBottom = styled.div`
  width: 400px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const DetailImage = styled.img`
  margin: 10px auto 0 auto;
  width: 400px;
  height: 360px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
