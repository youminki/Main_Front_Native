import React, { useState } from 'react';
import styled from 'styled-components';

/** 실제 사용 시 경로를 맞춰 import 해주세요. */
import personalLinkShareIcon from '../assets/personalLink/personalLinkShareIcon.svg';
import personalLinkProfileIcon from '../assets/personalLink/personalLinkProfileIcon.svg';
import personalLinkAlramIcon from '../assets/personalLink/personalLinkAlramIcon.svg';

/** ItemList 컴포넌트 임포트 */
import ItemList from '../components/Home/ItemList';

// 예시 아이템 데이터 (실제 서버나 API 연동 시 삭제/교체)
const dummyItems = [
  {
    id: 1,
    image: '이미지경로1.jpg',
    brand: 'SANDRO',
    description: 'SF23SRD07869 / 원피스',
    price: 489000,
    discount: 10,
  },
  {
    id: 2,
    image: '이미지경로2.jpg',
    brand: 'SANDRO',
    description: 'SF23SRD05961 / 원피스',
    price: 589000,
    discount: 10,
  },
  {
    id: 3,
    image: '이미지경로3.jpg',
    brand: 'MICHAA',
    description: 'MP-Xxxxxx / 원피스',
    price: 959000,
    discount: 10,
  },
  {
    id: 4,
    image: '이미지경로4.jpg',
    brand: 'MOX.SPIN',
    description: '1244HSS009 / 원피스',
    price: 1259000,
    discount: 10,
  },
];

const PersonalLink: React.FC = () => {
  // 탭 상태: 'personalLink' or 'productIntro'
  const [activeTab, setActiveTab] = useState<'personalLink' | 'productIntro'>(
    'personalLink'
  );

  return (
    <Container>
      {/* 상단 영역 (노란색 + 대각선) */}
      <TopSection>
        <TopInner>
          {/* 왼쪽: 공유 아이콘 */}
          <IconButton>
            <img src={personalLinkShareIcon} alt='share' />
          </IconButton>

          {/* 중앙: 프로필 + 이름 (세로 정렬) */}
          <CenterColumn>
            <UserImageWrapper>
              <img src={personalLinkProfileIcon} alt='user profile' />
            </UserImageWrapper>
            <UserName>bominism71</UserName>
          </CenterColumn>

          {/* 오른쪽: 알림 아이콘 */}
          <IconButton>
            <img src={personalLinkAlramIcon} alt='alarm' />
          </IconButton>
        </TopInner>
      </TopSection>

      {/* 탭 영역 */}
      <TabSection>
        <TabItem
          active={activeTab === 'personalLink'}
          onClick={() => setActiveTab('personalLink')}
        >
          개인링크
        </TabItem>
        <TabItem
          active={activeTab === 'productIntro'}
          onClick={() => setActiveTab('productIntro')}
        >
          제품소개
        </TabItem>
      </TabSection>

      {/* 탭에 따라 다른 콘텐츠 렌더링 */}
      {activeTab === 'personalLink' && (
        <LinkListWrapper>
          <LinkItem>
            <LinkLabelBox>LINK 01</LinkLabelBox>
            <LinkTextWrapper>
              <LinkTitle>업무 및 비지니스 제휴 문의</LinkTitle>
              <LinkDesc>form.naver.com/respon..</LinkDesc>
            </LinkTextWrapper>
            <LinkArrow />
          </LinkItem>

          <LinkItem>
            <LinkLabelBox>LINK 02</LinkLabelBox>
            <LinkTextWrapper>
              <LinkTitle>PMC - 대회 홈페이지 안내</LinkTitle>
              <LinkDesc>pmckorea.modoo.at..</LinkDesc>
            </LinkTextWrapper>
            <LinkArrow />
          </LinkItem>

          <LinkItem>
            <LinkLabelBox>LINK 03</LinkLabelBox>
            <LinkTextWrapper>
              <LinkTitle>피엠씨 채널톡 문의하기</LinkTitle>
              <LinkDesc>pf.kakao.com/_XIWYG..</LinkDesc>
            </LinkTextWrapper>
            <LinkArrow />
          </LinkItem>

          <LinkItem>
            <LinkLabelBox>LINK 04</LinkLabelBox>
            <LinkTextWrapper>
              <LinkTitle>업무 및 비지니스 제휴 문의</LinkTitle>
              <LinkDesc>링크연결</LinkDesc>
            </LinkTextWrapper>
            <LinkArrow />
          </LinkItem>
        </LinkListWrapper>
      )}

      {activeTab === 'productIntro' && (
        <ProductListWrapper>
          <IntroText>직접 입어보고 멜픽 드는 것만 소개해드려요</IntroText>
          {/* ItemList 컴포넌트 사용 (2열 그리드) */}
          <ItemList items={dummyItems} />
        </ProductListWrapper>
      )}

      <Footer>© 2024 ME1PIK.</Footer>
    </Container>
  );
};

