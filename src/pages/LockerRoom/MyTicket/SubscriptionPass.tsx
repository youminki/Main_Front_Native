// // src/pages/SubscriptionPassDetail.tsx
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ReusableModal2 from '../../../components/ReusableModal2';
// import { getUserTickets, UserTicket } from '../../../api/ticket/ticket';

// const SubscriptionPassDetail: React.FC = () => {
//   const [ticket, setTicket] = useState<UserTicket | null>(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [modalMessage] = useState('');
//   const [onModalConfirm] = useState<() => void>(() => {});
//   const [isSettingOpen, setIsSettingOpen] = useState(false);

//   // 실제 적용될 선택된 플랜
//   const [selectedPlan, setSelectedPlan] = useState<
//     '월 4회권' | '무제한 이용권'
//   >('월 4회권');
//   // 모달 내 임시 플랜
//   const [modalSelectedPlan, setModalSelectedPlan] =
//     useState<typeof selectedPlan>(selectedPlan);

//   // 1) 티켓 데이터 불러오기 (autoRenewal=true 우선)
//   useEffect(() => {
//     (async () => {
//       try {
//         const items = await getUserTickets();
//         if (items.length) {
//           // autoRenewal true인 것만 필터
//           const autoTickets = items.filter((item) => item.autoRenewal);
//           const tk = autoTickets.length > 0 ? autoTickets[0] : items[0];
//           setTicket(tk);

//           // isUlimited 플래그로 플랜 결정
//           const isUnlimited = tk.ticketList.isUlimited;
//           setSelectedPlan(isUnlimited ? '무제한 이용권' : '월 4회권');
//         }
//       } catch (err) {
//         console.error('티켓 조회 실패', err);
//       }
//     })();
//   }, []);

//   const formatDate = (iso: string) => iso.slice(0, 10).replace(/-/g, '.');
//   const formatTime = (iso: string) => new Date(iso).toTimeString().slice(0, 8);

//   const handleSubmitChange = () => {
//     setSelectedPlan(modalSelectedPlan);
//     setIsSettingOpen(false);
//   };

//   if (!ticket) {
//     return <Container>로딩 중...</Container>;
//   }

//   return (
//     <Container>
//       <ContentArea>
//         {/* 이용권 설정 변경 */}
//         <Section>
//           <SectionTitle>이용 중인 이용권</SectionTitle>
//           <InFieldBoxBlack>
//             <PassName>
//               {ticket.ticketList.name} <GrayText>({selectedPlan})</GrayText>
//             </PassName>
//             <InFieldButton
//               onClick={() => {
//                 setModalSelectedPlan(selectedPlan);
//                 setIsSettingOpen(true);
//               }}
//             >
//               설정변경
//             </InFieldButton>
//           </InFieldBoxBlack>
//         </Section>

//         <ReusableModal2
//           isOpen={isSettingOpen}
//           title='이용권 설정변경'
//           onClose={() => setIsSettingOpen(false)}
//           onConfirm={handleSubmitChange}
//         >
//           <SubTitle>이용권 종류 *</SubTitle>
//           <BlackBox>
//             <SelectStyle
//               value={modalSelectedPlan}
//               onChange={(e) =>
//                 setModalSelectedPlan(
//                   e.target.value as '월 4회권' | '무제한 이용권'
//                 )
//               }
//             >
//               <option value='월 4회권'>월 4회권</option>
//               <option value='무제한 이용권'>무제한 이용권</option>
//             </SelectStyle>
//           </BlackBox>
//         </ReusableModal2>

//         {/* 이용권 사용기간 */}
//         <Section>
//           <SectionTitle>이용권 사용기간</SectionTitle>
//           <ReadOnlyBox>
//             {formatDate(ticket.startDate)} ~ {formatDate(ticket.endDate)}{' '}
//             <GrayText>(유효기간)</GrayText>
//           </ReadOnlyBox>
//         </Section>

//         {/* 이용권 결제일시 */}
//         <Section>
//           <SectionTitle>이용권 결제일시</SectionTitle>
//           <ReadOnlyBox>
//             {formatDate(ticket.purchasedAt)}{' '}
//             <GrayText>({formatTime(ticket.purchasedAt)})</GrayText>
//           </ReadOnlyBox>
//         </Section>

//         {/* 잔여 횟수 (월 4회권인 경우만) */}
//         {selectedPlan === '월 4회권' && (
//           <Section>
//             <SectionTitle>잔여횟수</SectionTitle>
//             <InFieldBoxGray>
//               <SeasonValue>{ticket.remainingRentals}회</SeasonValue>
//             </InFieldBoxGray>
//           </Section>
//         )}

