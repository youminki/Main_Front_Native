import React from "react";
import styled from "styled-components";
import Theme from "../styles/Theme";
import { ThemeProvider } from "styled-components";
import MenuIcon from "../assets/Home/Menu.svg";

const BrandPage: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>멜픽</Title>
          <Subtitle>내 채널을 통해 나는 브랜드가 된다</Subtitle>
        </Header>
        <StatsSection>
          <StatsContainer>
            <StatBox>
              <StatNumber>174</StatNumber>
              <StatLabel>방문수</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>26</StatNumber>
              <StatLabel>판매된 제품수</StatLabel>
            </StatBox>
          </StatsContainer>
          <ImageWrapper>
            <MenuImage src={MenuIcon} alt="메뉴 이미지" />
          </ImageWrapper>
        </StatsSection>
        <Divider />
        <CardGrid>
          <Card>
            <CardText>멜픽 생성</CardText>
          </Card>
          <Card>
            <CardText>판매 스케줄</CardText>
          </Card>
          <Card>
            <CardText>판매 정산</CardText>
          </Card>
          <Card>
            <CardText>멜픽 설정</CardText>
          </Card>
        </CardGrid>
      </Container>
    </ThemeProvider>
  );
};

export default BrandPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 414px;
  margin: 0 auto;
  background-color: #fff;
  font-family: "NanumSquare Neo OTF", sans-serif;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #000;
`;

const Subtitle = styled.p`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
`;

const StatBox = styled.div`
  flex: 1;
  background: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  padding: 10px 0;
`;

const StatNumber = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #000;
`;

const StatLabel = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #555;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuImage = styled.img`
  width: 64px;
  height: 58px;
`;

const DateLabel = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #555;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const Card = styled.div`
  flex: 1;
  max-width: calc(50% - 10px);
  height: 180px;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CardText = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #000;
`;
