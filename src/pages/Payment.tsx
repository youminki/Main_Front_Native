// PaymentPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../assets/sample-dress.svg';
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import FixedBottomBar from '../components/FixedBottomBar';
import InputField from '../components/InputField';
import { YellowButton, BlackButton } from '../components/ButtonWrapper';
import ReusableModal from '../components/ReusableModal';

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

  const [selectedMethod, setSelectedMethod] = useState('매니저 배송');
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '',
  });
  const [returnInfo, setReturnInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '',
  });
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);

  // 모달 타입 상태: 'none' | 'search' | 'list'
  const [modalType, setModalType] = useState<'none' | 'search' | 'list'>(
    'none'
  );

  const handleUseSameAddress = () => {
    setReturnInfo({ ...deliveryInfo });
    setIsSameAsDelivery(true);
  };

  const handleNewAddress = () => {
    setReturnInfo({ address: '', detailAddress: '', contact: '' });
    setIsSameAsDelivery(false);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalType('none');
  };

  return (
    <Container>
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
            {/* 검색 버튼 -> '지도' 모달 열기 */}
            <SearchButton onClick={() => setModalType('search')}>
              검색
            </SearchButton>
          </AddressInputWrapper>
          {/* 배송목록 버튼 -> '배송목록 추가' 모달 열기 */}
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
              placeholder='010 - 0000 - 0000'
              label='연락처'
              value={deliveryInfo.contact}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDeliveryInfo({ ...deliveryInfo, contact: e.target.value })
              }
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
          <OptionButton
            $active={isSameAsDelivery}
            onClick={handleUseSameAddress}
          >
            배송지와 동일
          </OptionButton>
          <OptionButton $active={!isSameAsDelivery} onClick={handleNewAddress}>
            새로 입력
          </OptionButton>
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
            <SearchButton
              onClick={() => setModalType('search')}
              disabled={isSameAsDelivery}
            >
              검색
            </SearchButton>
          </AddressInputWrapper>
          <DeliveryListButton
            onClick={() => setModalType('list')}
            disabled={isSameAsDelivery}
          >
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
              placeholder='010 - 0000 - 0000'
              label='연락처'
              value={returnInfo.contact}
              disabled={isSameAsDelivery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReturnInfo({ ...returnInfo, contact: e.target.value })
              }
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
              '무통장 결제 / 기업 065-143111-0-015, (주)리프트콤마',
              '카드 결제 / 신한카드 1212-****-****-0121',
            ]}
            label='결제방식 *'
            placeholder=''
          />
        </PaymentSection>
        <CouponSection>
          <InputField
            id='coupon'
            options={['20% 할인 쿠폰 / 26NJ-D6WW-NELY-5GB0', '보유 쿠폰 없음']}
            label='추가 쿠폰 (선택)'
            placeholder=''
          />
        </CouponSection>
      </PaymentAndCouponContainer>

      <TotalPaymentSection>
        <SectionTitle>총 결제금액 (VAT 포함)</SectionTitle>
        <TotalAmount>
          <AdditionalCost>+ 추가비용 (15,000)</AdditionalCost>
          <Amount>65,000원</Amount>
        </TotalAmount>
      </TotalPaymentSection>

      <FixedBottomBar text='결제하기' color='yellow' />

      {/* 
        모달 1: 검색 버튼 -> 지도 모달 
        modalType === 'search'
      */}
      {modalType === 'search' && (
        <ReusableModal
          isOpen={modalType === 'search'}
          onClose={handleCloseModal}
          title='지도'
          height='500px'
        >
          <MapBody>
            <p>카카오 지도가 들어갈 자리</p>
          </MapBody>
        </ReusableModal>
      )}

      {/* 
        모달 2: 배송목록 버튼 -> 배송목록 추가 모달 
        modalType === 'list'
      */}
      {modalType === 'list' && (
        <ReusableModal
          isOpen={modalType === 'list'}
          onClose={handleCloseModal}
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
  font-family: 'NanumSquare Neo OTF';
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
  font-size: 14px;
  height: 57px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;

const ReturnOption = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const OptionButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border-radius: 4px;
  padding: 16px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  border: ${({ $active }) =>
    $active ? '2px solid #FFC107' : '1px solid #ddd'};
  background: ${({ $active }) => ($active ? '#FFF8E1' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#000000' : '#aaaaaa')};
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 14px;
  color: #000000;
`;

const Amount = styled.div`
  font-family: 'NanumSquare Neo OTF';
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
  font-family: 'NanumSquare Neo OTF';
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 16px;
  color: #000000;
`;

const ItemType = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  color: #999999;
`;

const Slash = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  color: #dddddd;
  margin: 0 4px;
`;

const LabelDetailText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  color: #000000;
  white-space: nowrap;
`;

const DetailText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  color: #000000;
  white-space: nowrap;
`;

const DetailHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF';
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

/* 지도 모달 내용 예시 */
const MapBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* 배경 등 원하는 스타일 */
  background-color: #f5f5f5;
`;

/* 모달 바디 안의 내용 래핑 */
const ModalBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const DeliveryListLabel = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  text-align: left;
`;

const DeliverySelect = styled.select`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  width: 100%;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M5%206%200%200%2010%200z'%20fill%3D'%23aaa'%20/%3E%3C/svg%3E")
    no-repeat right 10px center/10px;
`;
