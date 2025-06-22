import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../styles/Theme';
import Stepper from '../../../components/Melpik/Schedule/Reservation1/Stepper';
import BottomBar from '../../../components/Melpik/Schedule/Reservation1/BottomBar';

import ExIMG1 from '../../../assets/ExIMG1.svg';
import ImgAdd from '../../../assets/ImgAdd.svg';

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
  $isSelected: boolean;
}

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
        <AddButton src={ImgAdd} alt='Add' />
      </ImageWrapper>
      <Brand>{brand}</Brand>
      <Description>{description}</Description>
    </CardContainer>
  );
};

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

interface ItemListProps {
  HeaderContainer: React.FC;
  selectedItems: number[];
  onSelect: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  HeaderContainer,
  selectedItems,
  onSelect,
}) => (
  <ListContainer>
    <HeaderContainer />
    <ItemsWrapper>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          {...item}
          description={truncateText(item.description, 12)}
          $isSelected={selectedItems.includes(item.id)}
          onSelect={onSelect}
        />
      ))}
    </ItemsWrapper>
  </ListContainer>
);

const ScheduleReservation3: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('선택안함');
  const [saleMethod, setSaleMethod] = useState<string>('제품판매'); // 기본값 설정

  const navigate = useNavigate();

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
    console.log('버튼 클릭됨');
    console.log(`Selected Date: ${selectedDate}`);
    console.log(`Selected Time: ${selectedTime}`);
    console.log(`Sale Method: ${saleMethod}`);
    navigate('/schedule/reservation3');
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
          <InfoText>9월 16일 ~ 9월 27일</InfoText>
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
          <Label>스케줄 노출일자 (선택)</Label>
          <StyledSelect value={selectedDate} onChange={handleDateChange}>
            <option value='선택안함'>선택안함</option>
            <option value='2024-09-24'>2024년 9월 24일</option>
            <option value='2024-09-25'>2024년 9월 25일</option>
          </StyledSelect>
        </ColumnWrapper>

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

// Styled Components
const FormContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 20px; /* 각 Column 간 간격 설정 */
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 모든 컬럼이 동일한 크기로 확장 */
`;

const Label = styled.label`
  margin-bottom: 8px;

  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  /* identical to box height */

  color: #000000;
`;

const StyledSelect = styled.select`
  padding: 20px;
  border-radius: 5px;
  border: 1px solid ${Theme.colors.black};

  font-weight: 800;
  font-size: 13px;
  line-height: 14px;

  color: #000000;
`;

const GrayText = styled.span`
  color: ${Theme.colors.gray1};

  font-size: 12px;
`;

const BlackText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;

  color: #000000;
`;

const InfoMessage = styled.p`
  font-size: 12px;
  color: ${Theme.colors.gray2};
  margin-bottom: 20px;
`;

const GrayLine = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid ${Theme.colors.gray0};
  margin: 30px 0;
`;

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
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 5px;
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
`;

const BeenContainer = styled.div`
  height: 300px;
`;

const Content = styled.div`
  flex: 1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin: 6px;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 210px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 140px;
  height: 210px;
`;

const AddButton = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 46px;
  cursor: pointer;
`;

const CustomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const GrayText2 = styled.span`
  margin-left: 5px;
  color: ${Theme.colors.gray3};

  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
`;

const ListContainer = styled.div`
  background-color: ${Theme.colors.white};
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

const Brand = styled.h3`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 5px;
  font-size: 12px;
  ${Theme.fonts.default3}
  color: ${Theme.colors.gray2};
`;
