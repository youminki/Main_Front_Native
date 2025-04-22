import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../../../components/InputField';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
// ↑ 경로는 실제 프로젝트 구조에 맞춰 조정하세요
import { useNavigate } from 'react-router-dom';
// ↑ 라우팅 라이브러리에 맞춰 import

const PurchaseOfPasses: React.FC = () => {
  // "구매할 이용권 (선택)" 상태 관리
  const [selectedPassType, setSelectedPassType] = useState('정기 구독권');
  // 모달 오픈 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // onSelectChange로 전달해 드롭다운 변경 시 상태 업데이트
  const handlePassTypeChange = (value: string) => {
    setSelectedPassType(value);
  };

  // 1회 이용권 여부
  const isOneTime = selectedPassType === '1회 이용권';

  // "이용권 결제하기" 버튼 클릭 시 모달 열기
  const handlePaymentClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 모달에서 "네" 버튼 클릭 시 페이지 이동
  const handleConfirmPayment = () => {
    navigate('/my-ticket/PurchaseOfPasses/TicketPayment');
  };

  return (
    <>
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
            prefixcontent='2025.03.01 ~ 2025.03.31 (1개월)'
          />

          {/* (row 정렬) 결제금액 & 이용권 설정 */}
          <RowWrapper>
            <HalfBox>
              <InputField
                label='이용권 결제금액'
                id='paymentAmount'
                prefixcontent='120,000'
              />
            </HalfBox>

            <HalfBox>
              <InputField
                label='이용권 설정 (선택) *'
                id='ticketSetting'
                options={
                  isOneTime ? undefined : ['월 4회권', '월 8회권', '무제한']
                }
                prefixcontent={isOneTime ? '해당없음' : undefined}
              />
            </HalfBox>
          </RowWrapper>

          {/* 진행 중인 시즌표시 (readOnly) */}
          <InputField
            label='진행 중인 시즌표시'
            id='currentSeason'
            prefixcontent='2025 SPRING | 2025.03 ~ 2025.05'
          />

          {/* 자동결제 일자 */}
          <InputField
            label='자동결제 일자'
            id='autoPaymentDate'
            prefixcontent={isOneTime ? '해당없음' : '매달 1일 (진행예정)'}
          />

          <Divider />

          {/* 안내메시지 */}
          <NoticeArea>
            <NoticeText>
              ※ 이용 중인 구독권은{' '}
              <OrangeBoldText>시즌 중간에 취소가 불가</OrangeBoldText>
              합니다.
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

        {/* 하단 고정 버튼 */}
        <FixedBottomBar
          text='이용권 결제하기'
          color='black'
          onClick={handlePaymentClick}
        />
      </Container>

      {/* 모달 구현 */}
      <ReusableModal2
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPayment}
      >
        이용권을 결제하시겠습니까?
      </ReusableModal2>
    </>
  );
};

export default PurchaseOfPasses;

/* --- styled-components --- */
const Container = styled.div`
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  padding: 1rem;
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

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;

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

const OrangeBoldText = styled.span`
  color: #f6ae24;
  font-weight: 700;
`;

const BlackBoldText = styled.span`
  color: #000000;
  font-weight: 700;
`;
