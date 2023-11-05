import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateTTC from './CreateTTC';
import Carousel from 'react-multi-carousel';
import { MintButton } from '../../components/Atoms/Buttons';
import CreateChoice from './CreateChoice';
import CreateCat from './CreateCat';
import { checkAuthenticated, load_user } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 1,
  },
};

function Create() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  useEffect(() => {
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

    fetch(`https://daily-vs.com/api/accounts/user_info/`, {
      headers: config.headers,
    })
      .then(response => response.json())
      .then(result => {
        setUserInfo(result);
      });
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    category: [],
    choice: [],
  });

  const dataProps = {
    formData,
    setFormData,
  };
  const handleSubmit = e => {
    e.preventDefault();

    const sendData = new FormData();

    sendData.append('owner', JSON.stringify(userInfo));
    sendData.append('title', formData.title);
    sendData.append('content', formData.content);
    sendData.append('thumbnail', formData.thumbnail);
    for (let i = 0; i < formData.category.length; i++) {
      sendData.append('category', JSON.stringify(formData.category[i]));
    }
    for (let j = 0; j < formData.choice.length; j++) {
      sendData.append('choice', JSON.stringify(formData.choice[j]));
    }

    sendData.forEach((value, key) => {
      console.log('백엔드에 보낸 데이터', key, value);
    });

    const accessToken = localStorage.getItem('access');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);

    fetch(`https://daily-vs.com/api/create`, {
      method: 'POST',
      body: sendData,
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        console.log('데이터 받기 성공:', data);
        navigate(`/vote-detail/${data.id}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const CustomButtonGroup = ({ next, previous, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <ButtonGroup>
        {currentSlide === 0 ? null : (
          <MintButton content={'이전으로'} onClick={() => previous()} />
        )}
        {currentSlide === 2 ? (
          <MintButton
            as="button"
            content={'제출하기'}
            type="submit"
            onClick={handleSubmit}
          />
        ) : (
          <MintButton content={'다음으로'} onClick={() => next()} />
        )}
      </ButtonGroup>
    );
  };
  return (
    <Container onSubmit={handleSubmit}>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={false}
        partialVisible={false}
        arrows={false}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside
        customButtonGroup={<CustomButtonGroup />}
      >
        <CreateTTC {...dataProps} />
        <CreateChoice {...dataProps} />
        <CreateCat {...dataProps} />
      </Carousel>
    </Container>
  );
}

const Container = styled.form`
  width: min(100%, 1200px);
  margin: 0 auto 100px;
  position: relative;
`;
const ButtonGroup = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: min(100%, 400px);
  height: 56px;
  & > div,
  & > button {
    flex: 1;
  }
`;
export default Create;
