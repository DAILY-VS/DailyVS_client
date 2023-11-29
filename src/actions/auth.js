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
  KAKAO_LOGOUT,
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
        `${process.env.REACT_APP_HOST}/accounts/user`,
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
  const isKakaoAuthenticated = localStorage.getItem('isKakao');
  if (!isKakaoAuthenticated) {
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
          `${process.env.REACT_APP_HOST}/accounts/token/verify/`,
          body,
          config,
        );

        if (res.status === 401) {
          window.location.reload('/');
        }
        if (res.data.code !== 'token_not_valid') {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch(refreshToken());
        }
      } catch (err) {
        dispatch(refreshToken());
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else if (isKakaoAuthenticated) {
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
          `${process.env.REACT_APP_HOST}/accounts/token/verify/`,
          body,
          config,
        );

        if (res.status === 401) {
          window.location.reload('/');
        }
        if (res.data.code !== 'token_not_valid') {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch(refreshKakao());
        }
      } catch (err) {
        dispatch(refreshKakao());
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  }
};

export const refreshKakao = () => async dispatch => {
  const refresh_token = localStorage.getItem('refresh');
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;

  if (!refresh_token) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    grant_type: 'refresh_token',
    client_id: REST_API_KEY,
    refresh_token: refresh_token,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_HOST}/accounts/token/refresh/`,
      body,
      config,
    );

    dispatch({
      type: AUTHENTICATED_SUCCESS,
    });

    localStorage.setItem('access', res.data.access);
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
    alert('토큰 갱신 시간이 만료되었습니다. 다시 로그인해주세요.');
    dispatch({
      type: KAKAO_LOGOUT,
    });

    window.location.href = '/login';
  }
};

export const refreshToken = () => async dispatch => {
  const refresh_token = localStorage.getItem('refresh');

  if (!refresh_token) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ refresh: refresh_token });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_HOST}/accounts/token/refresh/`,
      body,
      config,
    );

    dispatch({
      type: AUTHENTICATED_SUCCESS,
    });

    localStorage.setItem('access', res.data.access);
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
    alert('토큰 갱신 시간이 만료되었습니다. 다시 로그인해주세요.');
    dispatch({
      type: LOGOUT,
    });

    window.location.href = '/login';
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
      `${process.env.REACT_APP_HOST}/accounts/login/`,
      body,
      config,
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
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
        `${process.env.REACT_APP_HOST}/accounts/`,
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
        `${process.env.REACT_APP_KAKAO_HOST}/accounts/kakao/login/callback/?${formBody}`,
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
      `${process.env.REACT_APP_HOST}/account/auth/users/activation/`,
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
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_HOST}/accounts/password/reset/`,
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

export const logout = () => async dispatch => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  if (!accessToken) {
    return;
  }

  const data = {
    refresh: refreshToken,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_HOST}/accounts/logout/`,
      data,
      config,
    );

    dispatch({
      type: LOGOUT,
      payload: res.data,
    });
  } catch (err) {
    console.error('로그아웃 에러:', err.response.data);
  }
};

export const kakao_logout = () => async dispatch => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  if (!accessToken) {
    return;
  }

  const data = {
    access_kakao: accessToken,
    refresh: refreshToken,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_HOST}/accounts/kakao/logout/`,
      data,
      config,
    );

    dispatch({
      type: KAKAO_LOGOUT,
      payload: res.data,
    });

    localStorage.removeItem('isKakao');
  } catch (err) {
    console.error('로그아웃 에러:', err);
  }
};
