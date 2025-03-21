import React from 'react';
import styled from 'styled-components';

const BottomNav: React.FC = () => {
  return (
    <Container>
      <TopText>
        현재 N명의 인플루언서들이
        <br /> melpik을 신청했어요!
      </TopText>

      <StartButton>melpik 시작하기</StartButton>

      <BottomText>사전예약 마감까지 N일 00:00시간 남았어요!</BottomText>
    </Container>
  );
};

export default BottomNav;

/* ====================== Styled Components ====================== */

/**
 * 1) 전체 컨테이너
 *  - 440×250 크기
 *  - 배경색 #F5AB35
 *  - 테두리 윗부분만 둥글게 (20px 20px 0 0)
 */
const Container = styled.div`
  width: 440px;
  height: 250px;
  background: #f5ab35;
  border-radius: 20px 20px 0px 0px;

  /* Flex를 이용해 세로 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/**
 * 2) 상단 텍스트 (17px, 흰색, 투명도 0.9)
 */
const TopText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  opacity: 0.9;

  /* 요소 간 간격을 위해 margin 사용 가능 */
  margin-bottom: 12px;
`;

/**
 * 3) 'melpik 시작하기' 버튼
 *  - 폭 250px, 높이 40px
 *  - 둥근 모양 (border-radius: 100px)
 *  - 흰색 배경, 검정 텍스트
 */
const StartButton = styled.button`
  width: 250px;
  height: 40px;
  background: #ffffff;
  border-radius: 100px;
  border: none;
  cursor: pointer;

  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 17px;
  text-align: center;
  color: #000000;

  /* 위아래 여백 */
  margin: 0 auto 12px auto;
`;

/**
 * 4) 하단 텍스트 (17px, 흰색, 투명도 0.9)
 */
const BottomText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
  opacity: 0.9;
`;
