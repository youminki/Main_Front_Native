import React from "react";
import styled from "styled-components";
import Theme from "../../../styles/Theme";

type ProductOptionsProps = {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <OptionsContainer>
      <label>제품옵션 (선택)</label>
      <OptionsWrapper>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">사이즈 선택</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">색상 선택</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
        </select>
      </OptionsWrapper>
    </OptionsContainer>
  );
};

export default ProductOptions;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  label {
    font-family: "NanumSquare Neo OTF";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 11px;
    /* identical to box height */

    color: #000000;
    margin-bottom: 10px;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  select {
    flex: 1;
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
    height: 57px;

    border-radius: 4px;
    border: 1px solid ${Theme.colors.black};
    background-color: ${Theme.colors.white};
    font-size: 14px;
    color: ${Theme.colors.black};
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
