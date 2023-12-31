import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const TotalGraph = ({ voteResult }) => {
  const getChartColors = length => {
    if (length === 2) {
      return ['#17355a', '#ff495a'];
    } else {
      return ['#17355a', '#457c9e', '#a7dcdd', '#D9D9D9', '#4F4F4F'];
    }
  };

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartId, setChartId] = useState(null);

  const total_choices = voteResult.statistics?.choice;
  const total_choicesArray = [];

  for (let i = 1; i <= 5; i++) {
    const choiceKey = `choice${i}`;

    if (total_choices?.hasOwnProperty(choiceKey)) {
      total_choicesArray.push(total_choices[choiceKey]);
    }
  }

  useEffect(() => {
    if (voteResult) {
      const ctx = chartRef.current.getContext('2d');
      const graphData = {
        labels: [],
        percentages: total_choicesArray,
        backgroundColors: getChartColors(voteResult?.poll?.choices?.length),
      };
      graphData.labels = voteResult.poll?.choices.map(
        choice => choice.choice_text,
      );

      for (let i = 1; i <= voteResult.statistics?.choice_count; i++) {
        const percentageKey = `choice${i}_percentage`;
        graphData.percentages.push(voteResult.statistics[percentageKey]);
      }

      if (chartId) {
        chartInstance.current.destroy();
      }

      // 새로운 ID 생성
      const newChartId = `chart-${Date.now()}`;
      setChartId(newChartId);

      // 차트 그리기
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: graphData.labels,
          datasets: [
            {
              data: graphData.percentages,
              backgroundColor: graphData.backgroundColors,
            },
          ],
        },
        options: {
          responsive: false,
          legend: {
            position: 'bottom',
          },
        },
      });
    }
  }, [voteResult]);

  return (
    <GraphContainer>
      <canvas ref={chartRef} style={{ margin: '0px auto' }} />
    </GraphContainer>
  );
};

export default TotalGraph;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
`;
