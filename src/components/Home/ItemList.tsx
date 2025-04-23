import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { ProductListItem } from '../../api/upload/productApi';

type ItemListProps = {
  items: ProductListItem[];

  onItemClick?: (id: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onItemClick }) => {
  return (
    <ListContainer>
      <ItemsWrapper>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id.toString()}
            image={item.image}
            brand={item.brand}
            description={item.description}
            price={item.price}
            discount={item.discount}
            onOpenModal={onItemClick ?? (() => {})}
          />
        ))}
      </ItemsWrapper>
    </ListContainer>
  );
};

export default ItemList;

// src/components/Home/ItemList.tsx

// …(위 코드 그대로)

const ListContainer = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1440px; /* 전체 최대 폭 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 0 1rem; /* 좌우 여백 */
  box-sizing: border-box;
`;

const ItemsWrapper = styled.div`
  display: grid;
  gap: 16px;

  /* 모바일 기본 2열 */
  grid-template-columns: repeat(2, minmax(0, 1fr));

  /* 태블릿: 3열 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  /* 데스크탑: 4열 */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  /* 대형 화면: 5열 */
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;