export default PersonalLink;

/* ----------------------------------------
   Styled Components
---------------------------------------- */

/* 전체 컨테이너 */
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
`;

/* 상단 영역 (노란색 + 대각선) */
const TopSection = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: #f6ae24;

  /* 아래쪽을 대각선으로 잘라내기 */
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* 상단 내부(아이콘 2개 + 중앙 프로필/이름) 가로 배치 */
const TopInner = styled.div`
  margin-top: 10px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* 중앙에 프로필 + 이름 세로 정렬 */
const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 아이콘 버튼 */
const IconButton = styled.button`
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

/* 프로필 이미지 래퍼 */
const UserImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    background: #d9d9d9; /* 이미지가 없을 때 표시용 */
  }
`;

/* 사용자 이름 (프로필 하단에 위치) */
const UserName = styled.div`
  margin-top: 8px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #000000;
  text-align: center;
`;

/* 탭 영역 */
const TabSection = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* 탭 아이템: 항상 border: 2px solid #f6ae24 */
const TabItem = styled.div<{ active: boolean }>`
  width: 50%;
  height: 50px;
  border: 2px solid #f6ae24;
  background: ${({ active }) => (active ? '#ffffff' : '#eeeeee')};
  color: ${({ active }) => (active ? '#000' : '#999')};
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-left: 2px solid #f6ae24;
    border-radius: 0 10px 10px 0;
  }
`;

/* 개인링크 리스트 래퍼 */
const LinkListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

/* 링크 아이템 */
const LinkItem = styled.div`
  position: relative;
  width: 376px;
  height: 80px;
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 16px;
  box-sizing: border-box;

  /* row 정렬: 라벨박스 -> 텍스트 -> 화살표 */
`;

/* 링크 라벨박스 (왼쪽), 오른쪽을 뾰족하게 처리 */
const LinkLabelBox = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 자동 너비를 위해 width: auto */
  width: 40px;
  height: 25px;
  padding: 0 12px; /* 양옆 패딩 */
  background: #000000;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  border-radius: 5px 20px 20px 5px;

  margin-bottom: 20px;
`;

/* 링크 텍스트 래퍼 (제목, 설명) - 라벨박스 오른쪽에 위치 */
const LinkTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px; /* 라벨박스와 텍스트 사이 간격 */
`;

/* 링크 제목 */
const LinkTitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 14px;
  color: #000000;
  margin-bottom: 5px;
`;

/* 링크 설명 */
const LinkDesc = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  text-decoration: underline;
`;

/* 오른쪽 화살표 '>' */
const LinkArrow = styled.div`
  position: absolute;
  right: 16px;
  font-size: 25px;
  color: #aaaaaa;
  &::before {
    content: '>';
  }
`;

/* 제품소개 리스트 */
const ProductListWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

/* 상단 안내문 */
const IntroText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
`;

/* 하단 영역 */
const Footer = styled.div`
  width: 100%;
  height: 20px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #f6ae24;

  margin-top: 50px;
`;
