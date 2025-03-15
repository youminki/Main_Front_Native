// ItemList.tsx
import React from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";

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
          />
        ))}
      </ItemsWrapper>
    </ListContainer>
  );
};

export default ItemList;

// 스타일 정의
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
