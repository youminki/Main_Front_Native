import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import personalLinkShareIcon from '../assets/personalLink/personalLinkShareIcon.svg';
import personalLinkProfileIcon from '../assets/personalLink/personalLinkProfileIcon.svg';
import personalLinkAlramIcon from '../assets/personalLink/personalLinkAlramIcon.svg';

import ItemList, { UIItem } from '../components/Home/ItemList';

const dummyItems = [
  {
    id: 1,
    image: '이미지경로1.jpg',
    brand: 'SANDRO',
    description: 'SF23SRD07869 / 원피스',
    category: 'onepiece',
    price: 489000,
    discount: 10,
  },
  {
    id: 2,
    image: '이미지경로2.jpg',
    brand: 'SANDRO',
    description: 'SF23SRD05961 / 원피스',
    category: 'onepiece',
    price: 589000,
    discount: 10,
  },
  {
    id: 3,
    image: '이미지경로3.jpg',
    brand: 'MICHAA',
    description: 'MP-Xxxxxx / 원피스',
    category: 'onepiece',
    price: 959000,
    discount: 10,
  },
  {
    id: 4,
    image: '이미지경로4.jpg',
    brand: 'MOX.SPIN',
    description: '1244HSS009 / 원피스',
    category: 'onepiece',
    price: 1259000,
    discount: 10,
  },
];

const PersonalLink: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personalLink' | 'productIntro'>(
    'personalLink'
  );

  useEffect(() => {
    document.body.classList.add('PersonalLink');
    return () => {
      document.body.classList.remove('PersonalLink');
    };
  }, []);

  const uiDummyItems: UIItem[] = dummyItems.map(
    ({ id, image, brand, description, price, discount }) => ({
      id: id.toString(),
      image,
      brand,
      description,
      price,
      discount,
      isLiked: false,
    })
  );

  return (
    <Container>
      <TopSection>
        <TopInner>
          <IconButton>
            <img src={personalLinkShareIcon} alt='share' />
          </IconButton>

          <CenterColumn>
            <UserImageWrapper>
              <img src={personalLinkProfileIcon} alt='user profile' />
            </UserImageWrapper>
            <UserName>bominism71</UserName>
          </CenterColumn>

          <IconButton>
            <img src={personalLinkAlramIcon} alt='alarm' />
          </IconButton>
        </TopInner>
      </TopSection>

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
          <IntroText>👉 직접 입어보고 맘에 드는 것만 소개해드려요 👈</IntroText>

          <ItemList items={uiDummyItems} />
        </ProductListWrapper>
      )}

      <Footer>© 2024 ME1PIK.</Footer>
    </Container>
  );
};

export default PersonalLink;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const TopSection = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background: #f6ae24;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopInner = styled.div`
  margin-top: 10px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    background: #d9d9d9;
  }
`;

/* 사용자 이름 */
const UserName = styled.div`
  margin-top: 8px;
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

/* 탭 아이템 */
const TabItem = styled.div<{ active: boolean }>`
  width: 50%;
  height: 50px;
  border: 2px solid transparent;
  background: ${({ active }) => (active ? '#ffffff' : '#eeeeee')};
  color: ${({ active }) => (active ? '#000' : '#999')};
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
    border-radius: 0 10px 10px 0;
  }

  ${({ active }) =>
    active &&
    `
    border-color: #f6ae24;
  `}
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
`;

/* 링크 라벨박스 */
const LinkLabelBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  background: #000000;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  border-radius: 5px 20px 20px 5px;
  margin-bottom: 20px;
`;

/* 링크 텍스트 래퍼 */
const LinkTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

/* 링크 제목 */
const LinkTitle = styled.div`
  font-weight: 800;
  font-size: 14px;
  color: #000000;
  margin-bottom: 5px;
`;

/* 링크 설명 */
const LinkDesc = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  text-decoration: underline;
`;

/* 오른쪽 화살표 */
const LinkArrow = styled.div`
  position: absolute;
  right: 16px;
  font-size: 25px;
  color: #aaaaaa;
  &::before {
    content: '>';
  }
`;

const ProductListWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const IntroText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #000;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  width: 100%;
  height: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #f6ae24;
  margin-top: 50px;
`;
