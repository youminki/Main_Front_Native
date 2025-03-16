// src/components/Landing/LandingPage4.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../assets/Landing/left-arrow.svg';
import RightArrowIcon from '../../assets/Landing/right-arrow.svg';
import ScreenImg1 from '../../assets/Landing/ScreenImg1.svg';
import ScreenImg2 from '../../assets/Landing/ScreenImg2.svg';
import ScreenImg3 from '../../assets/Landing/ScreenImg3.svg';

interface Screen {
  img: string;
  subtitle: React.ReactNode;
}

const screens: Screen[] = [
  {
    img: ScreenImg1,
    subtitle: (
      <>
        인스타그램으로 나의 스타일 파악 후 <br />
        브랜드 매칭하기
      </>
    ),
  },
  { img: ScreenImg2, subtitle: '노출 & 포스팅할 제품 선택하기' },
  {
    img: ScreenImg3,
    subtitle: (
      <>
        콘텐츠 제작, 팔로워들과 소통하며 <br />
        판매 수익 창출
      </>
    ),
  },
];

const LandingPage4: React.FC = () => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let loadedImages = 0;
    screens.forEach((screen) => {
      const img = new Image();
      img.src = screen.img;
      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === screens.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  const handlePrevClick = () =>
    setCurrentScreenIndex((prevIndex) =>
      prevIndex === 0 ? screens.length - 1 : prevIndex - 1
    );

  const handleNextClick = () =>
    setCurrentScreenIndex((prevIndex) =>
      prevIndex === screens.length - 1 ? 0 : prevIndex + 1
    );

  return (
    <Container>
      <LandingTitle3>
        <MelpicHighlight>melpik</MelpicHighlight>은 <br />
        <BrandHighlight>어떤 서비스인가요?</BrandHighlight>
      </LandingTitle3>
      <LandingSubtitle3>
        {screens[currentScreenIndex].subtitle}
      </LandingSubtitle3>
      <ScreenContainer>
        <ArrowButton onClick={handlePrevClick}>
          <ArrowIcon src={LeftArrowIcon} alt='Previous' />
        </ArrowButton>
        <ScreenImageContainer>
          {imagesLoaded ? (
            <ScreenImage
              src={screens[currentScreenIndex].img}
              alt='Screen'
              loading='lazy'
            />
          ) : (
            <LoadingSpinner />
          )}
        </ScreenImageContainer>
        <ArrowButton onClick={handleNextClick}>
          <ArrowIcon src={RightArrowIcon} alt='Next' />
        </ArrowButton>
      </ScreenContainer>
      <PaginationDots>
        {screens.map((_, idx) => (
          <Dot key={idx} isActive={currentScreenIndex === idx} />
        ))}
      </PaginationDots>
    </Container>
  );
};

export default React.memo(LandingPage4);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 60px 20px;
  background-color: #f5f5f5;
  min-height: 932px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 20px;
`;

const LandingTitle3 = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 50px;
  color: #000000;
`;

const BrandHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #f6ae24;
`;

const MelpicHighlight = styled.span`
  color: #f6ae24;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
`;

const LandingSubtitle3 = styled.p`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  height: 60px;
  margin-bottom: 32px;
  color: #000000;
`;

const ScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  max-width: 800px;
`;

const ScreenImageContainer = styled.div`
  width: 220px;
  height: 466px;
  background: #f0f0f0;
  filter: drop-shadow(3px 5px 15px rgba(18, 18, 18, 0.15));
  border-radius: 10px;
  overflow: hidden;
`;

const ScreenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
`;

const ArrowButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 10px;
  z-index: 1;

  &:first-of-type {
    left: 0;
  }

  &:last-of-type {
    right: 0;
  }
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

interface DotProps {
  isActive: boolean;
}

const Dot = styled.div<DotProps>`
  width: ${(props) => (props.isActive ? '20px' : '10px')};
  height: 10px;
  background-color: ${(props) => (props.isActive ? '#f5ab35' : '#d9d9d9')};
  border-radius: 100px;
  transition:
    width 0.3s,
    background-color 0.3s;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f0f0f0;
  border-top: 5px solid #f5ab35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
