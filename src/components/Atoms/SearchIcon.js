import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SearchIcon = () => {
  return (
    <Link>
      <SearchBtn>
        <SearchImg src="/media/images/Buttons/search_b.png" alt="검색" />
      </SearchBtn>
    </Link>
  );
};

export default SearchIcon;

const SearchBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchImg = styled.img`
  width: 25px;
  height: 25px;
`;
