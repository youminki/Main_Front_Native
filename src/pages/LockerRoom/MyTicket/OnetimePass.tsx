import React, { useState } from 'react';
import styled from 'styled-components';
// import ReusableModal from '../../../components/ReusableModal'; // <-- 제거
import ReusableModal2 from '../../../components/ReusableModal2';

const OnetimePass: React.FC = () => {
  // 자동연장 취소 여부 상태 (false: 기본, true: 취소신청 완료)
  const [isCancelled, setIsCancelled] = useState(false);

  // (취소신청) 모달 open 상태
  const [isModalOpen, setModalOpen] = useState(false);
  // (취소신청) 모달 메시지
  const [modalMessage, setModalMessage] = useState('');
  // (취소신청) 모달 confirm 콜백
  const [onModalConfirm, setOnModalConfirm] = useState<() => void>(() => {});

  // (신규) "설정변경" 모달 열림 여부
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  // (신규) "이용 중인 이용권" 옵션 (기본값: 월 4회권)
  const [selectedPlan, setSelectedPlan] = useState<
    '월 4회권' | '무제한 이용권'
  >('월 4회권');

  // (신규) 설정변경 모달 열기
  const handleOpenSetting = () => {
    setIsSettingOpen(true);
  };

  // (신규) 설정변경 -> 변경신청 버튼 클릭 시
  const handleSubmitChange = () => {
    // 서버 요청 등 처리
    setIsSettingOpen(false);
  };

  // 자동연장 취소 버튼 클릭
  const handleButtonClick = () => {
    if (!isCancelled) {
      // 기본 상태: '취소신청'
      setModalMessage('다음 시즌 자동연장을 취소 하시겠습니까?');
      setOnModalConfirm(() => () => {
        setIsCancelled(true);
        setModalOpen(false);
      });
      setModalOpen(true);
    } else {
      // 취소신청 완료 상태: '취소신청 완료' 버튼 클릭
      setModalMessage('시즌 자동연장을 다시 하시겠습니까?');
      setOnModalConfirm(() => () => {
        setIsCancelled(false);
        setModalOpen(false);
      });
      setModalOpen(true);
    }
  };

  return (
    <Container>
      <ContentArea>
        {/* 1) 이용 중인 이용권 */}
        <Section>
          <SectionTitle>이용 중인 이용권</SectionTitle>
          <InFieldBoxBlack>
            <PassName>
              정기 구독권 <GrayText>({selectedPlan})</GrayText>
            </PassName>
            <InFieldButton onClick={handleOpenSetting}>설정변경</InFieldButton>
          </InFieldBoxBlack>
        </Section>

        {/* (신규) "설정변경" 모달 - 직접 만든 CustomModal 사용 */}
        {isSettingOpen && (
          <CustomModal onClose={() => setIsSettingOpen(false)}>
            {/* 모달 상단 타이틀 */}
            <ModalTitle>이용권 설정변경</ModalTitle>

            {/* "이용 중인 이용권" 섹션 */}
            <SubTitle>이용 중인 이용권</SubTitle>
            <GrayBox>정기 구독권</GrayBox>

            {/* "이용권 설정 *" 섹션 */}
            <SubTitle>이용권 설정 *</SubTitle>
            <BlackBox>
              <SelectStyle
                value={selectedPlan}
                onChange={(e) =>
                  setSelectedPlan(
                    e.target.value as '월 4회권' | '무제한 이용권'
                  )
                }
              >
                <option value='월 4회권'>월 4회권</option>
                <option value='무제한 이용권'>무제한 이용권</option>
              </SelectStyle>
            </BlackBox>

            {/* 변경신청 버튼 */}
            <SubmitBtn onClick={handleSubmitChange}>변경신청</SubmitBtn>
          </CustomModal>
        )}

        {/* 2) 이용권 사용기간 */}
        <Section>
          <SectionTitle>이용권 사용기간</SectionTitle>
          <ReadOnlyBox>
            2025.02.01 ~ 2025.02.28 <GrayText>(유효기간)</GrayText>
          </ReadOnlyBox>
        </Section>

        {/* 3) 이용권 결제일시 */}
        <Section>
          <SectionTitle>이용권 결제일시</SectionTitle>
          <ReadOnlyBox>
            2025.02.01 <GrayText>(14:40:38)</GrayText>
          </ReadOnlyBox>
        </Section>

        {/* 4) 이용권(매달) 결제금액 + 5) 다음 결제일 */}
        <Section>
          <Row style={{ gap: '20px' }}>
            <HalfSection>
              <SectionTitle>이용권(매달) 결제금액</SectionTitle>
              <ReadOnlyBox>
                <PriceText>120,000</PriceText>
              </ReadOnlyBox>
            </HalfSection>
            <HalfSection>
              <SectionTitle>다음 결제일</SectionTitle>
              <ReadOnlyBox>2025.03.01</ReadOnlyBox>
            </HalfSection>
          </Row>
        </Section>

        {/* 6) 이용권 코드 */}
        <Section>
          <SectionTitle>이용권 코드</SectionTitle>
          <InFieldBox>
            <CodeLabel>Code</CodeLabel>
            <Pipe> | </Pipe>
            <CodeValue>PASSI3Y8OTXFXTSG</CodeValue>
          </InFieldBox>
        </Section>

        {/* 7) 시즌 자동연장 */}
        <Section>
          <SectionTitle>시즌 자동연장</SectionTitle>
          <InFieldBoxGray>
            <Row>
              <SeasonLabel>다음 시즌</SeasonLabel>
              <Pipe> | </Pipe>
              <SeasonValue>2025 SUMMER</SeasonValue>
            </Row>
            <InFieldButton onClick={handleButtonClick}>
              {isCancelled ? '취소신청 완료' : '취소신청'}
            </InFieldButton>
          </InFieldBoxGray>
        </Section>

        {/* 취소신청 확인/취소 모달 */}
        <ReusableModal2
          isOpen={isModalOpen}
          title='시즌 자동연장'
          onClose={() => setModalOpen(false)}
          onConfirm={onModalConfirm}
        >
          {modalMessage}
        </ReusableModal2>

        {/* 8) 구분선 */}
        <Divider />

        {/* 9) 안내 메시지 */}
        <NoticeArea>
          <NoticeText>
            ※ 이용 중인 구독권은 시즌 중간에{' '}
            <OrangeBold>취소가 불가</OrangeBold>합니다.
          </NoticeText>
          <NoticeText>
            만약, 취소가 필요할 경우는 서비스팀에 문의해 주시기 바랍니다.
          </NoticeText>
        </NoticeArea>
      </ContentArea>
    </Container>
  );
};

