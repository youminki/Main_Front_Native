import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { ProductListItem } from '../../api/upload/productApi';

type ItemListProps = {
  items: ProductListItem[];
  onItemClick?: (id: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onItemClick }) => (
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
          onOpenModal={onItemClick}
        />
      ))}
    </ItemsWrapper>
  </ListContainer>
);

export default ItemList;

// Styled Components
const ListContainer = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const ItemsWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
