// src/components/Home/ItemList.tsx
import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { ProductListItem } from '../../api/upload/productApi';

type ItemListProps = {
  items: ProductListItem[];
  onItemClick: (id: string) => void;
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
            onOpenModal={onItemClick}
          />
        ))}
      </ItemsWrapper>
    </ListContainer>
  );
};

export default ItemList;

const ListContainer = styled.div`
  background-color: #fff;
  overflow: hidden;
`;

const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0 16px;
  justify-items: center;
`;
