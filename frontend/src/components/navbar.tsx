import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onLogout, onLoginSuccess } from '../utils/user';

// 로그인 여부
import { useRecoilState } from 'recoil';
import { isLoggedInAtom } from '../states/account/loginAtom';
import axios from 'axios';
// 로그아웃

const NavbarDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  /* border-top: 2px solid black; */
  /* border-bottom: 2px solid black; */
  display: flex;
  justify-content: space-between;
  z-index: 10;
  background-color: #242526;
  /* font-family: 'Poppins', sans-serif; */
`;

const MenuDiv = styled.div`
  width: 50vw;
  height: 7vh;
  margin-top: 5px;
  /* border: 2px solid red; */
  display: flex;
  /* line-height: 4vh; */
  /* align-items: center; */
`;

const MenuName = styled.p`
  font-size: 15px;
  margin-right: 3vw;
  color: rgb(255, 255, 255, 0.5);
  transition:
    color 0.2s,
    font-weight 0.2s;
  &:hover {
    color: rgb(255, 255, 255);
    font-weight: 560;
  }
`;

const TitleTag = styled.div`
  width: 80px;
  height: 30px;
  margin-top: 4px;
  margin-left: 17px;
`;

const TitleName1 = styled.span`
  font-family: var(--font-googleNanumPen);
  font-size: 44px;
  color: #4786fa; // 텍스트 색상 설정
`;
const TitleName2 = styled.span`
  font-family: var(--font-googleNanumPen);
  font-size: 44px;
  color: #f2f7f7; // 텍스트 색상 설정
`;

const NotifyDiv = styled.div`
  z-index: 50;
  /* display: flex; */
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 400px;
  height: 300px;
  background-color: white;
  border: 2px solid #337ccf;
  border-radius: 10px;
  font-weight: 600;
`;

const NotifyImg = styled.img`
  width: 150px;
  margin: 15px 0 0 110px;
`;
const NotifyTag = styled.p`
  font-size: 27px;
  margin: 30px 0 0 40px;
  color: #337ccf;
`;
const NotifyText = styled.p`
  font-size: 27px;
  margin: 5px 0 0 110px;
  color: #337ccf;
`;
const CancleBtn = styled.div`
  width: 40px;
  height: 30px;
  /* border: 1px solid black; */
  font-size: 20px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    background-color: #e4e3e3; /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;
const GoTradeBtn = styled.div`
  width: 140px;
  height: 40px;
  border: 1px solid black;
  border-radius: 15px;
  text-align: center;
  line-height: 40px;
  margin-top: 10px;
  margin-left: 120px;
  color: white;
  background-color: #337ccf;
  &:hover {
    background-color: #6faabb; /* 호버 시 변경될 배경색 */
    cursor: pointer; /* 호버 시 커서 모양 변경 (선택 사항) */
  }
`;
const Notify = ({ setNotify }) => {
  const navigate = useNavigate();
  return (
    <NotifyDiv>
      <CancleBtn onClick={() => setNotify(false)}>x</CancleBtn>
      <NotifyTag>경매상회입찰이 되었어요!</NotifyTag>

      <NotifyImg src='/assets/img/notify.PNG'></NotifyImg>
      <NotifyText>+ ㅇㄴㅁㄹ</NotifyText>
      {/* <GoTradeBtn onClick={() => navigate('/')}>재입찰하러 가기</GoTradeBtn> */}
      <GoTradeBtn onClick={() => navigate('/auctionDetail/3')}>
        재입찰하러 가기
      </GoTradeBtn>
    </NotifyDiv>
  );
};

const Title = () => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/');
  };
  return (
    <TitleTag onClick={goMain}>
      <TitleName1>싸</TitleName1>
      <TitleName2>그리</TitleName2>
    </TitleTag>
  );
};

const MenuBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

  const navigate = useNavigate();

  const [showOverlay, setShowOverlay] = useState(false);
  // MenuName에 마우스 진입 이벤트 핸들러
  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  // MenuName에서 마우스를 떠남 이벤트 핸들러
  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const goLogout = () => {
    onLogout();
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const goLogin = () => {
    navigate('/login');
  };
  const goMain = () => {
    navigate('/');
  };
  const goTrade = () => {
    navigate('/tradeMain');
  };
  const goAuction = () => {
    navigate('/auction');
  };
  const goCommu = () => {
    navigate('/community');
  };

  useEffect(() => {
    console.log('로그인 여부 바뀜', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <MenuDiv>
      {isLoggedIn ? (
        <MenuName
          onClick={goLogout}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          로그아웃
        </MenuName>
      ) : (
        <MenuName
          onClick={goLogin}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          로그인
        </MenuName>
      )}

      <MenuName
        onClick={goMain}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        메인
      </MenuName>
      <MenuName
        onClick={goTrade}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        중고거래{' '}
      </MenuName>
      <MenuName
        onClick={goAuction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        경매{' '}
      </MenuName>
      <MenuName
        onClick={goCommu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        커뮤니티{' '}
      </MenuName>
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100vw',
          height: showOverlay ? '40px' : 0,
          backgroundColor: '#242526',
          transition: 'height 0.7s' // 이 부분 수정
          // overflow: 'hidden'
        }}
      ></div>
    </MenuDiv>
  );
};

const SideDiv = styled.div`
  width: 20vw;
  height: 7vh;
  /* border: 2px solid blue; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideName = styled.p`
  font-size: 1.1vw;
  margin-right: 2vw;
`;

const SideBar = () => {
  return (
    <SideDiv>
      <SideName>마이페이지</SideName>
      <SideName>햄버그바</SideName>
    </SideDiv>
  );
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  // 알람유무
  const [notify, setNotify] = useState(true);

  const onSilentRefreshInNav = () => {
    localStorage.removeItem('isLoggedIn');
    axios
      .get('/jwt/refill')
      .then((res) => {
        console.log('silent refresh, 새로운 액세스 토큰 발급');
        console.log('Recoil 로그인 여부: ', isLoggedIn);
        // 리프레시 토큰이 유효 [ STATUS 200 ]
        // 새로운 액세스 토큰 발급
        onLoginSuccess(res);
        setIsLoggedIn(true);
      })
      .catch(() => {
        console.log('silent refresh, 리프레시 토큰이 유효하지 않습니다.');
        // 리프레시 토큰이 유효하지 않은 경우 [ STATUS 400, 500 ]
        // 로그인페이지로 이동
      });
  };

  useEffect(() => {
    onSilentRefreshInNav();
    // notification();
    // 알림기능
    const urlEndPoint =
      'https://j9b209.p.ssafy.io/api/notification/subscribe/1';
    const eventSource = new EventSource(urlEndPoint);
    eventSource.addEventListener('sse-emitter-created', function (event) {
      console.log(event);
    });

    eventSource.addEventListener('new bid', function (e) {
      console.log(e.data);
      if (e.data) {
      }
    });
  });

  return (
    <NavbarDiv>
      <Title></Title>
      <MenuBar></MenuBar>
      <SideBar></SideBar>
      {/* 알림 */}
      {notify ? <Notify setNotify={setNotify}></Notify> : null}
    </NavbarDiv>
  );
};

export default Navbar;
