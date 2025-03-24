import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// 시작일: 3월 25일 00:00

const START_DATE = new Date('2024-03-25T00:00:00');
// 타겟 날짜: 7일 후 (4월 1일 00:00)
const TARGET_DATE = new Date('2024-04-01T00:00:00');

// 20분당 1명 증가 → 1시간당 3명 증가
const PER_HOUR = 3;
// 전체 시간: 168시간 (7일) → 최대 인원: 168 * 3 = 504명
const MAX_PEOPLE = 504;

const Footer: React.FC = () => {
  // 남은 시간: { d, h, m, s }
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  // 현재 인원 수
  const [people, setPeople] = useState(0);

  useEffect(() => {
    const update = () => {
      updateCountdown();
      updatePeopleCount();
    };

    // 컴포넌트 마운트 시 즉시 업데이트
    update();

    // 1초마다 업데이트
    const timerId = setInterval(update, 1000);
    return () => clearInterval(timerId);
  }, []);

  // 남은 시간 계산 함수
  const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = TARGET_DATE.getTime() - now; // ms 단위 차이

    if (diff <= 0) {
      setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    setTimeLeft({ d, h, m, s });
  };

  // 인원 수 계산 함수 (20분당 1명씩 증가)
  const updatePeopleCount = () => {
    const now = new Date().getTime();
    const start = START_DATE.getTime();
    const target = TARGET_DATE.getTime();

    if (now >= target) {
      setPeople(MAX_PEOPLE);
      return;
    }
    if (now <= start) {
      setPeople(0);
      return;
    }

    const elapsedHours = (now - start) / (1000 * 60 * 60);
    let calculated = elapsedHours * PER_HOUR;
    if (calculated > MAX_PEOPLE) {
      calculated = MAX_PEOPLE;
    }

    setPeople(Math.floor(calculated));
  };
  const navigate = useNavigate();
  // 버튼 클릭 시 /signup 페이지로 이동
  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <FooterContainer>
      <InfoText>
        현재 <BoldSpan>{people.toString().padStart(2, '0')}명</BoldSpan>의
        이용자가 멜픽했어요
        <br />
        사전예약 마감까지{' '}
        <BoldSpan>
          {timeLeft.d}일 {timeLeft.h.toString().padStart(2, '0')}:
          {timeLeft.m.toString().padStart(2, '0')}:
          {timeLeft.s.toString().padStart(2, '0')}
        </BoldSpan>{' '}
        남았어요!
      </InfoText>

      <RegisterButton onClick={handleRegisterClick}>
        사전 등록하기
      </RegisterButton>

      <CompanyInfo>
        (주) 팀리프트 . 235-87-01284 . 2020-서울금천-0973
        <br />
        서울 금천구 디지털로9길 41, 1008호
        <br />© 2024 ME1PIK.
      </CompanyInfo>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 440px;
  height: 309px;
  margin: 0 auto;
  background: #f5ab35;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
`;

const BoldSpan = styled.span`
  font-weight: 800;
`;

const RegisterButton = styled.button`
  width: 250px;
  height: 45px;
  background: #ffffff;
  border-radius: 20px;
  border: none;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CompanyInfo = styled.div`
  width: 300px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #000000;
  text-align: left;
`;
