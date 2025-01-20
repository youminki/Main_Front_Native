import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Theme from "../../styles/Theme";
import ImgAdd from "../../assets/Store/ImgAdd.svg";

type ItemCardProps = {
  id: string;
  image: string;
  brand: string;
  description: string;
};

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageWrapper>
        <Image src={image} alt={brand} />
        <AddButton src={ImgAdd} alt="Add" />
      </ImageWrapper>
      <Brand>{brand}</Brand>
      <Description>{description}</Description>
    </CardContainer>
  );
};

export default ItemCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  cursor: pointer;
  margin: 6px;
  &:first-child {
    margin-left: 0;
  }
`;

const Brand = styled.h3`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 5px;
  font-size: 12px;
  ${Theme.fonts.default3};
  color: ${Theme.colors.gray2};
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  width: 140px;
  height: 210px;
`;

const AddButton = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 46px;
  cursor: pointer;
  z-index: 999;
`;
