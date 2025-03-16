// src/pages/Landing.tsx
import React from 'react';
import styled from 'styled-components';
import LandingPage1 from '../components/Landing/LandingPage1';
import LandingPage2 from '../components/Landing/LandingPage2';
import LandingPage3 from '../components/Landing/LandingPage3';
import LandingPage4 from '../components/Landing/LandingPage4';
import LandingPage5 from '../components/Landing/LandingPage5';
import LandingPage6 from '../components/Landing/LandingPage6';

const Landing: React.FC = () => {
  return (
    <LandingContainer>
      {/* 메인 콘텐츠 영역 */}
      <ContentWrapper>
        <LandingPageWrapper variant='odd'>
          <LandingPage1 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage2 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='odd'>
          <LandingPage3 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage4 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage5 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage6 />
        </LandingPageWrapper>
      </ContentWrapper>

      <Footer>
        <FooterContent>
          <Line>
            <FooterItem>
              <FooterLabel>상호</FooterLabel>
              <FooterSpan>멜픽(melpik)</FooterSpan>
            </FooterItem>
            <FooterItem>
              <FooterLabel>대표</FooterLabel>
              <FooterSpan>장용호</FooterSpan>
            </FooterItem>
            <FooterItem>
              <FooterLabel>개인정보책임자</FooterLabel>
              <FooterSpan>황민서</FooterSpan>
            </FooterItem>
          </Line>
          <Line>
            <FooterItem>
              <FooterLabel>소재지</FooterLabel>
              <FooterSpan>
                서울시 금천구 디지털로9길 41, 1008호 (삼성IT해링턴타워)
              </FooterSpan>
            </FooterItem>
          </Line>
          <Line>
            <FooterItem>
              <FooterLabel>이메일</FooterLabel>
              <FooterSpan>liftcomma@gmail.com</FooterSpan>
            </FooterItem>
          </Line>
        </FooterContent>
      </Footer>
    </LandingContainer>
  );
};

export default Landing;

type WrapperVariant = 'odd' | 'even';

/* ---------- 전체 컨테이너: 화면 전체를 flex로 ---------- */
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 쌓이도록 */
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh; /* 화면 전체 높이 차지 */
`;

/* ---------- 메인 콘텐츠를 감싸는 래퍼: footer 아래로 밀기 위해 flex:1 ---------- */
const ContentWrapper = styled.div`
  width: 100%;
  flex: 1; /* 남은 공간을 모두 차지하여 footer를 하단에 위치시킴 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPageWrapper = styled.div<{ variant: WrapperVariant }>`
  width: 100%;
  position: relative;

  margin-bottom: -40px;
  z-index: ${({ variant }) => (variant === 'even' ? 3 : 1)};
`;

const Footer = styled.footer`
  width: 100%;
  background-color: #ffffff;
  text-align: left;

  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 14px;

  margin-top: 23px;
`;

const FooterContent = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  flex-wrap: nowrap;
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
  flex: 1;
  min-width: 100px;
`;

const FooterLabel = styled.label`
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  font-size: 10px;
  margin-right: 10px;
  color: #000000;
`;

const FooterSpan = styled.span`
  font-family: 'Noto Sans', sans-serif;
  font-weight: 400;
  font-size: 10px;
  color: #000000;
`;
