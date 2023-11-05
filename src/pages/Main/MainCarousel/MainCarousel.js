import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import MainVoteCard from './MainVoteCard';
import 'swiper/swiper-bundle.min.css';

// SwiperCore modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const MainCarousel = ({ loading, apiList }) => {
  const [mainVote, setMainVote] = useState([]);

  useEffect(() => {
    if (!loading) {
      fetch(`https://daily-vs.com/api/`)
        .then(response => response.json())
        .then(result => {
          setMainVote(result.promotion_polls);
        });
    }
  }, [loading]);

  const swiperParams = {
    loop: true,
    centeredSlides: true, // 중앙 슬라이드를 화면 중앙에 배치
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 2000,
    },
  };

  if (loading) return null;
  return (
    <CarouselSection>
      <CarouselTopName>🔥 HOT 🔥</CarouselTopName>
      <SwiperSection>
        <Swiper {...swiperParams}>
          {mainVote.map(mainVotes => (
            <SwiperSlide key={mainVotes.id}>
              <MainVoteCard
                id={mainVotes.id}
                title={mainVotes.title}
                thumbnail={mainVotes.thumbnail}
                content={mainVotes.content}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomSliderButton>
          <i className="swiper-button-prev custom-button" />{' '}
          <i className="swiper-button-next custom-button" />{' '}
        </CustomSliderButton>
        {/* 다음 슬라이드로 이동하는 버튼 */}
      </SwiperSection>
    </CarouselSection>
  );
};

export default MainCarousel;

const CarouselSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CarouselTopName = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 24px;
  padding-top: 20px;
  margin-bottom: 20px;
`;

const SwiperSection = styled.div`
  width: 500px;
`;

const CustomSliderButton = styled.div`
  display: flex;
  justify-content: space-between;
  i {
    position: static;
    margin: -200px 30px 150px 30px;
    color: #17355a;
  }
`;
