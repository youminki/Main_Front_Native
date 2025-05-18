import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';
import Spinner from '../../../components/Spinner';
import ServiceInfoIcon from '../../../assets/Basket/ServiceInfoIcon.svg';
import ProductInfoIcon from '../../../assets/Basket/ProductInfoIcon.svg';
import PriceIcon from '../../../assets/Basket/PriceIcon.svg';
import sampleImage from '../../../assets/sample-dress.svg';
import {
  getMyRentalSchedule,
  cancelRentalSchedule,
  RentalScheduleItem,
} from '../../../api/RentalSchedule/RentalSchedule';

interface BasketItem {
  id: number; // 실제 예약 ID
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  deliveryDate?: string;
  size: string;
  color: string;
  price: number | string;
  imageUrl: string;
  $isSelected: boolean;
  rentalDays?: string;
  paymentStatus?: string; // 취소요청 등 상태
}

const UsageHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(6);
  const [items, setItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getMyRentalSchedule();
        const mapped = data.rentals.map((rental) => {
          const isRental = rental.serviceType === '대여';
          const servicePeriod = `${rental.startDate} ~ ${rental.endDate}`;
          return {
            id: rental.id,
            brand: rental.brand,
            nameCode: rental.productNum,
            nameType: rental.category,
            type: isRental ? 'rental' : 'purchase',
            servicePeriod: isRental ? servicePeriod : undefined,
            deliveryDate: !isRental ? rental.endDate : undefined,
            size: rental.size,
            color: rental.color,
            price: rental.ticketName,
            imageUrl: rental.mainImage || sampleImage,
            $isSelected: true,
            rentalDays: isRental
              ? `대여 (${calculateDays(rental.startDate, rental.endDate)}일)`
              : '구매',
            paymentStatus: (rental as any).paymentStatus || undefined,
          } as BasketItem;
        });
        setItems(mapped);
      } catch (e: any) {
        console.error(e);
        setError('대여/구매 내역을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const calculateDays = (start: string, end: string): number => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24) + 1;
    return Math.round(diff);
  };

  const handleCancel = async (id: number) => {
    if (!window.confirm('정말 예약을 취소 요청하시겠습니까?')) return;
    try {
      setCancelingId(id);
      const result = await cancelRentalSchedule(id);
      // 상태 업데이트
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, paymentStatus: result.paymentStatus }
            : item
        )
      );
      alert('취소 요청이 완료되었습니다.');
    } catch (e: any) {
      console.error(e);
      const msg =
        e.response?.data?.message ||
        '취소 요청에 실패했습니다. 다시 시도해주세요.';
      alert(msg);
    } finally {
      setCancelingId(null);
    }
  };

  const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  if (loading) {
    return (
      <UsageHistoryContainer>
        <Spinner />
      </UsageHistoryContainer>
    );
  }

  if (error) {
    return (
      <UsageHistoryContainer>
        <ErrorText>{error}</ErrorText>
      </UsageHistoryContainer>
    );
  }

  return (
    <UsageHistoryContainer>
      <Header>
        <Title>이용 내역</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={String(items.length)}
        sales={'2025 1분기'}
        dateRange={'SPRING'}
        visitLabel={'담긴 제품들'}
        salesLabel={'시즌'}
      />

      <Divider />

      <Section>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <ItemList>
          {filteredItems.map((item) => (
            <Item key={item.id}>
              <ContentWrapper>
                <ItemDetails>
                  <Brand>{item.brand}</Brand>
                  <ItemName>
                    <Code>{item.nameCode}</Code>
                    <Slash>/</Slash>
                    <Name>{item.nameType}</Name>
                  </ItemName>

                  <InfoRowFlex>
                    <IconArea>
                      <Icon src={ServiceInfoIcon} alt='Service Info' />
                    </IconArea>
                    <TextContainer>
                      <RowText>
                        <LabelDetailText>진행 서비스 - </LabelDetailText>
                        <DetailHighlight>{item.rentalDays}</DetailHighlight>
                      </RowText>
                      {item.servicePeriod && (
                        <AdditionalText>
                          <DetailText>{item.servicePeriod}</DetailText>
                        </AdditionalText>
                      )}
                      {item.deliveryDate && (
                        <AdditionalText>
                          <DetailText>{item.deliveryDate}</DetailText>
                        </AdditionalText>
                      )}
                    </TextContainer>
                  </InfoRowFlex>

                  <InfoRowFlex>
                    <IconArea>
                      <Icon src={ProductInfoIcon} alt='Product Info' />
                    </IconArea>
                    <TextContainer>
                      <RowText>
                        <LabelDetailText>제품 정보</LabelDetailText>
                      </RowText>
                      <AdditionalText>
                        <DetailText>
                          사이즈 -{' '}
                          <DetailHighlight>{item.size}</DetailHighlight>
                        </DetailText>

                        <Slash>/</Slash>
                      </AdditionalText>
                      <DetailText>
                        색상 - <DetailHighlight>{item.color}</DetailHighlight>
                      </DetailText>
                    </TextContainer>
                  </InfoRowFlex>

                  <InfoRowFlex>
                    <IconArea>
                      <Icon src={PriceIcon} alt='Price' />
                    </IconArea>
                    <TextContainer>
                      <RowText>
                        <LabelDetailText>결제방식 - </LabelDetailText>
                        <DetailHighlight>
                          {typeof item.price === 'number'
                            ? item.price.toLocaleString()
                            : item.price}
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

              <ButtonContainer>
                <DeleteButton>제품상세</DeleteButton>
                <PurchaseButton
                  onClick={() => handleCancel(item.id)}
                  disabled={
                    cancelingId === item.id || item.paymentStatus === '취소요청'
                  }
                >
                  {item.paymentStatus === '취소요청'
                    ? '취소요청'
                    : cancelingId === item.id
                      ? '요청중...'
                      : '취소'}
                </PurchaseButton>
              </ButtonContainer>
            </Item>
          ))}
        </ItemList>
      </Section>
    </UsageHistoryContainer>
  );
};

export default UsageHistory;

// ────────────────────────────────────────────────────────────
// Styled Components
// ────────────────────────────────────────────────────────────

const UsageHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000;
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 80px;
  margin-top: 30px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 12px;
  line-height: 11px;
  color: #000000;

  @media (max-width: 480px) {
    margin: 0;
    font-size: 11px;
  }
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    /* 모바일에선 세로 정렬 */
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }
`;

const Code = styled.span`
  font-weight: 700;
  font-size: 13px;
  color: #999;
  margin-right: 4px;
  @media (max-width: 480px) {
    margin: 0;
    font-size: 13px;
  }
`;
const Slash = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #000;
  margin: 0 4px;
  @media (max-width: 480px) {
    display: none;
  }
`;
const Name = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: #000;
  @media (max-width: 480px) {
    margin-top: 4px;
    font-size: 14px;
  }
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
  margin-bottom: 20px;
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
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

const DetailText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const DetailHighlight = styled.span`
  font-weight: 900;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 10px;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 140px;
  height: 210px;
  border: 1px solid #ddd;

  @media (min-width: 600px) {
    width: 200px;
    height: auto;
  }
`;
const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-self: flex-end;

  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

const DeleteButton = styled.button`
  background-color: #fff;
  color: #888;
  width: 91px;
  height: 46px;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;

  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  text-align: center;

  color: #999999;

  @media (max-width: 600px) {
    width: 60px;
    height: 40px;
  }
`;

const PurchaseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  width: 91px;
  height: 46px;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;

  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  text-align: center;

  @media (max-width: 600px) {
    width: 60px;
    height: 40px;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const LabelDetailText = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 2rem;
`;
