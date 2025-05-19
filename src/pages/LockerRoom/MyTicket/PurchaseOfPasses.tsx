// src/pages/LockerRoom/MyTicket/PurchaseOfPasses.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputField from '../../../components/InputField';
import { CustomSelect } from '../../../components/CustomSelect';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import { format, addMonths } from 'date-fns';
import { getAllTicketTemplates, TicketList } from '../../../api/ticket/ticket';
import { getMembershipInfo, MembershipInfo } from '../../../api/user/userApi';

const PurchaseOfPasses: React.FC = () => {
  const navigate = useNavigate();
  const popupRef = useRef<Window | null>(null);

  const [templates, setTemplates] = useState<TicketList[]>([]);
  const [purchaseOption, setPurchaseOption] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllTicketTemplates()
      .then((res) => {
        setTemplates(res.items);
        if (res.items.length > 0) {
          setPurchaseOption(res.items[0].name);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getMembershipInfo()
      .then((info: MembershipInfo) => {
        const discount = parseFloat(info.discountRate?.toString() || '0');
        setDiscountRate(discount >= 0 ? discount : 0);
      })
      .catch(() => setDiscountRate(0));
  }, []);

  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const formattedOneMonthLater = format(addMonths(today, 1), 'yyyy.MM.dd');
  const paymentDay = today.getDate();

  const selectedTemplate = templates.find((t) => t.name === purchaseOption);
  const isUnlimited = selectedTemplate?.isUlimited ?? false;
  const basePrice = selectedTemplate?.price || 0;
  const discountedPrice =
    basePrice > 0 && discountRate > 0
      ? basePrice * (1 - discountRate / 100)
      : basePrice;
  const formattedDiscountedPrice =
    discountedPrice > 0 ? discountedPrice.toLocaleString() : '0';

  const handleConfirmPayment = useCallback(() => {
    const params = new URLSearchParams({
      name: selectedTemplate?.name || '',
      discountedPrice: String(discountedPrice),
      isUnlimited: String(isUnlimited),
    }).toString();
    const url = `/my-ticket/PurchaseOfPasses/TicketPayment?${params}`;

    const isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      popupRef.current = window.open(
        url,
        'ticketPaymentPopup',
        `width=360,height=600,left=${(window.screen.availWidth - 360) / 2},top=${(window.screen.availHeight - 600) / 2},resizable,scrollbars`
      );
      const timer = setInterval(() => {
        if (popupRef.current?.closed) {
          clearInterval(timer);
          navigate('/my-ticket');
        }
      }, 500);
    } else {
      window.location.href = url;
    }

    setIsModalOpen(false);
  }, [selectedTemplate, discountedPrice, isUnlimited, navigate]);

  return (
    <Container>
      <InputField
        name='purchaseOption'
        label='구매할 이용권 *'
        id='purchaseOption'
        as={CustomSelect}
        value={purchaseOption}
        onChange={(e) => setPurchaseOption(e.target.value)}
      >
        {templates.map((tpl) => (
          <option key={tpl.id} value={tpl.name}>
            {tpl.name}
          </option>
        ))}
      </InputField>

      <InputField
        name='usagePeriod'
        label='이용권 사용기간'
        id='usagePeriod'
        prefixcontent={
          isUnlimited
            ? `${formattedToday} ~ 무제한`
            : `${formattedToday} ~ ${formattedOneMonthLater} (1개월)`
        }
        readOnly
      />

      <RowLabel>
        <InputField
          name='paymentAmount'
          label='이용권 결제금액'
          id='paymentAmount'
          prefixcontent={`${formattedDiscountedPrice}원`}
          readOnly
        />
      </RowLabel>

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
        suffixcontent={
          isUnlimited ? `매월 ${paymentDay}일마다 결제` : undefined
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
        onClick={() => setIsModalOpen(true)}
      />

      <ReusableModal2
        title='이용권 구매'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPayment}
      >
        이용권을 결제하시겠습니까?
      </ReusableModal2>
    </Container>
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
