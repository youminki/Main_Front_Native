// src/components/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notice from '../../components/Home/Notice';
import ItemList from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import FilterContainer from '../../components/Home/FilterContainer';
import SubHeader from '../../components/Home/SubHeader';

const items = [
  {
    id: 1,
    image: '',
    brand: 'SANDRO',
    description: 'SNS21N9 / 원피스',
    category: 'onepiece',
    price: 460000,
    discount: 10,
  },
  {
    id: 2,
    image: '',
    brand: 'ZOOC',
    description: 'ZSC14B1 / 블라우스',
    category: 'blouse',
    price: 380000,
    discount: 15,
  },
  {
    id: 3,
    image: '',
    brand: 'MICHA',
    description: 'MCH88T7 / 투피스',
    category: 'twopiece',
    price: 540000,
    discount: 20,
  },
  {
    id: 4,
    image: '',
    brand: 'MICHA',
    description: 'MCH88T7 / 투피스',
    category: 'twopiece',
    price: 540000,
    discount: 20,
  },
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [seasonToggle, setSeasonToggle] = useState<boolean>(false);
  const [barPosition, setBarPosition] = useState<number>(0);

  useEffect(() => {
    const selectedElement = document.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;

    if (selectedElement) {
      const { offsetLeft, offsetWidth } = selectedElement;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <Notice />
        <SubHeaderContainer>
          <SubHeader
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            barPosition={barPosition}
          />
        </SubHeaderContainer>
        <FilterContainer
          seasonToggle={seasonToggle}
          setSeasonToggle={setSeasonToggle}
        />
        <Content>
          <ItemList items={filteredItems} />
        </Content>
      </ContentWrapper>
      <Footer />
      <ScrollToTopButton onClick={scrollToTop}>
        <ArrowIcon xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path d='M12 4l-8 8h6v8h4v-8h6z' />
        </ArrowIcon>
      </ScrollToTopButton>
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const SubHeaderContainer = styled.div`
  margin: 20px 0;
`;

// 개선된 스크롤 최상단 이동 버튼
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  /* 배경에 투명도를 적용한 그라데이션 */
  background: linear-gradient(
    135deg,
    rgba(255, 204, 0, 0.9),
    rgba(255, 153, 0, 0.9)
  );
  color: #ffffff;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.3s ease;
  opacity: 0.9;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }

  /* 화면 최대 너비 600px 내로 위치 조정 */
  @media (min-width: 600px) {
    right: calc((100vw - 600px) / 2 + 20px);
  }
`;

// SVG 아이콘 스타일
const ArrowIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #ffffff;
`;
