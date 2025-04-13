// src/components/Home/HomeDetail/SizeInfo.tsx
import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export interface SizeInfoProps {
  productSizes: { size: string; measurements: Record<string, any> }[];
  size_picture: string; // API에서 전달받은 사이즈 안내 이미지 URL
}

const SizeInfo: React.FC<SizeInfoProps> = ({ productSizes, size_picture }) => {
  if (!productSizes || productSizes.length === 0) {
    return <div>사이즈 정보가 없습니다.</div>;
  }

  // 첫번째 제품의 측정 항목을 헤더로 활용 (키 목록)
  const measurementKeys = Object.keys(productSizes[0].measurements || {});

  return (
    <SizeInfoContainer>
      <Label>사이즈 정보</Label>
      {size_picture && (
        <SizePicture src={size_picture} alt='사이즈 안내 이미지' />
      )}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>사이즈</TableHeader>
            {measurementKeys.map((key) => (
              <TableHeader key={key}>{key}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {productSizes.map((item) => (
            <TableRow key={item.size}>
              <TableCell>{item.size}</TableCell>
              {measurementKeys.map((key) => (
                <TableCell key={key}>{item.measurements[key] ?? '-'}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </SizeInfoContainer>
  );
};

export default SizeInfo;

const SizeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: ${Theme.colors.black};
  margin-bottom: 10px;
`;

const SizePicture = styled.img`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border: 1px solid ${Theme.colors.gray1};
`;

const TableHeader = styled.th`
  font-weight: 900;
  font-size: 12px;
  background-color: ${Theme.colors.gray1};
  padding: 10px;
  text-align: center;
`;

const TableCell = styled.td`
  font-weight: 700;
  font-size: 12px;
  padding: 8px;
  text-align: center;
  border: 1px solid ${Theme.colors.gray1};
`;
