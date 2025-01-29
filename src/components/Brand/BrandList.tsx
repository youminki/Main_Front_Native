import React from 'react';
import styled from 'styled-components';
import BrandItem from './BrandItem';

interface Brand {
  name: string;
  category: string;
  company: string;
}

interface BrandListProps {
  groupedBrands: Record<string, Brand[]>;
}

export const BrandList: React.FC<BrandListProps> = ({ groupedBrands }) => {
  return (
    <Container>
      {Object.keys(groupedBrands).map((group) => (
        <GroupSection key={group}>
          <GroupTitle>{group}</GroupTitle>
          {groupedBrands[group].map((brand, index) => (
            <BrandItem key={index} brand={brand} />
          ))}
        </GroupSection>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const GroupSection = styled.section`
  margin-bottom: 0px;
`;

const GroupTitle = styled.h2`
  font-weight: 900;
  font-size: 14px;
  background-color: #555;
  padding: 12px 20px;
  color: white;
  margin: 0px;
`;
