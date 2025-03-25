import React from 'react';
import styled, { keyframes } from 'styled-components';

// 실제 경로와 파일명에 맞춰 import 경로를 수정하세요
import backgroundImage from '../../assets/Landing/7X5A9526.jpg';
import IconLeft from '../../assets/Landing/LandingPage6_icon1.svg';
import IconRight from '../../assets/Landing/LandingPage6_icon2.svg';

const LandingPage6: React.FC = () => {
  return (
    <Container>
      {/* 중앙 왼쪽 아이콘 */}
      <IconLeftImg src={IconLeft} alt='왼쪽 아이콘' />
      {/* 중앙 오른쪽 아이콘 */}
      <IconRightImg src={IconRight} alt='오른쪽 아이콘' />

      <TextWrapper>
        <SmallTitle>이제는 일일이 찾지 마세요</SmallTitle>
        <BigTitle>
          브랜드는 멜픽이 <br />
          <PickText>PICK!</PickText> 해줄게요
        </BigTitle>
      </TextWrapper>
    </Container>
  );
};

export default LandingPage6;

/* ====================== Styled Components ====================== */

/* 불규칙적인 깜빡임 + 가벼운 움직임을 주는 키프레임 */
const flickerLeft = keyframes`
  0%   { opacity: 1;   transform: scale(1) rotate(0deg);   }
  5%   { opacity: 0.6; transform: scale(1.02) rotate(-1deg); }
  10%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  25%  { opacity: 0.3; transform: scale(0.95) rotate(2deg); }
  30%  { opacity: 0.9; transform: scale(1) rotate(0deg);   }
  40%  { opacity: 0.5; transform: scale(1.03) rotate(-2deg);}
  50%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  60%  { opacity: 0.7; transform: scale(1.05) rotate(1deg); }
  70%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  85%  { opacity: 0.2; transform: scale(0.98) rotate(-1deg);}
  90%  { opacity: 0.8; transform: scale(1) rotate(0deg);   }
  100% { opacity: 1;   transform: scale(1) rotate(0deg);   }
`;

const flickerRight = keyframes`
  0%   { opacity: 1;   transform: scale(1) rotate(0deg);   }
  10%  { opacity: 0.4; transform: scale(0.98) rotate(1deg); }
  15%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  25%  { opacity: 0.5; transform: scale(1.04) rotate(-2deg);}
  35%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  50%  { opacity: 0.3; transform: scale(0.95) rotate(2deg); }
  55%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  65%  { opacity: 0.6; transform: scale(1.03) rotate(-1deg);}
  75%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  85%  { opacity: 0.4; transform: scale(1.02) rotate(1deg); }
  90%  { opacity: 1;   transform: scale(1) rotate(0deg);   }
  100% { opacity: 1;   transform: scale(1) rotate(0deg);   }
`;

/**
 * 1) 전체 컨테이너
 *  - 400×700 크기
 *  - 배경 이미지를 cover로 깔기
 *  - 모서리를 둥글게 처리
 *  - 텍스트를 상단에 정렬
 */
const Container = styled.div`
  height: 700px;
  margin: 0 auto;

  /* 배경 이미지 설정 */
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;

  border-radius: 20px;
  box-sizing: border-box;

  /* display 기반 레이아웃: 세로 배치 후 상단 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* 텍스트가 너무 위에 붙지 않도록 적당한 padding을 줄 수도 있습니다. */
  padding-top: 59px;

  /* position: relative로 설정해야 내부에서 absolute 배치 가능 */
  position: relative;
`;

/* ---------- 아이콘: 중앙 왼쪽 배치 + 깜박 애니메이션 ---------- */
const IconLeftImg = styled.img`
  position: absolute;
  top: 30%;
  left: 60px;
  transform: translateY(-50%);
  /* 깜빡이는 애니메이션 적용 (5초 주기로 반복, 1초 딜레이) */
  animation: ${flickerLeft} 5s infinite ease-in-out 1s;
`;

/* ---------- 아이콘: 중앙 오른쪽 배치 + 깜박 애니메이션 ---------- */
const IconRightImg = styled.img`
  position: absolute;
  top: 40%;
  right: 55px;
  transform: translateY(-50%);
  /* 깜빡이는 애니메이션 적용 (6초 주기로 반복, 0.5초 딜레이) */
  animation: ${flickerRight} 6s infinite ease-in-out 0.5s;
`;

/** 2) 텍스트 묶음 영역 */
const TextWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

/** 3) 작은 제목 (14px) */
const SmallTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  text-align: center;

  color: #000000;
  margin-bottom: 20px;
`;

/** 4) 큰 제목 (24px) */
const BigTitle = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;

  color: #000000;
  margin: 0; /* 기본 h1 마진 제거 */
`;

/**
 * 5) PICK! 텍스트만 따로 스타일 지정
 *  - 굵기(900)와 색상(#FD8A2F)을 적용
 */
const PickText = styled.span`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
  text-align: center;

  color: #fd8a2f;
`;
