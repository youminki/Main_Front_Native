import React, { useState } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';

// 동적 데이터
const visitLabel = '포인트';
const salesLabel = '포인트 변동';
const visits = '0';
const sales = '9';
const dateRange = 'COUNT';

// 포인트 내역 예시 데이터
const pointHistory = [
  {
    date: '2025-03-10 / 구매사용',
    detail: '포인트 사용',
    detailColor: '#F6AE24', // 사용(차감)
    change: '- 29,500',
    total: '0',
  },
  {
    date: '2025-03-08 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523', // 적립
    change: '500',
    total: '29,500',
  },
  {
    date: '2025-03-07 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '29,000',
  },
  {
    date: '2025-03-06 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '28,500',
  },
  {
    date: '2025-03-06 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '28,000',
  },
  {
    date: '2025-03-04 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '27,500',
  },
  {
    date: '2025-03-03 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '27,000',
  },
  {
    date: '2025-03-03 / 제품평가 작성--',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '26,500',
  },
];

// const items = [
//   { id: 1, name: 'Item1' },
//   { id: 2, name: 'Item2' },
//   { id: 3, name: 'Item3' },
//   { id: 4, name: 'Item4' },
// ];

const Point: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  // 예시: 선택된 기간에 따라 아이템 목록을 필터링 (3개월이면 앞의 3개, 6개월이면 전체)
  // const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  return (
    <PointContainer>
      <Header>
        <Title>포인트</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={visits}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />
      <Divider />

      <Section>
        {/* 기간 선택 영역 */}
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        {/* 실제 포인트 내역 테이블 영역 */}
        <HistoryContainer>
          {/* 테이블 헤더 */}
          <HistoryHeader>
            <LeftHeader>일자 / 내역정보</LeftHeader>
            <RightHeader>변동 / 누적 (포인트)</RightHeader>
          </HistoryHeader>

          {/* 포인트 내역 리스트 */}
          {pointHistory.map((item, idx) => {
            // "2025-03-10 / 구매사용" -> ["2025-03-10", "구매사용"]
            const splitted = item.date.split(' / ');
            const datePart = splitted[0]; // 예: "2025-03-10"
            const slashPart = splitted[1] || ''; // 예: "구매사용"

            return (
              <HistoryRow key={idx}>
                <RowLeft>
                  {/* 날짜 + " / " + 뒤에 오는 부분을 나누어 스타일링 */}
                  <DateRow>
                    <DatePart>{datePart}</DatePart>
                    {slashPart && <Slash> / </Slash>}
                    {slashPart && <SlashPart>{slashPart}</SlashPart>}
                  </DateRow>

                  <DetailText color={item.detailColor}>
                    {item.detail}
                  </DetailText>
                </RowLeft>

                <RowRight>
                  <ChangeText>{item.change}</ChangeText>
                  <TotalText>{item.total}</TotalText>
                </RowRight>
              </HistoryRow>
            );
          })}
        </HistoryContainer>
      </Section>
    </PointContainer>
  );
};

export default Point;

// 전체 컨테이너
const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

// 상단 헤더
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

// 구분선
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 30px;
`;

// 아래 내용(기간 선택 + 포인트 내역 목록) 래퍼
const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 80px;
  margin-top: 30px;
`;

/* ============================= */
/* 포인트 내역 테이블 스타일링 */
/* ============================= */

// 테이블 전체 컨테이너
const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* 각 행 간격 */
  margin-top: 20px;
`;

// 테이블 헤더 (일자/내역 + 변동/누적)
const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(221, 221, 221, 0.96);
  border: 1px solid #dddddd;
  padding: 10px;
`;

const LeftHeader = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
`;

const RightHeader = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  text-align: right;
`;

// 각 행(박스)
const HistoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #dddddd;
  padding: 10px;
`;

// 왼쪽(일자, 내역)
const RowLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

// 날짜와 슬래시 부분을 한 줄에 배치하기 위한 래퍼
const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

// 날짜 부분 (기존 굵게)
const DatePart = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

// 슬래시 문자 (날짜와 구분되는 느낌을 위해 분리)
const Slash = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

// 슬래시 이후 텍스트 ("/ 구매사용", "/ 제품평가 작성" 등)
const SlashPart = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

// 오른쪽(포인트 변동, 누적)
const RowRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

// "포인트 적립"/"포인트 사용" 등
const DetailText = styled.p<{ color?: string }>`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  margin: 0;
  color: ${({ color }) => color || '#000000'};
`;

// 변동 포인트
const ChangeText = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  margin: 0;
  color: #000000;
  text-align: right;
`;

// 누적 포인트
const TotalText = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  margin: 0;
  color: #000000;
  text-align: right;
`;
