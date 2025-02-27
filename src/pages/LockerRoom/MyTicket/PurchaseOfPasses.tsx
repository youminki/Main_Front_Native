import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../../../components/InputField';

const PurchaseOfPasses: React.FC = () => {
  // "구매할 이용권 (선택)" 상태 관리
  const [selectedPassType, setSelectedPassType] = useState('정기 구독권');

  // onSelectChange로 전달해 드롭다운 변경 시 상태 업데이트
  const handlePassTypeChange = (value: string) => {
    setSelectedPassType(value);
  };

  // 1회 이용권 여부 (true면 '이용권 설정', '자동결제 일자' => 해당없음 + readOnly)
  const isOneTime = selectedPassType === '1회 이용권';

  return (
    <Container>
      <ContentWrapper>
        {/* 구매할 이용권 (선택) */}
        <InputField
          label='구매할 이용권 (선택) *'
          id='purchaseOption'
          options={['정기 구독권', '1회 이용권']}
          onSelectChange={handlePassTypeChange}
        />

        {/* 이용권 사용기간 (readOnly) */}
        <InputField
          label='이용권 사용기간'
          id='usagePeriod'
          // 부분 컬러는 불가하므로 전체 문자열을 prefixcontent로 표시
          prefixcontent='2025.03.01 ~ 2025.03.31 (1개월)'
          readOnly
        />

        {/* (row 정렬) 결제금액 & 이용권 설정 */}
        <RowWrapper>
          <HalfBox>
            <InputField
              label='이용권 결제금액'
              id='paymentAmount'
              prefixcontent='120,000'
              readOnly
            />
          </HalfBox>

          <HalfBox>
            <InputField
              label='이용권 설정 (선택) *'
              id='ticketSetting'
              // 1회 이용권이면 select를 없애고 readOnly 인풋에 "해당없음" 표시
              options={
                isOneTime ? undefined : ['월 4회권', '월 8회권', '무제한']
              }
              prefixcontent={isOneTime ? '해당없음' : undefined}
              readOnly={isOneTime}
            />
          </HalfBox>
        </RowWrapper>

        {/* 진행 중인 시즌표시 (readOnly) */}
        <InputField
          label='진행 중인 시즌표시'
          id='currentSeason'
          prefixcontent='2025 SPRING | 2025.03 ~ 2025.05'
          readOnly
        />

        {/* 자동결제 일자 (1회 이용권이면 '해당없음', 아니면 '매달 1일 (진행예정)') */}
        <InputField
          label='자동결제 일자'
          id='autoPaymentDate'
          prefixcontent={isOneTime ? '해당없음' : '매달 1일 (진행예정)'}
          readOnly
        />

        <Divider />

        {/* 안내메시지 - 일부 텍스트만 색/볼드 처리 (일반 p 태그로 구현) */}
        <NoticeArea>
          <NoticeText>
            ※ 이용 중인 구독권은{' '}
            <OrangeBoldText>시즌 중간에 취소가 불가</OrangeBoldText>합니다.
          </NoticeText>
          <NoticeText>
            구독권의 설정은 <BlackBoldText>시즌 시작 전에 선택</BlackBoldText>
            해서 사용하고
            <BlackBoldText>
              {' '}
              그 다음 시즌에 다른 설정으로 변경 가능
            </BlackBoldText>
            합니다.
          </NoticeText>
        </NoticeArea>
      </ContentWrapper>
    </Container>
  );
};

export default PurchaseOfPasses;

/* --- styled-components --- */

const Container = styled.div`
  background-color: #ffffff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const HalfBox = styled.div`
  flex: 1;
`;

/** 구분선 */
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;

/** 안내메시지 영역 */
const NoticeArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NoticeText = styled.p`
  font-size: 12px;
  color: #999999;
  line-height: 20px;
  margin: 0;
`;

/** 부분 색상/볼드 처리 */
const OrangeBoldText = styled.span`
  color: #f6ae24;
  font-weight: 700;
`;

const BlackBoldText = styled.span`
  color: #000000;
  font-weight: 700;
`;
