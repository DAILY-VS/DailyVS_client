import { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useSearchParams } from 'react-router-dom';

const KakaoAuth = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get('code');
  console.log(code);
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
      console.log('ttttt', token);
      const accessTokenPost = await axios.post(
        `https://daily-vs.com/api/accounts/kakao/login/callback/`,
        { code: code, access: token },
        {
          headers: { Authorization: code },
        },
      );
      console.log(accessTokenPost);
      const ourToken = accessTokenPost.data.access;
      console.log(ourToken);
      localStorage.setItem('token', ourToken);
      localStorage.setItem('refresh', ourToken);
      localStorage.setItem('access', ourToken);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  return null;
};
export default KakaoAuth;
