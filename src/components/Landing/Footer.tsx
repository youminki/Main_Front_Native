// 기존 Footer 컴포넌트 파일 (Footer.tsx)
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 시작일: 3월 25일 00:00
const START_DATE = new Date('2025-03-25T00:00:00');
// 마감일: 3월 31일 00:00
const TARGET_DATE = new Date('2025-03-31T00:00:00');

// 20분당 1명 증가 → 1시간당 3명 증가
// 총 6일(144시간) → 최대 인원 = 144 * 3 = 432명
const PER_HOUR = 3;
const MAX_PEOPLE = 432;

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

const Footer: React.FC = () => {
  // 남은 시간
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  // 현재 인원 수
  const [people, setPeople] = useState(0);

  const navigate = useNavigate();

  // ---------------------------
  // 1) D-Day(남은 시간) 계산 함수
  // ---------------------------
  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now(); // 현재 시간(ms)
    const diff = TARGET_DATE.getTime() - now;

    // 이미 마감일이 지났다면 0일 00:00:00
    if (diff <= 0) {
      return { d: 0, h: 0, m: 0, s: 0 };
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return { d, h, m, s };
  };

  // ---------------------------
  // 2) 인원 수 계산 함수
  // ---------------------------
  const calculatePeopleCount = (): number => {
    const now = Date.now();
    const start = START_DATE.getTime();
    const target = TARGET_DATE.getTime();

    // 마감일 이후라면 최대 인원
    if (now >= target) return MAX_PEOPLE;
    // 시작일 이전이라면 0명
    if (now <= start) return 0;

    // (현재 시각 - 시작일) 동안 지난 시간을 기준으로 1시간당 3명 증가
    const elapsedHours = (now - start) / (1000 * 60 * 60);
    let count = elapsedHours * PER_HOUR;

    if (count > MAX_PEOPLE) {
      count = MAX_PEOPLE;
    }

    return Math.floor(count);
  };

  // ---------------------------
  // 3) useEffect로 주기적 갱신
  // ---------------------------
  useEffect(() => {
    const updateState = () => {
      setTimeLeft(calculateTimeLeft());
      setPeople(calculatePeopleCount());
    };

    // 마운트되면 즉시 1회 실행
    updateState();

    // 이후 1초마다 실행
    const timerId = setInterval(updateState, 1000);
    return () => clearInterval(timerId);
  }, []);

  // "사전 등록하기" 버튼 클릭 시 /signup으로 이동
  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <FooterContainer>
      <InfoText>
        전체 5,474명 / 신규{' '}
        <BoldSpan>{people.toString().padStart(2, '0')}명</BoldSpan>의 이용자가
        멜픽했어요
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
        <br />
        <CopyrightText>© 2024 ME1PIK.</CopyrightText>
      </CompanyInfo>
    </FooterContainer>
  );
};

export default Footer;

/* ---------------------------
// styled-components
// --------------------------- */
const FooterContainer = styled.footer`
  width: 440px;
  height: 309px;
  margin: 0 auto;
  /* 아래 여백 제거 */
  margin-bottom: 0;
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
  transition:
    transform 0.1s ease-in-out,
    background 0.2s ease-in-out;

  &:hover {
    background: #e0e0e0;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const CompanyInfo = styled.div`
  align-self: flex-start;
  margin-left: 42px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #000000;
  text-align: left;
  margin-top: 20px;
`;

const CopyrightText = styled.div`
  margin-top: 20px;
`;
