import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import ResultTop from './ResultTop/ResultTop';
import TotalGraph from './ResultTop/TotalGraph';
import ResultGraph from './ResultGraph/ResultGraph';
import ResultBtn from './ResultBtn/ResultBtn';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import { useSelector } from 'react-redux';
import ResultInfo from './ResultInfo/ResultInfo';

const Result = () => {
  const [voteResult, setVoteResult] = useState([]);
  const [showWatermark, setShowWatermark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const resultRef = useRef(null);
  const params = useParams();
  const detailId = params.id;
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  const changePage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  console.log('cP', currentPage);
  useEffect(() => {
    if (isAuthenticated) {
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

      fetch(`https://daily-vs.com/api/${detailId}/poll_result_page`, {
        headers: config.headers,
      })
        .then(response => response.json())
        .then(result => {
          if (result.detail === '찾을 수 없습니다.') {
            navigate('/error');
          } else {
            setVoteResult(result);
          }
        });
    } else {
      fetch(`https://daily-vs.com/api/${detailId}/poll_result_page`)
        .then(response => response.json())
        .then(result => {
          if (result.detail === '찾을 수 없습니다.') {
            navigate('/error');
          } else {
            setVoteResult(result);
          }
        });
    }
  }, []);

  console.log('voteResult', voteResult);

  const handleCapture = () => {
    setShowWatermark(true);
    html2canvas(resultRef.current, { scale: 4 }).then(canvas => {
      const capturedImage = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'result_capture.png';
      link.click();
      setShowWatermark(false);
    });
  };

  return (
    <ResultContainer>
      <CaptureContainer ref={resultRef}>
        <ResultTop voteResult={voteResult} />
        <TotalGraph voteResult={voteResult} />
        <WaterMark />
      </CaptureContainer>
      <ResultBtn onCapture={handleCapture} />
      <ResultGraph voteResult={voteResult} />
      <ResultInfo information={voteResult?.poll} />
      <Comment
        voteId={detailId}
        voteChoice={voteResult?.choice}
        comments={voteResult?.comments}
      />
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  background-color: ${props => props.theme.colors.pinkBgColor};
`;

const CaptureContainer = styled.div``;

const WaterMark = styled.img`
  content: url('/images/Nav/main_logo.png');
  width: 200px;
  display: ${props => (props.showWatermark ? 'flex' : 'none')};
  margin: 0px auto;
`;
