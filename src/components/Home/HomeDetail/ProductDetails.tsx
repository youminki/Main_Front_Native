import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export interface ProductDetailData {
  [key: string]: string;
}

export interface ProductDetailsProps {
  fabricComposition: Record<'겉감' | '안감' | '배색' | '부속', string>;
  detailsData: ProductDetailData;
}

const CATEGORY_KEYS = ['겉감', '안감', '배색', '부속'] as const;
const SLOT_COUNT = 4;

const ProductDetails: React.FC<ProductDetailsProps> = ({
  fabricComposition,
  detailsData,
}) => {
  return (
    <Container>
      <Section>
        <Title>제품 원단정보</Title>
        <Table>
          <thead>
            <tr>
              <Th>구분</Th>
              {Array.from({ length: SLOT_COUNT }).map((_, i) => (
                <Th key={i}>{i + 1}번</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORY_KEYS.map((key) => {
              const parts = (fabricComposition[key] || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
              return (
                <Tr key={key}>
                  <TdKey>{key}</TdKey>
                  {Array.from({ length: SLOT_COUNT }).map((_, idx) => (
                    <TdSlot key={idx}>{parts[idx] ?? '-'}</TdSlot>
                  ))}
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </Section>

      <Separator />

      <DetailSection>
        <Title>제품상세 제공고시</Title>
        <DetailInfo>
          {Object.entries(detailsData).map(([label, value]) => (
            <InfoRow key={label}>
              <InfoLabel>{label}</InfoLabel>
              <InfoValue>{value}</InfoValue>
            </InfoRow>
          ))}
        </DetailInfo>
      </DetailSection>
    </Container>
  );
};

export default ProductDetails;

/* Styled Components */

const Container = styled.div`
  position: relative;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  background: #f9f9f9;
  padding: 8px;
  font-weight: 700;
  font-size: 12px;
`;

const Tr = styled.tr``;

const TdKey = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  font-weight: 700;
  font-size: 12px;
  background: #fafafa;
  text-align: center;
  width: 80px;
`;

const TdSlot = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 12px;
  text-align: center;
  min-width: 80px;
`;

const Separator = styled.div`
  border-top: 1px solid ${Theme.colors.gray0};
  margin: 24px 0;
`;

const DetailSection = styled.div`
  margin-bottom: 40px;
`;

const DetailInfo = styled.div``;

const InfoRow = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 8px;
`;

const InfoLabel = styled.div`
  width: 80px;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
`;

const InfoValue = styled.div`
  flex: 1;
  font-size: 12px;
  padding-left: 8px;
`;
