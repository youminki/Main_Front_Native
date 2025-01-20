import React, { useState } from "react";
import styled from "styled-components";
import Notice from "../components/Home/Notice";
import ItemList from "../components/Home/ItemList";

import AllClosetIcon from "../assets/SubHeader/AllClosetIcon.svg";
import OnepieceIcon from "../assets/SubHeader/OnepieceIcon.svg";
import JumpsuitIcon from "../assets/SubHeader/JumpsuitIcon.svg";
import TwopieceIcon from "../assets/SubHeader/TwopieceIcon.svg";
import BlouseIcon from "../assets/SubHeader/BlouseIcon.svg";

// 아이템 데이터
const items = [
  {
    id: 1,
    image: "https://via.placeholder.com/180x270",
    brand: "SANDRO",
    description: "SNS21N9 / 원피스",
    category: "onepiece",
    price: 460000,
    discount: 10,
  },
  {
    id: 2,
    image: "",
    brand: "ZOOC",
    description: "ZSC14B1 / 블라우스",
    category: "blouse",
    price: 380000,
    discount: 15,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/180x270",
    brand: "MICHA",
    description: "MCH88T7 / 투피스",
    category: "twopiece",
    price: 540000,
    discount: 20,
  },
];

// 아이콘 데이터
const homeIcons = [
  { src: AllClosetIcon, alt: "전체 옷장", category: "all" },
  { src: OnepieceIcon, alt: "원피스", category: "onepiece" },
  { src: JumpsuitIcon, alt: "점프수트", category: "jumpsuit" },
  { src: TwopieceIcon, alt: "투피스", category: "twopiece" },
  { src: BlouseIcon, alt: "블라우스", category: "blouse" },
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 선택된 카테고리의 아이템 필터링
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <MainContainer>
      <ContentWrapper>
        {/* 공지 사항 */}
        <Notice />

        {/* 아이콘 섹션 */}
        <HeaderContainer>
          {homeIcons.map((icon) => (
            <IconContainer
              key={icon.category}
              isSelected={selectedCategory === icon.category}
              onClick={() => setSelectedCategory(icon.category)}
            >
              <Icon src={icon.src} alt={icon.alt} />
              <IconText>{icon.alt}</IconText>
            </IconContainer>
          ))}
        </HeaderContainer>

        <Divider />

        {/* 필터링된 아이템 리스트 */}
        <Content>
          <ItemList items={filteredItems} />
        </Content>
      </ContentWrapper>
    </MainContainer>
  );
};

export default Home;

// 스타일 정의
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 30px 10px 0;
`;

const IconContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    `
    border-bottom: 2px solid #000;
  `}
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

const Divider = styled.div`
  border: 1px solid #ddd;
  margin: 15px 0;
`;

const Content = styled.div`
  flex: 1;
`;
