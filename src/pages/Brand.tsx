import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '../styles/Theme';
import { ThemeProvider } from 'styled-components';
import BrandIcon from '/src/assets/BrandIcon.svg';
import SearchIconImage from '/src/assets/BottomNav/SearchIcon.svg';
import GroupButtonIcon from '/src/assets/BottomNav/GroupButtonIcon.svg';

const Brand: React.FC = () => {
  const [filter, setFilter] = useState('');

  const brands = [
    { name: 'SANDRO', category: '컨템포러리' },
    { name: 'MAJE', category: '컨템포러리' },
    { name: 'MICHA', category: '컨템포러리' },
    { name: 'it MICHA', category: '캐릭터' },
    { name: 'MOJO.S.PHINE', category: '컨템포러리' },
    { name: 'DEW L', category: '컨템포러리' },
    { name: 'ZOOC', category: '캐릭터' },
  ];

  const filteredBrands = filter
    ? brands.filter((brand) => brand.category === filter)
    : brands;

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>브랜드</Title>
          <Subtitle>새로운 시즌 제품들을 내 손안에!</Subtitle>
        </Header>
        <StatsSection>
          <StatsContainer>
            <StatBox white>
              <Row>
                <StatLabel>브랜드</StatLabel>
                <StatNumber>{brands.length}</StatNumber>
              </Row>
            </StatBox>
            <StatBox gray>
              <Row>
                <StatLabel>등록 상품수</StatLabel>
                <StatNumber>9480</StatNumber>
              </Row>
            </StatBox>
          </StatsContainer>
          <ImageWrapper>
            <MenuImage src={BrandIcon} alt='메뉴 이미지' />
          </ImageWrapper>
        </StatsSection>
        <Divider />
        <ControlSection>
          <ButtonContainer>
            <ControlButton onClick={() => setFilter('')}>
              <Icon src={GroupButtonIcon} alt='그룹별 아이콘' />
              그룹별
            </ControlButton>
            <Controltext>정렬</Controltext>
          </ButtonContainer>
          <SearchBar>
            <SearchInput placeholder='검색' />
            <SearchIcon src={SearchIconImage} alt='검색 아이콘' />
          </SearchBar>
        </ControlSection>

        <BrandList>
          {filteredBrands.map((brand, index) => (
            <BrandItem key={index}>
              <BrandDetails>
                <BrandName>{brand.name}</BrandName>
                <BrandCategory>{brand.category}</BrandCategory>
              </BrandDetails>
              <BrandType>
                {brand.category === '컨템포러리' ? 'Contemporary' : 'Character'}
              </BrandType>
            </BrandItem>
          ))}
        </BrandList>
      </Container>
    </ThemeProvider>
  );
};

export default Brand;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
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
  width: 100%;
`;

const StatBox = styled.div<{ white?: boolean; gray?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ white, gray }) =>
    white ? '#fff' : gray ? '#f6f6f6' : '#fff'};
  border: 1px solid #ddd;
  border-radius: ${({ white, gray }) =>
    white ? '10px 0 0 0' : gray ? '0 0 10px 0' : '0'};
  text-align: center;
  padding: 15px 20px;
  position: relative;
  margin-right: 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #f6ae24;
`;

const StatLabel = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  margin-right: 5px;
  width: 100%;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

const ControlSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 72px;
  cursor: pointer;
  &:hover {
    background: #f6ae24;
    color: #fff;
  }

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;

  color: #000000;
`;
const Controltext = styled.p`
  display: flex;
  align-items: center;

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;

  color: #000000;
`;
const Icon = styled.img`
  width: 13px;
  height: 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  background: #fff;

  margin-left: 93px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 14px;
  outline: none;
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 16px;
  padding: 10px;
`;

const BrandList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const BrandItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
`;

const BrandDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const BrandCategory = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #999;
`;

const BrandType = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #999;
  text-align: right;
`;
