import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBrandList, Brand as ApiBrand } from '../../api/brand/brandApi';

interface Props {
  BrandIcon: string;
  brandCount?: number;
  productCount?: number;
}

const StatsSection: React.FC<Props> = ({
  BrandIcon,
  brandCount: propBrandCount,
  productCount: propProductCount,
}) => {
  const [brandCount, setBrandCount] = useState<number | null>(
    propBrandCount ?? null
  );
  const [productCount, setProductCount] = useState<number | null>(
    propProductCount ?? null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // props로 두 값이 모두 주어지면 API 호출 생략
    if (
      typeof propBrandCount === 'number' &&
      typeof propProductCount === 'number'
    ) {
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const data: ApiBrand[] = await getBrandList();
        setBrandCount(data.length);
        const total = data.reduce((sum, b) => sum + (b.productCount || 0), 0);
        setProductCount(total);
      } catch (err) {
        console.error('StatsSection API 호출 실패:', err);
        setError('통계 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [propBrandCount, propProductCount]);

  if (loading) {
    return (
      <Container>
        <StatsContainer>
          <StatText>로딩 중...</StatText>
        </StatsContainer>
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <StatsContainer>
          <StatText>{error}</StatText>
        </StatsContainer>
      </Container>
    );
  }

  const displayBrandCount =
    typeof propBrandCount === 'number' ? propBrandCount : (brandCount ?? 0);
  const displayProductCount =
    typeof propProductCount === 'number'
      ? propProductCount
      : (productCount ?? 0);

  return (
    <Container>
      <StatsContainer>
        <StatBox $white>
          <Row>
            <StatLabel>종류</StatLabel>
            <StatNumber>{displayBrandCount}</StatNumber>
          </Row>
        </StatBox>
        <StatBox $gray>
          <Row>
            <StatLabel>등록 상품수</StatLabel>
            <StatNumber>{displayProductCount}</StatNumber>
          </Row>
        </StatBox>
      </StatsContainer>
      <ImageWrapper>
        <MenuImage src={BrandIcon} alt='메뉴 이미지' />
      </ImageWrapper>
    </Container>
  );
};

export default StatsSection;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const MenuImage = styled.img`
  width: 64px;
  height: 58px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
`;

const StatBox = styled.div<{
  $white?: boolean;
  $gray?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $white, $gray }) =>
    $white ? '#fff' : $gray ? '#f6f6f6' : '#fff'};
  border: 1px solid #ddd;
  border-radius: ${({ $white, $gray }) =>
    $white ? '10px 0 0 0' : $gray ? '0 0 10px 0' : '0'};
  text-align: center;
  padding: 15px 20px;
  position: relative;
  margin-right: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #f6ae24;
`;

const StatLabel = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000;
  margin-right: 5px;
  width: 100%;
`;

const StatText = styled.div`
  font-size: 14px;
  color: #666;
  padding: 15px 20px;
`;
