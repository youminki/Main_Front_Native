// src/pages/PurchaseOfPasses.tsx
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import InputField from '../../../components/InputField';
import { CustomSelect } from '../../../components/CustomSelect';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../styles/Theme';
import { format, addMonths } from 'date-fns';

const PurchaseOfPasses: React.FC = () => {
  const [purchaseOption, setPurchaseOption] = useState('정기 구독권');
  const [ticketSetting, setTicketSetting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const isOneTime = purchaseOption === '1회 이용권';

  // 오늘 날짜 및 결제일 설정
  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const oneMonthLater = addMonths(today, 1);
  const formattedOneMonthLater = format(oneMonthLater, 'yyyy.MM.dd');
  const paymentDay = today.getDate();

  // 결제금액 동적 계산
  const price = isOneTime ? 50000 : 120000;
  const formattedPrice = price.toLocaleString();

  const handlePaymentClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmPayment = () => {
    if (isOneTime) {
      navigate('/my-ticket/PurchaseOfPasses/onetimePassTicketPayment');
    } else {
      navigate('/my-ticket/PurchaseOfPasses/SubscriptionPassTicketPayment');
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        {/* 구매할 이용권 */}
        <InputField
          name='purchaseOption'
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

        {/* 이용권 사용기간 (오늘부터 한 달) */}
        <InputField
          name='usagePeriod'
          label='이용권 사용기간'
          id='usagePeriod'
          prefixcontent={`${formattedToday} ~ ${formattedOneMonthLater} (1개월)`}
          readOnly
        />

        <RowLabel>
          {/* 이용권 결제금액 (읽기전용) */}
          <HalfBox>
            <InputField
              name='paymentAmount'
              label='이용권 결제금액'
              id='paymentAmount'
              prefixcontent={formattedPrice}
              readOnly
            />
          </HalfBox>

          {/* 이용권 설정 */}
          <HalfBox>
            <InputField
              name='ticketSetting'
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
                  <option value='무제한'>무제한</option>
                </>
              )}
            </InputField>
          </HalfBox>
        </RowLabel>

        {/* 진행 중인 시즌 표시 */}
        <InputField
          name='currentSeason'
          label='진행 중인 시즌 표시'
          id='currentSeason'
          prefixcontent='2025 SPRING | 2025.05 ~ 2025.07'
          readOnly
        />

        {/* 자동결제 일자 */}
        <InputField
          name='autoPaymentDate'
          label='자동결제 일자'
          id='autoPaymentDate'
          prefixcontent={formattedToday}
          suffixcontent={
            !isOneTime ? `매달 ${paymentDay}일마다 결제` : undefined
          }
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
          title={'이용권 구매'}
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

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
  max-width: 600px;
  background-color: #ffffff;
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
  align-items: flex-start;
  gap: 6px;
  width: 100%;
  margin: 16px 0;
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
