import './App.css';
import { Route, Routes } from 'react-router-dom';

// 각 페이지 정보
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import TradeMainPage from './pages/tradeMainPage';
import CommunityPage from './pages/communityPage';
import AuctionPage from './pages/auctionPage';
import Navbar from './components/navbar';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path='/login' element={<LoginPage />} />
        {/* 메인 페이지 */}
        <Route path='/' element={<MainPage />} />
        {/* 중고거래 메인 페이지 */}
        <Route path='/tradeMain' element={<TradeMainPage />} />
        {/* 경매 페이지 */}
        <Route path='/auction' element={<AuctionPage />} />
        {/* 커뮤티니 페이지 */}
        <Route path='/community' element={<CommunityPage />} />
      </Routes>
    </div>
  );
};

export default App;