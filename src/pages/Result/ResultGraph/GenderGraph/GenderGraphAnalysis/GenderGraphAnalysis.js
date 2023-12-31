import React from 'react';
import styled from 'styled-components';
import ManChartAnalysis from './ManChartAnalysis';
import WomanChartAnalysis from './WomanChartAnalysis';

const GenderGraphAnalysis = ({ voteResult }) => {
  if (
    !voteResult ||
    !voteResult.choice1_man_percentage ||
    !voteResult.choice1_woman_percentage
  ) {
    return null;
  }

  return (
    <GenderContainer>
      <Charts>
        <ManChartAnalysis
          choice1ManPercentage={voteResult.choice1_man_percentage}
          choice2ManPercentage={voteResult.choice2_man_percentage}
          option1={voteResult.option_1}
          option2={voteResult.option_2}
        />
        <WomanChartAnalysis
          choice1WomanPercentage={voteResult.choice1_woman_percentage}
          choice2WomanPercentage={voteResult.choice2_woman_percentage}
          option1={voteResult.option_1}
          option2={voteResult.option_2}
        />
      </Charts>
    </GenderContainer>
  );
};

export default GenderGraphAnalysis;

const GenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  & tspan {
    font-size: 16px;
  }
`;

const Charts = styled.div`
  display: flex;
`;
