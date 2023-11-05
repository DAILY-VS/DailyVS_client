import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';

const AgeGraph = ({
  choices,
  choices_10,
  choices_20_1,
  choices_20_2,
  choices_30_1,
  choices_30_2,
  choices_40,
}) => {
  const [isRotated, setIsRotated] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
    setIsGraphVisible(!isGraphVisible);
  };

  const chartData = {
    series: [],
    colors: ['#17355a', '#457c9e', '#a7dcdd', '#D9D9D9', '#4F4F4F'],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: [
          '10대',
          '20대 초반',
          '20대 후반',
          '30대 초반',
          '30대 후반',
          '40대 이상',
        ],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'right',
        offsetX: 0,
        offsetY: 50,
      },
    },
  };

  choices?.forEach((choice, index) => {
    chartData.series.push({
      name: choice.choice_text,
      data: [
        choices_10[index],
        choices_20_1[index],
        choices_20_2[index],
        choices_30_1[index],
        choices_30_2[index],
        choices_40[index],
      ],
    });
  });

  return (
    <Container>
      <Toggler onClick={toggleRotation}>
        <Chevron
          src="/media/images/Buttons/chevron.png"
          alt="chevron"
          className={isRotated ? '' : 'rotated'}
        />
        연령대
      </Toggler>
      {isGraphVisible && (
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={chartData.options.chart.height}
          />
        </div>
      )}
    </Container>
  );
};

export default AgeGraph;

const Container = styled.div`
  & span {
    font-family: 'NEXON Lv1 Gothic OTF';
    font-size: 20px;
  }
`;

const Toggler = styled.div`
  display: flex;
  align-items: center;
  font-family: 'GongGothicMedium';
  font-size: 18px;
  color: ${props => props.theme.colors.darkbluePrimaryColor};
  margin-top: 30px;
`;

const Chevron = styled.img`
  margin-right: 20px;
  width: 30px;
  &.rotated {
    transform: rotate(180deg);
  }
  transition: transform 0.3s ease;
`;
