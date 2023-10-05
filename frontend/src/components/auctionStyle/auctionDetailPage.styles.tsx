import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { ReactComponent as IcLeft } from '/src/assets/icon_left.svg';
import { ReactComponent as IcRight } from '/src/assets/icon_right.svg';

const DetailDiv = styled.div`
  /* margin-top: 200px;
  margin-left: 200px; */
  margin: 200px auto 0px;

  width: 1600px;
  height: 1000px;
  /* border: 3px solid black; */
  display: flex;
  justify-content: space-around;
`;

// 상품 정보
const ProductInfo = styled.div`
  margin: 10px;
`;

// 상품 이미지
const StWrapper = styled.div`
  display: flex;
  position: relative;
  width: 500px;
  height: 400px;
  overflow: hidden;
  border-radius: 16px;
`;

const StImageWrapper = styled.div`
  display: flex;

  & > img {
    width: 500px;
    height: 400px;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const StLeftButton = styled(IcLeft)`
  position: absolute;
  top: calc(100% / 2);
  left: 10px;
  z-index: 999;

  &:hover {
    cursor: pointer;
    & > path {
      fill: rgba(255, 255, 255, 0.5);
    }
  }
`;

const StRightButton = styled(IcRight)`
  position: absolute;
  top: calc(100% / 2);
  right: 10px;
  z-index: 999;

  &:hover {
    cursor: pointer;
    & > path {
      fill: rgba(255, 255, 255, 0.5);
    }
  }
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

// 입찰 정보
const BidInfo = styled.div`
  margin: 10px;
  width: 600px;
`;

const EachBid = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: rgba(157, 198, 255, 0.3);
  border-radius: 8px;

  padding: 10px;
  margin-top: 10px;
`;

const HighPriceIcon = styled.div`
  border: 1px solid #315dfb;
  background: #9dc6ff;
`;

// 각 소제목
const InfoTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
`;
// 내용 구분
const InfoContentBox = styled.div`
  /* margin: 10px; */
`;
// 각 내용들
const InfoContent = styled.div`
  margin: 20px 10px;

  &.price-info {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  &.image {
    border-radius: 16px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

// 상품 이미지
const ProductImg = styled.img`
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

// 상품명
const ProductName = styled.div`
  margin: 10px 0px;
`;
// 상품 설명
const ProductExplain = styled.div`
  padding: 20px 0px;
  border-radius: 4px;
  background: #efefef;
  text-align: center;
`;
/////////////////////

// 가격 정보 박스 (시작가, 정가, 현재가)
const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 0px;
`;

// 가격 정보 소제목
const PriceInfoTitle = styled.div`
  width: 80px;
  text-align: center;
  border: 1px solid #a5a2a2;

  &.current-price {
    border: 1px solid black;
    font-weight: 800;
  }
`;

// 가격 정보
const PriceInfoContent = styled.div`
  /* width: 160px; */
  text-align: end;
`;

////////////////

// 남은 시간
const CountTime = styled.div`
  width: 80px;
  height: 40px;
  text-align: center;
`;
// 입찰 가격 선택박스
const SelectPrice = styled.div`
  width: 80px;
`;
// 입찰 버튼
const BidButton = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
`;
////////////////

//// 입찰 현황

// 입찰자 프로필사진
const BidderProfileImg = styled.img`
  width: 50px;
  border-radius: 70%;

  &.none-image {
    opacity: 0.5;
  }
`;

// 입찰자 닉네임
const BidderNickname = styled.div`
  width: 150px;
`;
// 입찰액
const BidPrice = styled.div``;

