// src/components/Home/HomeDetail/ProductInfo.tsx
import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import AddTekImage from '../../../assets/ClosetIcon.svg';

export interface ProductInfoProps {
  item: {
    brand: string; // 예: "산드로 (SANDRO)"
    product_num: string; // 예: "SNS21N9"
    name: string; // 예: "원피스"
    originalPrice: number;
    discountPercent: number;
    discountPrice: number;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ item }) => {
  return (
    <InfoContainer>
      {/* 상단에 "브랜드 > 산드로 (SANDRO)" 형태로 출력 */}
      <CategoryText>
        브랜드 <span className='gt'>&gt;</span> {item.brand}
      </CategoryText>

      {/* 제품 번호와 이름을 합쳐 "SNS21N9 / 원피스"로 출력 */}
      <ProductTitle>
        {item.product_num} / {item.name}
      </ProductTitle>

      <ContentContainer>
        <PriceContainer>
          <OriginalPrice>{item.originalPrice.toLocaleString()}</OriginalPrice>
          <DiscountRow>
            <DiscountPercent>{item.discountPercent}%</DiscountPercent>
            <DiscountPrice>{item.discountPrice.toLocaleString()}</DiscountPrice>
          </DiscountRow>
        </PriceContainer>
        <TekImageContainer>
          <TekImage src={AddTekImage} alt='Tek 추가 이미지' />
        </TekImageContainer>
      </ContentContainer>
    </InfoContainer>
  );
};

export default ProductInfo;

const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const CategoryText = styled.p`
  font-weight: 400;
  font-size: 11px;
  line-height: 11px;
  color: #000;

  & > span.gt {
    color: #dddddd;
    padding: 0 4px;
  }
`;

const ProductTitle = styled.h2`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #000;
  margin: 8px 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 16px 0;
`;

const OriginalPrice = styled.span`
  font-weight: 700;
  font-size: 13px;
  text-decoration: line-through;
  color: #999;
`;

const DiscountRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 10px;
`;

const DiscountPercent = styled.span`
  color: ${Theme.colors.yellow};
  margin-right: 10px;
  font-weight: 900;
  font-size: 16px;
`;

const DiscountPrice = styled.span`
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
`;

const TekImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TekImage = styled.img`
  width: 80px;
  height: 80px;
`;
