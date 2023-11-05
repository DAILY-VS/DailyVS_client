import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBox = () => {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      performSearch(e);
    }
  };

  const performSearch = () => {
    navigate(`/search?keyword=${userInput}`, {
      state: { value: userInput },
    });
  };

  const handleClear = () => {
    setUserInput('');
  };
  return (
    <Container>
      <SearchButton onClick={performSearch}>
        <SearchImg src="/media/images/Buttons/search_b.png" alt="검색" />
      </SearchButton>

      <SearchInput
        placeholder="제목으로 검색하세요"
        id="search"
        value={userInput}
        type="text"
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
      />
      <DeleteImg
        src="/media/images/Buttons/deleteBtn.png"
        alt="삭제"
        onClick={handleClear}
      />
    </Container>
  );
};
export default SearchBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  border-radius: 30px;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  width: 30rem;
  height: 2.5rem;
  margin: 0 1rem 1.5rem;
`;

const SearchImg = styled.img`
  width: 25px;
  height: 25px;
`;

const SearchInput = styled.input`
  margin-left: 0.5rem;
  height: 2rem;
  width: 12rem;
  border: none;
  flex: 1;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const DeleteImg = styled.img`
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
`;
