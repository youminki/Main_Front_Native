import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import AddTekImage from '../../../assets/Home/HomeDetail/AddTek.svg';

type ProductInfoProps = {
  item: {
    brand: string;
    description: string;
    originalPrice: number;
    discountPercent: number;
    discountPrice: number;
  };
};

const ProductInfo: React.FC<ProductInfoProps> = ({ item }) => {
  return (
    <InfoContainer>
      <CategoryText>
        패션 &gt; 브랜드 &gt; <BrandText>{item.brand}</BrandText>
      </CategoryText>

      <ContentContainer>
        <TextGroup>
          <DescriptionText>{item.description}</DescriptionText>
          <PriceContainer>
            <OriginalPrice>
              {item.originalPrice.toLocaleString()}원
            </OriginalPrice>
            <DiscountRow>
              <DiscountPercent>{item.discountPercent}%</DiscountPercent>
              <DiscountPrice>
                {item.discountPrice.toLocaleString()}원
              </DiscountPrice>
            </DiscountRow>
          </PriceContainer>
        </TextGroup>
        <TekImageContainer>
          <TekImage src={AddTekImage} alt="Tek 추가 이미지" />
        </TekImageContainer>
      </ContentContainer>
    </InfoContainer>
  );
};

export default ProductInfo;

const InfoContainer = styled.div`
  width: 100%;
`;

const CategoryText = styled.p`
  color: ${Theme.colors.black};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  margin-top: 20px;

  span {
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 11px;
  }
`;

const BrandText = styled.span`
  color: ${Theme.colors.black};
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TekImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TekImage = styled.img`
  width: 80px;
  height: 80px;
`;

const DescriptionText = styled.p`
  margin: 8px 0;
  color: ${Theme.colors.black};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 20px;
`;

const OriginalPrice = styled.span`
  color: ${Theme.colors.gray2};
  text-decoration: line-through;
  margin-right: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
`;

const DiscountRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 10px;
`;

const DiscountPercent = styled.span`
  color: ${Theme.colors.yellow};
  margin-right: 10px;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
`;

const DiscountPrice = styled.span`
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 20px;
`;
