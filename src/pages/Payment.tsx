// src/pages/PaymentPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import FixedBottomBar from '../components/FixedBottomBar';
import InputField from '../components/InputField';
import { YellowButton, BlackButton } from '../components/ButtonWrapper';
import ReusableModal from '../components/ReusableModal';
import ReusableModal2 from '../components/ReusableModal2';
import AddressSearchModal from '../components/AddressSearchModal';
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ServiceInfoIcon.svg';
import { getUserTickets, TicketItem } from '../api/ticket/ticket';

declare global {
  interface Window {
    daum: any;
  }
}

// 전화번호 검증 스키마
const paymentSchema = yup.object().shape({
  deliveryContact: yup
    .string()
    .required('전화번호를 입력해주세요.')
    .matches(
      /^010\d{8}$/,
      '전화번호는 010으로 시작하는 11자리 숫자여야 합니다.'
    ),
  isSameAsDelivery: yup.boolean(),
  returnContact: yup
    .string()
    .when('isSameAsDelivery', (same, schema) =>
      !same
        ? schema
            .required('반납 전화번호를 입력해주세요.')
            .matches(
              /^010\d{8}$/,
              '전화번호는 010으로 시작하는 11자리 숫자여야 합니다.'
            )
        : schema
    ),
});

interface BasketItem {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
  $isSelected: boolean;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  // Location.state 에서 전달된 상품 정보 읽기
  const location = useLocation();
  const itemData = location.state as BasketItem;

  // items 배열 초기화
  const [items] = useState<BasketItem[]>([{ ...itemData, $isSelected: true }]);

