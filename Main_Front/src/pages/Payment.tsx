import React, { useState } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import sampleImage from '../assets/sample-dress.svg';
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ServiceInfoIcon.svg';
import FixedBottomBar from '../components/FixedBottomBar';
import InputField from '../components/InputField';
import { YellowButton, BlackButton } from '../components/ButtonWrapper';
import ReusableModal from '../components/ReusableModal';
import ReusableModal2 from '../components/ReusableModal2';

// yup 스키마 (전화번호는 "010" + 8자리 숫자여야 함)
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
    .when('isSameAsDelivery', (isSameAsDelivery, schema) => {
      if (!isSameAsDelivery) {
        return schema
          .required('반납 전화번호를 입력해주세요.')
          .matches(
            /^010\d{8}$/,
            '전화번호는 010으로 시작하는 11자리 숫자여야 합니다.'
          );
      }
      return schema;
    }),
});

interface BasketItem {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  deliveryDate?: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
  isSelected: boolean;
}

const PaymentPage: React.FC = () => {
  // 수령인 (반드시 입력되어야 함)
  const [recipient, setRecipient] = useState<string>('');
  // 홈 이동 여부 (결제 완료 alert 후 홈 이동)
  const [navigateHome, setNavigateHome] = useState(false);

  // 샘플 장바구니 아이템
  const [items] = useState<BasketItem[]>([
    {
      id: 1,
      brand: 'SANDRO',
      nameCode: 'SF25S3FRD7699',
      nameType: '원피스',
      type: 'rental',
      servicePeriod: '2025.03.02 (일) ~ 03.05 (수)',
      size: 'M (55)',
      color: '블랙',
      price: 50000,
      imageUrl: sampleImage,
      isSelected: true,
    },
  ]);

  // 배송방법 선택
  const [selectedMethod, setSelectedMethod] = useState('매니저 배송');

  // 배송지 정보 (전화번호는 "010"이 기본값; "010" 부분은 수정 불가)
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '010',
  });
  // 반납지 정보 (기본값 "010"으로 시작)
  const [returnInfo, setReturnInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '010',
  });
  // 반납지와 동일 여부 (기본값 false: '새로 입력' 선택)
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(false);

  // 모달 상태 (주소 검색/배송목록, alert용)
  const [modalType, setModalType] = useState<'none' | 'search' | 'list'>(
    'none'
  );
  const [modalAlert, setModalAlert] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: '',
  });
  const closeAlertModal = () => {
    setModalAlert({ isOpen: false, message: '' });
    if (navigateHome) {
      window.location.href = '/home';
    }
    setNavigateHome(false);
  };
  const handleCloseModalCommon = () => setModalType('none');

  // 결제 확인용 ReusableModal2 상태
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // 배송 연락처 입력 핸들러 (입력 시 "010"은 고정, 나머지 8자리 입력)
  const handleDeliveryContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (!value.startsWith('010')) {
      value = '010' + value;
    }
    value = value.slice(0, 11);
    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    setDeliveryInfo({ ...deliveryInfo, contact: value });
  };

  const handleReturnContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (!value.startsWith('010')) {
      value = '010' + value;
    }
    value = value.slice(0, 11);
    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    setReturnInfo({ ...returnInfo, contact: value });
  };

  // "배송지와 동일" 버튼 클릭 시 현재 입력된 배송지 정보(주소, 상세주소, 연락처)를 반납지에 복사
  const handleUseSameAddressConditional = () => {
    setReturnInfo({ ...deliveryInfo });
    setIsSameAsDelivery(true);
  };

  const handleNewAddress = () => {
    setReturnInfo({ address: '', detailAddress: '', contact: '010' });
    setIsSameAsDelivery(false);
  };

  // 결제금액 계산 (매니저 배송이면 VAT 15,000 추가)
  const baseTotal = items.reduce((acc, item) => acc + item.price, 0);
  const additionalCost = selectedMethod === '매니저 배송' ? 15000 : 0;
  const finalAmount = baseTotal + additionalCost;

  const handlePaymentSubmit = async () => {
    if (
      recipient.trim() === '' ||
      deliveryInfo.address.trim() === '' ||
      deliveryInfo.detailAddress.trim() === ''
    ) {
      setModalAlert({
        isOpen: true,
        message: '수령인, 주소, 상세주소를 모두 입력해주세요.',
      });
      return;
    }
    try {
      const validatedData = await paymentSchema.validate({
        deliveryContact: deliveryInfo.contact.replace(/-/g, ''),
        returnContact: returnInfo.contact.replace(/-/g, ''),
        isSameAsDelivery,
      });
      console.log('검증 성공:', validatedData);
      setConfirmModalOpen(true);
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        setModalAlert({ isOpen: true, message: error.message });
      } else {
        console.error(error);
      }
    }
  };

  // ReusableModal2의 onConfirm: "네" 버튼 클릭 시 실행
  const handleConfirmPayment = () => {
    setConfirmModalOpen(false);
    setModalAlert({ isOpen: true, message: '결제가 완료되었습니다.' });
    setNavigateHome(true);
  };

  return (
    <Container>
      {modalAlert.isOpen && (
        <ReusableModal
          isOpen={modalAlert.isOpen}
          onClose={closeAlertModal}
          title='알림'
          height='200px'
        >
          <ModalBody>{modalAlert.message}</ModalBody>
        </ReusableModal>
      )}
      {confirmModalOpen && (
        <ReusableModal2
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirmPayment}
          title='결제 확인'
          width='376px'
          height='360px'
        >
          <ModalBody>결제를 진행하시겠습니까?</ModalBody>
        </ReusableModal2>
      )}
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
              {item.type === 'rental' ? (
                <InfoRowFlex>
                  <IconArea>
                    <Icon src={ServiceInfoIcon} alt='Service Info' />
                  </IconArea>
                  <TextContainer>
                    <RowText>
                      <LabelDetailText>진행 서비스 - </LabelDetailText>
                      <DetailHighlight>대여(3일)</DetailHighlight>
                    </RowText>
                    {item.servicePeriod && (
                      <AdditionalText>
                        <DetailText>{item.servicePeriod}</DetailText>
                      </AdditionalText>
                    )}
                  </TextContainer>
                </InfoRowFlex>
              ) : (
                <InfoRowFlex>
                  <IconArea>
                    <Icon src={ServiceInfoIcon} alt='Service Info' />
                  </IconArea>
                  <TextContainer>
                    <RowText>
                      <DetailText>진행 서비스 - 구매</DetailText>
                    </RowText>
                    {item.deliveryDate && (
                      <AdditionalText>
                        <DetailText>{item.deliveryDate}</DetailText>
                      </AdditionalText>
                    )}
                  </TextContainer>
                </InfoRowFlex>
              )}
              <InfoRowFlex>
                <IconArea>
                  <Icon src={ProductInfoIcon} alt='Product Info' />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>제품 정보</LabelDetailText>
                  </RowText>
                  <AdditionalText>
                    <DetailText>사이즈 - </DetailText>
                    <DetailHighlight>{item.size}</DetailHighlight>
                    <Slash>/</Slash>
                    <DetailText>색상 - </DetailText>
                    <DetailHighlight>{item.color}</DetailHighlight>
                  </AdditionalText>
                </TextContainer>
              </InfoRowFlex>
              <InfoRowFlex>
                <IconArea>
                  <Icon src={PriceIcon} alt='Price' />
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
                <ItemImage src={item.imageUrl} alt={item.nameCode} />
              </ItemImageContainer>
            </RightSection>
          </ContentWrapper>
        </Item>
      ))}

      <Section>
        <Row>
          <InputGroup>
            <InputField
              id='recipient'
              placeholder='이름을 입력 하세요'
              label='수령인 *'
              value={recipient}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRecipient(e.target.value)
              }
            />
          </InputGroup>
          <InputGroup>
            <InputField
              id='delivery-method'
              options={['매니저 배송', '택배 배송']}
              label='배송방법 *'
              onSelectChange={(value: string) => setSelectedMethod(value)}
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
            <SmallText> (결제 시 추가 비용 발생)</SmallText>
          </ServiceArea>
        </DeliveryNotice>
      )}

      <Section>
        <SectionTitle>배송지 입력 *</SectionTitle>
        <Row style={{ marginBottom: '10px' }}>
          <AddressInputWrapper>
            <AddressInput
              type='text'
              placeholder='주소를 검색 하세요'
              value={deliveryInfo.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
              }
            />
            <SearchButton onClick={() => setModalType('search')}>
              검색
            </SearchButton>
          </AddressInputWrapper>
          <DeliveryListButton onClick={() => setModalType('list')}>
            배송목록
          </DeliveryListButton>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <DetailAddressInput
            type='text'
            placeholder='상세주소를 입력 하세요'
            value={deliveryInfo.detailAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDeliveryInfo({
                ...deliveryInfo,
                detailAddress: e.target.value,
              })
            }
          />
        </Row>
        <Row>
          <InputGroup style={{ flex: 1 }}>
            <InputField
              id='contact'
              placeholder='나머지 8자리 입력'
              label='연락처'
              value={deliveryInfo.contact}
              onChange={handleDeliveryContactChange}
            />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup style={{ flex: 1 }}>
            <InputField
              id='delivery-message'
              placeholder='배송 시 전달할 내용을 입력하세요'
              label='배송 메시지 (선택)'
            />
          </InputGroup>
        </Row>
      </Section>

      <ReturnSection>
        <SectionTitle>반납지 입력 *</SectionTitle>
        <ReturnOption>
          <OptionButtonRight
            $active={isSameAsDelivery}
            onClick={handleUseSameAddressConditional}
          >
            배송지와 동일
          </OptionButtonRight>
          <OptionButtonLeft
            $active={!isSameAsDelivery}
            onClick={handleNewAddress}
          >
            새로 입력
          </OptionButtonLeft>
        </ReturnOption>
        <Row style={{ marginBottom: '10px' }}>
          <AddressInputWrapper>
            <AddressInput
              type='text'
              placeholder='주소를 입력 하세요'
              value={returnInfo.address}
              disabled={isSameAsDelivery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReturnInfo({ ...returnInfo, address: e.target.value })
              }
            />
            <SearchButton onClick={() => setModalType('search')}>
              검색
            </SearchButton>
          </AddressInputWrapper>
          <DeliveryListButton onClick={() => setModalType('list')}>
            배송목록
          </DeliveryListButton>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <DetailAddressInput
            type='text'
            placeholder='상세주소를 입력 하세요'
            value={returnInfo.detailAddress}
            disabled={isSameAsDelivery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReturnInfo({ ...returnInfo, detailAddress: e.target.value })
            }
          />
        </Row>
        <Row>
          <InputGroup style={{ flex: 1 }}>
            <InputField
              id='return-contact'
              placeholder='나머지 8자리 입력'
              label='연락처'
              value={returnInfo.contact}
              disabled={isSameAsDelivery}
              onChange={handleReturnContactChange}
            />
          </InputGroup>
        </Row>
      </ReturnSection>

      <PaymentAndCouponContainer>
        <PaymentSection>
          <InputField
            id='payment-method'
            options={[
              '이용권 / 정기 구독권 ( 2025년 3월분 )',
              '무통장 결제 ',
              '카드 결제 ',
            ]}
            label='결제방식 *'
            placeholder=''
          />
        </PaymentSection>
        <CouponSection>
          <InputField
            id='coupon'
            options={['20% 할인 쿠폰 ', '보유 쿠폰 없음']}
            label='추가 쿠폰 (선택)'
            placeholder=''
          />
        </CouponSection>
      </PaymentAndCouponContainer>

      <TotalPaymentSection>
        <SectionTitle>총 결제금액 (VAT 포함)</SectionTitle>
        <TotalAmount>
          {selectedMethod === '매니저 배송' && (
            <AdditionalCost>+ 추가비용 (15,000)</AdditionalCost>
          )}
          <Amount>{finalAmount.toLocaleString()}원</Amount>
        </TotalAmount>
      </TotalPaymentSection>

      <FixedBottomBar
        text='결제하기'
        color='yellow'
        onClick={handlePaymentSubmit}
      />

      {modalType === 'search' && (
        <ReusableModal
          isOpen={modalType === 'search'}
          onClose={handleCloseModalCommon}
          title='지도'
          height='500px'
        >
          <MapBody>
            <p>카카오 지도가 들어갈 자리</p>
          </MapBody>
        </ReusableModal>
      )}

      {modalType === 'list' && (
        <ReusableModal
          isOpen={modalType === 'list'}
          onClose={handleCloseModalCommon}
          title='배송목록 추가'
          width='80%'
          height='320px'
        >
          <ModalBodyContent>
            <DeliveryListLabel>배송목록 (1/3)</DeliveryListLabel>
            <DeliverySelect>
              <option>서울 금천구 디지털로9길 41, 1008호</option>
              <option>서울 금천구 가산디지털1로 168</option>
              <option>경기도 성남시 분당구 판교역로 235</option>
            </DeliverySelect>
          </ModalBodyContent>
        </ReusableModal>
      )}

      {confirmModalOpen && (
        <ReusableModal2
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirmPayment}
          title='결제 확인'
          width='376px'
          height='360px'
        >
          <ModalBody>결제를 진행하시겠습니까?</ModalBody>
        </ReusableModal2>
      )}
    </Container>
  );
};

export default PaymentPage;

/* ==================== 스타일 정의 ==================== */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const SearchButton = styled(YellowButton)`
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

// ReturnOption 및 OptionButton (배송지와 동일 버튼) 수정
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
  margin: 30px 0;
`;

const ReturnSection = styled(Section)`
  border-top: 1px solid #ddd;
  margin: 30px 0;
  padding-top: 30px;
`;

const PaymentSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const CouponSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const TotalPaymentSection = styled.section`
  display: flex;
  flex-direction: column;
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
  font-size: 16px;
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

const AdditionalText = styled.div`
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

const MapBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
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
