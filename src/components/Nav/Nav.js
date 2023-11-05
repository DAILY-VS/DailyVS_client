import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import SearchBox from './SearchBox';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, logout } from '../../actions/auth';

const Nav = ({ checkAuthenticated, load_user, logout, isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false);
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

  const logout_user = () => {
    const shouldLogout = window.confirm('로그아웃 하시겠습니까?');
    if (shouldLogout) {
      logout();
      setRedirect(true);
    }
  };

  return (
    <>
      <Marquee
        style={{
          background: 'linear-gradient(135deg, #e0e9ff, #f5e8fc, #ffdbe3)',
          cursor: 'unset',
        }}
      >
        <InnerMarquee>
          <span>매일매일의 즐거움 Daily VS</span>
          {userInfo && userInfo.mbti ? (
            <span>{`${userInfo.mbti}인 당신은 무엇을 골랐을까?`}</span>
          ) : (
            <span>INFP인 그녀는 무엇을 골랐을까?</span>
          )}
          <span>매일매일의 즐거움 Daily VS</span>
          <span>INFP인 그녀는 무엇을 골랐을까?</span>
          <span>매일매일의 즐거움 Daily VS</span>
          {userInfo && userInfo.mbti ? (
            <span>{`${userInfo.mbti}인 당신은 무엇을 골랐을까?`}</span>
          ) : (
            <span>INFP인 그녀는 무엇을 골랐을까?</span>
          )}
          <span>매일매일의 즐거움 Daily VS</span>
        </InnerMarquee>
      </Marquee>
      <NavContainer>
        <NavList>
          {/* <NavSearch>
            <SearchBox />
          </NavSearch> */}
          {/* <img
            src="/images/Buttons/search_b.png"
            alt="검색"
            width={25}
            height={25}
          /> */}
          <NavLogo to="/">
            <LogoImg src="/media/images/Nav/Row.png" alt="로고" />
          </NavLogo>

          <SearchMyPage>
            {/* <NavFortune to="/fortune">
              <img src="/images/Fortune/Cookie.png" alt="포춘쿠키" />
            </NavFortune> */}
            {isAuthenticated ? (
              <>
                <NavLink2 to="/my-page">
                  <img src="/media/images/Nav/Logged.png" alt="마이페이지" />
                  <UserNickNameContainer>
                    <UserNickName>{userInfo.nickname}</UserNickName>님
                  </UserNickNameContainer>
                </NavLink2>
                <Logout href="/login" onClick={logout_user}>
                  로그아웃
                </Logout>
              </>
            ) : (
              <NavLink1 to="/login">
                <img src="/media/images/Nav/unLogged.png" alt="로그인" />
                로그인
              </NavLink1>
            )}
          </SearchMyPage>
        </NavList>
      </NavContainer>
      <NavSearch>
        <SearchBox />
      </NavSearch>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  checkAuthenticated,
  load_user,
  logout,
})(Nav);

const InnerMarquee = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 70px;
  padding-right: 70px;
  span {
    cursor: unset;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(100%, 1200px);
  height: 10vh;
  margin: 0 auto;
`;

const NavList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 15px;
  position: relative;
  margin: 0 20px;
`;

const SearchMyPage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & img {
    width: 30px;
    margin-right: 5px;
  }
  @media screen and (min-width: 768px) {
    margin-left: auto;
  }
`;

const NavLink1 = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GongGothicLight';
  font-size: 14px;
  color: #ff495a !important;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    text-decoration: none;
  }
`;

const NavLink2 = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  font-family: 'GongGothicLight';
  font-size: 16px;
  color: #ff495a;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    text-decoration: none;
  }
`;
const UserNickNameContainer = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const UserNickName = styled.span`
  color: #457c9e;
  margin-top: 2px;
  font-size: 14px;
`;

const NavLogo = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  width: 150px;
`;

const NavFortune = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  & img {
    width: 60px;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const NavSearch = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'GongGothicLight';
  font-size: 14px;
  color: #17355a;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
