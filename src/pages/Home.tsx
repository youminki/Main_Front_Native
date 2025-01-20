import React, { useState, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";

import Notice from "../components/Home/Notice";
import ItemList from "../components/Home/ItemList";
import Theme from "../styles/Theme";
import { useNavigate } from "react-router-dom";
import TypeAnalysisIcon from "../assets/SubHeader/HeaderTypeAnalysis.svg";
import inventoryIcon from "../assets/SubHeader/Headerinventory.svg";
import SettlementIcon from "../assets/SubHeader/HeaderCalculateDetail.svg";
import DeliveryIcon from "../assets/SubHeader/HeaderShippingDetail.svg";

const Home: React.FC = () => {
  const homeIcons = [
    { src: TypeAnalysisIcon, alt: "페이지 설정", route: "/pageSettings" },
    { src: inventoryIcon, alt: "통계분석", route: "/statisticalAnalysis" },
    { src: SettlementIcon, alt: "결제내역", route: "/payment" },
    { src: DeliveryIcon, alt: "배송현황", route: "/delivery" },
  ];
  const [, setSelectedIconIndex] = useState<number>(0);

  // 타입을 명시적으로 지정
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const handleIconClick = (index: number, route: string) => {
    setSelectedIconIndex(index);
    navigate(route);
  };

  const ItemContainer1: React.FC = () => (
    <CustomHeader>
      <div>
        <CustomTitle>
          매칭된 <CustomHighlight>New</CustomHighlight> 아이템
        </CustomTitle>
        <CustomSubtitle>8월 1주차 / 2주차 아이템</CustomSubtitle>
      </div>
      <CustomMoreButton>더보기</CustomMoreButton>
    </CustomHeader>
  );

  const ItemContainer2: React.FC = () => (
    <CustomHeader>
      <div>
        <CustomTitle>
          브랜드 <CustomHighlight>추천</CustomHighlight> 아이템
        </CustomTitle>
        <CustomSubtitle>
          선택하신 브랜드들 중에서 판매율 높은 아이템
        </CustomSubtitle>
      </div>
      <CustomMoreButton>더보기</CustomMoreButton>
    </CustomHeader>
  );

  return (
    <ThemeProvider theme={Theme}>
      <MainContainer>
        <ContentWrapper>
          <Notice />
          <HeaderContainer>
            {homeIcons.map((icon, index) => (
              <IconContainer
                key={icon.alt}
                onClick={() => handleIconClick(index, icon.route)}
                ref={(el: HTMLDivElement | null) => {
                  iconRefs.current[index] = el; // 값을 설정만 하고 반환하지 않음
                }}
              >
                <Icon src={icon.src} alt={icon.alt} />
                <IconText>{icon.alt}</IconText>
              </IconContainer>
            ))}
          </HeaderContainer>
          <Divider />
          <Content>
            <ItemList HeaderContainer={ItemContainer1} />
            <ItemList HeaderContainer={ItemContainer2} />
          </Content>
        </ContentWrapper>
        <Footer>
          <Divider />
          <FooterText>
            <span className="highlight"> (주) 팀리프트 </span> .235-87-01284 .
            2020-서울금천-0973
            <br />
            서울 금천구 디지털로9길 41, 1008호
          </FooterText>
          <FooterCopyright>© 2024 MELPICK.</FooterCopyright>
        </Footer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default Home;

// 스타일 컴포넌트 정의
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
  padding: 25px 27px 0 27px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Divider = styled.div`
  border: 1px solid ${Theme.colors.gray0};
  margin: 15px 0;
  margin-bottom: 30px;
`;

const FooterText = styled.div`
  ${({ theme }) => theme.fonts.default2};
  color: ${({ theme }) => theme.colors.gray};
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;

  .highlight {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 400;
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
  }
`;

const FooterCopyright = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${Theme.colors.yellow};
  text-align: left;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const CustomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const CustomTitle = styled.h2`
  ${Theme.fonts.default1}
  margin-bottom: 5px;
`;

const CustomHighlight = styled.span`
  color: ${Theme.colors.yellow};
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
`;

const CustomSubtitle = styled.p`
  ${Theme.fonts.default2}
  color: ${Theme.colors.gray1};
`;

const CustomMoreButton = styled.button`
  ${Theme.fonts.default0}
  padding: 10px 13px;
  background-color: ${Theme.colors.white};
  color: ${Theme.colors.Black1};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  padding: 30px 10px 0;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
`;

const IconText = styled.span`
  font-size: 12px;
  color: #333;
`;
