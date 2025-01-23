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
            <StatBox white>
              <Row>
                <StatLabel>방문수</StatLabel>
                <StatNumber>174</StatNumber>
              </Row>
            </StatBox>
            <StatBox gray>
              <Row>
                <StatLabel>판매된 제품수</StatLabel>
                <StatNumber>26</StatNumber>
              </Row>
              <DateLabel>2025.01.06 ~ 01.10</DateLabel>
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
  background-color: #fff;
  font-family: "NanumSquare Neo OTF", sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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
  position: relative;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 0;
  width: 80%;
`;

const StatBox = styled.div<{ white?: boolean; gray?: boolean }>`
  flex: 1;
  background: ${({ white, gray }) =>
    white ? "#fff" : gray ? "#f6f6f6" : "#fff"};
  border: 1px solid #ddd;
  border-radius: ${({ white, gray }) =>
    white ? "10px 0 0 0" : gray ? "0 0 10px 0" : "0"};
  text-align: center;
  padding: 10px 0;
  position: relative;

  &:not(:last-child) {
    margin-right: 0px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #f6ae24;
`;

const StatLabel = styled.div`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  margin-right: 5px;
`;

const DateLabel = styled.div`
  position: absolute;
  width: 62px;
  height: 7px;
  top: -5px;
  right: 10px;
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 900;
  font-size: 6px;
  line-height: 7px;
  color: #fff;
  background: #f6ae24;
  text-align: center;
  padding: 3px;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 48px;
  margin-right: 15px;
`;

const MenuImage = styled.img`
  width: 64px;
  height: 58px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

const Card = styled.div`
  aspect-ratio: 1 / 1;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
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