//         {/* 결제금액 & 다음 결제일 */}
//         <Section>
//           <Row style={{ gap: '20px' }}>
//             <HalfSection>
//               <SectionTitle>이용권(매달) 결제금액</SectionTitle>
//               <ReadOnlyBox>
//                 <PriceText>
//                   {ticket.ticketList.price.toLocaleString()}원
//                 </PriceText>
//               </ReadOnlyBox>
//             </HalfSection>
//             <HalfSection>
//               <SectionTitle>다음 결제일</SectionTitle>
//               <ReadOnlyBox>
//                 {ticket.nextBillingDate
//                   ? formatDate(ticket.nextBillingDate)
//                   : '—'}
//               </ReadOnlyBox>
//             </HalfSection>
//           </Row>
//         </Section>

//         {/* 시즌 자동연장 */}
//         <Section>
//           <SectionTitle>시즌 자동연장</SectionTitle>
//           <InFieldBoxGray>
//             <Row>
//               <SeasonLabel>다음 시즌</SeasonLabel>
//               <Pipe>|</Pipe>
//               <SeasonValue>2025 SUMMER</SeasonValue>
//             </Row>
//           </InFieldBoxGray>
//         </Section>

//         <ReusableModal2
//           isOpen={isModalOpen}
//           title='시즌 자동연장'
//           onClose={() => setModalOpen(false)}
//           onConfirm={onModalConfirm}
//         >
//           {modalMessage}
//         </ReusableModal2>

//         <Divider />

//         {/* 안내문 */}
//         <NoticeArea>
//           <NoticeText>
//             ※ 이용 중인 구독권은 시즌 중간에{' '}
//             <OrangeBold>취소가 불가</OrangeBold>합니다.
//           </NoticeText>
//           <NoticeText>
//             만약, 취소가 필요할 경우는 서비스팀에 문의해 주시기 바랍니다.
//           </NoticeText>
//         </NoticeArea>
//       </ContentArea>
//     </Container>
//   );
// };

// export default SubscriptionPassDetail;

// // ─── Styled Components ─────────────────────────────────────────────

// const Container = styled.div`
//   position: relative;
//   background: #ffffff;
//   margin: 0 auto;
//   display: flex;
//   justify-content: center;
//   max-width: 600px;
//   padding: 1rem;
// `;

// const ContentArea = styled.div`
//   margin-bottom: 30px;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const Section = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 30px;
// `;

// const SectionTitle = styled.div`
//   font-weight: 700;
//   font-size: 10px;
//   line-height: 11px;
//   color: #000000;
//   margin-bottom: 10px;
// `;

// const InFieldBoxBlack = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   height: 57px;
//   border: 1px solid #000000;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 16px;
// `;

// const PassName = styled.span`
//   font-weight: 800;
//   font-size: 13px;
//   line-height: 14px;
//   color: #000000;
// `;

// const GrayText = styled.span`
//   padding-left: 3px;
//   font-weight: 700;
//   font-size: 13px;
//   line-height: 14px;
//   color: #999999;
// `;

// const InFieldButton = styled.button`
//   background: #000000;
//   border-radius: 5px;
//   padding: 10px;
//   border: none;
//   cursor: pointer;

//   font-weight: 800;
//   font-size: 12px;
//   line-height: 13px;
//   color: #ffffff;
// `;

// const ReadOnlyBox = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   height: 57px;
//   border: 1px solid #eeeeee;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   padding: 0 16px;
//   font-weight: 800;
//   font-size: 13px;
//   line-height: 14px;
//   color: #000000;
// `;

// const PriceText = styled.span`
//   font-weight: 900;
//   font-size: 13px;
//   line-height: 14px;
//   color: #000000;
// `;

// const Row = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const HalfSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
// `;

// const InFieldBoxGray = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   height: 57px;
//   border: 1px solid #dddddd;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 16px;
// `;

// const Pipe = styled.span`
//   font-weight: 400;
//   font-size: 13px;
//   color: #cccccc;
//   margin: 0 4px;
// `;

// const SeasonLabel = styled.span`
//   font-weight: 400;
//   font-size: 13px;
//   color: #000000;
//   margin-right: 4px;
// `;

// const SeasonValue = styled.span`
//   font-weight: 800;
//   font-size: 13px;
//   color: #000000;
//   margin-left: 4px;
// `;

// const Divider = styled.div`
//   width: 100%;
//   height: 1px;
//   background: #dddddd;
//   margin-bottom: 30px;
// `;

// const NoticeArea = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const NoticeText = styled.p`
//   margin: 0;
//   font-weight: 400;
//   font-size: 12px;
//   color: #999999;
// `;

// const OrangeBold = styled.span`
//   font-weight: 700;
//   font-size: 12px;
//   color: #f6ae24;
// `;

// const SubTitle = styled.div`
//   font-weight: 700;
//   font-size: 10px;
//   color: #000000;
//   margin-bottom: 6px;
// `;

// const BlackBox = styled.div`
//   height: 57px;
//   background: #ffffff;
//   border: 1px solid #000000;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   padding: 0 16px;
// `;

// const SelectStyle = styled.select`
//   width: 100%;
//   height: 100%;
//   font-size: 13px;
//   border: none;
//   outline: none;
//   background: transparent;
//   cursor: pointer;
// `;
