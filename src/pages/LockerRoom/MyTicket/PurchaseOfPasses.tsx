import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import InputField from '../../../components/InputField';
import { CustomSelect } from '../../../components/CustomSelect';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../styles/Theme';
import { format, addMonths } from 'date-fns';
import { getAllTicketTemplates, TicketList } from '../../../api/ticket/ticket';
import { getMembershipInfo, MembershipInfo } from '../../../api/user/userApi';

const PurchaseOfPasses: React.FC = () => {
  const [templates, setTemplates] = useState<TicketList[]>([]);
  const [purchaseOption, setPurchaseOption] = useState<string>('');
  const [ticketSetting, setTicketSetting] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0); // 할인율을 숫자로 설정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 현재 선택된 템플릿 객체
  const selectedTemplate = templates.find((t) => t.name === purchaseOption);
  const isOneTime = selectedTemplate?.name === '1회 이용권';

  // 템플릿 목록 조회
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllTicketTemplates();
        setTemplates(res.items);
        if (res.items.length > 0) {
          setPurchaseOption(res.items[0].name);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // 멤버십 할인율 조회
  useEffect(() => {
    (async () => {
      try {
        const info: MembershipInfo = await getMembershipInfo();
        // 할인율을 문자열에서 숫자로 변환
        const discount = info.discountRate
          ? parseFloat(info.discountRate.toString()) // 10.00 -> 10.00 숫자형으로 변환
          : 0;

        // discountRate가 NaN이 아닌지 확인하고 유효한 값만 설정
        if (!isNaN(discount) && discount >= 0) {
          setDiscountRate(discount);
        } else {
          setDiscountRate(0); // Invalid discount rate일 경우 0으로 설정
        }
      } catch (err) {
        console.error('Error fetching discount rate:', err);
        setDiscountRate(0); // 에러가 발생하면 기본값 0으로 설정
      }
    })();
  }, []);

  // 날짜 세팅
  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const oneMonthLater = addMonths(today, 1);
  const formattedOneMonthLater = format(oneMonthLater, 'yyyy.MM.dd');
  const paymentDay = today.getDate();

  // 가격 계산
  const basePrice = selectedTemplate ? selectedTemplate.price : 0;

  // 할인율을 반영하여 가격 계산 (percentage discount)
  const discountedPrice =
    basePrice > 0 && !isNaN(discountRate) && discountRate > 0 // 할인율이 0보다 클 때만 할인 적용
      ? basePrice * (1 - discountRate / 100) // 할인율 적용: price * (1 - discountRate / 100)
      : basePrice; // 할인율이 0일 경우 원래 가격을 그대로 사용

  const formattedDiscountedPrice =
    discountedPrice > 0 ? discountedPrice.toLocaleString() : '0'; // 원 단위로 표시

  const handlePaymentClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmPayment = () => {
    navigate('/my-ticket/PurchaseOfPasses/TicketPayment', {
      state: {
        name: selectedTemplate?.name,
        discountedPrice,
        isOneTime: selectedTemplate?.name === '1회 이용권', // 1회 이용권 여부 전달
      },
    });
  };

  // onChange 이벤트 타입 명시
  const handlePurchaseOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => setPurchaseOption(e.target.value);

  const handleTicketSettingChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTicketSetting(e.target.value);

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
          onChange={handlePurchaseOptionChange}
        >
          {templates.map((tpl) => (
            <option key={tpl.id} value={tpl.name}>
              {tpl.name}
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
          <HalfBox>
            <InputField
              name='paymentAmount'
              label='이용권 결제금액'
              id='paymentAmount'
              prefixcontent={`${formattedDiscountedPrice}원`}
              readOnly
            />
          </HalfBox>

          <HalfBox>
            <InputField
              name='ticketSetting'
              label='이용권 설정 *'
              id='ticketSetting'
              as={CustomSelect}
              value={ticketSetting}
              onChange={handleTicketSettingChange}
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

        {/* 진행 중인 시즌 */}
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
