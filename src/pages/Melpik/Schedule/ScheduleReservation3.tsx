// src/pages/Melpik/Schedule/Reservation1/ScheduleReservation3.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Stepper from '../../../components/Melpik/Schedule/Reservation1/Stepper';
import BottomBar from '../../../components/Melpik/Schedule/Reservation1/BottomBar';

import ExIMG1 from '../../../assets/ExIMG1.svg';

interface Item {
  id: number;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
}

interface ItemCardProps {
  id: number;
  image: string;
  brand: string;
  description: string;
  onSelect: (id: number) => void;
  $isSelected?: boolean;
}

const items: Item[] = [
  {
    id: 1,
    image: ExIMG1,
    brand: 'SANDRO',
    description: '언발 플레어 미니원피스',
    price: 150000,
    discount: 10,
  },
  {
    id: 2,
    image: ExIMG1,
    brand: 'ZOOC',
    description: '볼륨소매 랩 카라 블라우스',
    price: 150000,
    discount: 10,
  },
  {
    id: 3,
    image: ExIMG1,
    brand: 'MICHA',
    description: '테일러드 카라 머메이드 원피스',
    price: 150000,
    discount: 10,
  },
];

const truncateText = (text: string, limit: number): string =>
  text.length > limit ? text.slice(0, limit) + '...' : text;

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  onSelect,
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    onSelect(id);
    navigate(`/item/${id}`);
  };

  return (
    <CardContainer>
      <ImageWrapper onClick={handleSelect}>
        <Image src={image} alt={brand} />
      </ImageWrapper>
      <Brand>{brand}</Brand>
      <Description>{description}</Description>
    </CardContainer>
  );
};

interface ItemListProps {
  HeaderContainer: React.FC;
  selectedItems: number[];
  onSelect: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  HeaderContainer,
  selectedItems,
  onSelect,
}) => {
  // selectedItems에 포함된 아이템만 필터링
  const filteredItems = items.filter((item) => selectedItems.includes(item.id));

  return (
    <ListContainer>
      <HeaderContainer />
      {filteredItems.length > 0 ? (
        <ItemsWrapper>
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
              description={truncateText(item.description, 12)}
              $isSelected={selectedItems.includes(item.id)}
              onSelect={onSelect}
            />
          ))}
        </ItemsWrapper>
      ) : (
        <NoItemMessage>선택된 제품이 없습니다.</NoItemMessage>
      )}
    </ListContainer>
  );
};

