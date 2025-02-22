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
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

// SubHeader 위아래에 border 추가
const SubHeaderContainer = styled.div`
  margin: 20px 0;
  border-top: 1px solid #eeeeee;
`;
