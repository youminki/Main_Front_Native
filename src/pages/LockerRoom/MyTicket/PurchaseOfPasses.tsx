// src/pages/PurchaseOfPasses.tsx
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import InputField from '../../../components/InputField';
import { CustomSelect } from '../../../components/CustomSelect';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../styles/Theme';

const PurchaseOfPasses: React.FC = () => {
  const [purchaseOption, setPurchaseOption] = useState('정기 구독권');
  const [ticketSetting, setTicketSetting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const isOneTime = purchaseOption === '1회 이용권';

  const handlePaymentClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmPayment = () =>
    navigate('/my-ticket/PurchaseOfPasses/TicketPayment');

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        {/* 구매할 이용권 */}
        <InputField
          label='구매할 이용권 *'
          id='purchaseOption'
          as={CustomSelect}
          value={purchaseOption}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setPurchaseOption(e.target.value);
            if (e.target.value === '1회 이용권') {
              setTicketSetting('');
            }
          }}
        >
          <option value='정기 구독권'>정기 구독권</option>
          <option value='1회 이용권'>1회 이용권</option>
        </InputField>

        {/* 이용권 사용기간 (읽기전용) */}
        <InputField
          label='이용권 사용기간'
          id='usagePeriod'
          prefixcontent='2025.03.01 ~ 2025.03.31 (1개월)'
          readOnly
        />

        <RowLabel>
          {/* 이용권 결제금액 (읽기전용) */}
          <HalfBox>
            <InputField
              label='이용권 결제금액'
              id='paymentAmount'
              prefixcontent='120,000'
              readOnly
            />
          </HalfBox>

          {/* 이용권 설정 */}
          <HalfBox>
            <InputField
              label='이용권 설정 *'
              id='ticketSetting'
              as={CustomSelect}
              value={ticketSetting}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTicketSetting(e.target.value)
              }
              disabled={isOneTime}
            >
              {isOneTime ? (
                <option value=''>해당없음</option>
              ) : (
                <>
                  <option value='월 4회권'>월 4회권</option>
                  <option value='월 8회권'>월 8회권</option>
                  <option value='무제한'>무제한</option>
                </>
              )}
            </InputField>
          </HalfBox>
        </RowLabel>

        {/* 진행 중인 시즌 표시 */}
        <InputField
          label='진행 중인 시즌 표시'
          id='currentSeason'
          prefixcontent='2025 SPRING | 2025.03 ~ 2025.05'
          readOnly
        />

        {/* 자동결제 일자 */}
        <InputField
          label='자동결제 일자'
          id='autoPaymentDate'
          prefixcontent={isOneTime ? '해당없음' : '매달 1일 (진행예정)'}
          readOnly
        />

        <Divider />

        <NoticeArea>
          <NoticeText>
            ※ 이용 중인 구독권은{' '}
            <OrangeBoldText>시즌 중간에 취소가 불가</OrangeBoldText>합니다.
          </NoticeText>
          <NoticeText>
            구독권 설정은 <BlackBoldText>시즌 시작 전에 선택</BlackBoldText>해야
            하며, 다음 시즌에 변경 가능합니다.
          </NoticeText>
        </NoticeArea>

        <FixedBottomBar
          text='이용권 결제하기'
          color='black'
          onClick={handlePaymentClick}
        />

        <ReusableModal2
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmPayment}
        >
          이용권을 결제하시겠습니까?
        </ReusableModal2>
      </Container>
    </ThemeProvider>
  );
};

export default PurchaseOfPasses;

// Styled Components (Signup.tsx에서 가져온 그대로)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
  max-width: 600px;
  background-color: #ffffff;
  justify-content: center;
`;

const RowLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const HalfBox = styled.div`
  flex: 1;
`;

const Divider = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid #eeeeee;
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