export default OnetimePass;

/* ------------------------------------------------------------------
   여기부터는 직접 만든 CustomModal과 모달 내부 스타일
------------------------------------------------------------------ */

/**
 * isOpen을 따로 받지 않고,
 * {isSettingOpen && <CustomModal />} 식으로 조건부 렌더링.
 */
interface CustomModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ onClose, children }) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </>
  );
};

/** 반투명 배경 */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px;
  z-index: 9999;
`;

/** 모달 컨테이너 - 중앙 정렬 & 블록 레이아웃 */
const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  box-sizing: border-box;

  /* 내부 여백을 줘서 내용이 깔끔하게 보이도록 함 */
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px; /* 각 섹션 간격 */
  z-index: 9999;
`;

/* ---------------------
   모달 내부 스타일
---------------------- */

/* 모달 상단 큰 타이틀 */
const ModalTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

/* 소제목(예: "이용 중인 이용권", "이용권 설정 *") */
const SubTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 6px; /* 소제목과 박스 사이 간격 */
`;

/* 이용권 표시 영역박스 (회색 테두리) */
const GrayBox = styled.div`
  height: 57px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 0 16px;

  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  color: #000000;
`;

/* 이용권 설정 (검정 테두리 박스) */
const BlackBox = styled.div`
  height: 57px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 0 16px;
`;

/* select 스타일 */
const SelectStyle = styled.select`
  width: 100%;
  height: 100%;
  font-family: 'NanumSquare Neo OTF';
  font-size: 13px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

/* 변경신청 버튼 */
const SubmitBtn = styled.button`
  width: 100%;
  height: 56px;
  background: #000000;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
`;

/* ------------------------------------------------------------------
   아래부터는 OnetimePass에서 쓰던 스타일
------------------------------------------------------------------ */
const Container = styled.div`
  position: relative;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const ContentArea = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HalfSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ReadOnlyBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const PriceText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const InFieldBoxBlack = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #000000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const PassName = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const InFieldButton = styled.button`
  background: #000000;
  border-radius: 5px;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
`;

const InFieldBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const InFieldBoxGray = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const CodeLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #999999;
  margin-right: 4px;
`;

const Pipe = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #cccccc;
  margin: 0 4px;
`;

const CodeValue = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #999999;
  margin-left: 4px;
`;

const SeasonLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  margin-right: 4px;
`;

const SeasonValue = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  margin-left: 4px;
`;

const NoticeArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoticeText = styled.p`
  margin: 0;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

const OrangeBold = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #f6ae24;
`;

const GrayText = styled.span`
  padding-left: 3px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  color: #999999;
`;
