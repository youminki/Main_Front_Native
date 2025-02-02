// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import Theme from '../styles/Theme';
// import BackButton from '../components/BackButton';
// import BottomBar from '../components/Signup/BottomBar';
// import backIcons from '../img/Schedule/BackButton.svg';
// import ExIMG1 from '../img/Home/ExIMG1.svg';
// import ImgAdd from '../img/Store/ImgAdd.svg';

// const ItemCard = ({ id, image, brand, description, onSelect, isSelected }) => {
//   const navigate = useNavigate();

//   const handleSelect = () => {
//     onSelect(id);
//     navigate(`/item/${id}`);
//   };

//   return (
//     <CardContainer>
//       <ImageWrapper onClick={handleSelect}>
//         <Image src={image} alt={brand} />
//         <AddButton src={ImgAdd} alt='Add' />
//       </ImageWrapper>
//       <Brand>{brand}</Brand>
//       <Description>{description}</Description>
//     </CardContainer>
//   );
// };

// const items = [
//   {
//     id: 1,
//     image: ExIMG1,
//     brand: 'SANDRO',
//     description: '언발 플레어 미니원피스',
//     price: 150000,
//     discount: 10,
//   },
//   {
//     id: 2,
//     image: ExIMG1,
//     brand: 'ZOOC',
//     description: '볼륨소매 랩 카라 블라우스',
//     price: 150000,
//     discount: 10,
//   },
//   {
//     id: 3,
//     image: ExIMG1,
//     brand: 'MICHA',
//     description: '테일러드 카라 머메이드 원피스',
//     price: 150000,
//     discount: 10,
//   },
//   {
//     id: 4,
//     image: ExIMG1,
//     brand: 'MICHA',
//     description: '테일러드 카라 머메이드 원피스',
//     price: 150000,
//     discount: 10,
//   },
//   {
//     id: 5,
//     image: ExIMG1,
//     brand: 'MICHA',
//     description: '테일러드 카라 머메이드 원피스',
//     price: 150000,
//     discount: 10,
//   },
//   {
//     id: 6,
//     image: ExIMG1,
//     brand: 'MICHA',
//     description: '테일러드 카라 머메이드 원피스',
//     price: 150000,
//     discount: 10,
//   },
//   {
//     id: 7,
//     image: ExIMG1,
//     brand: 'MICHA',
//     description: '테일러드 카라 머메이드 원피스',
//     price: 150000,
//     discount: 10,
//   },
// ];

// const truncateText = (text, limit) =>
//   text.length > limit ? text.slice(0, limit) + '...' : text;

// const ItemList = ({ HeaderContainer, selectedItems, onSelect }) => (
//   <ListContainer>
//     <HeaderContainer />
//     <ItemsWrapper>
//       {items.map((item) => (
//         <ItemCard
//           key={item.id}
//           {...item}
//           description={truncateText(item.description, 12)}
//           isSelected={selectedItems.includes(item.id)}
//           onSelect={onSelect}
//         />
//       ))}
//     </ItemsWrapper>
//   </ListContainer>
// );

// const ScheduleReservation3 = () => {
//   const handleSelect = (id) => {
//     if (!selectedItems.includes(id)) {
//       setSelectedItems([...selectedItems, id]);
//     }
//     navigate(`/item/${id}`); // 해당 아이템의 상세 페이지로 이동
//   };

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');

//   const handleDateChange = (event) => setSelectedDate(event.target.value);
//   const handleTimeChange = (event) => setSelectedTime(event.target.value);

//   const navigate = useNavigate();

//   const handleBottomClick = () => {
//     console.log('버튼 클릭됨');
//     console.log(`Selected Date: ${selectedDate}`);
//     console.log(`Selected Time: ${selectedTime}`);
//     navigate('/schedule/reservation3');
//   };

//   const ItemContainer = () => (
//     <CustomHeader>
//       <Label>
//         예약된 제품목록<GrayText2>(선택)</GrayText2>
//       </Label>
//     </CustomHeader>
//   );

//   return (
//     <Container>
//       <Header>
//         <BackButtonWrapper>
//           <BackButton onClick={() => window.history.back()} />
//         </BackButtonWrapper>
//         <Title>스케줄 예약하기</Title>
//       </Header>

//       <Stepper>
//         <Step>1</Step>
//         <StepLine />
//         <Step>2</Step>
//         <StepLine />
//         <Step completed>3</Step>
//       </Stepper>

//       <Summary>
//         <ScheduleInfo>
//           <Label>예약한 스케줄</Label>
//           <InfoText>9월 16일 ~ 9월 27일</InfoText>
//         </ScheduleInfo>
//         <ScheduleInfo>
//           <Label>예약한 제품목록</Label>
//           <InfoText>선택한 제품 수 {selectedItems.length} 개</InfoText>
//         </ScheduleInfo>
//       </Summary>

//       <Content>
//         <ItemList
//           HeaderContainer={ItemContainer}
//           selectedItems={selectedItems}
//           onSelect={handleSelect}
//         />
//       </Content>

//       <GrayLine />

