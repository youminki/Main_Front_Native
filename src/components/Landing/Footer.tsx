// src/components/Landing/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
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
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  text-align: left;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 14px;
  margin-top: 23px;

  background-color: #ffffff;
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
