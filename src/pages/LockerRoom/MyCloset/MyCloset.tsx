// src/pages/LockerRoom/MyCloset/MyCloset.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import ItemList from '../../../components/Home/ItemList';
import { getMyCloset, removeFromCloset } from '../../../api/closet/closetApi';

const visitLabel = '담긴 제품들';
const salesLabel = '시즌';
const visits = '999';
const sales = '2025 1분기';
const dateRange = 'SPRING';

export type ClosetUIItem = {
  id: string;
  image: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  discount: number;
};

const MyCloset: React.FC = () => {
  const [items, setItems] = useState<ClosetUIItem[]>([]);

  useEffect(() => {
    getMyCloset()
      .then((res) => {
        const uiItems = res.items.map((it) => {
          const pid = (it as any).productId ?? (it as any).id;
          return {
            id: String(pid),
            image: it.mainImage,
            brand: it.brand,
            description: it.name,
            category: it.category,
            price: (it as any).price ?? 0,
            discount: (it as any).discount ?? 0,
          };
        });
        setItems(uiItems);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await removeFromCloset(Number(id));
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('찜 삭제 실패:', err);
    }
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
        <ItemList items={items} onDelete={handleDelete} />
      </Content>
    </Container>
  );
};

export default MyCloset;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 1rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;
const Title = styled.h1`
  font-weight: 800;
  font-size: 24px;
  color: #000;
  margin: 0;
`;
const Subtitle = styled.p`
  font-size: 12px;
  color: #ccc;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 30px 0;
`;
const Content = styled.div`
  width: 100%;
  margin-top: 30px;
`;
