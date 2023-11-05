import React, { useState } from 'react';
import styled from 'styled-components';
import ApexCharts from 'react-apexcharts';

const TFGraph = ({ choices, t_choices, f_choices }) => {
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [isRotated, setIsRotated] = useState(true);

  const toggleRotation = () => {
    setIsRotated(!isRotated);
    setIsGraphVisible(!isGraphVisible);
  };

  const chartOptions = {
    series: [],
    colors: ['#17355a', '#457c9e', '#a7dcdd', '#D9D9D9', '#4F4F4F'],
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
      height: 50,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: '',
    },
    xaxis: {
      categories: ['T', 'F'],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: 40,
    },
  };

  choices?.forEach((choice, index) => {
    chartOptions.series.push({
      name: choice.choice_text,
      data: [t_choices[index], f_choices[index]],
    });
  });
  return (
    <TFContainer>
      <Toggler onClick={toggleRotation}>
        <Chevron
          src="/media/images/Buttons/chevron.png"
          alt="chevron"
          className={isRotated ? '' : 'rotated'}
        />
        T / F
      </Toggler>
      {isGraphVisible && (
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          width="400"
          height="200"
        />
      )}
    </TFContainer>
  );
};

export default TFGraph;

const TFContainer = styled.div`
  display: flex;
  flex-direction: column;
  & tspan {
    font-size: 16px;
  }
`;

const Toggler = styled.div`
  display: flex;
  align-items: center;
  font-family: 'GongGothicBold';
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
