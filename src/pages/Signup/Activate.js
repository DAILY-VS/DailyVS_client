import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/auth';

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const verify_account = e => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    navigate('/');
    return null;
  }

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: '200px' }}
      >
        <h1>Verify your Account:</h1>
        <button
          onClick={verify_account}
          style={{ marginTop: '50px' }}
          type="button"
          className="btn btn-primary"
        >
          인증하기
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);