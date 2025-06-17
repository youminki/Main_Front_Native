// src/components/Brand/BrandItem.tsx

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Brand 인터페이스 정의
export interface Brand {
  name: string;
  category: string; // API의 brand_category
  group: string; // API의 groupName
  // company 등 추가 필드가 필요하면 여기에 선언
}

interface BrandItemProps {
  brand: Brand;
}

const BrandItem: React.FC<BrandItemProps> = ({ brand }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/brand/${encodeURIComponent(brand.name)}`);
  };

  return (
    <Container onClick={handleClick}>
      <BrandDetails>
        <BrandName>{brand.name}</BrandName>
        {brand.group && <GroupName>{brand.group}</GroupName>}
      </BrandDetails>
      {brand.category ? (
        <BrandCategoryWrapper>
          <BrandCategory>{brand.category}</BrandCategory>
        </BrandCategoryWrapper>
      ) : null}
    </Container>
  );
};

export default BrandItem;

// styled-components

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }
`;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

// 브랜드 이름
const BrandName = styled.span`
  font-weight: 900;
  font-size: 15px;
  color: #000;
  margin-bottom: 4px;
`;

// 이름 아래 groupName
const GroupName = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #666;
`;

// 오른쪽 끝에 배치: margin-left:auto
const BrandCategoryWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const BrandCategory = styled.span`
  font-weight: 400;
  font-size: 13px;
  color: #999;
  white-space: nowrap;
`;