//       <Label>스케줄 노출일자(선택)</Label>
//       <SelectWrapper>
//         <StyledSelect value={selectedDate} onChange={handleDateChange}>
//           <option value=''>날짜 선택</option>
//           <option value='2024-09-24'>2024년 9월 24일</option>
//         </StyledSelect>
//         <StyledSelect value={selectedTime} onChange={handleTimeChange}>
//           <option value=''>시간 선택</option>
//           <option value='09:00'>09:00</option>
//         </StyledSelect>
//       </SelectWrapper>

//       <InfoMessage>
//         <GrayText> ※ 노출일정은</GrayText>
//         <BlackText> 스케줄 시작일 기준 3일 이내 까지 가능</BlackText>
//         <GrayText>합니다.</GrayText>
//       </InfoMessage>

//       <BottomBarContainer>
//         <BottomBar
//           onClick={handleBottomClick}
//           buttonText='예약완료'
//           imageSrc={backIcons}
//         />
//       </BottomBarContainer>

//       <BeenContainer />
//     </Container>
//   );
// };

// export default ScheduleReservation3;

// // Styled Components

// const Container = styled.div`
//   width: 100%;
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 0 27px;
//   border: 1px solid ${Theme.colors.gray1};
//   height: 100%;
//   position: relative;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   height: 105px;
// `;

// const BackButtonWrapper = styled.div`
//   position: absolute;
//   left: 0;
// `;

// const Title = styled.h1`
//   font-size: 20px;
//   font-weight: bold;
//   text-align: center;
// `;

// const Stepper = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-bottom: 20px;
// `;

// const Step = styled.div`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: ${(props) =>
//     props.completed ? Theme.colors.yellow : Theme.colors.gray2};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #fff;
//   font-weight: bold;
//   margin: 0 5px;
// `;

// const StepLine = styled.div`
//   width: 30px;
//   height: 2px;
//   background-color: ${Theme.colors.gray3};
//   align-self: center;
// `;

// const Summary = styled.div`
//   margin-top: 30px;
//   display: flex;
//   justify-content: space-between;
//   gap: 10px;
//   margin-bottom: 30px;
// `;

// const ScheduleInfo = styled.div`
//   flex: 1;
// `;

// const InfoText = styled.div`
//   height: 57px;
//   padding: 10px;
//   margin-top: 10px;
//   border: 1px solid ${Theme.colors.gray4};
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   font-family: 'NanumSquare Neo OTF';
//   font-weight: 700;
//   font-size: 13px;
//   line-height: 14px;
// `;

// const SelectWrapper = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
//   margin-top: 10px;
// `;

// const StyledSelect = styled.select`
//   flex: 1;
//   height: 57px;
//   padding: 10px;
//   border-radius: 5px;
//   border: 1px solid ${Theme.colors.gray1};
//   font-family: 'NanumSquare Neo OTF';
//   font-weight: 700;
//   font-size: 13px;
//   line-height: 14px;
// `;

// const BottomBarContainer = styled.div`
//   position: fixed;
//   bottom: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 100%;
//   max-width: 600px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px 10px 34px;
//   background-color: #eeeeee;
//   z-index: 9999;
// `;

// const BeenContainer = styled.div`
//   height: 300px;
// `;

// const Content = styled.div`
//   flex: 1;
// `;

// const InfoMessage = styled.p`
//   font-size: 12px;
//   color: ${Theme.colors.gray2};
//   margin-bottom: 20px;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: left;
//   width: 100%;
//   margin: 6px;
//   position: relative;
// `;

// const ImageWrapper = styled.div`
//   position: relative;
//   width: 140px;
//   height: 210px;
// `;

// const Image = styled.img`
//   object-fit: cover;
//   width: 140px;
//   height: 210px;
// `;

// const AddButton = styled.img`
//   position: absolute;
//   bottom: 0px;
//   right: 0px;
//   width: 36px;
//   height: 46px;
//   cursor: pointer;
// `;

// const CustomHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 10px;
// `;

// const GrayText2 = styled.span`
//   margin-left: 5px;
//   color: ${Theme.colors.gray3};
//   font-family: 'NanumSquare Neo OTF';
//   font-weight: 700;
//   font-size: 10px;
//   line-height: 11px;
// `;

// const ListContainer = styled.div`
//   background-color: ${Theme.colors.white};
//   overflow: hidden;
//   margin-bottom: 40px;
// `;

// const ItemsWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   overflow-x: auto;
//   scrollbar-width: none;
//   -ms-overflow-style: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Brand = styled.h3`
//   margin-top: 10px;
//   font-size: 14px;
//   font-weight: bold;
// `;

// const Description = styled.p`
//   margin-top: 5px;
//   font-size: 12px;
//   ${Theme.fonts.default3}
//   color: ${Theme.colors.gray2};
// `;

// const Label = styled.label`
//   font-family: 'NanumSquare Neo OTF';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 10px;
//   line-height: 11px;
// `;

// const GrayText = styled.span`
//   color: ${Theme.colors.gray1};
//   font-family: 'NanumSquare Neo OTF';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 13px;
// `;

// const BlackText = styled.span`
//   color: ${Theme.colors.Black};
//   font-family: 'NanumSquare Neo OTF';
//   font-style: normal;
//   font-weight: 800;
//   font-size: 12px;
//   line-height: 13px;
// `;

// const GrayLine = styled.hr`
//   border: none;
//   width: 100%;
//   border: 1px solid ${Theme.colors.gray0};
//   margin: 30px 0;
// `;
