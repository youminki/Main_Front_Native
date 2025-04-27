// src/pages/LockerRoom/MyCloset/MyCloset.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StatsSection from '../../../components/StatsSection';
import ItemList, { UIItem } from '../../../components/Home/ItemList';
import HomeDetail from '../../Home/HomeDetail';
import { getMyCloset } from '../../../api/closet/closetApi';

const visitLabel = '담긴 제품들';
const salesLabel = '시즌';
const visits = '999';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyCloset: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<UIItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  // 찜 해제 시 즉시 목록에서 제거
  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // 아이템 클릭 시 모달 열기
  const handleOpenDetail = (id: string) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
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
        <ItemList
          items={items}
          onDelete={handleDelete}
          onItemClick={handleOpenDetail}
        />
      </Content>

      {isModalOpen && selectedItemId && (
        <ModalOverlay onClick={handleCloseDetail}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseDetail}>×</CloseButton>
            <HomeDetail id={selectedItemId} />
          </ModalContent>
        </ModalOverlay>
      )}
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

// modal styles
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  padding: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
`;
