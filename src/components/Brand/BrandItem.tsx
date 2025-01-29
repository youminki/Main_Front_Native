import React from 'react';
import styled from 'styled-components';

interface Brand {
  name: string;
  category: string;
  company: string;
}

const BrandItem: React.FC<{ brand: Brand }> = ({ brand }) => {
  return (
    <Container>
      <BrandDetails>
        <BrandName>{brand.name}</BrandName>
        <BrandCompany>{brand.company}</BrandCompany>
      </BrandDetails>
      <BrandCategoryWrapper>
        <BrandCategory>{brand.category}</BrandCategory>
      </BrandCategoryWrapper>
    </Container>
  );
};

export default BrandItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border: 1px solid #ddd;
`;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.span`
  font-weight: 900;
  font-size: 14px;
  color: #000;
  margin-bottom: 4px;
`;

const BrandCompany = styled.span`
  font-weight: 400;
  font-size: 8px;
  color: #999;
`;

const BrandCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 1;
`;

const BrandCategory = styled.span`
  font-weight: 400;
  font-size: 10px;
  color: #999;
`;
