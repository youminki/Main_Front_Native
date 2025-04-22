import React, { useState } from 'react';
import styled from 'styled-components';

export interface SizeInfoProps {
  productSizes: { size: string; measurements: Record<string, any> }[];
  size_picture: string;
}

const SIZE_PLACEHOLDER = '/images/size-placeholder.png';
const IMAGE_HEIGHT = '180px';

const SizeInfo: React.FC<SizeInfoProps> = ({ productSizes, size_picture }) => {
  if (!productSizes?.length) return <Message>사이즈 정보가 없습니다.</Message>;

  const [imgSrc, setImgSrc] = useState(size_picture);
  const handleImageError = () => setImgSrc(SIZE_PLACEHOLDER);

  return (
    <Container>
      <Title>사이즈 정보</Title>

      <ImageWrapper>
        <StyledImg
          src={imgSrc}
          alt='사이즈 안내 이미지'
          onError={handleImageError}
        />
      </ImageWrapper>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {/* 헤더명은 measurements의 키들로 자동 생성 */}
              {productSizes[0] &&
                Object.keys(productSizes[0].measurements).map((key) => (
                  <Header key={key}>{key}</Header>
                ))}
            </tr>
          </thead>
          <tbody>
            {productSizes.map(({ size, measurements }) => (
              <tr key={size}>
                {Object.values(measurements).map((value, idx) => (
                  <Cell key={idx}>{value ?? '-'}</Cell>
                ))}
              </tr>
            ))}
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
  margin-bottom: 12px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;

  overflow: hidden;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledImg = styled.img`
  width: auto;
  object-fit: contain;
  image-rendering: crisp-edges;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const Header = styled.th`
  padding: 8px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
`;

const Cell = styled.td`
  padding: 8px;
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
