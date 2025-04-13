// src/components/Home/HomeDetail/ProductDetails.tsx
import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export interface ProductDetailData {
  // 예시: 품번, 계절감, 제조사, 상품URL 등
  [key: string]: string;
}

export interface ProductDetailsProps {
  detailsData: ProductDetailData;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ detailsData }) => {
  return (
    <Container>
      <Section>
        <Title>제품원단 정보</Title>
        <MaterialInfo>
          {/* 원단 정보는 고정 혹은 별도 API 연동이 가능 */}
          <MaterialRow>
            <MaterialLabel>겉감</MaterialLabel>
            <MaterialValues>
              <MaterialValue bgColor='#AAAAAA'>폴리에스터 48%</MaterialValue>
              <MaterialValue bgColor='#AAAAAA'>면 38%</MaterialValue>
              <MaterialValue bgColor='#AAAAAA'>마 14%</MaterialValue>
            </MaterialValues>
          </MaterialRow>
          <MaterialRow>
            <MaterialLabel>안감</MaterialLabel>
            <MaterialValues>
              <MaterialValue bgColor='#AAAAAA'>폴리에스터 100%</MaterialValue>
            </MaterialValues>
          </MaterialRow>
          <MaterialRow>
            <MaterialLabel>배색</MaterialLabel>
            <MaterialValues>
              <MaterialValue bgColor='#AAAAAA'>폴리에스터 100%</MaterialValue>
            </MaterialValues>
          </MaterialRow>
          <MaterialRow>
            <MaterialLabel>부속</MaterialLabel>
            <MaterialValues>
              <MaterialValue bgColor='#AAAAAA'>레이온 41%</MaterialValue>
              <MaterialValue bgColor='#AAAAAA'>면 39%</MaterialValue>
              <MaterialValue bgColor='#AAAAAA'>나일론 20%</MaterialValue>
            </MaterialValues>
          </MaterialRow>
        </MaterialInfo>
      </Section>
      <LinContainer />
      <DetailSection>
        <Title>제품상세 제공고시</Title>
        <DetailInfo>
          {Object.entries(detailsData).map(([label, value]) => (
            <InfoRow key={label}>
              <Label>{label}</Label>
              <Value>{value}</Value>
            </InfoRow>
          ))}
        </DetailInfo>
      </DetailSection>
    </Container>
  );
};

export default ProductDetails;

const Container = styled.div`
  position: relative;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const DetailSection = styled.div`
  margin-bottom: 140px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 10px;
`;

const MaterialInfo = styled.div``;

const MaterialRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
  padding: 10px;
`;

const MaterialLabel = styled.div`
  width: 50px;
  font-weight: 800;
  font-size: 13px;
  text-align: center;
  margin-right: 20px;
`;

const MaterialValues = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const MaterialValue = styled.div<{ bgColor: string }>`
  background: ${(props) => props.bgColor || '#AAAAAA'};
  border-radius: 2px;
  padding: 4px;
  font-weight: 700;
  font-size: 12px;
  color: #fff;
`;

const DetailInfo = styled.div`
  background: #fff;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
  padding: 10px;
`;

const Label = styled.div`
  width: 50px;
  font-weight: 800;
  font-size: 13px;
  text-align: center;
  margin-right: 20px;
`;

const Value = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: #000;
`;

const LinContainer = styled.div`
  border: 1px solid ${Theme.colors.gray0};
  margin: 30px 0;
`;
