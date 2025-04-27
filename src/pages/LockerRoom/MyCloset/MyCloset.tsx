// src/pages/LockerRoom/MyCloset/MyCloset.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import StatsSection from '../../../components/StatsSection';
import ItemList, { UIItem } from '../../../components/Home/ItemList';
import HomeDetail from '../../Home/HomeDetail';
import { getMyCloset } from '../../../api/closet/closetApi';
import CancleIconIcon from '../../../assets/Header/CancleIcon.svg';

const visitLabel = '담긴 제품들';
const salesLabel = '시즌';
const visits = '999';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyCloset: React.FC = () => {
  const [items, setItems] = useState<UIItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 배경 페이지 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

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
        <ModalOverlay>
          <ModalBox>
            <ModalHeaderWrapper>
              <ModalHeaderContainer>
                <LeftSection>
                  <CancelIcon
                    src={CancleIconIcon}
                    alt='닫기'
                    onClick={handleCloseDetail}
                  />
                </LeftSection>
                <CenterSection />
                <RightSection />
              </ModalHeaderContainer>
            </ModalHeaderWrapper>
            <ModalBody>
              <HomeDetail id={selectedItemId} />
            </ModalBody>
          </ModalBox>
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

/* Modal */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  position: relative;
  overflow-y: auto;

  /* 스크롤바 숨김 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalHeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  z-index: 3100;
`;

const ModalHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 1rem;
`;

const ModalBody = styled.div`
  padding-top: 60px; /* 헤더 높이 만큼 여백 */
  padding: 1rem;
`;

const LeftSection = styled.div`
  cursor: pointer;
`;

const CenterSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  width: 24px;
`;

const CancelIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
