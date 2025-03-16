// src/components/Landing/LandingPage3.tsx
import React from 'react';
import styled from 'styled-components';
import ServiceImg1 from '../../assets/Landing/ServiceImg1.svg';
import ServiceImg2 from '../../assets/Landing/ServiceImg2.svg';
import ServiceImg3 from '../../assets/Landing/ServiceImg3.svg';

const LandingPage3: React.FC = () => {
  const serviceImages = [ServiceImg1, ServiceImg2, ServiceImg3];

  return (
    <Container>
      <LandingTitle>
        오직 나만의, 나를 위한 상품
        <LandingSubtitle>
          이제 일일이 찾지 마세요
          <br />
          브랜드는 <YellowText>멜픽이 PICK 해줄게요!</YellowText>
        </LandingSubtitle>
      </LandingTitle>
      <ServiceList>
        {serviceImages.map((img, idx) => (
          <Service key={idx}>
            <ServiceImage src={img} alt={`service-${idx}`} />
          </Service>
        ))}
      </ServiceList>
    </Container>
  );
};

export default LandingPage3;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
  background-color: #ffffff;
  min-height: 1232px;
  max-width: 600px;
  margin: 0 auto;
`;

const LandingTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin-bottom: 21px;
  color: #000000;
`;

const LandingSubtitle = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  margin-top: 21px;
  color: #000000;
`;

const YellowText = styled.span`
  color: #f6ae24;
  font-weight: 800;
  font-size: 18px;
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 50px;
  width: 100%;
  max-width: 1200px;
`;

const Service = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ServiceImage = styled.img`
  width: 320px;
  height: 240px;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;