  // form state
  const [recipient, setRecipient] = useState('');
  const [selectedMethod, setSelectedMethod] =
    useState<string>('결제방식 선택하기');
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '010',
  });
  const [returnInfo, setReturnInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '010',
  });
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(false);
  const [modalField, setModalField] = useState<'delivery' | 'return'>(
    'delivery'
  );
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [selectedListAddress, setSelectedListAddress] = useState('');
  const [modalAlert, setModalAlert] = useState({ isOpen: false, message: '' });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [navigateHome, setNavigateHome] = useState(false);
  // 1) 사용자 이용권 조회
  useEffect(() => {
    getUserTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('티켓 조회 실패:', err));
  }, []);

  // 2) 옵션 리스트 생성
  const paymentOptions = tickets.length
    ? [
        '결제방식 선택하기',
        ...tickets.map(
          (t) =>
            // 남은 횟수 remainingRentals 사용
            `${t.ticketList.name} (${t.remainingRentals}회 남음)`
        ),
      ]
    : ['결제방식 선택하기', '이용권 구매하기'];

  const handlePaymentSelect = (value: string) => {
    // 이용권 구매하기 선택 시 마이티켓 페이지로 이동
    if (value === '이용권 구매하기') {
      navigate('/my-ticket');
      return;
    }
    setSelectedMethod(value);
  };

  const handleListConfirm = () => {
    if (modalField === 'delivery') {
      setDeliveryInfo((info) => ({ ...info, address: selectedListAddress }));
    } else {
      setReturnInfo((info) => ({ ...info, address: selectedListAddress }));
    }
    setListModalOpen(false);
  };

  const handleAddressSearch = (field: 'delivery' | 'return') => {
    setModalField(field);
    setSearchModalOpen(true);
  };

  const handleContactChange = (field: 'delivery' | 'return', value: string) => {
    let v = value.replace(/[^0-9]/g, '');
    if (!v.startsWith('010')) v = '010' + v;
    v = v.slice(0, 11);
    if (v.length === 11) v = v.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    if (field === 'delivery')
      setDeliveryInfo((info) => ({ ...info, contact: v }));
    else setReturnInfo((info) => ({ ...info, contact: v }));
  };

  const handleUseSame = () => {
    setReturnInfo({ ...deliveryInfo });
    setIsSameAsDelivery(true);
  };
  const handleNewReturn = () => {
    setReturnInfo({ address: '', detailAddress: '', contact: '010' });
    setIsSameAsDelivery(false);
  };

  const baseTotal = items.reduce((sum, x) => sum + x.price, 0);
  const extra = selectedMethod === '매니저 배송' ? 15000 : 0;
  const finalAmount = baseTotal + extra;

  const handlePaymentSubmit = async () => {
    if (
      !recipient.trim() ||
      !deliveryInfo.address ||
      !deliveryInfo.detailAddress
    ) {
      setModalAlert({
        isOpen: true,
        message: '수령인, 주소, 상세주소를 모두 입력해주세요.',
      });
      return;
    }
    try {
      await paymentSchema.validate({
        deliveryContact: deliveryInfo.contact.replace(/-/g, ''),
        returnContact: returnInfo.contact.replace(/-/g, ''),
        isSameAsDelivery,
      });
      setConfirmModalOpen(true);
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        setModalAlert({ isOpen: true, message: e.message });
      }
    }
  };

  const handleConfirmPayment = () => {
    setConfirmModalOpen(false);
    setModalAlert({ isOpen: true, message: '결제가 완료되었습니다.' });
    setNavigateHome(true);
  };
  const closeAlertModal = () => {
    setModalAlert({ isOpen: false, message: '' });
    if (navigateHome) window.location.href = '/home';
    setNavigateHome(false);
  };

  return (
    <Container>
      {/* Alert */}
      {modalAlert.isOpen && (
        <ReusableModal
          isOpen
          onClose={closeAlertModal}
          title='알림'
          height='200px'
        >
          <ModalBody>{modalAlert.message}</ModalBody>
        </ReusableModal>
      )}
      {/* 결제 확인 */}
      {confirmModalOpen && (
        <ReusableModal2
          isOpen
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirmPayment}
          title='결제 확인'
          width='376px'
          height='360px'
        >
          <ModalBody>결제를 진행하시겠습니까?</ModalBody>
        </ReusableModal2>
      )}

      {/* 신청제품 */}
      <LabelDetailText>신청제품</LabelDetailText>
      {items.map((item) => (
        <Item key={item.id}>
          <ContentWrapper>
            <ItemDetails>
              <Brand>{item.brand}</Brand>
              <ItemName>
                <NameCode>{item.nameCode}</NameCode>
                <Slash>/</Slash>
                <ItemType>{item.nameType}</ItemType>
              </ItemName>
              <InfoRowFlex>
                <IconArea>
                  <Icon src={ServiceInfoIcon} />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>진행 서비스 - </LabelDetailText>
                    <DetailHighlight>
                      {item.type === 'rental'
                        ? `대여(${item.servicePeriod})`
                        : '구매'}
                    </DetailHighlight>
                  </RowText>
                </TextContainer>
              </InfoRowFlex>
              <InfoRowFlex>
                <IconArea>
                  <Icon src={ProductInfoIcon} />
                </IconArea>
                <TextContainer>
                  <LabelDetailText>제품 정보</LabelDetailText>
                  <RowText>
                    <AdditionalText>
                      <LabelDetailText>사이즈 - </LabelDetailText>
                      <DetailHighlight>{item.size}</DetailHighlight>
                      <Slash>/</Slash>
                      <DetailText>색상 - </DetailText>
                    </AdditionalText>

                    <DetailHighlight>{item.color}</DetailHighlight>
                  </RowText>
                </TextContainer>
              </InfoRowFlex>
              <InfoRowFlex>
                <IconArea>
                  <Icon src={PriceIcon} />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>결제금액 - </LabelDetailText>
                    <DetailHighlight>
                      {item.price.toLocaleString()}원
                    </DetailHighlight>
                  </RowText>
                </TextContainer>
              </InfoRowFlex>
            </ItemDetails>
            <RightSection>
              <ItemImageContainer>
                <ItemImage src={item.imageUrl} />
              </ItemImageContainer>
            </RightSection>
          </ContentWrapper>
        </Item>
      ))}

      {/* 수령인 & 배송방법 */}
      <Section>
        <Row>
          <InputGroup>
            <InputField
              id='recipient'
              label='수령인 *'
              placeholder='이름을 입력 하세요'
              value={recipient}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRecipient(e.target.value)
              }
            />
          </InputGroup>
          <InputGroup>
            <InputField
              id='delivery-method'
              label='배송방법 *'
              options={['매니저 배송', '택배 배송']}
              onSelectChange={(v: string) =>
                setSelectedMethod(v as '매니저 배송' | '택배 배송')
              }
            />
          </InputGroup>
        </Row>
      </Section>
      {selectedMethod === '매니저 배송' && (
        <DeliveryNotice>
          <NoticeTitle>※ 매니저 배송이란?</NoticeTitle>
          <NoticeText>
            매니저가 직접 고객에게 전달하는 방식으로 당일 배송 가능.
          </NoticeText>
          <ServiceArea>
            서비스 지역 <Highlight>[ 서울 / 경기 일부 ]</Highlight>
            <SmallText>(결제 시 추가 비용 발생)</SmallText>
          </ServiceArea>
        </DeliveryNotice>
      )}

      {/* 배송지 입력 */}
      <Section>
        <SectionTitle>배송지 입력 *</SectionTitle>
        <Row>
          <AddressInputWrapper>
            <AddressInput
              readOnly
              value={deliveryInfo.address}
              placeholder='주소를 검색 하세요'
            />
            <SearchBtn onClick={() => handleAddressSearch('delivery')}>
              검색
            </SearchBtn>
          </AddressInputWrapper>
          <DeliveryListButton onClick={() => setListModalOpen(true)}>
            배송목록
          </DeliveryListButton>
        </Row>
        <Row>
          <DetailAddressInput
            placeholder='상세주소를 입력 하세요'
            value={deliveryInfo.detailAddress}
            onChange={(e) =>
              setDeliveryInfo((info) => ({
                ...info,
                detailAddress: e.target.value,
              }))
            }
          />
        </Row>
        <Row>
          <InputField
            id='contact'
            label='연락처'
            placeholder='나머지 8자리 입력'
            value={deliveryInfo.contact}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleContactChange('delivery', e.target.value)
            }
          />
        </Row>
      </Section>

      {/* 반납지 입력 */}
      <ReturnSection>
        <SectionTitle>반납지 입력 *</SectionTitle>
        <ReturnOption>
          <OptionButtonRight $active={isSameAsDelivery} onClick={handleUseSame}>
            배송지와 동일
          </OptionButtonRight>
          <OptionButtonLeft
            $active={!isSameAsDelivery}
            onClick={handleNewReturn}
          >
            새로 입력
          </OptionButtonLeft>
        </ReturnOption>
        <Row>
          <AddressInputWrapper>
            <AddressInput
              readOnly
              disabled={isSameAsDelivery}
              value={
                isSameAsDelivery ? deliveryInfo.address : returnInfo.address
              }
              placeholder='주소를 검색 하세요'
            />
            <SearchBtn
              disabled={isSameAsDelivery}
              onClick={() => handleAddressSearch('return')}
            >
              검색
            </SearchBtn>
          </AddressInputWrapper>
          <DeliveryListButton onClick={() => setListModalOpen(true)}>
            배송목록
          </DeliveryListButton>
        </Row>
        <Row>
          <DetailAddressInput
            disabled={isSameAsDelivery}
            placeholder='상세주소를 입력 하세요'
            value={returnInfo.detailAddress}
            onChange={(e) =>
              setReturnInfo((info) => ({
                ...info,
                detailAddress: e.target.value,
              }))
            }
          />
        </Row>
        <Row>
          <InputField
            id='return-contact'
            label='연락처'
            placeholder='나머지 8자리 입력'
            disabled={isSameAsDelivery}
            value={returnInfo.contact}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleContactChange('return', e.target.value)
            }
          />
        </Row>
      </ReturnSection>

      {/* 우편번호 검색 모달 */}
      <AddressSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelect={(addr) => {
          if (modalField === 'delivery')
            setDeliveryInfo((info) => ({ ...info, address: addr }));
          else setReturnInfo((info) => ({ ...info, address: addr }));
        }}
      />

      {/* 배송목록 모달 */}
      {listModalOpen && (
        <ReusableModal
          isOpen
          onClose={() => setListModalOpen(false)}
          onConfirm={handleListConfirm}
          title='배송목록 추가'
          width='80%'
          height='320px'
        >
          <ModalBodyContent>
            <DeliveryListLabel>배송목록 (1/3)</DeliveryListLabel>
            <DeliverySelect
              value={selectedListAddress}
              onChange={(e) => setSelectedListAddress(e.target.value)}
            >
              <option value=''>배송목록을 선택하세요</option>
              <option value='서울 금천구 디지털로9길 41, 1008호'>
                서울 금천구 디지털로9길 41, 1008호
              </option>
              <option value='서울 금천구 가산디지털1로 168'>
                서울 금천구 가산디지털1로 168
              </option>
              <option value='경기도 성남시 분당구 판교역로 235'>
                경기도 성남시 분당구 판교역로 235
              </option>
            </DeliverySelect>
          </ModalBodyContent>
        </ReusableModal>
      )}
      <PaymentAndCouponContainer>
        <PaymentSection>
          <InputGroup>
            {/* 여기를 동적 옵션으로 교체 */}
            <InputField
              id='payment-method'
              label='결제방식 *'
              options={paymentOptions}
              value={selectedMethod}
              onSelectChange={handlePaymentSelect}
            />
          </InputGroup>
        </PaymentSection>
      </PaymentAndCouponContainer>
      {/* 총 결제금액 */}
      <TotalPaymentSection>
        <SectionTitle>총 결제금액 (VAT 포함)</SectionTitle>
        <TotalAmount>
          {extra > 0 && (
            <AdditionalCost>
              + 추가비용 ({extra.toLocaleString()})
            </AdditionalCost>
          )}
          <Amount>{finalAmount.toLocaleString()}원</Amount>
        </TotalAmount>
      </TotalPaymentSection>

      {/* 결제버튼 */}
      <FixedBottomBar
        text='결제하기'
        color='yellow'
        onClick={handlePaymentSubmit}
      />
    </Container>
  );
};

