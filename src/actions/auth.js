import axios from 'axios';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  KAKAO_AUTH_SUCCESS,
  KAKAO_AUTH_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  LOAD_USER,
} from './types';

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `https://daily-vs.com/api/accounts/user`,
        config,
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem('access') });

    try {
      const res = await axios.post(
        `https://daily-vs.com/api/accounts/token/verify/`,
        body,
        config,
      );

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `https://daily-vs.com/api/accounts/login/`,
      body,
      config,
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
    console.error('로그인 에러:', err.response.data);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  (email, nickname, gender, mbti, password1, password2, age) =>
  async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      email,
      nickname,
      gender,
      mbti,
      password1,
      password2,
      age,
    });

    try {
      const res = await axios.post(
        `https://daily-vs.com/api/accounts/`,
        body,
        config,
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const kakaoAuthSuccess = (access, refresh, nickname) => ({
  type: KAKAO_AUTH_SUCCESS,
  payload: { access, refresh, nickname },
});

export const kakaoAuthFail = () => ({
  type: KAKAO_AUTH_FAIL,
});

export const loadUser = () => ({
  type: LOAD_USER,
});

export const kakaoAuthenticate = (state, code) => async dispatch => {
  if (state && code && !localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const details = {
      state: state,
      code: code,
    };

    const formBody = Object.keys(details)
      .map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]),
      )
      .join('&');

    try {
      const res = await axios.post(
        `https://daily-vs.com/api/accounts/kakao/login/callback/?${formBody}`,
        config,
      );

      const { access, refresh, nickname } = res.data;

      dispatch(kakaoAuthSuccess(access, refresh, nickname));

      dispatch(loadUser());
    } catch (err) {
      dispatch(kakaoAuthFail());
    }
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      'https://daily-vs.com/api/accounts/auth/users/activation/',
      body,
      config,
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = email => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(config);
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `https://daily-vs.com/api/accounts/password/reset/`,
      body,
      config,
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config,
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
