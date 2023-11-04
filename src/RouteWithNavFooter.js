import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Fortune from './pages/Fortune/Fortune';
import VoteDetail from './pages/Detail/Detail/Detail';
import Create from './pages/Create/Create';
import VoteResult from './pages/Result/Result';
import DetailGender from './pages/Detail/DetailGender/DetailGender';
import DetailMBTI from './pages/Detail/DetailMBTI/DetailMBTI';
import DetailAge from './pages/Detail/DetailAge/DetailAge';
import Mypage from './pages/Mypage/Mypage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Modify from './pages/Mypage/Modify/Modify';
import FixPassWord from './pages/Mypage/Modify/FixPassWord';
import { useSelector } from 'react-redux';
import EmailError from './pages/ErrorPage/EmailError';
import LoginEmail from './pages/ErrorPage/LoginEmail';
import Search from './pages/Search/Search';

const RouteWithNavFooter = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/vote-detail/:id" element={<VoteDetail />} />
        <Route path="/vote-detail/gender/:id" element={<DetailGender />} />
        <Route path="/vote-detail/mbti/:id" element={<DetailMBTI />} />
        <Route path="/vote-detail/age/:id" element={<DetailAge />} />
        <Route path="/vote-result/:id" element={<VoteResult />} />
        <Route path="/fortune" element={<Fortune />} />
        <Route path="/search" element={<Search />} />
        {isAuthenticated ? (
          <Route path="/create" element={<Create />} />
        ) : (
          <Route path="/create" element={<Main />} />
        )}
        {isAuthenticated ? (
          <Route path="/my-page" element={<Mypage />} />
        ) : (
          <Route path="/my-page" element={<Main />} />
        )}
        {isAuthenticated ? (
          <Route path="/my-page/fix" element={<Modify />} />
        ) : (
          <Route path="/my-page/fix" element={<Main />} />
        )}

        <Route
          path="/accounts/password/reset/confirm/:id/:token"
          element={<FixPassWord />}
        />

        <Route path="*" element={<ErrorPage />} />
        <Route path="/email-error" element={<EmailError />} />
        <Route path="/login-email" element={<LoginEmail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default RouteWithNavFooter;