const ScheduleReservation3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation<{
    range?: [Date, Date];
    selectedItems?: number[];
  }>();
  const prevState = location.state || {};
  const initialRange = prevState.range as [Date, Date] | undefined;
  const initialSelectedItems = prevState.selectedItems as number[] | undefined;

  // selectedItems를 초기 state로 설정
  const [selectedItems, setSelectedItems] = useState<number[]>(
    initialSelectedItems || []
  );
  const [selectedTime] = useState<string>(''); // 필요시 수정
  const [selectedDate, setSelectedDate] = useState<string>('선택안함');
  const [saleMethod, setSaleMethod] = useState<string>('제품판매'); // 기본값 설정

  // range가 없으면 이전 단계로 리디렉트
  useEffect(() => {
    if (!initialRange) {
      navigate('/schedule/reservation1');
    }
  }, [initialRange, navigate]);

  const handleSelect = (id: number) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
    }
    navigate(`/item/${id}`);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedDate(event.target.value);

  const handleSaleMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => setSaleMethod(event.target.value);

  const handleBottomClick = () => {
    // 다음 단계로 보낼 때도 필요한 state가 있으면 여기에 포함
    console.log('버튼 클릭됨');
    console.log(`Selected Range: ${initialRange?.[0]} ~ ${initialRange?.[1]}`);
    console.log(`Selected Items: ${selectedItems}`);
    console.log(`Selected Date: ${selectedDate}`);
    console.log(`Selected Time: ${selectedTime}`);
    console.log(`Sale Method: ${saleMethod}`);
    // 예: 다음 단계 reservation4가 있을 경우
    // navigate('/schedule/reservation4', { state: { range: initialRange, selectedItems, selectedDate, saleMethod } });
  };

  // 날짜 범위 포맷 함수
  const formatKoreanDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const ItemContainer: React.FC = () => (
    <CustomHeader>
      <Label>
        예약된 제품목록<GrayText2>(선택)</GrayText2>
      </Label>
    </CustomHeader>
  );

  return (
    <Container>
      <Stepper currentStep={3} />

      <Summary>
        <ScheduleInfo>
          <Label>예약한 스케줄</Label>
          <InfoText>
            {initialRange
              ? `${formatKoreanDate(initialRange[0])} ~ ${formatKoreanDate(initialRange[1])}`
              : '날짜 정보 없음'}
          </InfoText>
        </ScheduleInfo>
        <ScheduleInfo>
          <Label>예약한 제품목록</Label>
          <InfoText>선택한 제품 수 {selectedItems.length} 개</InfoText>
        </ScheduleInfo>
      </Summary>

      <Content>
        <ItemList
          HeaderContainer={ItemContainer}
          selectedItems={selectedItems}
          onSelect={handleSelect}
        />
      </Content>

      <GrayLine />

      <FormContainer>
        <ColumnWrapper>
          <Label>판매방식 선택 *</Label>
          <StyledSelect value={saleMethod} onChange={handleSaleMethodChange}>
            <option value='제품판매'>제품판매</option>
            <option value='제품대여'>제품대여</option>
          </StyledSelect>
        </ColumnWrapper>
      </FormContainer>

      <InfoMessage>
        <GrayText> ※ 노출일정은</GrayText>
        <BlackText>스케줄 시작일 기준 2일 이내 </BlackText>
        <GrayText>까지 가능합니다.</GrayText>
      </InfoMessage>
      <BottomBar onNext={handleBottomClick} />

      <BeenContainer />
    </Container>
  );
};

export default ScheduleReservation3;

// 색상 코드 예시: 프로젝트에 맞춰 변경하세요.
const COLOR_GRAY4 = '#bdbdbd';
const COLOR_GRAY3 = '#9e9e9e';
const COLOR_GRAY2 = '#757575';
const COLOR_GRAY1 = '#616161';
const COLOR_GRAY0 = '#e0e0e0';
const COLOR_WHITE = '#ffffff';
const COLOR_BLACK = '#000000';

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: auto;
`;

const Summary = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 30px;
`;

const ScheduleInfo = styled.div`
  flex: 1;
`;

const InfoText = styled.div`
  height: 57px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid ${COLOR_GRAY4};
  border-radius: 5px;
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
`;

const Content = styled.div`
  flex: 1;
`;

const GrayLine = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid ${COLOR_GRAY0};
  margin: 30px 0;
`;

const FormContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  margin-bottom: 8px;

  font-weight: 700;
  font-size: 10px;
  line-height: 11px;

  color: ${COLOR_BLACK};
`;

const StyledSelect = styled.select`
  padding: 20px;
  border-radius: 5px;
  border: 1px solid ${COLOR_BLACK};

  font-weight: 800;
  font-size: 13px;
  line-height: 14px;

  color: ${COLOR_BLACK};
`;

const InfoMessage = styled.p`
  font-size: 12px;
  color: ${COLOR_GRAY2};
  margin-bottom: 20px;
`;

const GrayText = styled.span`
  color: ${COLOR_GRAY1};

  font-size: 12px;
`;

const BlackText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;

  color: ${COLOR_BLACK};
`;

const BeenContainer = styled.div`
  height: 300px;
`;

const ListContainer = styled.div`
  background-color: ${COLOR_WHITE};
  overflow: hidden;
  margin-bottom: 40px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoItemMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${COLOR_GRAY2};
  font-size: 14px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 6px;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 210px;
  cursor: pointer;
`;

const Image = styled.img`
  object-fit: cover;
  width: 140px;
  height: 210px;
`;

const Brand = styled.h3`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 5px;
  font-size: 12px;
  /* 필요시 font-family나 추가 스타일 적용 */
  color: ${COLOR_GRAY2};
`;

const CustomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const GrayText2 = styled.span`
  margin-left: 5px;
  color: ${COLOR_GRAY3};

  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
`;
