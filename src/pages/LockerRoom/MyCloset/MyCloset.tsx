import React, { useState } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import ItemList from '../../../components/LockerRoom/Mycloset/ItemList';
// 동적 데이터
const visitLabel = '담긴 제품들';
const salesLabel = '시즌';
const visits = '999';
const sales = '2025 1분기';
const dateRange = 'SPRING';

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

const MyCloset: React.FC = () => {
  const [selectedCategory] = useState<string>('all');

  // barPosition 상태 및 useEffect 삭제

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <MyClosetContainer>
      <Header>
        <Title>내 옷장</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={visits}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />
      <Divider />

      <Content>
        <ItemList items={filteredItems} />
      </Content>
    </MyClosetContainer>
  );
};

export default MyCloset;

const MyClosetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 30px;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 30px;
`;