const AuctionDetail = () => {
  // url에서 경매상품 번호 가져오기
  const paramData = useParams();
  const auctionNo = paramData['no'];
  // console.log('경매 번호: ', auctionNo);

  const [auctionItem, setAuctionItem] = useState({
    auctionStatus: '',
    comment: '',
    createDate: '',
    deleteDate: '',
    endDate: '',
    downPrice: 0,
    finallyPrice: 0,
    name: '',
    no: '',
    number: '',
    originPrice: 0,
    priceCount: 0,
    profile: '',
    region: '',
    startDate: '',
    upPrice: 0,
    userNickName: '',
    userNo: 0
  });
  // console.log('경매 아이템 정보: ', auctionItem);
  // console.log('경매 종료 시각: ', auctionItem.endDate);

  ////

  const [ddayHour, setddayHour] = useState('00');
  const [ddayMin, setddayMin] = useState('00');
  const [ddaySec, setddaySec] = useState('00');

  // 남은 시간 카운트 다운
  const remaindTime = () => {
    const koreanDate = auctionItem.endDate;

    const parts = koreanDate.match(/\d+/g);

    if (parts !== null && parts.length >= 0) {
      const year = parseInt(parts[0], 10); // 연도
      const month = parseInt(parts[1], 10); // 월
      const day = parseInt(parts[2], 10); // 일
      const hour = parseInt(parts[3], 10); // 시
      const minute = parseInt(parts[4], 10); // 분
      const second = parseInt(parts[5], 10); // 초

      const now: Date = new Date();
      const end: Date = new Date(year, month - 1, day, hour, minute, second);

      let nt: number = now.getTime();
      let et: number = end.getTime();

      if (nt < et) {
        let sec: string | number = Math.floor((et - nt) / 1000); // 초 단위로 남은 시간 계산
        let hour: string | number = Math.floor(sec / 3600); // 시간 계산
        sec %= 3600;
        let min: string | number = Math.floor(sec / 60); // 분 계산
        sec %= 60;

        // 시, 분, 초가 10보다 작을 때 앞에 0을 추가
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        // HTML 요소에 시간 정보 업데이트
        // document.getElementById('d-day-hour')!.innerHTML = hour.toString();
        // document.getElementById('d-day-min')!.innerHTML = min.toString();
        // document.getElementById('d-day-sec')!.innerHTML = sec.toString();
        setddayHour(hour.toString());
        setddayMin(min.toString());
        setddaySec(sec.toString());
      } else {
        // 현재시간이 종료시간보다 크면
        setddayHour('00');
        setddayMin('00');
        setddaySec('00');
      }
    }
  };

  useEffect(() => {
    const intervalid = setInterval(remaindTime, 1000);

    return () => {
      clearInterval(intervalid);
    };
  }, [auctionItem.endDate]);

  ////

  const [images, setImages] = useState([]);

  // 가격 선택 박스
  // 초기 가격 설정
  const [startPrice, setStartPrice] = useState(auctionItem.downPrice); // 입찰 가능한 최소금액, 시작가격과 현재가격 중 높은 값을 설정해준다.
  const [selectedPrice, setSelectedPrice] = useState(auctionItem.downPrice); // 화면에서 선택된 금액

  // 입찰가격 옵션 설정
  const [priceOptions, setPriceOptions] = useState([]);

  const setPriceOption = () => {
    const priceList = [];

    if (auctionItem.finallyPrice !== 0) {
      const newStartPrice = auctionItem.finallyPrice + auctionItem.priceCount;
      // console.log('현재가 있을 경우 시작 가격 설정', newStartPrice);
      setStartPrice(newStartPrice);
    } else {
      setStartPrice(auctionItem.downPrice);
    }

    for (
      let price = startPrice;
      price < startPrice + 10 * auctionItem.priceCount;
      price += auctionItem.priceCount
    ) {
      // console.log('옵션 추가: ', price);
      // @ts-ignore
      priceList.push(price);
    }

    return priceList;
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(parseInt(e.target.value));
  };

  // 경매 입찰
  const auctionBid = () => {
    const bidData = {
      auctionBidPrice: selectedPrice,
      auctionNo: auctionNo,
      userNo: Number(localStorage.getItem('userNo')) // 입찰자의 유저 넘버
    };
    console.log('입찰 정보: ', bidData);

    axios
      .post(`/auction-bid`, bidData)
      .then((res) => {
        console.log(res);
        // 입찰 가능한 최소금액을 갱신해준다.
        setStartPrice(selectedPrice + auctionItem.priceCount);
        getBidList();
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data.message ===
          '입찰자와 경매올린 사람이 같은 사람입니다.'
        ) {
          alert('본인의 경매 상품에 입찰할 수 없습니다.');
        }
      });
  };

  // 지역 포맷
  const formatRegion = (region) => {
    switch (region) {
      case 'SEOUL':
        return '서울';
      case 'DAEJEON':
        return '대전';
      case 'GUMI':
        return '구미';
      case 'GWANGJU':
        return '광주';
      case 'BUG':
        return '부울경';
    }
  };

  // 상품 사진 불러오기
  const loadImg = () => {
    axios
      .get(`/auction-product/load/${auctionNo}`)
      .then((res) => {
        if (res.data.result) {
          console.log('상품 사진 있음: ', res.data.result);
          const auctionItemImages = res.data.result;
          setImages(auctionItemImages);
        } else {
          console.log('상품 사진 없음');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [bidList, setBidList] = useState<any[]>([]);

  // 경매 입찰 내역 조회
  const getBidList = () => {
    axios
      .get(`/auction-bid/${auctionNo}`)
      .then((res) => {
        console.log('입찰 내역: ', res.data);
        setBidList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    if (currentIdx === -1) {
      // @ts-ignore
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      // @ts-ignore
      slideRef.current.style.transform = `translateX(-2000px)`;
      setCurrentIdx(images.length - 1);
    } else if (currentIdx === images.length) {
      setCurrentIdx(0);
      // @ts-ignore
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      // @ts-ignore
      slideRef.current.style.transform = `translateX(0px)`;
    }
  }, [currentIdx]);

  const onClickLeftButton = () => {
    if (currentIdx === -1) {
      setCurrentIdx(images.length - 1);
    } else {
      setCurrentIdx((prev) => prev - 1);
      // @ts-ignore
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      // @ts-ignore
      slideRef.current.style.transform = `translateX(-${
        currentIdx * 500 - 500
      }px)`;
    }
  };

  const onClickRightButton = () => {
    if (currentIdx === images.length) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx((prev) => prev + 1);
      // @ts-ignore
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      // @ts-ignore
      slideRef.current.style.transform = `translateX(-${
        500 * (currentIdx + 1)
      }px)`;
    }
  };

  // 경매 상세 데이터 가져오기
  const getAuctionDetail = () => {
    axios
      .get(`/auction-product/detail`, {
        params: {
          auctionNo: auctionNo
        }
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setAuctionItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getData = () => {
      getAuctionDetail();
      loadImg();
      getBidList();
    };

    getData();
  }, []);

  useEffect(() => {
    if (auctionItem.priceCount === 0 || auctionItem.downPrice === 0) {
      return;
    } else {
      setPriceOptions(setPriceOption());
    }
  }, [
    auctionItem.priceCount,
    auctionItem.finallyPrice,
    auctionItem.downPrice,
    startPrice
  ]);

  return (
    <DetailDiv>
      {/* 상품 정보 */}
      <ProductInfo>
        <InfoTitle>상품 정보</InfoTitle>
        <InfoContentBox>
          <InfoContent className='image'>
            <StWrapper>
              <StLeftButton onClick={onClickLeftButton} />
              <StRightButton onClick={onClickRightButton} />
              <StImageWrapper ref={slideRef}>
                {images.length !== 0 ? (
                  images.map((url, id) => (
                    // @ts-ignore
                    <ProductImg src={url.imageLink} key={id} />
                  ))
                ) : (
                  <ProductImg src='/public/assets/img/사진이 없어요.jfif' />
                )}
              </StImageWrapper>
            </StWrapper>
          </InfoContent>

          <InfoContent className='info'>
            <div
              className='seller-info'
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {/* 판매자 사진과 닉네임 */}
              <SellerInfo>
                {auctionItem.profile ? (
                  <img
                    style={{ width: '30px', borderRadius: '70%' }}
                    src={auctionItem.profile}
                    alt='판매자 프로필 사진'
                  />
                ) : (
                  <img
                    style={{ width: '30px', borderRadius: '70%' }}
                    src={
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    alt='판매자 프로필 사진 없음'
                  />
                )}
                <div> {auctionItem.userNickName} </div>
              </SellerInfo>
              {/* 판매자 지역 */}
              <SellerInfo>
                <img src='/assets/img/location.png' alt='위치 아이콘' />
                <div>{formatRegion(auctionItem.region)}</div>
              </SellerInfo>
            </div>

            {/* 상품명 */}
            <ProductName> {auctionItem.name} </ProductName>

            {/* 상품 설명 */}
            <ProductExplain>{auctionItem.comment}</ProductExplain>
          </InfoContent>

          <InfoContent className='price-info'>
            {/* 시작가 */}
            <PriceInfo>
              <PriceInfoTitle>시작가</PriceInfoTitle>
              <PriceInfoContent>{auctionItem.downPrice}</PriceInfoContent>
            </PriceInfo>
            {/* 정가 */}
            <PriceInfo>
              <PriceInfoTitle>정가</PriceInfoTitle>
              <PriceInfoContent>{auctionItem.originPrice}</PriceInfoContent>
            </PriceInfo>
            {/* 현재가 */}
            <PriceInfo className='current-price'>
              <PriceInfoTitle className='current-price'>현재가</PriceInfoTitle>
              <PriceInfoContent style={{ fontWeight: '700' }}>
                {auctionItem.finallyPrice}
              </PriceInfoContent>
            </PriceInfo>
          </InfoContent>

          <InfoContent
            className='info'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {/* 남은 시간 */}
            <CountTime>
              <div>남은 시간</div>
              <div className='time'>
                <span id='d-day-hour'>{ddayHour}</span>
                <span className='col'>:</span>
                <span id='d-day-min'>{ddayMin}</span>
                <span className='col'>:</span>
                <span id='d-day-sec'>{ddaySec}</span>
              </div>
            </CountTime>
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* 입찰가격 선택 */}
              <SelectPrice>
                <select
                  style={{ height: '40px' }}
                  id='priceSelect'
                  onChange={handlePriceChange}
                  value={selectedPrice}
                >
                  {priceOptions.map((price, index) => (
                    <option key={index} value={price}>
                      {price} 원
                    </option>
                  ))}
                </select>
              </SelectPrice>
              {/* 입찰 버튼 */}
              <BidButton
                style={{ backgroundColor: 'black', color: 'white' }}
                onClick={auctionBid}
              >
                입찰
              </BidButton>
            </div>
          </InfoContent>
        </InfoContentBox>
      </ProductInfo>
      {/* 입찰 현황 */}
      <BidInfo>
        <InfoTitle>입찰 현황</InfoTitle>
        <InfoContentBox>
          {bidList.map((bid, idx) => (
            <EachBid key={idx}>
              {bid.userProfileImageLink ? (
                <BidderProfileImg
                  src={bid.userProfileImageLink}
                  alt='입찰자 프로필 사진'
                />
              ) : (
                <BidderProfileImg
                  className='none-image'
                  src={
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  }
                  alt='입찰자 프로필 사진 없음'
                />
              )}
              {/* 입찰자 닉네임 */}
              <BidderNickname>{bid.userNickname}</BidderNickname>
              {/* 입찰 금액 */}
              <BidPrice>{bid.auctionBidPrice}</BidPrice>
              {/* 최고가 여부 */}
              {idx === 0 ? (
                <HighPriceIcon>
                  <div style={{ color: '#4786FA' }}>최고가</div>
                </HighPriceIcon>
              ) : (
                <HighPriceIcon style={{ visibility: 'hidden' }}>
                  <div style={{ color: '#4786FA' }}>최고가</div>
                </HighPriceIcon>
              )}
            </EachBid>
          ))}
        </InfoContentBox>
      </BidInfo>
    </DetailDiv>
  );
};
export { AuctionDetail };