export default PaymentPage;

// styled-components 아래에 생략...

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: #ffffff;
  padding: 1rem;
  max-width: 600px;
  margin-bottom: 100px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 11px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const AddressInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  min-width: 200px;
  overflow: hidden;
`;

const AddressInput = styled.input`
  flex: 1;
  border: none;
  padding: 0 10px;
  font-size: 14px;
  box-sizing: border-box;
  height: 100%;

  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled(YellowButton)<{ disabled?: boolean }>`
  height: 57px;
  border: none;
  border-radius: 0;
  padding: 0 15px;
`;

const DeliveryListButton = styled(BlackButton)`
  height: 57px;
  padding: 0 15px;
`;

const DetailAddressInput = styled.input`
  flex: 1;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0 10px;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  height: 57px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const ReturnOption = styled.div`
  display: inline-flex;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
  font-weight: 800;
  font-size: 13px;
  text-align: center;
  color: #000000;
`;

const OptionButtonRight = styled.button<{ $active: boolean }>`
  flex: 1;
  height: 57px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  border-radius: 10px 0 0 10px;
  border: ${({ $active }) =>
    $active ? '2px solid #f6ae24' : '2px solid transparent'};
  background: ${({ $active }) => ($active ? '#fff' : '#eee')};
  color: ${({ $active }) => ($active ? '#000' : '#888')};
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    border: 2px solid #ccc;
  }
