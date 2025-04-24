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
  max-width: 1000px;
  margin-bottom: 16px;
  flex-wrap: wrap; /* 화면 크기 좁을 때 항목들이 겹치지 않도록 처리 */
`;

const PictureWrapper = styled.div`
  flex: 1;
  max-width: 50%; /* 이미지의 최대 크기 설정 */
  overflow: hidden;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto; /* 비율을 유지하며 높이 자동 조정 */
  object-fit: contain;
  image-rendering: crisp-edges;
`;

const LabelList = styled.ul`
  flex: 1;
  max-width: 50%;
  height: ${IMAGE_HEIGHT};
  list-style: none;
  margin: 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px; /* 기본 갭을 크게 설정 */

  /* 데스크탑 환경에서는 폰트 크기 및 갭을 더 크게 설정 */
  @media (min-width: 1024px) {
    gap: 30px; /* 갭을 더 크게 설정 */
  }
`;

const LabelItem = styled.li`
  font-size: 14px; /* 기본 폰트 크기 확대 */
  font-weight: 500;
  color: #333; /* 색상 대비를 높여 가독성 향상 */
  background-color: #f4f4f4; /* 라벨 배경색을 연한 그레이로 설정 */
  padding: 6px 10px; /* 패딩을 추가하여 여백 확보 */
  border-radius: 4px; /* 라벨에 둥근 모서리 추가 */
  width: 100%; /* 라벨이 길어져도 모두 보이도록 넓게 설정 */

  /* 데스크탑 환경에서는 폰트 크기와 패딩을 더 크게 설정 */
  @media (min-width: 1024px) {
    font-size: 16px; /* 폰트 크기 확대 */
    padding: 10px 14px; /* 패딩을 더 넓게 설정 */
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
