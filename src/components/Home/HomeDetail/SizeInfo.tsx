import React, { useState } from 'react';
import styled from 'styled-components';

export interface SizeInfoProps {
  productSizes: { size: string; measurements: Record<string, any> }[];
  size_picture: string;
}

const SIZE_PLACEHOLDER = '/images/size-placeholder.png';
const IMAGE_HEIGHT = '180px';

const SizeInfo: React.FC<SizeInfoProps> = ({ productSizes, size_picture }) => {
  const [imgSrc, setImgSrc] = useState(size_picture);
  const handleImageError = () => setImgSrc(SIZE_PLACEHOLDER);

  if (!productSizes?.length) {
    return <Message>사이즈 정보가 없습니다.</Message>;
  }

  // 측정 키 정렬
  const measurementKeys = Object.keys(productSizes[0].measurements || {});
  const sortedKeys = measurementKeys.sort((a, b) => a.localeCompare(b));

  // 대문자 알파벳 헤더 생성 (A, B, C, …)
  const alphaLabels = sortedKeys.map((_, idx) => String.fromCharCode(65 + idx));

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

        {/* 실제 측정 항목명 전부 표시 */}
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
              {/* 대문자 알파벳 헤더 */}
              {alphaLabels.map((label) => (
                <Header key={label}>{label}</Header>
              ))}
            </Row>
          </thead>
          <tbody>
            {productSizes.map(({ size, measurements }) => {
              // size에서 숫자만 추출 ("SIZE 55" → "55")
              const numericOnly = size.replace(/\D/g, '') || size;

              return (
                <Row key={size}>
                  <Cell>{numericOnly}</Cell>
                  {/* 실제 데이터는 sortedKeys 순서대로 */}
                  {sortedKeys.map((key) => {
                    const raw = measurements[key];
                    const displayVal =
                      typeof raw === 'number' ? Math.round(raw) : (raw ?? '-');
                    return <Cell key={key}>{displayVal}</Cell>;
                  })}
                </Row>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default SizeInfo;

// Styled Components
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 16px;
`;

const PictureWrapper = styled.div`
  flex: 0 0 auto;
  max-width: 50%;
  overflow: hidden;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  height: 300px;
  width: auto;
  object-fit: contain;
  image-rendering: crisp-edges;
`;

const LabelList = styled.ul`
  flex: 0 0 auto;
  max-width: 50%;
  height: ${IMAGE_HEIGHT};
  list-style: none;
  margin: 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  border-radius: 4px;
`;

const LabelItem = styled.li`
  font-size: 12px;
  font-weight: 500;
  color: #000;
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
