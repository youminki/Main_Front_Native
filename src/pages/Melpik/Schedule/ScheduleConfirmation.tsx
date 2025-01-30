import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import ExIMG1 from '../../../assets/Melpik/ExIMG1.svg';
import BottomBar from '../../../components/Signup/BottomBar';
import DeleteButtonIcon from '../../../assets/DeleteButtonIcon.svg';

interface Item {
  id: number;
  image: string;
  brand: string;
  description: string;
}

const items: Item[] = [
  {
    id: 1,
    image: ExIMG1,
    brand: 'SANDRO',
    description: '언발 플레어 미니원피스',
  },
  {
    id: 2,
    image: ExIMG1,
    brand: 'ZOOC',
    description: '볼륨소매 랩 카라 블라우스',
  },
  {
    id: 3,
    image: ExIMG1,
    brand: 'MICHA',
    description: '테일러드 카라 머메이드 원피스',
  },
  {
    id: 4,
    image: ExIMG1,
    brand: 'MICHA',
    description: '테일러드 카라 머메이드 원피스',
  },
  {
    id: 5,
    image: ExIMG1,
    brand: 'MICHA',
    description: '테일러드 카라 머메이드 원피스',
  },
];

const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

const ScheduleConfirmation: React.FC = () => {
  return (
    <Container>
      <Content>
        <Label>스케줄 타이틀</Label>
        <TextBox>2024 가을 시즌 2nd.</TextBox>

        <Label>스케줄 예약일자</Label>
        <TextBox>2024년 9월 16일 (월) ~ 9월 27일 (금)</TextBox>

        <RowContainer>
          <Column>
            <Label>스케줄 노출일시</Label>
            <TextBox>9월 18일 (수) - 00:05</TextBox>
          </Column>

          <Column>
            <Label>선택한 제품</Label>
            <TextBox>{items.length} 가지</TextBox>
          </Column>
        </RowContainer>

        <Notice>
          ※ 스케줄 변경(수정)은 <strong>시작일의 하루 전까지만 가능</strong>{' '}
          합니다.
        </Notice>
        <ConnectorLine1 />
        <Label>예약된 제품목록</Label>
        <ProductList>
          {items.map((item) => (
            <Product key={item.id}>
              <ProductImage src={item.image} alt={item.brand} />
              <ProductLabel>{item.brand}</ProductLabel>
              <ProductName>{truncateText(item.description, 15)}</ProductName>
            </Product>
          ))}
        </ProductList>
      </Content>
      <BottomBar imageSrc={DeleteButtonIcon} buttonText='수정하기' />
      <BeenContainer />
    </Container>
  );
};

export default ScheduleConfirmation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
`;

const TextBox = styled.div`
  padding: 21px 10px;
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 5px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Column = styled.div`
  flex: 1;
`;

const Notice = styled.p`
  font-size: 12px;
  color: #999;

  strong {
    font-weight: 700;
    color: black;
  }
`;

const ProductList = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Product = styled.div`
  margin-right: 6px;
`;

const ProductImage = styled.img`
  min-width: 140px;

  height: 210px;
  object-fit: cover;
`;

const ProductLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const ProductName = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;

  color: #999999;

  margin-top: 5px;
`;

const ConnectorLine1 = styled.div`
  border: 1px solid ${Theme.colors.gray4};
  margin: 20px 0;
`;

const BeenContainer = styled.div`
  height: 200px;
`;
