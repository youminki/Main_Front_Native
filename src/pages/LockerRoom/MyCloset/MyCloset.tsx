import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import ItemList from '../../../components/LockerRoom/Mycloset/ItemList';
import { getMyCloset, removeFromCloset } from '../../../api/closet/closetApi';

const visitLabel = '담긴 제품들';
const salesLabel = '시즌';
const visits = '999';
const sales = '2025 1분기';
const dateRange = 'SPRING';

type ClosetUIItem = {
  id: string;
  image: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  discount: number;
};

const MyCloset: React.FC = () => {
  const [selectedCategory] = useState<'all' | string>('all');
  const [items, setItems] = useState<ClosetUIItem[]>([]);

  // 마운트 시 찜 목록 조회
  useEffect(() => {
    getMyCloset()
      .then((res) => {
        const uiItems = res.items.map((it) => {
          // productId 혹은 id 중 실제 있는 키를 골라서 string으로 변환
          const pid = (it as any).productId ?? (it as any).id;
          return {
            id: pid != null ? pid.toString() : '',
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
      .catch((err) => {
        console.error('찜 목록 조회 실패:', err);
      });
  }, []);

  // 삭제 핸들러
  const handleDelete = async (id: string) => {
    try {
      await removeFromCloset(Number(id));
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('찜 삭제 실패:', err);
    }
  };

  // 필터링
  const filtered =
    selectedCategory === 'all'
      ? items
      : items.filter((i) => i.category === selectedCategory);

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
        <ItemList items={filtered} onDelete={handleDelete} />
      </Content>
    </Container>
  );
};

export default MyCloset;

// 스타일
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
