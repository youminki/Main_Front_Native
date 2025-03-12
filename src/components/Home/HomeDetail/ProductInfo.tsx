import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import AddTekImage from '../../../assets/ClosetIcon.svg';

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
        브랜드 <span className='gt'>&gt;</span>{' '}
        <BrandText>{item.brand}</BrandText>
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
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;

  color: #000000;

  & > span {
    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 11px;
    color: #000000;
  }

  & > span.gt {
    color: #dddddd;
    padding: 0 4px;
  }
`;

const BrandText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  /* identical to box height */

  color: #000000;
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
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 13px;
  text-decoration-line: line-through;

  color: #999999;
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
