import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextareaWithLimit from '../../components/Atoms/Textarea';
import HeaderText from '../../components/Atoms/HeaderText';
import theme from '../../styles/theme';
import DeleteBtn from '../../components/Atoms/DeleteBtn';

function CreateTTC({ formData, setFormData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageDataURL = e.target.result;
        setSelectedImage(imageDataURL);

        uploadImageToServer(file);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const uploadImageToServer = imageFile => {
    setFormData({
      ...formData,
      thumbnail: imageFile,
    });
  };
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      <HeaderText content="투표 만들기" />
      <ThumbnailContainer>
        {selectedImage ? (
          <>
            <Thumbnail src={selectedImage} alt={'test'} />
            <DeleteBtnWrap>
              <DeleteBtn onClick={handleDeleteImage} />
            </DeleteBtnWrap>
          </>
        ) : (
          <label className="custom-file-input">
            <span>이미지 넣기</span>
            <img src="/media/images/Buttons/image.png" alt="image icon" />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        )}
      </ThumbnailContainer>
      <CreateBottom>
        <Wrapper>
          <label htmlFor="createTitle">제목:</label>
          <Input
            id="createTitle"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="약먹고 물먹기 vs 물먹고 약먹기"
          />
        </Wrapper>

        <TextareaWithLimit
          id="createContent"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="당신의 선택은?"
          max={500}
          label={'투표 설명'}
        />
      </CreateBottom>
    </Container>
  );
}
const DeleteBtnWrap = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: min(100%, 400px);
`;
const ThumbnailContainer = styled.div`
  width: 100%;
  height: 360px;
  overflow: hidden;
  margin: 10px auto 0 auto;
  background-color: ${theme.colors.mintSecondaryColor};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 20px;
  position: relative;

  & .custom-file-input {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
    height: 100%;

    & img {
      width: 30px;
      transition: 0.3s;
    }
    & span {
      cursor: pointer;
    }
    &:hover img {
      transform: scale(1.1);
    }
  }
  & .custom-file-input input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 20px solid ${theme.colors.mintSecondaryColor};
`;
const CreateBottom = styled.div`
  width: min(100%, 400px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #17355a;
  padding: 7px 12px;
  margin: 5px 0 20px 0;
  flex: 1;
  border: 2px solid black;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &::placeholder {
    color: ${theme.colors.placeholder};
  }
`;

export default CreateTTC;
