// ItemList.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';

type Item = {
  id: number;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
};

type ItemListProps = {
  items: Item[];
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const [itemList, setItemList] = useState(items);

  // 삭제 콜백: id에 해당하는 아이템을 제거
  const handleDelete = (id: string) => {
    setItemList(itemList.filter((item) => item.id.toString() !== id));
  };

  return (
    <ListContainer>
      <ItemsWrapper>
        {itemList.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id.toString()}
            image={item.image}
            brand={item.brand}
            description={item.description}
            price={item.price}
            discount={item.discount}
            onDelete={handleDelete}
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
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
`;
