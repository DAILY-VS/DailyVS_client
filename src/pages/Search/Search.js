import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import SearchCard from './SearchCard';

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const location = useLocation();
  const value = new URLSearchParams(location.search).get('keyword');

  useEffect(() => {
    fetch(`https://daily-vs.com/api/search/?search=${value}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(result => {
        setSearchData(result);
        setLoading(false);
      });
  }, [value]);

  if (loading) return;
  return (
    <Container>
      <SearchTitle>검색 목록</SearchTitle>
      <SearchGrid>
        {searchData.map(item => (
          <SearchContent key={item.id}>
            <SearchCard item={item} />
          </SearchContent>
        ))}
      </SearchGrid>
    </Container>
  );
};
export default Search;

const Container = styled.div``;

const SearchTitle = styled.h1`
  font-family: 'GongGothicLight';
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: 24px;
  color: #17355a;
`;

const SearchGrid = styled.div`
  margin-top: 2rem;
  margin-right: 2rem;
  margin-left: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const SearchContent = styled.div``;
