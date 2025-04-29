import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';

export interface UIItem {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  isLiked: boolean;
}

type ItemListProps = {
  items: UIItem[];

  onItemClick?: (id: string) => void;

  onDelete?: (id: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({
  items,
  onItemClick,
  onDelete,
}) => (
  <ListContainer>
    <ItemsWrapper>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          image={item.image}
          brand={item.brand}
          description={item.description}
          price={item.price}
          discount={item.discount}
          isLiked={item.isLiked}
          onOpenModal={onItemClick ?? (() => {})}
          onDelete={onDelete}
        />
      ))}
    </ItemsWrapper>
  </ListContainer>
);

export default ItemList;

const ListContainer = styled.div`
  background-color: #fff;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ItemsWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;
