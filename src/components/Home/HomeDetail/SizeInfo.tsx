import React, { useState } from 'react';
import styled from 'styled-components';

export interface SizeInfoProps {
  productSizes: { size: string; measurements: Record<string, any> }[];
  size_picture: string;
}

const SIZE_PLACEHOLDER = '/images/size-placeholder.png';

// 44->S, 55->M, 66->L, 77->XL 매핑
const SIZE_LABELS: Record<string, string> = {
  '44': 'S',
  '55': 'M',
  '66': 'L',
  '77': 'XL',
};

const SizeInfo: React.FC<SizeInfoProps> = ({ productSizes, size_picture }) => {
  const [imgSrc, setImgSrc] = useState(size_picture);
  const handleImageError = () => setImgSrc(SIZE_PLACEHOLDER);

  if (!productSizes?.length) {
    return <Message>사이즈 정보가 없습니다.</Message>;
  }

  const measurementKeys = Object.keys(productSizes[0].measurements || {});
  const sortedKeys = measurementKeys.sort((a, b) => a.localeCompare(b));
  const alphaLabels = sortedKeys.map((_, idx) => String.fromCharCode(65 + idx));

  // 사이즈 라벨 매핑 함수
  const formatSize = (raw: string) => {
    if (/free/i.test(raw)) return 'Free';
    const num = raw.replace(/\D/g, '');
    const label = SIZE_LABELS[num];
    return label ? `${num}(${label})` : num;
  };

  return (
    <Container>
      <Title>사이즈 정보</Title>

      <InfoWrapper>
        <PictureWrapper>
          <StyledImg
            src={imgSrc}
            srcSet={`${imgSrc} 1x, ${imgSrc} 2x`}
            alt='사이즈 안내 이미지'
            onError={handleImageError}
          />
        </PictureWrapper>

        <LabelList>
          {sortedKeys.map((key) => (
            <LabelItem key={key}>{key}</LabelItem>
          ))}
        </LabelList>
      </InfoWrapper>

      <TableWrapper>
        <Table>
          <thead>
            <Row>
              <Header>사이즈</Header>
              {alphaLabels.map((label) => (
                <Header key={label}>{label}</Header>
              ))}
            </Row>
          </thead>
          <tbody>
            {productSizes.map(({ size, measurements }) => (
              <Row key={size}>
                <Cell>{formatSize(size)}</Cell>
                {sortedKeys.map((key) => {
                  const raw = measurements[key];
                  const displayVal =
                    typeof raw === 'number' ? Math.round(raw) : (raw ?? '-');
                  return <Cell key={key}>{displayVal}</Cell>;
                })}
              </Row>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default SizeInfo;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 12px;
  text-align: center;
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 120px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 16px;
  overflow-x: auto;
`;

const PictureWrapper = styled.div`
  flex: none;
  overflow: hidden;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  min-width: 300px;
  width: 100%;
  height: auto;
  object-fit: contain;
  image-rendering: crisp-edges;
`;

const LabelList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
  width: 100%;
`;

const LabelItem = styled.li`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  padding: 6px 10px;
  border-radius: 4px;

  @media (min-width: 1024px) {
    font-size: 16px;
    padding: 10px 14px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: #f7f7f7;
  }
`;

const Header = styled.th`
  padding: 8px 4px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
`;

const Cell = styled.td`
  padding: 8px 4px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
`;
