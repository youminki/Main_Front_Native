import React, { useState } from "react";
import styled from "styled-components";
import Notice from "../components/Home/Notice";
import ItemList from "../components/Home/ItemList";

import AllClosetIcon from "../assets/SubHeader/AllClosetIcon.svg";
import OnepieceIcon from "../assets/SubHeader/OnepieceIcon.svg";
import JumpsuitIcon from "../assets/SubHeader/JumpsuitIcon.svg";
import TwopieceIcon from "../assets/SubHeader/TwopieceIcon.svg";
import BlouseIcon from "../assets/SubHeader/BlouseIcon.svg";
import FilterIcon from "../assets/Home/FilterIcon.svg";

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

const homeIcons = [
  { src: AllClosetIcon, alt: "전체 옷장", category: "all" },
  { src: OnepieceIcon, alt: "원피스", category: "onepiece" },
  { src: JumpsuitIcon, alt: "점프수트", category: "jumpsuit" },
  { src: TwopieceIcon, alt: "투피스", category: "twopiece" },
  { src: BlouseIcon, alt: "블라우스", category: "blouse" },
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [seasonToggle, setSeasonToggle] = useState<boolean>(false);

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <MainContainer>
      <ContentWrapper>
        <Notice />

        <SubHeaderContainer>
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
        </SubHeaderContainer>
        <FilterContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SeasonToggle
              onClick={() => setSeasonToggle(!seasonToggle)}
              isActive={seasonToggle}
            >
              <ToggleCircle isActive={seasonToggle} />
              <ToggleText isActive={seasonToggle}>
                {seasonToggle ? "켜짐" : "꺼짐"}
              </ToggleText>
            </SeasonToggle>
            <ToggleLabel>계절감</ToggleLabel>
          </div>
          <FilterIconContainer>
            <span>필터</span>
            <img src={FilterIcon} alt="필터" />
          </FilterIconContainer>
        </FilterContainer>

        <Content>
          <ItemList items={filteredItems} />
        </Content>
      </ContentWrapper>
    </MainContainer>
  );
};
export default Home;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

const FilterIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
  }

  &:hover img {
    background-color: #e6e6e6;
  }

  span {
    margin-right: 5px;
  }
`;

const SeasonToggle = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 60px;
  height: 30px;
  background-color: ${({ isActive }) => (isActive ? "#222" : "#D9D9D9")};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleCircle = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 50%;
  left: ${({ isActive }) => (isActive ? "32px" : "2px")};
  transition: left 0.3s ease;
`;

const ToggleText = styled.span<{ isActive: boolean }>`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;

  color: #000;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${({ isActive }) => (isActive ? "8px" : "unset")};
  left: ${({ isActive }) => (!isActive ? "8px" : "unset")};
`;
const ToggleLabel = styled.span`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000000;

  margin-left: 10px;
`;
const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 30px;
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

const Content = styled.div`
  flex: 1;
`;