`;

const OptionButtonLeft = styled.button<{ $active: boolean }>`
  flex: 1;
  height: 57px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  border-radius: 0 10px 10px 0;
  border: ${({ $active }) =>
    $active ? '2px solid #f6ae24' : '2px solid transparent'};
  background: ${({ $active }) => ($active ? '#fff' : '#eee')};
  color: ${({ $active }) => ($active ? '#000' : '#888')};
`;

const PaymentAndCouponContainer = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 30px 0;
`;

const ReturnSection = styled(Section)`
  border-top: 1px solid #ddd;

  padding-top: 30px;
`;

const PaymentSection = styled.section`
  display: flex;
  flex-direction: column;
`;

// const CouponSection = styled.section`
//   display: flex;
//   flex-direction: column;
// `;

const TotalPaymentSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const TotalAmount = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdditionalCost = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;

const Amount = styled.div`
  margin-left: auto;
  font-weight: 900;
  font-size: 16px;
  color: #000000;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 30px 0;
  margin-bottom: 15px;
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Brand = styled.div`
  font-weight: 900;
  font-size: 10px;
  color: #000000;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0 28px;
`;

const NameCode = styled.span`
  font-weight: 900;
  font-size: 14px;
  color: #000000;
`;

const ItemType = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #999999;
`;

const Slash = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #dddddd;
  margin: 0 4px;
`;

const LabelDetailText = styled.span`
  font-weight: 700;
  font-size: 12px;
  color: #000000;
  white-space: nowrap;
`;

const DetailText = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  white-space: nowrap;
`;

const DetailHighlight = styled.span`
  font-weight: 900;
  font-size: 12px;
  color: #000000;
  white-space: nowrap;
`;

const InfoRowFlex = styled.div`
  display: flex;
  align-items: stretch;
  gap: 5px;
  width: 100%;
`;

const IconArea = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const RowText = styled.div`
  display: flex;
  gap: 5px;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 10px;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 140px;
  height: 210px;
  border: 1px solid #dddddd;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const DeliveryNotice = styled.div`
  background: #fafafa;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const NoticeTitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #000;
`;

const NoticeText = styled.p`
  font-size: 12px;
  color: #444;
  margin-top: 4px;
`;

const ServiceArea = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin-top: 4px;
`;

const Highlight = styled.span`
  color: orange;
`;

const SmallText = styled.span`
  font-size: 11px;
  color: #666;
  margin-left: 4px;
`;

const ModalBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const DeliveryListLabel = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  text-align: left;
`;

const DeliverySelect = styled.select`
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  width: 100%;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0 11px;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M5%206%200%200%2010%200z'%20fill%3D'%23aaa'%20/%3E%3C/svg%3E")
    no-repeat right 10px center/10px;
`;

const ModalBody = styled.div`
  font-size: 14px;
  text-align: center;
  padding: 20px;
`;
const AdditionalText = styled.div`
  display: flex;

  white-space: nowrap;
`;
