import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginPage,
  SignInAndUpComponent
} from '../components/loginPage.styles';
import { useRecoilValue } from 'recoil';
import { isLoggedInAtom } from '../states/account/loginAtom';
import axios from 'axios';

const loginPage = () => {
  const navigate = useNavigate();

  // 로그인 버튼 눌렀을 때
  const onLoginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 버튼 누르면 새로고침 되는것을 막아줌
    event.preventDefault();

    console.log('로그인 정보');
    console.log('이메일: ', email);
    console.log('비밀번호: ', password);
    // onLogin(email, password)
  };

  // 로그인 여부
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간)

  // 로그인 요청 api
  // const onLogin = (email: any, password: any) => {
  //   const data = {
  //     email,
  //     password
  //   };
  //   axios
  //     .post('/login', data)
  //     .then((response) => {
  //       const { accessToken } = response.data;

  //       // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
  //       axios.defaults.headers.common[
  //         'Authorization'
  //       ] = `Bearer ${accessToken}`;

  //       // accessToken을 localStorage, cookie 등에 저장하지 않는다!
  //     })
  //     .catch((error) => {
  //       // ... 에러 처리
  //     });
  // };

  const onSilentRefresh = () => {
    axios
      .post('/silent-refresh')
      .then(onLoginSuccess)
      .catch((error) => {
        console.log(error);
        // 로그인 실패처리
      });
  };

  // 로그인 성공 시
  const onLoginSuccess = (response: { data: { accessToken: any } }) => {
    const { accessToken } = response.data;

    // accessToken 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  };

  // 회원가입 요청 api
  const onSignUp = () => {
    try {
      const response = axios.post('url', signUpForm);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 버튼 눌렀을때
  const onSignUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 회원가입 데이터 정보 확인
    console.log('회원가입 정보');
    console.log('프로필 사진: ', file);
    console.log(signUpForm);
  };

  const [image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      // 업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
      return;
    }
    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <LoginPage>
      <SignInAndUpComponent></SignInAndUpComponent>
    </LoginPage>
  );
};

export default loginPage;
