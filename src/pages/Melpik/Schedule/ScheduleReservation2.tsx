// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import Theme from '../../../styles/Theme';
// import BackButton from '../../../components/BackButton';
// // import BottomBar from '../../../../components/Signup/BottomBar';
// import backIcons from '../img/Schedule/BackButton.svg';
// import ExIMG1 from '../img/Home/ExIMG1.svg';
// import ImgAdd from '../img/Store/ImgAdd.svg';
// import checkIcon from '../img/Schedule/checkIcon.svg';

// const MAX_SELECTION = 6;

// const ItemCard = ({ id, image, brand, description, onSelect, isSelected }) => {
//   const handleSelect = () => {
//     onSelect(id);
//   };

//   return (
//     <CardContainer>
//       <ImageWrapper onClick={handleSelect}>
//         <Image src={image} alt={brand} />
//         <AddButton src={ImgAdd} alt='Add' />
//         {isSelected && (
//           <SelectionOverlay>
//             <CircularSelection>
//               <CheckIcon src={checkIcon} alt='Check Icon' />
//             </CircularSelection>
//             <SelectText>제품선택</SelectText>
//           </SelectionOverlay>
//         )}
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

// const truncateText = (text, limit) => {
//   return text.length > limit ? text.slice(0, limit) + '...' : text;
// };

// const ItemList = ({ HeaderContainer, selectedItems, onSelect }) => {
//   return (
//     <ListContainer>
//       <HeaderContainer />
//       <ItemsWrapper>
//         {items.map((item) => (
//           <ItemCard
//             key={item.id}
//             {...item}
//             description={truncateText(item.description, 12)}
//             isSelected={selectedItems.includes(item.id)}
//             onSelect={onSelect}
//           />
//         ))}
//       </ItemsWrapper>
//     </ListContainer>
//   );
// };

// const ScheduleReservation2 = () => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSelect = (id) => {
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
//     } else {
//       if (selectedItems.length < MAX_SELECTION) {
//         setSelectedItems([...selectedItems, id]);
//       } else {
//         setIsModalOpen(true);
//       }
//     }
//   };

//   const closeWarningModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleBackClick = () => {
//     window.history.back();
//   };

//   const navigate = useNavigate();

//   const handleBottomClick = () => {
//     navigate('/schedule/reservation3', {
//       state: { selectedItemCount: selectedItems.length },
//     });
//   };

//   const ItemContainer = () => (
//     <CustomHeader>
//       <div>
//         <Label>
//           스케줄에 추가할 제품 목록<GrayText2>(선택)</GrayText2>
//         </Label>
//       </div>
//     </CustomHeader>
//   );

//   return (
//     <Container>
//       <Header>
//         <BackButtonWrapper>
//           <BackButton onClick={handleBackClick} />
//         </BackButtonWrapper>
//         <Title>스케줄 예약하기</Title>
//       </Header>

//       <Stepper>
//         <Step>1</Step>
//         <StepLine />
//         <Step completed>2</Step>
//         <StepLine />
//         <Step>3</Step>
//       </Stepper>

//       <Summary>
//         <ScheduleInfo>
//           <Label>예약할 제품 목록</Label>
//           <InfoText>
//             선택한 제품 수 {selectedItems.length} 개
//             <GrayText> / 선택 가능한 갯수 {MAX_SELECTION}개</GrayText>
//           </InfoText>
//         </ScheduleInfo>
//       </Summary>

//       <Content>
//         <ItemList
//           HeaderContainer={ItemContainer}
//           selectedItems={selectedItems}
//           onSelect={handleSelect}
//         />
//       </Content>

//       <BottomBarContainer>
//         <BottomBar
//           onClick={handleBottomClick}
//           buttonText='다음'
//           imageSrc={backIcons}
//         />
//       </BottomBarContainer>

//       {isModalOpen && (
//         <WarningModal>
//           <WarningModalContent>
//             <ModalHeader>
//               <ModalTitle>알림</ModalTitle>
//               <GrayLine />
//             </ModalHeader>
//             <WarningMessage>최대 6개의 제품만 선택 가능합니다.</WarningMessage>
//             <GrayLine />
//             <ButtonRow>
//               <CancelButton onClick={closeWarningModal}>닫기</CancelButton>
//             </ButtonRow>
//           </WarningModalContent>
//         </WarningModal>
//       )}

//       <BeenContainer />
//     </Container>
//   );
// };

// export default ScheduleReservation2;

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

// const Label = styled.label`
//   font-family: 'NanumSquare Neo OTF';
//   font-style: normal;
//   font-weight: 700;
//   font-size: 10px;
//   line-height: 11px;
// `;

// const Summary = styled.div`
//   margin-top: 20px;
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
//   font-style: normal;
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
//   font-style: normal;
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

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(0, 0, 0, 0.5);
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

// const SelectionOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 140px;
//   height: 210px;
//   background: rgba(246, 174, 36, 0.95);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const CircularSelection = styled.div`
//   width: 58px;
//   height: 58px;
//   background-color: white;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const CheckIcon = styled.img`
//   width: 30px;
//   height: 22px;
// `;

// const SelectText = styled.div`
//   margin-top: 10px;
//   font-family: 'NanumSquare Neo OTF';
//   font-weight: 700;
//   font-size: 12px;
//   color: white;
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 27px;
// `;

// const ModalContent = styled.div`
//   background-color: ${Theme.colors.white};
//   padding: 20px;
//   max-width: 500px;
//   width: 100%;
//   height: 670px;
//   display: flex;
//   flex-direction: column;
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ModalTitle = styled.p`
//   font-family: 'NanumSquare Neo OTF', sans-serif;
//   font-weight: 800;
//   font-size: 16px;
// `;

// const GrayText = styled.span`
//   color: ${Theme.colors.gray1};
// `;

// const GrayLine = styled.hr`
//   border: none;
//   width: 100%;
//   border: 1px solid ${Theme.colors.gray0};
//   margin: 20px 0;
// `;

// const ModalBody = styled.div`
//   flex-grow: 1;
// `;

// const BrandSelectionGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

// const BrandOption = styled.div`
//   padding: 10px;
//   background-color: ${(props) =>
//     props.selected ? Theme.colors.yellow : Theme.colors.white};
//   color: ${(props) =>
//     props.selected ? Theme.colors.white : Theme.colors.black};
//   border: 1px solid ${Theme.colors.gray1};
//   text-align: center;
//   cursor: pointer;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const ButtonRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 20px;
//   margin-top: auto;
// `;

// const CancelButton = styled.button`
//   width: 100%;
//   height: 56px;
//   background-color: ${Theme.colors.gray1};
//   color: ${Theme.colors.white};
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;

//   font-family: 'NanumSquare Neo OTF';
//   font-weight: 800;
//   font-size: 16px;
// `;

// const CompleteButton = styled(CancelButton)`
//   background-color: ${Theme.colors.black};
// `;

// const WarningModal = styled(ModalOverlay)`
//   background-color: rgba(0, 0, 0, 0.7);
// `;

// const WarningModalContent = styled(ModalContent)`
//   max-width: 376px;
//   height: 329px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const WarningMessage = styled.p`
//   color: ${Theme.colors.black};
//   font-family: 'NanumSquare Neo OTF';
//   font-weight: 400;
//   font-size: 14px;
//   text-align: center;
//   margin: 0;
// `;
