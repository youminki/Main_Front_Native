import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ClosetIcon from '/src/assets/LockerRoom/ClosetIcon.svg';
import HistoryIcon from '/src/assets/LockerRoom/HistoryIcon.svg';
import PointsIcon from '/src/assets/LockerRoom/PointsIcon.svg';
import TicketIcon from '/src/assets/LockerRoom/TicketIcon.svg';
import PaymentIcon from '/src/assets/LockerRoom/PaymentIcon.svg';
import ReviewIcon from '/src/assets/LockerRoom/ReviewIcon.svg';

// 카드 데이터 배열
const cardData = [
  { to: '/my-closet', icon: ClosetIcon, text: '내 옷장' },
  { to: '/usage-history', icon: HistoryIcon, text: '이용내역' },
  { to: '/points', icon: PointsIcon, text: '포인트' },
  { to: '/tickets', icon: TicketIcon, text: '이용권' },
  { to: '/payment-methods', icon: PaymentIcon, text: '결제수단' },
  { to: '/product-reviews', icon: ReviewIcon, text: '제품평가' },
];

const CardGrid: React.FC = () => (
  <Grid>
    {cardData.map((card, index) => (
      <Link key={index} to={card.to}>
        <Card>
          <CardIcon src={card.icon} alt={`${card.text} 아이콘`} />
          <CardText>{card.text}</CardText>
          <PickButton>
            PICK
            <Arrow>→</Arrow>
          </PickButton>
        </Card>
      </Link>
    ))}
  </Grid>
);

export default CardGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Card = styled.div`
  aspect-ratio: 1 / 1;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.img`
  max-width: 150px;
  max-height: 150px;

  width: 50%;
  height: 50%;
  margin-bottom: 10px;
`;

const CardText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  color: #000000;
`;

const PickButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px; /* PICK과 화살표 사이 간격 */
  width: auto;
  height: auto;
  padding: 10px 20px;
  background: #ffffff;
  border: 1px solid #cccccc;

  margin-top: 20px;

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  cursor: pointer;
  position: relative; /* 필요시 위치 조정 가능 */
  transition: background-color 0.3s;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const Arrow = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #cccccc;
  display: inline-block;
`;
