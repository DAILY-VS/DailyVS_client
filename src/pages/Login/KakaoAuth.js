import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { kakaoAuthSuccess, kakaoAuthFail } from '../../actions/auth';

const KakaoAuth = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_KAKAO_URI;

  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get('code');

  const navigate = useNavigate();

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    });
    try {
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload,
      );

      const token = res.data.access_token;
      const accessTokenPost = await axios.post(
        `${process.env.REACT_APP_HOST}/accounts/kakao/login/callback/`,
        { code: code, access: token },
        {
          headers: { Authorization: code },
        },
      );

      const ourToken = accessTokenPost.data.access;
      const yourToken = accessTokenPost.data.refresh;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh', yourToken);
      localStorage.setItem('access', ourToken);
      localStorage.setItem('isKakao', true);
      kakaoAuthSuccess();
      navigate('/');
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        alert('카카오 인증 실패. 다시 시도해주세요!');
        navigate('/login');
      } else if (err.response.status === 530) {
        alert(
          '이미 가입한 전적이 있는 이메일입니다. 일반 로그인을 사용해주세요!',
        );
        navigate('/login');
      } else if (err.response.status === 500) {
        alert('카카오 인증 실패. 다시 시도해주세요! error 500');
        navigate('/login');
      }

      kakaoAuthFail();
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  return null;
};
export default KakaoAuth;
