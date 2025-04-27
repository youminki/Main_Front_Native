// src/pages/LockerRoom/MyCloset/MyCloset.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import ItemList, { UIItem } from '../../../components/Home/ItemList';
import { getMyCloset } from '../../../api/closet/closetApi';

const visitLabel = '담긴 제품들';
const salesLabel = '시즌';
const visits = '999';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyCloset: React.FC = () => {
  const [items, setItems] = useState<UIItem[]>([]);

  useEffect(() => {
    getMyCloset()
      .then((res) => {
        const uiItems: UIItem[] = res.items.map((it) => {
          const pid = (it as any).productId ?? (it as any).id;
          return {
            id: String(pid),
            image: it.mainImage,
            brand: it.brand,
            description: it.name,
            price: (it as any).price ?? 0,
            discount: (it as any).discount ?? 0,
            isLiked: true,
          };
        });
        setItems(uiItems);
      })
      .catch(console.error);
  }, []);

  const handleDelete = (id: string) => {
    // ItemCard의 삭제 직후 호출되어, 즉시 화면에서 제거
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <Container>
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
        {/* onDelete를 넘기면, 하트 → 확인 → 바로 List 갱신 */}
        <ItemList items={items} onDelete={handleDelete} />
      </Content>
    </Container>
  );
};

export default MyCloset;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #fff;
`;
const Header = styled.div`
  width: 100%;
  margin-bottom: 6px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
`;
const Subtitle = styled.p`
  font-size: 12px;
  color: #666;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 30px 0;
`;
const Content = styled.div`
  width: 100%;
`;
