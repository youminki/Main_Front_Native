// src/pages/Melpik/Schedule/ScheduleConfirmation.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import ExIMG1 from '../../../assets/Melpik/ExIMG1.svg';
import BottomBar from '../../../components/BottomNav2';
import DeleteButtonIcon from '../../../assets/DeleteButtonIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getSaleScheduleDetail,
  SaleScheduleDetailResponse,
} from '../../../api/sale/SaleSchedule';
import Spinner from '../../../components/Spinner';

// 텍스트 자르기 헬퍼
const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

// YYYY-MM-DD → "YYYY년 M월 D일 (요일)"
const formatDateWithDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdayNames[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
};

const ScheduleConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams<{ scheduleId: string }>();

  const [detail, setDetail] = useState<SaleScheduleDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scheduleId) return;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSaleScheduleDetail(Number(scheduleId));
        setDetail(data);
      } catch (err: any) {
        console.error('스케줄 상세 조회 실패', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            '상세 조회 중 오류가 발생했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [scheduleId]);

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  if (error || !detail) {
    return (
      <Container>
        <ErrorMessage>{error || '정보를 불러올 수 없습니다.'}</ErrorMessage>
      </Container>
    );
  }

  const { title, dateRange, productCount, products } = detail;
  // 노출 일시는 dateRange 시작일 포맷 + " - 00:00"
  const exposureDate = dateRange.split('~')[0].trim();
  const exposureDisplay = `${formatDateWithDay(exposureDate)} - 00:00`;

  return (
    <Container>
      <Content>
        <Label>스케줄 타이틀</Label>
        <TextBox>{title}</TextBox>

        <Label>스케줄 예약일자</Label>
        <TextBox>
          {dateRange
            .split('~')
            .map((d) => formatDateWithDay(d.trim()))
            .join(' ~ ')}
        </TextBox>

        <RowContainer>
          <Column>
            <Label>스케줄 노출일시</Label>
            <TextBox>{exposureDisplay}</TextBox>
          </Column>

          <Column>
            <Label>선택한 제품</Label>
            <TextBox>{productCount} 가지</TextBox>
          </Column>
        </RowContainer>

        <Notice>
          ※ 스케줄 변경(수정)은 <strong>시작일의 하루 전까지만 가능</strong>{' '}
          합니다.
        </Notice>
        <ConnectorLine1 />
        <Label>예약된 제품목록</Label>
        <ProductList>
          {products.map((item) => (
            <Product key={item.id}>
              <ProductImage src={item.imageUrl || ExIMG1} alt={item.name} />
              <ProductLabel>{item.brandName}</ProductLabel>
              <ProductName>{truncateText(item.name, 15)}</ProductName>
            </Product>
          ))}
        </ProductList>
      </Content>
      <BottomBar
        imageSrc={DeleteButtonIcon}
        buttonText='수정하기'
        onClick={() => navigate(`/schedule/edit/${scheduleId}`)}
      />
      <BeenContainer />
    </Container>
  );
};

export default ScheduleConfirmation;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
`;

const TextBox = styled.div`
  padding: 21px 10px;
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 5px;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Column = styled.div`
  flex: 1;
`;

const Notice = styled.p`
  font-size: 12px;
  color: #999;

  strong {
    font-weight: 700;
    color: black;
  }
`;

const ProductList = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Product = styled.div`
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 140px;
  height: 210px;
  object-fit: cover;
`;

const ProductLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const ProductName = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999;
  margin-top: 5px;
`;

const ConnectorLine1 = styled.div`
  border: 1px solid ${Theme.colors.gray4};
  margin: 20px 0;
`;

const BeenContainer = styled.div`
  height: 200px;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: red;
`;
