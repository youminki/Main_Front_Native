import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import InputField from '../../../components/InputField';
import { CustomSelect } from '../../../components/CustomSelect';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../styles/Theme';
import { format, addMonths } from 'date-fns';
import { getMembershipInfo } from '../../../api/user/userApi';
import {
  getUserTicketsByDateRange,
  UserTicket,
} from '../../../api/ticket/ticket';

const ticketSettingsOptions = ['월 4회권', '무제한'] as const;

type PurchaseOfPassesProps = {};

const PurchaseOfPasses: React.FC<PurchaseOfPassesProps> = () => {
  const [ticketNames, setTicketNames] = useState<string[]>([]);
  const [purchaseOption, setPurchaseOption] = useState<string>('');
  const [ticketSetting, setTicketSetting] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const today = new Date();
  const startDate = format(today, 'yyyy-MM-dd');
  const endDate = format(addMonths(today, 1), 'yyyy-MM-dd');

  // 로그인한 사용자의 이용권 이름 조회 (기간 조회 사용)
  useEffect(() => {
    (async () => {
      try {
        const tickets: UserTicket[] = await getUserTicketsByDateRange(
          startDate,
          endDate
        );
        const names = tickets.map((t) => t.ticketList.name);
        setTicketNames(names);
        if (names.length > 0) setPurchaseOption(names[0]);
      } catch (error) {
        console.error('티켓 조회 실패:', error);
      }
    })();
  }, [startDate, endDate]);

  // 멤버십 할인율 조회
  useEffect(() => {
    (async () => {
      try {
        const info = await getMembershipInfo();
        setDiscountRate(info.discount_rate);
      } catch (error) {
        console.error('멤버십 정보 조회 실패:', error);
      }
    })();
  }, []);

  // 날짜 및 가격 세팅
  const formattedToday = format(today, 'yyyy.MM.dd');
  const formattedOneMonthLater = format(addMonths(today, 1), 'yyyy.MM.dd');
  const paymentDay = today.getDate();

  const isOneTime = purchaseOption === '1회 이용권';
  const basePrice = isOneTime ? 50000 : 120000;
  const discountedPrice = Math.round((basePrice * (100 - discountRate)) / 100);
  const formattedBasePrice = basePrice.toLocaleString();
  const formattedDiscountedPrice = discountedPrice.toLocaleString();

  const handlePaymentClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmPayment = () => {
    const path = isOneTime
      ? '/my-ticket/PurchaseOfPasses/onetimePassTicketPayment'
      : '/my-ticket/PurchaseOfPasses/SubscriptionPassTicketPayment';
    navigate(path);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        {/* 구매할 이용권 선택 */}
        <InputField
          name='purchaseOption'
          label='구매할 이용권 *'
          id='purchaseOption'
          as={CustomSelect}
          value={purchaseOption}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setPurchaseOption(e.target.value);
            if (e.target.value === '1회 이용권') setTicketSetting('');
          }}
        >
          {ticketNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </InputField>

        {/* 이용권 사용기간 */}
        <InputField
          name='usagePeriod'
          label='이용권 사용기간'
          id='usagePeriod'
          prefixcontent={`${formattedToday} ~ ${formattedOneMonthLater} (1개월)`}
          readOnly
        />

        <RowLabel>
          {/* 결제 금액 */}
          <HalfBox>
            <InputField
              name='paymentAmount'
              label='이용권 결제금액'
              id='paymentAmount'
              prefixcontent={
                discountRate > 0 ? (
                  <PriceWrapper>
                    <OriginalPrice>{formattedBasePrice}원</OriginalPrice>
                    <Arrow>→</Arrow>
                    <DiscountedPrice>
                      {formattedDiscountedPrice}원 ({discountRate}% 할인)
                    </DiscountedPrice>
                  </PriceWrapper>
                ) : (
                  `${formattedBasePrice}원`
                )
              }
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
                ticketSettingsOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))
              )}
            </InputField>
          </HalfBox>
        </RowLabel>

        {/* 진행 중인 시즌 및 자동결제 일자 */}
        <InputField
          name='currentSeason'
          label='진행 중인 시즌 표시'
          id='currentSeason'
          prefixcontent='2025 SPRING | 2025.05 ~ 2025.07'
          readOnly
        />
        <InputField
          name='autoPaymentDate'
          label='자동결제 일자'
          id='autoPaymentDate'
          prefixcontent={formattedToday}
          suffixcontent={`매달 ${paymentDay}일마다 결제`}
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
          title='이용권 구매'
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

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OriginalPrice = styled.span`
  font-size: 13px;
  color: #999999;
  text-decoration: line-through;
`;

const Arrow = styled.span`
  font-size: 13px;
  color: #999999;
`;

const DiscountedPrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
`;
